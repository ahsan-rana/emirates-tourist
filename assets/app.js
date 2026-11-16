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
    ["cars.html", "Rent a Car"], ["planner.html", "Trip Planner"], ["guide.html", "Travel Guide"], ["contact.html", "Contact"]
  ];
  const navHTML = `
  <div class="topbar">
    <div class="container">
      <div class="left">
        <a href="tel:+971554439551">📞 +971 55 443 9551</a>
        <a href="mailto:info@emiratestourist.com">✉️ info@emiratestourist.com</a>
        <span>🕐 24/7 support in English, Arabic, Hindi, Urdu, Chinese & Russian</span>
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
      <a class="brand" href="index.html"><span class="logo">ET</span><span>Emirates Tourist<small>Explore the UAE</small></span></a>
      <nav class="menu">${links.map(([h, t]) => `<a href="${h}" class="${page === h ? "active" : ""}">${t}</a>`).join("")}</nav>
      <div class="actions">
        <div class="cur-toggle"><button data-cur="AED">AED</button><button data-cur="USD">USD</button></div>
        <button class="iconbtn" id="themeBtn" title="Toggle dark mode">🌙</button>
        <button class="iconbtn" id="wishBtn" title="Wishlist">♡<span id="wishCount" style="font-size:11px;margin-left:2px"></span></button>
        <a class="btn btn-primary btn-sm" href="planner.html">Plan my trip</a>
        <button class="iconbtn burger" id="burger">☰</button>
      </div>
    </div>
  </header>
  <div class="mobile-menu" id="mobileMenu">
    <button class="iconbtn close" id="closeMenu">✕</button>
    ${links.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}
    <a href="https://wa.me/971554439551" target="_blank">WhatsApp us</a>
  </div>`;

  const footerHTML = `
  <footer>
    <div class="container top">
      <div>
        <a class="brand" href="index.html"><span class="logo">ET</span><span>Emirates Tourist<small>Explore the UAE</small></span></a>
        <p style="margin-top:16px;font-size:14px;max-width:320px">Licensed UAE destination management company. Tours, hotels, car hire, visas and security services across all seven emirates since 2018.</p>
        <div class="pay"><span>VISA</span><span>MASTERCARD</span><span>APPLE PAY</span><span>TABBY</span><span>PAYPAL</span></div>
      </div>
      <div><h4>Explore</h4><ul>
        <li><a href="tours.html">All tours</a></li><li><a href="tours.html?cat=desert">Desert safaris</a></li>
        <li><a href="tours.html?emirate=abu-dhabi">Abu Dhabi</a></li><li><a href="hotels.html">Hotels & resorts</a></li>
        <li><a href="cars.html">Car rental</a></li></ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="guide.html">Travel guide</a></li><li><a href="index.html#blog">Blog</a></li>
        <li><a href="contact.html#careers">Careers</a></li><li><a href="contact.html">Contact</a></li>
        <li><a href="#" data-toast="Trust & Safety page coming soon">Trust & safety</a></li></ul></div>
      <div><h4>Support</h4><ul>
        <li><a href="#" data-toast="Help centre coming soon">Help centre</a></li><li><a href="#" data-toast="Free cancellation up to 24h before most tours">Cancellation policy</a></li>
        <li><a href="#" data-toast="Privacy policy">Privacy policy</a></li><li><a href="#" data-toast="Terms of service">Terms of service</a></li>
        <li><a href="#" data-toast="Return policy">Return policy</a></li></ul></div>
      <div><h4>Contact</h4><ul>
        <li>📞 <a href="tel:+971554439551">+971 55 443 9551</a></li>
        <li>💬 <a href="https://wa.me/971554439551" target="_blank">WhatsApp 24/7</a></li>
        <li>✉️ <a href="mailto:info@emiratestourist.com">info@emiratestourist.com</a></li>
        <li>📍 Dubai, United Arab Emirates</li>
        <li>📍 1207 Delaware Ave #2886, Wilmington, DE 19806</li></ul>
        <div class="socials" style="margin-top:14px"><a href="#" title="Facebook">f</a><a href="#" title="Instagram">ig</a><a href="#" title="X">x</a><a href="#" title="TikTok">tt</a><a href="#" title="YouTube">yt</a></div>
      </div>
    </div>
    <div class="container bottom">
      <span>© ${new Date().getFullYear()} Emirates Tourist. All rights reserved. DTCM licence no. 1234567.</span>
      <span>Prices shown in ${ET.currency}. Savings compared to our lowest retail rate for the same itinerary.</span>
    </div>
  </footer>
  <a class="wa" href="https://wa.me/971554439551?text=Hi%20Emirates%20Tourist%2C%20I%27d%20like%20help%20planning%20my%20UAE%20trip" target="_blank" title="Chat on WhatsApp">💬</a>
  <div class="toast" id="toast"></div>
  <div class="modal" id="modal"><div class="box"><div class="head"><h3 id="modalTitle"></h3><button class="iconbtn" id="modalClose">✕</button></div><div class="content" id="modalBody"></div></div></div>`;

  document.body.insertAdjacentHTML("afterbegin", navHTML);
  document.body.insertAdjacentHTML("beforeend", footerHTML);

  /* ---------- theme ---------- */
  const applyTheme = (t) => { document.documentElement.dataset.theme = t; $("#themeBtn").textContent = t === "dark" ? "☀️" : "🌙"; };
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
  const syncWish = () => { $("#wishCount").textContent = ET.wishlist.size || ""; $$(".heart").forEach((h) => h.classList.toggle("on", ET.wishlist.has(h.dataset.id))); };
  ET.toggleWish = (id) => { ET.wishlist.has(id) ? ET.wishlist.delete(id) : ET.wishlist.add(id); store.set("wish", [...ET.wishlist]); syncWish(); ET.toast(ET.wishlist.has(id) ? "Saved to your wishlist ♥" : "Removed from wishlist"); };
  document.addEventListener("click", (e) => { const h = e.target.closest(".heart"); if (h) { e.preventDefault(); e.stopPropagation(); ET.toggleWish(h.dataset.id); } });
  $("#wishBtn").onclick = () => {
    const items = [...ET.wishlist].map((id) => ET.byId(ET.tours, id)).filter(Boolean);
    ET.openModal("Your wishlist", items.length ? `<div style="display:grid;gap:10px">${items.map((t) => `<a href="tour.html?id=${t.id}" style="display:flex;gap:12px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:10px"><img src="${t.img}" style="width:70px;height:54px;object-fit:cover;border-radius:8px" ${ET.imgFallback}><div><b style="font-size:14px">${t.title}</b><div class="muted" style="font-size:13px">${ET.emirateName(t.emirate)} · ${ET.money(t.price)}</div></div></a>`).join("")}</div>` : `<p class="muted">Tap the ♡ on any tour to save it here.</p>`);
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
        <div style="display:flex;gap:14px;align-items:center"><img src="${t.img}" style="width:90px;height:68px;object-fit:cover;border-radius:10px" ${ET.imgFallback}><div><b>${t.title}</b><div class="muted" style="font-size:13px">${ET.emirateName(t.emirate)} · ${t.duration} · ⭐ ${t.rating}</div></div></div>
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
        <div class="row"><input class="field" style="padding:12px 14px" id="bName" placeholder="Full name"><input class="field" style="padding:12px 14px" id="bPhone" placeholder="WhatsApp number"></div>
        <button class="btn btn-primary btn-block" id="bConfirm">Confirm booking · ${ET.money(sub)}</button>`;
      $$("[data-q]").forEach((b) => b.onclick = () => { st[b.dataset.q] = Math.max(b.dataset.q === "adults" ? 1 : 0, Math.min(12, st[b.dataset.q] + +b.dataset.d)); render(); });
      $("#bDate").onchange = (e) => (st.date = e.target.value);
      $("#bConfirm").onclick = () => {
        const name = $("#bName").value.trim();
        if (!name) { ET.toast("Please enter your name"); $("#bName").focus(); return; }
        const ref = "ET-" + Math.random().toString(36).slice(2, 8).toUpperCase();
        $("#modalBody").innerHTML = `<div class="success"><div class="ic">✓</div><h3 style="font-size:24px;margin-bottom:8px">You're booked, ${name.split(" ")[0]}!</h3><p class="muted">Reference <b>${ref}</b>. We've sent your e-ticket and a WhatsApp confirmation. Your guide will message you the evening before.</p><div class="summary" style="text-align:left;margin:18px 0"><div><b>${t.title}</b></div><div>${new Date(st.date).toDateString()} · ${st.adults} adults${st.children ? ", " + st.children + " children" : ""}</div><div class="tot"><span>Paid</span><span>${ET.money(sub)}</span></div></div><button class="btn btn-dark" onclick="ET.closeModal()">Done</button></div>`;
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
        <button class="heart" data-id="${t.id}" title="Save">♥</button></div>
      <div class="body">
        <div class="meta"><span>📍 ${ET.emirateName(t.emirate)}</span><span>⏱ ${t.duration}</span>${t.pickup ? "<span>🚐 Pickup</span>" : ""}</div>
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
        <div class="muted" style="font-size:13px">📍 ${h.area}, ${ET.emirateName(h.emirate)} · ${h.reviews.toLocaleString()} reviews</div>
        <div class="perks">${h.perks.map((p) => `<span>${p}</span>`).join("")}</div>
        <div class="foot"><div class="price"><small>per night, taxes incl.</small><b>${ET.money(h.price)}</b></div><button class="btn btn-dark btn-sm" data-toast="Hotel checkout demo: ${h.name} reserved. Pay at the hotel.">Reserve</button></div>
      </div></div>`;

  ET.carCard = (c) => `
    <div class="car reveal">
      <div class="media"><img src="${c.img}" alt="${c.name}" loading="lazy" ${ET.imgFallback}></div>
      <div class="body">
        <span class="badge badge-navy">${c.cls}</span>
        <h3 style="font-family:var(--font-body);font-size:18px;margin-top:8px">${c.name}</h3>
        <div class="specs"><span>👤 ${c.seats} seats</span><span>🧳 ${c.bags} bags</span><span>⚙️ ${c.trans}</span><span>❄️ A/C</span></div>
        <div class="foot"><div class="price"><small>per day · ${ET.money(c.week)}/week</small><b>${ET.money(c.day)}</b></div><button class="btn btn-dark btn-sm" data-toast="Car hire demo: ${c.name} added. Free delivery to your hotel.">Rent</button></div>
      </div></div>`;

  ET.postCard = (p) => `
    <a class="post reveal" href="#" data-toast="Full article coming soon in the live build">
      <div class="media"><img src="${p.img}" alt="" loading="lazy" ${ET.imgFallback}></div>
      <div class="meta">${p.cat} · ${new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · ${p.read} read</div>
      <h3>${p.title}</h3><p>${p.excerpt}</p></a>`;

  ET.reviewCard = (r) => `
    <div class="review reveal"><div class="stars">${ET.stars(r.rating)}</div><p class="quote">“${r.text}”</p>
      <div class="who"><div class="av">${r.flag}</div><div><b>${r.name}</b><small>${r.country} · ${r.tour}</small></div></div></div>`;

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

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 });
  ET.observe = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  ET.observe();
  document.addEventListener("et:rendered", ET.observe);

  /* ---------- query helpers ---------- */
  ET.q = new URLSearchParams(location.search);
})();
