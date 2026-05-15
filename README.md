# RD Cafe

Premium café website for RD Cafe, built with Vite, React, TypeScript, Tailwind CSS, and Sanity Studio.

## Tech stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Sanity Studio

## Local development

From the project root:

```sh
npm install
npm run dev
```

The site runs at `http://localhost:8080`.

## CMS development

Sanity Studio lives in `sanity-studio/`.

Run both the site and Studio together:

```sh
npm run dev:cms
```

Local paths:

- Site: `http://localhost:8080`
- CMS entry: `http://localhost:8080/cafe-admin`
- Studio: `http://localhost:8080/cafe-admin/studio`

## Build

```sh
npm run build
```

## Deploy

The main frontend can be deployed to Vercel.  
Set the required environment variables from `.env.example` in Vercel before deploying.
