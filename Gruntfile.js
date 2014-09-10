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
        dest: 'dist/<%= pkg.name %>.js',
        header: 'Backbone.Forma v.<%= pkg.version %>'
      }
    },

    uglify: {
      development: {
        files: {
          '../tel100/public/js/vendor/<%= pkg.name %>.js': [ '<%= concat.dist.dest %>' ]
        },
        options: {
          beautify: true,
          mangle: false,
          wrap: 'Forma'
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['concat', 'uglify']
      }
    }
  });

  //grunt.registerTask('default', 'concat');
};
