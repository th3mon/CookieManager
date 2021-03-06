/*global module:false*/
module.exports = function(grunt) {
    var version = "0.1.0";

    // Project configuration.
    grunt.initConfig({
        meta: {
            version: version,
            banner: '/*! CookieManager - v<%= meta.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* https://github.com/th3mon/CookieManager\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            'Przemys\u0142aw Szelenberger; Licensed MIT */'
        },
        lint: {
            files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
        },
        qunit: {
            files: ['test/**/*.html']
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', '<file_strip_banner:src/CookieManager.' + version + '.js>'],
                dest: 'dist/CookieManager.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest: 'dist/CookieManager.min.js'
            }
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint qunit'
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {}
        },
        uglify: {}
    });

    // Default task.
    grunt.registerTask('default', 'lint qunit concat min');
};