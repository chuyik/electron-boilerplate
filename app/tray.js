var menubar = require('menubar')
var path = require('path')
var config = require('./config')

/**
 * Docs:
 * https://github.com/maxogden/menubar
 */
var mb = menubar({
  dir: path.join(config.pluginsPath, 'tray'),
  icon: path.join(config.root, 'shared/img/icon/icon-s.png'),
  preloadWindow: true,
  width: 300,
  height: 400,
  showDock: true
})

mb.on('ready', function () {})

module.exports = mb
