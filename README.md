# Ember & Crust

An original, responsive artisan pizzeria website built with React, TypeScript, TanStack Start, Vite and Tailwind CSS. The menu, pizza builder and local cart work without an account. **Checkout and newsletter delivery are intentionally not connected.** Restaurant details are fictional examples and must be replaced before launch.

## Run locally

Requires Node.js 20+ and npm.

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
```

TanStack Start produces a server-rendered application in `.output/`. On Hostinger, use a hosting plan that supports a persistent Node.js application (not static-only shared hosting). Deploy the project files, install dependencies, run `npm run build`, and configure the app process to start the generated server (`node .output/server/index.mjs`). Set the port through Hostinger's environment configuration. Direct visits to `/privacy` and `/terms` work through the server. If your Hostinger plan only hosts static files, this server-rendered project needs conversion to a static Vite SPA before it can be hosted there; uploading `.output/` as static files will not work. Test this on your chosen plan before launch.

## Customize

- Restaurant name, address, telephone, email, opening hours, directions URL, social URLs, menu products and pizza builder pricing: `src/lib/restaurant.ts`.
- Photos: replace the original optimized WebP files in `src/assets/` (keep filenames or update imports).
- Visual styles: `src/styles.css`.
- Site copy and sections: `src/components/HomePage.tsx`.
- Checkout integration: replace the non-payment notice in `src/components/CartDrawer.tsx` with a properly secured payment flow; never process payment details only in the browser.
- Newsletter: connect the form in `src/components/HomePage.tsx` to your mailing-list provider before accepting addresses. The current form validates locally but does not store them.
- The provided address, phone and email are illustrative, not verified business contact information. Replace them before publishing. Social links are hidden until configured.
