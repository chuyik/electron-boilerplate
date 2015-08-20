var app           = require('app')
var notifier      = require('node-notifier')

var mb            = require('./tray')
var pluginMgr     = require('./plugin-manager')
require('./lib/crash-handler')

/**
 * 程序运行
 */
app.on('ready', function() {

  pluginMgr.init()

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
