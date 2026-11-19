# AGENTS.md - Casual Security Inc. Website

This document provides guidance for agentic coding agents working on this repository.

## Project Overview

This is a static website for Casual Security Inc. built with [Eleventy](https://www.11ty.dev/) (11ty), a simple static site generator. The site features multiple design themes that can be swapped via environment variables.

## Build Commands

### Development
```bash
npm start              # Start dev server with retro design (default)
npm run start:retro    # Start dev server with retro design
npm run start:cyber    # Start dev server with cyber design
npm run start:hifi     # Start dev server with hifi design
npm run start:next     # Start dev server with next design
```

### Production Build
```bash
npm run build          # Build with retro design (default)
npm run build:retro    # Build with retro design
npm run build:cyber    # Build with cyber design
npm run build:hifi     # Build with hifi design
npm run build:next     # Build with next design
```

### Testing
No test framework is currently configured. If tests are added, update this section.

### Linting
No linter is currently configured. Consider adding:
- **Markdown**: markdownlint for `.md` files in `src/`
- **CSS**: stylelint for CSS files in `designs/*/styles/`
- **JavaScript**: ESLint for `.eleventy.js`

## Project Structure

```
.
├── .eleventy.js          # Eleventy configuration
├── package.json          # Node.js dependencies and scripts
├── src/                  # Content source (Markdown files)
│   ├── index.md          # Homepage
│   ├── about.md          # About page
│   ├── contact.md        # Contact page
│   └── cv.md             # CV/Resume page
├── designs/              # Design themes
│   ├── retro/            # Retro design theme
│   │   ├── templates/    # Nunjucks templates
│   │   │   └── base.njk  # Base layout template
│   │   ├── styles/       # CSS stylesheets
│   │   │   └── style.css
│   │   └── images/       # Theme images
│   ├── cyber/            # Cyber design theme
│   ├── hifi/             # Hi-Fi design theme
│   └── next/             # Next design theme
├── static/               # Static files copied to root of _site
└── _site/                # Build output (gitignored)
```

## Design System

### Theme Selection
Themes are selected via the `DESIGN` environment variable:
- `DESIGN=retro` (default) - Classic Windows 95-inspired aesthetic
- `DESIGN=cyber` - Cyberpunk-inspired aesthetic
- `DESIGN=hifi` - Refined high-fidelity aesthetic
- `DESIGN=next` - Modern minimalist aesthetic

### Adding a New Theme
1. Create new directory: `designs/<theme-name>/`
2. Create subdirectories: `templates/`, `styles/`, `images/`
3. Create `templates/base.njk` (copy from existing theme as starting point)
4. Create `styles/style.css`
5. Add npm scripts in `package.json`:
   ```json
   "start:<theme-name>": "DESIGN=<theme-name> eleventy --serve",
   "build:<theme-name>": "DESIGN=<theme-name> eleventy"
   ```

## Code Style Guidelines

### Markdown Content Files (src/)

**Frontmatter:**
```markdown
---
layout: base.njk
title: Page Title
---

## Page Heading

Content here...
```

- Always include `layout: base.njk` (or appropriate layout)
- Always include `title` for page titles
- Use ATX-style headings (`## Heading`, not underlines)
- Use proper Markdown formatting for lists, links, emphasis

### Nunjucks Templates (designs/*/templates/)

**Template Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <link rel="stylesheet" href="/styles/style.css">
</head>
<body>
    <header>
        <a href="/"><h1>🤷 Casual Security Incorporated</h1></a>
    </header>
    <main>
        <aside class="sidebar">
            <nav>
                <ul>
                    <li><a href="/" {% if page.url == "/" %}class="active"{% endif %}>Home</a></li>
                    <li><a href="/contact/" {% if page.url == "/contact/" %}class="active"{% endif %}>Contact</a></li>
                </ul>
            </nav>
        </aside>
        <div class="content">
            {{ content | safe }}
        </div>
    </main>
    <footer>
        <p>&copy; 2025 CSInc</p>
    </footer>
</body>
</html>
```

- Use 4-space indentation for HTML
- Use Nunjucks syntax: `{{ variable }}`, `{% if %}`, `{% for %}`
- Use `| safe` filter for content that should not be escaped
- Use `{# comment #}` for Nunjucks comments
- Maintain consistent navigation structure across all themes

### CSS (designs/*/styles/style.css)

**Organization:**
1. CSS custom properties (`:root`)
2. Base element styles (`body`, `html`)
3. Layout components (`header`, `main`, `footer`, `.sidebar`, `.content`)
4. Typography (`h1`, `h2`, `p`, etc.)
5. Interactive states (`:hover`, `.active`)
6. Animations (`@keyframes`)
7. Media queries (responsive breakpoints)

**Conventions:**
- Use CSS custom properties for theming (see `hifi/style.css` as example)
- Mobile-first responsive design with `@media (max-width: ...)` breakpoints
- Use semantic class names (`.sidebar`, `.content`, `.active`)
- Maintain visual consistency with retro/Windows 95 aesthetic across themes
- Include subtle animations for polish (`fadeIn` on `main`)

### JavaScript (.eleventy.js)

- Use CommonJS syntax (`require`, `module.exports`)
- Use `const` for imports
- Keep configuration minimal and focused

```javascript
const process = require("process");

module.exports = function (eleventyConfig) {
    // Passthrough copies
    eleventyConfig.addPassthroughCopy({ ... });

    return {
        dir: {
            input: "src",
            includes: "../designs/retro/templates",
            output: "_site",
        },
    };
};
```

## Deployment

- **Platform**: GitHub Pages
- **Trigger**: Push to `main` branch
- **Workflow**: `.github/workflows/gh-pages.yml`
- **Node.js Version**: 20
- **Build Command**: `npm run build:retro`
- **Output Directory**: `_site/`

## Common Tasks

### Adding a New Page
1. Create `src/<page-name>.md`
2. Add frontmatter with layout and title
3. Add navigation link in all theme templates (`designs/*/templates/base.njk`)
4. Test with `npm start`

### Updating Styles
1. Edit `designs/<theme>/styles/style.css`
2. Test changes with `npm run start:<theme>`
3. Verify responsive behavior at different viewport sizes

### Adding Images
1. Place images in `designs/<theme>/images/` for theme-specific images
2. Place images in `static/` for content images that should be at root
3. Reference as `/images/<filename>` or `/<filename>` respectively

## Notes

- The `index.html` at root is a legacy fallback; Eleventy-generated pages are primary
- Keep all themes visually consistent in structure but distinct in aesthetic
- The site uses no JavaScript on the frontend (static HTML/CSS only)
