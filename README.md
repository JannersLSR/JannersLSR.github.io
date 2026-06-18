# JannersLSR.github.io

An interactive **CRT terminal portfolio** — an Arch Linux-style command line in a
full-viewport retro CRT, with a recruiter-friendly plain view one command away.

Built with **Vite + React 19**. No backend; static site for GitHub Pages.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # serve the built dist/
```

## How it works

- Type commands, tap the **command pills**, or use arrow-key history + Tab completion.
- After boot it auto-runs `neofetch` and `ls projects/` so content shows immediately.
- `help` lists everything. Highlights: `neofetch`, `ls projects/`, `cat about.md`,
  `pacman -Qi <project>`, `sudo hire-me`. Easter eggs: `matrix`, `btw`, `play <group>`,
  `rm -rf /`, `sudo pacman -Syu`.
- `gui` (or `exit`) drops to a plain, scrollable view of the same content. Sound is
  muted by default — toggle top-right.

### Source layout

```
src/
  App.jsx                 boot → terminal → gui orchestration
  components/             CRTOverlay, Terminal, BootScreen, CommandInput,
                          OutputLine, CommandPills, SoundToggle, MatrixRain, GuiView
  hooks/                  useTerminal, useCommandHistory, useTabComplete, useSound
  lib/                    filesystem.js (all content), commands.js, bootSequence.js
public/assets/            images, resume PDF, group photos
```

All portfolio content lives in `src/lib/filesystem.js` — edit there to update
projects, certs, skills, or contact info.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.
**One-time setup:** in the repo, go to *Settings → Pages → Build and deployment*
and set **Source = GitHub Actions**.

---

## Original project notes (LT0 / LT1 / M1M2 reflection)

> Kept from the first version of this portfolio.

It refreshed my memory on the fundamentals of programming while introducing HTML,
CSS, and JavaScript — plus Git and GitHub, which looked intimidating at first but
became manageable once the gist clicked. The hardest part was CSS layout and making
the site responsive across devices. What began as a one-and-done interest page I now
intend to keep making more professional over the coming years.
