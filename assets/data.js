/* Emirates Tourist — demo content data
   All prices are in AED. USD shown via live toggle (1 USD = 3.6725 AED). */

window.ET = window.ET || {};

ET.RATE_USD = 3.6725;

ET.emirates = [
  { id: "dubai", name: "Dubai", tagline: "Skyline, souks & superlatives", lat: 25.2048, lng: 55.2708, tours: 48,
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=70",
    blurb: "Burj Khalifa, Palm Jumeirah, desert safaris and the world's biggest mall. Dubai is where the UAE's ambition is on full display." },
  { id: "abu-dhabi", name: "Abu Dhabi", tagline: "Culture, calm & grand mosques", lat: 24.4539, lng: 54.3773, tours: 31,
    img: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=70",
    blurb: "Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, Yas Island thrills and the serene mangroves of the capital." },
  { id: "sharjah", name: "Sharjah", tagline: "Heritage heart of the UAE", lat: 25.3463, lng: 55.4209, tours: 14,
    img: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=70",
    blurb: "UNESCO-crowned cultural capital with museums, restored souks and the Al Noor Island art gardens." },
  { id: "ras-al-khaimah", name: "Ras Al Khaimah", tagline: "Mountains & the world's longest zipline", lat: 25.8007, lng: 55.9762, tours: 19,
    img: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1200&q=70",
    blurb: "Jebel Jais peaks, Jais Flight zipline, pristine beaches and bedouin camps under the stars." },
  { id: "fujairah", name: "Fujairah", tagline: "East-coast diving & wadis", lat: 25.1288, lng: 56.3265, tours: 11,
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=70",
    blurb: "Snorkel Snoopy Island, hike Wadi Wurayah, and visit the UAE's oldest mosque on the Gulf of Oman." },
  { id: "ajman", name: "Ajman", tagline: "Laid-back beaches & dhow yards", lat: 25.4052, lng: 55.5136, tours: 6,
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70",
    blurb: "The smallest emirate with the warmest welcome: quiet beaches, traditional dhow building and Al Zorah nature reserve." },
  { id: "umm-al-quwain", name: "Umm Al Quwain", tagline: "Mangroves, kayaks & flamingos", lat: 25.5647, lng: 55.5552, tours: 5,
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=70",
    blurb: "Kayak through Khor Al Beidah mangroves, spot flamingos and explore the ancient island of Al Sinniyah." },
  { id: "al-ain", name: "Al Ain", tagline: "Garden city & UNESCO oases", lat: 24.2075, lng: 55.7447, tours: 8,
    img: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1200&q=70",
    blurb: "Date-palm oases, Jebel Hafeet mountain road, the camel market and Al Jahili fort." }
];

ET.categories = [
  { id: "desert", name: "Desert Safari", icon: "🏜️" },
  { id: "city", name: "City Tours", icon: "🏙️" },
  { id: "water", name: "Water & Beach", icon: "🌊" },
  { id: "adventure", name: "Adventure", icon: "🪂" },
  { id: "culture", name: "Culture & Heritage", icon: "🕌" },
  { id: "luxury", name: "Luxury", icon: "🛥️" },
  { id: "family", name: "Family & Parks", icon: "🎢" },
  { id: "food", name: "Food & Nightlife", icon: "🍽️" }
];

