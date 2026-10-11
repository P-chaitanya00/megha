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

const PRODUCTS = [
  {
    id: 'anti_heart_chain',
    name: '18K Gold Plated Heart Snake Chain Necklace',
    category: 'Antitarnish jewellery',
    gender: 'w',
    offerPrice: 199,
    originalPrice: 399,
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
    originalPrice: 549, // 349 + 200 rule
    badge: 'Stainless Steel',
    image: 'assets/products/bamboo_bangle_black.jpg',
    description: 'Minimalist luxury bamboo segment joint bangle crafted in anti-tarnish waterproof stainless steel. Features a secure push clasp mechanism. Available in Jet Black, Rich Gold, and Ivory White.',
    tags: ['Stainless Steel', 'Bamboo Bangle', 'Waterproof', 'Color Variants'],
    variants: [
      { name: 'Black', color: '#1a1a1a', image: 'assets/products/bamboo_bangle_black.jpg' },
      { name: 'Gold', color: '#d4af37', image: 'assets/products/bamboo_bangle_gold.jpg' },
      { name: 'White', color: '#ffffff', image: 'assets/products/bamboo_bangle_white.jpg' }
    ]
  }
];

// Active color selection state mapped by product ID
const selectedProductVariants = {
  bamboo_joint_bangle: { name: 'Black', color: '#1a1a1a', image: 'assets/products/bamboo_bangle_black.jpg' }
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
  renderDrawerCategories();
  updateCartUI();
  updateWishlistCount();
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

  // Infer gender based on category
  const item = PRODUCTS.find(p => p.category === categoryName);
  activeGenderTab = item ? item.gender : 'all';

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
// SUBCATEGORY FILTER CHIPS (IN SCREEN 2) - ONLY SPECIFIC CATEGORIES
// ===============================================================
function renderSubcategoryFilterChips() {
  const container = document.getElementById('subcategoriesFilterBar');
  if (!container) return;

  const relevantProducts = PRODUCTS.filter(p => {
    if (activeGenderTab === 'w') return p.gender === 'w' || p.gender === 'both';
    if (activeGenderTab === 'm') return p.gender === 'm' || p.gender === 'both';
    return p.gender === 'w' || p.gender === 'both';
  });

  // Only specific categories for that collection (Zero 'All' chip)
  const categories = [...new Set(relevantProducts.map(p => p.category))];

  container.innerHTML = categories.map(cat => {
    const isSelected = (cat === activeCategoryFilter);
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
      <div class="product-card" id="card-${item.id}">
        <div class="product-image-container">
          <img src="${currentImg}" alt="${item.name}" id="img-${item.id}" class="product-img" loading="lazy" />
          
          <div class="card-badges">
            <span class="badge-tag-discount">${discountPercent}% OFF</span>
            <span class="badge-tag-feature">${item.badge}</span>
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
              <span class="gender-pill">${item.gender === 'both' ? 'Unisex' : item.gender === 'w' ? 'Women' : 'Men'}</span>
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
            
            <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Add</span>
            </button>
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

  // Only specific categories for that gender (No 'All Creations')
  const categories = [...new Set(relevantProducts.map(p => p.category))];

  container.innerHTML = categories.map(cat => {
    const isSelected = (cat === activeCategoryFilter);
    const count = relevantProducts.filter(p => p.category === cat).length;

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

// Global escape key listener to close cart drawer and quick view modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeCart();
    closeSidebarDrawer();
    closeModal();
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
        <span class="gender-pill" style="margin-bottom: 0.5rem; display: inline-block;">${item.category} • ${item.gender === 'both' ? 'Unisex' : item.gender === 'w' ? 'Women' : 'Men'}</span>
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
          <button class="checkout-btn" style="flex-grow: 1; margin-top: 0;" onclick="addToCart('${item.id}'); closeModal();">
            Add to Bag (${formatINR(item.offerPrice)})
          </button>
          
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

// CHECKOUT SIMULATION
function handleCheckout() {
  if (cart.length === 0) {
    showToast('Your bag is empty!');
    return;
  }

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
