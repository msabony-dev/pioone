# GitHub Wiki publishing sources

These are **Wiki-ready** pages maintained in the application repository:

- `Home.md`: Wiki home page, product overview and links to implementation specifications
- `_Sidebar.md`: GitHub Wiki sidebar navigation

**Why this layout?** GitHub Wiki uses a separate Git repository (`pioone.wiki.git`) and does not automatically mirror `docs/`. The existing ChatGPT GitHub connector can create source files and pull requests but does not expose a Wiki-specific write function. **These pages have not yet been published to GitHub Wiki.**

## Publish to GitHub Wiki

1. Open the repository **Settings → General → Features** and ensure **Wikis** is enabled (if your plan and repository allow it).
2. Open `https://github.com/msabony-dev/pioone/wiki` and create the first Wiki page (Home) if the wiki is not initialized.
3. For a one-time manual publish, paste `Home.md` into the Wiki `Home` page, then create/edit `_Sidebar` from `_Sidebar.md`.
4. Alternatively, clone the initialized Wiki repository using your own GitHub credentials:

   ```bash
   git clone https://github.com/msabony-dev/pioone.wiki.git
   cd pioone.wiki
   cp /path/to/pioone/docs/wiki-pages/Home.md Home.md
   cp /path/to/pioone/docs/wiki-pages/_Sidebar.md _Sidebar.md
   git add Home.md _Sidebar.md
   git commit -m "docs: publish PioOne Wiki home and navigation"
   git push origin master   # or the default branch reported by the wiki remote
   ```

5. Once the documentation PR is merged, update specification links in the Wiki from the feature branch to `main`. Until then, the links intentionally point to the review branch.

**Recommended maintenance:** treat `docs/implementation/v32.5/*.md` as authoritative, maintain `Home` and `_Sidebar` as discovery aids. Do not copy entire engineering specifications into independent Wiki pages without automation; they will drift from the versioned repository documents.
