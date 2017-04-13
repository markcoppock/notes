# using fancybox 2 on WordPress sites (no plugin, without helper files)

to avoid using, or to replace, the now-old Shadowbox JS plugin

---

## 1. download and copy the files to the WP install

first, **[download here](https://github.com/fancyapps/fancyBox/zipball/v2.1.5)** from the [github repo](https://github.com/fancyapps/fancyBox)  

in the downloaded files, from the 'source' directory:  

- copy the image files into the /images directory
- copy 'jquery.fancybox.js' to the site's established js directory (could be /js, libs/js, whatever)
- either copy the 'jquery.fancybox.css' to the same directory as the .js file, or an established css directory. If the site is using only the '/style.css' file, the jquery css file can be copied into it


## 2. create a custom js file, or add to a current custom script

if no other custom scripts exist, you can create one called sitename.js with this content:

	jQuery(document).ready(function($) {
		$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").attr('rel', 'gallery').fancybox();
		
		// if helper files are used:
		$('.fancy-media').fancybox({ helpers : { media: true } });
	});


## 3. enqueue the script(s) and style(s)

- update image paths; e.g., line 79: `background-image: url('fancybox_sprite.png');`change the path to connect to the /images directory

  