ET.tours = [
  { id: "t1", title: "Premium Red Dune Desert Safari with BBQ Dinner", emirate: "dubai", cat: "desert", price: 180, was: 240, rating: 4.9, reviews: 2184, duration: "6 hrs", group: "Up to 6 per 4x4", pickup: true, badge: "Bestseller",
    img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Dune bashing in Lahbab red dunes", "Camel ride, sandboarding & henna", "Live tanoura, fire & belly-dance show", "Unlimited BBQ buffet"],
    includes: ["Hotel pickup & drop-off", "Soft drinks, water, tea & coffee", "All activities listed", "Insurance"],
    tags: ["sunset", "bbq", "family"] },
  { id: "t2", title: "Burj Khalifa 124th & 125th Floor + Dubai Mall Aquarium", emirate: "dubai", cat: "city", price: 275, was: 320, rating: 4.8, reviews: 5412, duration: "3 hrs", group: "Skip-the-line", pickup: false, badge: "Skip the line",
    img: "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Fast-track entry to At the Top", "Sunset slot available", "Aquarium & Underwater Zoo", "Fountain show from the promenade"],
    includes: ["Timed-entry tickets", "Multimedia guide"], tags: ["iconic", "views"] },
  { id: "t3", title: "Abu Dhabi Grand Mosque, Louvre & Qasr Al Watan Day Trip", emirate: "abu-dhabi", cat: "culture", price: 320, was: null, rating: 4.9, reviews: 1890, duration: "10 hrs", group: "Max 14", pickup: true, badge: "Guide favourite",
    img: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Sheikh Zayed Grand Mosque guided visit", "Louvre Abu Dhabi entry", "Qasr Al Watan palace", "Emirates Palace photo stop"],
    includes: ["Luxury coach from Dubai", "Licensed English-speaking guide", "All entry tickets", "Abaya loan for mosque"], tags: ["unesco", "photography"] },
  { id: "t4", title: "Jais Flight: World's Longest Zipline + Jebel Jais Viewing Deck", emirate: "ras-al-khaimah", cat: "adventure", price: 699, was: 799, rating: 4.9, reviews: 964, duration: "5 hrs", group: "Min age 12", pickup: true, badge: "Adrenaline",
    img: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1200&q=70",
    highlights: ["2.83 km zipline at up to 160 km/h", "1,934 m summit views", "Mountain road drive", "GoPro footage add-on"],
    includes: ["Zipline ticket", "Safety briefing & gear", "Transfer from Dubai or RAK"], tags: ["extreme", "mountains"] },
  { id: "t5", title: "Luxury Yacht Cruise: Dubai Marina to Palm Jumeirah", emirate: "dubai", cat: "luxury", price: 420, was: 550, rating: 4.8, reviews: 1120, duration: "2 hrs", group: "Shared, max 25", pickup: false, badge: "Sunset",
    img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Atlantis, Ain Dubai & Burj Al Arab from the water", "Swim stop in summer", "Fresh fruits & soft drinks", "Private charter option"],
    includes: ["Yacht cruise", "Refreshments", "Life jackets & crew"], tags: ["sunset", "photography"] },
  { id: "t6", title: "Hot Air Balloon Flight over the Dubai Desert with Falcon Show", emirate: "dubai", cat: "adventure", price: 1150, was: null, rating: 5.0, reviews: 731, duration: "5 hrs", group: "Dawn departure", pickup: true, badge: "Once in a lifetime",
    img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Sunrise flight up to 4,000 ft", "In-flight falcon release", "Oryx & gazelle sightings", "Gourmet breakfast at Bedouin camp"],
    includes: ["Pickup from Dubai", "Flight certificate", "Breakfast", "Vintage Land Rover drive"], tags: ["sunrise", "bucket-list"] },
  { id: "t7", title: "Old Dubai Heritage Walk: Souks, Abra & Street Food", emirate: "dubai", cat: "food", price: 165, was: null, rating: 4.9, reviews: 2290, duration: "4 hrs", group: "Max 10", pickup: false, badge: "Small group",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Al Fahidi wind-tower district", "Gold & Spice Souk haggling tips", "Abra crossing of the Creek", "10+ tastings from Emirati to Iranian"],
    includes: ["Local storyteller guide", "All tastings", "Abra ride"], tags: ["walking", "local"] },
  { id: "t8", title: "Ferrari World & Warner Bros. World Combo Pass", emirate: "abu-dhabi", cat: "family", price: 520, was: 640, rating: 4.7, reviews: 3015, duration: "Full day", group: "All ages", pickup: true, badge: "Family",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Formula Rossa, fastest coaster on Earth", "Indoor WB World, fully air-conditioned", "Return coach from Dubai"],
    includes: ["2-park ticket", "Transport"], tags: ["kids", "theme-park"] },
  { id: "t9", title: "Snoopy Island Snorkelling & Fujairah East Coast Tour", emirate: "fujairah", cat: "water", price: 295, was: null, rating: 4.8, reviews: 612, duration: "9 hrs", group: "Max 14", pickup: true, badge: "Nature",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Turtle & reef-shark snorkel", "Al Bidya Mosque (1446 AD)", "Friday Market in Masafi", "Hajar mountain drive"],
    includes: ["Snorkel gear", "Lunch", "Transfers from Dubai/Sharjah"], tags: ["snorkel", "turtles"] },
  { id: "t10", title: "Hatta Mountain Safari, Kayaking & Heritage Village", emirate: "dubai", cat: "adventure", price: 310, was: 380, rating: 4.8, reviews: 858, duration: "8 hrs", group: "Up to 6 per 4x4", pickup: true, badge: "Mountains",
    img: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Hatta Dam kayaking", "Heritage village", "Wadi drive by 4x4", "Honey bee garden"],
    includes: ["Kayak hire", "Lunch", "4x4 with driver-guide"], tags: ["kayak", "mountains"] },
  { id: "t11", title: "Sharjah Heritage & Museums Half-Day Tour", emirate: "sharjah", cat: "culture", price: 140, was: null, rating: 4.7, reviews: 404, duration: "5 hrs", group: "Max 14", pickup: true, badge: "Culture",
    img: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Heart of Sharjah restored district", "Museum of Islamic Civilization", "Blue Souk", "Al Noor Island"],
    includes: ["Guide", "Entry tickets", "Transfers"], tags: ["museums", "walking"] },
  { id: "t12", title: "UAQ Mangrove Kayaking at Sunrise with Flamingos", emirate: "umm-al-quwain", cat: "water", price: 210, was: null, rating: 4.9, reviews: 237, duration: "4 hrs", group: "Max 8", pickup: true, badge: "Eco",
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Khor Al Beidah wetlands", "Flamingo & heron spotting", "Clear kayaks available", "Local breakfast"],
    includes: ["Kayak & guide", "Breakfast", "Transfers"], tags: ["eco", "sunrise"] },
  { id: "t13", title: "Al Ain Oasis, Jebel Hafeet & Camel Market Day Trip", emirate: "al-ain", cat: "culture", price: 330, was: null, rating: 4.8, reviews: 512, duration: "10 hrs", group: "Max 14", pickup: true, badge: "UNESCO",
    img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Al Ain Oasis UNESCO site", "Jebel Hafeet summit drive", "Camel market", "Al Jahili Fort"],
    includes: ["Guide", "Lunch", "Entry tickets", "Transfers"], tags: ["unesco", "mountains"] },
  { id: "t14", title: "Dubai Marina Dhow Dinner Cruise with Live Entertainment", emirate: "dubai", cat: "food", price: 190, was: 250, rating: 4.6, reviews: 4120, duration: "2.5 hrs", group: "Shared", pickup: true, badge: "Dinner",
    img: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=70",
    highlights: ["International buffet", "Tanoura show", "Marina skyline at night"],
    includes: ["Dinner", "Unlimited soft drinks", "Transfers"], tags: ["dinner", "night"] },
  { id: "t15", title: "Private Dubai City Tour by Luxury SUV (Half Day)", emirate: "dubai", cat: "city", price: 890, was: null, rating: 4.9, reviews: 672, duration: "5 hrs", group: "Private, up to 6", pickup: true, badge: "Private",
    img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Customisable itinerary", "Jumeirah Mosque, Burj Al Arab, Palm, Museum of the Future", "Professional guide-driver"],
    includes: ["Private vehicle & guide", "Water & wifi"], tags: ["private", "custom"] },
  { id: "t16", title: "Yas Island Water Park + Yas Marina Circuit Drive", emirate: "abu-dhabi", cat: "family", price: 380, was: null, rating: 4.7, reviews: 913, duration: "Full day", group: "All ages", pickup: true, badge: "Family",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=70",
    highlights: ["Yas Waterworld all-day pass", "F1 circuit passenger ride add-on"],
    includes: ["Park ticket", "Transfers from Dubai"], tags: ["kids", "water-park"] }
];

