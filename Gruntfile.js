var fs = require('fs');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: '\n\n',
      },
      dist: {
        src: 'src/**/*.js',
        dest: 'dist/<%= pkg.name %>-temp.js',
        banner: 'Backbone.Forma'
      }
    },

    uglify: {
      development: {
        files: {
          'dist/<%= pkg.name %>.js': [ '<%= concat.dist.dest %>' ]
        },
        options: {
          beautify: true,
          mangle: false,
          wrap: 'Forma'
        }
      }
    },

    // watch: {
    //   scripts: {
    //     files: ['src/**/*.js'],
    //     tasks: ['concat', 'uglify']
    //   }
    // }
  });

  grunt.registerTask('clear-dist', function() {
    var path = __dirname + '/' + grunt.config.get('concat.dist.dest');
    fs.unlinkSync(path);
  });

  grunt.registerTask('default', ['concat', 'uglify', 'clear-dist']); 
};
