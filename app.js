/**
 * GNAPAKALU BY MEGHA - DYNAMIC SCREEN SWITCHER ENGINE
 * Screen 1: Clean Home Landing (Exact 2nd picture)
 * Screen 2: Categorized Collection (Opens on requirement click)
 * Drawer: Hidden 3-lines side menu (Opens only when clicked!)
 */

// PRODUCT DATASET ORGANIZED BY EXACT MAPPING:
// A (Antitarnish jewellery) -> both
// T (Traditional jewellery) -> w (women)
// R (Resin art)             -> both
// P (Paintings)             -> both
// H (Handmade bangles)      -> w (women)
// S (Scented candles)       -> both
// S (Scoop)                 -> w (women)
// D (Dice)                  -> w (women)
// W (Women hampers)         -> w (women)
// M (Men hampers)           -> m (men)

// MASTER CATEGORIES LIST (Always available across menu, drawer and filter chips):
const ALL_CATEGORIES = [
  { name: 'Antitarnish jewellery', gender: 'both' },
  { name: 'Traditional jewellery', gender: 'w' },
  { name: 'Resin art', gender: 'both' },
  { name: 'Paintings', gender: 'both' },
  { name: 'Handmade bangles', gender: 'w' },
  { name: 'Scented candles', gender: 'both' },
  { name: 'Scoop', gender: 'w' },
  { name: 'Dice', gender: 'w' },
  { name: 'Women hampers', gender: 'w' },
  { name: 'Men hampers', gender: 'm' },
  { name: 'Special gifts', gender: 'both' },
  { name: 'New launches', gender: 'both' }
];

const DEFAULT_PRODUCTS = [
  {
    id: 'anti_heart_chain',
    name: '18K Gold Plated Heart Snake Chain Necklace',
    category: 'Antitarnish jewellery',
    gender: 'w',
    offerPrice: 199,
    originalPrice: 399,
    stock: 10,
    badge: '18K Anti-Tarnish',
    image: 'assets/products/golden_heart_necklace.jpg',
    description: 'Bespoke 18K gold-plated anti-tarnish heart pendant crafted on a sleek snake chain. Waterproof, sweatproof, and packaged with handwritten Gnapakalu by Megha card.',
    tags: ['18K Gold', 'Heart Pendant', 'Anti-Tarnish', 'Waterproof']
  },
  {
    id: 'bamboo_joint_bangle',
    name: 'Stainless Steel Bamboo Segment Joint Bangle',
    category: 'Antitarnish jewellery',
    gender: 'w',
    offerPrice: 349,
    originalPrice: 549,
    stock: 10,
    badge: 'Stainless Steel',
    image: 'assets/products/bamboo_bangle_black.jpg',
    description: 'Minimalist luxury bamboo segment joint bangle crafted in anti-tarnish waterproof stainless steel. Features a secure push clasp mechanism. Available in Jet Black, Rich Gold, and Ivory White.',
    tags: ['Stainless Steel', 'Bamboo Bangle', 'Waterproof', 'Color Variants'],
    variants: [
      { name: 'Black', color: '#1a1a1a', image: 'assets/products/bamboo_bangle_black.jpg' },
      { name: 'Gold', color: '#d4af37', image: 'assets/products/bamboo_bangle_gold.jpg' },
      { name: 'White', color: '#ffffff', image: 'assets/products/bamboo_bangle_white.jpg' }
    ]
  },
  {
    id: 'blood_gold_resin_bangles',
    name: 'Royal Blood Red & 24K Gold Leaf Resin Bangles (Pair)',
    category: 'Resin art',
    gender: 'w',
    offerPrice: 799,
    originalPrice: 999, // 799 + 200
    stock: 10,
    badge: 'Artisan Resin',
    image: 'assets/products/blood_resin_bangles.jpg',
    description: 'Handcrafted luxury crystal resin bangles infused with rich royal blood red pigment and sparkling 24K gold foil flakes. Smooth, glossy glass-like finish that never fades or tarnishes.',
    tags: ['Blood Red Bangles', 'Gold Leaf', 'Handmade Resin Art', 'Artisan Pair']
  },
  {
    id: 'ruby_emerald_flora_bangle',
    name: 'Ruby & Emerald Crystal Floral Snake Chain Bangle',
    category: 'Antitarnish jewellery',
    gender: 'w',
    offerPrice: 499,
    originalPrice: 699, // 499 + 200
    stock: 10,
    badge: 'Anti-Tarnish',
    image: 'assets/products/ruby_emerald_flora_bangle.jpg',
    description: 'Exquisite 18K gold-finished cable snake chain bangle studded with alternating faceted ruby red and emerald green crystal petals. Premium anti-tarnish waterproof coating.',
    tags: ['Ruby Emerald', 'Floral Bangle', 'Anti-Tarnish', 'Festive Luxury']
  },
  {
    id: 'tulip_flower_pendant_chain',
    name: 'Blossoming Tulip Crystal Flower Pendant Necklace',
    category: 'Antitarnish jewellery',
    gender: 'w',
    offerPrice: 299,
    originalPrice: 499, // 299 + 200
    stock: 10,
    badge: 'Bestseller',
    image: 'assets/products/tulip_pendant_red.jpg',
    description: 'Delicate blooming tulip teardrop pendant necklace in 18K gold chain with emerald crystal leaves. Choose between Crimson Red Tulip and Pastel Pink Tulip.',
    tags: ['Tulip Pendant', 'Waterproof Chain', 'Floral Jewellery', 'Color Variants'],
    variants: [
      { name: 'Red', color: '#dc2626', image: 'assets/products/tulip_pendant_red.jpg' },
      { name: 'Pink', color: '#f472b6', image: 'assets/products/tulip_pendant_pink.jpg' }
    ]
  },
  {
    id: 'tulip_twin_charm_bracelet',
    name: 'Dual Tulip Bud Sliding Bolo Snake Chain Bracelet',
    category: 'Antitarnish jewellery',
    gender: 'w',
    offerPrice: 399,
    originalPrice: 599, // 399 + 200
    stock: 10,
    badge: 'Adjustable Bolo',
    image: 'assets/products/tulip_adjustable_bracelet.jpg',
    description: 'Elegant adjustable sliding bolo snake chain bracelet adorned with twin dangling crimson ruby tulip bud charms with emerald enamel accents. Fits all wrist sizes comfortably.',
    tags: ['Tulip Bracelet', 'Adjustable Bolo', 'Ruby Charms', 'Anti-Tarnish']
  }
];

// LIVE PRODUCTS DATASET PERSISTED IN LOCALSTORAGE
let PRODUCTS = [];
try {
  const savedProds = localStorage.getItem('gnapakalu_products');
  if (savedProds) {
    PRODUCTS = JSON.parse(savedProds);
    // Ensure every product has a valid numeric stock
    PRODUCTS.forEach(p => {
      if (typeof p.stock !== 'number' || isNaN(p.stock)) {
        p.stock = 10;
      }
    });
  } else {
    PRODUCTS = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem('gnapakalu_products', JSON.stringify(PRODUCTS));
  }
} catch (e) {
  PRODUCTS = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
}

