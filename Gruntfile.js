var autoprefixer = require('autoprefixer-core');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        //sourceMap: true
      },
      dist: {
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    },
    sass_globbing: {
      dist: {
        files: {
          'scss/_component.scss': 'scss/component/**/*.scss',
          'scss/_layout.scss': 'scss/layout/**/*.scss',
          'scss/_skin.scss': 'scss/skin/**/*.scss'
        }
      },
      options: {
        useSingleQuotes: true
      }
    },
    watch: {
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass_globbing', 'sass', 'postcss'],
        options: {
          livereload: true,
          spawn: false
        }
      }
    },
    clean: {
      css: ['css/style.css', 'scss/_component.scss', 'scss/_layout.scss', 'scss/_skin.scss']
    },
    wiredep: {
      task: {
        src: [
          'windup.info',
          'scss/_vendor.scss'
        ],
        options: {
          fileTypes: {
            info: {
              block: /(([ \t]*);\s*bower:*(\S*))(\n|\r|.)*?(;\s*endbower)/gi,
              detect: {
                js: /scripts\[\] = \s(.+js)/gi,
                css: /stylesheets\[all\]\[\] = \s(.+css)/gi
              },
              replace: {
                js: 'scripts[] = {{filePath}}',
                css: 'stylesheets[all][] = {{filePath}}'
              }
            },
            scss: {
              block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
              detect: {
                css: /@import\s['"](.+css)['"]/gi,
                sass: /@import\s['"](.+sass)['"]/gi,
                scss: /@import\s['"](.+scss)['"]/gi
              },
              replace: {
                css: '@import "{{filePath}}";',
                sass: '@import "{{filePath}}";',
                scss: '@import "{{filePath}}";'
              }
            }
          }
        }
      }
    },
    wiredep_create_bower: {
      dist: {}
    },
    postcss: {
        options: {
            processors: [
              // List of supported browsers. Use syntax from https://github.com/ai/browserslist#queries
              autoprefixer({ browsers: ['last 3 version, IE >= 9'] }).postcss
            ]
        },
        dist: { src: 'css/*.css' }
    }
  });

  grunt.registerMultiTask('wiredep_create_bower', 'Creates the bower_components directory if it does not exist. This' +
  'stops wiredep from failing when there are no bower packages.', function() {
    var fs = require('fs');
    var path = require('path');
    var bower_config = require('bower-config');
    var cwd = process.cwd();
    var directory = path.join(cwd, (bower_config.read(cwd).directory || 'bower_components'));
    if (!fs.existsSync(directory)) {
      grunt.file.mkdir(directory);
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['clean','wiredep_create_bower', 'wiredep', 'sass_globbing', 'sass', 'postcss']);

};
