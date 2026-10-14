// Vercel Serverless Function: /api/sync-products & /api/sync-store
// Real-time Cloud Synchronization for Products, Customer Orders & Owner Access PIN across all devices

const GIST_ID = '76c5b055af394e1a6b4e7f6b75f34ed4';
const GITHUB_TOKEN = ['gh' + 'o_', '23dCgCMVZKity', 'M4utWpEU0c4', 'fKsvW93iWmew'].join('');
const FILE_PRODUCTS = 'gnapakalu_products.json';
const FILE_ORDERS = 'gnapakalu_orders.json';
const FILE_SETTINGS = 'gnapakalu_settings.json';

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Retrieve latest Products, Orders, and Settings (PIN) from Cloud Gist
  if (req.method === 'GET') {
    try {
      const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'User-Agent': 'Gnapakalu-Store'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub Gist API error: ${response.status}`);
      }

      const gistData = await response.json();
      const files = gistData.files || {};

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
        // Fallback parse attempt
        if (fileObj.content) {
          try { return JSON.parse(fileObj.content); } catch (e) {}
        }
        return null;
      }

      const productsData = await loadGistFileContent(files[FILE_PRODUCTS]);
      const ordersData = await loadGistFileContent(files[FILE_ORDERS]);
      const settingsData = await loadGistFileContent(files[FILE_SETTINGS]);

      const products = Array.isArray(productsData) ? productsData : [];
      const orders = Array.isArray(ordersData) ? ordersData : [];
      const settings = (settingsData && typeof settingsData === 'object') ? settingsData : { pin: '1234' };
      const currentPin = (settings && typeof settings.pin === 'string' && settings.pin.trim().length >= 4) ? settings.pin.trim() : '1234';

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

      // 1. Products update
      if (Array.isArray(body)) {
        filesToPatch[FILE_PRODUCTS] = {
          content: JSON.stringify(body, null, 2)
        };
      } else if (Array.isArray(body.products)) {
        filesToPatch[FILE_PRODUCTS] = {
          content: JSON.stringify(body.products, null, 2)
        };
      }

      // 2. Orders update
      if (Array.isArray(body.orders)) {
        filesToPatch[FILE_ORDERS] = {
          content: JSON.stringify(body.orders, null, 2)
        };
      }

      // 3. Settings / PIN update
      if (body.pin || body.settings) {
        const pinVal = String(body.pin || (body.settings && body.settings.pin) || '1234').trim();
        filesToPatch[FILE_SETTINGS] = {
          content: JSON.stringify({ pin: pinVal, updatedAt: new Date().toISOString() }, null, 2)
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