function saveProducts() {
  localStorage.setItem('gnapakalu_products', JSON.stringify(PRODUCTS));
  renderProducts();
  renderDrawerCategories();
  renderSubcategoryFilterChips();
  updateMgmtLiveBadge();
}

// Active color selection state mapped by product ID
const selectedProductVariants = {
  bamboo_joint_bangle: { name: 'Black', color: '#1a1a1a', image: 'assets/products/bamboo_bangle_black.jpg' },
  tulip_flower_pendant_chain: { name: 'Red', color: '#dc2626', image: 'assets/products/tulip_pendant_red.jpg' }
};

// STATE MANAGEMENT
let currentScreen = 'home';      // 'home' | 'catalog'
let activeGenderTab = 'w';       // 'w' | 'm' (Only Women and Men)
let activeCategoryFilter = 'all'; // Default to 'all' so any newly added product is immediately visible
let drawerGenderTab = 'w';       // 'w' | 'm' (Only Women and Men)
let searchQuery = '';
let currentSort = 'featured';

let cart = JSON.parse(localStorage.getItem('gnapakalu_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('gnapakalu_wishlist') || '[]');
let appliedPromo = null;
let currentShippingPincode = localStorage.getItem('gnapakalu_pincode') || '';
let currentShippingZone = localStorage.getItem('gnapakalu_zone') || 'auto';

// SHIPPING COURIER CHARGES MAPPING:
// AP: ₹85/-
// Telangana: ₹125/-
// All over India: ₹135/-
// Other countries: ₹3499/-
const SHIPPING_RATES = {
  AP: { rate: 85, label: 'Andhra Pradesh (AP)' },
  TS: { rate: 125, label: 'Telangana' },
  INDIA: { rate: 135, label: 'All Over India' },
  INTERNATIONAL: { rate: 3499, label: 'Other Countries (International)' }
};

function getShippingDetails(pincode, selectedZone = 'auto') {
  // If explicitly selected dropdown
  if (selectedZone === 'international') {
    return { fee: SHIPPING_RATES.INTERNATIONAL.rate, label: SHIPPING_RATES.INTERNATIONAL.label, code: 'INT' };
  }
  if (selectedZone === 'ap') {
    return { fee: SHIPPING_RATES.AP.rate, label: SHIPPING_RATES.AP.label, code: 'AP' };
  }
  if (selectedZone === 'ts') {
    return { fee: SHIPPING_RATES.TS.rate, label: SHIPPING_RATES.TS.label, code: 'TS' };
  }
  if (selectedZone === 'india') {
    return { fee: SHIPPING_RATES.INDIA.rate, label: SHIPPING_RATES.INDIA.label, code: 'INDIA' };
  }

  // Auto detection via pincode
  const pin = String(pincode || '').trim().replace(/\D/g, '');
  if (pin.length >= 3) {
    const pinPrefix2 = parseInt(pin.slice(0, 2), 10);
    const pinPrefix3 = parseInt(pin.slice(0, 3), 10);

    // Telangana pincodes strictly: 500xxx - 509xxx (Prefix 50)
    if (pinPrefix2 === 50) {
      return { fee: SHIPPING_RATES.TS.rate, label: 'Telangana (TS)', code: 'TS' };
    }
    // Andhra Pradesh pincodes strictly: 515xxx - 535xxx (Prefix 51, 52, 53)
    if (pinPrefix2 >= 51 && pinPrefix2 <= 53) {
      return { fee: SHIPPING_RATES.AP.rate, label: 'Andhra Pradesh (AP)', code: 'AP' };
    }
    // Any valid 6-digit Indian PIN (1xxxxx - 9xxxxx)
    if (pin.length === 6) {
      return { fee: SHIPPING_RATES.INDIA.rate, label: 'All Over India', code: 'INDIA' };
    }
  }

  // Default fallback
  return { fee: SHIPPING_RATES.INDIA.rate, label: 'All Over India (Standard)', code: 'INDIA' };
}

function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  syncPinFromCloud();
  renderDrawerCategories();
  updateCartUI();
  updateWishlistCount();
  updateMgmtLiveBadge();
  setupEventListeners();
});

// LISTENERS
function setupEventListeners() {
  // 3-Lines Categories Button in Header
  const headerSideToggle = document.getElementById('headerSideToggle');
  if (headerSideToggle) headerSideToggle.addEventListener('click', openSidebarDrawer);

  // Search in Header
  const headerSearchInput = document.getElementById('headerSearchInput');
  if (headerSearchInput) {
    headerSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (searchQuery) {
        openCollectionScreen('all', `Search Results for "${searchQuery}"`);
      } else if (currentScreen === 'catalog') {
        renderProducts();
      }
    });
  }

  // Sort Select in Catalog
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Cart Triggers
  const cartBtn = document.getElementById('cartBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Quick View Modal
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Promo Code
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const promoInput = document.getElementById('promoInput');
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'MEGHA10') {
        appliedPromo = { code: 'MEGHA10', discountPercent: 10 };
        showToast('Promo code applied: 10% OFF!');
        updateCartUI();
      } else if (!code) {
        showToast('Please enter a promo code');
      } else {
        showToast('Invalid code. Try "MEGHA10"');
      }
    });
  }

  // Shipping Pincode and Country/Zone Selection
  const shippingPincodeInput = document.getElementById('shippingPincodeInput');
  const shippingCountrySelect = document.getElementById('shippingCountrySelect');

  if (shippingPincodeInput) {
    if (currentShippingPincode) shippingPincodeInput.value = currentShippingPincode;
    shippingPincodeInput.addEventListener('input', (e) => {
      currentShippingPincode = e.target.value.trim();
      localStorage.setItem('gnapakalu_pincode', currentShippingPincode);
      if (shippingCountrySelect && currentShippingPincode) {
        shippingCountrySelect.value = 'auto';
        currentShippingZone = 'auto';
        localStorage.setItem('gnapakalu_zone', 'auto');
      }
      updateCartUI();
    });
  }

  if (shippingCountrySelect) {
    if (currentShippingZone) shippingCountrySelect.value = currentShippingZone;
    shippingCountrySelect.addEventListener('change', (e) => {
      currentShippingZone = e.target.value;
      localStorage.setItem('gnapakalu_zone', currentShippingZone);
      if (currentShippingZone !== 'auto' && shippingPincodeInput) {
        shippingPincodeInput.value = '';
        currentShippingPincode = '';
        localStorage.removeItem('gnapakalu_pincode');
      }
      updateCartUI();
    });
  }

  // Checkout
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', handleCheckout);
}

// ===============================================================
// SCREEN NAVIGATION CONTROLS (HOME SCREEN VS COLLECTION SCREEN)
// ===============================================================

