/* Emirates Tourist — live data layer (Cloud Firestore)
   Collections: bookings, enquiries, subscribers, users. Requires ET.AUTH_CONFIG (same Firebase project).
   Falls back to browser storage when Firebase is not configured. */
window.ET = window.ET || {};
(function () {
  const store = { get(k, d) { try { return JSON.parse(localStorage.getItem("et:" + k)) ?? d; } catch { return d; } }, set(k, v) { try { localStorage.setItem("et:" + k, JSON.stringify(v)); } catch {} } };
  const db = { mode: ET.AUTH_CONFIG ? "firestore" : "local", ready: null };

  const load = () => {
    if (db.ready) return db.ready;
    db.ready = new Promise((res, rej) => {
      const add = (src) => new Promise((r, j) => { if ([...document.scripts].some((s) => s.src === src)) return r(); const s = document.createElement("script"); s.src = src; s.onload = r; s.onerror = j; document.head.appendChild(s); });
      add("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js")
        .then(() => add("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"))
        .then(() => { if (!firebase.apps.length) firebase.initializeApp(ET.AUTH_CONFIG); db.fs = firebase.firestore(); res(db.fs); }).catch(rej);
    });
    return db.ready;
  };
  const stamp = () => (db.mode === "firestore" ? firebase.firestore.FieldValue.serverTimestamp() : Date.now());
  const who = () => (ET.auth && ET.auth.user) ? { uid: ET.auth.user.uid, email: ET.auth.user.email, name: ET.auth.user.name } : null;

  /* ---- bookings ---- */
  db.saveBooking = async (b) => {
    const u = who();
    const doc = { ...b, uid: u ? u.uid : null, email: b.email || (u ? u.email : null), name: b.name || (u ? u.name : null), status: "confirmed", createdAt: stamp(), site: "emiratestourist.com" };
    if (db.mode === "firestore") { await load(); const ref = await db.fs.collection("bookings").add(doc); return ref.id; }
    const l = store.get("bookings:" + (u ? u.uid : "guest"), []); l.unshift({ ...doc, id: b.ref }); store.set("bookings:" + (u ? u.uid : "guest"), l); return b.ref;
  };
  /* live subscription to the signed-in user's bookings; cb(list) is called on every change */
  db.watchBookings = async (cb) => {
    const u = who(); if (!u) { cb([]); return () => {}; }
    if (db.mode === "firestore") {
      await load();
      const ts = (v) => (v && v.toMillis ? v.toMillis() : (typeof v === "number" ? v : 0));
      return db.fs.collection("bookings").where("uid", "==", u.uid).onSnapshot((snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => ts(b.createdAt) - ts(a.createdAt))), (e) => { console.warn(e); cb([]); });
    }
    cb(store.get("bookings:" + u.uid, [])); return () => {};
  };

  /* ---- enquiries (contact form) ---- */
  db.saveEnquiry = async (e) => {
    const doc = { ...e, uid: who()?.uid || null, createdAt: stamp(), status: "new" };
    if (db.mode === "firestore") { await load(); const ref = await db.fs.collection("enquiries").add(doc); return ref.id; }
    const l = store.get("enquiries", []); l.unshift(doc); store.set("enquiries", l); return "local";
  };

  /* ---- newsletter ---- */
  db.subscribe = async (email, source) => {
    const id = email.trim().toLowerCase();
    if (db.mode === "firestore") { await load(); await db.fs.collection("subscribers").doc(id).set({ email: id, source: source || "site", createdAt: stamp() }, { merge: true }); return true; }
    const l = store.get("subscribers", []); if (!l.includes(id)) l.push(id); store.set("subscribers", l); return true;
  };

  /* ---- user profile (created/updated on sign-in) ---- */
  db.upsertUser = async (u) => {
    if (db.mode !== "firestore" || !u) return;
    await load(); await db.fs.collection("users").doc(u.uid).set({ name: u.name, email: u.email, provider: u.provider, photo: u.photo || null, lastSeen: stamp() }, { merge: true });
  };

  ET.db = db;
})();
