module.exports = function (grunt) {
  'use-strict';
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
      scripts: {
        files: [
          'assets/style/css/*.css',
          'assets/js/*.js',
          'assets/style/scss/*.scss'
        ],
        tasks: ['default'],
        options: {
          spawn:false,
          event:['all']
        },
      },
    },
    cssmin: {  
      sitecss: {  
        options: {  
          banner: '/* My minified css file */'  
        },  
        files: {  
          'public/css/site.min.css': [  
            'bower_components/skeleton/css/skeleton.css',
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
      }, 
      bowerlib: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/knockout/dist/knockout.js',
          'bower_components/offline/offline.js',
        ],
        dest: 'public/js/bowerlib.min.js'  
      } 
    },
    sass: {
      dist: {
        files: {
        'assets/style/css/style.css': 'assets/style/scss/main.scss'
        }
      }
    }
  });
 
  //Load local tasks
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['sass', 'cssmin', 'uglify']);


};
