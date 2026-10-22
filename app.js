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

function saveProductsLocalOnly() {
  try {
    localStorage.setItem('gnapakalu_products', JSON.stringify(PRODUCTS));
  } catch (errQuota) {
    console.warn('localStorage quota exceeded or blocked; maintaining in-memory:', errQuota);
  }
  renderProducts();
  renderDrawerCategories();
  renderSubcategoryFilterChips();
  updateMgmtLiveBadge();
  if (typeof isOwnerAuthenticated !== 'undefined' && isOwnerAuthenticated) {
    renderMgmtProductsTable();
  }
}

function saveProducts() {
  saveProductsLocalOnly();
  syncProductsToCloud(PRODUCTS);
}

// ===============================================================
// CLOUD STORE SYNCHRONIZATION ENGINE (REAL-TIME CROSS-DEVICE)
// Synchronizes Products, Customer Orders & Owner PIN across all devices
// ===============================================================
const CLOUD_SYNC_API = '/api/sync-products';
const CLOUD_GIST_URL = 'https://api.github.com/gists/76c5b055af394e1a6b4e7f6b75f34ed4';
let isSyncingStore = false;

async function syncStoreFromCloud(isUserInitiated = false) {
  if (isSyncingStore) return;
  isSyncingStore = true;
  try {
    const badge = document.getElementById('mgmtSyncStatusBadge');
    if (badge && isUserInitiated) badge.textContent = '🔄 Syncing cloud...';

    let cloudData = null;

    // 1. Try Vercel Serverless Function first (Returns { success: true, products: [...], orders: [...], pin: "..." })
    try {
      const res = await fetch(CLOUD_SYNC_API + '?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          cloudData = json;
        }
      }
    } catch (e) {
      console.warn('API sync endpoint fallback to Gist:', e);
    }

    // 2. Direct GitHub Gist fallback
    if (!cloudData) {
      try {
        const gRes = await fetch(CLOUD_GIST_URL + '?t=' + Date.now(), { cache: 'no-store' });
        if (gRes.ok) {
          const gData = await gRes.json();
          const files = gData.files || {};
          
          async function parseGistFile(fileObj) {
            if (!fileObj) return null;
            if (!fileObj.truncated && fileObj.content) {
              try { return JSON.parse(fileObj.content); } catch (e) {}
            }
            if (fileObj.raw_url) {
              try {
                const r = await fetch(fileObj.raw_url, { cache: 'no-store' });
                if (r.ok) return await r.json();
              } catch (e) {}
            }
            if (fileObj.content) {
              try { return JSON.parse(fileObj.content); } catch (e) {}
            }
            return null;
          }

          const p = (await parseGistFile(files['gnapakalu_products.json'])) || [];
          const o = (await parseGistFile(files['gnapakalu_orders.json'])) || [];
          const s = (await parseGistFile(files['gnapakalu_settings.json'])) || { pin: '1234' };
          
          cloudData = {
            products: Array.isArray(p) ? p : [],
            orders: Array.isArray(o) ? o : [],
            pin: (s && typeof s.pin === 'string' && s.pin.trim().length >= 4) ? s.pin.trim() : '1234'
          };
        }
      } catch (ge) {
        console.warn('Gist direct sync fallback error:', ge);
      }
    }

    // 3. Fallback to static products.json if cloud sync returned nothing and PRODUCTS is small
    if (!cloudData && (!PRODUCTS || PRODUCTS.length <= 6)) {
      try {
        const staticRes = await fetch('products.json?v=' + Date.now());
        if (staticRes.ok) {
          const staticProds = await staticRes.json();
          if (Array.isArray(staticProds) && staticProds.length > 0) {
            cloudData = { products: staticProds, orders: [], pin: '7890' };
          }
        }
      } catch (se) {}
    }

    if (cloudData) {
      // --- A. SYNC PRODUCTS & INVENTORY ---
      if (Array.isArray(cloudData.products) && cloudData.products.length > 0) {
        const prodMap = new Map();
        cloudData.products.forEach(p => {
          if (p && p.id) {
            if (typeof p.stock !== 'number' || isNaN(p.stock)) p.stock = 10;
            if (p.category && !ALL_CATEGORIES.some(c => c.name.toLowerCase() === p.category.toLowerCase())) {
              ALL_CATEGORIES.push({ name: p.category, gender: p.gender || 'both' });
            }
            prodMap.set(p.id, p);
          }
        });

        // Retain any locally added products that haven't reached cloud yet
        if (Array.isArray(PRODUCTS)) {
          PRODUCTS.forEach(p => {
            if (p && p.id && !prodMap.has(p.id)) {
              prodMap.set(p.id, p);
            }
          });
        }

        const mergedProducts = Array.from(prodMap.values());
        PRODUCTS = mergedProducts;
        try {
          localStorage.setItem('gnapakalu_products', JSON.stringify(PRODUCTS));
        } catch (errQuota) {
          console.warn('localStorage quota reached when caching cloud products:', errQuota);
        }

        renderProducts();
        renderDrawerCategories();
        renderSubcategoryFilterChips();
        updateMgmtLiveBadge();
        if (typeof isOwnerAuthenticated !== 'undefined' && isOwnerAuthenticated) {
          renderMgmtProductsTable();
        }

        // If local products had items not yet in cloud, push merged list
        if (mergedProducts.length > cloudData.products.length) {
          console.log(`Pushing ${mergedProducts.length - cloudData.products.length} local un-synced products to cloud...`);
          syncProductsToCloud(mergedProducts);
        }
      }

      // --- B. SYNC & MERGE CUSTOMER ORDERS ---
      let localOrders = [];
      try {
        localOrders = JSON.parse(localStorage.getItem('gnapakalu_customer_orders') || '[]');
      } catch (e) { localOrders = []; }

      const cloudOrders = Array.isArray(cloudData.orders) ? cloudData.orders : [];
      
      // Merge unique orders by orderId (keep most recent orders first)
      const orderMap = new Map();
      // Add local orders first (preserving laptop's 4 existing orders)
      localOrders.forEach(ord => {
        if (ord && ord.orderId) orderMap.set(ord.orderId, ord);
      });
      // Add or update with cloud orders
      cloudOrders.forEach(ord => {
        if (ord && ord.orderId) orderMap.set(ord.orderId, ord);
      });

      const mergedOrders = Array.from(orderMap.values());
      // Sort orders descending by order date/id
      mergedOrders.sort((a, b) => {
        const timeA = new Date(a.orderDate).getTime() || 0;
        const timeB = new Date(b.orderDate).getTime() || 0;
        return timeB - timeA;
      });

      localStorage.setItem('gnapakalu_customer_orders', JSON.stringify(mergedOrders));
      if (typeof updateMgmtOrdersCount === 'function') updateMgmtOrdersCount();
      if (typeof isOwnerAuthenticated !== 'undefined' && isOwnerAuthenticated) {
        const ordersTab = document.getElementById('mgmtTabContentOrders');
        if (ordersTab && ordersTab.style.display !== 'none' && typeof renderMgmtOrdersTable === 'function') {
          renderMgmtOrdersTable();
        }
      }

      // If local orders had orders not yet in the cloud, push merged list back to cloud
      if (mergedOrders.length > cloudOrders.length) {
        console.log(`Pushing ${mergedOrders.length - cloudOrders.length} local un-synced orders to cloud...`);
        syncOrdersToCloud(mergedOrders);
      }

      // --- C. SYNC OWNER ACCESS PIN ---
      if (cloudData.pin && typeof cloudData.pin === 'string' && cloudData.pin.trim().length >= 4) {
        currentMgmtPin = cloudData.pin.trim();
        localStorage.setItem('gnapakalu_mgmt_pin', currentMgmtPin);
      }

      if (badge) badge.textContent = '🟢 LIVE CLOUD SYNCED';
      if (isUserInitiated) showToast(`Synced all products, orders, and PIN from cloud! ☁️`);
      console.log('✅ Universal Cloud Sync Complete: Products:', PRODUCTS.length, 'Orders:', mergedOrders.length, 'PIN:', currentMgmtPin);
    }
  } catch (err) {
    console.warn('syncStoreFromCloud exception:', err);
  } finally {
    isSyncingStore = false;
  }
}

