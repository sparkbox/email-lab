// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

/* globals module, require */

module.exports = function(grunt) {

  'use strict';

  var settings = grunt.file.readJSON('settings.json');

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      tmp: 'tmp',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{data,templates}/{,*/}*.{md,hbs,yml,json}'],
        tasks: ['assemble']
      },
      sass: {
        files: ['<%= config.src %>/scss/{,*/}*.scss'],
        tasks: ['sass:dev']
      },
      copy: {
        files: ['<%= config.src %>/images/{,*/}*.{jpg,jpeg,png,gif}'],
        tasks: ['copy:dev']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.tmp %>/{,*/}*.html',
          '<%= config.tmp %>/css/{,*/}*.css',
          '<%= config.tmp %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.tmp %>'
          ]
        }
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dev: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/scss',
          src: ['*.scss'],
          dest: '<%= config.tmp %>/emails/css',
          ext: '.css'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/scss',
          src: ['*.scss'],
          dest: '<%= config.dist %>/emails/css',
          ext: '.css'
        }]
      }
    },

    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/images/',
            src: ['**'],
            dest: '<%= config.tmp %>/images'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/images/',
            src: ['**'],
            dest: '<%= config.dist %>/images'
          },
          {
            src: ['<%= config.tmp %>/index.html'],
            dest: '<%= config.dist %>/index.html'
          }
        ]
      }
    },

    assemble: {
      options: {
        flatten: true,
        layout: 'email.hbs',
        layoutdir: '<%= config.src %>/templates/layouts',
        data: '<%= config.src %>/data/*.{json,yml}',
        partials: '<%= config.src %>/templates/partials/*.hbs'
      },
      dev: {
        files: {
          '<%= config.tmp %>/': ['<%= config.src %>/templates/pages/*.hbs'],
          '<%= config.tmp %>/emails/': ['<%= config.src %>/templates/emails/*.hbs']
        }
      }
    },

    premailer: {
      options: {
        removeComments: false,
        removeScripts: true,
        verbose: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.tmp %>/emails/',
          src: ['*.html'],
          dest: '<%= config.dist %>/emails/'
        }]
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.tmp %>', '<%= config.dist %>'],

    nodemailer: {
      options: {
        transport: settings.transport,
        recipients: [
          {
            name: settings.defaultTo.name,
            email: grunt.option('to') ? grunt.option('to') : settings.defaultTo.email
          }
        ],
        message: {
          from: settings.from
        }
      },
      single: {
        src: ['<%= config.dist %>/emails/' + grunt.option('template') + '.html']
      },
      all: {
        src: ['<%= config.dist %>/emails/*.html']
      }
    }

  });

  grunt.registerTask('server', [
    'clean',
    'copy:dev',
    'assemble',
    'sass:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble',
    'copy:dist',
    'sass:dev',
    'premailer'
  ]);

  grunt.registerTask('send', 'Send test email(s)', function(template){
    var mailTask = 'nodemailer:all';

    if (grunt.option('template')) {
      mailTask = 'nodemailer:single';
    }

    grunt.task.run([
      'build',
      mailTask
    ]);
  });

  grunt.registerTask('default', [
    'build'
  ]);

};
