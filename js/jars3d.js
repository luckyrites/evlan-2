/**
 * ELVAN FOODS - INTERACTIVE 3D GLASS JAR SHOWCASE
 * High-end interactive 3D artisanal jar visualizer.
 * Supports horizontal scrolling, mouse hover 3D tilt physics, specular glare,
 * and realistic glass reflections. Modeled after agrumeafarm.it.
 */

export const SIGNATURE_JARS = [
  {
    id: "tomato-ketchup",
    productId: "tomato-ketchup",
    brandName: "Crimson™",
    brandTag: "Gourmet Condiments",
    title: "Classic Tomato Ketchup",
    hindiTitle: "टोमैटो कैचप",
    tagline: "Slow-Cooked Vine Tomatoes",
    color: "#B31329",
    accent: "#E84E1B",
    sauceColor: "linear-gradient(180deg, #C51630 0%, #900B1A 70%, #6E0512 100%)",
    lidColor: "linear-gradient(135deg, #E6C280 0%, #C49842 50%, #8C6218 100%)",
    labelBg: "#FFF8F0",
    labelBorder: "#C49842",
    logoColor: "#9C0D20",
    logoText: "Crimson",
    subText: "TOMATO KETCHUP",
    weight: "450g Glass Jar",
    price: "₹85",
    textureSeeds: false,
    chiliFlakes: false
  },
  {
    id: "mango-pickle",
    productId: "mango-pickle",
    brandName: "Raghunandan™",
    brandTag: "Heritage Pickles",
    title: "Traditional Mango Pickle",
    hindiTitle: "आम का अचार (स्पेशल)",
    tagline: "Cold-Pressed Mustard Oil & Ramkela",
    color: "#2C6B2F",
    accent: "#E5A018",
    sauceColor: "linear-gradient(180deg, #D4881A 0%, #9E580B 60%, #703A04 100%)",
    lidColor: "linear-gradient(135deg, #F4BA28 0%, #C88D11 50%, #875902 100%)",
    labelBg: "#FAF6EE",
    labelBorder: "#255C27",
    logoColor: "#255C27",
    logoText: "रघुनंदन",
    subText: "TRADITIONAL MANGO PICKLE",
    weight: "450g Barni Jar",
    price: "₹110",
    textureSeeds: true,
    chiliFlakes: true
  },
  {
    id: "schezwan-sauce",
    productId: "schezwan-sauce",
    brandName: "Spice Dragon™",
    brandTag: "Fiery Wok Sauces",
    title: "Fiery Schezwan Sauce",
    hindiTitle: "शेज़वान सॉस",
    tagline: "Fire Up Your Taste...!",
    color: "#9A1016",
    accent: "#FF4500",
    sauceColor: "linear-gradient(180deg, #B2181E 0%, #75090E 70%, #4A0307 100%)",
    lidColor: "linear-gradient(135deg, #2D2D2D 0%, #151515 50%, #000000 100%)",
    labelBg: "#1F0407",
    labelBorder: "#E09F3E",
    logoColor: "#FFD166",
    logoText: "SPICE DRAGON",
    subText: "HOT SICHUAN WOK SAUCE",
    weight: "450g Gourmet Jar",
    price: "₹95",
    textureSeeds: true,
    chiliFlakes: true
  },
  {
    id: "mix-fruit-jam",
    productId: "mix-fruit-jam",
    brandName: "Nandan™",
    brandTag: "Fruit Delights",
    title: "Mixed Fruit Jam",
    hindiTitle: "मिक्स फ्रूट जैम",
    tagline: "100% Real Orchard Pulp",
    color: "#E51E2B",
    accent: "#2E7D32",
    sauceColor: "linear-gradient(180deg, #E62235 0%, #AA1020 60%, #770512 100%)",
    lidColor: "linear-gradient(135deg, #FFD56B 0%, #F0A500 50%, #B87700 100%)",
    labelBg: "#FFFBF5",
    labelBorder: "#2E7D32",
    logoColor: "#B70A18",
    logoText: "નંદન",
    subText: "MIXED FRUIT PRESERVE",
    weight: "450g Hex Glass Jar",
    price: "₹95",
    textureSeeds: false,
    chiliFlakes: false
  },
  {
    id: "ginger-garlic-paste",
    productId: "ginger-garlic-paste",
    brandName: "Ambar Masale™",
    brandTag: "Cooking Pastes",
    title: "Fresh Ginger Garlic Paste",
    hindiTitle: "अदरक लहसुन पेस्ट",
    tagline: "Pounded Aromatic Kitchen Blend",
    color: "#D3101E",
    accent: "#DAA520",
    sauceColor: "linear-gradient(180deg, #EAD7A6 0%, #CBB071 60%, #9D803D 100%)",
    lidColor: "linear-gradient(135deg, #D4AF37 0%, #AA820A 50%, #6E5300 100%)",
    labelBg: "#FFF8F2",
    labelBorder: "#D70C1B",
    logoColor: "#D70C1B",
    logoText: "अम्बर मसाले",
    subText: "GINGER GARLIC PASTE",
    weight: "450g Kitchen Jar",
    price: "₹85",
    textureSeeds: false,
    chiliFlakes: false
  }
];

