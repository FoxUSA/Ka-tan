module.exports = function(grunt) {
	//Initializing the configuration object
	    grunt.initConfig({
			typescript:{
                base:{
                    src: [  "app/**/*ts"],
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
                    port: 8080,
                    base: "."
                }
            }
		});

	//Plugin loading
		grunt.loadNpmTasks("grunt-contrib-watch");
	    grunt.loadNpmTasks("grunt-shell");
        grunt.loadNpmTasks("grunt-typescript");
        grunt.loadNpmTasks("grunt-contrib-connect");

	//Task definition
		grunt.registerTask("default", ["typescript:base","connect:server","watch"]);
};