// Backwards-compatible alias
async function syncProductsFromCloud(isUserInitiated = false) {
  return syncStoreFromCloud(isUserInitiated);
}

// Single-product instant cloud sync (ultra-lightweight, 0.2s)
async function syncSingleProductToCloud(product, action = 'add_product') {
  try {
    const badge = document.getElementById('mgmtSyncStatusBadge');
    if (badge) badge.textContent = '☁️ Publishing live to cloud...';

    const res = await fetch(CLOUD_SYNC_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: action, product: product })
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        if (badge) badge.textContent = '🟢 LIVE CLOUD SYNCED';
        console.log(`✅ Product ${action} synced to cloud successfully.`);
        return true;
      }
    }
  } catch (err) {
    console.warn(`Single product ${action} failed:`, err);
  }
  return false;
}

// Single-product deletion cloud sync
async function syncDeleteProductToCloud(productId) {
  try {
    const res = await fetch(CLOUD_SYNC_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete_product', productId: productId })
    });
    if (res.ok) {
      console.log('✅ Product deletion synced to cloud.');
      return true;
    }
  } catch (err) {
    console.warn('Delete product cloud sync failed:', err);
  }
  return false;
}

// Stock change cloud sync
async function syncStockToCloud(productId, stock) {
  try {
    await fetch(CLOUD_SYNC_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'adjust_stock', productId: productId, stock: stock })
    });
  } catch (e) {}
}

async function syncProductsToCloud(productsList) {
  try {
    const badge = document.getElementById('mgmtSyncStatusBadge');
    if (badge) badge.textContent = '☁️ Syncing across all devices...';

    const res = await fetch(CLOUD_SYNC_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: productsList })
    });

    if (res.ok) {
      if (badge) badge.textContent = '🟢 LIVE CLOUD SYNCED';
      console.log('✅ Products synced to cloud successfully.');
      return true;
    }
  } catch (err) {
    console.error('Failed to sync products to cloud:', err);
  }
  return false;
}

async function syncOrdersToCloud(ordersList) {
  try {
    const res = await fetch(CLOUD_SYNC_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders: ordersList })
    });
    if (res.ok) {
      console.log('✅ Orders synced to cloud successfully across all devices.');
    }
  } catch (err) {
    console.error('Failed to sync orders to cloud:', err);
  }
}

async function syncPinToCloud(newPin) {
  try {
    const res = await fetch(CLOUD_SYNC_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: newPin })
    });
    if (res.ok) {
      console.log('✅ Owner PIN synced to cloud successfully across all devices.');
      return true;
    }
  } catch (err) {
    console.error('Failed to sync PIN to cloud:', err);
  }
  return false;
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
async function initStore() {
  renderProducts();
  renderDrawerCategories();
  updateCartUI();
  updateWishlistCount();
  updateMgmtLiveBadge();
  updateMgmtOrdersCount();
  setupEventListeners();

  // If local products are missing or have only default dummy items, load static products.json immediately
  if (!PRODUCTS || PRODUCTS.length <= 6) {
    try {
      const pRes = await fetch('products.json?v=' + Date.now());
      if (pRes.ok) {
        const staticList = await pRes.json();
        if (Array.isArray(staticList) && staticList.length > 0) {
          PRODUCTS = staticList;
          saveProductsLocalOnly();
        }
      }
    } catch (errStatic) {
      console.warn('products.json pre-load notice:', errStatic);
    }
  }

  syncStoreFromCloud();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStore);
} else {
  initStore();
}

// Auto-sync when user returns to website or switches tabs
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    syncStoreFromCloud();
  }
});

// Periodic auto-sync every 15 seconds so devices always stay synchronized live in real-time
setInterval(() => {
  if (document.visibilityState === 'visible') {
    syncStoreFromCloud();
  }
}, 15000);

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

  // Checkout - Opens Customer Delivery & Address Details Modal
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckoutModal);
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
  syncStoreFromCloud();
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
  syncStoreFromCloud();
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

// Customer-facing stock status resolver:
// - Count numbers are NEVER shown to customers
// - If count >= 5: "In Stock"
// - If count < 5 and count > 0: "Only few left"
// - If count <= 0: "Out of Stock"
function getStockDisplay(stockCount) {
  const count = (typeof stockCount === 'number') ? stockCount : 10;
  if (count <= 0) {
    return { label: 'Out of Stock', cssClass: 'out-stock', isOutOfStock: true, isFewLeft: false };
  }
  if (count < 5) {
    return { label: 'Only few left', cssClass: 'few-stock', isOutOfStock: false, isFewLeft: true };
  }
  return { label: 'In Stock', cssClass: 'in-stock', isOutOfStock: false, isFewLeft: false };
}

// Helper to render individual product card HTML
function createProductCardHtml(item) {
  const isWishlisted = wishlist.includes(item.id);
  const savings = item.originalPrice - item.offerPrice;
  const discountPercent = Math.round((savings / item.originalPrice) * 100);
  const activeVariant = item.variants ? (selectedProductVariants[item.id] || item.variants[0]) : null;
  const currentImg = activeVariant ? activeVariant.image : item.image;
  const stockInfo = getStockDisplay(item.stock);

  const variantSwatchesHtml = item.variants ? `
    <div class="product-color-picker">
      <span class="color-picker-label">Color:</span>
      ${item.variants.map((v) => {
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
    <div class="product-card ${stockInfo.isOutOfStock ? 'sold-out' : ''}" id="card-${item.id}">
      <div class="product-image-container">
        <img src="${currentImg}" alt="${item.name}" id="img-${item.id}" class="product-img" loading="lazy" />
        
        <div class="card-badges">
          ${stockInfo.isOutOfStock 
            ? `<span class="badge-tag-out-of-stock">OUT OF STOCK</span>` 
            : stockInfo.isFewLeft
            ? `<span class="badge-tag-few-left">ONLY FEW LEFT</span>`
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
              <span class="stock-indicator-live ${stockInfo.cssClass}">${stockInfo.label}</span>
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
          
          ${stockInfo.isOutOfStock ? `
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
}

