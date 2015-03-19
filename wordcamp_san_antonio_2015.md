# wordcamp san antiono 2015

1-26-2015  

(items in brackets are my inferences; don't quote the speakers on these)  

[http://2015.sanantonio.wordcamp.org/](http://2015.sanantonio.wordcamp.org/)  

[#wcsatx](https://twitter.com/search?f=realtime&q=%23wcsatx%20&src=typd)

## keynote 

Brandon Kraft, [@kraft](https://twitter.com/kraft)  

23.3% of top 10M websites that use a detectable CMS use WP  

**core features are focused on the majority of users**—<*not* on developers since there are far fewer of them \>  

if the majority of people won't use a feauture, it won't be added to core   

only 1% of people comment/complain/respond. ( &there4; the core team aren't overly influenced by them ) 

there is a **setting for *all* automatic updates**, not just point releases (through code \<see [codex](http://codex.wordpress.org/Configuring_Automatic_Background_Updates#Constant_to_Configure_Core_Updates); and [here](http://dmgdemophp.tamu.edu/marknotes/wordpress/#autoupdates)\> ) 

 

story of an (simple, pres.) HOA site being updated from WP 2.3 to 4.1 with no problems  

**json api** updates in 4.2(?) (see his additional comments later; tl;dr they need more people strenuously testing it)

---

## Caching your WordPress internally and externally

Anthony Burchell, Rackspace

- [antpb.com](http://antpb.com)
- [@thewpressguy](https://twitter.com/thewpressguy)
- see his weekly training videos online (on youtube or on his site)      

slides at [antpb.com/caching](http://antpb.com/caching)  

show: Halt and Catch Fire—building a 396 MS response time computer to addict users with speed 

**cache for *speed***

### plugins

1. wp supercache
2. wp redis cache
3. w3 total cache
4. wp fast cache

#### wp supercache 

works well with cdn's (use its cdn sync tool)  

##### using the advanced settings screen  

set 'use php to cache files' (tho mod-rewrite is faster, ___________)

##### option 1 - preload

problems: 

- content will not update with every refresh but rather on a time interval
- ... 

**wp supercache has a dynamic caching plugin**  

not a separate plugin install: /plugins/wp-supercache/plugins/dynamic-cache-test.php (EDIT THIS FILE [it won't get changed when the main plugin is updated though create a backup of this file just in case])    

(see slide)  stores defined content in the output buffer of the plugin; add in a function in the code, then add to theme (e.g., in header.php)  

if you don't need dynamic caching...  

#### WP Redis Cache

SIMPLE **see his [youtube tutorial](http://antpb.com/356)**   

good for sites with no ads  

saves your html as a hash  

### q&a

cloudplayer  

gtmetrics, wpbpagetest.org, pingdom (see their tools page)  

---

## WordPress is advancing rAPIdly

[wayne McWilliams](http://2015.sanantonio.wordcamp.org/speakers/wayne-mcwilliams/); a designer, in the past year has built 50 WP sites from scratch    

[slides](http://www.slideshare.net/WayneAlanMcWilliams/wordpress-is-advancing-rapidly)  

### WP API

it's a plugin for now, likely be in core in WP 4.2  

for pulling and pushing content  

not just for content; functionality (adding/editing users e.g.) can/will be implemented in the api  

[wp-api.org](http://wp-api.org)  

there is a downloadable working beta on github; (Brandon Kraft: needs more extensive testing from users before it can be added to WP core)  

see [ryan mccue article](http://wptavern.com/ryan-mccue-on-creating-the-json-rest-api-for-wordpress) on wp tavern  

[wordcamp pres by Rachel Baker](http://wordpress.tv/2014/07/06/rachel-baker-put-your-content-to-rest-with-wp-api/) on wordpress.tv  

good article on [torque](http://torquemag.io/introduction-wordpress-new-universal-connector-json-rest-api/); API: "basically a universal connector for data on the internet"    

an api is like an hdmi port, but for your website  

#### popular apis

twitter, facebook, google maps, youtube, flickr  

[bocoup](http://bocoup.com/) : **a node.js site built using the wp api**   

### accessing info through wp-api

example.com/**api**/... \<is this correct?\>

---

## lightning questions

plugin to connect [ifttt.com](http://ifttt.com) to post to your wp site, every time you favorte feedly, add to evernote, email, facebook, linkedin, ETC. (!)  

---

<a name="speed" id="speed"></a>  

## Optimizing Your WordPress Site For Speed

Devin Price, [wptheming.com](http://wptheming.com)  

front-end techniques, in addition to the caching talk  

in Google Analytics, check the **Site Speed Overview page** (note: *these speeds are dependent on the visitors' connection speed*, but can still give you ideas comparing pages)  

[developers.google.com/speed/pagespeed/insights](http://developers.google.com/speed/pagespeed/insights)  

### *network tab* in chrome dev tools:

- can show at different connection speeds, 
- use the 'disable cache' checkbox    
- use a new incognito window to check without you being logged in to your site
- compare before and after when testing new plugins

**remove plugins that aren't in use** \<at least disable them\> they're slowing down your load speeds  

### images

[his post](http://wptheming.com/2015/01/efficient-images-in-wordpress/)  

#### plugins 

[**Lazy Load Images**](https://wordpress.org/plugins/lazy-load/) \<old tho\>  

if your featured images are being loaded at non-standard sizes, use the Regenerate Thumbnails plugin

##### jetpack

Photon module ([his post](http://wptheming.com/2015/01/faster-images-jetpack-photon/))

- does lossless compression (smaller than the wp default)  
- cdn's your images to the wp.com servers  
- automatically fully scales your images down to the no wider than the theme's width limits

plugin: Replace Content Image Size (backup site first)

plugin: WP Resized Image Quality (WP by default saves at 90% (!) quality); jetpack photon does this also  

### fonts

only use the variations/characters that you need  

can combine multiple google web fonts in one call  

### concat and minify

some caching plugins have this as part  

MinQueue plugin, WP Minify, *test* since some scripts may need to be separate  

**using grunt/gulp \<better than plugins\>** for controlling order of concating and minifying  

### conditional loading of scripts and styles

e.g., 

	if ( ! is_single() && ! is_404() ) {
		wp_dequeue_script( 'masonry' );
	}   

see his posts on this at [wptheming.com](http://wptheming.com/)  

---

## Building Parsec (a fully responsive WordPress theme)

[Joe Casabona](http://casabona.org/); [book](http://rwdwp.com/)    

[slides](http://rwdwp.com/102)  

will be on [github.com/jcasabona/parsec](https://github.com/jcasabona/parsec)  

uses _s as a base  

### 1. sketch out the site 

seriously, just a sec. **this process elicits questions**

### 2. create a style tile

[styletil.es](http://styletil.es) for templates  

website [fillerama](http://chrisvalleskey.com/fillerama/) for filler text  

he recommends: **designing in the browser**  

#### sass

Dan Cedarholm's Sass for Web Designers  

'picture' element upcoming in browsers  

#### use the _s theme as a beginning point

now supports sass  

starts with proper structure but leaves a lot up to you  

#### breakpoints

now over 6000 device resolutions  

#### navigation

[rwdwp.com/101](http://rwdwp.com/101)  

`wp_is_mobile()`  

using:

	li {
		text-align:justify; 
		display:inline-block;
	}  

picturefill.js to work with the `<picture>` element  

WP now supports HTML5 images galleries  

#### load times

can set sass to minify the css  

WP now includes google web fonts—**remove if not needed**  

svg when possible/practical  

[**crossbrowsertesting.com**](http://crossbrowsertesting.com) (subscription); [**Adobe Edge Inspect**](https://creative.adobe.com/products/inspect) (inc. with creative cloud)  

---

## Basics of WP CLI

Roberto Villarreal, [@iamrobertv](https://twitter.com/iamrobertv), Pressable, [blog](http://pressable.com/blog)  

great tool for managing sites, from the terminal  

good way to get comfort on the command line  

requires some general understanding of the way WP works, in general  

like a command line-based extension to WP  

31 main commands, most with subcommands with specific parameters    

global parameters  

can add the `--help` flag to any command  

`wp core version --extra`  


	wp core config
	Error: Parameter errors:
	 missing --dbname parameter (Set the database name.)
	 missing --dbuser parameter (Set the database user.)
	 
`wp core config --dbname=test --dbuser=test`  

**`wp plugin update [<plugin>...] [--dry-run]`**  

`wp plugin update --all`  

`wp plugin search google`  

`wp post ...` command  

**`wp db export <file>`**; `wp db import <file>`   

### search and replace

need to have a serialized s&r; **this is built into wp-cli**  