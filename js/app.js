/**
 * ELVAN FOODS - APPLICATION LOGIC
 * Master controller for 7 Brands, 47 Products, 33 SKUs, B2B Quotes & Retail Cart
 */

import { PRODUCTS, CATEGORIES, FLAVOR_PROFILES, SKU_VARIANTS } from './products.js';
import { BRANDS } from './brandLogos.js';
import { TRANSLATIONS } from './translations.js';
import { AgrumeaJarSlider, updateJarSliderLabels } from './jars3d.js';
import { soundscape } from './soundscape.js';

class ElvanFoodsApp {
  constructor() {
    this.lang = localStorage.getItem('elvan_lang') || 'en';
    this.cart = JSON.parse(localStorage.getItem('elvan_cart') || '[]');
    this.activeBrand = 'all';
    this.activeCategory = 'all';
    this.activeFlavorProfile = 'tangy-sweet';
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.activeModalProduct = null;
    this.selectedModalSkuKey = null;
    this.appliedCoupon = null;

    this.init();
  }

  init() {
    this.renderAll();
    this.setupGlobalListeners();
  }

  t(path) {
    const keys = path.split('.');
    let cur = TRANSLATIONS[this.lang];
    for (const k of keys) {
      if (!cur || cur[k] === undefined) return path;
      cur = cur[k];
    }
    return cur;
  }

  setLanguage(newLang) {
    if (newLang !== 'en' && newLang !== 'hi') return;
    this.lang = newLang;
    localStorage.setItem('elvan_lang', newLang);
    document.documentElement.lang = newLang;
    this.renderHeader();
    this.renderBrandsShowcase();
    this.renderFlavorWheel();
    this.renderProductCatalog();
    this.renderPackagingMatrix();
    this.renderNewsletter();
    this.renderFooter();
    this.renderCartUI();
    updateJarSliderLabels();
    this.showToast(this.lang === 'en' ? 'Switched to English' : 'भाषा हिंदी में बदली गई');
  }

  saveCart() {
    localStorage.setItem('elvan_cart', JSON.stringify(this.cart));
    this.renderCartUI();
  }

  addToCart(productId, skuKey = null, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const chosenSkuKey = skuKey || product.baseSku;
    const skuObj = SKU_VARIANTS[chosenSkuKey] || SKU_VARIANTS[product.baseSku];
    const unitPrice = Math.round(product.basePrice * skuObj.multiplier);

    const existingIdx = this.cart.findIndex(i => i.product.id === productId && i.skuKey === chosenSkuKey);
    if (existingIdx > -1) {
      this.cart[existingIdx].quantity += qty;
    } else {
      this.cart.push({
        product,
        skuKey: chosenSkuKey,
        skuObj,
        unitPrice,
        quantity: qty
      });
    }

    this.saveCart();
    this.openCart();
    this.showToast(`✦ ${product.name} (${skuObj.label}) ${this.t('pantry.addedToBag')}`);
  }

  updateCartQty(idx, delta) {
    if (this.cart[idx]) {
      this.cart[idx].quantity += delta;
      if (this.cart[idx].quantity <= 0) {
        this.cart.splice(idx, 1);
      }
      this.saveCart();
    }
  }

