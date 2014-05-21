module.exports = function(grunt) {

  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    browserify: {
      options: {
        bundleOptions: {
          standalone: 'Instajam'
        }
      },
      dist: {
        src: 'src/instajam.js',
        dest: 'dist/instajam.js'
      }
    },

    karma: {
      options: {
        basePath: '.',
        colors: true,
        port: 9876,
        runnerPort: 9100,
        reporters: ['progress'],
        frameworks: ['mocha', 'sinon-chai', 'browserify'],
        logLevel: 'ERROR',
        preprocessors: {
          'test/{,**/}*Spec.js': ['browserify']
        },
        files: [
          'test/{,**/}*Helper.js',
          'test/{,**/}*Spec.js'
        ],
      },
      unit: {
        background: true,
        browsers: ['PhantomJS', 'Chrome']
      },
      continuous: {
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    watch: {
      scripts: {
        files: ['src/{,**/}*.js'],
        tasks: ['browserify']
      },
      test: {
        files: ['src/{,**/}*.js', 'test/{,**/}*Spec.js'],
        tasks: ['karma:unit:run']
      }
    }

  });

  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default', ['browserify', 'karma:unit', 'watch']);
  
};
