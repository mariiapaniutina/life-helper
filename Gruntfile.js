module.exports = function(grunt) {

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        banner_title: '/* App Name: life-helper\n '+
        'Author: Mariia Paniutina <mariia.paniutina@gmail.com> */\n'
    };

    //banner to all lib files
    grunt.loadNpmTasks('grunt-banner');
    config.usebanner = {
        taskName: {
            options: {
                position: 'top',
                banner: config.banner_title,
                linebreak: true,
                replace: true
            },
            files: {
                src: [ 'lib/*.js']
            }
        }
    };

    //js validation
    grunt.loadNpmTasks('grunt-contrib-jshint');
    config.jshint = {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        options: {
            globals: {
                //jQuery: true
            }
        }
    };

    /* Versioning (x.x.x-y)
     grunt bump-only         >>      Version bumped to 0.0.1 (in package.json)
     grunt bump-only:minor   >>      Version bumped to 0.1.0 (in package.json)
     grunt bump-only:major   >>      Version bumped to 1.0.0 (in package.json)
     */
    grunt.loadNpmTasks('grunt-bump');
    config.bump = {
        options: {
            files: ['package.json'],
            //updateConfigs: [],
            commit: true,
            commitMessage: 'Release v%VERSION%',
            commitFiles: ['package.json', 'CHANGELOG.md'],
            createTag: true,
            tagName: 'v%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: true,
            pushTo: 'origin'
        }
    };

    //changelog
    grunt.loadNpmTasks('grunt-conventional-changelog');
    config.conventionalChangelog = {
        options: {
            changelogOpts: {
                // conventional-changelog options go here
                preset: 'angular'
            },
            context: {
                // context goes here
            },
            gitRawCommitsOpts: {
                // git-raw-commits options go here
            },
            parserOpts: {
                // conventional-commits-parser options go here
            },
            writerOpts: {
                // conventional-changelog-writer options go here
            }
        },
        release: {
            src: 'CHANGELOG.md'
        }
    };

    //building helpers
    grunt.loadNpmTasks('grunt-contrib-copy');
    config.copy = {
        logHelper: {
            src: 'src/module_template.js',
            dest: 'lib/LogHelper.js',
            options: {
                processContent: function (content, srcpath) {

                    var moduleName = 'logHelper';
                    var logHelperContent = grunt.file.read('src/logHelperSrc.js');

                    var replacedContent = content;
                    replacedContent = replacedContent.replace(/myModuleName/g, moduleName);
                    replacedContent = replacedContent.replace(/\/\* @import myModuleContent \*\//g, logHelperContent);

                    return replacedContent;

                }
            }
        }
    };

    //beatify helpers
    grunt.loadNpmTasks("grunt-jsbeautifier");
    config['jsbeautifier']  = {
        files : ['lib/LogHelper.js'],
            options : {
        }
    };


    // Tasks

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('notes', ['bump-only', 'conventionalChangelog', 'bump-commit']);

    grunt.registerTask('develop', ['default', 'bump:patch']);
    grunt.registerTask('release', ['default', 'bump:minor']);

    grunt.registerTask('developLog', ['copy:logHelper', 'jsbeautifier']);

    grunt.initConfig(config);

};