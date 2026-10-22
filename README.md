# Interactive Map

<img width="800" height="468" alt="Office map with markers for London, Krakow, Chicago, Bangalore, and Melbourne" src="https://github.com/user-attachments/assets/66669434-a105-4228-a455-9d338768c3af" />

Responsive interactive map of IG Group offices, built for the [careers page](http://www.iggroup.com/careers). London, Krakow, Chicago, Bangalore, and Melbourne are clickable points. A wide layout opens a description panel joined to the city by an animated line. Under a container width of 700px, the same copy opens in a lightbox.

**Wan Yau** · Senior Full Stack Developer · London · [GitHub WanCodes](https://github.com/WanCodes)

The public careers page has been redesigned and no longer shows this map. This repository is the source. The initial commit is July 2018.

## Features

- **Scaled artwork, stable pins.** `map.jpg` is 800×467. `#map` scales to the width of `#container` (max-width 800px) from the top-left. Marker dots are counter-scaled so they stay a constant size. Connector length is measured from each panel on resize, so the line still meets the callout after scaling.
- **One city at a time.** Click the dot or its label. Other panels close, a line grows to the panel (0.3s), then the description slides in (0.3s). Closing reverses that: the panel slides away, then the line collapses. Each label also has its own static line, separate from that animated connector.
- **Narrow layout.** When `#container` is narrower than 700px, side panels and animated connectors are hidden. The description opens in `#msg_litebox`, sized to the scaled map, with a 0.5s scale and fade. Clicking the lightbox closes it. At 700px and above the lightbox is not displayed. Below a viewport width of 400px, the lightbox title and message use smaller type.
- **Office copy in the page.** Titles and descriptions live in each city block in `index.html`. The lightbox copies `.title` and `.message` from the city that was opened.

## Tech stack

Static files. There is no package manager and no build.

| Piece | Source |
| --- | --- |
| Markup | `index.html` |
| Layout and type | `map.css` |
| Interaction | `map.js` (`Map`, started from a jQuery ready handler) |
| DOM | jQuery 3.2.1 (Google CDN) |
| Animation | GSAP TweenMax 1.18.0 (cdnjs) |
| Map | `map.jpg` (800×467) |
| Close icon | `close_button.png` (14×14) |
| Type | Avenir Next (300–700) from Fonts.com (`fast.fonts.net`) and `a.c-dn.net`, then Arial and Helvetica. Message body copy is Arial. |

`index.html` sets `X-UA-Compatible` to `IE=10,Edge`. It does not set a viewport meta tag, so a phone browser can lay the page out wider than 700px and stay on the side panels. To see the lightbox, narrow the window below 700px, or add `<meta name="viewport" content="width=device-width, initial-scale=1">` on the host page.

jQuery, TweenMax, and Avenir Next load from CDNs, so the page needs a network connection. The map image and close icon are in the repository. If the webfonts do not load, the Arial and Helvetica fallbacks apply.

## Project structure

```
Interactive-Map/
├── index.html         # One .country block per city, plus #msg_litebox
├── map.css            # Pin positions, panels, type, lightbox type sizes
├── map.js             # Listeners, scale, line length, open and close
├── map.jpg            # Map background, 800×467
└── close_button.png   # Close icon, 14×14
```

## Run

Nothing to install or compile.

```bash
git clone https://github.com/WanCodes/Interactive-Map.git
cd Interactive-Map
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

Opening `index.html` directly also works. `map.css`, `map.js`, and the images sit next to that file. jQuery and TweenMax come from CDNs.

## Add a city

The city list, the markup, and the CSS positions are maintained separately. In `map.js` the list is the property `countires`:

```js
this.countires = [
  { name: "chicago" },
  { name: "london" },
  { name: "krakow" },
  { name: "bangalore" },
  { name: "melbourne" }
];
```

1. Append an entry such as `{ name: "singapore" }`. The name is the id prefix and must match `{name}_point`.
2. Copy a `.country` block in `index.html`. The London block is a complete example: `.point` with `.click_area`, `.label`, `.label_line`, `.line`, and `.msg_mask` > `.message_box` (`.close_btn`, `.title`, `.message`). Set the id, label, title, and message.
3. Add a `#singapore_point` section in `map.css`, using the same 800×467 coordinate space as the other cities. `left` and `top` place the pin. Label offset, label-line height, and message-box position are set on the child selectors. London, Krakow, and Chicago open the panel to the left of the pin. Bangalore and Melbourne open it to the right.

Click handlers are bound from that array on load. Line length is measured from the panel, so a new city does not need a separate JavaScript measurement.
