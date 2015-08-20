var path = require('path')

var root = path.join(__dirname, '..')

var config = {

  // root dir
  root: root,

  pluginsPath: path.join(root, 'plugins'),

  isDev: process.env.NODE_ENV === 'development',

  mainAppName: 'main-window'
}

/**
 * Please refer to
 * `https://github.com/atom/electron/blob/master/docs%2Fapi%2Fbrowser-window.md#new-browserwindowoptions`
 * for window configuration.
 */
config.windows = {
  'main-window': {
    width: 800,
    height: 600,
    show: true,         // Show window, default: true
    showDevtools: true  // Show devtools, default: true (Only in development mode)
  },
  'prefs': {
    width: 600,
    height: 600,
    show: false,
    showDevtools: false,
    frame: false        // Show frame, default: true
  }
}

config.crashOpts = {
  productName: 'YourName',
  companyName: 'YourCompany',
  submitUrl: 'https://your-domain.com/url-to-submit',
  autoSubmit: false
}

// Share configs between multiple windows
global.shared = config

module.exports = config
