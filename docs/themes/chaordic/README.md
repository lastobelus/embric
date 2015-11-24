chaordic-yuidoc-theme
=====================

Chaordic's yuidoc theme =]


Add `grunt-contrib-yuidoc` and `chaordic-yuidoc-theme` to your `package.json` project.

```json
{
  "name": "awesome-project",
  "description": "My awesome project",
  "version": "v1.0.0",
  "dependencies": {},
  "devDependencies": {
    "grunt": "0.4.1",
    "grunt-contrib-yuidoc": "~0.4.0",
    "chaordic-yuidoc-theme": "git://github.com/chaordic/chaordic-yuidoc-theme.git"
  }
}

```

Configure your `GruntFile.js` to use the theme within `node_modules` directory.

```js
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        yuidoc : {
            compile : {
                name : "<%= pkg.name %>",
                description : "<%= pkg.description %>",
                version : "<%= pkg.version %>",
                url : "<%= pkg.homepage %>",
                options : {
                    paths : ["lib/"],
                    outdir : "docs/",
                    themedir: "node_modules/chaordic-yuidoc-theme"
                }
            }
        }
    });
        
        
    // 3rd party tasks
    grunt.loadNpmTasks("grunt-contrib-yuidoc");
    
};
```

Run `grunt yuidoc`.

```bash
# grunt yuidoc
```

Enjoy.


