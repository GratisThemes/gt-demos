const gulp       = require('gulp')
const plumber    = require('gulp-plumber')
const handlebars = require('gulp-compile-handlebars')
const rename     = require('gulp-rename')
const liveServer = require("live-server")

function html() {
  return gulp.src('./src/demos/**/*.html')
    .pipe(plumber())
    .pipe(handlebars(
      {
        bidnis:   { version: "2.2.0" },
        fell:     { version: "2.0.0" },
        herschel: { version: "2.0.2" },
        reginald: { version: "2.2.0" },
        ruffie:   { version: "2.1.0" },
        siggen:   { version: "2.1.0" },
      },
      {
        batch: [
          './src/partials'
        ],
        helpers: {
          isEqual: function(a, b, opts) {
            return (a == b) ? opts.fn(this) : opts.inverse(this)
          },
          toLowerCase: function(str) {
            return str.toLowerCase()
          }
        }
      }
    ))
    .pipe(rename(function(path) {
      if ( path.basename !== 'index' ) {
        path.dirname += `/${path.basename}`
        path.basename = 'index'
      }
    }))
    .pipe(gulp.dest('./docs'))
}

function static() {
  return gulp.src('./static/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('./docs'))
}

function serve(done) {
  liveServer.start({
    root: './docs',
    open: false,
  })
  done()
}

function watch() {
  gulp.watch('src/**/*',    {cwd: './', usePolling: true}, html)
  gulp.watch('static/**/*', {cwd: './', usePolling: true}, static)
}

module.exports.dev    = gulp.series(html, static, serve, watch)
module.exports.build  = gulp.series(html, static)