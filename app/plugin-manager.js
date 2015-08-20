var BrowserWindow = require('browser-window')
var path          = require('path')
var ipc           = require('ipc')
var _             = require('lodash')

var menu          = require('./menu')
var config        = require('./config')

var PluginManager = function () {

  // store window references for not being GCed
  this.windows = {}
}

/**
 * Init function
 *
 * This should be called when application starts.
 */
PluginManager.prototype.init = function() {

  // load plugins
  _.forIn(config.windows, function (v, k) {
    this.load(k, v)
  }.bind(this))

  // initialize app menu
  menu.init(this.windows, config.mainAppName)

  // initialize events
  this._initEvents()
}

/**
 * Load plugin
 *
 * @param {String} name  Name of the plugin
 * @param {Object} opt   Options of the plugin
 */
PluginManager.prototype.load = function (name, opt) {
  var oWindow = new BrowserWindow(opt)

  this.windows[name] = oWindow

  oWindow.loadUrl('file://' + path.join(config.pluginsPath, name, 'index.html'))

  oWindow.on('closed', function() {
    this.windows[name] = null
  }.bind(this))

  // open devtools
  if (config.isDev && opt.showDevtools !== false)
    oWindow.openDevTools()

  return oWindow
}

/**
 * Show window
 *
 * @param {String} name  Name of the plugin
 */
PluginManager.prototype.show = function (name) {
  if (this.windows[name])
    this.windows[name].show()
  else
    this.load(name, config.windows[name]).show()
}

/**
 * Hide window
 *
 * @param {String} name  Name of the plugin
 */
PluginManager.prototype.hide = function (name) {
  if (this.windows[name])
    this.windows[name].hide()
}

/**
 * Toggle window
 *
 * @param {String} name  Name of the plugin
 */
PluginManager.prototype.toggle = function (name) {
  if (this.windows[name] && this.windows[name].isVisible())
    this.hide(name)
  else
    this.show(name)
}

/**
 * Stick window to the top
 *
 * @param {String} name   Name of the plugin
 * @param {Boolean} flag  Is on top
 */
PluginManager.prototype.setOnTop = function (name, flag) {
  if (this.windows[name])
    this.windows[name].setAlwaysOnTop(flag)
}

/**
 * Initialize events for windows to trigger
 */
PluginManager.prototype._initEvents = function() {
  var self = this

  ipc.on('show-window', function (ev, name) {
    self.show(name)
  })

  ipc.on('hide-window', function (ev, name) {
    self.hide(name)
  })

  ipc.on('toggle-window', function (ev, name) {
    self.toggle(name)
  })

  ipc.on('set-on-top', function (ev, name, flag) {
    self.setOnTop(name, flag)
  })
}

/**
 * Remove all windows objects
 */
PluginManager.prototype.removeAll = function() {
  this.windows = null
}

module.exports = new PluginManager
