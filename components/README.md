# DREAMZ DC components

Vanilla JS stand-ins for the Ganjavores Next.js `components/` folder.

Dreamz stays a static site (Express locally, Vercel static + `public/` in production). Do **not** copy Ganjavores `app/`, `lib/`, or `supabase/` into this repo — those need Next.js and would break the current deploy.

| File | Ganjavores equivalent | Purpose |
| --- | --- | --- |
| `age-gate.js` | `components/age-gate.tsx` | 21+ overlay on every page. Persists in `localStorage` (`dreamz_age_ok_2026`). Never auto-dismisses. |
| `site-chrome.js` | `components/site-header.tsx` + `site-footer.tsx` | Thin alias. Live header/footer/cart drawer still live in `public/js/site.js`. |
| `business-info.js` | `lib/business-info.ts` | Single source of truth for address, hours, phone, socials. |

Include on every public HTML page, as the first script:

```html
<script src="/components/age-gate.js"></script>
```

`public/components/` is the copy Express and Vercel actually serve (`/components/age-gate.js`). Keep both folders in sync.