// ===============================================================
// PRODUCTS GRID RENDERER
// ===============================================================
function renderProducts() {
  // Render Catalog / Collection View Grid
  const container = document.getElementById('productGrid');
  const countText = document.getElementById('catalogCountText');
  if (!container) return;

  let list = PRODUCTS.filter(item => {
    if (activeGenderTab === 'w') return item.gender === 'w' || item.gender === 'both';
    if (activeGenderTab === 'm') return item.gender === 'm' || item.gender === 'both';
    return true;
  });

  if (activeCategoryFilter !== 'all') {
    list = list.filter(item => item.category.toLowerCase() === activeCategoryFilter.toLowerCase());
  }

  if (searchQuery) {
    list = list.filter(item => 
      item.name.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery) ||
      (item.description && item.description.toLowerCase().includes(searchQuery))
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

  container.innerHTML = list.map(createProductCardHtml).join('');
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

  const grandTotal = Math.max(0, subtotal - discount);

  if (subtotalElem) subtotalElem.textContent = formatINR(subtotal);
  if (totalElem) totalElem.textContent = formatINR(grandTotal);

  // In the cart drawer, courier charge is indicated as calculated at next step based on pincode
  const cartDeliveryCharge = document.getElementById('cartDeliveryCharge');
  if (cartDeliveryCharge) {
    if (isOrderFreeShipping()) {
      cartDeliveryCharge.innerHTML = '<span style="color: #16a34a; font-weight: 800;">FREE (Product under ₹10)</span>';
    } else {
      cartDeliveryCharge.textContent = 'Calculated at next step';
    }
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
    shippingStatus.innerHTML = `✨ <strong>100% Handcrafted</strong> • Safe Doorstep Delivery Across India • Velvet Box Included`;
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
    closeWishlist();
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
  renderWishlistUI();
}

function updateWishlistCount() {
  const count = (Array.isArray(wishlist) ? wishlist.length : 0);
  const badge = document.getElementById('wishlistBadge');
  if (badge) badge.textContent = count;
  const drawerCount = document.getElementById('wishlistDrawerCount');
  if (drawerCount) drawerCount.textContent = count;
}

function openWishlist() {
  renderWishlistUI();
  const drawer = document.getElementById('wishlistDrawer');
  const overlay = document.getElementById('wishlistOverlay');
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }
  if (overlay) {
    overlay.classList.add('open');
  }
  document.body.style.overflow = 'hidden';
}

function closeWishlist() {
  const drawer = document.getElementById('wishlistDrawer');
  const overlay = document.getElementById('wishlistOverlay');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (overlay) {
    overlay.classList.remove('open');
  }
  document.body.style.overflow = '';
}

function renderWishlistUI() {
  const container = document.getElementById('wishlistItems');
  if (!container) return;
  updateWishlistCount();

  const savedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  if (savedProducts.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3.5rem 1rem; color: var(--color-text-muted);">
        <div style="font-size: 3rem; margin-bottom: 0.75rem;">💖</div>
        <h4 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--color-text-main); margin-bottom: 0.35rem;">Your Wishlist is Empty</h4>
        <p style="font-size: 0.85rem; line-height: 1.5; max-width: 280px; margin: 0 auto 1.5rem;">
          Tap the heart icon on any product to save your favorite creations here!
        </p>
        <button type="button" class="mgmt-btn-primary" onclick="closeWishlist(); switchScreen('catalog');" style="display: inline-block;">
          Explore Creations
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = savedProducts.map(p => {
    const isOut = (typeof p.stock === 'number' && p.stock <= 0);
    return `
      <div class="cart-item" style="display: flex; gap: 1rem; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--color-border);">
        <img src="${p.image}" alt="${p.name}" style="width: 70px; height: 70px; border-radius: 10px; object-fit: cover; border: 1px solid var(--color-border); flex-shrink: 0;">
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-size: 0.92rem; font-weight: 700; color: var(--color-text-main); line-height: 1.3; margin-bottom: 0.2rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${p.name}
          </h4>
          <div style="font-size: 0.75rem; color: var(--color-primary-dark); font-weight: 600; margin-bottom: 0.35rem;">
            ${p.category}
          </div>
          <div style="display: flex; align-items: baseline; gap: 0.5rem;">
            <strong style="color: var(--color-primary-dark); font-size: 1rem;">${formatINR(p.offerPrice)}</strong>
            <span style="font-size: 0.75rem; color: #9482a3; text-decoration: line-through;">${formatINR(p.originalPrice)}</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.45rem; align-items: flex-end;">
          <button type="button" onclick="addToCart('${p.id}'); closeWishlist(); openCart();" style="background: var(--gradient-luxe); color: #fff; border: none; padding: 0.4rem 0.85rem; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 700; cursor: pointer; white-space: nowrap;">
            Add to Bag
          </button>
          <button type="button" onclick="toggleWishlist('${p.id}')" style="background: transparent; border: none; color: #e11d48; font-size: 0.76rem; font-weight: 600; cursor: pointer; text-decoration: underline;" title="Remove">
            Remove
          </button>
        </div>
      </div>
    `;
  }).join('');
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
  const stockInfo = getStockDisplay(currentStock);
  const isOutOfStock = stockInfo.isOutOfStock;

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
          <span class="stock-indicator-live ${stockInfo.cssClass}">${stockInfo.label}</span>
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

function closeModal(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnBackdrop(e) {
  if (e && e.target && e.target.id === 'modalOverlay') {
    closeModal(e);
  }
}

// ===============================================================
// CUSTOMER CHECKOUT & DELIVERY DETAILS FLOW
// ===============================================================

// Check if the order qualifies for zero extra charges (Free shipping / No extra charges)
// "in the whole website if any product is under 10rs then u dont add any extra charges just the item price should get"
function isOrderFreeShipping() {
  if (!cart || cart.length === 0) return false;
  const hasUnder10Item = cart.some(item => (typeof item.price === 'number' && item.price <= 10));
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  return hasUnder10Item || subtotal <= 10;
}

let checkoutShippingInfo = {
  fee: 0,
  label: 'Pending Pincode',
  state: '',
  isComplete: false,
  code: 'PENDING'
};

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Your bag is empty!');
    return;
  }
  closeCart();

  // If order contains products under ₹10, announce zero extra charges
  if (isOrderFreeShipping()) {
    const noticeBox = document.getElementById('checkoutPincodeNotice');
    const noticeIcon = document.getElementById('pincodeNoticeIcon');
    const noticeText = document.getElementById('pincodeNoticeText');
    const statusIcon = document.getElementById('custPincodeStatus');
    if (statusIcon) statusIcon.textContent = '🎁';
    if (noticeBox) noticeBox.className = 'checkout-pincode-notice valid-zone';
    if (noticeIcon) noticeIcon.textContent = '✨';
    if (noticeText) {
      noticeText.innerHTML = `<strong>Zero Extra Charges:</strong> Product(s) under ₹10 get 100% Free Shipping. You only pay the exact item price!`;
    }
  }

  // Pre-fill previously saved customer details from localStorage if available
  try {
    const saved = JSON.parse(localStorage.getItem('gnapakalu_cust_details') || '{}');
    if (saved.name) document.getElementById('custName').value = saved.name;
    if (saved.phone) document.getElementById('custPhone').value = saved.phone;
    if (saved.houseNo) document.getElementById('custHouseNo').value = saved.houseNo;
    if (saved.address) document.getElementById('custAddress').value = saved.address;
    if (saved.landmark) document.getElementById('custLandmark').value = saved.landmark;
    if (saved.state) document.getElementById('custState').value = saved.state;
    if (saved.pincode) {
      document.getElementById('custPincode').value = saved.pincode;
      onCheckoutPincodeInput(saved.pincode);
    } else {
      updateCheckoutSummaryUI();
    }
  } catch (err) {
    updateCheckoutSummaryUI();
  }

  // Check address completeness immediately to lock/unlock payment QR
  checkAddressFieldsComplete();

  const modal = document.getElementById('checkoutModalOverlay');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModalOverlay');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeCheckoutOnBackdrop(e) {
  if (e.target && e.target.id === 'checkoutModalOverlay') {
    closeCheckoutModal();
  }
}

// Evaluates all star-marked delivery fields to unlock / lock the Payment QR Code & UTR input
function checkAddressFieldsComplete() {
  const name = (document.getElementById('custName')?.value || '').trim();
  const rawPhone = document.getElementById('custPhone')?.value || '';
  const phone = rawPhone.replace(/\D/g, '');
  const houseNo = (document.getElementById('custHouseNo')?.value || '').trim();
  const landmark = (document.getElementById('custLandmark')?.value || '').trim();
  const address = (document.getElementById('custAddress')?.value || '').trim();
  const rawPin = document.getElementById('custPincode')?.value || '';
  const pincode = rawPin.replace(/\D/g, '');
  const state = (document.getElementById('custState')?.value || '').trim();

  const missing = [];
  if (name.length < 2) missing.push('Full Name');
  if (phone.length !== 10) missing.push('10-digit Mobile');
  if (houseNo.length < 1) missing.push('House / Flat No');
  if (landmark.length < 1) missing.push('Landmark');
  if (address.length < 2) missing.push('Street Address');
  if (pincode.length !== 6) missing.push('6-digit Pincode');
  if (!state) missing.push('State');

  const wrapper = document.getElementById('checkoutPaymentLockWrapper');
  const lockPillText = document.getElementById('qrLockStatusText');

  const isComplete = (missing.length === 0);

  if (wrapper) {
    if (isComplete) {
      wrapper.classList.remove('locked');
      if (lockPillText) {
        lockPillText.textContent = '✅ Address complete! QR Unlocked';
      }
    } else {
      wrapper.classList.add('locked');
      if (lockPillText) {
        lockPillText.textContent = `Awaiting: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? ` +${missing.length - 3} more` : ''}`;
      }
    }
  }

  return isComplete;
}

// Real-time backend pincode lookup & courier rate logic
function calculateShippingFromPincode(pincode, stateHint = '') {
  // If order qualifies for zero extra charges (any product under ₹10), fee is always 0
  if (isOrderFreeShipping()) {
    return {
      fee: 0,
      label: 'Free Delivery (Item under ₹10)',
      state: stateHint || '',
      isComplete: true,
      code: 'FREE_UNDER_10'
    };
  }

  const pin = String(pincode || '').trim().replace(/\D/g, '');

  if (pin.length === 6) {
    const p2 = parseInt(pin.slice(0, 2), 10);
    // Telangana (500000 - 509999) -> ₹125
    if (p2 === 50) {
      return {
        fee: SHIPPING_RATES.TS.rate,
        label: 'Telangana (TS)',
        state: 'Telangana',
        isComplete: true,
        code: 'TS'
      };
    }
    // Andhra Pradesh (515000 - 535999) -> ₹85
    if (p2 >= 51 && p2 <= 53) {
      return {
        fee: SHIPPING_RATES.AP.rate,
        label: 'Andhra Pradesh (AP)',
        state: 'Andhra Pradesh',
        isComplete: true,
        code: 'AP'
      };
    }
    // Rest of India (100000 - 999999) -> ₹135
    if (p2 >= 10 && p2 <= 99) {
      return {
        fee: SHIPPING_RATES.INDIA.rate,
        label: 'All Over India (Standard)',
        state: stateHint || '',
        isComplete: true,
        code: 'INDIA'
      };
    }
  }

  // If state was selected manually from dropdown before pincode is entered
  if (stateHint === 'Andhra Pradesh') {
    return { fee: SHIPPING_RATES.AP.rate, label: 'Andhra Pradesh (AP)', state: 'Andhra Pradesh', isComplete: false, code: 'AP' };
  }
  if (stateHint === 'Telangana') {
    return { fee: SHIPPING_RATES.TS.rate, label: 'Telangana (TS)', state: 'Telangana', isComplete: false, code: 'TS' };
  }
  if (stateHint) {
    return { fee: SHIPPING_RATES.INDIA.rate, label: 'All Over India', state: stateHint, isComplete: false, code: 'INDIA' };
  }

  return { fee: 0, label: 'Pending Pincode', state: '', isComplete: false, code: 'PENDING' };
}

function onCheckoutPincodeInput(val) {
  const cleanPin = String(val || '').replace(/\D/g, '').slice(0, 6);
  const pinInput = document.getElementById('custPincode');
  if (pinInput && pinInput.value !== cleanPin) pinInput.value = cleanPin;

  const stateSelect = document.getElementById('custState');
  const currentStateHint = stateSelect ? stateSelect.value : '';

  checkoutShippingInfo = calculateShippingFromPincode(cleanPin, currentStateHint);

  // If pincode strictly identifies state, automatically sync the dropdown
  if (checkoutShippingInfo.isComplete && checkoutShippingInfo.state && stateSelect) {
    if (checkoutShippingInfo.code === 'AP') stateSelect.value = 'Andhra Pradesh';
    else if (checkoutShippingInfo.code === 'TS') stateSelect.value = 'Telangana';
  }

  // Update UI notice banner
  const noticeBox = document.getElementById('checkoutPincodeNotice');
  const noticeIcon = document.getElementById('pincodeNoticeIcon');
  const noticeText = document.getElementById('pincodeNoticeText');
  const statusIcon = document.getElementById('custPincodeStatus');

  if (isOrderFreeShipping()) {
    if (statusIcon) statusIcon.textContent = '🎁';
    if (noticeBox) noticeBox.className = 'checkout-pincode-notice valid-zone';
    if (noticeIcon) noticeIcon.textContent = '✨';
    if (noticeText) {
      noticeText.innerHTML = `<strong>Free Delivery Applied:</strong> Since product(s) in your bag are under ₹10, zero extra charges are added. Just pay the item price!`;
    }
  } else if (cleanPin.length === 6) {
    if (statusIcon) statusIcon.textContent = '✅';
    if (noticeBox) {
      noticeBox.className = 'checkout-pincode-notice valid-zone';
    }
    if (noticeIcon) noticeIcon.textContent = '📦';
    if (noticeText) {
      noticeText.innerHTML = `<strong>Verified Zone: ${checkoutShippingInfo.label}</strong> — Courier charge <strong>${formatINR(checkoutShippingInfo.fee)}/-</strong> has been added to your total.`;
    }
  } else if (cleanPin.length > 0) {
    if (statusIcon) statusIcon.textContent = '⏳';
    if (noticeBox) noticeBox.className = 'checkout-pincode-notice';
    if (noticeIcon) noticeIcon.textContent = '📍';
    if (noticeText) {
      noticeText.innerHTML = `Enter ${6 - cleanPin.length} more digit(s) for instant courier rate verification.`;
    }
  } else {
    if (statusIcon) statusIcon.textContent = '📍';
    if (noticeBox) noticeBox.className = 'checkout-pincode-notice';
    if (noticeIcon) noticeIcon.textContent = '📍';
    if (noticeText) {
      noticeText.innerHTML = `Enter your <strong>6-digit Pincode</strong> to calculate applicable courier charge.`;
    }
  }

  updateCheckoutSummaryUI();
}

function onCheckoutStateChange(val) {
  const pinInput = document.getElementById('custPincode');
  const cleanPin = pinInput ? pinInput.value.trim() : '';
  checkoutShippingInfo = calculateShippingFromPincode(cleanPin, val);
  updateCheckoutSummaryUI();
}

function updateCheckoutSummaryUI() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = 0;
  if (appliedPromo) {
    discount = Math.round(subtotal * (appliedPromo.discountPercent / 100));
  }

  const fee = isOrderFreeShipping() ? 0 : (checkoutShippingInfo.fee || 0);
  const grandTotal = Math.max(0, subtotal - discount + fee);

  const countElem = document.getElementById('checkoutItemCount');
  const subtotalElem = document.getElementById('checkoutSubtotal');
  const discountRow = document.getElementById('checkoutDiscountRow');
  const discountElem = document.getElementById('checkoutDiscount');
  const zoneBadge = document.getElementById('checkoutShippingZoneBadge');
  const deliveryChargeElem = document.getElementById('checkoutDeliveryCharge');
  const finalTotalElem = document.getElementById('checkoutFinalTotal');
  const btnPlaceOrder = document.getElementById('btnPlaceOrder');

  if (countElem) countElem.textContent = cart.reduce((s, i) => s + i.qty, 0);
  if (subtotalElem) subtotalElem.textContent = formatINR(subtotal);

  if (discountRow && discountElem) {
    if (appliedPromo && discount > 0) {
      discountRow.style.display = 'flex';
      discountElem.textContent = `-${formatINR(discount)} (${appliedPromo.code})`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (zoneBadge) {
    if (isOrderFreeShipping()) {
      zoneBadge.className = 'shipping-rate-pill ready';
      zoneBadge.textContent = 'FREE (Under ₹10)';
    } else if (checkoutShippingInfo.isComplete) {
      zoneBadge.className = 'shipping-rate-pill ready';
      zoneBadge.textContent = `${checkoutShippingInfo.label} (${formatINR(fee)})`;
    } else {
      zoneBadge.className = 'shipping-rate-pill';
      zoneBadge.textContent = 'Pending Pincode';
    }
  }

  if (deliveryChargeElem) {
    if (isOrderFreeShipping()) {
      deliveryChargeElem.innerHTML = '<span style="color: #16a34a; font-weight: 800;">₹0 (Free)</span>';
    } else if (checkoutShippingInfo.isComplete) {
      deliveryChargeElem.textContent = formatINR(fee);
    } else {
      deliveryChargeElem.textContent = 'Enter Pincode';
    }
  }

  if (finalTotalElem) {
    finalTotalElem.textContent = formatINR(grandTotal);
  }

  // Sync QR Code amount displays & mobile UPI intent link
  const qrPayAmountElem = document.getElementById('checkoutQrPayAmount');
  const qrStepAmountElem = document.getElementById('checkoutQrStepAmount');
  const directUpiBtn = document.getElementById('checkoutDirectUpiBtn');

  if (qrPayAmountElem) qrPayAmountElem.textContent = formatINR(grandTotal);
  if (qrStepAmountElem) qrStepAmountElem.textContent = formatINR(grandTotal);
  if (directUpiBtn) {
    directUpiBtn.href = `upi://pay?pa=Q294289871@ybl&pn=Gnapakalu+by+megha&am=${grandTotal}&cu=INR&tn=Order_Payment&mode=02`;
  }

  if (btnPlaceOrder) {
    btnPlaceOrder.innerHTML = `
      <span>Place Order & Submit Payment (${formatINR(grandTotal)})</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
  }
}

// Payment App Selection
function selectPaymentApp(appName, cardId) {
  document.querySelectorAll('.payment-app-card').forEach(c => c.classList.remove('active'));
  const card = document.getElementById(cardId);
  if (card) {
    card.classList.add('active');
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  }

  const qrShowcase = document.getElementById('checkoutQrShowcase');
  const utrReqStar = document.getElementById('utrReqStar');
  const utrInput = document.getElementById('custUtrNumber');

  if (qrShowcase) qrShowcase.style.display = 'block';
  if (utrReqStar) utrReqStar.style.display = 'inline';
  if (utrInput) {
    utrInput.placeholder = 'e.g. 329182749102 (12 digits)';
    utrInput.setAttribute('required', 'true');
  }
}

// Dispatches order details to Sridevigummadi37@gmail.com via Backend Serverless & FormSubmit API
async function dispatchOrderEmail(order) {
  const targetEmail = 'Sridevigummadi37@gmail.com';
  
  // 1. Try Vercel Serverless Backend Endpoint /api/send-order
  try {
    const res = await fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        console.log('Order notification successfully dispatched to', targetEmail);
        return { success: true };
      }
      if (data.needsActivation) {
        console.warn('FormSubmit needs activation on', targetEmail);
        return { success: false, needsActivation: true, message: data.message };
      }
    }
  } catch (err) {
    console.warn('Backend serverless endpoint fallback to direct FormSubmit:', err);
  }

  // 2. Direct Resilient Fallback to FormSubmit AJAX endpoint
  try {
    const itemsList = Array.isArray(order.items)
      ? order.items.map(i => `${i.name} (${i.selectedVariant || i.category || 'Standard'}) x ${i.qty} = ₹${i.total}`).join('\n')
      : String(order.items || '');

    const fallbackRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `✨ New Live Order ${order.orderId} from ${order.customerName} - Total: ${order.grandTotalFormatted || '₹' + (order.grandTotal || 0)}`,
        _template: 'table',
        _captcha: 'false',
        Store: 'Gnapakalu by Megha',
        Order_ID: order.orderId,
        Order_Date_Time: order.orderDate,
        Payment_App_Used: order.paymentApp,
        Payment_UTR_Number: order.utrNumber || 'N/A',
        Transaction_ID: order.transactionId || 'N/A',
        Payment_Status: order.paymentStatus,
        Customer_Name: order.customerName,
        Mobile_Number: order.customerPhone,
        House_Number: order.houseNo,
        Street_Area_Address: order.address,
        Landmark: order.landmark,
        State: order.state,
        Pincode: order.pincode,
        Ordered_Items: itemsList,
        Bag_Subtotal: order.subtotalFormatted || '₹' + (order.subtotal || 0),
        Promotional_Discount: order.discountFormatted || '₹' + (order.discount || 0),
        Courier_Zone_and_Charge: `${order.shippingZone} (${order.courierChargeFormatted || '₹' + (order.courierCharge || 0)})`,
        TOTAL_AMOUNT_PAID: order.grandTotalFormatted || '₹' + (order.grandTotal || 0)
      })
    });
    const resJson = await fallbackRes.json();
    const isSuccess = resJson && (resJson.success === 'true' || resJson.success === true);
    const needsActivation = resJson && typeof resJson.message === 'string' && resJson.message.includes('Activation');
    console.log('Order email dispatched to', targetEmail, resJson);
    return { success: isSuccess, needsActivation: needsActivation, message: resJson.message };
  } catch (e) {
    console.error('Email dispatch error:', e);
    return { success: false, error: e.message };
  }
}

// Order Submission & Verification
// Order Submission & Verification
function submitCustomerOrder(event) {
  if (event) {
    try {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      if (typeof event.stopPropagation === 'function') event.stopPropagation();
    } catch (e) {}
  }

  if (!cart || cart.length === 0) {
    showToast('Your bag is empty!');
    return false;
  }

  const name = (document.getElementById('custName')?.value || '').trim();
  const rawPhone = document.getElementById('custPhone')?.value || '';
  const phone = rawPhone.replace(/\D/g, '').slice(-10);
  const houseNo = (document.getElementById('custHouseNo')?.value || '').trim();
  const address = (document.getElementById('custAddress')?.value || '').trim();
  const landmark = (document.getElementById('custLandmark')?.value || '').trim();
  const state = (document.getElementById('custState')?.value || '').trim();
  const rawPincode = document.getElementById('custPincode')?.value || '';
  const pincode = rawPincode.replace(/\D/g, '').slice(0, 6);
  const selectedPaymentApp = document.querySelector('input[name="paymentAppChoice"]:checked')?.value || 'PhonePe';

  // Check address completeness
  if (!checkAddressFieldsComplete()) {
    showToast('⚠️ Please complete all required delivery fields marked with * above to unlock payment QR');
    return false;
  }

  // Validations
  if (!name || name.length < 2) {
    showToast('Please enter your full name');
    document.getElementById('custName')?.focus();
    return false;
  }
  if (!phone || phone.length !== 10) {
    showToast('Please enter a valid 10-digit mobile number');
    document.getElementById('custPhone')?.focus();
    return false;
  }
  if (!houseNo) {
    showToast('Please enter your House / Flat / Door Number');
    document.getElementById('custHouseNo')?.focus();
    return false;
  }
  if (!address) {
    showToast('Please enter your Street / Area / Colony address');
    document.getElementById('custAddress')?.focus();
    return false;
  }
  if (!landmark) {
    showToast('Please enter a nearby landmark');
    document.getElementById('custLandmark')?.focus();
    return false;
  }
  if (!pincode || pincode.length !== 6) {
    showToast('Please enter a valid 6-digit Pincode');
    document.getElementById('custPincode')?.focus();
    return false;
  }
  if (!state) {
    showToast('Please select your state');
    document.getElementById('custState')?.focus();
    return false;
  }

  const rawUtr = document.getElementById('custUtrNumber')?.value || '';
  const utrNumber = rawUtr.trim().replace(/\s+/g, '');
  const transactionId = (document.getElementById('custTransactionId')?.value || '').trim();

  if (!utrNumber || utrNumber.length < 6) {
    showToast('⚠️ Please enter your 12-digit Payment UTR / UPI Ref from PhonePe / GPay');
    const utrEl = document.getElementById('custUtrNumber');
    if (utrEl) {
      utrEl.focus();
      utrEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      utrEl.style.borderColor = '#e11d48';
      utrEl.style.boxShadow = '0 0 0 3px rgba(225, 29, 72, 0.2)';
      setTimeout(() => {
        utrEl.style.borderColor = '';
        utrEl.style.boxShadow = '';
      }, 4000);
    }
    return false;
  }

  // Calculate final shipping strictly via backend pincode checker
  const shippingInfo = calculateShippingFromPincode(pincode, state);

  // Compute order totals safely
  const orderNum = Math.floor(100000 + Math.random() * 900000);
  const subtotal = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.qty) || 1)), 0);
  let discount = 0;
  if (appliedPromo) {
    discount = Math.round(subtotal * (appliedPromo.discountPercent / 100));
  }
  const fee = (typeof shippingInfo.fee === 'number') ? shippingInfo.fee : 0;
  const grandTotal = Math.max(0, subtotal - discount + fee);
  const orderedItemsBackup = JSON.parse(JSON.stringify(cart));

  const nowFormatted = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  // CONSTRUCT COMPLETE ORDER OBJECT
  const orderPayload = {
    orderId: `#GNAP-${orderNum}`,
    orderDate: nowFormatted,
    customerName: name,
    customerPhone: phone,
    houseNo: houseNo,
    address: address,
    landmark: landmark,
    state: state,
    pincode: pincode,
    shippingZone: shippingInfo.label || 'Standard Delivery',
    courierCharge: fee,
    courierChargeFormatted: formatINR(fee),
    items: orderedItemsBackup.map(i => ({
      id: i.id,
      name: i.name,
      category: i.category || 'Jewellery',
      selectedVariant: i.selectedVariant || i.variantName || '',
      qty: i.qty || 1,
      price: i.price || 0,
      total: (i.price || 0) * (i.qty || 1)
    })),
    subtotal: subtotal,
    subtotalFormatted: formatINR(subtotal),
    discount: discount,
    discountFormatted: discount > 0 ? `-${formatINR(discount)} (${appliedPromo ? appliedPromo.code : ''})` : '₹0',
    grandTotal: grandTotal,
    grandTotalFormatted: formatINR(grandTotal),
    paymentApp: selectedPaymentApp,
    utrNumber: utrNumber,
    transactionId: transactionId || utrNumber,
    paymentStatus: 'Payment Completed / Order Placed'
  };

  // Construct WhatsApp order message safely
  let waOrderText = '';
  try {
    waOrderText = encodeURIComponent(
      `*✨ New Order - Gnapakalu by Megha*\n\n` +
      `*Order ID:* #GNAP-${orderNum}\n` +
      `*Customer Name:* ${name}\n` +
      `*Phone:* +91 ${phone}\n\n` +
      `*📍 Delivery Address:*\n` +
      `${houseNo}, ${address}\n` +
      `Landmark: ${landmark}\n` +
      `State: ${state} - PIN: ${pincode}\n\n` +
      `*💳 Payment Method / App:* ${selectedPaymentApp}\n` +
      `*Payment UTR / Ref:* ${orderPayload.utrNumber}\n` +
      (orderPayload.transactionId && orderPayload.transactionId !== 'N/A' && orderPayload.transactionId !== orderPayload.utrNumber ? `*Transaction ID:* ${orderPayload.transactionId}\n` : '') +
      `*Payment Status:* Payment Completed\n\n` +
      `*📦 Ordered Items:*\n` +
      orderedItemsBackup.map(i => `• ${i.name} (${i.selectedVariant || i.variantName || i.category || 'Item'}) x ${i.qty} = ${formatINR(i.price * i.qty)}`).join('\n') +
      `\n\n*💰 Payment Summary:*\n` +
      `Subtotal: ${formatINR(subtotal)}\n` +
      (discount > 0 ? `Discount (${appliedPromo ? appliedPromo.code : ''}): -${formatINR(discount)}\n` : '') +
      `Courier Charge (${shippingInfo.label}): ${formatINR(fee)}\n` +
      `*Grand Total: ${formatINR(grandTotal)}*\n\n` +
      `Please confirm the order and dispatch details.`
    );
  } catch (errWa) {
    console.warn('WhatsApp text encoding warning:', errWa);
  }

  // 1. FIRST: DISPLAY THE "ORDER IS PLACED" MODAL IMMEDIATELY!
  closeCheckoutModal();
  closeCart();
  showOrderPlacedGlassModal(orderPayload, waOrderText);

  // 2. Clear Cart and update UI safely
  try {
    cart = [];
    saveCart();
    updateCartUI();
  } catch (errCart) {
    console.warn('Cart clear non-fatal error:', errCart);
  }

  // 3. Deduct Stock safely
  try {
    orderedItemsBackup.forEach(cartItem => {
      const baseId = cartItem.productId || (typeof cartItem.id === 'string' ? cartItem.id.split('_')[0] : String(cartItem.id || ''));
      const prod = PRODUCTS.find(p => String(p.id) === String(baseId) || String(p.id) === String(cartItem.id));
      if (prod) {
        const currentStock = (typeof prod.stock === 'number') ? prod.stock : 10;
        prod.stock = Math.max(0, currentStock - (cartItem.qty || 1));
      }
    });
    saveProducts();
    renderProducts();
  } catch (errStock) {
    console.warn('Stock update non-fatal error:', errStock);
  }

  // 4. Save Customer details for next checkout
  try {
    localStorage.setItem('gnapakalu_cust_details', JSON.stringify({
      name, phone, houseNo, address, landmark, state, pincode
    }));
  } catch (e) {}

  // 5. Persist Order in LocalStorage & Instantly Sync to Cloud across all devices
  try {
    let allOrders = JSON.parse(localStorage.getItem('gnapakalu_customer_orders') || '[]');
    allOrders.unshift(orderPayload);
    localStorage.setItem('gnapakalu_customer_orders', JSON.stringify(allOrders));
    if (typeof updateMgmtOrdersCount === 'function') updateMgmtOrdersCount();
    // Real-time Cloud Sync for Orders so all other devices see this order immediately
    syncOrdersToCloud(allOrders);
  } catch (errStorage) {
    console.warn('Storage warning for orders:', errStorage);
  }

  // 6. Automatically Dispatch Email Alert to Sridevigummadi37@gmail.com
  try {
    dispatchOrderEmail(orderPayload);
  } catch (errEmail) {
    console.warn('Email dispatch non-fatal error:', errEmail);
  }

  return false;
}

// DEDICATED ORDER PLACED GLASS EFFECT MODAL HANDLERS
function handleOrderPlacedOverlayClick(e) {
  // Modal strictly stays visible until user clicks the cross button (✕). Never close on backdrop click.
  return;
}

function showOrderPlacedGlassModal(order, waOrderText) {
  const overlay = document.getElementById('orderPlacedModalOverlay');
  const titleElem = document.getElementById('orderGlassTitle');
  const custMsg = document.getElementById('orderGlassCustomerMsg');
  const receiptContainer = document.getElementById('orderGlassReceiptContent');
  const waBtn = document.getElementById('orderGlassWaBtn');

  // Personalize title with Customer Name
  if (titleElem) {
    titleElem.innerHTML = `✨ ${order.customerName}, Your Order is Placed! 🎉`;
  }

  // Personalize message with Customer Name
  if (custMsg) {
    custMsg.innerHTML = `Thank you <strong>${order.customerName}</strong>! Your handcrafted pieces are entering velvet gift packaging at <strong>Gnapakalu by Megha</strong>.`;
  }

  if (receiptContainer) {
    receiptContainer.innerHTML = `
      <div class="order-glass-row">
        <span style="color: var(--color-text-muted);">Order ID:</span>
        <strong style="color: var(--color-primary-dark); font-size: 0.95rem;">${order.orderId}</strong>
      </div>
      <div class="order-glass-row">
        <span style="color: var(--color-text-muted);">Customer:</span>
        <strong>${order.customerName} (+91 ${order.customerPhone})</strong>
      </div>
      <div class="order-glass-row">
        <span style="color: var(--color-text-muted);">Payment App:</span>
        <span class="mgmt-pay-app-pill">${order.paymentApp}</span>
      </div>
      <div class="order-glass-row">
        <span style="color: var(--color-text-muted);">Payment UTR / Ref:</span>
        <strong style="font-family: monospace; color: var(--color-primary-dark); font-size: 0.9rem;">${order.utrNumber}</strong>
      </div>
      ${order.transactionId && order.transactionId !== 'N/A' && order.transactionId !== order.utrNumber ? `
      <div class="order-glass-row">
        <span style="color: var(--color-text-muted);">Transaction ID:</span>
        <strong style="font-family: monospace; font-size: 0.8rem;">${order.transactionId}</strong>
      </div>
      ` : ''}
      <div style="margin: 0.5rem 0 0.35rem;">
        <span style="color: var(--color-text-muted); font-size: 0.78rem; display: block; margin-bottom: 0.15rem;">Delivery Address:</span>
        <strong style="line-height: 1.4; font-size: 0.82rem; display: block; color: var(--color-text-main);">
          ${order.houseNo}, ${order.address}, Near ${order.landmark}, ${order.state} - ${order.pincode}
        </strong>
      </div>
      <div class="order-glass-row" style="padding-top: 0.45rem; border-top: 1px dashed var(--color-border); margin-top: 0.35rem;">
        <span style="color: var(--color-text-muted);">Courier Zone (${order.shippingZone}):</span>
        <strong>${order.courierChargeFormatted || '₹' + order.courierCharge}</strong>
      </div>
      <div class="order-glass-row total-row">
        <span style="font-weight: 700;">Total Amount Paid:</span>
        <strong style="color: var(--color-primary-dark); font-size: 1.25rem; font-weight: 800;">${order.grandTotalFormatted || '₹' + order.grandTotal}</strong>
      </div>
      <div class="order-glass-notice">
        <span>📬</span>
        <span>Order details & payment UTR report dispatched to: <strong>Sridevigummadi37@gmail.com</strong></span>
      </div>
    `;
  }

  if (waBtn) {
    waBtn.href = `https://wa.me/919392430460?text=${waOrderText}`;
  }

  if (overlay) {
    overlay.classList.add('open');
    overlay.style.display = 'flex';
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    overlay.style.zIndex = '99999999';
    document.body.style.overflow = 'hidden';
  }
}

function closeOrderPlacedModal() {
  const overlay = document.getElementById('orderPlacedModalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.style.display = 'none';
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  }
  // Redirect to home screen when cross is clicked
  navigateToHome();
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
// (Dedicated Gnapakalu cloud endpoint for cross-device PIN sync)
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
    const res = await fetch(CLOUD_SYNC_API + '?t=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.pin && typeof data.pin === 'string' && data.pin.trim().length >= 4) {
        currentMgmtPin = data.pin.trim();
        localStorage.setItem('gnapakalu_mgmt_pin', currentMgmtPin);
      }
    }
  } catch (err) {
    console.warn('Using offline/cached PIN:', err);
  }
}

