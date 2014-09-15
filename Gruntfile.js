var fs = require('fs');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: '\n\n',
      },
      dist: {
        src: 'src/**/*.js',
        dest: './<%= pkg.name %>-temp.js',
        banner: 'Backbone.Forma'
      }
    },

    uglify: {
      development: {
        files: {
          './<%= pkg.name %>.js': [ '<%= concat.dist.dest %>' ]
        },
        options: {
          beautify: true,
          mangle: false,
          wrap: 'forma'
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ['less'],
        }, files: {
          'backbone.forma.css': 'less/forma.less'
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['default']
      }
    },

    copy: {
      tmp: {
        files: [
          { expand: true, src: './backbone.forma.js', dest: '../tel100/public/js/vendor' },
          { expand: true, src: './backbone.forma.css', dest: '../tel100/public/css' }
        ]
      },
    }
  });

  grunt.registerTask('clear-dist', function() {
    var path = __dirname + '/' + grunt.config.get('concat.dist.dest');
    fs.unlinkSync(path);
  });

  grunt.registerTask('default', ['concat', 'uglify', 'clear-dist', 'copy:tmp']); 
};
