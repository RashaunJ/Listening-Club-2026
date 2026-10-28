# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Standout track links

Review frontmatter supports plain track names and entries with a curated URL:

```yaml
standout_tracks:
  - "A track without a saved link"
  - title: "Another Track"
    url: "https://www.youtube.com/watch?v=..."
  - title: "Track Title (with an editorial note)"
    search_title: "Track Title"
```

Saved URLs appear beside the title as **YouTube ↗** (or **Listen ↗** for another
service). Tracks without a URL get a **Find on YouTube ↗** search link using the
artist, track, and album. Optional `search_title` overrides only the search term,
not the displayed title. URLs must use HTTP or HTTPS.

Links open in a new tab. Everything is generated as static HTML, with no player,
client-side JavaScript, API key, or network request required during builds.
The researched links and unresolved matches are recorded in
[`docs/standout-track-sources.json`](docs/standout-track-sources.json).
YouTube availability may change or vary by region; update a saved URL or remove
it to restore the search fallback.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
