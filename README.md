# TravelGo ✈️ - Modern Travel & Tour Booking Platform

A modern, responsive, and feature-rich travel agency web application built with clean semantic **HTML5**, modern **Vanilla CSS**, and lightweight **Vanilla JavaScript**. 

TravelGo enables users to discover international destinations, browse curated tour packages, filter getaways by theme, book customized trips with instant booking reference codes, and manage user sessions seamlessly.

---

## 🌟 Key Features

### 1. 🌓 Smart Dark / Light Mode
- One-click theme toggle available in the navigation header across all pages.
- Automatically persists user theme preferences in `localStorage`.

### 2. 📱 Fully Responsive Design
- Optimized for all viewport sizes (Desktop, Laptop, Tablet, and Mobile).
- Collapsible mobile navigation menu with smooth hamburger button interaction.

### 3. 🔍 Live Interactive Destination Search & Filtering
- **Cross-Page Search**: Search from the home page hero banner and get automatically redirected to filtered results on the destinations page.
- **Real-Time Live Search**: Instant filtering by destination name, country, or keywords.
- **Thematic Category Pills**: Quickly filter by categories:
  - `All`
  - `🏖️ Beaches`
  - `🌆 Cityscapes`
  - `🏛️ Culture`
  - `💎 Luxury`
- **Smart Feedback**: Displays active match counts and includes a 1-click "Reset Filters" action.

### 4. ✈️ Complete Destinations & Tour Packages
- **6 Featured Destinations**: Paris 🇫🇷, Dubai 🇦🇪, Bali 🇮🇩, London 🇬🇧, Maldives 🇲🇻, Tokyo 🇯🇵.
- **6 All-Inclusive Holiday Packages**: Includes duration, group capacity, ratings, transparent pricing in INR (₹), discount badges, and instant booking triggers.

### 5. 📅 Smart Booking Modal & Reference Generator
- Date inputs automatically restrict selection of past dates (minimum set to today's date).
- Generates a unique booking reference code (e.g., `#TRV-58392`) upon submission.
- Accessible from any page across the entire website.

### 6. 👤 User Authentication & Session Persistence
- Modal tab switcher to toggle between **Sign In** and **Create Account**.
- Simulates user login and persists user profile state in `localStorage`.
- Updates navigation bar dynamically to display `👋 Hi, [Name] | Logout`.

### 7. 💬 Contact & Enquiry Desk
- Two-column layout providing direct Chennai headquarters contact details, phone, email, and working hours.
- Inline form validation for name, email format, phone, travel date, and destination requirements.
- Generates a unique enquiry tracking ID (e.g., `#ENQ-91823`) upon submission.

### 8. ❓ Collapsible FAQ Accordion
- Interactive FAQ section on the contact page addressing visas, package customization, flight inclusions, and cancellation policies.

### 9. 💌 Secret Deals Newsletter
- Newsletter subscription form with client-side email format verification.

### 10. ✨ Floating Toast Notification System
- Non-intrusive floating toasts confirming bookings, enquiries, theme toggles, subscriptions, and logins.

---

## 📂 Project Structure

```text
Travel-Webpage/
│
├── index.html           # Home landing page (Hero search, highlights, testimonials, newsletter)
├── destinations.html    # Destinations & packages page (Live search, category pills, tour cards)
├── contact.html         # Contact us & enquiry page (Office info, enquiry form, FAQ accordion)
│
├── css/
│   └── style.css        # Global CSS (Theme variables, typography, layouts, components, dark mode)
│
├── js/
│   └── script.js        # Core JavaScript (Theme toggle, filters, modals, auth session, validation)
│
└── README.md            # Comprehensive project documentation
```

---

## 🚀 How to Run Locally

You can preview the project using any modern web browser without needing to install complex dependencies or build tools.

### Option 1: Direct Browser Launch
1. Open the project folder in File Explorer.
2. Double-click [index.html](file:///c:/Users/samut/OneDrive/Attachments/Travel-Webpage/index.html) to open it in your default browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Python HTTP Server
Open PowerShell / Terminal in the project root and run:
```bash
python -m http.server 8080
```
Then visit:
```text
http://localhost:8080/index.html
```

### Option 3: Using Node.js `serve` / `npx`
```bash
npx serve .
```

---

## 🛠️ Built With

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`, `<dialog>`).
- **CSS3**: CSS Custom Properties (`--primary`, `--dark`, etc.), CSS Grid, Flexbox, smooth transitions, and Google Fonts (`Plus Jakarta Sans`).
- **JavaScript (ES6+)**: Vanilla DOM manipulation, `localStorage` API, URL query parameters, and regex validation.
- **High-Resolution Imagery**: Unsplash CDN with optimized responsive query parameters.

---

## 📄 License & Credits

- Developed for **TravelGo** travel agency showcase.
- Free for educational and personal use.
