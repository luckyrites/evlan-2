# Elvan Foods (Syracuse, Sicily) 🍊
### Artisanal Sicilian Citrus & Gourmet Pantry Web Experience
Modeled after the award-winning (Awwwards Site of the Day) [agrumeafarm.it/en](https://www.agrumeafarm.it/en).

---

## 🌟 Overview

**Elvan Foods** is an immersive digital culinary flagship celebrating three generations of organic citrus farming in the fertile volcanic valley between Mount Etna and Syracuse, Sicily. 

This website translates Elvan Foods' sun-washed agricultural poetry, slow artisanal preserves, and contemporary digital craftsmanship into an award-winning web application.

---

## 🎨 Key Features & Digital Craftsmanship

### 1. **Visual Identity & Editorial Typography**
- **Sicilian Burgundy & Citrus Palette:** Deep earthy maroon (`#762530`), sunburst orange (`#E84E1B`), warm Mediterranean cream (`#FBF7EE`), and olive grove tones (`#2D4A3E`).
- **High-Contrast Italian Serifs:** Editorial headline typography (`Italiana`, `Playfair Display`) paired with clean modern tracking typography (`Plus Jakarta Sans`).
- **Subtle Film Grain Texture:** Organic tactile background overlay reminiscent of traditional letterpress paper and Mediterranean soil.

### 2. **Interactive 3D Citrus Visualizer (`citrus3d.js`)**
- Built with **Three.js** and high-performance **HTML5 WebGL/Canvas** fallback.
- Features realistic porous oil-gland peel texture, golden hour rim lighting, natural stem and leaf.
- **Interactive Controls:** Drag to rotate in 3D space, hover reactions, and double-click to toggle blood-orange crimson core mode.

### 3. **Sensory Tasting Wheel & Flavor Constellation**
- Interactive sommelier experience allowing visitors to explore creations by tasting notes:
  - *Zesty & Sun-Bright* (Siracusa Femminello Lemon, Ciaculli Mandarin)
  - *Crimson & Berry Sweet* (Moro & Tarocco Blood Orange, Wild Preserves)
  - *Velvety & Volcanic Nut* (Bronte DOP Pistachio Cream, Avola Almond Silk)
  - *Herbaceous & Savory* (Trapanese Citrus & Basil Pesto, Cold-Pressed EVO Oil)

### 4. **Bilingual Experience (EN / IT)**
- Complete seamless dual-language support (English and Italian) with instant one-click toggle in the header.
- Covers all storytelling, product descriptions, pairing notes, nutrition facts, filters, cart, and simulated checkout.

### 5. **Complete E-Commerce Pantry & Cart System**
- **Catalog Filtering & Sorting:** Filter by category (Marmalades, Creams & Pestos, Fresh Orchard Harvest, EVO Oils) or live search.
- **Product Quick-View Modal:** Sensory profile meters (Acidity, Sweetness, Aroma), artisanal vacuum-cooking details, chef pairings, and ingredients.
- **Slide-Out Pantry Drawer:** Dynamic item quantities, free cold-chain shipping progress bar (€65 threshold), and voucher support:
  - Use code `ELVAN10` for 10% off.
  - Use code `FARMHOUSE` for €5.00 off.
- **Simulated Eco Checkout:** Packaging preference selection (Zero-Waste Organic Straw vs Luxury Silk Ribbon Box) and order confirmation with celebratory confetti.

### 6. **Ambient Mediterranean Soundscape Synthesizer**
- Powered by the native Web Audio API — synthesizes a soothing warm coastal breeze and gentle acoustic chimes with zero external audio assets required.
- Mute/Unmute toggle directly in the header navigation.

### 7. **Farm Heritage & Seasonal Harvest Calendar**
- **Generational Milestones:** 1968 (Nonno Salvatore's first grove) to 2018 (Organic Renaissance by agronomist grandchildren) to Present Day.
- **Dynamic Harvest Calendar:** Month-by-month guide highlighting current active harvest (Moro blood oranges and Femminello lemons).

---

## 🚀 Running the Project

The project is built with zero heavy dependency requirements and includes its own native Node HTTP server:

```bash
# Start the server (runs on http://localhost:5173/)
node serve.js
```

Or open `index.html` directly in any modern web browser.

---

## 📂 Project Structure

```
evlan-2/
├── index.html            # Core entry point with editorial layout & typography
├── serve.js              # Lightweight zero-dependency Node HTTP server
├── css/
│   └── style.css         # Luxury brand design system, animations & glassmorphism
├── js/
│   ├── app.js            # Reactive application controller & event routing
│   ├── citrus3d.js       # Interactive 3D Citrus Visualizer (Three.js + Canvas fallback)
│   ├── products.js       # Authentic Sicilian product catalog & sensory profiles
│   ├── soundscape.js     # Web Audio API Mediterranean soundscape generator
│   └── translations.js   # Complete English & Italian bilingual dictionary
└── package.json          # Project metadata and start script
```