// 1. NAVIGATE TO HOME SCREEN (SCREEN 1)
function navigateToHome() {
  currentScreen = 'home';
  document.getElementById('homeView').style.display = 'flex';
  document.getElementById('catalogView').style.display = 'none';

  // Update header nav tabs
  document.getElementById('navHomeTab')?.classList.add('active');
  document.getElementById('navWomenTab')?.classList.remove('active');
  document.getElementById('navMenTab')?.classList.remove('active');

  closeSidebarDrawer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. NAVIGATE TO COLLECTION SCREEN (SCREEN 2)
function openCollectionScreen(gender, title = 'Curated Collection') {
  currentScreen = 'catalog';
  activeGenderTab = gender;
  activeCategoryFilter = 'all';

  // Toggle views
  document.getElementById('homeView').style.display = 'none';
  document.getElementById('catalogView').style.display = 'block';

  // Update header nav tabs
  document.getElementById('navHomeTab')?.classList.remove('active');
  if (gender === 'w') {
    document.getElementById('navWomenTab')?.classList.add('active');
    document.getElementById('navMenTab')?.classList.remove('active');
  } else if (gender === 'm') {
    document.getElementById('navMenTab')?.classList.add('active');
    document.getElementById('navWomenTab')?.classList.remove('active');
  } else {
    document.getElementById('navWomenTab')?.classList.remove('active');
    document.getElementById('navMenTab')?.classList.remove('active');
  }

  // Update headings
  document.getElementById('collectionBreadcrumb').textContent = gender === 'w' ? 'Women Atelier' : gender === 'm' ? 'Men Atelier' : 'All Collections';
  document.getElementById('collectionHeading').textContent = title;
  document.getElementById('collectionDescription').textContent = gender === 'w' 
    ? 'Handcrafted anti-tarnish jewellery, traditional Kundan sets, handmade bangles, viral scoops & dice.'
    : gender === 'm'
    ? 'Waterproof stainless steel chains, grooming sets & curated men gift hampers.'
    : 'Explore all handcrafted jewellery, custom resin art, paintings, candles and hampers.';

  renderSubcategoryFilterChips();
  renderProducts();
  closeSidebarDrawer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. NAVIGATE DIRECTLY TO A SPECIFIC CATEGORY SCREEN
function openCategoryScreen(categoryName, customTitle) {
  currentScreen = 'catalog';
  activeCategoryFilter = categoryName;

  // Infer gender based on category definition or products
  const catDef = ALL_CATEGORIES.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
  const item = PRODUCTS.find(p => p.category.toLowerCase() === categoryName.toLowerCase());
  if (catDef) {
    activeGenderTab = catDef.gender === 'both' ? 'all' : catDef.gender;
  } else if (item) {
    activeGenderTab = item.gender;
  } else {
    activeGenderTab = 'all';
  }

  document.getElementById('homeView').style.display = 'none';
  document.getElementById('catalogView').style.display = 'block';

  document.getElementById('navHomeTab')?.classList.remove('active');
  document.getElementById('collectionBreadcrumb').textContent = 'Categories';
  document.getElementById('collectionHeading').textContent = customTitle || categoryName;
  document.getElementById('collectionDescription').textContent = `Explore our handcrafted creations in ${categoryName}.`;

  renderSubcategoryFilterChips();
  renderProducts();
  closeSidebarDrawer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===============================================================
// SUBCATEGORY FILTER CHIPS (IN SCREEN 2) - ALL CATEGORIES
// ===============================================================
function renderSubcategoryFilterChips() {
  const container = document.getElementById('subcategoriesFilterBar');
  if (!container) return;

  // Show all categories mapped to the current gender tab
  const categories = ALL_CATEGORIES
    .filter(c => {
      if (activeGenderTab === 'w') return c.gender === 'w' || c.gender === 'both';
      if (activeGenderTab === 'm') return c.gender === 'm' || c.gender === 'both';
      return true;
    })
    .map(c => c.name);

  container.innerHTML = categories.map(cat => {
    const isSelected = (cat.toLowerCase() === activeCategoryFilter.toLowerCase());
    return `
      <button class="subcat-chip ${isSelected ? 'active' : ''}" onclick="selectSubcategoryChip('${cat}')">
        ${cat}
      </button>
    `;
  }).join('');
}

function selectSubcategoryChip(catKey) {
  activeCategoryFilter = catKey;
  renderSubcategoryFilterChips();
  renderProducts();
}

// ===============================================================
// PRODUCTS GRID RENDERER
// ===============================================================
function renderProducts() {
  const container = document.getElementById('productGrid');
  const countText = document.getElementById('catalogCountText');
  if (!container) return;

  let list = PRODUCTS.filter(item => {
    if (activeGenderTab === 'w') return item.gender === 'w' || item.gender === 'both';
    if (activeGenderTab === 'm') return item.gender === 'm' || item.gender === 'both';
    return true;
  });

  if (activeCategoryFilter !== 'all') {
    list = list.filter(item => item.category === activeCategoryFilter);
  }

  if (searchQuery) {
    list = list.filter(item => 
      item.name.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery)
    );
  }

  if (currentSort === 'price-low') {
    list.sort((a, b) => a.offerPrice - b.offerPrice);
  } else if (currentSort === 'price-high') {
    list.sort((a, b) => b.offerPrice - a.offerPrice);
  }

  if (countText) countText.textContent = `Showing ${list.length} Item(s)`;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem;">
        <p style="font-size: 1.15rem; color: var(--color-text-muted);">No items found in this selection.</p>
        <button onclick="openCollectionScreen('all', 'All Creations')" style="margin-top: 1rem;" class="checkout-btn">View All Items</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(item => {
    const isWishlisted = wishlist.includes(item.id);
    const savings = item.originalPrice - item.offerPrice;
    const discountPercent = Math.round((savings / item.originalPrice) * 100);
    const activeVariant = item.variants ? (selectedProductVariants[item.id] || item.variants[0]) : null;
    const currentImg = activeVariant ? activeVariant.image : item.image;
    const currentStock = (typeof item.stock === 'number') ? item.stock : 10;
    const isOutOfStock = currentStock <= 0;

    const variantSwatchesHtml = item.variants ? `
      <div class="product-color-picker">
        <span class="color-picker-label">Color:</span>
        ${item.variants.map((v, idx) => {
          const isSelected = activeVariant && activeVariant.name === v.name;
          return `
            <button type="button" class="color-swatch-btn ${isSelected ? 'active' : ''}" 
                    onclick="selectProductColor('${item.id}', '${v.name}')" 
                    title="${v.name}">
              <span class="color-circle" style="background-color: ${v.color};"></span>
              <span>${v.name}</span>
            </button>
          `;
        }).join('')}
      </div>
    ` : '';

    return `
      <div class="product-card ${isOutOfStock ? 'sold-out' : ''}" id="card-${item.id}">
        <div class="product-image-container">
          <img src="${currentImg}" alt="${item.name}" id="img-${item.id}" class="product-img" loading="lazy" />
          
          <div class="card-badges">
            ${isOutOfStock 
              ? `<span class="badge-tag-out-of-stock">OUT OF STOCK</span>` 
              : `<span class="badge-tag-discount">${discountPercent}% OFF</span>`
            }
            <span class="badge-tag-feature">${item.badge || 'Handcrafted'}</span>
          </div>

          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  onclick="toggleWishlist('${item.id}')" 
                  aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <div class="quick-view-overlay">
            <button class="quick-view-btn" onclick="openQuickView('${item.id}')">Quick View</button>
          </div>
        </div>

        <div class="product-content">
          <div>
            <div class="product-meta">
              <span class="product-material">${item.category}</span>
              <div style="display: flex; gap: 0.35rem; align-items: center;">
                <span class="gender-pill">${item.gender === 'both' ? 'Unisex' : item.gender === 'w' ? 'Women' : 'Men'}</span>
                <span class="stock-indicator-live ${isOutOfStock ? 'out-stock' : 'in-stock'}">${isOutOfStock ? 'Sold Out' : (currentStock + ' in stock')}</span>
              </div>
            </div>
            
            <h3 class="product-title">${item.name}</h3>
            ${variantSwatchesHtml}
          </div>

          <div class="product-pricing-row">
            <div class="price-box">
              <span class="current-price">${formatINR(item.offerPrice)}</span>
              <div class="price-strike-line">
                <span class="original-price">${formatINR(item.originalPrice)}</span>
                <span class="save-tag">Save ${formatINR(savings)}</span>
              </div>
            </div>
            
            ${isOutOfStock ? `
              <button class="add-to-cart-btn out-of-stock" disabled title="Item Out of Stock">
                <span>Out of Stock</span>
              </button>
            ` : `
              <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Add</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Color variant switch handler
function selectProductColor(productId, colorName) {
  const item = PRODUCTS.find(p => p.id === productId);
  if (!item || !item.variants) return;
  const variant = item.variants.find(v => v.name === colorName);
  if (!variant) return;

  selectedProductVariants[productId] = variant;
  renderProducts();

  // If quickview is open for this product, sync it too
  const quickViewImg = document.getElementById('quickViewMainImg');
  if (quickViewImg) {
    quickViewImg.src = variant.image;
    document.querySelectorAll('.qv-color-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === colorName);
    });
  }
}

// ===============================================================
// SIDE CATEGORIES DRAWER (MATCHES EXACT 1ST PICTURE)
// ===============================================================
function openSidebarDrawer() {
  const drawer = document.getElementById('sideCategoriesDrawer');
  const overlay = document.getElementById('sideDrawerOverlay');
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }
  if (overlay) {
    overlay.classList.add('open');
  }
  renderDrawerCategories();
  document.body.style.overflow = 'hidden';
}

function closeSidebarDrawer() {
  const drawer = document.getElementById('sideCategoriesDrawer');
  const overlay = document.getElementById('sideDrawerOverlay');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (overlay) {
    overlay.classList.remove('open');
  }
  document.body.style.overflow = '';
}

function filterDrawerByGender(gender) {
  drawerGenderTab = gender;
  document.querySelectorAll('.drawer-tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.gender === gender);
  });
  renderDrawerCategories();
}

function renderDrawerCategories() {
  const container = document.getElementById('drawerCategoryList');
  if (!container) return;

  const relevantProducts = PRODUCTS.filter(p => {
    if (drawerGenderTab === 'w') return p.gender === 'w' || p.gender === 'both';
    if (drawerGenderTab === 'm') return p.gender === 'm' || p.gender === 'both';
    return p.gender === 'w' || p.gender === 'both';
  });

  // Pull all categories according to gender tab
  const categories = ALL_CATEGORIES
    .filter(c => {
      if (drawerGenderTab === 'w') return c.gender === 'w' || c.gender === 'both';
      if (drawerGenderTab === 'm') return c.gender === 'm' || c.gender === 'both';
      return true;
    })
    .map(c => c.name);

  container.innerHTML = categories.map(cat => {
    const isSelected = (cat.toLowerCase() === activeCategoryFilter.toLowerCase());
    const count = relevantProducts.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;

    return `
      <li class="drawer-cat-item ${isSelected ? 'active' : ''}" onclick="handleDrawerCategoryClick('${cat}')">
        <div style="display: flex; align-items: center;">
          <span class="drawer-dot"></span>
          <span>${cat}</span>
        </div>
        <span class="drawer-badge">${count}</span>
      </li>
    `;
  }).join('');
}

function handleDrawerCategoryClick(catKey) {
  openCategoryScreen(catKey, catKey);
}

// ===============================================================
// CART & CHECKOUT
// ===============================================================
function addToCart(productId, qty = 1, chosenVariant = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const currentStock = (typeof product.stock === 'number') ? product.stock : 10;
  if (currentStock <= 0) {
    showToast(`Sorry, "${product.name}" is currently Out of Stock!`);
    return;
  }

  const existingInCartQty = cart
    .filter(item => item.productId === product.id || item.id === product.id || item.id.startsWith(product.id + '_'))
    .reduce((sum, item) => sum + item.qty, 0);

  if (existingInCartQty + qty > currentStock) {
    showToast(`Only ${currentStock} item(s) available in stock for this product!`);
    return;
  }

  const variant = chosenVariant || (product.variants ? (selectedProductVariants[productId] || product.variants[0]) : null);
  const cartItemId = variant ? `${product.id}_${variant.name.toLowerCase()}` : product.id;
  const displayName = variant ? `${product.name} (${variant.name})` : product.name;
  const displayImg = variant ? variant.image : product.image;

  const existingIndex = cart.findIndex(item => item.id === cartItemId);
  if (existingIndex > -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push({
      id: cartItemId,
      productId: product.id,
      name: displayName,
      variantName: variant ? variant.name : null,
      category: product.category,
      price: product.offerPrice,
      image: displayImg,
      qty: qty
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added to Bag: ${displayName}`);
  openCart();
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  if (delta > 0) {
    const product = PRODUCTS.find(p => p.id === item.productId || p.id === item.id || item.id.startsWith(p.id + '_'));
    if (product) {
      const currentStock = (typeof product.stock === 'number') ? product.stock : 10;
      const existingInCartQty = cart
        .filter(c => c.productId === product.id || c.id === product.id || c.id.startsWith(product.id + '_'))
        .reduce((sum, c) => sum + c.qty, 0);

      if (existingInCartQty + delta > currentStock) {
        showToast(`Only ${currentStock} item(s) available in stock!`);
        return;
      }
    }
  }

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  showToast('Item removed from bag');
}

function saveCart() {
  localStorage.setItem('gnapakalu_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartBadge = document.getElementById('cartBadge');
  const cartItemsContainer = document.getElementById('cartItems');
  const subtotalElem = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('cartDiscountRow');
  const discountElem = document.getElementById('cartDiscount');
  const totalElem = document.getElementById('cartTotal');
  const shippingStatus = document.getElementById('shippingStatus');
  const shippingFill = document.getElementById('shippingMeterFill');

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) cartBadge.textContent = totalCount;

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <h4>Your Bag is Empty</h4>
        <p>Explore handcrafted jewellery, resin art, and luxury hampers by Megha.</p>
      </div>
    `;
    if (subtotalElem) subtotalElem.textContent = formatINR(0);
    if (totalElem) totalElem.textContent = formatINR(0);
    if (discountRow) discountRow.style.display = 'none';
    if (shippingStatus) shippingStatus.innerHTML = `Add <strong>${formatINR(FREE_SHIPPING_THRESHOLD_INR)}</strong> more for <strong>Free Delivery across India</strong>`;
    if (shippingFill) shippingFill.style.width = '0%';
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h5>${item.name}</h5>
        <div class="cart-item-variant">${item.category}</div>
        <div class="cart-qty-ctrl">
          <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', -1)">−</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">
        <span class="cart-item-subtotal">${formatINR(item.price * item.qty)}</span>
        <button class="cart-item-remove" onclick="removeCartItem('${item.id}')">Remove</button>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = 0;
  if (appliedPromo) {
    discount = Math.round(subtotal * (appliedPromo.discountPercent / 100));
  }

  // Calculate dynamic courier charge
  const shippingInfo = getShippingDetails(currentShippingPincode, currentShippingZone);
  const courierCharge = shippingInfo.fee;
  const grandTotal = Math.max(0, subtotal - discount + courierCharge);

  if (subtotalElem) subtotalElem.textContent = formatINR(subtotal);
  if (totalElem) totalElem.textContent = formatINR(grandTotal);

  // Update dynamic shipping rate line and notice badge
  const cartDeliveryCharge = document.getElementById('cartDeliveryCharge');
  if (cartDeliveryCharge) {
    cartDeliveryCharge.textContent = formatINR(courierCharge);
  }

  const shippingZoneBadge = document.getElementById('shippingZoneBadge');
  if (shippingZoneBadge) {
    shippingZoneBadge.innerHTML = `📦 ${shippingInfo.label}: <strong>${formatINR(courierCharge)}/-</strong>`;
  }

  if (discountRow && discountElem) {
    if (appliedPromo && discount > 0) {
      discountRow.style.display = 'flex';
      discountElem.textContent = `-${formatINR(discount)} (${appliedPromo.code})`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (shippingStatus && shippingFill) {
    shippingStatus.innerHTML = `📍 <strong>Courier to ${shippingInfo.label}:</strong> ${formatINR(courierCharge)}/- applied`;
    shippingFill.style.width = '100%';
  }
}

function openCart() {
  updateCartUI();
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }
  if (overlay) {
    overlay.classList.add('open');
  }
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (overlay) {
    overlay.classList.remove('open');
  }
  document.body.style.overflow = '';
}

// Global escape key listener to close drawers and modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeCart();
    closeSidebarDrawer();
    closeModal();
    closeManagementPortal();
    closePinModal();
    closeChangePinModal();
  }
});

// WISHLIST
function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    wishlist.push(productId);
    showToast('Saved to your wishlist! 💖');
  }
  localStorage.setItem('gnapakalu_wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
  renderProducts();
}

function updateWishlistCount() {
  const badge = document.getElementById('wishlistBadge');
  if (badge) badge.textContent = wishlist.length;
}

// QUICK VIEW MODAL
function openQuickView(productId) {
  const item = PRODUCTS.find(p => p.id === productId);
  if (!item) return;

  const content = document.getElementById('quickViewContent');
  if (!content) return;

  const savings = item.originalPrice - item.offerPrice;
  const discountPercent = Math.round((savings / item.originalPrice) * 100);

  const activeVariant = item.variants ? (selectedProductVariants[item.id] || item.variants[0]) : null;
  const currentImg = activeVariant ? activeVariant.image : item.image;
  const currentStock = (typeof item.stock === 'number') ? item.stock : 10;
  const isOutOfStock = currentStock <= 0;

  const variantPickerHtml = item.variants ? `
    <div style="margin: 1rem 0;">
      <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-main); display: block; margin-bottom: 0.4rem;">
        Select Color: <span id="qvSelectedColorName" style="color: var(--color-primary-dark);">${activeVariant.name}</span>
      </span>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${item.variants.map(v => {
          const isSelected = activeVariant && activeVariant.name === v.name;
          return `
            <button type="button" class="color-swatch-btn qv-color-btn ${isSelected ? 'active' : ''}" 
                    data-color="${v.name}"
                    onclick="selectProductColor('${item.id}', '${v.name}')">
              <span class="color-circle" style="background-color: ${v.color};"></span>
              <span>${v.name}</span>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  ` : '';

  content.innerHTML = `
    <div class="quickview-content">
      <div>
        <img src="${currentImg}" alt="${item.name}" id="quickViewMainImg" class="quickview-img">
      </div>
      <div class="quickview-details">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
          <span class="gender-pill">${item.category} • ${item.gender === 'both' ? 'Unisex' : item.gender === 'w' ? 'Women' : 'Men'}</span>
          <span class="stock-indicator-live ${isOutOfStock ? 'out-stock' : 'in-stock'}">${isOutOfStock ? 'Out of Stock' : (currentStock + ' in stock')}</span>
        </div>
        <h2>${item.name}</h2>
        
        <div class="quickview-price-box" style="margin: 0.75rem 0;">
          <div style="font-size: 1.7rem; font-weight: 800; color: var(--color-primary-dark); line-height: 1.1;">
            ${formatINR(item.offerPrice)}
          </div>
          <div class="price-strike-line" style="margin-top: 0.25rem;">
            <span class="original-price" style="font-size: 0.95rem;">${formatINR(item.originalPrice)}</span>
            <span class="save-tag" style="font-size: 0.8rem; background: var(--color-accent-pink); color: #fff; padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">Save ${formatINR(savings)} (${discountPercent}% OFF)</span>
          </div>
        </div>

        ${variantPickerHtml}

        <p class="quickview-desc">${item.description}</p>

        <ul class="quickview-spec-list">
          <li><strong>Crafted By:</strong> Gnapakalu by Megha</li>
          <li><strong>Material:</strong> 100% Waterproof Stainless Steel / Anti-Tarnish PVD</li>
          <li><strong>Packaging:</strong> Premium Velvet Gift Case & Handwritten Card</li>
          <li><strong>Guarantee:</strong> Zero Blackening, Zero Skin Irritation</li>
        </ul>

        <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1.5rem;">
          ${isOutOfStock ? `
            <button class="checkout-btn out-of-stock" disabled style="flex-grow: 1; margin-top: 0; background: #e2e8f0; color: #64748b; cursor: not-allowed; box-shadow: none;">
              Out of Stock
            </button>
          ` : `
            <button class="checkout-btn" style="flex-grow: 1; margin-top: 0;" onclick="addToCart('${item.id}'); closeModal();">
              Add to Bag (${formatINR(item.offerPrice)})
            </button>
          `}
          
          <button class="icon-btn" onclick="toggleWishlist('${item.id}')" title="Save to Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${wishlist.includes(item.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modalOverlay')?.classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay')?.classList.remove('open');
}

// CHECKOUT SIMULATION WITH REAL-TIME STOCK INVENTORY REDUCTION
function handleCheckout() {
  if (cart.length === 0) {
    showToast('Your bag is empty!');
    return;
  }

  // 1. DEDUCT ITEM QUANTITY FROM PRODUCT STOCK ON SUCCESSFUL ORDER PLACEMENT
  cart.forEach(cartItem => {
    const baseId = cartItem.productId || cartItem.id.split('_')[0];
    const prod = PRODUCTS.find(p => p.id === baseId || p.id === cartItem.id);
    if (prod) {
      const currentStock = (typeof prod.stock === 'number') ? prod.stock : 10;
      prod.stock = Math.max(0, currentStock - cartItem.qty);
    }
  });

  // Save stock deduction immediately to localStorage and refresh live views
  saveProducts();

  const orderNum = Math.floor(100000 + Math.random() * 900000);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = 0;
  if (appliedPromo) {
    discount = Math.round(subtotal * (appliedPromo.discountPercent / 100));
  }
  const shippingInfo = getShippingDetails(currentShippingPincode, currentShippingZone);
  const total = formatINR(Math.max(0, subtotal - discount + shippingInfo.fee));

  closeCart();

  const content = document.getElementById('quickViewContent');
  if (!content) return;

  content.innerHTML = `
    <div style="padding: 2.5rem 1.5rem; text-align: center;">
      <div style="width: 72px; height: 72px; background: var(--color-primary-soft); color: var(--color-primary-dark); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">
        ✨
      </div>
      <h2 style="font-family: var(--font-serif); font-size: 1.9rem; margin-bottom: 0.5rem;">Order Placed Successfully!</h2>
      <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
        Thank you for supporting <strong>Gnapakalu by Megha</strong>! Your pieces are entering velvet packaging.
      </p>
      
      <div style="background: var(--color-bg); padding: 1.25rem; border-radius: var(--radius-md); max-width: 420px; margin: 0 auto 2rem; text-align: left; font-size: 0.88rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: var(--color-text-muted);">Order ID:</span>
          <strong>#GNAP-${orderNum}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: var(--color-text-muted);">Courier Destination:</span>
          <strong>${shippingInfo.label}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: var(--color-text-muted);">Courier Fee:</span>
          <strong>${formatINR(shippingInfo.fee)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; border-top: 1px dashed var(--color-border); padding-top: 0.4rem;">
          <span style="color: var(--color-text-muted);">Total Paid:</span>
          <strong style="color: var(--color-primary-dark); font-size: 1.05rem;">${total}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--color-text-muted);">Estimated Delivery:</span>
          <strong>2-4 Business Days</strong>
        </div>
      </div>

      <button class="checkout-btn" onclick="cart = []; saveCart(); updateCartUI(); closeModal();" style="max-width: 280px; margin: 0 auto;">
        Continue Shopping
      </button>
    </div>
  `;

  document.getElementById('modalOverlay')?.classList.add('open');
}

// TOASTS
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>🌸</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ===============================================================
// STORE OWNER MANAGEMENT PORTAL PIN & CLOUD CROSS-DEVICE SYNC
// (Isolated dedicated cloud endpoint, 100% separate from KAFF)
// ===============================================================
const CLOUD_KV_APP_KEY = '0l303heb';
const CLOUD_PIN_KEY = 'portal_pin';
const DEFAULT_MGMT_PIN = '1234';

let currentMgmtPin = localStorage.getItem('gnapakalu_mgmt_pin') || DEFAULT_MGMT_PIN;
let isOwnerAuthenticated = false;
let mgmtUploadedImageDataUrl = '';

// Synchronize PIN with Cloud so changes reflect immediately across all devices
async function syncPinFromCloud() {
  try {
    const res = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${CLOUD_KV_APP_KEY}/${CLOUD_PIN_KEY}`);
    if (res.ok) {
      const cloudPin = await res.json();
      if (cloudPin && typeof cloudPin === 'string' && cloudPin.trim()) {
        currentMgmtPin = cloudPin.trim();
        localStorage.setItem('gnapakalu_mgmt_pin', currentMgmtPin);
      }
    }
  } catch (err) {
    console.warn('Using offline/cached PIN:', err);
  }
}

// MANAGEMENT PORTAL ENTRY POINT
function openManagementPortal() {
  if (isOwnerAuthenticated) {
    showPortalModal();
  } else {
    syncPinFromCloud();
    openPinModal();
  }
}

function openPinModal() {
  const overlay = document.getElementById('mgmtPinOverlay');
  const input = document.getElementById('mgmtPinInput');
  const errorMsg = document.getElementById('mgmtPinErrorMsg');
  if (errorMsg) errorMsg.style.display = 'none';
  if (input) {
    input.value = '';
    input.type = 'password';
  }
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => input?.focus(), 150);
}

function closePinModal() {
  const overlay = document.getElementById('mgmtPinOverlay');
  if (overlay) overlay.classList.remove('open');
  if (!isOwnerAuthenticated) {
    document.body.style.overflow = '';
  }
}

function closePinModalOnBackdrop(e) {
  if (e.target.id === 'mgmtPinOverlay') {
    closePinModal();
  }
}

function togglePinVisibility() {
  const input = document.getElementById('mgmtPinInput');
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

async function verifyManagementPin(e) {
  e.preventDefault();
  const input = document.getElementById('mgmtPinInput');
  const errorMsg = document.getElementById('mgmtPinErrorMsg');
  const enteredPin = input ? input.value.trim() : '';

  // Double-check with cloud to make sure we have the latest PIN from other devices
  await syncPinFromCloud();

  if (enteredPin === currentMgmtPin) {
    isOwnerAuthenticated = true;
    closePinModal();
    showPortalModal();
    showToast('Authenticated! Welcome to Store Management');
  } else {
    if (errorMsg) {
      errorMsg.textContent = 'Incorrect PIN. Please try again.';
      errorMsg.style.display = 'block';
    }
    if (input) {
      input.value = '';
      input.focus();
    }
  }
}

// CHANGE PIN FUNCTIONS
function openChangePinModal() {
  const overlay = document.getElementById('mgmtChangePinOverlay');
  const form = document.getElementById('mgmtChangePinForm');
  const errorMsg = document.getElementById('mgmtChangePinErrorMsg');
  if (form) form.reset();
  if (errorMsg) errorMsg.style.display = 'none';
  if (overlay) overlay.classList.add('open');
}

function closeChangePinModal() {
  const overlay = document.getElementById('mgmtChangePinOverlay');
  if (overlay) overlay.classList.remove('open');
}

function closeChangePinOnBackdrop(e) {
  if (e.target.id === 'mgmtChangePinOverlay') {
    closeChangePinModal();
  }
}

async function handleChangePinSubmit(e) {
  e.preventDefault();
  const currentInput = document.getElementById('mgmtCurrentPinInput');
  const newInput = document.getElementById('mgmtNewPinInput');
  const confirmInput = document.getElementById('mgmtConfirmPinInput');
  const errorMsg = document.getElementById('mgmtChangePinErrorMsg');
  const submitBtn = document.getElementById('mgmtSavePinBtn');

  const curr = currentInput ? currentInput.value.trim() : '';
  const next = newInput ? newInput.value.trim() : '';
  const conf = confirmInput ? confirmInput.value.trim() : '';

  if (curr !== currentMgmtPin) {
    if (errorMsg) {
      errorMsg.textContent = 'Current PIN is incorrect.';
      errorMsg.style.display = 'block';
    }
    return;
  }

  if (next.length < 4) {
    if (errorMsg) {
      errorMsg.textContent = 'New PIN must be at least 4 digits.';
      errorMsg.style.display = 'block';
    }
    return;
  }

  if (next !== conf) {
    if (errorMsg) {
      errorMsg.textContent = 'New PIN and Confirm PIN do not match.';
      errorMsg.style.display = 'block';
    }
    return;
  }

  // Update in local state and storage
  currentMgmtPin = next;
  localStorage.setItem('gnapakalu_mgmt_pin', currentMgmtPin);

  // Sync to Cloud KV so all other devices can access with the new PIN
  if (submitBtn) submitBtn.textContent = 'Syncing...';
  try {
    await fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${CLOUD_KV_APP_KEY}/${CLOUD_PIN_KEY}/${encodeURIComponent(currentMgmtPin)}`, {
      method: 'POST'
    });
  } catch (err) {
    console.warn('Cloud sync warning:', err);
  } finally {
    if (submitBtn) submitBtn.textContent = 'Save & Sync PIN';
  }

  closeChangePinModal();
  showToast(`Access PIN updated to ${currentMgmtPin} and synced live across devices! 🔐`);
}

// SHOW MANAGEMENT PORTAL DASHBOARD
function showPortalModal() {
  populateMgmtCategories();
  updateMgmtLiveBadge();
  renderMgmtProductsTable();
  const overlay = document.getElementById('mgmtModalOverlay');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeManagementPortal() {
  const overlay = document.getElementById('mgmtModalOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeManagementPortalOnBackdrop(e) {
  if (e.target.id === 'mgmtModalOverlay') {
    closeManagementPortal();
  }
}

function switchMgmtTab(tab) {
  const formContent = document.getElementById('mgmtTabContentForm');
  const listContent = document.getElementById('mgmtTabContentList');
  const formBtn = document.getElementById('mgmtTabBtnForm');
  const listBtn = document.getElementById('mgmtTabBtnList');

  if (tab === 'form') {
    if (formContent) formContent.style.display = 'block';
    if (listContent) listContent.style.display = 'none';
    if (formBtn) formBtn.classList.add('active');
    if (listBtn) listBtn.classList.remove('active');
  } else {
    if (formContent) formContent.style.display = 'none';
    if (listContent) listContent.style.display = 'block';
    if (formBtn) formBtn.classList.remove('active');
    if (listBtn) listBtn.classList.add('active');
    renderMgmtProductsTable();
  }
}

function populateMgmtCategories() {
  const select = document.getElementById('mgmtProdCategory');
  if (!select) return;

  const catNames = [...new Set(ALL_CATEGORIES.map(c => c.name))];
  select.innerHTML = catNames.map(c => `<option value="${c}">${c}</option>`).join('') +
    `<option value="__custom__">+ Enter Custom Category...</option>`;
}

function handleMgmtCategoryChange(val) {
  const customInput = document.getElementById('mgmtProdCustomCat');
  if (!customInput) return;
  if (val === '__custom__') {
    customInput.style.display = 'block';
    customInput.focus();
  } else {
    customInput.style.display = 'none';
    customInput.value = '';
  }
}

function autoCalculateOriginalPrice(val) {
  const offer = parseInt(val, 10);
  const origInput = document.getElementById('mgmtProdOriginalPrice');
  if (!isNaN(offer) && offer > 0 && origInput) {
    origInput.value = offer + 200; // Formula: User price + 200
  }
}

function handleMgmtImageUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    mgmtUploadedImageDataUrl = event.target.result;
    showMgmtImagePreview(mgmtUploadedImageDataUrl);
    const urlInput = document.getElementById('mgmtProdImageUrl');
    if (urlInput) urlInput.value = '';
  };
  reader.readAsDataURL(file);
}

function handleMgmtImageUrl(url) {
  if (url && url.trim()) {
    mgmtUploadedImageDataUrl = url.trim();
    showMgmtImagePreview(mgmtUploadedImageDataUrl);
  }
}

function showMgmtImagePreview(src) {
  const img = document.getElementById('mgmtImagePreviewImg');
  const placeholder = document.getElementById('mgmtImagePreviewPlaceholder');
  if (img && placeholder) {
    img.src = src;
    img.style.display = 'block';
    placeholder.style.display = 'none';
  }
}

function handleMgmtFormSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('mgmtEditProductId').value;
  const name = document.getElementById('mgmtProdName').value.trim();
  const gender = document.getElementById('mgmtProdGender').value;
  let category = document.getElementById('mgmtProdCategory').value;

  if (category === '__custom__') {
    const customVal = document.getElementById('mgmtProdCustomCat').value.trim();
    if (!customVal) {
      showToast('Please type a name for your custom category');
      return;
    }
    category = customVal;
    if (!ALL_CATEGORIES.some(c => c.name.toLowerCase() === category.toLowerCase())) {
      ALL_CATEGORIES.push({ name: category, gender: gender });
    }
  }

  const offerPrice = parseInt(document.getElementById('mgmtProdOfferPrice').value, 10);
  let originalPrice = parseInt(document.getElementById('mgmtProdOriginalPrice').value, 10);
  if (isNaN(originalPrice) || originalPrice <= 0) {
    originalPrice = offerPrice + 200;
  }

  const stock = Math.max(0, parseInt(document.getElementById('mgmtProdStock').value, 10) || 0);
  const badge = document.getElementById('mgmtProdBadge').value.trim() || 'Handcrafted';
  const desc = document.getElementById('mgmtProdDesc').value.trim() || `Handcrafted ${category} designed with love by Megha.`;

  const image = mgmtUploadedImageDataUrl || 'assets/products/golden_heart_necklace.jpg';

  if (!name || isNaN(offerPrice) || offerPrice <= 0) {
    showToast('Please enter a valid product name and offer price');
    return;
  }

  if (editId) {
    // EDIT EXISTING LIVE PRODUCT
    const existing = PRODUCTS.find(p => p.id === editId);
    if (existing) {
      existing.name = name;
      existing.gender = gender;
      existing.category = category;
      existing.offerPrice = offerPrice;
      existing.originalPrice = originalPrice;
      existing.stock = stock;
      existing.badge = badge;
      if (mgmtUploadedImageDataUrl) existing.image = image;
      existing.description = desc;
      showToast(`Product "${name}" updated successfully!`);
    }
  } else {
    // ADD NEW PRODUCT
    const newProduct = {
      id: 'prod_' + Date.now(),
      name,
      category,
      gender,
      offerPrice,
      originalPrice,
      stock,
      badge,
      image,
      description: desc,
      tags: [category, gender === 'w' ? 'Women' : gender === 'm' ? 'Men' : 'Unisex']
    };
    PRODUCTS.unshift(newProduct);
    showToast(`Product "${name}" published to live website!`);
  }

  cancelProductEditing();
  saveProducts();
  switchMgmtTab('list');
}

