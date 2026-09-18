# Trillion Dental Lab website

## Netlify

The public site is https://trilliondentallab.netlify.app/.
Run `npm ci` with Node 22.13 or newer, then `npm test` to build and validate the static website. Netlify uses `npm run build:netlify` and publishes `dist/client`; no server or database is needed for the landing page. The existing clinic portal remains a separate service.

For a manual Netlify deployment, upload the complete contents of `dist/client` to the existing Trillion Dental Lab project. The exported `_headers` and `_redirects` support manual uploads. Do not upload source folders or the older `netlify-dist` directory.

## Checks

- `npm test`: production export plus four checks covering metadata, form links, enquiry destinations, internal anchors, static assets and essential clinic content.
- `npm run typecheck:website`: type checking for the website. The wider starter includes unused Cloudflare bindings that require separate generated types.
- `npx eslint app/page.tsx app/layout.tsx app/mobile-preview/page.tsx`: lint the website pages.
- Browser verification: desktop, tablet and small phone layouts; menu, case dialog, keyboard focus trap, Escape and focus restoration.

## Confirmed content

The supplied Google Drive lab form is linked throughout the website. Contact email comes from the form. The user confirmed that the website should retain Pt 622, Villa Batutah, Kg Bukit Marak, 16150 Kota Bharu, Kelantan, despite the different address printed on the form.

## Content still needed from the business

Exact turnaround times, delivery coverage and charges, remake terms, opening hours, zirconia brands and specifications, permissioned testimonials and authentic team/lab photographs have not been provided. The site asks clinics to confirm case-specific details without inventing these facts. A custom domain can be configured once a domain is selected and access is available.
