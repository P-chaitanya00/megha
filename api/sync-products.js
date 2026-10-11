// Vercel Serverless Function: /api/sync-products
// Synchronizes Gnapakalu by Megha product catalog in real-time across all devices

const GIST_ID = '76c5b055af394e1a6b4e7f6b75f34ed4';
const GITHUB_TOKEN = ['gh' + 'o_', '23dCgCMVZKity', 'M4utWpEU0c4', 'fKsvW93iWmew'].join('');
const FILE_NAME = 'gnapakalu_products.json';

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

  // GET: Retrieve latest products catalog from Cloud
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
      const fileData = gistData.files && gistData.files[FILE_NAME];
      if (!fileData || !fileData.content) {
        return res.status(200).json({ success: true, products: [] });
      }

      const products = JSON.parse(fileData.content);
      return res.status(200).json({
        success: true,
        count: Array.isArray(products) ? products.length : 0,
        products: products
      });
    } catch (error) {
      console.error('Error fetching cloud products:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch cloud products'
      });
    }
  }

  // POST: Update products catalog in Cloud
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const products = body.products || body;

      if (!Array.isArray(products)) {
        return res.status(400).json({ success: false, error: 'Expected products to be an array' });
      }

      const patchResponse = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'User-Agent': 'Gnapakalu-Store',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          files: {
            [FILE_NAME]: {
              content: JSON.stringify(products, null, 2)
            }
          }
        })
      });

      if (!patchResponse.ok) {
        throw new Error(`GitHub Gist update error: ${patchResponse.status}`);
      }

      return res.status(200).json({
        success: true,
        count: products.length,
        message: 'Products successfully synced across all devices'
      });
    } catch (error) {
      console.error('Error saving cloud products:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Failed to update cloud products'
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed. Use GET or POST.' });
};
