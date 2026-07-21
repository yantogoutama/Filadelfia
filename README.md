# Filadelfia Ministry — Modern Daily Devotion Website

A complete, production-ready Christian devotional website that runs entirely on **GitHub Pages (FREE)**.

## Quick Start

1. Fork or upload this repository to GitHub
2. Go to **Settings > Pages**
3. Select source: **Deploy from a branch**
4. Choose branch: **main**, folder: **/(root)**
5. Your site will be live at `https://yourusername.github.io/filadelfia-ministry`

## Daily Workflow (Owner Only)

**Every morning, replace ONE file:**

```
/content/today.md
```

That's it. The website updates automatically.

## Markdown Format

Each `today.md` must follow this exact structure:

```markdown
---
title: Your Devotion Title
date: YYYY-MM-DD
verse: Bible Verse Reference
---

# Embun Pagi

## Judul
...

## Ayat
...

## Renungan
...

## Quotes
...

---

# Youth Devotion

## Judul
...

## Ayat
...

## Renungan
...

## Doa
...

## Quotes
...

---

# Daily Devotion

## Title
...

## Verse
...

## Reflection
...

## Prayer
...

## Inspirational Quote
...
```

## Archiving Devotions

### Method 1: Manual (Recommended)
After publishing today's devotion, copy `today.md` to:
```
/content/archive/YYYY-MM-DD.md
```

### Method 2: Using the "Archive Today" Button
Click the **"Archive Today"** button on the website. It will download the file. Move the downloaded file to `/content/archive/`.

### Method 3: Bulk Archive Script
Run the included Python script to generate `archive-index.json`:

```bash
python scripts/generate-archive-index.py
```

## Features

- Responsive design (mobile-first)
- Dark / Light mode toggle
- Reading progress bar
- Estimated reading time
- Previous / Next devotion navigation
- Archive with search (by title, verse, keyword)
- Print-friendly layout
- SEO optimized (Open Graph, Twitter Cards)
- Fast loading with smooth animations
- Beautiful typography with warm Christian colors

## File Structure

```
/
├── index.html          # Main page (NEVER EDIT)
├── style.css           # Styles (NEVER EDIT)
├── script.js           # JavaScript (NEVER EDIT)
├── /assets             # Images and assets
├── /content
│   ├── today.md        # DAILY EDIT THIS FILE
│   └── /archive        # Past devotions
│       └── YYYY-MM-DD.md
└── /scripts            # Helper scripts
    └── generate-archive-index.py
```

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- marked.js (Markdown parser)
- GitHub Pages (hosting)

**No backend. No database. No build step.**

## License

© Filadelfia Ministry. All rights reserved.
