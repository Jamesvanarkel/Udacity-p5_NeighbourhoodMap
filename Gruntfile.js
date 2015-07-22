module.exports = function (grunt) {
  'use-strict';
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);  
  grunt.initConfig({
    wiredep: {
      app: {
        src: 'index.html'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'assets/js/*.js'
      ]
    },
    watch: {
      bower: {
        files: ['bower_components/*'],
        tasks: ['wiredep']
      },
      cssmin: {
        files: [
          'assets/style/css/style.css',
          'assets/style/css/offline-theme-dark.css'
        ],
        task: ['cssmin']
      },
      uglify: {
        files: [
          'assets/js/app.js',
          'assets/js/places.js',
          'assets/js/style.js'
        ],
        task: ['uglify']
      }
    },
    cssmin: {  
      sitecss: {  
        options: {  
          banner: '/* My minified css file */'  
        },  
        files: {  
          'public/css/site.min.css': [  
            'assets/style/css/style.css',
            'assets/style/css/offline-theme-dark.css'
          ]  
        }  
      }  
    },
    uglify: {  
      options: {  
        compress: true  
      },  
      applib: {  
        src: [  
          'assets/js/app.js',
          'assets/js/places.js',
          'assets/js/style.js'
        ],  
        dest: 'public/js/applib.min.js'  
      }  
    }    
  });
  
  // Default task.  
  grunt.registerTask('default', ['uglify', 'cssmin']);  
  //Load local tasks
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('changes', ['watch']);
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
