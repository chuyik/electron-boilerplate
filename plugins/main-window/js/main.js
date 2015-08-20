
var fs = require('fs')
var path = require('path')

var $ = require('jquery')

var AppView = function () {}

AppView.prototype.run = function() {
  $('#home_container')
    .append($('<div class="smile" />'))
    .height($(window).height() - $('.app_header').outerHeight() - $('.footer').outerHeight())
}

module.exports = new AppView
