# Budget Buddy

A single-page, no-login, stateless AI chatbot that explains money basics (salary, SIP, UPI safety, budgeting, tax) to first-time earners in plain English. Hosted free on GitHub Pages.

## Features
- Chat-style single page. No login, no database, no stored history. Each question is sent alone to the model.
- Audience picker: student, first-job earner or freelancer.
- Structured answers: simple answer, rupee example, one "do this today" action, plus "Explain simpler" and "Give another example" buttons.
- Built-in offline guide (11 topics, English) if the live AI is unavailable, so the demo never breaks. A badge on each answer shows "Live AI" or "Offline guide".
- Safety: no stock or product recommendations, discourages sharing PINs and OTPs, output rendered as plain text (no HTML injection).

## Files
- `index.html`, `style.css`, `app.js` (config and chat logic), `kb.js` (offline knowledge base): the website.
- `worker.js`: optional Cloudflare Worker that keeps the API key secret. It contains no key, so it is safe to keep in the repo.

## Where the API key goes
Only in the `CONFIG` block at the top of `app.js`:
- `PROXY_URL`: recommended. Deploy `worker.js` on Cloudflare Workers and store the key there as a secret named `ANTHROPIC_API_KEY`. Leave `API_KEY` empty.
- `API_KEY`: demo only. Anything on GitHub Pages is public, so visitors can copy the key.

Never commit a real key to GitHub.

## Run locally
In the project folder run `python -m http.server 8000` (or `npx serve .`), then open http://localhost:8000.

## Deploy on GitHub Pages
1. Create a public repo and upload `index.html`, `style.css`, `app.js`, `kb.js`, `worker.js`, `README.md`.
2. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Open `https://YOURNAME.github.io/REPO/`.

## Limits
Educational only, not financial advice. Offline mode is English-only and covers 11 topics. Rate limiting needs the Worker (Cloudflare can add it).
