This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Generate typedefs from backend using:

```bash
npm run generate-typedefs
```

Afterwards update components.ts with the types you want to extract from components in ```/types/api.ts``` -> TODO: Script for this

TODO:
    [ ] replace all local URLs when deploying
    [ ] automate that session in cookie is invalidated if users request is rejected
