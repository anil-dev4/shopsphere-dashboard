# ShopSphere

Responsive React and TypeScript storefront based on the supplied screen flow: login, signup, home, catalog, product details, cart, checkout, order confirmation, orders, order details, and profile.

## Run

```bash
npm install
npm run dev
```

Use `npm run lint` and `npm run build` to check the project.

The catalog, sign in, checkout, and orders are a front-end demo. Cart, favorites, orders, and profile are saved in browser local storage. The `SAVE10` code applies a 10% cart discount. No payment or authentication service is connected.

Shared catalog data, state persistence, and UI components live in `src/shop/`. The screen flow and shopping state live in `src/App.tsx`.
