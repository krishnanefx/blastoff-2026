# Deploying to Wix Studio via GitHub

Verified against the current Velo docs (August 2026). Links at the bottom.

## Read this first

Three things that change the plan:

1. **Wix creates the GitHub repo, not you.** You can't pre-make a repo and point
   Wix at it — the connection flow creates a fresh one in your account and
   installs the Velo GitHub app on it. So nothing can be pushed until the Wix
   Studio site exists and is connected.
2. **There is no `wix push`.** You push with plain `git push`. That updates the
   repo but does *not* update the live site — deploying is a separate
   `wix publish`.
3. **`wix login` is a browser OAuth flow.** I can't complete it from here, so the
   login and the publish are yours to run. Everything else is prepared.

## Prerequisites

| Requirement | Status on this machine     |
| ----------- | -------------------------- |
| Git         | ✅ 2.50.1                  |
| Node ≥20.11 | ✅ v20.19.5                |
| npm         | ✅                         |
| SSH key on GitHub | ⬜ check — required by the clone step |

## Steps

### 1. Create the site and turn on code

In Wix Studio, create the site, then click the **Code** icon → **Start Coding**.

### 2. Connect to GitHub

Code sidebar → **GitHub** → **Connect to GitHub** → **Continue** → **Sign In**.

Choose the owner and a repo name (something like `ukssc-website`), click
**Create**, then **Install** the Velo GitHub app. When prompted, keep **Only
select repositories** and pick the repo you just made.

Wix then shows a block of terminal commands — **copy them**. You can get them
back later from **Local Dev Setup** in the editor.

### 3. Clone and install

Run the commands Wix gave you. They clone the repo, run `npm install`, and
install the CLI globally (`npm install -g @wix/cli`). The Local Editor opens in
your browser when it finishes.

### 4. Add the Blastoff! section

From this folder:

```bash
./sync-to-wix.sh /path/to/your-cloned-repo
```

That drops `blastoff-element.js` into `src/public/custom-elements/`. Then:

```bash
cd /path/to/your-cloned-repo && git add -A && git commit -m "Add Blastoff! 2026 landing section" && git push
```

### 5. Upload the images

Velo's `src/public` folder is for **code modules that get imported**, not for
static files served over HTTP — so the images can't live there. Upload these to
the **Wix Media Manager** and copy each resulting `static.wixstatic.com` URL:

| File                              | Feeds attribute |
| --------------------------------- | --------------- |
| `Asset 6ukssc blastoff 1 1.png`   | `hero-image`    |
| `to new heights_ ....svg`         | `tagline-image` |
| `assets/ukssc-crest.png`          | `crest-image`   |
| `assets/logos/*.png`              | set `logo` per sponsor in `SPONSORS` |

If a URL is wrong or missing, the section degrades to text rather than showing a
broken-image icon — so a typo here is visible but not destructive.

### 6. Place the element on the page

In the Studio editor, add a **Custom Element**. Set:

- **Tag Name** → `ukssc-blastoff` (must match `customElements.define()` exactly,
  and Wix requires at least two dash-separated words — this qualifies)
- **Source** → the Velo file `public/custom-elements/blastoff-element.js`

Then set the attributes from step 5 (plus `tickets-url` if it ever changes).
Stretch the element to full width and set its height to fit content.

### 7. Publish

```bash
wix publish
```

It asks whether to publish the latest commit from `origin/main` or your local
code. **Choose the commit from origin** — publishing local code leaves the live
site and the repo out of sync, and a later publish from the repo can silently
overwrite local work.

## CLI reference

| Command        | Does                                              |
| -------------- | ------------------------------------------------- |
| `wix dev`      | Opens the Local Editor                            |
| `wix preview`  | Shareable preview build (needs one publish first) |
| `wix publish`  | Deploys to production                             |
| `wix login` / `wix whoami` / `wix logout` | Account            |
| `wix install` / `wix update` / `wix uninstall` | npm packages, via Wix |

## Gotchas

- **Code files go read-only in the regular editor** once Git is connected. Design
  changes are still fine in either editor, but all code edits happen in your IDE.
  Design edits create a new *UI version* that you sync back down — that's what
  the `wix.config.json` version field tracks.
- **Velo Packages block the integration entirely.** npm packages are fine; Velo
  Packages are not. Don't add any.
- **Files at the root of `src/` are ignored.** Only `src/backend`, `src/pages`
  and `src/public` are read.
- **Don't rename page code files.** Wix matches them to pages by filename.
- **Don't delete the repo or revoke the Velo app's access** — the docs warn this
  can permanently break the connection even if you restore it.

## Sources

- [Set Up Git Integration & Wix CLI for Sites](https://dev.wix.com/docs/develop-websites/articles/workspace-tools/developer-tools/git-integration-wix-cli-for-sites/setting-up-git-integration-wix-cli-for-sites)
- [GitHub Repository File Structure](https://dev.wix.com/docs/develop-websites/articles/workspace-tools/developer-tools/git-integration-wix-cli-for-sites/git-hub-repository-file-structure)
- [Wix CLI for Sites Commands](https://dev.wix.com/docs/develop-websites/articles/workspace-tools/developer-tools/git-integration-wix-cli-for-sites/wix-cli-for-sites-commands)
- [About the Local Editor](https://dev.wix.com/docs/develop-websites/articles/workspace-tools/developer-tools/git-integration-wix-cli-for-sites/about-the-local-editor)
- [Studio Editor: Adding a Custom Element](https://support.wix.com/en/article/studio-editor-adding-a-custom-element)
