var app           = require('app')
var notifier      = require('node-notifier')

var mb            = require('./tray')
var pluginMgr     = require('./plugin-manager')
require('./lib/crash-handler')

/**
 * Emitted when app starts
 */
app.on('ready', function() {

  pluginMgr.init()

  // Docs:
  // https://github.com/mikaelbr/node-notifier
  notifier.notify({
    'title': 'Welcome!',
    'message': 'Happy building apps.'
  })
})

/**
 * Emitted when all windows are closed
 */
app.on('window-all-closed', function() {
  pluginMgr.removeAll()
  app.quit()
})

/**
 * Emitted when no opened windows
 * and dock icon is clicked
 */
app.on('activate-with-no-open-windows', function() {
  mb.window.show()
})
