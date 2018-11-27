//https://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/

module.exports = function (grunt) {
    
 // measures the time each task takes
  require('time-grunt')(grunt);     

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            scss: {
                files: [{
                    expand: true,
                    cwd: 'src/sass',
                    src: ['*.scss'],
                    dest: 'src/css',
                    ext: '.css'
              }]
            }
        },

        concat: {
            js: {
                src: ['build/js/**/*.js'], //any folder, any .js file
                dest: 'build/js/production.js',
            }
        },

        uglify: {
            options: {
                mangle: false
                //sourceMap: true
            },
            js: {
                files: {
                    'src/js/production.min.js': ['src/js/production.js']
                }
            }
        },

        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img'
                }]
            }
        },

        cssmin: {
            build: {
                src: 'build/css/main.css',
                dest: 'build/css/main.min.css'
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['src/*.html']
            }
        },
        
        copy: {
          html: {
            expand: true,
            cwd: 'src',
            src: '*.html',
            dest: 'build',
          },
          css: {
            expand: true,
            cwd: 'src/css',
            src: '*.css',
            dest: 'build/css',
          },
          js: {
            expand: true,
            cwd: 'src/js',
            src: '*.js',
            dest: 'build/js',
          }
            
            
        },

        connect: {
            site1: {
              options: {
                port: 9000,
                base: 'src',
                livereload: true
              }
            },
            site2: {
              options: {
                port: 9001,
                base: 'build'
              }
            }
          },      

        watch: {
            css: {
                files: ['src/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true,
                }
            },
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'uglify'],
            },
            html: {
                files: ['src/*.html'],
                tasks: ['htmlhint'],
                options: {
                    spawn: false,
                    livereload: true,
                }
            },
        },
    });

    // 2. Load all Grunt tasks automatically 
    require('load-grunt-tasks')(grunt);

    // 3. Register tasks, default grunt task first

    grunt.registerTask(
        'default', [
                
                //'uglify',
                'sass',
                'cssmin',
                'imagemin',
                'htmlhint',
                'copy',
                'concat',
                'connect',
                'watch'
            ]
    );
    grunt.registerTask('bollox', ['htmlhint', 'imagemin']);

};