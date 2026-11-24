# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Product weights and inventory

The storefront reads its catalog from the Google Sheets-backed JSON endpoint configured by
`VITE_GOOGLE_SHEET_API`. There is no separate admin dashboard or write API in this project;
admins continue to manage products in the source sheet, and the endpoint should return the
updated sheet rows.

For products sold by weight, use either format:

- **One row per weight:** name rows with a trailing weight (for example, `Stock Fish Tusk 100g`,
  `Stock Fish Tusk 200g`, through `Stock Fish Tusk 500g`), or provide the weight in a `weight`
  column. Set each row's `price`, `available`, and `stock` values. Rows with the same base name
  and category appear as one product with selectable options.
- **One row with multiple weights:** provide `size1` through `size5`, matching `price1` through
  `price5`, optional `available1` through `available5`, and optional `stock1` through `stock5`.

Use the actual prices and stock counts for all five Stock Fish Tusk weights in the sheet; the
storefront does not invent prices or availability for missing entries. A zero stock count makes
that option unavailable. Cart entries are kept separate for each selected weight.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
