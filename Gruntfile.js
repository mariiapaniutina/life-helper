module.exports = function(grunt) {

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        banner_title: '/* App Name: life-helper\n '+
        'Author: Mariia Paniutina <mpaniutina@linkedin.com, mariia.paniutina@gmail.com> */\n'
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

    //js concatenation
    grunt.loadNpmTasks('grunt-contrib-concat');
    config.concat = {
        js: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n\n'
            },
            files: {
                'lib/logHelper.js': [
                    'src/libWrappers/libLogTop.txt',
                    'src/logHelper.js',
                    'src/libWrappers/libLogBottom.txt'
                ]
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

    //watcher
    grunt.loadNpmTasks('grunt-contrib-watch');
    config.watch = {
        options: {
            livereload: true
        },
        taskName: {
            files: [
                "src/*.js",
                "*.html"
            ]
        },
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'connect']
    };

    //local web server
    grunt.loadNpmTasks('grunt-contrib-connect');
    config.connect = {
        server: {
            options: {
                port: 9900,
                base: '',
                keepalive: true
            }
        }
    };

    //creating helpers modules
    grunt.loadNpmTasks('grunt-file-creator');
    config["file-creator"] = {
        "example": {
            "dist/example.js": function(fs, fd, done) {
                fs.writeSync(fd, '(function(){ \n');
                fs.writeSync(fd, 'console.log(){"test me"};');
                fs.writeSync(fd, '\n})();');
                done();
            }
        }
    };

    //from babel to es5
    grunt.loadNpmTasks('grunt-babel');
    config.babel = {
        options: {
            sourceMap: false,
                presets: ['es2015']
        },
        dist: {
            files: {
                //'index_es6_compiled.js': 'index_es6.js'
            }
        }
    };


    // Tasks

    grunt.registerTask('default', ['jshint', 'concat', 'usebanner', 'connect', 'watch']);
    grunt.registerTask('notes', ['bump-only', 'conventionalChangelog', 'bump-commit']);

    grunt.registerTask('develop', ['default', 'bump:patch']);
    grunt.registerTask('release', ['default', 'bump:minor']);



    grunt.initConfig(config);

};