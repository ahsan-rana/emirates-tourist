# Emirates Tourist — new website

A fast, static, mobile-first site for emiratestourist.com. No build step and no framework: plain HTML, CSS and JavaScript, so it can be hosted anywhere (cPanel, Netlify, Vercel, Cloudflare Pages, GitHub Pages) or wrapped into a WordPress theme later.

## Run locally

```bash
python -m http.server 8765
```

Then open http://localhost:8765.

## Pages

| File | What it does |
|---|---|
| `index.html` | Home: hero search (tours / hotels / cars / visa), categories, featured tours with emirate filter, smart trip planner, destinations, interactive Leaflet map, why-us, stats, hotels, cars, travel guide snapshot, reviews, blog, newsletter |
| `tours.html` | Listing with sidebar filters (emirate, activity, max price, pickup, on sale, 4.9+) and sorting. Deep-linkable: `?emirate=dubai`, `?cat=desert` |
| `tour.html?id=t1` | Tour detail: gallery, highlights, inclusions, itinerary timeline, reviews, sticky booking box, WhatsApp question link, similar tours |
| `hotels.html` | Hotel listing with star, emirate and price filters |
| `cars.html` | Fleet by class plus an instant quote calculator (daily/weekly rates, delivery, insurance, chauffeur) |
| `planner.html` | Four-question itinerary builder with per-day swaps, live total and "send to WhatsApp" |
| `guide.html` | Essentials, visa table, month-by-month temperature chart, FAQ, blog |
| `blog.html` | Blog listing with featured post and category filter |
| `article.html?id=p1` | Full article page with table of contents, share buttons, related posts and Article schema |
| `contact.html` | Contact channels, careers note, enquiry form |
| `404.html` | Not-found page (served automatically by GitHub Pages) |

Shared pieces live in `assets/`:

- `i18n.js` — UI translations for English, Arabic, Hindi, Urdu, Chinese and Russian, keyed by the English string, plus the language engine (RTL for Arabic/Urdu). Add a key to every language block when you add new UI text.
- `icons.js` — SVG icon set (Lucide + Simple Icons). Use `ET.icon('name', size)`.
- `articles.js` — full blog article bodies, keyed by post id.
- `data.js` — all content (emirates, tours, hotels, cars, posts, reviews, guide). Edit prices and copy here.
- `app.js` — header/footer injection, AED/USD toggle, dark mode, wishlist, booking modal, trip planner logic, card renderers.
- `styles.css` — design system (navy + gold + sand palette, Playfair Display + Plus Jakarta Sans), light and dark themes, responsive rules.

## Sign in (Google + email/password)

`assets/auth.js` provides sign-in with Google and with email/password, a signed-in header menu, and bookings saved per account. It runs in **demo mode** (accounts stored in the visitor's browser) until you connect Firebase Authentication, which is free for this volume:

1. Create a project at https://console.firebase.google.com and add a **Web app**.
2. In **Authentication → Sign-in method**, enable **Google** and **Email/Password**.
3. In **Authentication → Settings → Authorized domains**, add `emiratestourist.com`.
4. Copy the web config object and paste it into `ET.AUTH_CONFIG` at the top of `assets/auth.js`.

No other code changes are needed. Bookings are still stored in the browser; moving them to Firestore is the next step.

## Demo-only behaviour

Bookings, reservations, the newsletter and the contact form show confirmations in the browser and do not send data anywhere yet. Wiring to a real backend (Stripe checkout, a CRM, WhatsApp Business API) is the next step. Photos are Unsplash placeholders; replace them with your own tour photography for the live site.
