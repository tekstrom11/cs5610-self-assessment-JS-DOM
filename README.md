# AirBNB Listings Reloaded! Again!

A single-page listing browser for San Francisco Airbnb data, built for CS 5610 (Web Development) as a self-assessment of JavaScript, the DOM, and CSS.

**Live site:** https://tekstrom11.github.io/cs5610-self-assessment-JS-DOM/

**Repository:** https://github.com/tekstrom11/cs5610-self-assessment-JS-DOM

## What it does

The page loads with an empty listings container. On load, JavaScript fetches a local JSON file over AJAX (`fetch` + `await`), takes the first 50 records, and renders each one as a Bootstrap card built from a template literal. No listing markup is written by hand — every card on the page is generated from the data.

Each card shows the listing name, nightly price, amenities, a truncated description, a thumbnail photo, the host's profile picture, and a link to the original Airbnb page.

## Data

`airbnb_sf_listings_500.json` — 523 San Francisco listings scraped from Airbnb in September 2023, of which the first 50 are displayed. Each record carries roughly 75 fields; this page uses `name`, `description`, `amenities`, `price`, `picture_url`, `property_type`, `host_name`, `host_thumbnail_url`, and `listing_url`.

Two fields needed handling rather than direct display:

- **`amenities`** arrives as a JSON-encoded *string*, not an array, so it is parsed before rendering. Listings carry anywhere from 4 to 66 amenities, so the card shows the first six followed by a "+N more" count.
- **`price`** is a pre-formatted string (`"$187.00"`) rather than a number.

## Design decisions

**Broken images.** The dataset is two years old and roughly a fifth of the listing photo URLs now 404 against Airbnb's CDN. Rather than let those cards render with broken-image icons, each `<img>` carries an `onerror` handler that swaps in a local placeholder and tags the element with a class so it can be styled as a deliberate "no photo" state instead of looking like a failure.

**Uniform cards.** Listing descriptions vary from one sentence to several paragraphs, which would otherwise produce wildly uneven rows. Descriptions and titles are truncated with `-webkit-line-clamp`, images are locked to a fixed height with `object-fit: cover`, cards stretch to fill their grid column, and the call-to-action button is pushed to the bottom of each card with an auto top margin so every button aligns.

**Host avatar.** The host's profile photo is absolutely positioned as a circular badge straddling the bottom edge of the listing photo, which required a positioning wrapper around the image.

**Responsive grid.** One column on phones, two on small screens, three on large.

## Creative additions

- **Editorial voice.** The page is written in a mildly cynical register about the San Francisco rental market. The call-to-action on each card reads "Help Pay [Host]'s Mortgage" rather than "Book Now."
- **Overlapping circular host avatar** on the listing photo, in the style of a profile badge.
- **Graceful "no photo available" state** with a local placeholder, rather than broken image icons.
- **Amenity badges** with an overflow count.

## Running locally

The page fetches a local JSON file, so it must be served over HTTP. Opening `index.html` directly from the filesystem will fail with a CORS error.

```
npx serve .
```

Or use the Live Server extension in VS Code.

## Project structure

```
index.html                     page shell, navbar, intro, empty listings container
css/main.css                   custom styles layered on top of Bootstrap 5.3
js/main.js                     fetch, card template, render loop
images/missing.jpg             placeholder for listings with dead photo URLs
airbnb_sf_listings_500.json    the dataset
```

## Known limitations

- Roughly 11 of the 50 displayed listings have photo URLs that no longer resolve; these fall back to the placeholder image.
- Some listings have since been delisted, so a few "Help Pay [Host]'s Mortgage" links land on an Airbnb error page.
- `loadData` does not yet surface a user-facing error state if the fetch itself fails.

## Use of AI

I used Anthropic's Claude (via Claude Code) throughout this assignment. Specifically:

**As a tutor.** I explicitly asked it not to hand me solutions, and used it to explain concepts as I hit them: how AJAX and `fetch`/`await` work, how template literals interpolate into HTML, the difference between `const` and `let`, how CSS specificity resolves conflicts between my rules and Bootstrap's, how `object-fit` and `-webkit-line-clamp` behave, and how absolute positioning anchors to a positioned ancestor.

**For debugging.** It identified several bugs I could not spot, including a typo'd CSS selector (`#lintings` for `#listings`), a second typo'd selector (`.card-image-top` for `.card-img-top`), an invalid one-line `position` declaration that the browser was silently discarding, JavaScript statements written as HTML attributes rather than inside an `onerror` attribute value, a `const` declared without an initializer, and a class name that was hyphenated in the CSS but underscored in the JS.

**For data inspection.** It ran scripts against the JSON to check the shape of the `amenities` field, confirm every record parsed cleanly, and verify which listing photo URLs still resolve — which is how I learned that 11 of the 50 were dead.

**It wrote directly:** the `getAmenitiesCode` function (which I requested outright, late in the process), the two CSS rules that pin the card button to the bottom, the introductory paragraph on the page, and this README.

**I wrote:** the rest of the JavaScript and CSS, all layout and design decisions, and the site's editorial voice.

## License

[MIT](LICENSE). Listing data is from [Inside Airbnb](http://insideairbnb.com/).
