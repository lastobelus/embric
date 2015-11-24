yuidoc-clean-theme
==================

# How To Use
1. Install yuidocs on your machine, if you haven't already. `npm install -g yuidoc`
2. Add/Update a file's documentation based on the Yuidoc syntax found here http://yui.github.io/yuidoc/syntax/index.html
3. Commit, push, merge your changes as normal
4. Run `yuidoc -t yuidoc-clean-theme` (or where ever it located on your machine) to generate the documentation

# Configuration
The yuidoc configuration settings are found in the yuidoc.json file in the root directory.
- **name:** This is linked to the logo found in the top left of the documentation website
- **description:** Not currently being used
- **version:** Not currently being used
- **options:**
  - *linkNative:* Whether to autolink native types to the Mozilla Developer Network
  - *outdir:* Tells yuidoc where to output the compiled files. Should be `"./docs"` by default
  - *paths:* An array of directories to look in when compiling the docs.
- **repo:** Used to add a link to the repo in the top right nav
- **nav:** Use to add custom links to the top right nav