ET.hotels = [
  { id: "h1", name: "Atlantis The Royal", emirate: "dubai", stars: 5, price: 2450, rating: 9.4, reviews: 3120, area: "Palm Jumeirah",
    img: "https://images.unsplash.com/photo-1489516408517-0c0a15662682?auto=format&fit=crop&w=1200&q=70", perks: ["Infinity sky pool", "Aquaventure access", "Nobu & Dinner by Heston"] },
  { id: "h2", name: "Emirates Palace Mandarin Oriental", emirate: "abu-dhabi", stars: 5, price: 1890, rating: 9.6, reviews: 2210, area: "Corniche",
    img: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=70", perks: ["1.3 km private beach", "Gold cappuccino", "Marina"] },
  { id: "h3", name: "Rove Downtown", emirate: "dubai", stars: 3, price: 420, rating: 8.9, reviews: 8800, area: "Downtown",
    img: "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?auto=format&fit=crop&w=1200&q=70", perks: ["Burj Khalifa views", "Rooftop pool", "Walk to Dubai Mall"] },
  { id: "h4", name: "Ritz-Carlton Al Wadi Desert", emirate: "ras-al-khaimah", stars: 5, price: 2100, rating: 9.5, reviews: 1430, area: "Al Wadi Nature Reserve",
    img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1200&q=70", perks: ["Private pool villas", "Falconry", "Oryx safari"] },
  { id: "h5", name: "Le Méridien Al Aqah Beach Resort", emirate: "fujairah", stars: 5, price: 780, rating: 8.8, reviews: 2640, area: "Al Aqah",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70", perks: ["Dive centre", "Kids club", "Snoopy Island views"] },
  { id: "h6", name: "Sheraton Sharjah Beach Resort", emirate: "sharjah", stars: 5, price: 560, rating: 8.6, reviews: 1980, area: "Al Khan",
    img: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=70", perks: ["Beachfront", "Spa", "Family rooms"] }
];

ET.cars = [
  { id: "c1", name: "Nissan Sunny", cls: "Economy", seats: 5, bags: 2, trans: "Auto", day: 85, week: 490, img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=70" },
  { id: "c2", name: "Toyota Land Cruiser", cls: "SUV", seats: 7, bags: 4, trans: "Auto", day: 380, week: 2300, img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=70" },
  { id: "c3", name: "Mercedes E-Class", cls: "Luxury", seats: 5, bags: 3, trans: "Auto", day: 520, week: 3100, img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=70" },
  { id: "c4", name: "Lamborghini Huracán", cls: "Supercar", seats: 2, bags: 1, trans: "Auto", day: 2400, week: 14000, img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=70" },
  { id: "c5", name: "Toyota Hiace (12 seats)", cls: "Van", seats: 12, bags: 10, trans: "Auto", day: 300, week: 1800, img: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=900&q=70" },
  { id: "c6", name: "Tesla Model Y", cls: "Electric", seats: 5, bags: 3, trans: "Auto", day: 330, week: 1950, img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=70" }
];

ET.posts = [
  { id: "p1", title: "Best Month to Visit the UAE: A Season-by-Season Guide", date: "2026-09-28", read: "7 min", cat: "Planning",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=70",
    excerpt: "November to March is peak season for a reason, but summer deals, indoor attractions and Ramadan nights all have their own magic." },
  { id: "p2", title: "Desert Safari Explained: Morning vs Evening vs Overnight", date: "2026-09-14", read: "5 min", cat: "Experiences",
    img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=900&q=70",
    excerpt: "Which safari suits you? We compare dune intensity, photo light, food quality and what to bring." },
  { id: "p3", title: "UAE Visa on Arrival: Who Qualifies in 2026", date: "2026-08-30", read: "4 min", cat: "Travel Tips",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=70",
    excerpt: "An up-to-date list of nationalities, durations, extension rules and the new multi-entry tourist visa." },
  { id: "p4", title: "7 Emirates in 7 Days: The Ultimate UAE Road Trip", date: "2026-08-12", read: "9 min", cat: "Itineraries",
    img: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=900&q=70",
    excerpt: "A day-by-day route from Abu Dhabi's mosques to Fujairah's reefs, with where to stay and what to skip." }
];

ET.reviews = [
  { name: "Aisha T.", country: "Pakistan", flag: "🇵🇰", rating: 5, text: "From the Burj Khalifa to the beach resorts in Ras Al Khaimah, everything was perfectly organized. I didn't have to worry about a thing.", tour: "Premium Red Dune Safari" },
  { name: "James W.", country: "United Kingdom", flag: "🇬🇧", rating: 5, text: "Planning our Dubai trip was effortless. The desert safari was thrilling and the hotel booking was smooth and fast.", tour: "Burj Khalifa + Aquarium" },
  { name: "Lina H.", country: "Germany", flag: "🇩🇪", rating: 5, text: "We explored Abu Dhabi, Dubai and Sharjah, all booked through this platform. The team was helpful and everything ran on schedule.", tour: "Abu Dhabi Day Trip" },
  { name: "Sanjay S.", country: "India", flag: "🇮🇳", rating: 5, text: "Car rental, desert safari and hotel all in one place. Support was very responsive on WhatsApp. Highly recommend for UAE travelers.", tour: "Toyota Land Cruiser rental" },
  { name: "Chen M.", country: "China", flag: "🇨🇳", rating: 5, text: "The trip planner built our 5-day itinerary in minutes and the guide spoke Mandarin. Jais Flight was the highlight of our year.", tour: "Jais Flight Zipline" }
];

ET.guide = {
  weather: [
    { m: "Jan", hi: 24, lo: 14 }, { m: "Feb", hi: 25, lo: 15 }, { m: "Mar", hi: 28, lo: 18 }, { m: "Apr", hi: 33, lo: 21 },
    { m: "May", hi: 38, lo: 25 }, { m: "Jun", hi: 40, lo: 28 }, { m: "Jul", hi: 41, lo: 30 }, { m: "Aug", hi: 41, lo: 31 },
    { m: "Sep", hi: 39, lo: 28 }, { m: "Oct", hi: 35, lo: 24 }, { m: "Nov", hi: 30, lo: 20 }, { m: "Dec", hi: 26, lo: 16 }
  ],
  essentials: [
    { icon: "🛂", title: "Visa", text: "Over 80 nationalities get visa on arrival (30 or 90 days). Others can apply online in 3 to 5 working days. We can sponsor your tourist visa with any booking." },
    { icon: "💱", title: "Currency", text: "UAE Dirham (AED), pegged at 3.6725 to the US dollar. Cards accepted almost everywhere; carry small cash for souks and taxis." },
    { icon: "🕌", title: "Etiquette", text: "Dress modestly in malls and heritage areas, cover shoulders and knees at mosques. Public displays of affection are kept low-key." },
    { icon: "🚕", title: "Getting around", text: "Dubai Metro, Careem and Uber are reliable. Driving is easy with an international permit; roads between emirates are excellent." },
    { icon: "🔌", title: "Power & SIM", text: "Type G plugs (UK style), 220V. Free tourist SIM at Dubai airport; eSIM from du and Etisalat from AED 50." },
    { icon: "🕐", title: "Time & weekend", text: "GMT+4. Weekend is Saturday and Sunday; Friday afternoons are quieter for prayers." }
  ]
};
