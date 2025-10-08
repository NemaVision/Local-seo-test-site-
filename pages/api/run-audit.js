export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const payload = req.body || {};
    // TODO: paste your Make webhook URL below
    const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "";
    if (!WEBHOOK_URL) return res.status(500).json({error: 'Missing MAKE_WEBHOOK_URL'});
    const r = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    return res.status(r.ok ? 200 : 502).json({ok: r.ok});
  } catch (e) {
    return res.status(500).json({error: e?.message || 'unknown'});
  }
}
