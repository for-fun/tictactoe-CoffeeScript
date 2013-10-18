var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
	var config = {
		path: 'app',
		liveReloadPort: 35729
	};

	require('load-grunt-tasks')(grunt);

	require('connect-livereload')({
		port: config.liveReloadPort
	});

	grunt.initConfig({
		conf: config,
		watch: {
			sass: {
				files: [
					'<%= conf.path %>/sass/*.sass',
					'<%= conf.path %>/sass/*.scss'
				],
				tasks: ['compass:dev', 'autoprefixer:style']
			},
			coffee: {
				files: [
					'<%= conf.path %>/coffee/*.coffee'
				],
				tasks: ['coffee:compile']
			},
			livereload: {
				files: [
					'<%= conf.path %>/sass/*.sass',
					'<%= conf.path %>/sass/*.scss',
					'<%= conf.path %>/*.html',
					'<%= conf.path %>/coffee/*.coffee'
				],
				options: {
					livereload: config.liveReloadPort
				}
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: '<%= conf.path %>/sass',
					cssDir: '<%= conf.path %>/assets/css',
					imagesDir: '<%= conf.path %>/assets/images',
					relativeAssets: true,
					outputStyle: 'expanded'
				}
			}
		},
		coffee: {
			compile: {
				files: {
					'<%= conf.path %>/assets/scripts/common.js': [
						'<%= conf.path %>/coffee/Gui.coffee',
						'<%= conf.path %>/coffee/Game.coffee',
						'<%= conf.path %>/coffee/app.coffee'
					]
				}
			}
		},
		connect: {
			options: {
				port: 5555,
				base: config.path,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							require('connect-livereload')(),
							mountFolder(connect, config.path)
						];
					}
				}
			}
		},
		open: {
			server: {
				url: 'http://localhost:<%= connect.options.port %>/index.html'
			}
		},
		autoprefixer: {
			options: {
				browsers: ['opera 12', 'ff 15', 'chrome 25', 'ie 8', 'ie 7']
			},
			style: {
				options: {
				},
				src: '<%= conf.path %>/assets/css/style.css',
				dest: '<%= conf.path %>/assets/css/style.css'
			}
		}
	});

	grunt.registerTask('default', [
		'connect',
		'open',
		'watch'
	]);

	grunt.loadNpmTasks('grunt-open');
};