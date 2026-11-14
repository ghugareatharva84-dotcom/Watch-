# ATHARVA — Swiss Horology & Timeless Craftsmanship

A luxury horological showcase website featuring an interactive 300-frame 3D mechanical watch canvas animation, smooth scrolling engine, dynamic magnetic cursor, curated product collection, shopping bag, wishlist, bespoke consultation form, and client modals.

**Created by:** Atharva Ghugare (Vidyalankar Polytechnic)

---

## 🚀 How to Run the Website (Quick Start)

### Method 1: 1-Click Launch (Recommended for Windows)
Simply double-click **`Start_Website.bat`**.
* This automatically starts a local server and opens the website in your default web browser (Edge, Chrome, Firefox, Brave, etc.).
* No installations, Node.js, or complex setups required!

---

### Method 2: Direct Open in Browser
Double-click **`index.html`** or right-click `index.html` → *Open with* → your preferred browser.

---

### Method 3: Command Line (Mac, Linux, or Developers)
Open a terminal in this folder and run any of the following:

**Using Python:**
```bash
python -m http.server 5173
```
Then open: [http://localhost:5173](http://localhost:5173)

**Using Node / npx:**
```bash
npx serve .
```

---

## 🌐 How to Publish / Host it Online for FREE

If you want to share a live URL with anyone around the world:

1. **Netlify Drop (Easiest - 30 seconds):**
   * Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
   * Drag and drop this entire folder (`Atharva-Watch-Website`)
   * You will instantly receive a live, shareable public link!

2. **GitHub Pages:**
   * Push these files to a GitHub repository.
   * Go to **Settings** → **Pages** → select `main` branch → Save.
   * Your site will be live at `https://<username>.github.io/<repo-name>/`.

3. **Vercel:**
   * Import the repository or run `npx vercel` in this folder.

---

## 📁 Folder Structure

```
Atharva-Watch-Website/
├── index.html            # Main HTML document with Tailwind CSS & Google Fonts
├── style.css             # Luxury styling, custom scrollbars, and animations
├── main.js               # Interactive SPA engine (300-frame scroll, cursor, modals, cart)
├── frames/               # 300 sequential animation frames (ezgif-frame-001 to 300)
├── Start_Website.bat     # 1-Click Windows launcher script
├── server.ps1            # Lightweight, zero-dependency local web server
└── README.md             # Guide and documentation
```

---

## ✨ Features Included

* **Swiss 300-Frame 3D Scroll Engine:** Smooth, hardware-accelerated watch rotation synced with your scroll position.
* **3D Perspective Mouse Tilt:** Interactive watch tilting on mouse hover over the hero display.
* **Luxury Magnetic Cursor:** Gold dual-ring cursor with dynamic state labels (`ROTATE`, `EXPLORE`, `VIEW`), button snapping, and click ripples.
* **Curated Timepiece Collection:** Complete specifications (movement, case diameter, material, origin) for horological masterworks.
* **Interactive Shopping Bag & Order Checkout:** Real-time quantity counters, item removal, and instant checkout placement simulation.
* **Saved / Favorites Drawer:** Save your favorite timepieces to view later or transfer directly into your bag.
* **Bespoke Consultation System:** Request private appointments with Geneva master watchmakers.
* **Live Search:** Instant modal search filter across the catalog.
* **Contact & Creator Credits:** Atharva Ghugare, 2nd year Computer Engineering student at Vidyalankar Polytechnic.

