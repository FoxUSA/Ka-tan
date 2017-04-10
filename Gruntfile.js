module.exports = function(grunt) {
	//Initializing the configuration object
	    grunt.initConfig({
			compress: {
				deploy: {
					options: {
						archive: "build/version.zip"
					},
					files: [{
						src: ["app/**/*.js",
							  "app/resources/**/*",
						  	  "app/app.css",
						  	  "bower_components/**/*",
					          "index.html"],
						expand: true
					}]
				}
			},
			typescript:{
                base:{
                    src: [	"bower_components/phaser/typescript/pixi.d.ts",//This info is in 2 places. Here and in the tsconfig. TODO
				        	"bower_components/phaser/typescript/phaser.d.ts",
						  	"app/**/*.ts"],
                    options:{
                        module: "amd",
                        target: "es5"
                    }
                }
            },
            watch:{
                scripts: {
                    files: ["app/**/*.ts"],
                    tasks: ["typescript:base"],
                    options: {
                        spawn: false
                    }
                }
            },
            connect: {
                server: {
					options: {
	                    port: 8080,
	                    base: "."
					}
                }
            },
			shell: {
				bowerInstall: {
					command:  [ "bower install" ].join("&&")
				},
				clean:{
					command:  [	"rm -rf build",
								"rm -rf bower_components",
								"rm -rf app/*.js"].join("&&")
				}
			},
		});

	//Plugin loading
		grunt.loadNpmTasks("grunt-contrib-watch");
	    grunt.loadNpmTasks("grunt-shell");
        grunt.loadNpmTasks("grunt-typescript");
        grunt.loadNpmTasks("grunt-contrib-connect");
		grunt.loadNpmTasks("grunt-shell");
		grunt.loadNpmTasks("grunt-contrib-compress");

	//Task definition
		grunt.registerTask("default", ["shell:bowerInstall","typescript:base","connect:server","watch"]);
		grunt.registerTask("deploy", ["shell:clean","shell:bowerInstall","typescript:base","compress:deploy"]);
		grunt.registerTask("clean", ["shell:clean"]);
};
