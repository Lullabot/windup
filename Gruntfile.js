module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          require: ['sass-globbing'], // e.g. ['susy', 'breakpoint'] @see README.md (Installing Sass gems)
          bundleExec: true,           // Run sass with bundle exec: bundle exec sass
          sourcemap: false,           // Enable Source Maps.
          trace: false,               // Show a full traceback on error.
          unixNewlines: true,         // Force Unix newlines in written files.
          style: 'compressed'         // Output style. Can be nested, compact, compressed, expanded
        },
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },
    wiredep: {
      task: {
        src: [
          'windup.info',
          'scss/component/_vendor.scss'
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

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('default', ['sass', 'watch', 'wiredep']);

};
