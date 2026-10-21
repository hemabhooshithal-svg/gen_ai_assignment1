# Budget Buddy

A single-page, no-login, stateless AI chatbot that explains money basics (salary, SIP, UPI safety, budgeting, tax) to first-time earners. Hosted free on GitHub Pages.

## Features
- Chat-style single page, no login, no database. Each question is sent alone; no history is stored or sent to the model.
- Two personas (Strict Aunty, Chill Senior), audience picker, English / Hindi / Kannada.
- Structured answers: simple answer, rupee example, one "do this today" action.
- Built-in offline guide (11 topics, English) if the live AI is unavailable, so the demo never breaks.
- Safety: no product/stock recommendations, discourages sharing PINs/OTPs, output rendered as plain text.

## Files
`index.html`, `style.css`, `app.js` (config + chat logic), `kb.js` (offline knowledge base), `worker.js` (optional secure proxy, not deployed to GitHub).

## Where the API key goes
Only in the `CONFIG` block at the top of `app.js`:
- `PROXY_URL`: recommended. Deploy `worker.js` on Cloudflare Workers (key stored as a secret there).
- `API_KEY`: demo only. Anything in GitHub Pages is public, so the key can be copied by visitors.

## Deploy on GitHub Pages
1. Create a public repo, upload `index.html`, `style.css`, `app.js`, `kb.js`, `README.md`.
2. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Open `https://YOURNAME.github.io/REPO/`.

## Limits
Educational only, not financial advice. Offline mode is English-only. Rate limiting needs a proxy (Cloudflare can add it).