export class JarsShowcase {
  constructor(containerId, onSelectProduct = null) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.onSelectProduct = onSelectProduct;
    this.currentIndex = 0;
    this.jars = SIGNATURE_JARS;
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;

    this.render();
    this.setupInteractions();
  }

  render() {
    this.container.innerHTML = `
      <div class="relative w-full overflow-hidden select-none py-6">
        
        <!-- Ambient Under-Glow -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-citrus-500/15 blur-3xl pointer-events-none"></div>

        <!-- 3D Perspective Stage -->
        <div class="jar-stage relative flex items-center justify-center min-h-[460px] perspective-[1200px]">
          
          <!-- Jars Carousel Track -->
          <div id="jars-track" class="flex items-center justify-center gap-6 md:gap-10 transition-transform duration-500 ease-out">
            ${this.jars.map((jar, idx) => this.renderJarCard(jar, idx)).join('')}
          </div>

        </div>

        <!-- Floating Glass Nav Controls -->
        <div class="flex items-center justify-between absolute inset-x-2 top-1/2 -translate-y-1/2 pointer-events-none z-30">
          <button id="jar-prev-btn" class="pointer-events-auto w-11 h-11 rounded-full bg-white/90 hover:bg-white text-burgundy-950 shadow-lg border border-cream-400 flex items-center justify-center font-bold transition-all hover:scale-110 active:scale-95" title="Previous Jar">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <button id="jar-next-btn" class="pointer-events-auto w-11 h-11 rounded-full bg-white/90 hover:bg-white text-burgundy-950 shadow-lg border border-cream-400 flex items-center justify-center font-bold transition-all hover:scale-110 active:scale-95" title="Next Jar">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <!-- Carousel Indicators & Hint -->
        <div class="flex flex-col items-center gap-2.5 mt-4 z-20 relative">
          <div class="flex items-center gap-2">
            ${this.jars.map((_, idx) => `
              <button class="jar-dot w-2.5 h-2.5 rounded-full transition-all ${idx === this.currentIndex ? 'bg-citrus-500 w-7' : 'bg-cream-400 hover:bg-cream-500'}" data-jar-idx="${idx}"></button>
            `).join('')}
          </div>
          <div class="text-[0.675rem] font-bold tracking-wider text-earth-muted uppercase flex items-center gap-1.5">
            <span>✦ Scroll or drag jars • Hover over jar to tilt in 3D</span>
          </div>
        </div>

      </div>
    `;

    this.updateActiveJarState();
  }

  renderJarCard(jar, idx) {
    return `
      <div class="jar-card-wrap relative flex-shrink-0 cursor-pointer transition-all duration-500 transform-gpu" data-jar-index="${idx}" style="width: 260px;">
        
        <!-- 3D Tilting Jar Vessel -->
        <div class="jar-3d-box relative flex flex-col items-center justify-center p-4 transition-transform ease-out will-change-transform" style="transform-style: preserve-3d;">
          
          <!-- Realistic Glass Bottle Structure -->
          <div class="jar-vessel relative w-44 h-72 rounded-[28px] overflow-hidden shadow-2xl border border-white/60" style="background: ${jar.sauceColor}; transform-style: preserve-3d; box-shadow: inset 0 0 25px rgba(0,0,0,0.45), 0 25px 45px -10px rgba(0,0,0,0.35);">
            
            <!-- Metallic Screw Lid with Ridges -->
            <div class="jar-lid absolute top-0 inset-x-0 h-10 rounded-t-[26px] border-b-2 border-black/20 flex items-center justify-center shadow-md z-30" style="background: ${jar.lidColor};">
              <div class="w-full h-1 bg-white/40 absolute top-1 rounded-full"></div>
              <div class="text-[0.55rem] font-black tracking-widest text-black/60 uppercase">ELVAN FOODS • SEALED</div>
            </div>

            <!-- Jar Neck Ring -->
            <div class="absolute top-10 inset-x-2 h-2.5 bg-black/15 z-20"></div>

            <!-- Glass Reflection Highlight (Left Curved Highlight) -->
            <div class="absolute inset-y-12 left-2 w-3 rounded-full bg-gradient-to-r from-white/45 to-transparent pointer-events-none z-20"></div>
            <!-- Glass Specular Glare (Right Highlight) -->
            <div class="absolute inset-y-14 right-3 w-1.5 rounded-full bg-white/30 pointer-events-none z-20"></div>

            <!-- Textured Particles / Seeds inside (for Pickle & Schezwan) -->
            ${jar.textureSeeds ? `
              <div class="absolute inset-x-0 bottom-4 top-14 opacity-40 pointer-events-none z-10" style="background-image: radial-gradient(#FFD700 1.5px, transparent 1.5px), radial-gradient(#222 1px, transparent 1px); background-size: 16px 16px, 12px 12px; background-position: 0 0, 8px 8px;"></div>
            ` : ''}

            <!-- Wrap-Around Artisanal Letterpress Label -->
            <div class="jar-label absolute inset-x-2 top-16 bottom-12 rounded-xl p-3 flex flex-col items-center justify-between text-center shadow-md border z-20" style="background: ${jar.labelBg}; border-color: ${jar.labelBorder};">
              
              <!-- Brand Seal -->
              <div class="flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${jar.color};"></span>
                <span class="text-[0.6rem] font-black uppercase tracking-wider" style="color: ${jar.color};">${jar.brandName}</span>
              </div>

              <!-- Main Typographic Badge -->
              <div class="my-auto">
                <div class="font-serif font-black text-xl leading-none tracking-tight" style="color: ${jar.logoColor};">
                  ${jar.logoText}
                </div>
                <div class="text-[0.55rem] font-bold tracking-[0.2em] uppercase text-earth-muted mt-1">
                  ${jar.subText}
                </div>
                <div class="w-8 h-0.5 mx-auto my-1.5" style="background-color: ${jar.accent};"></div>
                <div class="text-[0.625rem] font-bold text-earth line-clamp-1">
                  ${jar.title}
                </div>
              </div>

              <!-- Weight & Origin Seal -->
              <div class="w-full flex items-center justify-between text-[0.55rem] font-bold text-earth-muted border-t pt-1 border-earth/10">
                <span>${jar.weight}</span>
                <span class="text-olive-700">★ FSSAI</span>
              </div>
            </div>

            <!-- Glass Bottom Thick Rim -->
            <div class="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/40 via-white/10 to-transparent rounded-b-[28px] pointer-events-none z-20"></div>

            <!-- Dynamic Cursor Specular Glare (Reacts on Mouse Move) -->
            <div class="jar-glare absolute inset-0 pointer-events-none z-30 opacity-0 transition-opacity duration-200" style="background: radial-gradient(circle at 50% 30%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 65%);"></div>
          </div>

          <!-- Dynamic Contact Shadow Beneath Jar -->
          <div class="jar-shadow w-36 h-5 rounded-full bg-black/25 blur-md mt-4 transition-all duration-300"></div>

          <!-- Floating Info & Quick Action under the active jar -->
          <div class="jar-details text-center mt-3 space-y-1 transition-opacity duration-300">
            <span class="text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cream-300 text-burgundy-950 font-serif">
              ${jar.brandTag}
            </span>
            <div class="font-serif font-black text-base text-burgundy-950 leading-tight">
              ${jar.title}
            </div>
            <div class="text-xs font-black text-citrus-600">
              ${jar.price} <span class="font-normal text-earth-muted text-[0.65rem]">/ ${jar.weight}</span>
            </div>

            <div class="pt-2 flex items-center justify-center gap-2">
              <button class="jar-quickview-btn px-3 py-1 rounded-full bg-white text-burgundy-950 hover:bg-cream-200 border border-cream-400 text-[0.675rem] font-bold uppercase tracking-wider shadow-sm transition-all" data-prod-id="${jar.productId}">
                Inspect Jar
              </button>
              <button class="jar-add-btn px-3 py-1 rounded-full bg-citrus-500 hover:bg-citrus-600 text-white text-[0.675rem] font-bold uppercase tracking-wider shadow-sm transition-all" data-prod-id="${jar.productId}">
                Add to Bag
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  setupInteractions() {
    const track = document.getElementById('jars-track');
    const container = this.container;

    // 1. Mouse wheel horizontal scrolling
    container.addEventListener('wheel', (e) => {
      // If horizontal or vertical delta
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 20) this.next();
        else if (e.deltaX < -20) this.prev();
      } else if (Math.abs(e.deltaY) > 30) {
        // Vertical wheel scroll smoothly slides jars when mouse is over showcase
        e.preventDefault();
        if (e.deltaY > 0) this.next();
        else this.prev();
      }
    }, { passive: false });

    // 2. Drag / Touch Swipe on Jars
    let startX = 0;
    let isDown = false;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDown) return;
      isDown = false;
      const endX = e.pageX;
      const diff = endX - startX;
      if (diff > 50) this.prev();
      else if (diff < -50) this.next();
    });

    // Touch
    track.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].pageX;
      }
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const endX = e.changedTouches[0].pageX;
        const diff = endX - startX;
        if (diff > 40) this.prev();
        else if (diff < -40) this.next();
      }
    }, { passive: true });

    // 3. 3D Tilt on Hover over Jars
    this.container.querySelectorAll('.jar-card-wrap').forEach((wrap, idx) => {
      const box = wrap.querySelector('.jar-3d-box');
      const glare = wrap.querySelector('.jar-glare');
      const shadow = wrap.querySelector('.jar-shadow');

      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left; // x pos within element
        const y = e.clientY - rect.top;  // y pos within element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -18; // Max 18 deg
        const rotateY = ((x - centerX) / centerX) * 22;  // Max 22 deg

        box.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateZ(25px)`;
        
        // Move shadow in opposite direction
        if (shadow) {
          shadow.style.transform = `translateX(${rotateY * -0.6}px) scale(${1 + Math.abs(rotateX * 0.02)})`;
          shadow.style.opacity = '0.35';
        }

        // Glare highlight tracking
        if (glare) {
          glare.style.opacity = '1';
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)`;
        }
      });

      wrap.addEventListener('mouseleave', () => {
        box.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)`;
        if (shadow) {
          shadow.style.transform = `translateX(0px) scale(1)`;
          shadow.style.opacity = '0.25';
        }
        if (glare) {
          glare.style.opacity = '0';
        }
      });

      // Click to select/center jar
      wrap.addEventListener('click', (e) => {
        if (e.target.closest('.jar-quickview-btn') || e.target.closest('.jar-add-btn')) return;
        this.goToIndex(idx);
      });
    });

    // 4. Buttons
    const prevBtn = document.getElementById('jar-prev-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());

    const nextBtn = document.getElementById('jar-next-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());

    // 5. Indicators
    this.container.querySelectorAll('.jar-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-jar-idx'), 10);
        this.goToIndex(idx);
      });
    });

    // 6. Action buttons
    this.container.querySelectorAll('.jar-quickview-btn').forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = e.currentTarget.getAttribute('data-prod-id');
        if (window.app && window.app.openQuickView) {
          window.app.openQuickView(pId);
        }
      });
    });

    this.container.querySelectorAll('.jar-add-btn').forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = e.currentTarget.getAttribute('data-prod-id');
        if (window.app && window.app.addToCart) {
          window.app.addToCart(pId);
        }
      });
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.jars.length;
    this.updateActiveJarState();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.jars.length) % this.jars.length;
    this.updateActiveJarState();
  }

  goToIndex(idx) {
    this.currentIndex = idx;
    this.updateActiveJarState();
  }

  updateActiveJarState() {
    const track = document.getElementById('jars-track');
    const cards = this.container.querySelectorAll('.jar-card-wrap');
    const dots = this.container.querySelectorAll('.jar-dot');

    if (!track) return;

    // Center active jar
    // Each jar is 260px + gap 24px = ~284px
    const cardWidth = 284;
    const offset = -this.currentIndex * cardWidth;
    track.style.transform = `translateX(${offset}px)`;

    cards.forEach((card, idx) => {
      const isCur = idx === this.currentIndex;
      const details = card.querySelector('.jar-details');

      if (isCur) {
        card.style.opacity = '1';
        card.style.filter = 'none';
        card.style.transform = 'scale(1.08) translateZ(40px)';
        card.style.zIndex = '20';
        if (details) details.style.opacity = '1';
      } else {
        card.style.opacity = '0.6';
        card.style.filter = 'blur(1px)';
        const dist = Math.abs(idx - this.currentIndex);
        const rotY = idx < this.currentIndex ? 16 : -16;
        card.style.transform = `scale(${Math.max(0.78, 1 - dist * 0.12)}) rotateY(${rotY}deg)`;
        card.style.zIndex = '5';
        if (details) details.style.opacity = '0';
      }
    });

    // Update dots
    dots.forEach((dot, idx) => {
      if (idx === this.currentIndex) {
        dot.className = 'jar-dot w-7 h-2.5 rounded-full bg-citrus-500 transition-all';
      } else {
        dot.className = 'jar-dot w-2.5 h-2.5 rounded-full bg-cream-400 hover:bg-cream-500 transition-all';
      }
    });
  }
}