// MANAGEMENT PORTAL ENTRY POINT
async function openManagementPortal() {
  // Sync products, orders, and owner PIN immediately before prompting
  syncStoreFromCloud();
  if (isOwnerAuthenticated) {
    showPortalModal();
  } else {
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
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
  const enteredPin = input ? input.value.trim() : '';

  if (submitBtn) submitBtn.innerHTML = '<span>Verifying...</span>';

  // Double-check with cloud to ensure we compare with latest PIN changed from other devices
  try {
    await syncStoreFromCloud();
  } catch (errSync) {
    console.warn('PIN pre-verification sync note:', errSync);
  } finally {
    if (submitBtn) submitBtn.innerHTML = originalBtnText;
  }

  if (enteredPin === currentMgmtPin) {
    isOwnerAuthenticated = true;
    closePinModal();
    showPortalModal();
    showToast('Authenticated! Welcome to Store Management');
  } else {
    if (errorMsg) {
      errorMsg.textContent = 'Incorrect PIN. Please enter your valid 4-digit Management PIN.';
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

  // Sync to Cloud so all other devices immediately require the new PIN
  if (submitBtn) submitBtn.textContent = 'Syncing to Cloud...';
  try {
    await syncPinToCloud(currentMgmtPin);
  } catch (err) {
    console.warn('Cloud PIN sync warning:', err);
  } finally {
    if (submitBtn) submitBtn.textContent = 'Save & Sync PIN';
  }

  closeChangePinModal();
  showToast(`Access PIN updated to ${currentMgmtPin} and synced live across all devices! 🔐`);
}

// SHOW MANAGEMENT PORTAL DASHBOARD
function showPortalModal() {
  populateMgmtCategories();
  updateMgmtLiveBadge();
  updateMgmtOrdersCount();
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
  const ordersContent = document.getElementById('mgmtTabContentOrders');
  const formBtn = document.getElementById('mgmtTabBtnForm');
  const listBtn = document.getElementById('mgmtTabBtnList');
  const ordersBtn = document.getElementById('mgmtTabBtnOrders');

  if (formContent) formContent.style.display = 'none';
  if (listContent) listContent.style.display = 'none';
  if (ordersContent) ordersContent.style.display = 'none';

  if (formBtn) formBtn.classList.remove('active');
  if (listBtn) listBtn.classList.remove('active');
  if (ordersBtn) ordersBtn.classList.remove('active');

  if (tab === 'form') {
    if (formContent) formContent.style.display = 'block';
    if (formBtn) formBtn.classList.add('active');
  } else if (tab === 'orders') {
    if (ordersContent) ordersContent.style.display = 'block';
    if (ordersBtn) ordersBtn.classList.add('active');
    renderMgmtOrdersTable();
  } else {
    if (listContent) listContent.style.display = 'block';
    if (listBtn) listBtn.classList.add('active');
    renderMgmtProductsTable();
  }
}

function updateMgmtOrdersCount() {
  let allOrders = [];
  try {
    allOrders = JSON.parse(localStorage.getItem('gnapakalu_customer_orders') || '[]');
  } catch (e) {}
  const badge = document.getElementById('mgmtOrdersCountBadge');
  if (badge) badge.textContent = allOrders.length;
}

function renderMgmtOrdersTable() {
  const container = document.getElementById('mgmtOrdersTableWrapper');
  if (!container) return;

  let allOrders = [];
  try {
    allOrders = JSON.parse(localStorage.getItem('gnapakalu_customer_orders') || '[]');
  } catch (e) {}

  updateMgmtOrdersCount();

  const query = (document.getElementById('mgmtOrderSearchInput')?.value || '').trim().toLowerCase();

  let list = allOrders;
  if (query) {
    list = list.filter(o =>
      (o.orderId && o.orderId.toLowerCase().includes(query)) ||
      (o.customerName && o.customerName.toLowerCase().includes(query)) ||
      (o.customerPhone && o.customerPhone.includes(query)) ||
      (o.pincode && o.pincode.includes(query)) ||
      (o.paymentApp && o.paymentApp.toLowerCase().includes(query))
    );
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1.5rem; color: var(--color-text-muted);">
        <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📋</div>
        <h4>${query ? 'No orders match your search' : 'No Customer Orders Yet'}</h4>
        <p style="font-size: 0.85rem; margin-top: 0.25rem;">
          ${query ? 'Try searching by a different name, phone, or Order ID.' : 'When customers place orders, full details & payment app info will appear here and email automatically to Sridevigummadi37@gmail.com.'}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="mgmt-orders-table">
      <thead>
        <tr>
          <th>Order Details</th>
          <th>Customer & Contact</th>
          <th>Delivery Address</th>
          <th>Items Ordered</th>
          <th>Payment App & Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${list.map(o => {
          const itemsText = Array.isArray(o.items)
            ? o.items.map(i => `• ${i.name} (Qty: ${i.qty}) — ₹${i.total}`).join('<br>')
            : String(o.items || '');
          const waPhone = String(o.customerPhone || '').replace(/\D/g, '');
          return `
            <tr>
              <td>
                <span class="mgmt-order-id-badge">${o.orderId}</span>
                <div class="mgmt-order-time">${o.orderDate}</div>
              </td>
              <td>
                <strong>${o.customerName}</strong>
                <div style="margin-top: 0.2rem;">
                  <a href="https://wa.me/91${waPhone}" target="_blank" style="color: #25D366; font-weight: 700; text-decoration: none; font-size: 0.82rem;">
                    💬 +91 ${o.customerPhone}
                  </a>
                </div>
              </td>
              <td style="max-width: 200px; font-size: 0.82rem; line-height: 1.4;">
                ${o.houseNo}, ${o.address}<br>
                <span style="color: var(--color-text-muted);">Near ${o.landmark}</span><br>
                <strong>${o.state} - ${o.pincode}</strong>
              </td>
              <td>
                <div class="mgmt-order-items-list">${itemsText}</div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.3rem;">
                  Courier: ${o.shippingZone} (${o.courierChargeFormatted || '₹' + o.courierCharge})
                </div>
              </td>
              <td>
                <span class="mgmt-pay-app-pill">${o.paymentApp || 'UPI App'}</span>
                <div style="font-size: 0.76rem; color: #334155; margin-top: 0.35rem; line-height: 1.35;">
                  <div><strong>UTR:</strong> <span style="font-family: monospace; font-weight: 700; color: #0f172a;">${o.utrNumber || 'N/A'}</span></div>
                  ${o.transactionId && o.transactionId !== 'N/A' && o.transactionId !== o.utrNumber ? `<div><strong>Txn:</strong> <span style="font-family: monospace;">${o.transactionId}</span></div>` : ''}
                </div>
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--color-primary-dark); margin-top: 0.25rem;">
                  ${o.grandTotalFormatted || '₹' + o.grandTotal}
                </div>
              </td>
              <td>
                <button type="button" class="mgmt-resend-email-btn" onclick="resendOrderEmail('${o.orderId}')" title="Re-dispatch notification email to Sridevigummadi37@gmail.com">
                  📧 Re-send Email
                </button>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

async function resendOrderEmail(orderId) {
  let allOrders = [];
  try {
    allOrders = JSON.parse(localStorage.getItem('gnapakalu_customer_orders') || '[]');
  } catch (e) {}
  const order = allOrders.find(o => o.orderId === orderId);
  if (!order) {
    showToast('Order not found!');
    return;
  }
  showToast(`Sending email alert for ${orderId} to Sridevigummadi37@gmail.com...`);
  const result = await dispatchOrderEmail(order);
  if (result && result.success) {
    showToast(`🟢 Email dispatched to Sridevigummadi37@gmail.com! ✓`);
  } else if (result && result.needsActivation) {
    alert(
      `⚠️ ACTION REQUIRED TO RECEIVE EMAILS:\n\n` +
      `FormSubmit sent an activation email to Sridevigummadi37@gmail.com.\n\n` +
      `1. Open Gmail for Sridevigummadi37@gmail.com\n` +
      `2. Check your Inbox (and SPAM / Promotions folder) for an email from FormSubmit.\n` +
      `3. Click the "Activate Form" button inside that email.\n\n` +
      `Once you click Activate, all customer order emails and UTR numbers will automatically arrive in your Gmail!`
    );
  } else {
    showToast(`⚠️ Please check your internet connection or email activation.`);
  }
}

async function triggerEmailActivationTest() {
  const btn = document.getElementById('mgmtTestEmailBtn');
  const originalText = btn ? btn.innerHTML : '⚡ Verify / Test Email Delivery';
  if (btn) {
    btn.innerHTML = '⏳ Testing connection...';
    btn.disabled = true;
  }

  const testOrder = {
    orderId: '#TEST-' + Math.floor(100000 + Math.random() * 900000),
    orderDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    customerName: 'Megha (Test Check)',
    customerPhone: '9392430460',
    houseNo: 'Store HQ',
    address: 'Gnapakalu by Megha Studio',
    landmark: 'Central',
    state: 'Andhra Pradesh',
    pincode: '530001',
    items: [
      { name: 'Connection Test Item', selectedVariant: 'Standard', qty: 1, price: 1, total: 1 }
    ],
    subtotal: 1,
    subtotalFormatted: '₹1',
    discount: 0,
    discountFormatted: '₹0',
    shippingZone: 'AP',
    courierCharge: 0,
    courierChargeFormatted: '₹0',
    grandTotal: 1,
    grandTotalFormatted: '₹1',
    paymentApp: 'PhonePe',
    utrNumber: 'TEST12345678',
    transactionId: 'TXNTEST123',
    paymentStatus: 'Payment Verified (Test)'
  };

  const res = await dispatchOrderEmail(testOrder);

  if (btn) {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }

  if (res && res.success) {
    alert('🟢 SUCCESS!\n\nEmail server is 100% ACTIVE and working!\nA test order email was just delivered to Sridevigummadi37@gmail.com.\n\nCheck your Gmail inbox now!');
  } else if (res && res.needsActivation) {
    alert(
      '⚠️ ACTION REQUIRED ON GMAIL:\n\n' +
      'FormSubmit has sent a confirmation email to Sridevigummadi37@gmail.com with subject "Activate Form".\n\n' +
      'Steps to activate:\n' +
      '1. Open Gmail for Sridevigummadi37@gmail.com\n' +
      '2. Check Inbox, SPAM, or Promotions tab for "FormSubmit"\n' +
      '3. Open the email and click the green "Activate Form" button.\n\n' +
      'Once activated, all future orders will arrive in your Gmail automatically!'
    );
  } else {
    alert('Notice: FormSubmit activation email sent to Sridevigummadi37@gmail.com. Please open Gmail (check Spam) and click Activate.');
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

// Compress image file to standard dimensions for ultra-fast loading across mobile and cloud
function compressImageFile(file, maxWidth = 600, maxHeight = 600, quality = 0.70) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(ev.target.result);
      img.src = ev.target.result;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

async function handleMgmtImageUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const placeholder = document.getElementById('mgmtImagePreviewPlaceholder');
  if (placeholder) {
    placeholder.textContent = '⏳ Processing image...';
    placeholder.style.display = 'block';
  }

  try {
    // Compress immediately client-side for rapid rendering
    const compressedDataUrl = await compressImageFile(file, 700, 700, 0.75);
    mgmtUploadedImageDataUrl = compressedDataUrl;
    showMgmtImagePreview(compressedDataUrl);

    // Upload to Freeimage CDN in background for clean short CDN URL
    const formData = new FormData();
    formData.append('key', '6d207e02198a847aa98d0a2a901485a5');
    formData.append('action', 'upload');
    formData.append('source', compressedDataUrl);
    formData.append('format', 'json');

    fetch('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: formData
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.image && data.image.url) {
          mgmtUploadedImageDataUrl = data.image.url;
          console.log('Image uploaded to CDN:', data.image.url);
        }
      })
      .catch(err => {
        console.warn('CDN upload fallback to compressed image:', err);
      });

    const urlInput = document.getElementById('mgmtProdImageUrl');
    if (urlInput) urlInput.value = '';
  } catch (err) {
    console.error('Image compression error:', err);
  }
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

async function handleMgmtFormSubmit(e) {
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

  const submitBtn = document.getElementById('mgmtSubmitBtn');
  const originalBtnContent = submitBtn ? submitBtn.innerHTML : '<span>💾 Save & Publish to Live Website</span>';
  if (submitBtn) {
    submitBtn.innerHTML = '<span>⏳ Publishing to Live Website...</span>';
    submitBtn.disabled = true;
  }

  let productObj = null;
  const syncAction = editId ? 'update_product' : 'add_product';

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
      productObj = Object.assign({}, existing);
    }
  } else {
    // ADD NEW PRODUCT
    productObj = {
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
    PRODUCTS.unshift(productObj);
  }

  // 1. Save locally and render immediately on current device
  saveProductsLocalOnly();

  // 2. Publish to cloud live (with single action for fast <1s sync)
  let cloudSuccess = false;
  if (productObj) {
    cloudSuccess = await syncSingleProductToCloud(productObj, syncAction);
  }

  // Fallback: Full push if single product action was not acknowledged
  if (!cloudSuccess) {
    console.log('Single product sync fallback to full store push...');
    cloudSuccess = await syncProductsToCloud(PRODUCTS);
  }

  if (submitBtn) {
    submitBtn.innerHTML = originalBtnContent;
    submitBtn.disabled = false;
  }

  cancelProductEditing();
  switchMgmtTab('list');

  if (cloudSuccess) {
    showToast(`🟢 Product "${name}" is now LIVE across all devices!`);
    const badge = document.getElementById('mgmtSyncStatusBadge');
    if (badge) badge.textContent = '🟢 LIVE CLOUD SYNCED';
  } else {
    showToast(`⚠️ Saved locally. Cloud sync will retry in background.`);
    setTimeout(() => syncProductsToCloud(PRODUCTS), 3000);
  }
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
  saveProductsLocalOnly();
  renderMgmtProductsTable();
  syncDeleteProductToCloud(productId);
  showToast(`Product "${p.name}" removed from store`);
}

function adjustStockInline(productId, delta) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;
  const curr = (typeof p.stock === 'number') ? p.stock : 10;
  p.stock = Math.max(0, curr + delta);
  saveProductsLocalOnly();
  renderMgmtProductsTable();
  syncStockToCloud(productId, p.stock);
  showToast(`Stock for "${p.name}" updated to ${p.stock}!`);
}

function setStockInline(productId, val) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;
  p.stock = Math.max(0, parseInt(val, 10) || 0);
  saveProductsLocalOnly();
  renderMgmtProductsTable();
  syncStockToCloud(productId, p.stock);
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
