# WordPress tips snippets etc.

---

## fancybox

### without plugin

see [here](https://github.com/markcoppock/notes/blob/master/wordpress/fancybox-wordpress.md)

### Easy Fancybox plugin settings

**1.** set a darker background:  

![color to black; opacity to 0.8](https://dl.dropboxusercontent.com/u/12710016/Screenshots/easy-fancybox-settings-1.png)  

**2.** Turn off the ridiculous easing transistions:  

![transistion in and out to NONE; Easings set to LINEAR](https://dl.dropboxusercontent.com/u/12710016/Screenshots/easy-fancybox-settings-2.png)


---

## enabling shortcodes in widgets

	// Enable shortcodes in text widgets
	add_filter('widget_text','do_shortcode');

---

## embedding videos

[no using plugins anymore. but...](http://ttivisualmedia.tamu.edu/2016/08/17/embedding-video-in-wordpress-sites/)

---

## creating a child theme

[From the Codex](https://codex.wordpress.org/Child_Themes); e.g., from Twenty Sixteen:

### 1. set up the directory and the new style.css

- create a new directory in the themes directory: `mkdir childthemename` (put your name)
- change to that new directory: `cd urbanstreet`
- create a 'style.css' file in the new directory `touch style.css`
- copy the style.css header from the parent theme into your new style.css, and modify it as below:

Original header (minus what we're not using):

	/*
	Theme Name: Twenty Sixteen
	Theme URI: https://wordpress.org/themes/twentysixteen/
	Author: the WordPress team
	Author URI: https://wordpress.org/
	Description: ...
	Version: 1.0
	License: GNU General Public License v2 or later
	License URI: http://www.gnu.org/licenses/gpl-2.0.html
	Tags: ...
	Text Domain: twentysixteen
	
	This theme, like WordPress, is licensed under the GPL.
	...
	*/


revise the copied header:

	/*  
	Theme Name: Child Theme of Twenty Sixteen
	Theme URI: https://wordpress.org/themes/twentysixteen/
	Author: the WordPress team and TTI
	Author URI: https://wordpress.org/
	Description: ...
	Version: 0.1.0
	License: GNU General Public License v2 or later
	License URI: http://www.gnu.org/licenses/gpl-2.0.html
	Tags: ...
	Text Domain: twentysixteen
	
	Template: twentysixteen
	
	*/

**Note**: the updated Theme Name (add your own), and the line at the end: `Template: twentysixteen`  

### 2. enqueue the parent style.css and the new one

Create a new 'functions.php' file and add:

	function childthemename_enqueue_styles() {
    $parent_style = 'parent-style';
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style )
    );
	}
	add_action( 'wp_enqueue_scripts', 'childthemename_enqueue_styles' );


---

<a name="typekit" id="typekit"></a>

## to add fonts from typekit:

	function tti_typekit_js() {
		echo '<script src="//use.typekit.com/your-kit-number.js"></script>' . "\n";
		echo '<script>try{Typekit.load();}catch(e){}</script>' . "\n";
	}
	add_action( 'wp_head', 'tti_typekit_js' );

---

## security 

### escaping to avoid <abbr title="Cross Site Scripting attack">XSS</abbr> vulnerabilities

**\>>> see article [here](https://css-tricks.com/introduction-to-wordpress-front-end-security-escaping-the-things/)**

>To convert a character or string of characters to be interpreted literally within a specific context, typically to prevent those characters from being interpreted as code.
	
#### Function: `esc_html` [codex](http://codex.wordpress.org/Function_Reference/esc_html)

**Used for:** Output that should have absolutely no HTML in the output.

**What it does:** Converts HTML special characters (such as <, >, &) into their "escaped" entity (`&lt;`, `&gt;`, `&amp;`)

...

#### Function: `esc_attr` [codex](http://codex.wordpress.org/Function_Reference/esc_attr)

**Used for:** Output being used in the context of an HTML attribute (think "title", "data-" fields, "alt" text).

**What it does:** The exact same thing as esc_html. The only difference is that different WordPress filters are applied to each function

...

#### Function: `esc_url` [codex](http://codex.wordpress.org/Function_Reference/esc_url)

**Used for:** Output that is necessarily a URL. Examples would be image src attributes and href values.  

**What it does:** A more thorough, specific escaping than the esc_attr & esc_html functions, which removes or converts any characters not allowed in URLs into their URL-safe format.  

...

#### Function: `json_encode` 

**Used for:** Printing a PHP variable for use in JavaScript.

**What it does:** Converts a PHP variable (object, string, array, whatever) into a sensible, escaped JavaScript representation of that PHP variable.

---

## get the category name etc. when using a generic archive page template (archive.php)

from [the support forums](https://wordpress.org/support/topic/get-category-slug-on-category-archive-page)  

	$cat = get_category( get_query_var( 'cat' ) );
	$cat_id = $cat->cat_ID;
	$cat_name = $cat->name;
	$cat_slug = $cat->slug;
	
e.g.:

	$cat = get_category( get_query_var( 'cat' ) );
	$cat_name = $cat->name;
	echo '<h1>' . $cat_name . '</h1>';
	...

---

<a name="genesis-footer" id="genesis-footer"></a>

## replace Genesis footer with the content of a page named 'Footer'


	/** customize the footer */
	remove_action( 'genesis_footer', 'genesis_do_footer' );
	add_action( 'genesis_footer', 'tti_add_footer' );
	
	function tti_add_footer() {
		echo '<div class="wrap">';
		echo '<p>Copyright &copy; ' . Date('Y') . '</p>';

		// from https://codex.wordpress.org/Template_Tags/get_posts#Get_a_post_by_its_slug
		$args = array(
			'name'           => 'footer',
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'posts_per_page' => 1
		);
		$my_posts = get_posts( $args );
		if ( $my_posts ) {
			$footer_id = $my_posts[0]->ID;
		}

		// from http://stackoverflow.com/questions/5317366/proper-way-to-get-page-content
		$post = get_post($footer_id); 
		$content = apply_filters('the_content', $post->post_content); 
		echo $content;  

		echo '</div>';
	}

---

## add a class to the body tag

see [the codex](http://codex.wordpress.org/Function_Reference/body_class)  

### add a single class name

	add_filter( 'body_class', 'tti_add_class_to_body_tag' );
	function tti_add_class_to_body_tag( $classes ) {
		$classes[] = 'new_class_name';
		return $classes;
	}


### adding the page slug, and its ancestor(s)', to the body tag class list

	//* Add page slug, and, if a child page, its original ancestor's page slug, to the body class list 
	add_filter( 'body_class', 'tti_add_page_slug_to_body_class' );
	function tti_add_page_slug_to_body_class( $classes ) {
	    global $post;
	
	    if ( !in_array( 'home', $classes ) ) { $classes[] = 'subpage'; }
	
	    $slug = get_post( $post )->post_name;  
	    $classes[] = $slug;
	
	    $parent = array_reverse(get_post_ancestors($post->ID)); // from http://wordpress.org/support/topic/how-to-get-top-level-parent-pages
	    if ( count($parent) > 0 ) {
		    $first_parent = get_page($parent[0]);
		    $parent_slug = $first_parent->post_name;
	
		    if ( count($parent) > 1 ) {
		    	$second_parent = get_page( $parent[1] );
		    	$second_level_parent = $second_parent->post_name;
		    }
		    if ( $slug != $parent_slug && count($parent) > 1 ) { 
		        $classes[] = $parent_slug; // if this is a child page; add its first parent's slug also
		        if ( $slug != $second_level_parent ) {
		        		$classes[] = $second_level_parent; // at least a third-level page
		        } 
		    }
		 }
	    return $classes;
	}


### add classes / attributtes to elements with Genesis

from [WP Beaches](https://wpbeaches.com/adding-attribute-html-section-genesis/)  

	add_filter( 'genesis_attr_sidebar-primary', 'custom_add_css_attr' );
	function custom_add_css_attr( $attributes ) {
	 
	 // add original plus extra CSS classes
	 $attributes['class'] .= ' secondary toggled-on';
	 
	 // return the attributes
	 return $attributes;
	}


---

## keep non-admin users out of the Dashboard

from [tutsplus](http://codex.wordpress.org/Plugin_API/Action_Reference/admin_init)


	add_action( 'admin_init', 'admin_init_example', 1 );
	 
	function admin_init_example() {
	    if ( ! current_user_can( 'manage_options' ) && ( ! defined( 'DOING_AJAX' ) || ! DOING_AJAX ) ) {
	        wp_redirect( site_url() );
	        exit;
	    }
	}

---

## remove `p` tags around images in content

from [tutsplus](http://code.tutsplus.com/tutorials/50-filters-of-wordpress-the-first-10-filters--cms-21295)  

	add_filter( 'the_content', 'the_content_example' );
	 
	function the_content_example( $content ) {
	    return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
	}
	 
	// Example source: http://wpsnipp.com/index.php/functions-php/remove-p-tag-from-around-images-in-the_content/
	 
---

## strip tags from `the_terms()` 

	add_filter( 'the_terms', 'strip_tags' );

---

<a name="autoupdates" id="autoupdates"></a>

## enabling *all* automatic WP core updates (inc. major releases)

add to wp-config.php (from [the codex](http://codex.wordpress.org/Configuring_Automatic_Background_Updates#Constant_to_Configure_Core_Updates)):

	define( 'WP_AUTO_UPDATE_CORE', true );

---

## when exporting database from phpMyAdmin 

from lynda.com, [deleting spam comments in the database](http://www.lynda.com/WordPress-tutorials/Before-you-do-anything-Make-backup-everything/163115/172661-4.html)  

- **check** "Add DROP TABLE / VIEW / PROCEDURE / FUNCTION / EVENT"
- make sure "Add CREATE PROCEDURE / FUNCTION / EVENT" is **unchecked**

---

## disable 'Appearance -> Editor' (!)

wanks version control ∴ BAD

in wp-config.php:

	define( 'DISALLOW_FILE_EDIT', true );

---

## when moving from server to localhost 

in wp-config.php add:

	define('WP_HOME','http://localhost/sitename');
	define('WP_SITEURL','http://localhost/sitename');
	
---

## get page slug from template

`$page_slug = basename( get_permalink() );` from [TCBarrett](http://www.tcbarrett.com/2011/09/wordpress-the_slug-get-post-slug-function/#.UuKV5GTnbmE)

### Add the page's slug to the body tag's class list

In functions.php:

	add_filter( 'body_class', 'tti_body_class' );
	function tti_body_class( $classes ) {
	    global $post;
	
	    $slug = get_post( $post )->post_name;  
	    $classes[] = $slug;
	    
	    return $classes;
	}

---
	
## for 'Fatal Error: Allowed memory size…'

following from [here](http://wordpress.org/support/topic/memory-exhausted-error-in-admin-panel-after-upgrade-to-28) 

in wp-config.php add:

`define('WP_MEMORY_LIMIT', '96M');`

or in .htaccess:

`php_value memory_limit 64M`

---

<a name="ownership" id="ownership"></a>

## WordPress asking for FTP info when updating core/plugins/themes

certain MAMP local installs

from [here](http://www.chrisabernethy.com/why-wordpress-asks-connection-info/)  

### change ownership of the install directory to 

	sudo chown -R groupname: installdirectoryname 
	
also, from [here](http://www.wprecipes.com/how-to-prevent-wordpress-from-asking-ftp-credentials)   

Paste the following line in your wp-config.php file:

`define('FS_METHOD', 'direct');`

---

## to place the content of a particular post or page into a custom page template etc.:

`echo get_post_field('post_content', $post_id);`

---

## multisites 

for a subsite to access the primary site, `echo get_site_url(1);`

---

## jquery in wordpress

from [here](http://matthewruddy.com/using-jquery-with-wordpress/)  

	jQuery(document).ready(function($) {
	    // Code here will be executed on document ready. Use $ as normal.
	});
	
then you can use `$( ... )` 
	
for anonymous functions, pass jQuery as an argument: 

	(function($) {
	   // Your jQuery code goes here. Use $ as normal.
	})(jQuery);

---

## custom roles

reference [codex](http://codex.wordpress.org/Roles_and_Capabilities#Capability_vs._Role_Table)

e.g.:


		if ( !get_role('editorplusforms') ) {
		        $caps = get_role('editor')->capabilities; //let's use the editor as the base  capabilities
		        $caps = array_merge( $caps, array(
		        'edit_theme_options' => true,
                'gravityforms_create_form' => true,
                'gravityforms_delete_entries' => true,
                'gravityforms_delete_forms' => true,
                'gravityforms_edit_entries' => true,
                'gravityforms_edit_entry_notes' => true,
                'gravityforms_edit_forms' => true,
                'gravityforms_edit_settings' => true,
                'gravityforms_export_entries' => true,
                'gravityforms_feed' => true,
                // 'gravityforms_uninstall' => true,
                'gravityforms_view_entries' => true,
                'gravityforms_view_entry_notes' => true,
                'gravityforms_view_settings' => true
        )); //adding new capabilities: reference http://codex.wordpress.org/Roles_and_Capabilities#Capability_vs._Role_Table
        
        add_role( 'editorplusforms', 'Editor Plus with Forms', $caps );
	}

---

## remove breadcrumbs from top-level pages

after checking "Pages" in Genesis -> Theme Settings -> Breadcrumbs. Will have the effect of only showing breadcrumbs on subpages, not top-level pages

	add_action('wp_head', 'breadcrumbs_subpages');
	function breadcrumbs_subpages() {
		global $post;
		if( is_page() && $post->post_parent == 0 ){
			remove_action('genesis_before_loop', 'genesis_do_breadcrumbs');
		}
	}

---

## adding iframes 

...nah, just don't…  

from [here](http://www.vividvisions.com/2009/02/11/wordpress-add-iframes-to-your-post/)

in functions.php:

        function field_func($atts) {
                global $post;
                $name = $atts['name'];
                if (empty($name)) { return; }

                return get_post_meta($post->ID, $name, true);
        }

        add_shortcode('field', 'field_func');

on the Edit Page/Edit Post page, use "Screen Options" to enable custom fields. Then as shown below:  

![screenshot](https://dl.dropboxusercontent.com/u/2561535/tech-notes/wordpress-field-function.png)

