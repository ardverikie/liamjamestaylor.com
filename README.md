# liamjamestaylor.com

A minimal, anti-design website for writer Liam James Taylor.

## Design Philosophy

**Anti-design** — broken grids, raw typography, deliberate asymmetry, intentionally imperfect layouts.

**Biophilic** — organic SVG shapes, muted earth-tone accents (deep moss), nature-inspired textures, subtle grain overlay.

**Maximum contrast** — stark black (#0a0a0a) and off-white (#f5f5f0) with selective green accents.

## Sections

- **Home** — Hero statement with organic background shapes
- **About** — Bio, stats, organic SVG decoration
- **Portfolio** — Protected work (locked behind modal for unpublished pieces)
- **Journal** — Writing process notes (placeholder entries)
- **Contact** — Simple form + email link

## Anti-Crawling Protections

- `robots.txt` blocks AI training bots (GPTBot, ChatGPT-User, CCBot, Claude, etc.)
- Meta tags: `noai`, `nosnippet`, `noimageindex`, `noarchive`
- Dynamic content loading via JavaScript (blocks non-JS crawlers)
- Right-click disabled on portfolio content
- Text selection disabled on protected content
- Console message for curious visitors
- Bot user-agent detection (optional full block — see comments in `js/main.js`)

## Setup: GitHub Pages

### Quick Start

1. **Create a GitHub repository** named `liamjamestaylor.com` (or any name)

2. **Push the files:**
   ```bash
   cd /Users/liamtaylor/.openclaw/workspace/liamjamestaylor-com
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repo Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `/ (root)`
   - Save

4. **Connect your domain:**
   - In Settings → Pages → Custom domain, enter `liamjamestaylor.com`
   - Add a CNAME record in your DNS provider pointing to `YOUR_USERNAME.github.io`
   - Wait for DNS propagation (up to 48 hours)

### File Structure

```
liamjamestaylor-com/
├── index.html          # Main site (single page, all sections)
├── 404.html            # Custom 404 page
├── robots.txt          # AI bot blocking rules
├── css/
│   └── styles.css      # All styles (anti-design + biophilic + contrast)
├── js/
│   └── main.js         # Interactions + anti-crawling logic
└── README.md           # This file
```

## Customization

### Update Content

Edit `index.html` and look for `data-content="key"` attributes. The values are stored in `js/main.js` in the `_0x` array. This keeps content separate and makes it harder for scrapers to find.

### Update Portfolio Entries

In `index.html`, find `<article class="portfolio-entry">` blocks. Update:
- `data-content="entry1_title"` — the title
- `data-content="entry1_excerpt"` — the description
- `data-content="entry1_type"` — genre/type
- `data-content="entry1_status"` — e.g., "In revision", "Draft", "Submitted"

### Update Journal Entries

In `index.html`, find `<article class="journal-entry">` blocks. Update:
- `data-content="journal1_date"` — publication date
- `data-content="journal1_title"` — entry title
- `data-content="journal1_excerpt"` — preview text

### Update Contact

- Change `hello@liamjamestaylor.com` to your real email
- Uncomment and add social links in the `.contact-social` div
- For a real form, connect to [Formspree](https://formspree.io) or [Netlify Forms](https://netlify.com):

  ```html
  <form action="https://formspree.io/f/YOUR_ID" method="POST">
  ```

### Add Real Writing

When pieces are ready for publication:
1. Create a new HTML file in the repo (e.g., `pieces/title.html`)
2. Link to it from the portfolio entry (change `data-protected="true"` to `false` and update the button to a normal link)

## Browser Support

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile responsive (tested 320px+)

## Local Development

Open `index.html` in any browser. No build step required — this is pure static HTML/CSS/JS.

## License

© 2025 Liam James Taylor. All rights reserved.

This site and its content are unpublished work. Unauthorized reproduction is prohibited.
