// Cloudflare Worker: keeps your Anthropic key secret. Free tier is enough.
// Setup: Cloudflare dashboard > Workers > Create > paste this file.
// Settings > Variables and Secrets: add secret ANTHROPIC_API_KEY, and (optional) variable ALLOWED_ORIGIN = https://YOURNAME.github.io
// Then put the worker URL in CONFIG.PROXY_URL in app.js.

export default {
  async fetch(req, env) {
    const origin = env.ALLOWED_ORIGIN || '*';
    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type',
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return new Response('Not found', { status: 404, headers: cors });
    if (env.ALLOWED_ORIGIN && req.headers.get('Origin') !== env.ALLOWED_ORIGIN) {
      return new Response('Forbidden', { status: 403, headers: cors });
    }

    let body;
    try { body = await req.json(); } catch { return new Response('Bad request', { status: 400, headers: cors }); }

    const message = String(body?.messages?.[0]?.content || '').slice(0, 500);
    if (!message) return new Response('Empty', { status: 400, headers: cors });

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: env.CLAUDE_MODEL || 'claude-sonnet-5-5', // fixed server-side
        max_tokens: 700,                                // capped server-side
        system: String(body.system || '').slice(0, 4000),
        messages: [{ role: 'user', content: message }], // stateless: one message only
      }),
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { ...cors, 'content-type': 'application/json' },
    });
  },
};
