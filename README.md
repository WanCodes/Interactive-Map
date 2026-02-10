## Interactive Office Locations Map

An interactive world map showcasing office locations. Each location has a clickable point and label that reveals a description panel on larger screens and a lightbox-style message on smaller screens.

### Features

- **Responsive map scaling**: The map scales with the container width while keeping markers, labels, and callouts positioned correctly.
- **Interactive markers**: Clicking a point or its label opens a message panel connected by an animated line.
- **Mobile-friendly lightbox**: On small screens, messages appear in a centered lightbox instead of fixed side panels.
- **Smooth animations**: Uses GSAP `TweenMax` for line and panel animations.

### Tech Stack

- **HTML**: Structure in `index.html`
- **CSS**: Layout, fonts, and map styling in `map.css`
- **JavaScript**: Interaction logic in `map.js` using:
  - jQuery (from CDN)
  - GSAP TweenMax (from CDN)

### Project Structure

- **`index.html`**: Main HTML page that loads the map, styles, and scripts.
- **`map.css`**: Styles for the map background, points, labels, lines, and message panels.
- **`map.js`**: `Map` object that:
  - Tracks available locations
  - Registers click handlers for each location
  - Calculates and animates line height/position
  - Opens and closes location panels and the mobile lightbox
- **Assets (expected)**:
  - `map.jpg` – background image for the map (referenced in `map.css`)
  - `close_button.png` – close icon for message boxes (referenced in `map.css`)

### Getting Started

1. **Clone or download** this repository.
2. Ensure `index.html`, `map.css`, `map.js`, `map.jpg`, and `close_button.png` are in the same directory.
3. Open `index.html` directly in a modern browser **or** serve the folder with a static file server, for example:

```bash
cd Interactive-Map
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

### Customizing Locations

- **Add or remove locations in JavaScript**:
  - Edit the `this.countires` array in `map.js` to include or remove location names.
- **Add corresponding HTML blocks**:
  - For each location (e.g. `london`), create a `div` with id `<name>_point` in `index.html`, matching the existing structure for point, label, and message box.
- **Adjust positioning in CSS**:
  - Add a `#<name>_point` section in `map.css` (similar to `#chicago_point`, `#london_point`, etc.) and tweak `left`/`top` and label/line offsets.

### Browser Support

- Designed for modern browsers.
- Uses external font and script CDNs, so an internet connection is required unless you host those assets locally.

### License

Add your preferred license here (e.g. MIT). If this is for internal/demo use only, document any usage restrictions your team requires.

