module.exports = function(grunt) {
	//Initializing the configuration object
	    grunt.initConfig({
			resources: {
				dist: {
					options: {
						dest: "app/resources/resources.js",
						varname: "game.resources",
					},
					files: [{
						src: ["app/resources/music/**/*", "app/resources/sfx/**/*"],
						type: "audio"
					},{
						src: ["app/resources/sprites/**/*.png"],
						type: "image"
					},{
						src: ["app/resources/sprites/**/*.json"],
						type: "json"
					},{
						src: ["app/resources/map/**/*.tmx", "app/resources/map/**/*.json"],
						type: "tmx"
					},{
						src: ["app/resources/map/**/*.tsx"],
						type: "tsx"
					}]
				}
			},
			watch: {
				resources: {
					files: ["app/resources/**/*"],
					tasks: ["resources"],
					options: {
						spawn: false,
					},
				},
			},
			connect: {
				server: {
					options: {
						port: 8080,
						base: ".",
						keepalive:false
					}
				}
			},
			shell: {
				dependencies: {
	                command:  [	"npm install",
								"bower install"].join("&&")
	            },
				buildMelonJS: {
	                command:  [	"cd node_modules/melonJS",
								"npm install",
								"grunt build"].join("&&")
	            },
				clean: {
	                command:  [	"rm -rf bower_components",
								"rm -rf node_modules"].join("&&")
	            }
	        }
		});

	//Plugin loading
		grunt.loadTasks("node_modules/boilerplate/tasks");
		grunt.loadNpmTasks("grunt-contrib-watch");
	    grunt.loadNpmTasks("grunt-shell");
		grunt.loadNpmTasks("grunt-contrib-connect");
		grunt.loadNpmTasks("grunt-contrib-watch");

	//Task definition
			grunt.registerTask("install",["shell:dependencies","shell:buildMelonJS"]);
			grunt.registerTask("default",["resources","connect:server","watch"]);

};
