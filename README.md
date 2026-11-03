# Chomp Gums — Design 1: Editorial Care

A responsive static website using the existing Editorial Care template design and interaction patterns, adapted with Chomp Gums brand details and product imagery.

## Run it
Open `index.html` in a browser, or serve the folder with a local static web server.

## Customize
The page is based on information from Chomp Gums’ public website and Keri Marshall’s public LinkedIn profile. Review product labels and current product pages before publishing claims. Business details, product positioning, and policies can change; the store remains the source of truth for current product and legal information.

## Files
- `index.html` — home page and brand content
- `styles.css`, `script.js` — responsive layout and interactions
- `chomp-logo-white.png` — extracted Chomp Gums primary white wordmark
- `images/` — locally optimized WebP product photos
- `privacy.html`, `terms.html` — links to the official current policy pages
- `robots.txt`, `sitemap.xml` — update the domain if hosting elsewhere

## Performance and motion
Product images are local WebP assets with intrinsic dimensions and lazy loading below the hero. The former third-party map and remote stock photography were removed. Scroll reveals use one IntersectionObserver; there are no looping animations. The hero headline animates word by word, hover feedback is limited to interactive elements, and reduced-motion preferences are respected.