function cancelProductEditing() {
  document.getElementById('mgmtProductForm')?.reset();
  document.getElementById('mgmtEditProductId').value = '';
  document.getElementById('mgmtTabFormLabel').textContent = '➕ Add New Product';
  document.getElementById('mgmtSubmitBtn').innerHTML = '<span>💾 Save & Publish to Live Website</span>';
  document.getElementById('mgmtCancelEditBtn').style.display = 'none';
  document.getElementById('mgmtProdCustomCat').style.display = 'none';

  mgmtUploadedImageDataUrl = '';
  const img = document.getElementById('mgmtImagePreviewImg');
  const placeholder = document.getElementById('mgmtImagePreviewPlaceholder');
  if (img) { img.src = ''; img.style.display = 'none'; }
  if (placeholder) placeholder.style.display = 'block';
}

function editProductInPortal(productId) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;

  switchMgmtTab('form');
  populateMgmtCategories();

  document.getElementById('mgmtEditProductId').value = p.id;
  document.getElementById('mgmtProdName').value = p.name;
  document.getElementById('mgmtProdGender').value = p.gender;

  const catSelect = document.getElementById('mgmtProdCategory');
  if ([...catSelect.options].some(o => o.value === p.category)) {
    catSelect.value = p.category;
    document.getElementById('mgmtProdCustomCat').style.display = 'none';
  } else {
    catSelect.value = '__custom__';
    const customIn = document.getElementById('mgmtProdCustomCat');
    customIn.style.display = 'block';
    customIn.value = p.category;
  }

  document.getElementById('mgmtProdOfferPrice').value = p.offerPrice;
  document.getElementById('mgmtProdOriginalPrice').value = p.originalPrice;
  document.getElementById('mgmtProdStock').value = (typeof p.stock === 'number') ? p.stock : 10;
  document.getElementById('mgmtProdBadge').value = p.badge || '';
  document.getElementById('mgmtProdDesc').value = p.description || '';

  mgmtUploadedImageDataUrl = p.image;
  showMgmtImagePreview(p.image);

  document.getElementById('mgmtTabFormLabel').textContent = '✏️ Edit: ' + p.name;
  document.getElementById('mgmtSubmitBtn').innerHTML = '<span>💾 Save Changes to Live Website</span>';
  document.getElementById('mgmtCancelEditBtn').style.display = 'inline-block';
}

