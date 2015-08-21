Electron Boilerplate
---
The best electron boilerplate you can have.

# Quick Start
> Prerequisites: [Node](https://nodejs.org/), [Git](https://git-scm.com/).

```bash
git clone https://github.com/chuyik/electron-boilerplate.git  # Download this project

# Ignore this if you're not behind GFW
export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/

cd electron-boilerplate  # Switch directory
npm install              # Install dependencies
gulp                     # Start application
```

# Gulp Commands
```bash
# Most Frequently Used
gulp dev     # [default] Run the app in debugging mode (Reload automatically)
gulp run     # Run the app in production mode

# Other available commands
gulp serve     # Run the app in debugging mode (Reload with CMD+R/F5)
gulp prebuild  # Package OSX app for predistribution (Mainly for preview)
gulp build     # Package windows and OSX app for distribution
gulp sass      # Compile SASS files
```

# Features
- Easy to use and distribute
- Flexiblze plugin based approach (Windows are managed as plugins)
  > You could create a new window by adding a folder in [plugins](./plugins) directory
  > and modifying settings in [config.js](./app/config.js)
  
- Useful third-party plugins integration
- Built in pre-processing (SASS supported currently)
- Application Updater (Working on progress)

# Integrated Plugins
- [Menubar](https://github.com/maxogden/menubar)
- [Node Notifier](https://github.com/mikaelbr/node-notifier)

# Packaging & Distribution
Remember to install asar via npm before you package the application for the first time.

You could run `npm i asar -g`, and then run `gulp build`.

After built, the dist files should be saved to `output` folder by default.

# Roadmap
- Rewrite in ES6
- Separate source and compiled files (Increase the difficulty of being cracked)
- Application uploader

# License
[MIT license](http://opensource.org/licenses/MIT)
