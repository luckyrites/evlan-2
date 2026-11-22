/**
 * AGRUMEA FARM / ELVAN FOODS - SIGNATURE 3D HERO JAR SLIDER
 * 1:1 Architectural Implementation of agrumeafarm.it
 * Features:
 *  - 10 Artisanal Glass Jars with High-Resolution Transparent Vessels & Custom Labels
 *  - Continuous 9.5° Tilted Ribbon Marquee Track
 *  - Smooth Inertial Dragging & Mouse Wheel Momentum Scrolling
 *  - Real-time Cursor-Tracking 3D Tilt Physics (rotateX, rotateY, translateZ)
 *  - Custom Follower Cursor Pill ("DISCOVER" / "TASTE")
 *  - Direct Integration with Product Modal & Quotation Drawer
 */

export const AGRUMEA_JARS = [
  {
    id: "tomato-ketchup",
    productId: "tomato-ketchup",
    brand: "Crimson™",
    brandHindi: "क्रिम्सन™",
    title: "Gourmet Tomato Ketchup",
    titleHindi: "क्लासिक टोमैटो कैचप",
    tagline: "Slow-Cooked Vine Tomatoes",
    image: "assets/jars/jar-ketchup.webp",
    weight: "450g Glass Jar",
    price: "₹85",
    color: "#B31329",
    accent: "#E84E1B"
  },
  {
    id: "mango-pickle",
    productId: "mango-pickle",
    brand: "Raghunandan™",
    brandHindi: "रघुनंदन™",
    title: "Heritage Mango Pickle",
    titleHindi: "पारंपरिक आम का अचार",
    tagline: "Cold-Pressed Mustard Oil & Ramkela",
    image: "assets/jars/jar-pickle.webp",
    weight: "450g Heritage Jar",
    price: "₹110",
    color: "#D4881A",
    accent: "#E5A018"
  },
  {
    id: "schezwan-sauce",
    productId: "schezwan-sauce",
    brand: "Spice Dragon™",
    brandHindi: "स्पाइस ड्रैगन™",
    title: "Fiery Schezwan Wok Sauce",
    titleHindi: "फ़ायरी शेज़वान सॉस",
    tagline: "Fire Up Your Taste...!",
    image: "assets/jars/jar-schezwan.webp",
    weight: "450g Gourmet Glass",
    price: "₹95",
    color: "#9A1016",
    accent: "#FF4500"
  },
  {
    id: "mix-fruit-jam",
    productId: "mix-fruit-jam",
    brand: "Nandan™",
    brandHindi: "નંદન™",
    title: "Mixed Orchard Fruit Jam",
    titleHindi: "मिक्स फ्रूट जैम",
    tagline: "100% Real Sun-Ripened Fruit",
    image: "assets/jars/jar-jam.webp",
    weight: "450g Hexagonal Jar",
    price: "₹95",
    color: "#7E1929",
    accent: "#F0A500"
  },
  {
    id: "ginger-garlic-paste",
    productId: "ginger-garlic-paste",
    brand: "Ambar Masale™",
    brandHindi: "अम्बर मसाले™",
    title: "Fresh Ginger Garlic Paste",
    titleHindi: "अदरक लहसुन पेस्ट",
    tagline: "Farm-Fresh Crushed Aromatics",
    image: "assets/jars/jar-paste.webp",
    weight: "400g Pantry Jar",
    price: "₹65",
    color: "#4A6B22",
    accent: "#8BAE3A"
  },
  {
    id: "green-chilli-sauce",
    productId: "green-chilli-sauce",
    brand: "Crimson™",
    brandHindi: "क्रिम्सन™",
    title: "Piquant Green Chilli Sauce",
    titleHindi: "हरी मिर्च सॉस",
    tagline: "Fresh Green Pepper Purée",
    image: "assets/jars/jar-greenchilli.webp",
    weight: "450g Glass Bottle",
    price: "₹75",
    color: "#2C6B2F",
    accent: "#4CAF50"
  },
  {
    id: "stuffed-red-chilli",
    productId: "stuffed-red-chilli",
    brand: "Raghunandan™",
    brandHindi: "रघुनंदन™",
    title: "Banarasi Bharwa Lal Mirch",
    titleHindi: "बनारसी भरवा लाल मिर्च",
    tagline: "Sun-Cured Whole Stuffed Red Pepper",
    image: "assets/jars/jar-redchilli.webp",
    weight: "500g Traditional Barni",
    price: "₹160",
    color: "#9B111E",
    accent: "#D32F2F"
  },
  {
    id: "garlic-chilli-dip",
    productId: "garlic-chilli-dip",
    brand: "Spice Dragon™",
    brandHindi: "स्पाइस ड्रैगन™",
    title: "Szechuan Hot Garlic Sauce",
    titleHindi: "हॉट गार्लिक सॉस",
    tagline: "Crushed Garlic & Roasted Chilies",
    image: "assets/jars/jar-garlic.webp",
    weight: "450g Wok Jar",
    price: "₹100",
    color: "#851419",
    accent: "#E65100"
  },
  {
    id: "orange-marmalade",
    productId: "orange-marmalade",
    brand: "Nandan™",
    brandHindi: "નંદન™",
    title: "Zesty Orange Marmalade",
    titleHindi: "ऑरेंज मार्मलेड जैम",
    tagline: "Hand-Cut Citrus Peel & Pure Pulp",
    image: "assets/jars/jar-marmalade.webp",
    weight: "450g Hexagonal Jar",
    price: "₹105",
    color: "#E65C00",
    accent: "#FFA000"
  },
  {
    id: "durum-wheat-pasta",
    productId: "durum-wheat-pasta",
    brand: "Farm Feast™",
    brandHindi: "फार्म फीस्ट™",
    title: "Artisanal Condiment & Pasta",
    titleHindi: "डुरम व्हीट पास्ता व सॉस",
    tagline: "100% Durum Wheat Semolina",
    image: "assets/jars/jar-spread.webp",
    weight: "500g Gourmet Pack",
    price: "₹115",
    color: "#3F6B38",
    accent: "#689F38"
  }
];

