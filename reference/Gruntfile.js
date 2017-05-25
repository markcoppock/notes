module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/** 
		 * Sass task
		 */
		sass: {
			dev: {
				options: {
					style: 'expanded',
					sourcemap: 'none',
				},
				files: {
					'compiled/style-human.css': 'inc/scss/style.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none',
				},
				files: {
					'compiled/style.css': 'inc/scss/style.scss'
				}
			}
		},

		 /** 
		 * Post CSS/Autoprefixer task
		 */
		postcss: {
		  options: {
		    map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'inc/scss/maps/' // ...to the specified directory
      },
		    processors: [
		      require('autoprefixer')({browsers: ['last 3 versions']})
		    ]
		  },
		  dist: {
		    src: 'compiled/*.css',
		    dest: 'style-dist.css'
		  }
		},

		/** 
		 * Watch task
		 */
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass','postcss']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.registerTask('default', ['watch']);

}