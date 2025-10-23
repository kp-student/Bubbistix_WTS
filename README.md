# Bubbistix ✨

**Berry glad you're here 🍓**
Stickers that sprinkle joy and whimsy on your everyday items!

---

## 🍭 Table of Contents

* [About](#about)
* [Features](#features)
* [Site Map (Pages)](#site-map-pages)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Typography & Assets](#typography--assets)
* [JavaScript Overview](#javascript-overview)
* [Contributing](#contributing)
* [Our Team](#our-team)
* [Notes & Limitations](#notes--limitations)
* [License](#license)

---

## 💖 About

**Bubbistix** is a colorful and interactive online sticker shop created for the course **Web Systems and Technologies (H3101)**.

This project showcases a **front-end only implementation** using pure HTML, CSS, and JavaScript — no frameworks, no build tools. It’s a light, fun, and accessible web experience designed to make visitors smile. 🌈

---

## 🌟 Features

* 🛍️ **Interactive Shop Gallery:**
  Browse stickers, filter by categories, and view detailed product cards with smooth transitions.

* 🛒 **Add to Cart System:**
  Add items to your cart, adjust quantities, and preview before checkout — all handled on the front end.

* 💳 **Checkout & Confirmation:**
  A clean, guided checkout flow with confirmation and order summary pages.

* 📱 **Fully Responsive Layout:**
  Optimized for desktops, tablets, and mobile devices using flexible grid layouts.

* 📨 **Contact & Account Pages:**
  Includes working form UIs for contacting the team, account registration, and password reset.

* ♿ **Accessibility:**
  Uses semantic HTML, descriptive alt texts, and keyboard-friendly navigation.

---

## 🗺️ Site Map (Pages)

All supporting pages are stored in the **`/docs/html`** folder:

| Page                 | File                      | Description                                                  |
| -------------------- | ------------------------- | ------------------------------------------------------------ |
| 🏠 Home              | `index.html`              | Main landing page with hero banner and featured collections. |
| 💕 About             | `about.html`              | Brand story, mission, and team showcase.                     |
| 🛒 Shop              | `shop.html`               | Full sticker catalog with filters and sorting options.       |
| ➕ Add to Cart        | `add-to-cart.html`        | Cart preview interface.                                      |
| 💳 Checkout          | `checkout.html`           | Simple checkout page layout.                                 |
| ✅ Order Confirmation | `order-confirmation.html` | Displays after a successful purchase.                        |
| 👤 Registration      | `registration.html`       | Entry point for sign-in/sign-up.                             |
| ✨ Create Account     | `create-account.html`     | Registration form UI.                                        |
| 🔑 Reset Password    | `reset-password.html`     | Password recovery interface.                                 |
| ❓ FAQs               | `faqs.html`               | Frequently asked questions.                                  |
| 💌 Contact           | `contact.html`            | Contact information and message form.                        |

> Note: All features are front-end only; forms and cart logic use local JavaScript.

---

## 🧱 Project Structure

```
.
├── docs/
│   ├── css/
│   │   └── style.css                 # Global styling
│   ├── fonts/                        # Local font files (.otf / .ttf)
│   │   ├── Adelia-Font.otf
│   │   ├── Cute-Sunrise.otf
│   │   ├── Lucid-Dream.otf
│   │   ├── Milkyway-Font.ttf
│   │   └── Sugar-Flare.otf
│   ├── html/                         # All subpages
│   ├── images/                       # Project images and graphics
│   │   ├── logo/
│   │   ├── misc/
│   │   ├── stickers/
│   │   ├── team/
│   │   └── Welcome-Image/
│   ├── js/                           # JavaScript interactivity scripts
│   │   ├── checkout.js
│   │   ├── contact-success.js
│   │   ├── create_account.js
│   │   ├── FAQs.js
│   │   ├── location-dropdown.js
│   │   ├── newsletter.js
│   │   ├── order-confirmation.js
│   │   ├── registration.js
│   │   ├── reset_password.js
│   │   ├── script_cart.js
│   │   └── script_shop.js
│   ├── add-to-cart-popup.png
│   ├── hero_bg.jpg
│   ├── mock_about.png
│   ├── strawberry1.png → strawberry5.png
│   └── README.md
├── index.html                        # Homepage
└── README.md                         # Documentation
```

---

## 🧩 Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/kp-student/Bubbistix_WTS.git
   ```
2. Open the project folder in **VS Code** or any preferred editor.
3. Launch `index.html` in your browser and explore! 🍓

---

## 🖋️ Typography & Assets

* Fonts: Located in `/fonts` and linked within `style.css`.
* Images: All product, logo, and background visuals live in `/images`.
* Favicons: Stored in `/images/logo/` (referenced within HTML pages).

Make sure to maintain the directory structure for all paths to load correctly!

---

## 💡 JavaScript Overview

| File                    | Functionality                                                          |
| ----------------------- | ---------------------------------------------------------------------- |
| `checkout.js`           | Handles checkout form validation and order summary logic.              |
| `contact-success.js`    | Displays success messages after contact form submission.               |
| `create_account.js`     | Manages account creation UI responses and validation.                  |
| `FAQs.js`               | Expands/collapses FAQ sections for smooth user navigation.             |
| `location-dropdown.js`  | Controls dynamic dropdowns for shipping or address fields.             |
| `newsletter.js`         | Validates and confirms newsletter subscriptions.                       |
| `order-confirmation.js` | Displays final purchase confirmation details.                          |
| `registration.js`       | Handles login/registration form UI logic.                              |
| `reset_password.js`     | Enables password reset input and confirmation flow.                    |
| `script_cart.js`        | Manages add-to-cart functionality, quantity updates, and item removal. |
| `script_shop.js`        | Controls sticker filtering, sorting, and product display logic.        |

---

## 🤝 Contributing

Want to make Bubbistix even better? We’d love that!

1. **Fork** the repository.
2. **Create** a feature branch:

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes:

   ```bash
   git commit -m "Add some Feature"
   ```
4. **Push** to your branch:

   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request** and share your idea! 💫

---

## 🌸 Our Team

* Kristine Paul Garcia 🌙
* Mara Julienne Rose Cervantes 🌟
* Lianne Marie Dioso ✨
* Michelle Joi Quesada 💫

---

## ⚠️ Notes & Limitations

* This is a **front-end only** project.
* No database, authentication, or payment APIs are used.
* “Add to Cart” and “Checkout” are **UI mockups** that demonstrate the flow visually.

---

## 📜 License

© 2025 **Bubbistix**.
For educational use only — not for commercial resale.

---

🍓 *Thanks for visiting Bubbistix — where stickers make everything sweeter!* 🍓
