# Bubbistix ✨
**Berry glad you're here 🍓**  
Stickers that sprinkle joy and whimsy on your everyday items!

---

## Table of Contents
- [About](#about)  
- [Features](#features)  
- [Site Map (Pages)](#site-map-pages)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
- [Typography & Assets](#typography--assets)  
- [Contributing](#contributing)  
- [Our Team](#our-team)  
- [Notes & Limitations](#notes--limitations)  
- [License](#license)  

---

## About
Bubbistix is a fun and colorful online sticker shop built as a requirement for **Web Systems and Technology (H3101)**.

This repo contains the complete **front‑end** (HTML, CSS, images, and fonts). No frameworks or build tools required.

---

## Features

- 🛒 **Interactive Shop Gallery:**  
  Browse, search, and sort sticker sets with smooth filtering and category navigation.

- 🛍️ **Add to Cart Functionality:**  
  Instantly add stickers to your cart and manage quantities with a user-friendly interface.

- 📦 **Cart & Checkout Pages:**  
  View, update, and remove items from your cart, then proceed to a simple checkout flow.

- 🌈 **Responsive Design:**  
  Enjoy a seamless experience on mobile, tablet, and desktop devices.

- 📝 **Contact & Account Pages:**  
  Reach out via a sleek contact form and manage your account with registration and password reset features.

- ♿ **Accessibility Considerations:**  
  Semantic HTML, ARIA labels, and keyboard-friendly controls for an inclusive experience.

---

## Site Map (Pages)
All pages live in **`/html`**:

- `index.html` — **Home** page with hero banner, featured sections, and navigation.
- `about.html` — Team overview and brand story.
- `shop.html` — Sticker catalog with **search**, **sort (A–Z, Z–A, price)**, and **category jump links**.
- `add-to-cart.html` — Cart preview UI.
- `checkout.html` — Checkout layout/UI scaffold.
- `order-confirmation.html` — Post‑checkout confirmation screen.
- `registration.html` — Sign‑in / Sign‑up entry screen.
- `create-account.html` — Create account form UI.
- `reset-password.html` — Password reset form UI.
- `faqs.html` — Frequently asked questions.
- `contact.html` — Contact details & form UI.

> This is a **static** site; forms and cart flows are front‑end only (no backend/auth or payment integration).

---

## Project Structure
```
Bubbistix_WTS/
├─ html/                 # All HTML pages (Home, Shop, About, FAQs, Contact, Auth, Cart, Checkout)
├─ css/
│  └─ style.css          # Global styling
├─ images/               # All images (stickers, team, background, icons, etc.)
│  ├─ bg/
│  ├─ logo/
│  ├─ misc/
│  ├─ popup/
│  ├─ stickers/
│  ├─ team/
│  └─ Welcome-Image/
├─ fonts/                # Local font files (.otf/.ttf)
└─ README.md             # (This file)
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/bubbistix.git
```

2. Open the project in VS Code or your preferred editor.

3. Launch `index.html` in your browser and watch the magic come alive! 🌟

---

## Typography & Assets
- Fonts are included in `/fonts` and referenced in the pages and CSS.
- Images are located in `/images` with subfolders for product sets and UI assets.
- Favicon assets live in `/images/favi` (as referenced by the pages).

> Ensure the `/fonts` and `/images` folders remain in their original relative locations for paths to resolve correctly.

---

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch.  
Pull requests are warmly welcome!

1. Fork the Project
2. Create your Feature Branch: `git checkout -b feature/AmazingFeature`
3. Commit your Changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## Our Team
- Kristine Paul Garcia 🌙  
- Mara Julienne Rose Cervantes 🌟  
- Lianne Marie Dioso ✨  
- Michelle Joi Quesada 💫  

---

## Notes & Limitations
- This is a **front‑end only** educational project—no database, sessions, or payments.
- “Add to Cart”, “Checkout”, and account pages are **UI prototypes**.

---

## License
© 2025 Bubbistix. For educational use only.

---

🍓 Thanks for checking out Bubbistix 🍓 