function deleteProductInPortal(productId) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;
  if (!confirm(`Are you sure you want to permanently remove "${p.name}" from the live store?`)) return;

  PRODUCTS = PRODUCTS.filter(item => item.id !== productId);
  saveProducts();
  renderMgmtProductsTable();
  showToast(`Product "${p.name}" removed from store`);
}

function adjustStockInline(productId, delta) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;
  const curr = (typeof p.stock === 'number') ? p.stock : 10;
  p.stock = Math.max(0, curr + delta);
  saveProducts();
  renderMgmtProductsTable();
  showToast(`Stock for "${p.name}" updated to ${p.stock}!`);
}

function setStockInline(productId, val) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;
  p.stock = Math.max(0, parseInt(val, 10) || 0);
  saveProducts();
  renderMgmtProductsTable();
  showToast(`Stock for "${p.name}" set to ${p.stock}!`);
}

function renderMgmtProductsTable() {
  const wrapper = document.getElementById('mgmtProductsTableWrapper');
  if (!wrapper) return;

  const search = (document.getElementById('mgmtSearchInput')?.value || '').toLowerCase().trim();
  const genderFilter = document.getElementById('mgmtFilterGender')?.value || 'all';
  const stockFilter = document.getElementById('mgmtFilterStock')?.value || 'all';

  let list = PRODUCTS.filter(p => {
    if (genderFilter !== 'all' && p.gender !== genderFilter) return false;
    const stock = (typeof p.stock === 'number') ? p.stock : 10;
    if (stockFilter === 'in_stock' && stock <= 0) return false;
    if (stockFilter === 'out_of_stock' && stock > 0) return false;
    if (search) {
      return p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
    }
    return true;
  });

  if (list.length === 0) {
    wrapper.innerHTML = `
      <div style="padding: 2.5rem 1rem; text-align: center; color: var(--color-text-muted);">
        <p>No products match your search or filter.</p>
      </div>
    `;
    return;
  }

  wrapper.innerHTML = `
    <table class="mgmt-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Section</th>
          <th>Offer Price</th>
          <th>Stock Quantity</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${list.map(p => {
          const stock = (typeof p.stock === 'number') ? p.stock : 10;
          const isOut = stock <= 0;
          const genderLabel = p.gender === 'w' ? 'Women' : p.gender === 'm' ? 'Men' : 'Unisex';

          return `
            <tr class="mgmt-prod-row">
              <td>
                <div class="mgmt-item-info">
                  <img src="${p.image}" alt="${p.name}" class="mgmt-thumb">
                  <div>
                    <div class="mgmt-item-name">${p.name}</div>
                    <div class="mgmt-item-cat">${p.category}</div>
                  </div>
                </div>
              </td>
              <td>
                <span class="gender-pill">${genderLabel}</span>
              </td>
              <td>
                <strong>${formatINR(p.offerPrice)}</strong>
                <div style="font-size: 0.72rem; color: #9482a3; text-decoration: line-through;">${formatINR(p.originalPrice)}</div>
              </td>
              <td>
                <div class="mgmt-stock-control">
                  <button type="button" class="mgmt-stock-btn" onclick="adjustStockInline('${p.id}', -1)" title="Decrease stock">−</button>
                  <input type="number" class="mgmt-stock-num" min="0" value="${stock}" onchange="setStockInline('${p.id}', this.value)" aria-label="Stock">
                  <button type="button" class="mgmt-stock-btn" onclick="adjustStockInline('${p.id}', 1)" title="Increase stock">+</button>
                </div>
              </td>
              <td>
                <span class="mgmt-stock-status-pill ${isOut ? 'out-of-stock' : 'in-stock'}">
                  ${isOut ? 'Out of Stock' : (stock + ' In Stock')}
                </span>
              </td>
              <td>
                <div class="mgmt-actions-cell">
                  <button type="button" class="mgmt-btn-edit" onclick="editProductInPortal('${p.id}')">✏️ Edit</button>
                  <button type="button" class="mgmt-btn-del" onclick="deleteProductInPortal('${p.id}')" title="Delete">🗑️</button>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

function updateMgmtLiveBadge() {
  const badge = document.getElementById('mgmtLiveCountBadge');
  if (badge) badge.textContent = PRODUCTS.length;
}

function resetToFactoryProducts() {
  if (!confirm('Reset store back to the initial 6 handcrafted products? Any newly created items will be replaced.')) return;
  PRODUCTS = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  saveProducts();
  renderMgmtProductsTable();
  showToast('Store reset to factory default products');
}
