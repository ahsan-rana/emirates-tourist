/* Emirates Tourist — authentication (Google + email/password)
   Production: paste your Firebase web config into ET.AUTH_CONFIG below and enable
   Google and Email/Password providers in Firebase Console → Authentication → Sign-in method.
   Until a config is present the site runs in DEMO mode: accounts live only in this browser. */
window.ET = window.ET || {};

ET.AUTH_CONFIG = null; /* e.g. { apiKey: "...", authDomain: "emirates-tourist.firebaseapp.com", projectId: "emirates-tourist", appId: "..." } */

(function () {
  const store = { get(k, d) { try { return JSON.parse(localStorage.getItem("et:" + k)) ?? d; } catch { return d; } }, set(k, v) { try { localStorage.setItem("et:" + k, JSON.stringify(v)); } catch {} }, del(k) { try { localStorage.removeItem("et:" + k); } catch {} } };
  const listeners = [];
  const auth = { user: null, mode: ET.AUTH_CONFIG ? "firebase" : "demo", ready: false };
  const emit = () => listeners.forEach((f) => f(auth.user));
  auth.onChange = (f) => { listeners.push(f); if (auth.ready) f(auth.user); };
  const setUser = (u) => { auth.user = u; auth.ready = true; emit(); };
  const sha = async (s) => { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)); return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join(""); };
  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const err = (m) => { const e = new Error(m); e.friendly = true; throw e; };

  /* ---------- demo provider (browser-local) ---------- */
  const demo = {
    async init() { const s = store.get("session", null); setUser(s); },
    async signInGoogle() { const u = { uid: "google-demo", name: "Demo Google User", email: "demo.google@gmail.com", provider: "google", photo: null }; store.set("session", u); setUser(u); return u; },
    async signUp(name, email, pass) {
      email = email.trim().toLowerCase(); if (!name.trim()) err("Please enter your name"); if (!validEmail(email)) err("Please enter a valid email address"); if (pass.length < 8) err("Password must be at least 8 characters");
      const acc = store.get("accounts", {}); if (acc[email]) err("An account with this email already exists. Sign in instead.");
      acc[email] = { name: name.trim(), hash: await sha(email + ":" + pass), created: Date.now() }; store.set("accounts", acc);
      const u = { uid: "email-" + email, name: acc[email].name, email, provider: "password" }; store.set("session", u); setUser(u); return u;
    },
    async signInEmail(email, pass) {
      email = email.trim().toLowerCase(); const acc = store.get("accounts", {});
      if (!acc[email] || acc[email].hash !== await sha(email + ":" + pass)) err("Incorrect email or password");
      const u = { uid: "email-" + email, name: acc[email].name, email, provider: "password" }; store.set("session", u); setUser(u); return u;
    },
    async reset(email) { if (!validEmail(email)) err("Please enter a valid email address"); return true; },
    async signOut() { store.del("session"); setUser(null); }
  };

  /* ---------- Firebase provider ---------- */
  const fb = {
    _load() {
      if (fb._p) return fb._p;
      fb._p = new Promise((res, rej) => {
        const add = (src) => new Promise((r, j) => { const s = document.createElement("script"); s.src = src; s.onload = r; s.onerror = j; document.head.appendChild(s); });
        add("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js").then(() => add("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js")).then(() => {
          firebase.initializeApp(ET.AUTH_CONFIG); fb.a = firebase.auth(); fb.a.useDeviceLanguage(); res();
        }).catch(rej);
      });
      return fb._p;
    },
    _map(u) { return u ? { uid: u.uid, name: u.displayName || (u.email || "").split("@")[0], email: u.email, provider: (u.providerData[0] || {}).providerId === "google.com" ? "google" : "password", photo: u.photoURL } : null; },
    _err(e) { const m = { "auth/invalid-credential": "Incorrect email or password", "auth/user-not-found": "No account with this email", "auth/wrong-password": "Incorrect email or password", "auth/email-already-in-use": "An account with this email already exists. Sign in instead.", "auth/weak-password": "Password must be at least 8 characters", "auth/invalid-email": "Please enter a valid email address", "auth/popup-closed-by-user": "Google sign-in was cancelled", "auth/too-many-requests": "Too many attempts. Please try again later." }; err(m[e.code] || e.message); },
    async init() { await fb._load(); fb.a.onAuthStateChanged((u) => setUser(fb._map(u))); },
    async signInGoogle() { await fb._load(); try { const r = await fb.a.signInWithPopup(new firebase.auth.GoogleAuthProvider()); return fb._map(r.user); } catch (e) { fb._err(e); } },
    async signUp(name, email, pass) { await fb._load(); if (!name.trim()) err("Please enter your name"); if (pass.length < 8) err("Password must be at least 8 characters"); try { const r = await fb.a.createUserWithEmailAndPassword(email.trim(), pass); await r.user.updateProfile({ displayName: name.trim() }); setUser(fb._map(fb.a.currentUser)); return auth.user; } catch (e) { fb._err(e); } },
    async signInEmail(email, pass) { await fb._load(); try { const r = await fb.a.signInWithEmailAndPassword(email.trim(), pass); return fb._map(r.user); } catch (e) { fb._err(e); } },
    async reset(email) { await fb._load(); try { await fb.a.sendPasswordResetEmail(email.trim()); return true; } catch (e) { fb._err(e); } },
    async signOut() { await fb._load(); await fb.a.signOut(); }
  };

  const p = auth.mode === "firebase" ? fb : demo;
  auth.signInGoogle = () => p.signInGoogle(); auth.signUp = (n, e, pw) => p.signUp(n, e, pw); auth.signInEmail = (e, pw) => p.signInEmail(e, pw); auth.reset = (e) => p.reset(e); auth.signOut = () => p.signOut();
  auth.initials = (u) => (u.name || u.email || "?").split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

  /* ---------- per-user bookings ---------- */
  auth.bookings = () => auth.user ? store.get("bookings:" + auth.user.uid, []) : [];
  auth.addBooking = (b) => { if (!auth.user) return false; const l = auth.bookings(); l.unshift(b); store.set("bookings:" + auth.user.uid, l); return true; };

  ET.auth = auth;
  p.init().catch((e) => { console.warn("Auth init failed, falling back to demo mode", e); auth.mode = "demo"; demo.init(); });
})();
