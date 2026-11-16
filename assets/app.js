/* Emirates Tourist — shared app logic */
(function () {
  const ET = window.ET;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  ET.$ = $; ET.$$ = $$;

  /* ---------- state ---------- */
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem("et:" + k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("et:" + k, JSON.stringify(v)); } catch {} }
  };
  ET.store = store;
  ET.currency = store.get("cur", "AED");
  ET.wishlist = new Set(store.get("wish", []));

  ET.money = (aed) => {
    if (ET.currency === "USD") return "$" + Math.round(aed / ET.RATE_USD).toLocaleString();
    return "AED " + Math.round(aed).toLocaleString();
  };
  ET.byId = (list, id) => list.find((x) => x.id === id);
  ET.emirateName = (id) => (ET.byId(ET.emirates, id) || {}).name || id;
  ET.catName = (id) => (ET.byId(ET.categories, id) || {}).name || id;
  ET.stars = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
  ET.imgFallback = `onerror="this.style.display='none'"`;

  /* ---------- layout: header & footer ---------- */
  const page = location.pathname.split("/").pop() || "index.html";
  const links = [
    ["index.html", "Home"], ["tours.html", "Tours & Experiences"], ["hotels.html", "Hotels"],
    ["cars.html", "Rent a Car"], ["planner.html", "Trip Planner"], ["guide.html", "Travel Guide"], ["blog.html", "Blog"], ["contact.html", "Contact"]
  ];
  const navHTML = `
  <div class="topbar">
    <div class="container">
      <div class="left">
        <a href="tel:+971554439551">${ET.icon('phone')} +971 55 443 9551</a>
        <a href="mailto:info@emiratestourist.com">${ET.icon('mail')} info@emiratestourist.com</a>
        <span>${ET.icon('clock')} 24/7 support in English, Arabic, Hindi, Urdu, Chinese & Russian</span>
      </div>
      <div class="right">
        <a href="#" data-toast="Partner portal is coming soon">Partner login</a>
        <a href="contact.html#careers">Careers</a>
        <a href="#" data-toast="Security guard & concierge services: call +971 55 443 9551">Security services</a>
      </div>
    </div>
  </div>
  <header class="nav">
    <div class="container">
      <a class="brand" href="index.html"><img src="assets/img/logo.webp" alt="Emirates Tourist - سائح الإمارات"></a>
      <nav class="menu">${links.map(([h, t]) => `<a href="${h}" class="${page === h ? "active" : ""}">${t}</a>`).join("")}</nav>
      <div class="actions">
        <div class="lang" id="langMenu">
          <button class="lang-btn" id="langBtn" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Change language">${ET.icon("globe",16)}<span id="langCur">${ET.LANGS[ET.lang].name}</span>${ET.icon("chevron-down",14,"chev")}</button>
          <div class="lang-list" role="listbox" id="langList" aria-label="Language">
            <div class="lang-head">Language · اللغة · 语言</div>
            ${Object.entries(ET.LANGS).map(([k,v])=>`<button type="button" role="option" data-lang="${k}" aria-selected="${k===ET.lang}"><span class="lang-code">${v.code}</span><span class="lang-names"><b lang="${k}">${v.name}</b><small>${v.label}</small></span><span class="tick">${ET.icon("check",16)}</span></button>`).join("")}
          </div>
        </div>
        <div class="cur-toggle"><button data-cur="AED">AED</button><button data-cur="USD">USD</button></div>
        <button class="iconbtn" id="themeBtn" title="Toggle dark mode">🌙</button>
        <div class="account" id="account"></div>
        <a class="btn btn-primary btn-sm" href="planner.html">Plan my trip</a>
        <button class="iconbtn burger" id="burger">${ET.icon("menu")}</button>
      </div>
    </div>
  </header>
  <div class="mobile-menu" id="mobileMenu">
    <button class="iconbtn close" id="closeMenu">${ET.icon("x")}</button>
    ${links.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}
    <a href="https://wa.me/971554439551" target="_blank">WhatsApp us</a>
    <div class="mobile-account" id="mobileAccount"></div>
    <div class="mobile-lang-head">${ET.icon("globe",16)} Language</div>
    <div class="mobile-lang">${Object.entries(ET.LANGS).map(([k,v])=>`<button type="button" data-lang="${k}" aria-selected="${k===ET.lang}"><span class="lang-code">${v.code}</span><span class="lang-names"><b lang="${k}">${v.name}</b><small>${v.label}</small></span></button>`).join("")}</div>
  </div>`;

  const footerHTML = `
  <footer>
    <div class="container top">
      <div>
        <a class="brand" href="index.html"><img src="assets/img/logo.webp" alt="Emirates Tourist - سائح الإمارات"></a>
        <p style="margin-top:16px;font-size:14px;max-width:320px">Licensed UAE destination management company. Tours, hotels, car hire, visas and security services across all seven emirates since 2018.</p>
        <div class="pay"><span>VISA</span><span>MASTERCARD</span><span>APPLE PAY</span><span>TABBY</span><span>PAYPAL</span></div>
      </div>
      <div><h4>Explore</h4><ul>
        <li><a href="tours.html">All tours</a></li><li><a href="tours.html?cat=desert">Desert safaris</a></li>
        <li><a href="tours.html?emirate=abu-dhabi">Abu Dhabi</a></li><li><a href="hotels.html">Hotels & resorts</a></li>
        <li><a href="cars.html">Car rental</a></li></ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="guide.html">Travel guide</a></li><li><a href="blog.html">Blog</a></li>
        <li><a href="contact.html#careers">Careers</a></li><li><a href="contact.html">Contact</a></li>
        <li><a href="#" data-toast="Trust & Safety page coming soon">Trust & safety</a></li></ul></div>
      <div><h4>Support</h4><ul>
        <li><a href="#" data-toast="Help centre coming soon">Help centre</a></li><li><a href="#" data-toast="Free cancellation up to 24h before most tours">Cancellation policy</a></li>
        <li><a href="#" data-toast="Privacy policy">Privacy policy</a></li><li><a href="#" data-toast="Terms of service">Terms of service</a></li>
        <li><a href="#" data-toast="Return policy">Return policy</a></li></ul></div>
      <div><h4>Contact</h4><ul>
        <li>${ET.icon('phone')} <a href="tel:+971554439551">+971 55 443 9551</a></li>
        <li>${ET.icon('whatsapp')} <a href="https://wa.me/971554439551" target="_blank">WhatsApp 24/7</a></li>
        <li>${ET.icon('mail')} <a href="mailto:info@emiratestourist.com">info@emiratestourist.com</a></li>
        <li>${ET.icon('map-pin')} Opal Tower, Office 1408, Burj Khalifa Boulevard, Business Bay, Dubai, UAE</li></ul>
        <div class="socials" style="margin-top:14px"><a href="#" title="Facebook" aria-label="Facebook">${ET.icon("facebook",16)}</a><a href="#" title="Instagram" aria-label="Instagram">${ET.icon("instagram",16)}</a><a href="#" title="X" aria-label="X">${ET.icon("x-social",15)}</a><a href="#" title="TikTok" aria-label="TikTok">${ET.icon("tiktok",16)}</a><a href="#" title="YouTube" aria-label="YouTube">${ET.icon("youtube",16)}</a></div>
      </div>
    </div>
    <div class="container bottom">
      <span>© ${new Date().getFullYear()} Emirates Tourist. All rights reserved. DTCM licence no. 1234567.</span>
      <span>Prices shown in ${ET.currency}. Savings compared to our lowest retail rate for the same itinerary.</span>
    </div>
  </footer>
  <a class="wa" href="https://wa.me/971554439551?text=Hi%20Emirates%20Tourist%2C%20I%27d%20like%20help%20planning%20my%20UAE%20trip" target="_blank" title="Chat on WhatsApp" aria-label="Chat on WhatsApp">${ET.icon("whatsapp", 30)}</a>
  <div class="toast" id="toast"></div>
  <div class="modal" id="modal"><div class="box"><div class="head"><h3 id="modalTitle"></h3><button class="iconbtn" id="modalClose">${ET.icon("x")}</button></div><div class="content" id="modalBody"></div></div></div>`;

  document.body.insertAdjacentHTML("afterbegin", navHTML);
  document.body.insertAdjacentHTML("beforeend", footerHTML);

  /* ---------- language ---------- */
  const langMenu = $("#langMenu"), langBtn = $("#langBtn"), langList = $("#langList");
  const setLangOpen = (o) => { langMenu.classList.toggle("open", o); langBtn.setAttribute("aria-expanded", o); if (o) (langList.querySelector('[aria-selected="true"]') || langList.querySelector("[data-lang]")).focus(); };
  langBtn.onclick = (e) => { e.stopPropagation(); setLangOpen(!langMenu.classList.contains("open")); };
  document.addEventListener("click", (e) => { if (!langMenu.contains(e.target)) setLangOpen(false); });
  langList.addEventListener("keydown", (e) => {
    const items = $$("[data-lang]", langList); const i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    if (e.key === "Escape") { setLangOpen(false); langBtn.focus(); }
  });
  const syncLangUI = () => { $("#langCur").textContent = ET.LANGS[ET.lang].name; $$("[data-lang]").forEach((b) => b.setAttribute("aria-selected", b.dataset.lang === ET.lang)); };
  $$("[data-lang]").forEach((b) => b.onclick = () => { ET.applyLang(b.dataset.lang); setLangOpen(false); $("#mobileMenu").classList.remove("open"); });
  document.addEventListener("et:lang", syncLangUI); syncLangUI();
  (() => { const p = location.pathname.split("/").pop() || "index.html"; $$(".menu a").forEach((l) => l.classList.toggle("active", l.getAttribute("href") === p || (p === "article.html" && l.getAttribute("href") === "blog.html") || (p === "tour.html" && l.getAttribute("href") === "tours.html"))); })();

  /* ---------- account / auth UI ---------- */
  const renderAccount = (u) => {
    const slot = $("#account"), mob = $("#mobileAccount");
    if (!u) {
      slot.innerHTML = `<button class="btn btn-ghost btn-sm" id="signInBtn">${ET.icon("user-round", 16)} Sign in</button>`;
      mob.innerHTML = `<button class="btn btn-dark btn-block" data-auth="signin">${ET.icon("user-round", 16)} Sign in / Create account</button>`;
    } else {
      const av = u.photo ? `<img src="${u.photo}" alt="" referrerpolicy="no-referrer">` : ET.auth.initials(u);
      slot.innerHTML = `<div class="acct"><button class="acct-btn" id="acctBtn" aria-haspopup="menu" aria-expanded="false"><span class="avatar">${av}</span><span class="acct-name">${u.name.split(" ")[0]}</span>${ET.icon("chevron-down", 14, "chev")}</button>
        <div class="acct-menu" role="menu"><div class="acct-head"><span class="avatar lg">${av}</span><div><b>${u.name}</b><small>${u.email}</small></div></div>
        <button role="menuitem" data-acct="bookings">${ET.icon("ticket", 16)} My bookings</button><button role="menuitem" data-acct="saved">${ET.icon("heart", 16)} Saved tours</button><button role="menuitem" data-acct="out">${ET.icon("log-out", 16)} Sign out</button></div></div>`;
      mob.innerHTML = `<div class="acct-head"><span class="avatar lg">${av}</span><div><b>${u.name}</b><small>${u.email}</small></div></div><div style="display:grid;gap:6px;grid-template-columns:1fr 1fr"><button class="btn btn-ghost btn-sm" data-acct="bookings">My bookings</button><button class="btn btn-ghost btn-sm" data-acct="out">Sign out</button></div>`;
    }
    const sb = $("#signInBtn"); if (sb) sb.onclick = () => ET.openAuth("signin");
    $$("[data-auth]").forEach((b) => b.onclick = () => { $("#mobileMenu").classList.remove("open"); ET.openAuth(b.dataset.auth); });
    const ab = $("#acctBtn"); if (ab) { ab.onclick = (e) => { e.stopPropagation(); const o = !ab.parentElement.classList.contains("open"); ab.parentElement.classList.toggle("open", o); ab.setAttribute("aria-expanded", o); }; document.addEventListener("click", (e) => { if (!ab.parentElement.contains(e.target)) ab.parentElement.classList.remove("open"); }); }
    $$("[data-acct]").forEach((b) => b.onclick = async () => {
      $("#mobileMenu").classList.remove("open"); $$(".acct.open").forEach((x) => x.classList.remove("open"));
      if (b.dataset.acct === "out") { await ET.auth.signOut(); ET.toast("Signed out. See you soon!"); }
      if (b.dataset.acct === "saved") { const items = [...ET.wishlist].map((id) => ET.byId(ET.tours, id)).filter(Boolean); ET.openModal("Saved tours", items.length ? `<div style="display:grid;gap:10px">${items.map((t) => `<a href="tour.html?id=${t.id}" style="display:flex;gap:12px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:10px"><img src="${t.img}" style="width:70px;height:54px;object-fit:cover;border-radius:8px" ${ET.imgFallback}><div><b style="font-size:14px">${t.title}</b><div class="muted" style="font-size:13px">${ET.emirateName(t.emirate)} · ${ET.money(t.price)}</div></div></a>`).join("")}</div>` : `<p class="muted">Tap the heart on any tour to save it here.</p>`); }
      if (b.dataset.acct === "bookings") { const l = ET.auth.bookings(); ET.openModal("My bookings", l.length ? `<div style="display:grid;gap:10px">${l.map((k) => `<div style="border:1px solid var(--line);border-radius:12px;padding:12px 14px;display:flex;justify-content:space-between;gap:12px;align-items:center"><div><b style="font-size:14px">${k.title}</b><div class="muted" style="font-size:13px">${new Date(k.date).toDateString()} · ${k.pax} · Ref ${k.ref}</div></div><span class="badge badge-gold">${k.status}</span></div>`).join("")}</div>` : `<div class="success" style="padding:10px 0"><div style="color:var(--gold)">${ET.icon("ticket", 44)}</div><b>No bookings yet</b><p class="muted" style="margin-top:6px">Bookings you make while signed in appear here.</p><a class="btn btn-dark" href="tours.html" style="margin-top:14px">Browse tours</a></div>`); }
    });
  };
  ET.auth.onChange(renderAccount);

  ET.openAuth = (mode = "signin") => {
    const demoNote = ET.auth.mode === "demo" ? `<div class="auth-note">${ET.icon("shield-check", 14)} Demo mode: accounts are stored in this browser only. Add Firebase keys to go live.</div>` : "";
    const render = () => {
      const isUp = mode === "signup", isReset = mode === "reset";
      $("#modalTitle").textContent = isReset ? "Reset password" : isUp ? "Create account" : "Sign in";
      $("#modalBody").innerHTML = `
        ${isReset ? "" : `<div class="auth-tabs"><button class="${!isUp ? "on" : ""}" data-m="signin">Sign in</button><button class="${isUp ? "on" : ""}" data-m="signup">Create account</button></div>
        <button class="btn btn-ghost btn-block btn-google" id="gBtn">${ET.icon("google", 18)} Continue with Google</button>
        <div class="auth-or"><span>or</span></div>`}
        <form class="form auth-form" id="authForm" novalidate>
          ${isUp ? `<div class="field"><label>Full name</label><input id="aName" autocomplete="name" placeholder="Your name"></div>` : ""}
          <div class="field"><label>Email</label><input id="aEmail" type="email" autocomplete="email" placeholder="you@gmail.com"></div>
          ${isReset ? "" : `<div class="field pw"><label>Password</label><input id="aPass" type="password" autocomplete="${isUp ? "new-password" : "current-password"}" placeholder="${isUp ? "At least 8 characters" : "Your password"}"><button type="button" class="pw-toggle" id="pwT" aria-label="Show password">${ET.icon("eye", 16)}</button></div>`}
          <div class="auth-err" id="aErr" hidden></div>
          <button class="btn btn-primary btn-block" id="aGo">${isReset ? "Send reset link" : isUp ? "Create account" : "Sign in"}</button>
          ${isReset ? `<button type="button" class="auth-link" data-m="signin">Back to sign in</button>` : isUp ? `<div class="auth-foot">Already have an account? <button type="button" class="auth-link" data-m="signin">Sign in</button></div>` : `<div class="auth-foot"><button type="button" class="auth-link" data-m="reset">Forgot password?</button></div>`}
        </form>
        ${demoNote}
        <small class="muted" style="text-align:center;display:block">By continuing you agree to our terms of service and privacy policy.</small>`;
      $$("[data-m]").forEach((b) => b.onclick = () => { mode = b.dataset.m; render(); });
      const pwT = $("#pwT"); if (pwT) pwT.onclick = () => { const i = $("#aPass"); i.type = i.type === "password" ? "text" : "password"; pwT.innerHTML = ET.icon(i.type === "password" ? "eye" : "eye-off", 16); };
      const fail = (m) => { const e = $("#aErr"); e.textContent = m; e.hidden = false; };
      const busy = (b) => { const g = $("#aGo"); g.disabled = b; g.style.opacity = b ? .6 : 1; };
      const done = (u, msg) => { ET.closeModal(); ET.toast(msg || `Welcome, ${u.name.split(" ")[0]}!`); };
      const gb = $("#gBtn"); if (gb) gb.onclick = async () => { try { gb.disabled = true; const u = await ET.auth.signInGoogle(); done(u); } catch (e) { fail(e.friendly ? e.message : "Google sign-in failed. Please try again."); gb.disabled = false; } };
      $("#authForm").onsubmit = async (ev) => {
        ev.preventDefault(); $("#aErr").hidden = true; busy(true);
        try {
          if (isReset) { await ET.auth.reset($("#aEmail").value); mode = "signin"; render(); ET.toast("If that email exists, a reset link is on its way."); return; }
          const u = isUp ? await ET.auth.signUp($("#aName").value, $("#aEmail").value, $("#aPass").value) : await ET.auth.signInEmail($("#aEmail").value, $("#aPass").value);
          done(u, isUp ? `Account created. Welcome, ${u.name.split(" ")[0]}!` : undefined);
        } catch (e) { fail(e.friendly ? e.message : "Something went wrong. Please try again."); } finally { busy(false); }
      };
      setTimeout(() => ($("#aName") || $("#aEmail")).focus(), 50);
    };
    ET.openModal("Sign in", ""); render();
  };
  document.addEventListener("click", (e) => { const t = e.target.closest("[data-open-auth]"); if (t) { e.preventDefault(); ET.openAuth(t.dataset.openAuth || "signin"); } });

  /* ---------- theme ---------- */
  const applyTheme = (t) => { document.documentElement.dataset.theme = t; $("#themeBtn").innerHTML = t === "dark" ? ET.icon("sun") : ET.icon("moon"); };
  applyTheme(store.get("theme", "light"));
  $("#themeBtn").onclick = () => { const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; store.set("theme", t); applyTheme(t); };

  /* ---------- currency ---------- */
  const syncCur = () => $$(".cur-toggle button").forEach((b) => b.classList.toggle("on", b.dataset.cur === ET.currency));
  syncCur();
  $$(".cur-toggle button").forEach((b) => b.onclick = () => { ET.currency = b.dataset.cur; store.set("cur", ET.currency); syncCur(); document.dispatchEvent(new Event("et:currency")); ET.toast("Prices now in " + ET.currency); });

  /* ---------- mobile menu ---------- */
  $("#burger").onclick = () => $("#mobileMenu").classList.add("open");
  $("#closeMenu").onclick = () => $("#mobileMenu").classList.remove("open");

  /* ---------- toast ---------- */
  let toastT;
  ET.toast = (msg) => { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600); };
  document.addEventListener("click", (e) => { const a = e.target.closest("[data-toast]"); if (a) { e.preventDefault(); ET.toast(a.dataset.toast); } });

  /* ---------- wishlist ---------- */
  const syncWish = () => { const wc = $("#wishCount"); if (wc) wc.textContent = ET.wishlist.size || ""; $$(".heart").forEach((h) => h.classList.toggle("on", ET.wishlist.has(h.dataset.id))); };
  ET.toggleWish = (id) => { ET.wishlist.has(id) ? ET.wishlist.delete(id) : ET.wishlist.add(id); store.set("wish", [...ET.wishlist]); syncWish(); ET.toast(ET.wishlist.has(id) ? "Saved to your wishlist ♥" : "Removed from wishlist"); };
  document.addEventListener("click", (e) => { const h = e.target.closest(".heart"); if (h) { e.preventDefault(); e.stopPropagation(); ET.toggleWish(h.dataset.id); } });
  const wishBtn = $("#wishBtn"); if (wishBtn) wishBtn.onclick = () => {
    const items = [...ET.wishlist].map((id) => ET.byId(ET.tours, id)).filter(Boolean);
    ET.openModal("Your wishlist", items.length ? items.map((t) => `<a href="tour.html?id=${t.id}">${t.title}</a>`).join("<br>") : "<p class=\"muted\">Tap the ♡ on any tour to save it here.</p>");
  };
  document.addEventListener("et:rendered", syncWish);
  syncWish();

  /* ---------- modal ---------- */
  ET.openModal = (title, html) => { $("#modalTitle").textContent = title; $("#modalBody").innerHTML = html; $("#modal").classList.add("open"); document.body.style.overflow = "hidden"; };
  ET.closeModal = () => { $("#modal").classList.remove("open"); document.body.style.overflow = ""; };
  $("#modalClose").onclick = ET.closeModal;
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") ET.closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") ET.closeModal(); });

  /* ---------- booking flow ---------- */
  ET.book = (tourId, preset = {}) => {
    const t = ET.byId(ET.tours, tourId); if (!t) return;
    const today = new Date(); today.setDate(today.getDate() + 1);
    const st = { adults: preset.adults || 2, children: preset.children || 0, date: preset.date || today.toISOString().slice(0, 10), pickup: t.pickup };
    const render = () => {
      const sub = st.adults * t.price + st.children * t.price * 0.7;
      const disc = t.was ? Math.round((1 - t.price / t.was) * 100) : 0;
      $("#modalBody").innerHTML = `
        <div style="display:flex;gap:14px;align-items:center"><img src="${t.img}" style="width:90px;height:68px;object-fit:cover;border-radius:10px" ${ET.imgFallback}><div><b>${t.title}</b><div class="muted" style="font-size:13px">${ET.emirateName(t.emirate)} · ${t.duration} · ${ET.icon('star')} ${t.rating}</div></div></div>
        <div class="row">
          <div class="field"><label>Date</label><input type="date" id="bDate" value="${st.date}" min="${new Date().toISOString().slice(0, 10)}"></div>
          <div class="field"><label>Pickup</label><select id="bPick"><option ${st.pickup ? "selected" : ""}>Hotel pickup (included)</option><option ${!st.pickup ? "selected" : ""}>Meet at location</option></select></div>
        </div>
        <div class="row">
          <div><label class="muted" style="font-size:12px;font-weight:700">ADULTS</label><div class="qty"><button data-q="adults" data-d="-1">−</button><span>${st.adults}</span><button data-q="adults" data-d="1">+</button></div></div>
          <div><label class="muted" style="font-size:12px;font-weight:700">CHILDREN (3–11, 30% off)</label><div class="qty"><button data-q="children" data-d="-1">−</button><span>${st.children}</span><button data-q="children" data-d="1">+</button></div></div>
        </div>
        <div class="summary">
          <div style="display:flex;justify-content:space-between"><span>${st.adults} × adult</span><span>${ET.money(st.adults * t.price)}</span></div>
          ${st.children ? `<div style="display:flex;justify-content:space-between"><span>${st.children} × child</span><span>${ET.money(st.children * t.price * 0.7)}</span></div>` : ""}
          ${disc ? `<div style="display:flex;justify-content:space-between;color:var(--ok)"><span>Online discount</span><span>−${disc}% applied</span></div>` : ""}
          <div class="tot"><span>Total</span><span>${ET.money(sub)}</span></div>
          <small class="muted">✓ Free cancellation up to 24 h before · ✓ Reserve now, pay later · ✓ Instant confirmation</small>
        </div>
        <div class="row"><input class="field" style="padding:12px 14px" id="bName" placeholder="Full name" value="${ET.auth.user ? ET.auth.user.name : ""}"><input class="field" style="padding:12px 14px" id="bPhone" placeholder="WhatsApp number"></div>
        ${ET.auth.user ? `<small class="muted">Booking as <b>${ET.auth.user.email}</b>. It will appear in My bookings.</small>` : `<small class="muted"><a href="#" data-open-auth="signin" style="color:var(--navy);text-decoration:underline">Sign in</a> to track this booking in your account (optional).</small>`}
        <button class="btn btn-primary btn-block" id="bConfirm">Confirm booking · ${ET.money(sub)}</button>`;
      $$("[data-q]").forEach((b) => b.onclick = () => { st[b.dataset.q] = Math.max(b.dataset.q === "adults" ? 1 : 0, Math.min(12, st[b.dataset.q] + +b.dataset.d)); render(); });
      $("#bDate").onchange = (e) => (st.date = e.target.value);
      $("#bConfirm").onclick = () => {
        const name = $("#bName").value.trim();
        if (!name) { ET.toast("Please enter your name"); $("#bName").focus(); return; }
        const ref = "ET-" + Math.random().toString(36).slice(2, 8).toUpperCase();
        ET.auth.addBooking({ ref, id: t.id, title: t.title, date: st.date, pax: `${st.adults} adults${st.children ? ", " + st.children + " children" : ""}`, total: sub, status: "Confirmed", created: Date.now() });
        $("#modalBody").innerHTML = `<div class="success"><div class="ic">${ET.icon("check", 34)}</div><h3 style="font-size:24px;margin-bottom:8px">You're booked, ${name.split(" ")[0]}!</h3><p class="muted">Reference <b>${ref}</b>. We've sent your e-ticket and a WhatsApp confirmation. Your guide will message you the evening before.</p><div class="summary" style="text-align:left;margin:18px 0"><div><b>${t.title}</b></div><div>${new Date(st.date).toDateString()} · ${st.adults} adults${st.children ? ", " + st.children + " children" : ""}</div><div class="tot"><span>Paid</span><span>${ET.money(sub)}</span></div></div><button class="btn btn-dark" onclick="ET.closeModal()">Done</button></div>`;
      };
    };
    ET.openModal("Book this experience", "");
    render();
  };
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-book]"); if (b) { e.preventDefault(); ET.book(b.dataset.book); } });

  /* ---------- renderers ---------- */
  ET.tourCard = (t) => `
    <a class="card reveal" href="tour.html?id=${t.id}">
      <div class="media"><img src="${t.img}" alt="${t.title}" loading="lazy" ${ET.imgFallback}>
        ${t.badge ? `<span class="badge badge-gold">${t.badge}</span>` : ""}
        <button class="heart" data-id="${t.id}" title="Save">${ET.icon("heart", 16)}</button></div>
      <div class="body">
        <div class="meta"><span>${ET.icon('map-pin')} ${ET.emirateName(t.emirate)}</span><span>${ET.icon('clock')} ${t.duration}</span>${t.pickup ? "<span>" + ET.icon("bus") + " Pickup</span>" : ""}</div>
        <h3>${t.title}</h3>
        <div class="rating"><span class="stars">${ET.stars(t.rating)}</span><b>${t.rating}</b><span class="muted">(${t.reviews.toLocaleString()} reviews)</span></div>
        <div class="foot"><div class="price"><small>from, per adult</small><b>${ET.money(t.price)}</b>${t.was ? `<s>${ET.money(t.was)}</s>` : ""}</div><span class="btn btn-dark btn-sm" data-book="${t.id}">Book now</span></div>
      </div></a>`;

  ET.hotelCard = (h) => `
    <div class="hotel reveal">
      <div class="media"><img src="${h.img}" alt="${h.name}" loading="lazy" ${ET.imgFallback}></div>
      <div class="body">
        <div style="display:flex;justify-content:space-between;align-items:center"><span class="stars">${"★".repeat(h.stars)}</span><span class="score">${h.rating}</span></div>
        <h3 style="font-family:var(--font-body);font-size:18px">${h.name}</h3>
        <div class="muted" style="font-size:13px">${ET.icon('map-pin')} ${h.area}, ${ET.emirateName(h.emirate)} · ${h.reviews.toLocaleString()} reviews</div>
        <div class="perks">${h.perks.map((p) => `<span>${p}</span>`).join("")}</div>
        <div class="foot"><div class="price"><small>per night, taxes incl.</small><b>${ET.money(h.price)}</b></div><button class="btn btn-dark btn-sm" data-toast="Hotel checkout demo: ${h.name} reserved. Pay at the hotel.">Reserve</button></div>
      </div></div>`;

  ET.carCard = (c) => `
    <div class="car reveal">
      <div class="media"><img src="${c.img}" alt="${c.name}" loading="lazy" ${ET.imgFallback}></div>
      <div class="body">
        <span class="badge badge-navy">${c.cls}</span>
        <h3 style="font-family:var(--font-body);font-size:18px;margin-top:8px">${c.name}</h3>
        <div class="specs"><span>${ET.icon('user')} ${c.seats} seats</span><span>${ET.icon('luggage')} ${c.bags} bags</span><span>${ET.icon('gauge')} ${c.trans}</span><span>${ET.icon('snowflake')} A/C</span></div>
        <div class="foot"><div class="price"><small>per day · ${ET.money(c.week)}/week</small><b>${ET.money(c.day)}</b></div><button class="btn btn-dark btn-sm" data-toast="Car hire demo: ${c.name} added. Free delivery to your hotel.">Rent</button></div>
      </div></div>`;

  ET.postCard = (p) => `
    <a class="post reveal" href="article.html?id=${p.id}">
      <div class="media"><img src="${p.img}" alt="" loading="lazy" ${ET.imgFallback}></div>
      <div class="meta">${p.cat} · ${new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · ${p.read} read</div>
      <h3>${p.title}</h3><p>${p.excerpt}</p></a>`;

  ET.reviewCard = (r) => `
    <div class="review reveal"><div class="stars">${ET.stars(r.rating)}</div><p class="quote">“${r.text}”</p>
      <div class="who"><div class="av">${r.name.split(" ").map(w => w[0]).join("").replace(".", "")}</div><div><b>${r.name}</b><small>${r.country} · ${r.tour}</small></div></div></div>`;

  /* ---------- smart trip planner ---------- */
  ET.plan = ({ days, interests, budget, base }) => {
    const pool = ET.tours.filter((t) => (interests.length ? interests.includes(t.cat) : true));
    const sorted = [...(pool.length >= days ? pool : ET.tours)].sort((a, b) => b.rating * Math.log(b.reviews) - a.rating * Math.log(a.reviews));
    const perDay = budget === "value" ? 300 : budget === "premium" ? 1200 : 600;
    const used = new Set(); const out = [];
    for (let d = 1; d <= days; d++) {
      let pick = sorted.find((t) => !used.has(t.id) && t.price <= perDay && (d > 1 || t.emirate === base || base === "any")) || sorted.find((t) => !used.has(t.id)) || sorted[0];
      used.add(pick.id);
      const extra = d === 1 ? "Arrive, check in and settle at your hotel" : (d === days ? "Souvenir shopping and airport transfer" : "Free time at the beach or mall");
      out.push({ day: d, tour: pick, extra });
    }
    return out;
  };

  /* ---------- arrows in buttons -> icons ---------- */
  ET.arrowify = () => $$(".btn").forEach((b) => { for (const n of [...b.childNodes]) { if (n.nodeType === 3 && /\s*(→|←)\s*$/.test(n.nodeValue)) { n.nodeValue = n.nodeValue.replace(/\s*(→|←)\s*$/, ""); n.__en = n.nodeValue; b.insertAdjacentHTML("beforeend", ET.icon("arrow-right", 16, "arrow")); } } });
  ET.arrowify(); document.addEventListener("et:rendered", ET.arrowify);

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 });
  ET.observe = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  ET.observe();
  document.addEventListener("et:rendered", ET.observe);

  /* ---------- SEO: structured data ---------- */
  ET.ld = (obj) => { const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(obj); document.head.appendChild(s); };
  ET.seo = (() => {
    const base = "https://emiratestourist.com/";
    const org = { "@type": "TravelAgency", "@id": base + "#org", name: "Emirates Tourist", url: base, logo: base + "assets/img/logo.webp", image: base + "assets/img/dubai-skyline-sunset.webp",
      telephone: "+971554439551", email: "info@emiratestourist.com", priceRange: "AED 85 - AED 2,500",
      address: { "@type": "PostalAddress", streetAddress: "Opal Tower, Office 1408, Burj Khalifa Boulevard, Business Bay", addressLocality: "Dubai", addressCountry: "AE" },
      areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah", "Al Ain"],
      availableLanguage: ["English", "Arabic", "Hindi", "Urdu", "Chinese", "Russian"],
      contactPoint: { "@type": "ContactPoint", telephone: "+971554439551", contactType: "customer service", availableLanguage: ["en", "ar", "hi", "ur", "zh", "ru"], hoursAvailable: "Mo-Su 00:00-23:59" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "21480" } };
    const site = { "@type": "WebSite", "@id": base + "#website", url: base, name: "Emirates Tourist", publisher: { "@id": base + "#org" }, inLanguage: ["en", "ar", "hi", "ur", "zh", "ru"],
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: base + "tours.html?q={search_term_string}" }, "query-input": "required name=search_term_string" } };
    ET.ld({ "@context": "https://schema.org", "@graph": [org, site] });
    let crumbsDone = false;
    const addCrumbs = () => { if (crumbsDone) return; const links = [...document.querySelectorAll(".crumbs a")]; if (!links.length) return; crumbsDone = true;
      let tail = document.querySelector(".crumbs").textContent.split("›").pop().trim(); if (!tail || tail === links[links.length - 1].textContent.trim()) tail = (document.querySelector("h1")?.textContent || document.title).trim();
      ET.ld({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [...links.map((l) => ({ name: l.textContent.trim(), url: new URL(l.getAttribute("href"), base).href })), { name: tail, url: location.href.split("#")[0] }].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })) }); };
    addCrumbs(); document.addEventListener("et:rendered", addCrumbs);
    return true;
  })();

  /* ---------- query helpers ---------- */
  ET.q = new URLSearchParams(location.search);
})();
