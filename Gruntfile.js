module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('changes', ['watch']);

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
    },
    watch: {
      files: ['bower_components/*'],
      tasks: ['wiredep']
    }
  });
};