  removeFromCart(idx) {
    if (this.cart[idx]) {
      this.cart.splice(idx, 1);
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

  openQuickView(productId, preselectedSkuKey = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    this.activeModalProduct = product;
    this.selectedModalSkuKey = preselectedSkuKey || product.baseSku;
    this.renderQuickViewModal();

    const modal = document.getElementById('product-modal');
    if (modal) modal.classList.add('active');
  }

  closeQuickView() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.classList.remove('active');
    this.activeModalProduct = null;
  }

  showToast(msg) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>${msg}</span>`;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  applyCoupon(code) {
    const c = (code || '').trim().toUpperCase();
    if (c === 'ELVAN10' || c === 'CRIMSON10' || c === 'B2BFRESH') {
      this.appliedCoupon = { code: c, discountPercent: 0.10 };
      this.showToast('🎉 10% Trade Voucher Applied!');
      this.renderCartUI();
      return true;
    } else {
      this.showToast(this.t('cart.couponInvalid'));
      return false;
    }
  }

  getCartTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const threshold = this.t('cart.freeShippingThreshold');
    const isFreeShipping = subtotal >= threshold || subtotal === 0;
    const shipping = isFreeShipping ? 0 : 150;

    let discount = 0;
    if (this.appliedCoupon && this.appliedCoupon.discountPercent) {
      discount = Math.round(subtotal * this.appliedCoupon.discountPercent);
    }

    const total = Math.max(0, subtotal - discount + (subtotal > 0 ? shipping : 0));
    return {
      subtotal,
      shipping,
      isFreeShipping,
      discount,
      total,
      remainingForFree: Math.max(0, threshold - subtotal)
    };
  }

  renderAll() {
    this.renderHeader();
    this.renderHero();
    this.renderBrandsShowcase();
    this.renderFlavorWheel();
    this.renderProductCatalog();
    this.renderPackagingMatrix();
    this.renderNewsletter();
    this.renderFooter();
    this.renderCartUI();
  }

  renderHeader() {
    const el = document.getElementById('main-header');
    if (!el) return;

    const count = this.cart.reduce((sum, i) => sum + i.quantity, 0);

    el.className = "site-header";
    el.innerHTML = `
      <div class="site-header__bar">
        <!-- Language Switcher (Left) -->
        <div class="site-header__side site-header__side--start">
          <nav class="site-lang-switcher" aria-label="Language switcher">
            <button class="site-lang-switcher__item ${this.lang === 'en' ? 'is-active' : ''}" data-lang="en">EN</button>
            <span style="opacity: 0.35;">/</span>
            <button class="site-lang-switcher__item ${this.lang === 'hi' ? 'is-active' : ''}" data-lang="hi">HI</button>
          </nav>
        </div>

        <!-- Brand Wordmark (Center) -->
        <div class="site-header__center">
          <a href="#hero-section" class="site-header__brand" aria-label="Elvan Foods">
            <span class="site-header__brand-title">ELVAN FOODS</span>
            <span class="site-header__brand-sub">Artisanal Pantry • Est. 1994</span>
          </a>
        </div>

        <!-- Right Actions: Sound & Pantry Cart -->
        <div class="site-header__side site-header__side--end">
          <div class="site-header__actions">
            <!-- Soundscape Ambient Audio -->
            <button id="soundscape-toggle" class="site-audio-btn" title="Toggle Nature Audio" aria-label="Ambient sound">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"/>
              </svg>
            </button>

            <!-- Pantry Cart Trigger Pill -->
            <a href="#pantry-section" id="cart-drawer-trigger" class="site-pantry-btn" aria-label="View Pantry">
              <span>PANTRY</span>
              <span id="cart-badge-count" class="site-pantry-badge">${count}</span>
            </a>
          </div>
        </div>
      </div>
    `;

    // Events
    const soundBtn = document.getElementById('soundscape-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const active = soundscape.toggle();
        this.showToast(active ? '🌿 Soundscape Active' : 'Muted');
      });
    }

    el.querySelectorAll('.site-lang-switcher__item').forEach(b => {
      b.addEventListener('click', e => {
        this.setLanguage(e.target.getAttribute('data-lang'));
      });
    });

    const cartTrigger = document.getElementById('cart-drawer-trigger');
    if (cartTrigger) {
      cartTrigger.addEventListener('click', (e) => {
        if (this.cart.length > 0) {
          e.preventDefault();
          this.openCart();
        }
      });
    }
  }

  renderHero() {
    // Mount the AgrumeaJarSlider directly into hero-section
    setTimeout(() => {
      window.jarSliderInstance = new AgrumeaJarSlider('hero-section');
    }, 10);
  }

  // 7 MASTER BRANDS SHOWCASE
  renderBrandsShowcase() {
    let el = document.getElementById('brands-section');
    if (!el) {
      el = document.createElement('section');
      el.id = 'brands-section';
      const hero = document.getElementById('hero-section');
      hero.parentNode.insertBefore(el, hero.nextSibling);
    }

    el.innerHTML = `
      <div class="container-farm py-14 md:py-20 border-t border-cream-400" id="brands">
        <div class="max-w-3xl mb-10">
          <div class="badge-tag badge-burgundy mb-3">${this.t('brandsSection.tag')}</div>
          <h2 class="font-display text-3xl md:text-5xl text-burgundy-950 font-normal">
            ${this.t('brandsSection.title')}
          </h2>
          <p class="text-earth/80 text-base mt-2">
            ${this.t('brandsSection.desc')}
          </p>
        </div>

        <!-- Brands Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          ${BRANDS.map(b => {
            const isSelected = this.activeBrand === b.id;
            const count = PRODUCTS.filter(p => p.brandId === b.id).length;
            return `
              <div class="brand-card group p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? 'bg-white border-citrus-500 shadow-xl ring-2 ring-citrus-500/40 scale-[1.02]' 
                  : 'bg-cream-100 border-cream-300 hover:border-citrus-500 hover:shadow-lg'
              }" data-brand-id="${b.id}">
                
                <div>
                  <!-- Logo Container -->
                  <div class="h-32 flex items-center justify-center p-2 rounded-2xl bg-white border border-cream-300/80 mb-4 group-hover:scale-105 transition-transform">
                    ${b.svg}
                  </div>

                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-black uppercase tracking-wider text-citrus-600">${count} Products</span>
                    <span class="text-[0.675rem] font-bold px-2 py-0.5 rounded-full bg-cream-300 text-earth-muted">SKUs: 7g - 10kg</span>
                  </div>

                  <h3 class="font-serif font-black text-xl text-burgundy-950 group-hover:text-citrus-600 transition-colors mt-1">
                    ${b.name}
                  </h3>
                  
                  <div class="text-xs font-semibold italic text-citrus-700 mt-0.5">
                    "${b.tagline}"
                  </div>

                  <p class="text-xs text-earth/75 mt-2 line-clamp-2">
                    ${b.description}
                  </p>
                </div>

                <div class="pt-4 mt-4 border-t border-cream-200 flex items-center justify-between text-xs font-bold text-burgundy-900 group-hover:text-citrus-600">
                  <span>${isSelected ? '✓ Filter Active' : this.t('brandsSection.filterByBrand')}</span>
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    el.querySelectorAll('.brand-card').forEach(c => {
      c.addEventListener('click', e => {
        const bId = e.currentTarget.getAttribute('data-brand-id');
        this.activeBrand = (this.activeBrand === bId) ? 'all' : bId;
        this.renderBrandsShowcase();
        this.renderProductCatalog();
        document.getElementById('pantry').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  renderFlavorWheel() {
    const el = document.getElementById('tasting-section');
    if (!el) return;

    const currentProfile = FLAVOR_PROFILES.find(p => p.id === this.activeFlavorProfile) || FLAVOR_PROFILES[0];
    const matchedProducts = PRODUCTS.filter(p => currentProfile.matchIds.includes(p.id));

    el.innerHTML = `
      <div class="container-farm py-14 md:py-20 border-t border-cream-400" id="tasting">
        <div class="max-w-3xl mb-10">
          <div class="badge-tag badge-citrus mb-3">${this.t('tasting.tag')}</div>
          <h2 class="font-display text-3xl md:text-5xl text-burgundy-950 font-normal">
            ${this.t('tasting.title')}
          </h2>
          <p class="text-earth/80 text-base mt-2">
            ${this.t('tasting.desc')}
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          ${FLAVOR_PROFILES.map(fp => {
            const isAct = fp.id === this.activeFlavorProfile;
            return `
              <button class="flavor-tab-btn text-left p-5 rounded-2xl border transition-all ${
                isAct 
                  ? 'bg-burgundy-900 text-white border-burgundy-700 shadow-lg scale-[1.02]' 
                  : 'bg-cream-100 text-earth border-cream-300 hover:border-citrus-500'
              }" data-profile-id="${fp.id}">
                <div class="w-3.5 h-3.5 rounded-full mb-3" style="background-color: ${fp.color};"></div>
                <div class="font-serif text-lg font-bold leading-tight mb-1.5">${fp[this.lang].name}</div>
                <div class="text-xs ${isAct ? 'text-cream-300' : 'text-earth-muted'} line-clamp-2">${fp[this.lang].desc}</div>
              </button>
            `;
          }).join('')}
        </div>

        <div class="glass-card rounded-3xl p-6 md:p-8">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-cream-300">
            <div>
              <div class="text-xs uppercase tracking-widest text-earth-muted font-bold">Curated Pairing Profile</div>
              <div class="font-display text-2xl text-burgundy-950 font-bold mt-1">${currentProfile[this.lang].name}</div>
              <p class="text-sm text-earth/80 mt-1">${currentProfile[this.lang].desc}</p>
            </div>
            <a href="#pantry" class="btn-primary text-xs self-start md:self-auto">
              ${this.t('tasting.viewMatched')} (${matchedProducts.length})
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            ${matchedProducts.map(p => {
              const baseSkuObj = SKU_VARIANTS[p.baseSku];
              return `
                <div class="p-3.5 rounded-2xl bg-white border border-cream-300 hover:border-citrus-500 transition-all cursor-pointer flex gap-3.5 items-center quick-view-trigger" data-product-id="${p.id}">
                  <img src="${p.image}" alt="${p.name}" class="w-16 h-16 rounded-xl object-cover" />
                  <div class="min-w-0 flex-1">
                    <span class="text-[0.625rem] font-bold text-citrus-600 uppercase tracking-wider">${p.brandName}</span>
                    <h4 class="font-serif font-bold text-sm text-burgundy-950 truncate">${this.lang === 'hi' ? p.hindiName : p.name}</h4>
                    <div class="text-xs font-black text-burgundy-900 mt-0.5">₹${p.basePrice} <span class="font-normal text-earth-muted text-[0.675rem]">(${baseSkuObj.label})</span></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    el.querySelectorAll('.flavor-tab-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        this.activeFlavorProfile = e.currentTarget.getAttribute('data-profile-id');
        this.renderFlavorWheel();
      });
    });

    el.querySelectorAll('.quick-view-trigger').forEach(card => {
      card.addEventListener('click', e => {
        this.openQuickView(e.currentTarget.getAttribute('data-product-id'));
      });
    });
  }

  // 47 PRODUCTS CATALOG
  renderProductCatalog() {
    const el = document.getElementById('pantry-section');
    if (!el) return;

    let filtered = PRODUCTS.filter(p => {
      const matchBrand = this.activeBrand === 'all' || p.brandId === this.activeBrand;
      const matchCat = this.activeCategory === 'all' || p.category === this.activeCategory;
      const q = this.searchQuery.toLowerCase();
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.hindiName.includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q);
      return matchBrand && matchCat && matchSearch;
    });

    if (this.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    } else if (this.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.basePrice - a.basePrice);
    } else if (this.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    el.innerHTML = `
      <div class="container-farm py-14 md:py-20" id="pantry">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div class="badge-tag badge-burgundy mb-2.5">${this.t('pantry.tag')}</div>
            <h2 class="font-display text-3xl md:text-5xl text-burgundy-950 font-normal">
              ${this.t('pantry.title')}
            </h2>
            <p class="text-earth/80 text-base mt-2 max-w-xl">
              ${this.t('pantry.desc')}
            </p>
          </div>

          <!-- Search & Sort -->
          <div class="flex flex-wrap items-center gap-3">
            <div class="relative">
              <input type="text" id="catalog-search" value="${this.searchQuery}" placeholder="${this.t('pantry.searchPlaceholder')}" class="w-64 px-4 py-2 pl-9 rounded-full bg-white border border-cream-400 text-xs text-earth placeholder-earth-muted focus:outline-none focus:border-citrus-500 font-medium" />
              <svg class="w-4 h-4 text-earth-muted absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>

            <select id="catalog-sort" class="px-4 py-2 rounded-full bg-white border border-cream-400 text-xs font-bold text-earth focus:outline-none focus:border-citrus-500">
              <option value="featured" ${this.sortBy === 'featured' ? 'selected' : ''}>${this.t('pantry.sortFeatured')}</option>
              <option value="price-asc" ${this.sortBy === 'price-asc' ? 'selected' : ''}>${this.t('pantry.sortPriceAsc')}</option>
              <option value="price-desc" ${this.sortBy === 'price-desc' ? 'selected' : ''}>${this.t('pantry.sortPriceDesc')}</option>
              <option value="rating" ${this.sortBy === 'rating' ? 'selected' : ''}>${this.t('pantry.sortRating')}</option>
            </select>
          </div>
        </div>

        <!-- Brand Filter Bar -->
        <div class="mb-4">
          <div class="text-[0.675rem] font-bold uppercase tracking-wider text-earth-muted mb-2">Filter by Master Brand:</div>
          <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button class="brand-filter-pill px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              this.activeBrand === 'all' 
                ? 'bg-burgundy-900 text-white shadow-sm' 
                : 'bg-cream-100 text-earth border border-cream-300 hover:border-citrus-500'
            }" data-b-id="all">
              ${this.t('pantry.allBrands')} (47)
            </button>
            ${BRANDS.map(b => `
              <button class="brand-filter-pill whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                this.activeBrand === b.id 
                  ? 'bg-citrus-500 text-white shadow-sm' 
                  : 'bg-cream-100 text-earth border border-cream-300 hover:border-citrus-500'
              }" data-b-id="${b.id}">
                ${b.name}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Category Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          ${CATEGORIES.map(cat => `
            <button class="cat-pill whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              this.activeCategory === cat.id 
                ? 'bg-olive-700 text-white shadow-sm' 
                : 'bg-cream-100 text-earth border border-cream-300 hover:border-citrus-500'
            }" data-cat-id="${cat.id}">
              ${cat[this.lang]}
            </button>
          `).join('')}
        </div>

        <!-- Products Grid (47 Items) -->
        ${filtered.length === 0 ? `
          <div class="text-center py-16 bg-cream-100 rounded-3xl border border-cream-300">
            <div class="font-serif text-2xl text-burgundy-950">${this.t('pantry.noResults')}</div>
            <button id="reset-pantry-btn" class="btn-secondary mt-4">Reset Filters</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${filtered.map(product => {
              const defaultSku = SKU_VARIANTS[product.baseSku];
              return `
                <div class="product-card group" data-product-id="${product.id}">
                  <!-- Image -->
                  <div class="product-image-wrap">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" />
                    
                    <div class="absolute top-3 left-3 z-10">
                      <span class="badge-tag bg-white/95 text-burgundy-950 border border-burgundy-700/20 shadow-sm font-black">
                        ${product.brandName}
                      </span>
                    </div>

                    <div class="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full bg-olive-700 text-white text-[0.625rem] font-bold shadow-sm">
                      FSSAI
                    </div>

                    <!-- Overlay Buttons -->
                    <div class="product-actions-overlay">
                      <button class="btn-card-quickview flex-1 py-2 px-3 rounded-full bg-white text-burgundy-950 hover:bg-cream-100 text-xs font-bold uppercase transition-all shadow-sm" data-product-id="${product.id}">
                        ${this.t('pantry.quickView')}
                      </button>
                      <button class="btn-card-add flex-1 py-2 px-3 rounded-full bg-citrus-500 hover:bg-citrus-600 text-white text-xs font-bold uppercase transition-all shadow-md" data-product-id="${product.id}">
                        ${this.t('pantry.addToBag')}
                      </button>
                    </div>
                  </div>

                  <!-- Details -->
                  <div class="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div class="flex items-center justify-between text-[0.65rem] font-bold text-earth-muted uppercase tracking-wider mb-1">
                        <span>${defaultSku.type}</span>
                        <span>${product.skus.length} Pack Sizes</span>
                      </div>
                      
                      <h3 class="font-serif font-black text-lg text-burgundy-950 group-hover:text-citrus-600 transition-colors leading-snug">
                        ${this.lang === 'hi' ? product.hindiName : product.name}
                      </h3>
                      
                      <p class="text-xs text-earth/75 mt-1.5 line-clamp-2 leading-relaxed">
                        ${product.shortDesc}
                      </p>

                      <!-- Pack Variant Pills Preview -->
                      <div class="flex flex-wrap gap-1 mt-2.5">
                        ${product.skus.slice(0, 3).map(k => `
                          <span class="px-2 py-0.5 rounded bg-cream-200 text-[0.625rem] text-earth-muted font-bold">${SKU_VARIANTS[k].label}</span>
                        `).join('')}
                        ${product.skus.length > 3 ? `<span class="px-1.5 py-0.5 text-[0.625rem] text-citrus-600 font-bold">+${product.skus.length - 3} more</span>` : ''}
                      </div>
                    </div>

                    <div class="pt-4 mt-4 border-t border-cream-300 flex items-center justify-between">
                      <div>
                        <span class="text-xs text-earth-muted font-bold">₹</span>
                        <span class="font-display font-black text-xl text-burgundy-900">${product.basePrice.toFixed(0)}</span>
                        <span class="text-[0.65rem] text-earth-muted font-semibold ml-1">/ ${defaultSku.label}</span>
                      </div>
                      <div class="flex items-center gap-1 text-xs text-gold font-bold">
                        ★ <span>${product.rating}</span>
                        <span class="text-[0.65rem] font-normal text-earth-muted">(${product.reviewsCount})</span>
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

    // Events
    el.querySelectorAll('.brand-filter-pill').forEach(btn => {
      btn.addEventListener('click', e => {
        this.activeBrand = e.currentTarget.getAttribute('data-b-id');
        this.renderBrandsShowcase();
        this.renderProductCatalog();
      });
    });

    el.querySelectorAll('.cat-pill').forEach(btn => {
      btn.addEventListener('click', e => {
        this.activeCategory = e.currentTarget.getAttribute('data-cat-id');
        this.renderProductCatalog();
      });
    });

    const searchInp = document.getElementById('catalog-search');
    if (searchInp) {
      searchInp.addEventListener('input', e => {
        this.searchQuery = e.target.value;
        this.renderProductCatalog();
      });
    }

    const sortSel = document.getElementById('catalog-sort');
    if (sortSel) {
      sortSel.addEventListener('change', e => {
        this.sortBy = e.target.value;
        this.renderProductCatalog();
      });
    }

    const resetBtn = document.getElementById('reset-pantry-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.activeBrand = 'all';
        this.activeCategory = 'all';
        this.searchQuery = '';
        this.renderBrandsShowcase();
        this.renderProductCatalog();
      });
    }

    el.querySelectorAll('.btn-card-quickview').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        this.openQuickView(e.currentTarget.getAttribute('data-product-id'));
      });
    });

    el.querySelectorAll('.btn-card-add').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        this.addToCart(e.currentTarget.getAttribute('data-product-id'));
      });
    });

    el.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', e => {
        this.openQuickView(e.currentTarget.getAttribute('data-product-id'));
      });
    });
  }

  // PACKAGING MATRIX SECTION (from 7g to 10kg)
  renderPackagingMatrix() {
    let el = document.getElementById('packaging-section');
    if (!el) {
      el = document.createElement('section');
      el.id = 'packaging-section';
      const pantry = document.getElementById('pantry-section');
      pantry.parentNode.insertBefore(el, pantry.nextSibling);
    }

    el.innerHTML = `
      <div class="bg-burgundy-950 text-cream-100 py-16 md:py-24 my-10 relative overflow-hidden" id="packaging">
        <div class="container-farm relative z-10">
          <div class="max-w-3xl mb-12">
            <div class="badge-tag badge-citrus mb-3">${this.t('packagingMatrix.tag')}</div>
            <h2 class="font-display text-3xl md:text-5xl text-cream-50 font-normal">
              ${this.t('packagingMatrix.title')}
            </h2>
            <p class="text-cream-300 text-base mt-2">
              ${this.t('packagingMatrix.desc')}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div class="p-6 rounded-3xl bg-burgundy-900/60 border border-burgundy-700/60">
              <div class="w-10 h-10 rounded-2xl bg-citrus-500/20 text-citrus-400 flex items-center justify-center font-display text-xl font-bold mb-4">01</div>
              <h3 class="font-serif text-lg font-bold text-cream-100 mb-2">${this.t('packagingMatrix.cat1Title')}</h3>
              <p class="text-xs text-cream-300/80 leading-relaxed">${this.t('packagingMatrix.cat1Desc')}</p>
            </div>

            <div class="p-6 rounded-3xl bg-burgundy-900/60 border border-burgundy-700/60">
              <div class="w-10 h-10 rounded-2xl bg-olive-600/30 text-olive-100 flex items-center justify-center font-display text-xl font-bold mb-4">02</div>
              <h3 class="font-serif text-lg font-bold text-cream-100 mb-2">${this.t('packagingMatrix.cat2Title')}</h3>
              <p class="text-xs text-cream-300/80 leading-relaxed">${this.t('packagingMatrix.cat2Desc')}</p>
            </div>

            <div class="p-6 rounded-3xl bg-burgundy-900/60 border border-burgundy-700/60">
              <div class="w-10 h-10 rounded-2xl bg-citrus-500/20 text-citrus-400 flex items-center justify-center font-display text-xl font-bold mb-4">03</div>
              <h3 class="font-serif text-lg font-bold text-cream-100 mb-2">${this.t('packagingMatrix.cat3Title')}</h3>
              <p class="text-xs text-cream-300/80 leading-relaxed">${this.t('packagingMatrix.cat3Desc')}</p>
            </div>

            <div class="p-6 rounded-3xl bg-burgundy-900/60 border border-burgundy-700/60">
              <div class="w-10 h-10 rounded-2xl bg-olive-600/30 text-olive-100 flex items-center justify-center font-display text-xl font-bold mb-4">04</div>
              <h3 class="font-serif text-lg font-bold text-cream-100 mb-2">${this.t('packagingMatrix.cat4Title')}</h3>
              <p class="text-xs text-cream-300/80 leading-relaxed">${this.t('packagingMatrix.cat4Desc')}</p>
            </div>

            <div class="p-6 rounded-3xl bg-burgundy-900/60 border border-burgundy-700/60">
              <div class="w-10 h-10 rounded-2xl bg-citrus-500/20 text-citrus-400 flex items-center justify-center font-display text-xl font-bold mb-4">05</div>
              <h3 class="font-serif text-lg font-bold text-cream-100 mb-2">${this.t('packagingMatrix.cat5Title')}</h3>
              <p class="text-xs text-cream-300/80 leading-relaxed">${this.t('packagingMatrix.cat5Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderNewsletter() {
    const el = document.getElementById('newsletter-section');
    if (!el) return;

    el.innerHTML = `
      <div class="container-farm py-14" id="trade">
        <div class="rounded-3xl bg-gradient-to-br from-cream-100 via-cream-300 to-citrus-100 border border-cream-400 p-8 md:p-14 text-center max-w-4xl mx-auto shadow-sm">
          <div class="badge-tag badge-burgundy mb-3">${this.t('newsletter.tag')}</div>
          <h2 class="font-display text-3xl md:text-4xl text-burgundy-950 font-normal">
            ${this.t('newsletter.title')}
          </h2>
          <p class="text-earth/80 text-sm md:text-base max-w-xl mx-auto mt-2">
            ${this.t('newsletter.desc')}
          </p>

          <form id="trade-inquiry-form" class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mt-6">
            <input type="text" id="trade-contact-input" required placeholder="${this.t('newsletter.inputPlaceholder')}" class="w-full px-5 py-3 rounded-full bg-white border border-cream-400 text-xs text-earth placeholder-earth-muted focus:outline-none focus:border-citrus-500 font-medium" />
            <button type="submit" class="btn-primary w-full sm:w-auto whitespace-nowrap">
              ${this.t('newsletter.button')}
            </button>
          </form>
          <div class="text-[0.675rem] text-earth-muted mt-2">${this.t('newsletter.privacy')}</div>
        </div>
      </div>
    `;

    const form = document.getElementById('trade-inquiry-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        this.showToast(this.t('newsletter.successMsg'));
        form.reset();
      });
    }
  }

  renderFooter() {
    const el = document.getElementById('main-footer');
    if (!el) return;

    el.innerHTML = `
      <footer class="bg-burgundy-950 text-cream-200 pt-16 pb-12 border-t border-burgundy-800">
        <div class="container-farm">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-burgundy-800/80">
            
            <div class="md:col-span-5 space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-citrus-500 flex items-center justify-center text-white font-serif font-black text-xl">E</div>
                <div class="font-display text-2xl font-black tracking-wider text-cream-50">ELVAN FOODS</div>
              </div>
              <p class="text-sm text-cream-300/80 max-w-sm leading-relaxed">
                ${this.t('footer.motto')}
              </p>
              <div class="text-xs text-citrus-400 font-bold">
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
              <div class="font-serif font-bold text-base text-cream-100">Our 7 Brands</div>
              <div class="flex flex-wrap gap-2 pt-1">
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">Crimson™</span>
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">Spice Dragon™</span>
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">Raghunandan™</span>
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">Hridaya Ram™</span>
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">Farm Feast™</span>
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">Nandan™</span>
                <span class="px-2.5 py-1 rounded bg-burgundy-900 border border-burgundy-800 text-[0.65rem] text-cream-200">Ambar Masale™</span>
              </div>
            </div>

          </div>

          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400 gap-4">
            <div>© ${new Date().getFullYear()} Elvan Foods Industries Pvt. Ltd. • ${this.t('footer.rights')}</div>
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
    const badge = document.getElementById('cart-badge-count');
    if (badge) {
      badge.textContent = this.cart.reduce((s, i) => s + i.quantity, 0);
    }

    const el = document.getElementById('cart-drawer-content');
    if (!el) return;

    const totals = this.getCartTotals();

    if (this.cart.length === 0) {
      el.innerHTML = `
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

    el.innerHTML = `
      <div class="p-4 bg-cream-200 border-b border-cream-400">
        <div class="text-xs font-bold text-earth mb-1.5 flex justify-between">
          <span>${totals.isFreeShipping ? this.t('cart.freeShippingUnlocked') : this.t('cart.freeShippingNotice').replace('{amount}', '₹' + totals.remainingForFree)}</span>
        </div>
        <div class="w-full bg-cream-400 h-2 rounded-full overflow-hidden">
          <div class="h-full bg-citrus-500 rounded-full transition-all duration-500" style="width: ${Math.min(100, (totals.subtotal / this.t('cart.freeShippingThreshold')) * 100)}%;"></div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-3.5">
        ${this.cart.map((item, idx) => `
          <div class="flex gap-3.5 p-3 rounded-2xl bg-white border border-cream-300 relative group">
            <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-16 rounded-xl object-cover" />
            
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <span class="text-[0.625rem] font-bold text-citrus-600 uppercase tracking-wider">${item.product.brandName}</span>
                <h4 class="font-serif font-bold text-sm text-burgundy-950 leading-tight">${this.lang === 'hi' ? item.product.hindiName : item.product.name}</h4>
                <div class="text-[0.675rem] text-earth-muted mt-0.5">${item.skuObj.label} • ₹${item.unitPrice}</div>
              </div>

              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center rounded-full border border-cream-400 bg-cream-100 text-xs">
                  <button class="px-2.5 py-0.5 text-earth hover:text-citrus-500 font-bold" onclick="window.app.updateCartQty(${idx}, -1)">−</button>
                  <span class="px-2 font-bold">${item.quantity}</span>
                  <button class="px-2.5 py-0.5 text-earth hover:text-citrus-500 font-bold" onclick="window.app.updateCartQty(${idx}, 1)">+</button>
                </div>

                <div class="font-display font-black text-sm text-burgundy-900">
                  ₹${item.unitPrice * item.quantity}
                </div>
              </div>
            </div>

            <button class="absolute top-2 right-2 text-earth-muted hover:text-citrus-600 p-1" onclick="window.app.removeFromCart(${idx})" title="Remove">
              ✕
            </button>
          </div>
        `).join('')}
      </div>

      <div class="p-5 border-t border-cream-400 bg-cream-50 space-y-3.5">
        <div class="flex gap-2">
          <input type="text" id="cart-voucher-input" placeholder="${this.t('cart.couponPlaceholder')}" class="flex-1 px-3 py-1.5 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500 uppercase font-mono font-bold" />
          <button class="px-4 py-1.5 rounded-xl bg-burgundy-800 text-white text-xs font-bold uppercase hover:bg-burgundy-900 transition-colors" onclick="window.app.applyCoupon(document.getElementById('cart-voucher-input').value)">
            ${this.t('cart.couponApply')}
          </button>
        </div>

        ${this.appliedCoupon ? `
          <div class="text-xs text-olive-700 font-bold flex items-center justify-between bg-olive-100 p-2 rounded-lg">
            <span>${this.t('cart.couponApplied').replace('{amount}', totals.discount)}</span>
            <button class="text-earth-muted hover:text-citrus-600 ml-2" onclick="window.app.appliedCoupon=null; window.app.renderCartUI();">✕</button>
          </div>
        ` : ''}

        <div class="space-y-1.5 text-xs text-earth pt-1 border-t border-cream-300">
          <div class="flex justify-between">
            <span class="text-earth-muted">${this.t('cart.subtotal')}</span>
            <span class="font-bold">₹${totals.subtotal}</span>
          </div>
          ${totals.discount > 0 ? `
            <div class="flex justify-between text-citrus-600 font-bold">
              <span>Discount</span>
              <span>−₹${totals.discount}</span>
            </div>
          ` : ''}
          <div class="flex justify-between">
            <span class="text-earth-muted">${this.t('cart.shipping')}</span>
            <span class="font-bold">${totals.isFreeShipping ? this.t('cart.shippingFree') : '₹' + totals.shipping}</span>
          </div>
          <div class="flex justify-between font-display text-lg font-black text-burgundy-950 pt-2 border-t border-cream-300">
            <span>Total</span>
            <span>₹${totals.total}</span>
          </div>
        </div>

        <div class="text-[0.675rem] text-earth-muted leading-tight">${this.t('cart.packagingNote')}</div>

        <button class="btn-primary w-full py-3 text-xs" onclick="window.app.openCheckoutModal()">
          ${this.t('cart.checkoutBtn')}
        </button>
      </div>
    `;
  }

  // PRODUCT QUICK-VIEW & SKU SELECTOR MODAL
  renderQuickViewModal() {
    const product = this.activeModalProduct;
    if (!product) return;

    const el = document.getElementById('modal-product-body');
    if (!el) return;

    const curSkuKey = this.selectedModalSkuKey || product.baseSku;
    const curSku = SKU_VARIANTS[curSkuKey];
    const calcPrice = Math.round(product.basePrice * curSku.multiplier);

    el.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8">
        <div class="md:col-span-5">
          <div class="rounded-2xl overflow-hidden border border-cream-400 bg-white aspect-square shadow-sm">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" />
          </div>
          <div class="badge-tag bg-burgundy-100 text-burgundy-800 font-black mt-3">
            ${product.brandName}
          </div>
          <div class="text-[0.675rem] font-bold text-olive-700 mt-2">
            ✓ ${this.t('quickViewModal.fssaiNotice')}
          </div>
        </div>

        <div class="md:col-span-7 space-y-4">
          <div>
            <div class="text-xs uppercase font-bold text-citrus-600 tracking-wider">SKU: ${curSku.code} • ${curSku.type}</div>
            <h2 class="font-serif font-black text-2xl text-burgundy-950 mt-1">${this.lang === 'hi' ? product.hindiName : product.name}</h2>
            <div class="font-display text-2xl font-black text-burgundy-900 mt-1.5">
              ₹${calcPrice} <span class="text-xs text-earth-muted font-normal">per ${curSku.label}</span>
            </div>
          </div>

          <p class="text-sm text-earth/80 leading-relaxed">
            ${product.description}
          </p>

          <!-- Packaging / SKU Variant Selector -->
          <div class="p-3.5 rounded-2xl bg-cream-200/80 border border-cream-400 space-y-2">
            <label class="block text-xs font-black uppercase tracking-wider text-burgundy-950">
              ${this.t('quickViewModal.selectSku')}:
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              ${product.skus.map(k => {
                const s = SKU_VARIANTS[k];
                const p = Math.round(product.basePrice * s.multiplier);
                const isSel = k === curSkuKey;
                return `
                  <button class="modal-sku-pill text-left p-2 rounded-xl border text-xs transition-all ${
                    isSel 
                      ? 'bg-burgundy-900 text-white border-burgundy-700 font-bold shadow-sm' 
                      : 'bg-white text-earth border-cream-400 hover:border-citrus-500'
                  }" data-sku-key="${k}">
                    <div class="font-bold truncate">${s.label}</div>
                    <div class="${isSel ? 'text-citrus-300' : 'text-earth-muted'} text-[0.65rem]">₹${p}</div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Sensory Profile -->
          <div class="space-y-1.5 p-3 rounded-xl bg-white border border-cream-300">
            <div class="text-[0.675rem] font-black text-burgundy-950 uppercase tracking-wider">${this.t('quickViewModal.sensoryTitle')}</div>
            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-[0.675rem] font-bold text-earth">
              <div>Sweetness: ${product.sensory.sweet}%</div>
              <div>Spiciness: ${product.sensory.spice}%</div>
              <div>Tanginess: ${product.sensory.tangy}%</div>
              <div>Richness: ${product.sensory.richness}%</div>
            </div>
          </div>

          <!-- Quantity & Action -->
          <div class="flex items-center gap-4 pt-2 border-t border-cream-300">
            <div class="flex items-center rounded-full border border-cream-400 bg-white">
              <button class="px-3 py-2 text-earth hover:text-citrus-500 font-bold" id="modal-qty-minus">−</button>
              <span class="px-3 font-bold text-sm" id="modal-qty-val">1</span>
              <button class="px-3 py-2 text-earth hover:text-citrus-500 font-bold" id="modal-qty-plus">+</button>
            </div>

            <button class="btn-primary flex-1 py-3 text-xs" id="modal-add-to-cart-btn">
              ${this.t('quickViewModal.addToCart')}
            </button>
          </div>
        </div>
      </div>
    `;

    // SKU click
    el.querySelectorAll('.modal-sku-pill').forEach(btn => {
      btn.addEventListener('click', e => {
        this.selectedModalSkuKey = e.currentTarget.getAttribute('data-sku-key');
        this.renderQuickViewModal();
      });
    });

    // Quantity logic
    let curQty = 1;
    const qtyVal = document.getElementById('modal-qty-val');
    document.getElementById('modal-qty-minus').addEventListener('click', () => {
      if (curQty > 1) {
        curQty--;
        qtyVal.textContent = curQty;
      }
    });
    document.getElementById('modal-qty-plus').addEventListener('click', () => {
      curQty++;
      qtyVal.textContent = curQty;
    });

    document.getElementById('modal-add-to-cart-btn').addEventListener('click', () => {
      this.addToCart(product.id, this.selectedModalSkuKey, curQty);
      this.closeQuickView();
    });
  }

  // CHECKOUT / B2B INQUIRY MODAL
  openCheckoutModal() {
    this.closeCart();
    const totals = this.getCartTotals();
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    modal.classList.add('active');
    const container = document.getElementById('checkout-modal-content');
    container.innerHTML = `
      <div class="p-6 md:p-8 max-w-lg mx-auto space-y-5">
        <div class="text-center">
          <div class="badge-tag badge-burgundy mb-2">Order & Quotation Dispatch</div>
          <h2 class="font-serif font-black text-2xl text-burgundy-950">${this.t('checkoutModal.title')}</h2>
        </div>

        <form id="checkout-form" class="space-y-3.5">
          <div>
            <label class="block text-xs font-bold text-earth mb-1">${this.t('checkoutModal.orderType')}</label>
            <div class="grid grid-cols-2 gap-2 text-xs font-bold">
              <label class="flex items-center gap-2 p-2 rounded-xl border border-cream-400 bg-cream-50 cursor-pointer">
                <input type="radio" name="orderType" value="retail" checked />
                <span>${this.t('checkoutModal.retailOrder')}</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded-xl border border-cream-400 bg-cream-50 cursor-pointer">
                <input type="radio" name="orderType" value="wholesale" />
                <span>${this.t('checkoutModal.wholesaleOrder')}</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-earth mb-1">${this.t('checkoutModal.name')}</label>
            <input type="text" required value="Suresh Aggarwal / Grand Palace Foods" class="w-full px-4 py-2 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500 font-medium" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-earth mb-1">${this.t('checkoutModal.phone')}</label>
              <input type="tel" required value="+91 98765 43210" class="w-full px-4 py-2 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500 font-medium" />
            </div>
            <div>
              <label class="block text-xs font-bold text-earth mb-1">${this.t('checkoutModal.email')}</label>
              <input type="email" required value="orders@grandpalace.in" class="w-full px-4 py-2 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500 font-medium" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-earth mb-1">${this.t('checkoutModal.address')}</label>
            <input type="text" required value="Plot 18, Commercial Market Area" class="w-full px-4 py-2 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500 font-medium" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-earth mb-1">${this.t('checkoutModal.city')}</label>
              <input type="text" required value="New Delhi, Delhi" class="w-full px-4 py-2 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500 font-medium" />
            </div>
            <div>
              <label class="block text-xs font-bold text-earth mb-1">${this.t('checkoutModal.pincode')}</label>
              <input type="text" required value="110001" class="w-full px-4 py-2 rounded-xl bg-white border border-cream-400 text-xs focus:outline-none focus:border-citrus-500 font-medium" />
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-cream-200 border border-cream-400 flex items-center justify-between">
            <span class="font-black text-xs uppercase tracking-wider text-earth">${this.t('checkoutModal.totalToPay')}:</span>
            <span class="font-display text-2xl font-black text-burgundy-900">₹${totals.total}</span>
          </div>

          <button type="submit" class="btn-primary w-full py-3 text-xs">
            ${this.t('checkoutModal.placeOrder')}
          </button>
        </form>
      </div>
    `;

    document.getElementById('checkout-form').addEventListener('submit', e => {
      e.preventDefault();
      this.triggerOrderCelebration();
    });
  }

  triggerOrderCelebration() {
    const container = document.getElementById('checkout-modal-content');
    const orderNum = 'ELV-' + Math.floor(100000 + Math.random() * 900000);

    if (window.confetti) {
      window.confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E84E1B', '#B31329', '#2C6B2F', '#DFB035']
      });
    }

    container.innerHTML = `
      <div class="p-8 md:p-10 text-center max-w-md mx-auto space-y-4">
        <div class="w-16 h-16 rounded-full bg-citrus-100 text-citrus-600 flex items-center justify-center mx-auto text-2xl font-black">
          ✓
        </div>
        <h2 class="font-serif font-black text-2xl text-burgundy-950">${this.t('checkoutModal.successTitle')}</h2>
        <p class="text-sm text-earth/80 leading-relaxed">${this.t('checkoutModal.successDesc')}</p>
        
        <div class="p-3 bg-cream-200 rounded-xl text-xs font-mono text-earth-muted font-bold">
          ${this.t('checkoutModal.orderNumber')}: <strong class="text-burgundy-900">${orderNum}</strong>
        </div>

        <button class="btn-primary mt-4 text-xs" onclick="window.app.finishOrder()">
          ${this.t('checkoutModal.backToHome')}
        </button>
      </div>
    `;

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
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => this.closeCart());

    const modalClose = document.getElementById('modal-close-btn');
    if (modalClose) modalClose.addEventListener('click', () => this.closeQuickView());

    const checkoutModalClose = document.getElementById('checkout-modal-close-btn');
    if (checkoutModalClose) checkoutModalClose.addEventListener('click', () => this.closeCheckoutModal());

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.closeCart();
        this.closeQuickView();
        this.closeCheckoutModal();
      }
    });
  }
}

window.app = new ElvanFoodsApp();
