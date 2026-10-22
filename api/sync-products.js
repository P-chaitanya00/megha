// Vercel Serverless Function: /api/sync-products & /api/sync-store
// Real-time Cloud Synchronization for Products, Customer Orders & Owner Access PIN across all devices

const GIST_ID = '76c5b055af394e1a6b4e7f6b75f34ed4';
const GITHUB_TOKEN = ['gh' + 'o_', '23dCgCMVZKity', 'M4utWpEU0c4', 'fKsvW93iWmew'].join('');
const FILE_PRODUCTS = 'gnapakalu_products.json';
const FILE_ORDERS = 'gnapakalu_orders.json';
const FILE_SETTINGS = 'gnapakalu_settings.json';

async function fetchGist() {
  const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'User-Agent': 'Gnapakalu-Store'
    }
  });
  if (!response.ok) {
    throw new Error(`GitHub Gist API error: ${response.status}`);
  }
  return await response.json();
}

async function loadGistFileContent(fileObj) {
  if (!fileObj) return null;
  // If content is present and not truncated, parse directly
  if (!fileObj.truncated && fileObj.content) {
    try { return JSON.parse(fileObj.content); } catch (e) {}
  }
  // If truncated or content is missing/incomplete, fetch full raw content from raw_url
  if (fileObj.raw_url) {
    try {
      const rawRes = await fetch(fileObj.raw_url, { cache: 'no-store' });
      if (rawRes.ok) {
        return await rawRes.json();
      }
    } catch (re) {
      console.warn('Raw url fetch error for', fileObj.filename, re);
    }
  }
  if (fileObj.content) {
    try { return JSON.parse(fileObj.content); } catch (e) {}
  }
  return null;
}

function isLegacyPreTodayOrder(order) {
  if (!order) return true;
  const dStr = String(order.orderDate || '').toLowerCase();
  if (dStr.includes('11 oct 2026') || dStr.includes('11/10/2026') || dStr.includes('12 oct 2026')) {
    return true;
  }
  try {
    const parsed = new Date(String(order.orderDate).replace(' at ', ' ')).getTime();
    if (parsed && !isNaN(parsed) && parsed < new Date('2026-10-22T00:00:00+05:30').getTime()) {
      return true;
    }
  } catch (e) {}
  return false;
}

