module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    wiredep: {
      app: {
        src: 'index.html'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'js/*.js'
      ]
    }
  });
};
