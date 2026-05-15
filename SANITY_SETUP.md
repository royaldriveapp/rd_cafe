# Sanity Setup

This repo already includes a working Sanity Studio plus frontend fetch wiring. The only remaining work is:

1. set the environment variables
2. enable CMS in the frontend
3. seed the dataset
4. run the app and Studio together

## What is already wired

The frontend can read from Sanity for:

- `siteSettings`
- `facilitiesPage`
- `galleryPage`
- `contactPage`
- `blogPage`
- `blogPost`

If Sanity is disabled or unreachable, the app falls back to the local content in [src/data/siteContent.ts](/Users/apple/Desktop/sites/cafe/rd-cafe-haven/src/data/siteContent.ts:1), so development does not break.

## Current content model

The included Studio schemas are:

- `siteSettings`
- `menuItem`
- `facilitiesPage`
- `galleryPage`
- `contactPage`
- `blogPage`
- `blogPost`

## 1. Use an LTS Node version

Use `Node 20` or `Node 22`.

`Node 25` can fail during Sanity / esbuild install.

Check your version:

```bash
node -v
```

## 2. Install dependencies

Root app:

```bash
npm install
```

Sanity Studio:

```bash
cd sanity-studio
npm install
cd ..
```

## 3. Set the frontend environment

Copy the root example:

```bash
cp .env.example .env
```

Set these values in `.env`:

```bash
VITE_ENABLE_CMS=true
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-02-19
VITE_SANITY_USE_CDN=true
VITE_SANITY_STUDIO_URL=http://localhost:8080/sanity
```

Important:

- `VITE_ENABLE_CMS` must be `true`
- right now this repo defaults to `false`, which keeps Sanity disconnected

## 4. Set the Studio environment

Copy the Studio example:

```bash
cp sanity-studio/.env.example sanity-studio/.env
```

Set these values in `sanity-studio/.env`:

```bash
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## 5. Log into Sanity CLI if needed

If you have not already authenticated:

```bash
cd sanity-studio
npx sanity login
cd ..
```

## 6. Seed the content

Menu only:

```bash
npm run cms:seed:menu
```

All included content:

```bash
npm run cms:seed:all
```

The full seed includes:

- menu items
- site settings
- facilities page
- gallery page
- contact page
- blog page
- starter blog posts

## 7. Run locally

### Option A: one command

Run both the frontend and Studio together:

```bash
npm run dev:cms
```

This starts:

- the frontend at `http://localhost:8080`
- the Studio inside the site at `http://localhost:8080/sanity`

### Option B: two processes

If you prefer to run them separately:

```bash
npm run dev
```

and in another terminal:

```bash
npm run cms:studio
```

## 8. Verify it is working

Open:

```bash
http://localhost:8080/sanity
```

You should see:

- `Site Settings`
- `Menu Item`
- `Facilities Page`
- `Gallery Page`
- `Contact Page`
- `Blog Page`
- `Blog Post`

Then verify the site routes:

- `/menu`
- `/facilities`
- `/gallery`
- `/contact`
- `/blog`
- `/blog/<slug>`

## Notes

### `/admin` is not the CMS

The existing `/admin` page is still a local operational/dashboard prototype. Sanity Studio is the real content editor.

### Frontend fallback behavior

If Sanity fails or is disabled, the app will continue rendering local content from the repo. That makes migration much safer.

### Recommended rollout order

1. enable CMS
2. seed all content
3. verify the Studio
4. verify the public pages
5. only then start editing live content in Sanity