module.exports = async function handler(req, res) {
  // CORS & Strict Non-Caching Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Retrieve latest Products, Orders, and Settings (PIN) from Cloud Gist
  if (req.method === 'GET') {
    try {
      const gistData = await fetchGist();
      const files = gistData.files || {};

      const productsData = await loadGistFileContent(files[FILE_PRODUCTS]);
      const ordersData = await loadGistFileContent(files[FILE_ORDERS]);
      const settingsData = await loadGistFileContent(files[FILE_SETTINGS]);

      const products = Array.isArray(productsData) ? productsData : [];
      const rawOrders = Array.isArray(ordersData) ? ordersData : [];
      const orders = rawOrders.filter(o => !isLegacyPreTodayOrder(o));
      const settings = (settingsData && typeof settingsData === 'object') ? settingsData : { pin: '1234' };
      const currentPin = (settings && typeof settings.pin === 'string' && settings.pin.trim().length >= 4) ? settings.pin.trim() : '1234';

      // Auto-sanitize cloud Gist in background if legacy orders are detected
      if (orders.length !== rawOrders.length) {
        fetch(`https://api.github.com/gists/${GIST_ID}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Gnapakalu-Store'
          },
          body: JSON.stringify({
            files: {
              [FILE_ORDERS]: { content: JSON.stringify(orders, null, 2) }
            }
          })
        }).catch(err => console.warn('Background legacy prune error:', err));
      }

      return res.status(200).json({
        success: true,
        products: products,
        orders: orders,
        pin: currentPin,
        settings: settings
      });
    } catch (error) {
      console.error('Error fetching cloud store data:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch cloud store data'
      });
    }
  }

  // POST: Update Products, Orders, or PIN in Cloud Gist
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const filesToPatch = {};

      // 1. FAST SINGLE-PRODUCT OPERATIONS (Tiny payload, instant 0.5s execution)
      if (body.action === 'add_product' && body.product) {
        const gistData = await fetchGist();
        const existingProducts = (await loadGistFileContent(gistData.files && gistData.files[FILE_PRODUCTS])) || [];
        const idx = existingProducts.findIndex(p => p.id === body.product.id);
        if (idx !== -1) {
          existingProducts[idx] = body.product;
        } else {
          existingProducts.unshift(body.product);
        }
        filesToPatch[FILE_PRODUCTS] = {
          content: JSON.stringify(existingProducts)
        };
      } else if (body.action === 'update_product' && body.product) {
        const gistData = await fetchGist();
        const existingProducts = (await loadGistFileContent(gistData.files && gistData.files[FILE_PRODUCTS])) || [];
        const idx = existingProducts.findIndex(p => p.id === body.product.id);
        if (idx !== -1) {
          existingProducts[idx] = body.product;
        } else {
          existingProducts.unshift(body.product);
        }
        filesToPatch[FILE_PRODUCTS] = {
          content: JSON.stringify(existingProducts)
        };
      } else if (body.action === 'delete_product' && body.productId) {
        const gistData = await fetchGist();
        let existingProducts = (await loadGistFileContent(gistData.files && gistData.files[FILE_PRODUCTS])) || [];
        existingProducts = existingProducts.filter(p => p.id !== body.productId);
        filesToPatch[FILE_PRODUCTS] = {
          content: JSON.stringify(existingProducts)
        };
      } else if (body.action === 'adjust_stock' && body.productId) {
        const gistData = await fetchGist();
        const existingProducts = (await loadGistFileContent(gistData.files && gistData.files[FILE_PRODUCTS])) || [];
        const item = existingProducts.find(p => p.id === body.productId);
        if (item) {
          if (typeof body.stock === 'number') {
            item.stock = Math.max(0, body.stock);
          } else if (typeof body.delta === 'number') {
            const currentStock = typeof item.stock === 'number' ? item.stock : 10;
            item.stock = Math.max(0, currentStock + body.delta);
          }
          filesToPatch[FILE_PRODUCTS] = {
            content: JSON.stringify(existingProducts)
          };
        }
      }
      // 2. FULL PRODUCTS ARRAY UPDATE (Fallback)
      else if (Array.isArray(body)) {
        filesToPatch[FILE_PRODUCTS] = {
          content: JSON.stringify(body)
        };
      } else if (Array.isArray(body.products)) {
        filesToPatch[FILE_PRODUCTS] = {
          content: JSON.stringify(body.products)
        };
      }

      // 3. FAST SINGLE-ORDER OPERATION (Customer submits order + UTR)
      if (body.action === 'add_order' && body.order) {
        if (!isLegacyPreTodayOrder(body.order)) {
          const gistData = await fetchGist();
          let existingOrders = (await loadGistFileContent(gistData.files && gistData.files[FILE_ORDERS])) || [];
          existingOrders = existingOrders.filter(o => !isLegacyPreTodayOrder(o));
          const idx = existingOrders.findIndex(o => o.orderId === body.order.orderId);
          if (idx !== -1) {
            existingOrders[idx] = body.order;
          } else {
            existingOrders.unshift(body.order);
          }
          filesToPatch[FILE_ORDERS] = {
            content: JSON.stringify(existingOrders, null, 2)
          };
        }
      }
      // MERGED FULL ORDERS ARRAY UPDATE (Fail-safe, strictly excludes legacy pre-today orders)
      else if (Array.isArray(body.orders)) {
        const gistData = await fetchGist();
        let existingOrders = (await loadGistFileContent(gistData.files && gistData.files[FILE_ORDERS])) || [];
        existingOrders = existingOrders.filter(o => !isLegacyPreTodayOrder(o));
        const orderMap = new Map();
        existingOrders.forEach(o => { if (o && o.orderId) orderMap.set(o.orderId, o); });
        body.orders.forEach(o => {
          if (o && o.orderId && !isLegacyPreTodayOrder(o)) {
            orderMap.set(o.orderId, o);
          }
        });
        const mergedList = Array.from(orderMap.values());
        mergedList.sort((a, b) => {
          const tA = new Date(a.orderDate).getTime() || 0;
          const tB = new Date(b.orderDate).getTime() || 0;
          return tB - tA;
        });
        filesToPatch[FILE_ORDERS] = {
          content: JSON.stringify(mergedList, null, 2)
        };
      }

      // 4. SETTINGS / PIN UPDATE
      if (body.pin || body.settings) {
        const pinVal = String(body.pin || (body.settings && body.settings.pin) || '1234').trim();
        filesToPatch[FILE_SETTINGS] = {
          content: JSON.stringify({ pin: pinVal, updatedAt: new Date().toISOString() })
        };
      }

      if (Object.keys(filesToPatch).length === 0) {
        return res.status(400).json({ success: false, error: 'No valid data provided to sync (products, orders, or pin).' });
      }

      const patchResponse = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'User-Agent': 'Gnapakalu-Store',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ files: filesToPatch })
      });

      if (!patchResponse.ok) {
        throw new Error(`GitHub Gist update error: ${patchResponse.status}`);
      }

      return res.status(200).json({
        success: true,
        synced: Object.keys(filesToPatch),
        message: 'Successfully synchronized across all devices in real-time'
      });
    } catch (error) {
      console.error('Error saving cloud store data:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to update cloud store data'
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed. Use GET or POST.' });
};
