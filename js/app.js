/**
 * ELVAN FOODS - CORE APPLICATION LOGIC
 * State management, bilingual rendering, reactive cart, tasting wheel, and interactive modals.
 */

import { PRODUCTS, CATEGORIES, FLAVOR_PROFILES, HARVEST_CALENDAR } from './products.js';
import { TRANSLATIONS } from './translations.js';
import { soundscape } from './soundscape.js';
import { CitrusVisualizer } from './citrus3d.js';

class ElvanFoodsApp {
  constructor() {
    // State
    this.lang = localStorage.getItem('elvan_lang') || localStorage.getItem('agrumea_lang') || 'en';
    this.cart = JSON.parse(localStorage.getItem('elvan_cart') || localStorage.getItem('agrumea_cart') || '[]');
    this.activeCategory = 'all';
    this.activeFlavorProfile = 'zesty';
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.activeModalProduct = null;
    this.appliedCoupon = null; // { code: 'ELVAN10', discountPercent: 0.10 }

    this.init();
  }

  init() {
    // Initialize 3D Citrus Visualizer
    window.addEventListener('DOMContentLoaded', () => {
      this.visualizer = new CitrusVisualizer('citrus-canvas-container');
    });

    this.renderAll();
    this.setupGlobalListeners();
  }

  t(path) {
    const keys = path.split('.');
    let current = TRANSLATIONS[this.lang];
    for (const key of keys) {
      if (!current || current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  }

  setLanguage(newLang) {
    if (newLang !== 'en' && newLang !== 'it') return;
    this.lang = newLang;
    localStorage.setItem('elvan_lang', newLang);
    document.documentElement.lang = newLang;
    this.renderAll();
    this.showToast(this.lang === 'en' ? 'Language switched to English' : 'Lingua impostata su Italiano');
  }

  saveCart() {
    localStorage.setItem('elvan_cart', JSON.stringify(this.cart));
    this.renderCartUI();
  }

  addToCart(productId, quantity = 1, size = 'Standard') {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(item => item.product.id === productId && item.size === size);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({ product, quantity, size });
    }

    this.saveCart();
    this.openCart();
    this.showToast(`✦ ${product[this.lang].name} ${this.t('pantry.addedToBag')}`);
  }

  updateCartQty(index, delta) {
    if (this.cart[index]) {
      this.cart[index].quantity += delta;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
      this.saveCart();
    }
  }

  removeFromCart(index) {
    if (this.cart[index]) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
  }

  openCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
    }
  }

  closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
    }
  }

  openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    this.activeModalProduct = product;
    this.renderQuickViewModal();

    const modal = document.getElementById('product-modal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  closeQuickView() {
    const modal = document.getElementById('product-modal');
    if (modal) {
      modal.classList.remove('active');
    }
    this.activeModalProduct = null;
  }

  showToast(message) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'ELVAN10' || cleanCode === 'SICILIA10') {
      this.appliedCoupon = { code: 'ELVAN10', discountPercent: 0.10 };
      this.showToast('🎉 10% Welcome Voucher applied!');
      this.renderCartUI();
      return true;
    } else if (cleanCode === 'FARMHOUSE') {
      this.appliedCoupon = { code: 'FARMHOUSE', discountAmount: 5.00 };
      this.showToast('🎉 €5.00 Farmhouse Voucher applied!');
      this.renderCartUI();
      return true;
    } else {
      this.showToast(this.t('cart.couponInvalid'));
      return false;
    }
  }

  // Calculate cart totals
  getCartTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const threshold = this.t('cart.freeShippingThreshold');
    const isFreeShipping = subtotal >= threshold || subtotal === 0;
    const shipping = isFreeShipping ? 0 : 6.50;

    let discount = 0;
    if (this.appliedCoupon) {
      if (this.appliedCoupon.discountPercent) {
        discount = subtotal * this.appliedCoupon.discountPercent;
      } else if (this.appliedCoupon.discountAmount) {
        discount = Math.min(subtotal, this.appliedCoupon.discountAmount);
      }
    }

    const total = Math.max(0, subtotal - discount + (subtotal > 0 ? shipping : 0));
    return { subtotal, shipping, isFreeShipping, discount, total, remainingForFree: Math.max(0, threshold - subtotal) };
  }

  // RENDER EVERYTHING
  renderAll() {
    this.renderHeader();
    this.renderHero();
    this.renderFlavorWheel();
    this.renderProductCatalog();
    this.renderFarmStory();
    this.renderTerroir();
    this.renderHarvestCalendar();
    this.renderNewsletter();
    this.renderFooter();
    this.renderCartUI();
  }

  renderHeader() {
    const headerEl = document.getElementById('main-header');
    if (!headerEl) return;

    const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);

    headerEl.innerHTML = `
      <div class="container-farm flex items-center justify-between py-4">
        <!-- Brand Insignia -->
        <a href="#hero" class="flex items-center gap-3.5 group text-decoration-none">
          <div class="w-10 h-10 rounded-full bg-citrus-500 flex items-center justify-center text-white font-serif font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
            E
          </div>
          <div>
            <div class="font-display text-2xl tracking-wide text-burgundy-950 font-bold leading-tight">ELVAN FOODS</div>
            <div class="text-[0.625rem] font-sans tracking-[0.24em] text-earth-muted uppercase">Siracusa • Sicilia</div>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-[0.14em] uppercase text-earth">
          <a href="#pantry" class="hover:text-citrus-500 transition-colors">${this.t('nav.pantry')}</a>
          <a href="#tasting" class="hover:text-citrus-500 transition-colors">${this.t('nav.tasting')}</a>
          <a href="#story" class="hover:text-citrus-500 transition-colors">${this.t('nav.farm')}</a>
          <a href="#terroir" class="hover:text-citrus-500 transition-colors">${this.t('nav.terroir')}</a>
          <a href="#harvest" class="hover:text-citrus-500 transition-colors">${this.t('nav.calendar')}</a>
        </nav>

        <!-- Right Utility Controls -->
        <div class="flex items-center gap-3 md:gap-4">
          <!-- Ambient Nature Sound Toggle -->
          <button id="soundscape-toggle" class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cream-400 text-[0.7rem] uppercase tracking-wider font-semibold text-earth hover:border-citrus-500 transition-all bg-cream-100" title="Toggle Sicilian Nature Soundscape">
            <span class="flex items-center gap-0.5 h-3">
              <span class="sound-bar"></span>
              <span class="sound-bar"></span>
              <span class="sound-bar"></span>
              <span class="sound-bar"></span>
            </span>
            <span class="hidden sm:inline" id="sound-label">${soundscape.isPlaying ? this.t('nav.soundOn') : this.t('nav.soundOff')}</span>
          </button>

          <!-- Language Selector -->
          <div class="flex items-center rounded-full p-0.5 bg-cream-300 border border-cream-400 text-xs font-bold">
            <button class="lang-btn px-2.5 py-1 rounded-full transition-all ${this.lang === 'en' ? 'bg-burgundy-800 text-white shadow-sm' : 'text-earth hover:text-citrus-500'}" data-lang="en">EN</button>
            <button class="lang-btn px-2.5 py-1 rounded-full transition-all ${this.lang === 'it' ? 'bg-burgundy-800 text-white shadow-sm' : 'text-earth hover:text-citrus-500'}" data-lang="it">IT</button>
          </div>

          <!-- Pantry Cart Button -->
          <button id="cart-drawer-trigger" class="relative flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <span class="hidden md:inline">${this.t('nav.cart')}</span>
            <span id="cart-badge-count" class="w-5 h-5 rounded-full bg-citrus-500 text-white text-[0.675rem] flex items-center justify-center font-bold">${cartCount}</span>
          </button>
        </div>
      </div>
    `;

    // Bind Soundscape Toggle
    const soundBtn = document.getElementById('soundscape-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const active = soundscape.toggle();
        const lbl = document.getElementById('sound-label');
        if (lbl) {
          lbl.textContent = active ? this.t('nav.soundOn') : this.t('nav.soundOff');
        }
        this.showToast(active ? '🌿 Ambient Mediterranean sounds enabled' : 'Muted');
      });
    }

    // Bind Lang buttons
    headerEl.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setLanguage(e.target.getAttribute('data-lang'));
      });
    });

    // Bind Cart Trigger
    const cartTrigger = document.getElementById('cart-drawer-trigger');
    if (cartTrigger) {
      cartTrigger.addEventListener('click', () => this.openCart());
    }
  }

  renderHero() {
    const heroEl = document.getElementById('hero-section');
    if (!heroEl) return;

    heroEl.innerHTML = `
      <div class="container-farm pt-10 pb-16 md:pt-16 md:pb-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <!-- Left Editorial Copy -->
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-citrus-100 border border-citrus-500/30 text-citrus-700 text-xs font-semibold uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-citrus-500 animate-pulse"></span>
              ${this.t('hero.tag')}
            </div>

            <h1 class="font-display text-4xl sm:text-5xl xl:text-6xl text-burgundy-950 font-normal leading-[1.12]">
              ${this.t('hero.titleStart')} <span class="italic font-serif text-citrus-500 underline decoration-cream-500 decoration-wavy underline-offset-8">${this.t('hero.titleHighlight')}</span> ${this.t('hero.titleEnd')}
            </h1>

            <p class="text-earth/80 text-base md:text-lg max-w-xl font-normal leading-relaxed">
              ${this.t('hero.desc')}
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-3">
              <a href="#pantry" class="btn-primary">
                ${this.t('hero.ctaPantry')}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="#story" class="btn-secondary">
                ${this.t('hero.ctaStory')}
              </a>
            </div>

            <!-- Stats Bar -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-8 border-t border-cream-400">
              <div>
                <div class="font-display text-2xl md:text-3xl font-bold text-burgundy-900">${this.t('hero.stat1Number')}</div>
                <div class="text-[0.675rem] font-semibold uppercase tracking-widest text-earth-muted mt-0.5">${this.t('hero.stat1Label')}</div>
              </div>
              <div>
                <div class="font-display text-2xl md:text-3xl font-bold text-citrus-500">${this.t('hero.stat2Number')}</div>
                <div class="text-[0.675rem] font-semibold uppercase tracking-widest text-earth-muted mt-0.5">${this.t('hero.stat2Label')}</div>
              </div>
              <div>
                <div class="font-display text-2xl md:text-3xl font-bold text-olive-700">${this.t('hero.stat3Number')}</div>
                <div class="text-[0.675rem] font-semibold uppercase tracking-widest text-earth-muted mt-0.5">${this.t('hero.stat3Label')}</div>
              </div>
              <div>
                <div class="font-display text-2xl md:text-3xl font-bold text-burgundy-900">${this.t('hero.stat4Number')}</div>
                <div class="text-[0.675rem] font-semibold uppercase tracking-widest text-earth-muted mt-0.5">${this.t('hero.stat4Label')}</div>
              </div>
            </div>
          </div>

          <!-- Right Interactive 3D Citrus Experience -->
          <div class="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div class="relative w-full aspect-square max-w-[440px] flex items-center justify-center">
              
              <!-- Ambient Warm Radial Glow -->
              <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-citrus-500/20 via-terracotta/10 to-transparent blur-3xl animate-glow"></div>
              
              <!-- 3D WebGL Canvas Holder -->
              <div id="citrus-canvas-container" class="relative z-10 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"></div>

              <!-- Interactive Badge Overlay -->
              <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-cream-100/90 backdrop-blur-md border border-cream-400 shadow-sm text-[0.675rem] font-semibold tracking-wide text-earth-muted text-center whitespace-nowrap">
                ${this.t('hero.interactive3DHint')}
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    // Reconnect visualizer if exists
    if (!this.visualizer) {
      this.visualizer = new CitrusVisualizer('citrus-canvas-container');
    }
  }

  renderFlavorWheel() {
    const wheelEl = document.getElementById('tasting-section');
    if (!wheelEl) return;

    const currentProfile = FLAVOR_PROFILES.find(p => p.id === this.activeFlavorProfile) || FLAVOR_PROFILES[0];
    const matchedProducts = PRODUCTS.filter(p => currentProfile.matchIds.includes(p.id));

    wheelEl.innerHTML = `
      <div class="container-farm py-16 md:py-24 border-t border-cream-400">
        <div class="max-w-3xl mb-12">
          <div class="badge-tag badge-citrus mb-3">${this.t('tasting.tag')}</div>
          <h2 class="font-display text-3xl md:text-4xl text-burgundy-950 font-normal">
            ${this.t('tasting.title')}
          </h2>
          <p class="text-earth/80 text-base mt-3">
            ${this.t('tasting.desc')}
          </p>
        </div>

        <!-- Flavor Selector Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          ${FLAVOR_PROFILES.map(profile => {
            const isActive = profile.id === this.activeFlavorProfile;
            return `
              <button class="flavor-tab-btn text-left p-5 rounded-2xl border transition-all ${
                isActive 
                  ? 'bg-burgundy-900 text-white border-burgundy-700 shadow-lg scale-[1.02]' 
                  : 'bg-cream-100 text-earth border-cream-400 hover:border-citrus-500'
              }" data-profile-id="${profile.id}">
                <div class="w-3.5 h-3.5 rounded-full mb-3" style="background-color: ${profile.color};"></div>
                <div class="font-serif text-lg font-bold leading-tight mb-1.5">${profile[this.lang].name}</div>
                <div class="text-xs ${isActive ? 'text-cream-300' : 'text-earth-muted'} line-clamp-2">${profile[this.lang].desc}</div>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Matched Showcase Row -->
        <div class="glass-card rounded-3xl p-6 md:p-8">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-cream-400">
            <div>
              <div class="text-xs uppercase tracking-widest text-earth-muted font-semibold">Tasting Profile Analysis</div>
              <div class="font-display text-2xl text-burgundy-950 font-bold mt-1">${currentProfile[this.lang].name}</div>
              <p class="text-sm text-earth/80 mt-1">${currentProfile[this.lang].desc}</p>
            </div>
            <a href="#pantry" class="btn-primary text-xs self-start md:self-auto" id="filter-pantry-by-profile-btn">
              ${this.t('tasting.viewMatched')} (${matchedProducts.length})
            </a>
          </div>

          <!-- Matched Product Previews -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${matchedProducts.map(p => `
              <div class="flex gap-4 items-center p-3 rounded-2xl bg-cream-50 border border-cream-300 hover:border-citrus-500 transition-all cursor-pointer quick-view-trigger" data-product-id="${p.id}">
                <img src="${p.image}" alt="${p[this.lang].name}" class="w-20 h-20 rounded-xl object-cover" />
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-semibold text-citrus-500 uppercase tracking-wider">${p.badge}</div>
                  <h4 class="font-serif font-bold text-sm text-burgundy-950 truncate mt-0.5">${p[this.lang].name}</h4>
                  <div class="text-xs text-earth-muted mt-0.5">€${p.price.toFixed(2)} • ${p.weight}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    // Bind Flavor Tab buttons
    wheelEl.querySelectorAll('.flavor-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        this.activeFlavorProfile = target.getAttribute('data-profile-id');
        this.renderFlavorWheel();
      });
    });

    // Quick view triggers inside tasting section
    wheelEl.querySelectorAll('.quick-view-trigger').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-product-id');
        this.openQuickView(id);
      });
    });

    const filterBtn = document.getElementById('filter-pantry-by-profile-btn');
    if (filterBtn) {
      filterBtn.addEventListener('click', () => {
        // Scroll to pantry smoothly
        document.getElementById('pantry').scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  renderProductCatalog() {
    const catalogEl = document.getElementById('pantry-section');
    if (!catalogEl) return;

    // Filter Products
    let filtered = PRODUCTS.filter(p => {
      const matchesCategory = this.activeCategory === 'all' || p.category === this.activeCategory;
      const q = this.searchQuery.toLowerCase();
      const matchesSearch = !q || 
        p[this.lang].name.toLowerCase().includes(q) ||
        p[this.lang].description.toLowerCase().includes(q) ||
        p[this.lang].tastingNotes.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    // Sort Products
    if (this.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'acidity') {
      filtered.sort((a, b) => b.sensory.acidity - a.sensory.acidity);
    }

    catalogEl.innerHTML = `
      <div class="container-farm py-16 md:py-24" id="pantry">
        
        <!-- Header & Category Nav -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div class="badge-tag badge-burgundy mb-3">${this.t('pantry.tag')}</div>
            <h2 class="font-display text-3xl md:text-5xl text-burgundy-950 font-normal">
              ${this.t('pantry.title')}
            </h2>
            <p class="text-earth/80 text-base mt-2 max-w-xl">
              ${this.t('pantry.desc')}
            </p>
          </div>

          <!-- Live Search & Sort Controls -->
          <div class="flex flex-wrap items-center gap-3">
            <div class="relative">
              <input type="text" id="catalog-search" value="${this.searchQuery}" placeholder="${this.t('pantry.searchPlaceholder')}" class="w-64 px-4 py-2 pl-9 rounded-full bg-cream-100 border border-cream-400 text-xs text-earth placeholder-earth-muted focus:outline-none focus:border-citrus-500" />
              <svg class="w-4 h-4 text-earth-muted absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>

            <select id="catalog-sort" class="px-4 py-2 rounded-full bg-cream-100 border border-cream-400 text-xs font-semibold text-earth focus:outline-none focus:border-citrus-500">
              <option value="featured" ${this.sortBy === 'featured' ? 'selected' : ''}>${this.t('pantry.sortFeatured')}</option>
              <option value="price-asc" ${this.sortBy === 'price-asc' ? 'selected' : ''}>${this.t('pantry.sortPriceAsc')}</option>
              <option value="price-desc" ${this.sortBy === 'price-desc' ? 'selected' : ''}>${this.t('pantry.sortPriceDesc')}</option>
              <option value="acidity" ${this.sortBy === 'acidity' ? 'selected' : ''}>${this.t('pantry.sortAcidity')}</option>
            </select>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          ${CATEGORIES.map(cat => {
            const isActive = cat.id === this.activeCategory;
            return `
              <button class="category-pill-btn whitespace-nowrap px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                isActive 
                  ? 'bg-burgundy-800 text-white shadow-md' 
                  : 'bg-cream-100 text-earth border border-cream-400 hover:border-citrus-500'
              }" data-cat-id="${cat.id}">
                ${cat[this.lang]}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Products Grid -->
        ${filtered.length === 0 ? `
          <div class="text-center py-20 bg-cream-100 rounded-3xl border border-cream-400">
            <div class="font-serif text-2xl text-burgundy-950">${this.t('pantry.noResults')}</div>
            <button id="reset-filters-btn" class="btn-secondary mt-4">${this.t('pantry.allTastingProfiles')}</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            ${filtered.map(product => {
              return `
                <div class="product-card group" data-product-id="${product.id}">
                  <!-- Image Wrapper -->
                  <div class="product-image-wrap">
                    <img src="${product.image}" alt="${product.imageAlt}" loading="lazy" />
                    
                    <!-- Top Badge -->
                    <div class="absolute top-3 left-3 z-10">
                      <span class="badge-tag badge-${product.badgeType}">
                        ${product.badge}
                      </span>
                    </div>

                    <!-- Organic Seal -->
                    ${product.isOrganic ? `
                      <div class="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-olive-700/90 text-white flex items-center justify-center text-[0.6rem] font-bold shadow-sm" title="Certified Organic BIO">
                        BIO
                      </div>
                    ` : ''}

                    <!-- Hover Actions -->
                    <div class="product-actions-overlay">
                      <button class="btn-card-quickview flex-1 py-2 px-3 rounded-full bg-cream-100/95 backdrop-blur-md text-burgundy-950 hover:bg-white text-xs font-semibold tracking-wide uppercase transition-all shadow-sm" data-product-id="${product.id}">
                        ${this.t('pantry.quickView')}
                      </button>
                      <button class="btn-card-add flex-1 py-2 px-3 rounded-full bg-citrus-500 hover:bg-citrus-600 text-white text-xs font-semibold tracking-wide uppercase transition-all shadow-md" data-product-id="${product.id}">
                        ${this.t('pantry.addToBag')}
                      </button>
                    </div>
                  </div>

                  <!-- Product Info Body -->
                  <div class="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div class="text-[0.675rem] font-semibold text-earth-muted uppercase tracking-widest mb-1">
                        ${product.sku} • ${product.weight}
                      </div>
                      <h3 class="font-serif font-bold text-lg text-burgundy-950 group-hover:text-citrus-500 transition-colors leading-snug">
                        ${product[this.lang].name}
                      </h3>
                      <p class="text-xs text-earth/75 mt-1.5 line-clamp-2 leading-relaxed">
                        ${product[this.lang].shortDesc}
                      </p>
                    </div>

                    <div class="pt-4 mt-4 border-t border-cream-300 flex items-center justify-between">
                      <div>
                        <span class="text-xs text-earth-muted">€</span>
                        <span class="font-display font-bold text-xl text-burgundy-900">${product.price.toFixed(2)}</span>
                      </div>
                      <div class="flex items-center gap-1 text-xs text-gold font-bold">
                        ★ <span>${product.rating}</span>
                        <span class="text-[0.675rem] font-normal text-earth-muted">(${product.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                </div>
              `;
            }).join('')}
          </div>
        `}

      </div>
    `;

    // Bind Category Pills
    catalogEl.querySelectorAll('.category-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeCategory = e.currentTarget.getAttribute('data-cat-id');
        this.renderProductCatalog();
      });
    });

    // Bind Search Input
    const searchInput = document.getElementById('catalog-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderProductCatalog();
      });
    }

    // Bind Sort
    const sortSelect = document.getElementById('catalog-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.renderProductCatalog();
      });
    }

    // Bind Reset
    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.activeCategory = 'all';
        this.searchQuery = '';
        this.renderProductCatalog();
      });
    }

    // Bind Card Quick View
    catalogEl.querySelectorAll('.btn-card-quickview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-product-id');
        this.openQuickView(id);
      });
    });

    // Bind Card Add To Bag
    catalogEl.querySelectorAll('.btn-card-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-product-id');
        this.addToCart(id, 1);
      });
    });

    // Whole card click opens quick view
    catalogEl.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-product-id');
        this.openQuickView(id);
      });
    });
  }

  renderFarmStory() {
    const storyEl = document.getElementById('story-section');
    if (!storyEl) return;

    storyEl.innerHTML = `
      <div class="container-farm py-16 md:py-24 border-t border-cream-400" id="story">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-6 space-y-6">
            <div class="badge-tag badge-burgundy">${this.t('story.tag')}</div>
            <h2 class="font-display text-3xl md:text-5xl text-burgundy-950 font-normal">
              ${this.t('story.title')}
            </h2>
            <p class="font-serif text-lg text-burgundy-900/90 leading-relaxed italic">
              "${this.t('story.lead')}"
            </p>
            <p class="text-earth/80 text-base leading-relaxed">
              ${this.t('story.p1')}
            </p>
            <p class="text-earth/80 text-base leading-relaxed">
              ${this.t('story.p2')}
            </p>
          </div>

          <div class="lg:col-span-6">
            <!-- Timeline Milestones -->
            <div class="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-cream-400">
              
              <div class="relative pl-10">
                <div class="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-citrus-500 ring-4 ring-cream-200"></div>
                <div class="font-display font-bold text-xl text-burgundy-900">${this.t('story.timeline1Year')} — ${this.t('story.timeline1Title')}</div>
                <p class="text-sm text-earth/75 mt-1">${this.t('story.timeline1Desc')}</p>
              </div>

              <div class="relative pl-10">
                <div class="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-burgundy-700 ring-4 ring-cream-200"></div>
                <div class="font-display font-bold text-xl text-burgundy-900">${this.t('story.timeline2Year')} — ${this.t('story.timeline2Title')}</div>
                <p class="text-sm text-earth/75 mt-1">${this.t('story.timeline2Desc')}</p>
              </div>

              <div class="relative pl-10">
                <div class="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-olive-700 ring-4 ring-cream-200"></div>
                <div class="font-display font-bold text-xl text-burgundy-900">${this.t('story.timeline3Year')} — ${this.t('story.timeline3Title')}</div>
                <p class="text-sm text-earth/75 mt-1">${this.t('story.timeline3Desc')}</p>
              </div>

              <div class="relative pl-10">
                <div class="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-citrus-600 ring-4 ring-cream-200"></div>
                <div class="font-display font-bold text-xl text-burgundy-900">${this.t('story.timeline4Year')} — ${this.t('story.timeline4Title')}</div>
                <p class="text-sm text-earth/75 mt-1">${this.t('story.timeline4Desc')}</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    `;
  }

  renderTerroir() {
    const terroirEl = document.getElementById('terroir-section');
    if (!terroirEl) return;

    terroirEl.innerHTML = `
      <div class="bg-burgundy-950 text-cream-100 py-20 my-10 relative overflow-hidden" id="terroir">
        <div class="container-farm relative z-10">
          <div class="max-w-2xl mb-12">
            <div class="badge-tag badge-citrus mb-3">${this.t('terroir.tag')}</div>
            <h2 class="font-display text-3xl md:text-5xl text-cream-50 font-normal">
              ${this.t('terroir.title')}
            </h2>
            <p class="text-cream-300 text-base mt-3">
              ${this.t('terroir.desc')}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-8 rounded-3xl bg-burgundy-900/60 border border-burgundy-700/60">
              <div class="w-12 h-12 rounded-2xl bg-citrus-500/20 text-citrus-400 flex items-center justify-center font-display text-2xl font-bold mb-5">
                01
              </div>
              <h3 class="font-serif text-xl font-bold text-cream-100 mb-2">${this.t('terroir.card1Title')}</h3>
              <p class="text-sm text-cream-300/80 leading-relaxed">${this.t('terroir.card1Desc')}</p>
            </div>

            <div class="p-8 rounded-3xl bg-burgundy-900/60 border border-burgundy-700/60">
              <div class="w-12 h-12 rounded-2xl bg-olive-600/30 text-olive-100 flex items-center justify-center font-display text-2xl font-bold mb-5">
                02
              </div>
              <h3 class="font-serif text-xl font-bold text-cream-100 mb-2">${this.t('terroir.card2Title')}</h3>
              <p class="text-sm text-cream-300/80 leading-relaxed">${this.t('terroir.card2Desc')}</p>
            </div>

            <div class="p-8 rounded-3xl bg-burgundy-900/60 border border-burgundy-700/60">
              <div class="w-12 h-12 rounded-2xl bg-terracotta/30 text-citrus-300 flex items-center justify-center font-display text-2xl font-bold mb-5">
                03
              </div>
              <h3 class="font-serif text-xl font-bold text-cream-100 mb-2">${this.t('terroir.card3Title')}</h3>
              <p class="text-sm text-cream-300/80 leading-relaxed">${this.t('terroir.card3Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderHarvestCalendar() {
    const calendarEl = document.getElementById('harvest-section');
    if (!calendarEl) return;

    calendarEl.innerHTML = `
      <div class="container-farm py-16 md:py-24" id="harvest">
        <div class="max-w-2xl mb-12">
          <div class="badge-tag badge-olive mb-3">${this.t('harvest.tag')}</div>
          <h2 class="font-display text-3xl md:text-5xl text-burgundy-950 font-normal">
            ${this.t('harvest.title')}
          </h2>
          <p class="text-earth/80 text-base mt-2">
            ${this.t('harvest.desc')}
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          ${HARVEST_CALENDAR.map(item => `
            <div class="p-4 rounded-2xl border transition-all ${
              item.active 
                ? 'bg-cream-50 border-citrus-500 shadow-sm ring-1 ring-citrus-500/30' 
                : 'bg-cream-100/50 border-cream-400 opacity-60'
            }">
              <div class="flex items-center justify-between mb-2">
                <span class="font-display text-xl font-bold ${item.active ? 'text-citrus-600' : 'text-earth-muted'}">${item.month}</span>
                ${item.active ? `<span class="w-2 h-2 rounded-full bg-citrus-500 animate-ping"></span>` : ''}
              </div>
              <div class="text-xs font-semibold text-earth leading-snug">
                ${this.lang === 'it' ? item.fruitIt : item.fruitEn}
              </div>
              ${item.active ? `
                <div class="text-[0.65rem] font-bold text-citrus-600 mt-2 uppercase tracking-wider">
                  ${this.t('harvest.currentSeasonBadge')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderNewsletter() {
    const newsEl = document.getElementById('newsletter-section');
    if (!newsEl) return;

    newsEl.innerHTML = `
      <div class="container-farm py-16">
        <div class="rounded-3xl bg-gradient-to-br from-cream-100 via-cream-300 to-citrus-100 border border-cream-400 p-8 md:p-14 text-center max-w-4xl mx-auto shadow-sm">
          <div class="badge-tag badge-burgundy mb-4">${this.t('newsletter.tag')}</div>
          <h2 class="font-display text-3xl md:text-4xl text-burgundy-950 font-normal">
            ${this.t('newsletter.title')}
          </h2>
          <p class="text-earth/80 text-sm md:text-base max-w-xl mx-auto mt-3">
            ${this.t('newsletter.desc')}
          </p>

          <form id="newsletter-form" class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mt-8">
            <input type="email" id="newsletter-email" required placeholder="${this.t('newsletter.inputPlaceholder')}" class="w-full px-5 py-3 rounded-full bg-white border border-cream-400 text-xs text-earth placeholder-earth-muted focus:outline-none focus:border-citrus-500" />
            <button type="submit" class="btn-primary w-full sm:w-auto whitespace-nowrap">
              ${this.t('newsletter.button')}
            </button>
          </form>
          <div class="text-[0.675rem] text-earth-muted mt-3">${this.t('newsletter.privacy')}</div>
        </div>
      </div>
    `;

    const form = document.getElementById('newsletter-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        if (email) {
          this.showToast(this.t('newsletter.successMsg'));
          this.applyCoupon('SICILIA10');
          form.reset();
        }
      });
    }
  }

  renderFooter() {
    const footerEl = document.getElementById('main-footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
      <footer class="bg-burgundy-950 text-cream-200 pt-16 pb-12 border-t border-burgundy-800">
        <div class="container-farm">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-burgundy-800/80">
            
            <div class="md:col-span-5 space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-citrus-500 flex items-center justify-center text-white font-serif font-bold text-lg">E</div>
                <div class="font-display text-2xl font-bold tracking-wider text-cream-50">ELVAN FOODS</div>
              </div>
              <p class="text-sm text-cream-300/80 max-w-sm leading-relaxed">
                ${this.t('footer.motto')}
              </p>
              <div class="text-xs text-citrus-400 font-semibold">
                ${this.t('footer.certifications')}
              </div>
            </div>

            <div class="md:col-span-4 space-y-2">
              <div class="font-serif font-bold text-base text-cream-100">${this.t('footer.addressTitle')}</div>
              <p class="text-xs text-cream-300/80 whitespace-pre-line leading-relaxed">
                ${this.t('footer.address')}
              </p>
              <p class="text-xs text-cream-400 italic pt-2">
                ${this.t('footer.hours')}
              </p>
            </div>

            <div class="md:col-span-3 space-y-2">
              <div class="font-serif font-bold text-base text-cream-100">Certifications</div>
              <div class="flex flex-wrap gap-2 pt-1">
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">ICEA BIO</span>
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">IGP SICILIA</span>
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">VEGAN OK</span>
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">ZERO WASTE</span>
              </div>
            </div>

          </div>

          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400 gap-4">
            <div>© ${new Date().getFullYear()} Elvan Foods Soc. Agr. a r.l. • ${this.t('footer.rights')}</div>
            <div class="flex items-center gap-6">
              <a href="#" class="hover:text-cream-100 transition-colors">${this.t('footer.privacyPolicy')}</a>
              <a href="#" class="hover:text-cream-100 transition-colors">${this.t('footer.terms')}</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // CART DRAWER UI
  renderCartUI() {
    const cartCountEl = document.getElementById('cart-badge-count');
    if (cartCountEl) {
      const count = this.cart.reduce((total, item) => total + item.quantity, 0);
      cartCountEl.textContent = count;
    }

    const cartDrawerEl = document.getElementById('cart-drawer-content');
    if (!cartDrawerEl) return;

    const totals = this.getCartTotals();

    if (this.cart.length === 0) {
      cartDrawerEl.innerHTML = `
        <div class="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div class="w-16 h-16 rounded-full bg-cream-300 flex items-center justify-center text-earth-muted mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </div>
          <h3 class="font-serif font-bold text-xl text-burgundy-950">${this.t('cart.emptyMsg')}</h3>
          <button class="btn-primary mt-6 text-xs" onclick="window.app.closeCart()">${this.t('cart.emptyCta')}</button>
        </div>
      `;
      return;
    }

    cartDrawerEl.innerHTML = `
      <!-- Free Shipping Tracker -->
      <div class="p-4 bg-cream-200 border-b border-cream-400">
        <div class="text-xs font-semibold text-earth mb-1.5 flex justify-between">
          <span>${totals.isFreeShipping ? this.t('cart.freeShippingUnlocked') : this.t('cart.freeShippingNotice').replace('{amount}', '€' + totals.remainingForFree.toFixed(2))}</span>
        </div>
        <div class="w-full bg-cream-400 h-2 rounded-full overflow-hidden">
          <div class="h-full bg-citrus-500 rounded-full transition-all duration-500" style="width: ${Math.min(100, (totals.subtotal / this.t('cart.freeShippingThreshold')) * 100)}%;"></div>
        </div>
      </div>

      <!-- Items List -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        ${this.cart.map((item, idx) => `
          <div class="flex gap-4 p-3 rounded-2xl bg-white border border-cream-300 relative group">
            <img src="${item.product.image}" alt="${item.product[this.lang].name}" class="w-18 h-18 w-20 h-20 rounded-xl object-cover" />
            
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <h4 class="font-serif font-bold text-sm text-burgundy-950 leading-tight">${item.product[this.lang].name}</h4>
                <div class="text-[0.675rem] text-earth-muted mt-0.5">${item.product.weight} • €${item.product.price.toFixed(2)}</div>
              </div>

              <div class="flex items-center justify-between mt-2">
                <!-- Quantity adjust -->
                <div class="flex items-center rounded-full border border-cream-400 bg-cream-100 text-xs">
                  <button class="px-2.5 py-0.5 text-earth hover:text-citrus-500 font-bold" onclick="window.app.updateCartQty(${idx}, -1)">−</button>
                  <span class="px-2 font-semibold">${item.quantity}</span>
                  <button class="px-2.5 py-0.5 text-earth hover:text-citrus-500 font-bold" onclick="window.app.updateCartQty(${idx}, 1)">+</button>
                </div>

                <div class="font-display font-bold text-sm text-burgundy-900">
                  €${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>

            <!-- Remove Button -->
            <button class="absolute top-2 right-2 text-earth-muted hover:text-citrus-600 p-1" onclick="window.app.removeFromCart(${idx})" title="Remove">
              ✕
            </button>
          </div>
        `).join('')}
      </div>

      <!-- Voucher Input & Totals Footer -->
      <div class="p-5 border-t border-cream-400 bg-cream-50 space-y-4">
        
        <!-- Voucher Field -->
        <div class="flex gap-2">
          <input type="text" id="cart-voucher-input" placeholder="${this.t('cart.couponPlaceholder')}" class="flex-1 px-3 py-1.5 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500 uppercase font-mono" />
          <button class="px-4 py-1.5 rounded-xl bg-burgundy-800 text-white text-xs font-semibold uppercase hover:bg-burgundy-900 transition-colors" onclick="window.app.applyCoupon(document.getElementById('cart-voucher-input').value)">
            ${this.t('cart.couponApply')}
          </button>
        </div>

        ${this.appliedCoupon ? `
          <div class="text-xs text-olive-700 font-semibold flex items-center justify-between bg-olive-100 p-2 rounded-lg">
            <span>${this.t('cart.couponApplied').replace('{amount}', totals.discount.toFixed(2))}</span>
            <button class="text-earth-muted hover:text-citrus-600 ml-2" onclick="window.app.appliedCoupon=null; window.app.renderCartUI();">✕</button>
          </div>
        ` : ''}

        <!-- Price breakdown -->
        <div class="space-y-1.5 text-xs text-earth pt-2 border-t border-cream-300">
          <div class="flex justify-between">
            <span class="text-earth-muted">${this.t('cart.subtotal')}</span>
            <span class="font-semibold">€${totals.subtotal.toFixed(2)}</span>
          </div>
          ${totals.discount > 0 ? `
            <div class="flex justify-between text-citrus-600 font-semibold">
              <span>Discount</span>
              <span>−€${totals.discount.toFixed(2)}</span>
            </div>
          ` : ''}
          <div class="flex justify-between">
            <span class="text-earth-muted">${this.t('cart.shipping')}</span>
            <span class="font-semibold">${totals.isFreeShipping ? this.t('cart.shippingFree') : '€' + totals.shipping.toFixed(2)}</span>
          </div>
          <div class="flex justify-between font-display text-lg font-bold text-burgundy-950 pt-2 border-t border-cream-300">
            <span>Total</span>
            <span>€${totals.total.toFixed(2)}</span>
          </div>
        </div>

        <div class="text-[0.675rem] text-earth-muted leading-tight">${this.t('cart.packagingNote')}</div>

        <button class="btn-primary w-full py-3 text-xs" onclick="window.app.openCheckoutModal()">
          ${this.t('cart.checkoutBtn')}
        </button>
      </div>
    `;
  }

  // QUICK VIEW MODAL
  renderQuickViewModal() {
    const product = this.activeModalProduct;
    if (!product) return;

    const modalBody = document.getElementById('modal-product-body');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-10">
        <!-- Image & Gallery -->
        <div class="md:col-span-5">
          <div class="rounded-2xl overflow-hidden border border-cream-400 bg-cream-200 aspect-square">
            <img src="${product.image}" alt="${product[this.lang].name}" class="w-full h-full object-cover" />
          </div>
          <div class="badge-tag badge-${product.badgeType} mt-3">
            ${product.badge}
          </div>
          <div class="text-[0.675rem] font-semibold text-earth-muted mt-2">
            ${this.t('quickViewModal.origin')}
          </div>
        </div>

        <!-- Details -->
        <div class="md:col-span-7 space-y-5">
          <div>
            <div class="text-xs uppercase font-semibold text-citrus-500 tracking-wider">${product.sku} • Harvest: ${product.harvestPeriod}</div>
            <h2 class="font-serif font-bold text-2xl md:text-3xl text-burgundy-950 mt-1">${product[this.lang].name}</h2>
            <div class="font-display text-2xl font-bold text-burgundy-900 mt-2">€${product.price.toFixed(2)}</div>
          </div>

          <p class="text-sm text-earth/80 leading-relaxed">
            ${product[this.lang].description}
          </p>

          <!-- Sensory Profile Bars -->
          <div class="space-y-2 p-4 rounded-xl bg-cream-200 border border-cream-300">
            <div class="text-xs font-bold text-burgundy-950 uppercase tracking-wider mb-2">Sensory Analysis</div>
            
            <div>
              <div class="flex justify-between text-[0.675rem] font-semibold text-earth mb-0.5">
                <span>Acidity</span>
                <span>${product.sensory.acidity}%</span>
              </div>
              <div class="sensory-meter-bg"><div class="sensory-meter-fill" style="width: ${product.sensory.acidity}%;"></div></div>
            </div>

            <div>
              <div class="flex justify-between text-[0.675rem] font-semibold text-earth mb-0.5">
                <span>Sweetness</span>
                <span>${product.sensory.sweetness}%</span>
              </div>
              <div class="sensory-meter-bg"><div class="sensory-meter-fill" style="width: ${product.sensory.sweetness}%;"></div></div>
            </div>

            <div>
              <div class="flex justify-between text-[0.675rem] font-semibold text-earth mb-0.5">
                <span>Aroma Intensity</span>
                <span>${product.sensory.aroma}%</span>
              </div>
              <div class="sensory-meter-bg"><div class="sensory-meter-fill" style="width: ${product.sensory.aroma}%;"></div></div>
            </div>
          </div>

          <!-- Ingredients & Pairings Tabs -->
          <div class="text-xs space-y-2 pt-2 border-t border-cream-300">
            <div>
              <span class="font-bold text-burgundy-950">${this.t('quickViewModal.ingredientsTitle')}:</span>
              <p class="text-earth/80 mt-0.5">${product[this.lang].ingredients}</p>
            </div>
            <div>
              <span class="font-bold text-burgundy-950">${this.t('quickViewModal.pairingsTitle')}:</span>
              <div class="flex flex-wrap gap-1.5 mt-1">
                ${product[this.lang].pairings.map(pair => `
                  <span class="px-2 py-0.5 rounded-full bg-cream-300 text-[0.65rem] text-earth font-medium">${pair}</span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Add to Bag Action -->
          <div class="flex items-center gap-4 pt-4 border-t border-cream-300">
            <div class="flex items-center rounded-full border border-cream-400 bg-white">
              <button class="px-3 py-2 text-earth hover:text-citrus-500 font-bold" id="modal-qty-minus">−</button>
              <span class="px-3 font-semibold text-sm" id="modal-qty-val">1</span>
              <button class="px-3 py-2 text-earth hover:text-citrus-500 font-bold" id="modal-qty-plus">+</button>
            </div>

            <button class="btn-primary flex-1 py-3 text-xs" id="modal-add-to-bag-btn">
              ${this.t('quickViewModal.addToCart')}
            </button>
          </div>

        </div>
      </div>
    `;

    // Modal Qty Logic
    let currentQty = 1;
    const qtyVal = document.getElementById('modal-qty-val');
    document.getElementById('modal-qty-minus').addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        qtyVal.textContent = currentQty;
      }
    });
    document.getElementById('modal-qty-plus').addEventListener('click', () => {
      currentQty++;
      qtyVal.textContent = currentQty;
    });

    document.getElementById('modal-add-to-bag-btn').addEventListener('click', () => {
      this.addToCart(product.id, currentQty);
      this.closeQuickView();
    });
  }

  // CHECKOUT MODAL SIMULATOR
  openCheckoutModal() {
    this.closeCart();
    const totals = this.getCartTotals();
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    modal.classList.add('active');
    const container = document.getElementById('checkout-modal-content');
    container.innerHTML = `
      <div class="p-6 md:p-10 max-w-lg mx-auto space-y-6">
        <div class="text-center">
          <div class="badge-tag badge-burgundy mb-2">Simulated Secure Checkout</div>
          <h2 class="font-serif font-bold text-2xl text-burgundy-950">${this.t('checkoutModal.title')}</h2>
        </div>

        <form id="checkout-form" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-earth mb-1">${this.t('checkoutModal.name')}</label>
            <input type="text" required value="Elena Conti" class="w-full px-4 py-2.5 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-earth mb-1">${this.t('checkoutModal.email')}</label>
            <input type="email" required value="elena.conti@gastronomia.it" class="w-full px-4 py-2.5 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-earth mb-1">${this.t('checkoutModal.address')}</label>
            <input type="text" required value="Via della Spiga, 14" class="w-full px-4 py-2.5 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-earth mb-1">${this.t('checkoutModal.city')}</label>
              <input type="text" required value="Milano (20121)" class="w-full px-4 py-2.5 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-earth mb-1">${this.t('checkoutModal.country')}</label>
              <select class="w-full px-4 py-2.5 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500">
                <option selected>Italy (Italia)</option>
                <option>Germany (Deutschland)</option>
                <option>France (France)</option>
                <option>United Kingdom</option>
                <option>United States</option>
              </select>
            </div>
          </div>

          <!-- Total display -->
          <div class="p-4 rounded-xl bg-cream-200 border border-cream-400 flex items-center justify-between">
            <span class="font-bold text-xs uppercase tracking-wider text-earth">${this.t('checkoutModal.totalToPay')}:</span>
            <span class="font-display text-2xl font-bold text-burgundy-900">€${totals.total.toFixed(2)}</span>
          </div>

          <button type="submit" class="btn-primary w-full py-3 text-xs">
            ${this.t('checkoutModal.placeOrder')}
          </button>
        </form>
      </div>
    `;

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.triggerOrderCelebration();
    });
  }

  triggerOrderCelebration() {
    const container = document.getElementById('checkout-modal-content');
    const orderNum = 'ELV-' + Math.floor(100000 + Math.random() * 900000);

    // Launch Confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E84E1B', '#762530', '#2D4A3E', '#FBF7EE']
      });
    }

    container.innerHTML = `
      <div class="p-8 md:p-12 text-center max-w-md mx-auto space-y-4">
        <div class="w-16 h-16 rounded-full bg-citrus-100 text-citrus-600 flex items-center justify-center mx-auto text-2xl">
          ✓
        </div>
        <h2 class="font-serif font-bold text-3xl text-burgundy-950">${this.t('checkoutModal.successTitle')}</h2>
        <p class="text-sm text-earth/80 leading-relaxed">${this.t('checkoutModal.successDesc')}</p>
        
        <div class="p-3 bg-cream-200 rounded-xl text-xs font-mono text-earth-muted">
          ${this.t('checkoutModal.orderNumber')}: <strong class="text-burgundy-900">${orderNum}</strong>
        </div>

        <button class="btn-primary mt-4 text-xs" onclick="window.app.finishOrder()">
          ${this.t('checkoutModal.backToHome')}
        </button>
      </div>
    `;

    // Clear cart
    this.cart = [];
    this.appliedCoupon = null;
    this.saveCart();
  }

  finishOrder() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.remove('active');
  }

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.remove('active');
  }

  setupGlobalListeners() {
    // Backdrop click
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        this.closeCart();
      });
    }

    // Modal close button
    const modalClose = document.getElementById('modal-close-btn');
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        this.closeQuickView();
      });
    }

    const checkoutModalClose = document.getElementById('checkout-modal-close-btn');
    if (checkoutModalClose) {
      checkoutModalClose.addEventListener('click', () => {
        this.closeCheckoutModal();
      });
    }

    // ESC key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCart();
        this.closeQuickView();
        this.closeCheckoutModal();
      }
    });
  }
}

// Expose app instance globally
window.app = new ElvanFoodsApp();
