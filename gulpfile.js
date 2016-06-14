var gulp = require('gulp');
    del = require('del');

gulp.task('sass', ['clean:css', 'glob:sass'], function() {

  var sass = require('gulp-sass'),
      sassLint = require('gulp-sass-lint'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      processors = [
        autoprefixer({ browsers: ['last 3 versions', 'ie 10', 'iOS > 8', 'Safari > 8'] })
      ];

  gulp.src('scss/*.scss')
    // Lint
    .pipe(sassLint({'config': '.sass-lint.yml'}))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    // Make Sass happen
    .pipe(sass().on('error', sass.logError))
    // Postcss processors
    .pipe(postcss(processors))
    // Output
    .pipe(gulp.dest('./css/'));

});

// Clean CSS
gulp.task('clean:css', function() {
  return del([
    'css/*.css'
  ]);
});

// Glob Sass
gulp.task('glob:sass', function() {
  var globSass = require('gulp-sass-globbing'),
      globSassOptions = { useSingleQuotes: true},
      globSassBase = 'scss',
      globSassFiles = {
        '_components.scss': 'components/**/*.scss',
        '_layout.scss': 'layout/**/*.scss',
        '_skin.scss': 'skin/**/*.scss'
      };

  for (var target in globSassFiles) {
    if (globSassFiles.hasOwnProperty(target)) {
      var globFiles = globSassFiles[target];
      gulp.src(globFiles, {cwd: globSassBase})
          .pipe(globSass(
            { path: target }, globSassOptions
          ))
          .pipe(gulp.dest(globSassBase));
    }
  }

});

// Wire dependencies
gulp.task('wiredep', function() {
  var wiredep = require('gulp-wiredep'),
      wireconfig = {
        fileTypes: {
          scss: {
            block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              css: /@import\s['"](.+css)['"]/gi,
              js: /@import\s['"](.+js)['"]/gi,
              scss: /@import\s['"](.+scss)['"]/gi
            },
            replace: {
              css: '@import "{{filePath}}";',
              js: '@import "{{filePath}}";',
              scss: '@import "{{filePath}}";',
            }
          }
        }
      }
});

// Install front-end stuff from bower and such
gulp.task('install', ['wiredep', 'default']);

// Default task
gulp.task('default',
          [
            'sass'
          ]);
