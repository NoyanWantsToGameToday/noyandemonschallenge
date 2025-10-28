# Copilot instructions for this repo (noyandemonschallenge)

This file tells an AI coding assistant how this project is structured and what patterns and conventions matter when making edits.

Summary (big picture)
- This is a small static single-page site built with Vue 3 (UMD builds) + Vue Router. The app is served from the repository root (open `index.html`).
- Data-driven: all level data lives in `data/`. `_list.json` is the canonical ordering; each entry is a JSON file in `data/<Name>.json`.
- Routing: `js/routes.js` wires three pages: `List`, `Leaderboard`, and `Roulette` (components live in `js/pages/`).
- `js/content.js` contains fetching and data-aggregation logic (fetchList, fetchEditors, fetchLeaderboard). Many UI components call these helpers.
- `js/util.js` centralizes video parsing/embed/thumbnail helpers (YouTube and Medal.tv handling), randomization, and formatting.

What to know before editing
- This is a static app that expects to be served over HTTP. Do not open `index.html` via `file://` — use a simple server (example below).
- Level data is sensitive to JSON syntax; add/remove items in `_list.json` and matching `data/*.json` files carefully. A malformed JSON file will make `fetchList()` return errors and surface UI error messages.
- The site uses inline module imports (type="module"). Keep export names stable when refactoring `js/*.js` modules — many pages import specific named exports.

Quick dev/run
- Start a quick local static server from the repo root (PowerShell):

```powershell
# from repository root
python -m http.server 8000
# then open http://localhost:8000/
```

- Alternatively use VSCode Live Server extension.

Key files and patterns (examples)
- `index.html` — includes the Vue and Router UMD builds and loads `js/main.js` as a module. CSS files are linked here.
- `js/main.js` — creates Vue app, registers router, and contains a small reactive `store` used by components (dark mode). Avoid reimplementing app bootstrapping here.
- `js/routes.js` — single source for routes. Add routes here for new page components.
- `js/content.js` — canonical data loader and leaderboard logic. Important invariants:
  - `fetchList()` reads `/data/_list.json` then fetches `data/<path>.json` for each entry.
  - Returned list is an array of `[levelObject, errorPath|null]` pairs — callers expect this shape.
- `data/_list.json` — array of filenames (without `.json`) in the exact order the list should be displayed.
  - To add a level: create `data/YourLevelName.json` and append "YourLevelName" to `_list.json`.
- `js/util.js` — video utilities:
  - `getVideoIdFromUrl(url)` extracts either a YouTube ID (11 chars) or returns `medal_<id>` for Medal.tv clips.
  - `embed(url)` returns a YouTube embed URL for YouTube links; for Medal.tv it intentionally returns an empty string (the app renders a clickable fallback because Medal.tv blocks embedding).
  - `getThumbnailFromId(id)` returns a YouTube thumbnail URL for YouTube IDs, or an inline SVG/data-URI placeholder for Medal clips.
  - When changing these functions keep their exported names stable (`getVideoIdFromUrl`, `embed`, `getThumbnailFromId`) as page components import them by name.

UI patterns & conventions
- Components are simple plain-objects (no SFCs). Templates are inlined string literals in each exported default object.
- Avoid heavy DOM API usage; prefer Vue computed properties and methods already present (see `List.js` computed `videoSource` and `video`).
- Data fetch errors are surfaced to the UI via the `errors` array — maintain that pattern when adding new data validation or loader logic.

Debugging tips
- JSON problems: open browser console; `content.fetchList()` logs which level files failed to load and pages show human-readable error messages.
- Video/thumbnail issues: `js/util.js` is the single place handling video URL parsing (Medal + YouTube). If thumbnails or embeds break, add console warnings in `util.js` to help trace invalid inputs.
- Embedding: Medal.tv cannot be loaded in an iframe due to `X-Frame-Options`. The app's current approach is to detect Medal links and fall back to a click-to-open link. If you change this behavior, consider that embedding will fail in-browser.

Testing changes
- Because this is a static app, your fast feedback loop is: run local server, edit files, refresh browser.
- After JS edits, check the browser console for module import errors (named exports mismatches are a common cause).

When making PRs
- Preserve export names in `js/*.js` unless you update all import sites.
- Keep templates minimal and avoid unescaped backticks inside the template string (this project uses template literals for templates).

If anything is unclear or you want the AI to expand any of the sections (for example: add examples for adding a new level JSON, or tests you want to add), tell me which part to iterate on.
