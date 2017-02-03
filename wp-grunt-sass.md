# WP theme development with grunt and sass (OS-X)

notes from [lynda.com](http://www.lynda.com/Grunt-js-tutorials/Adding-support-Grunt-Sass-Watch-Autoprefixer/372540/385126-4.html) &mdash; if the first time installing on the command line: `sudo chown -R $USER /usr/local`  

## 0. make sure the global versions of grunt-cli and sass are installed

if `grunt --version` gives a 'command not found' response, then: `npm install -g grunt-cli`  

if `sass --version` gives a 'command not found' response, then: `sudo gem install sass`  

---

now, in theme directory:  

## 1. set .gitignore to include:  

	node_modules
	.npm-debug.log
	tmp
	.sass-cache
	*.css.map

## 2. initialize node

again in the theme directory:  

`npm init` will create file package.json  

## 3. install grunt and tools locally

`npm install grunt --save-dev`  

`npm install grunt-contrib-sass --save-dev`  

in package.json, should see:  

	"devDependencies": {
	    "grunt": "^1.0.1",
	    "grunt-contrib-sass": "^1.0.0"
	  }

will also see a node-modules directory  

`npm install grunt-contrib-watch --save-dev`  (note the addition to package.json)  

`npm install --save-dev grunt-postcss autoprefixer`   (note the addition to package.json...)   

`npm install grunt-autoprefixer --save-dev`  

## 4. build the Gruntfile

`touch Gruntfile.js`  

[example Gruntfile.js](https://dl.dropboxusercontent.com/u/12710016/Gruntfile.js)  

**note:** to avoid the main WP style.css at the root from getting its initial comments removed, add a `!` after the first comment opening:  

	/*!
	Theme Name: TTI Starter
	...

## 5. run grunt

`grunt` once changes are made to a *.scss file, will compile and run all the tasks  

## 6. enqueue the generated /style-dist.css

e.g., in functions.php or an included file:

	add_action( 'wp_enqueue_scripts', 'carteeh_enqueue_scss_css' );
	function carteeh_enqueue_scss_css() {
		wp_enqueue_style( 'carteeh-scss', get_stylesheet_directory_uri() . '/style-dist.css', array(), CHILD_THEME_VERSION );
	}
