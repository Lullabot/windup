/* eslint-env node, es6 */
/* global require */
'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  var isDev = grunt.option('env') === 'dev';
  if (isDev) {
    console.log('Compiling in dev mode!');
  }

  /**
   * Style files to compile
   * This should be a list of scss locations without the file suffix that need to be compiled
   */
  const styleFiles = [
    'style',
    // Extra examples:
    // 'component/admin-tabs',
    // 'component/02-molecule/site-search'
    // 'layout/article'
  ];

  /**
   * Dynamically builds list of files for grunt config
   */
  const scssFiles = {};
  const pxToRemCssFiles = {};
  styleFiles.forEach((filePath) => {
    scssFiles[`css/${filePath}.css`] = `scss/${filePath}.scss`;
    pxToRemCssFiles[`css/${filePath}.css`] = [`css/${filePath}.css`,];
  });

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'sass': {
      'options': {
        'sourceMap': isDev,
      },
      'dist': {
        'files': scssFiles,
      },
    },
    'sass_globbing': {
      'dist': {
        'files': {
          'scss/_component.scss': 'scss/component/**/_*.scss',
          'scss/_layout.scss': 'scss/layout/**/_*.scss',
          'scss/_skin.scss': 'scss/skin/**/_*.scss',
        },
        'options': {
          'signature': '// generated with grunt-sass-globbing \n\n',
        },
      },
      'options': {
        'useSingleQuotes': true,
      },
    },
    'postcss': {
      'options': {
        'map': isDev ?
          {
            'inline': false,
            'annotation': 'css/postcss/maps/',
          }
          : false,
        'processors': !isDev ?
          [
            // Add vendor prefixes
            require('autoprefixer')({'browsers': '> 0.25%, last 2 versions, Firefox ESR, not dead',}),
            // Minify the result
            require('cssnano')(),
          ] : [
            // Add vendor prefixes
            require('autoprefixer')({'browsers': '> 0.25%, last 2 versions, Firefox ESR, not dead',}),
          ]
        ,
      },
      'dist': {
        'src': 'css/**/*.css',
      },
    },
    // PostCSS plugin for px to rem isn't working, this is...
    'px_to_rem': {
      'dist': {
        'options': {
          'base': 16,
          'fallback': false,
          'fallback_existing_rem': false,
          'ignore': [],
          'map': isDev,
        },
        'files': pxToRemCssFiles,
      },
    },
    'clean': {
      'css': ['css/style.css', 'scss/_component.scss', 'scss/_layout.scss', 'scss/_skin.scss',],
    },
    'sasslint': {
      'options': {
        'configFile': '.sass-lint.yml',
        'formatter': 'table',
      },
      'target': ['scss/**/*.scss',],
    },
    'eslint': {
      'options': {
        'configFile': '.eslintrc',
      },
      'target': ['js/windup.es6',],
    },
    'browserify': {
      'dist': {
        'files': {
          'js/windup.js': 'js/windup.es6',
        },
        'options': {
          'transform': [['babelify', {'presets': 'env',},],],
          'browserifyOptions': {
            'debug': isDev,
          },
        },
      },
    },
    'watch': {
      'css': {
        'files': ['scss/**/*.scss',],
        'tasks': ['sasslint', 'sass_globbing', 'sass', 'px_to_rem', 'postcss',],
        'options': {
          'livereload': true,
          'spawn': false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-px-to-rem');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'sasslint', 'sass_globbing', 'sass', 'px_to_rem', 'postcss', 'eslint', 'browserify',]);

};
