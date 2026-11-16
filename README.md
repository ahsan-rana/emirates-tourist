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

## Sign in and live data (Firebase)

The site uses Firebase project `emirates-tourist` (Google account of the site owner):

- **Authentication**: Google and Email/Password providers, authorized domain `emiratestourist.com`. Code in `assets/auth.js` (web config at the top; the key is public by design and protected by the authorized-domain list and security rules).
- **Cloud Firestore** (region me-central1) stores `bookings`, `enquiries` (contact form), `subscribers` (newsletter) and `users`. Code in `assets/db.js`; security rules in `firestore.rules` (published in the console: visitors can create, only owners can read their bookings, nothing is readable publicly).
- View and manage data at https://console.firebase.google.com/project/emirates-tourist/firestore and users at https://console.firebase.google.com/project/emirates-tourist/authentication/users.

## Demo-only behaviour

Tour bookings, contact enquiries and newsletter sign-ups are saved to Firestore. Hotel and car reservations still only show a confirmation toast. Online payment (Stripe) and automatic WhatsApp/email notifications to staff are the next steps. Photos are Unsplash placeholders; replace them with your own tour photography for the live site.