export class AgrumeaJarSlider {
  constructor(containerId = "hero-section") {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.items = [...AGRUMEA_JARS, ...AGRUMEA_JARS, ...AGRUMEA_JARS]; // 3x for seamless infinite ribbon loop
    this.itemWidth = 240; // Item width + gap
    this.totalWidth = this.items.length * this.itemWidth;
    
    this.offset = 0;
    this.velocity = -0.75; // Constant gentle drift leftward
    this.targetVelocity = -0.75;
    
    this.isDragging = false;
    this.startX = 0;
    this.lastX = 0;
    this.dragDistance = 0;
    this.lastTime = 0;

    // Follower cursor state
    this.cursorX = -100;
    this.cursorY = -100;
    this.currentCursorX = -100;
    this.currentCursorY = -100;

    this.initDOM();
    this.bindEvents();
    this.startLoop();
  }

  initDOM() {
    this.container.innerHTML = `
      <section class="jar-slider" data-jar-slider>
        <h1 class="visually-hidden">Elvan Foods: Indian Artisan Condiments, Heritage Pickles & Preserves</h1>
        
        <!-- Giant Sicilian Burgundy Organic Mountain Silhouette -->
        <div class="jar-slider__shape-layer" aria-hidden="true">
          <img class="jar-slider__shape-image" src="assets/back-slider.svg" width="1407" height="601" alt="" decoding="async">
          <div class="jar-slider__badge jar-slider__badge--artwork">
            <img class="jar-slider__badge-artwork" src="assets/circle-text.svg" width="1000" height="1000" alt="" decoding="async">
          </div>
        </div>

        <!-- Floating Bottom Prompt -->
        <div class="jar-slider__overlay">
          <p class="jar-slider__prompt">
            <span>Scroll or Drag to Discover</span>
            <span class="jar-slider__prompt-arrow">↓</span>
          </p>
        </div>

        <!-- Marquee Ribbon Track Wrapper (Angled at 9.5deg) -->
        <div class="jar-slider__wrapper" id="jar-slider-wrap">
          <div class="jar-slider__marquee">
            <div class="jar-slider__track" id="jar-slider-track"></div>
          </div>
        </div>

        <!-- Interactive Follower Cursor Pill -->
        <div id="jar-cursor-pill" class="jar-cursor-pill">
          <span id="jar-cursor-text">DISCOVER</span>
        </div>
      </section>
    `;

    this.wrapper = document.getElementById("jar-slider-wrap");
    this.track = document.getElementById("jar-slider-track");
    this.cursorPill = document.getElementById("jar-cursor-pill");
    this.cursorText = document.getElementById("jar-cursor-text");

    // Click on "Scroll or Drag to Discover" smoothly scrolls to next section
    const promptBtn = this.container.querySelector(".jar-slider__prompt");
    if (promptBtn) {
      promptBtn.addEventListener("click", () => {
        const nextSection = document.getElementById("brands-section") || document.getElementById("pantry-section");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // Populate track with jars
    this.itemElements = [];
    this.items.forEach((jar, index) => {
      const itemEl = document.createElement("div");
      itemEl.className = "jar-slider__item";
      itemEl.setAttribute("data-jar-id", jar.id);
      itemEl.setAttribute("data-product-id", jar.productId);
      itemEl.style.left = `${index * this.itemWidth}px`;

      const isHindi = window.app && window.app.currentLang === 'hi';
      const displayBrand = isHindi ? jar.brandHindi : jar.brand;
      const displayTitle = isHindi ? jar.titleHindi : jar.title;

      itemEl.innerHTML = `
        <div class="jar-slider__img-wrap">
          <img class="jar-slider__base" src="${jar.image}" alt="${displayTitle}" loading="eager" />
          <div class="jar-slider__label">
            <div class="jar-slider__label-brand">${displayBrand}</div>
            <div class="jar-slider__label-title">${displayTitle}</div>
            <div class="jar-slider__label-weight">${jar.weight} • ${jar.price}</div>
          </div>
        </div>
      `;

      // Hover 3D Tilt interaction
      itemEl.addEventListener("mousemove", (e) => this.onJarMouseMove(e, itemEl, jar));
      itemEl.addEventListener("mouseleave", () => this.onJarMouseLeave(itemEl));
      itemEl.addEventListener("click", () => this.onJarClick(jar));

      this.track.appendChild(itemEl);
      this.itemElements.push({ el: itemEl, jar, initialLeft: index * this.itemWidth });
    });
  }

  bindEvents() {
    // Global Follower Cursor Movement
    window.addEventListener("mousemove", (e) => {
      this.cursorX = e.clientX;
      this.cursorY = e.clientY;
      if (this.cursorPill) {
        this.cursorPill.classList.add("is-visible");
      }
    });

    document.addEventListener("mouseleave", () => {
      if (this.cursorPill) {
        this.cursorPill.classList.remove("is-visible");
      }
    });

    // Pointer events for dragging with momentum
    this.wrapper.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    window.addEventListener("pointermove", (e) => this.onPointerMove(e));
    window.addEventListener("pointerup", (e) => this.onPointerUp(e));
    window.addEventListener("pointercancel", (e) => this.onPointerUp(e));

    // Mouse wheel support:
    // Only capture horizontal delta (trackpad side-swipe or shift+wheel) for jar carousel.
    // Allow vertical delta (standard mouse wheel down/up) to scroll the page naturally!
    this.wrapper.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Horizontal scroll: move the jars
        e.preventDefault();
        this.velocity -= e.deltaX * 0.08;
        this.velocity = Math.max(Math.min(this.velocity, 25), -25);
      } else {
        // Vertical wheel: also gently nudge the jars, but DO NOT preventDefault!
        // The browser will naturally scroll down the webpage into the pantry!
        this.velocity -= e.deltaY * 0.015;
      }
    }, { passive: false });

    // Header scroll background toggle
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".site-header");
      if (header) {
        if (window.scrollY > 40) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
      }
    });
  }

  onPointerDown(e) {
    this.isPointerDown = true;
    this.isDragging = false;
    this.gestureLocked = false;
    this.isVerticalGesture = false;

    this.startX = e.clientX;
    this.startY = e.clientY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.dragDistance = 0;
    this.lastTime = performance.now();
    this.velocity = 0;
  }

  onPointerMove(e) {
    if (!this.isPointerDown) return;

    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    const totalDx = Math.abs(e.clientX - this.startX);
    const totalDy = Math.abs(e.clientY - this.startY);

    // Lock gesture direction once movement exceeds threshold (7px)
    if (!this.gestureLocked && (totalDx > 7 || totalDy > 7)) {
      this.gestureLocked = true;
      if (totalDy > totalDx) {
        // User is swiping vertically to scroll the page down/up!
        this.isVerticalGesture = true;
        this.isDragging = false;
        return;
      } else {
        // User is swiping horizontally to scroll between jars!
        this.isVerticalGesture = false;
        this.isDragging = true;
      }
    }

    if (this.isVerticalGesture) {
      // Allow browser native vertical scrolling to handle it smoothly
      return;
    }

    if (this.isDragging) {
      const now = performance.now();
      const dt = Math.max(now - this.lastTime, 1);
      
      this.offset += dx;
      this.dragDistance += Math.abs(dx);
      this.velocity = (dx / dt) * 16; // Project to 60fps velocity

      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.lastTime = now;
    }
  }

  onPointerUp() {
    this.isPointerDown = false;
    this.isDragging = false;
    this.gestureLocked = false;
    this.isVerticalGesture = false;
  }

  onJarMouseMove(e, itemEl, jar) {
    const rect = itemEl.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotY = (x / (rect.width / 2)) * 16;
    const rotX = -(y / (rect.height / 2)) * 12;

    const wrap = itemEl.querySelector(".jar-slider__img-wrap");
    if (wrap) {
      wrap.style.transform = `perspective(700px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(25px)`;
    }

    if (this.cursorPill && this.cursorText) {
      this.cursorPill.classList.add("is-jar-hover");
      this.cursorText.textContent = "TASTE";
    }
  }

  onJarMouseLeave(itemEl) {
    const wrap = itemEl.querySelector(".jar-slider__img-wrap");
    if (wrap) {
      wrap.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    }

    if (this.cursorPill && this.cursorText) {
      this.cursorPill.classList.remove("is-jar-hover");
      this.cursorText.textContent = "DISCOVER";
    }
  }

  onJarClick(jar) {
    // If the user was dragging, don't trigger click
    if (this.dragDistance > 6) return;

    if (window.app && typeof window.app.openProductModal === 'function') {
      window.app.openProductModal(jar.productId);
    } else {
      const pantrySection = document.getElementById("pantry-section");
      if (pantrySection) {
        pantrySection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  startLoop() {
    const tick = () => {
      // Apply momentum & friction
      if (!this.isDragging) {
        this.offset += this.velocity;
        // Exponential friction decay towards natural gentle drift (-0.75)
        this.velocity = this.velocity * 0.95 + (-0.75) * 0.05;
      }

      // Smooth wrap-around for infinite track
      const loopWidth = (this.items.length / 3) * this.itemWidth;
      while (this.offset < -loopWidth) {
        this.offset += loopWidth;
      }
      while (this.offset > 0) {
        this.offset -= loopWidth;
      }

      if (this.track) {
        this.track.style.transform = `translate3d(${this.offset}px, 0, 0)`;
      }

      // Smooth cursor follow
      if (this.cursorPill) {
        this.currentCursorX += (this.cursorX - this.currentCursorX) * 0.25;
        this.currentCursorY += (this.cursorY - this.currentCursorY) * 0.25;
        this.cursorPill.style.left = `${this.currentCursorX}px`;
        this.cursorPill.style.top = `${this.currentCursorY}px`;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }
}

// Global hook for language switching
export function updateJarSliderLabels() {
  const slider = window.jarSliderInstance;
  if (!slider || !slider.itemElements) return;

  const isHindi = window.app && window.app.currentLang === 'hi';
  slider.itemElements.forEach(({ el, jar }) => {
    const brandEl = el.querySelector(".jar-slider__label-brand");
    const titleEl = el.querySelector(".jar-slider__label-title");
    if (brandEl) brandEl.textContent = isHindi ? jar.brandHindi : jar.brand;
    if (titleEl) titleEl.textContent = isHindi ? jar.titleHindi : jar.title;
  });
}
