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
          'scss/_skin.scss': 'scss/layout/**/*.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass_globbing', 'sass'],
        options: {
          livereload: true,
          spawn: false
        }
      }
    },
    clean: {
      css: ['css', 'scss/_component.scss', 'scss/_layout.scss', 'scss/_skin.scss']
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
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('default', ['clean','wiredep', 'sass_globbing', 'sass']);

};
