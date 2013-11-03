/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '2.0.0'
    },
    banner: '/*! Instajam - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* http://github.com/mikefowler/instajam/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'Mike Fowler; Licensed MIT */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/instajam.js'],
        dest: 'dist/instajam.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/instajam.min.js'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'src/instajam.js',
        'spec/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    docco: {
      docs: {
        src: ['src/instajam.js'],
        options: {
          output: 'docco/'
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: [
          'src/instajam.js',
          'spec/**/*.js'
        ],
        tasks: ['test', 'build']
      },
      docs: {
        files: [
          'docs/**/*.html',
          'docs/**/*.css',
          'docs/**/*.js'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-docco');

  // The default task just runs 'watch' for development
  grunt.registerTask('default', ['test', 'watch']);

  // Running build will test the code, then handle concatination,
  // minification, copying new files, and then building documentation 
  grunt.registerTask('build', ['concat', 'uglify', 'docco']);

  // Tests the library by validating with JSHint
  grunt.registerTask('test', ['jshint']);

};
