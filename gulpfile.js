var gulp             = require('gulp')
var electronPrebuilt = require('electron-prebuilt')
var packager         = require('electron-packager')
var proc             = require('child_process')
var path             = require('path')
var _                = require('lodash')
var fs               = require('fs')
var sass             = require('gulp-sass')
var electronConnect  = require('electron-connect').server

var pkg         = require('./package.json')
var electronPkg = require('./node_modules/electron-prebuilt/package.json')

var electron = null  // Electron object

// Path configuration
var paths = {
  plugins: path.join(__dirname, 'plugins'),
  prebuild: path.join(__dirname, 'output/prebuilt'),
  build: path.join(__dirname, 'output/built')
}

//
// Publish configs
//
// Check `https://github.com/maxogden/electron-packager`
// for more details
var publishOpts = {
  dir:             __dirname,
  name:            pkg.name,             // App name
  'app-bundle-id': pkg.name,             // App id
  'app-version':   pkg.version,          // App version
  version:         electronPkg.version,  // Electron version
  overwrite:       true,
  prune:           true,
  ignore:          '/output|/sass|gulpfile.js'
}

/**
 * Run the app in debugging mode (Reload with CMD+R/F5)
 */
gulp.task('serve', function () {
  electron = electronConnect.create({
    electron: electronPrebuilt,
    spawnOpt: {
      env: {NODE_ENV: 'development'}
    }
  })
  electron.start()
})

/**
 * Run the app in debugging mode (Reload automatically)
 */
gulp.task('dev', ['serve', 'watch'])

/**
 * Run the app in production mode
 */
gulp.task('run', function () {
  electron = proc.spawn(electronPrebuilt, ['.'])
  electron.stdout.on('data', function (buf) {
    console.log(buf.toString().slice(0, -1))
  })
  electron.stderr.on('data', function (buf) {
    console.log(buf.toString().slice(0, -1))
  })
})

/**
 * Package OSX app for predistribution
 */
gulp.task('prebuild', function () {
  _.assign(publishOpts, {
    platform: 'darwin',
    arch: 'x64',
    out: paths.prebuild
  })
  packager(publishOpts, function done (err, appPath) {
    if (err) return console.error(err)
    console.log('Build complete, output paths: ', appPath)
  })
})

/**
 * Package windows and OSX app for distribution
 */
gulp.task('build', function () {

  _.assign(publishOpts, {
    platform: ['darwin', 'win32'],
    arch: 'all',
    out: paths.build,
    asar: true,
    'asar-unpack-dir': "node_modules/node-notifier/vendor/"
  })
  packager(publishOpts, function done (err, appPath) {
    if (err) return console.error(err)
    console.log('Build complete, output paths: ', appPath)
  })
})

/**
 * Compile SASS files
 */
gulp.task('sass', function () {

  var pluginDirs = fs.readdirSync(paths.plugins)

  _.each(pluginDirs, function(dir) {

    if (dir.indexOf('.') === 0) return

    compileSass(dir)
  })
})

/**
 * Watch files
 */
gulp.task('watch', function () {

  if (!electron)
    return console.error('You should not run this task directly, try use `gulp dev` instead.')

  // SASS files
  gulp.watch(path.join(paths.plugins, '**/css/sass/*.scss'), function(obj) {
    if (obj.type === 'changed' && obj.path) {
      var pluginDir = obj.path.replace(paths.plugins, '').match(/\/(.+?)\//)[1]
      console.log('Ready to recompile css file: "%s"', pluginDir)

      compileSass(pluginDir)
    }
  })

  // app.js
  gulp.watch('app/*', electron.restart)

  // html & js & css files
  gulp.watch(
    [
      path.join(paths.plugins, '**/*.html'),
      path.join(paths.plugins, '**/js/**/*.js'),
      path.join(paths.plugins, '**/css/*.css')
    ],

    function() {
      electron.reload()
    })
})

/**
 * Default task
 */
gulp.task('default', ['dev'])


// ================ //

function compileSass (dir) {
  _compileSass(
    path.join(paths.plugins, dir, './css/sass/*.scss'),
    path.join(paths.plugins, dir, './css')
  )
}

function _compileSass (src, dest) {
  if (!src || !dest)
    throw 'compileSass: not enough arguments.'

  gulp.src(src)
     .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
     .pipe(gulp.dest(dest))
}
