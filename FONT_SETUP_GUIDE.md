# Font Setup Guide - Montserrat

## Which Font Files to Use

From your `@Montserrat/` folder, you need these specific files:

### Essential Weights for Night Wing PH:
1. **Montserrat-Regular** (400) - Body text, descriptions
2. **Montserrat-Bold** (700) - Headings, emphasis
3. **Montserrat-Black** (900) - Hero title, logo

### File Format Priority:
1. **WOFF2** (.woff2) - Best, smallest, modern browsers ✅ USE THIS
2. **WOFF** (.woff) - Fallback for older browsers
3. **TTF/OTF** - Not needed for web (larger files)

## Step-by-Step Setup

### 1. Create Fonts Folder
```bash
mkdir -p public/fonts
```

### 2. Copy These Files from @Montserrat/
Copy ONLY these files to `public/fonts/`:
- `Montserrat-Regular.woff2`
- `Montserrat-Bold.woff2`
- `Montserrat-Black.woff2`

**If no .woff2 files exist, copy:**
- `Montserrat-Regular.woff`
- `Montserrat-Bold.woff`
- `Montserrat-Black.woff`

### 3. File Structure Should Look Like:
```
nightwing_ph/
├── public/
│   └── fonts/
│       ├── Montserrat-Regular.woff2
│       ├── Montserrat-Bold.woff2
│       └── Montserrat-Black.woff2
```

### 4. Update CSS File
Add to `src/styles/index.css` at the TOP (before @tailwind directives)

---

## Common Font Folder Structures

If your downloaded folder looks like:
```
@Montserrat/
├── static/
│   ├── Montserrat-Regular.ttf
│   ├── Montserrat-Bold.ttf
│   └── Montserrat-Black.ttf
└── Montserrat-VariableFont.ttf
```
→ Use files from `static/` folder

If it has webfonts:
```
@Montserrat/
└── webfonts/
    ├── Montserrat-Regular.woff2
    ├── Montserrat-Bold.woff2
    └── Montserrat-Black.woff2
```
→ Perfect! Use these

---

## Why These Weights?

- **Regular (400):** Menu descriptions, body text
- **Bold (700):** Category titles, menu item names
- **Black (900):** "NIGHT WING" hero title, strong emphasis

---

## Troubleshooting

**If fonts don't load:**
1. Check browser console for errors
2. Verify file paths match exactly
3. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
4. Check file names have no spaces

**Performance tip:**
- Only include weights you actually use
- WOFF2 is ~30% smaller than WOFF
- Avoid loading all 9 weights (unnecessary)

