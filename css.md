# css

--- 

## evenly spaced menu items

	.item-wrap-selector {
		display: table;
		table-layout: fixed; /* Makes items equal width by default */
		width: 100%;
	}
	.menu-item-selector {
		display: table-cell;
	}
	
from comment [here](http://www.billerickson.net/menu-item-equal-widths/#comment-640081). Or see using the WP built-in `nav_menu_css_class` filter [on Bill Erickson's site](http://www.billerickson.net/menu-item-equal-widths/)

---

## modern clearfix

	.group:before,
	.group:after {
	    content:"";
	    display:table;
	}
	.group:after {
	    clear:both;
	}
	.group {
	    zoom:1; /* For IE 6/7 (trigger hasLayout) */
	}
	
from [css-tricks](http://css-tricks.com/pseudo-element-roundup/)

---

## the `picture` element

(from [An Event Apart Digest, Issue 3](http://us1.campaign-archive1.com/?u=6d37edd181bb9ed68b7d8cb6d&id=b1c64f7385&e=e395585eb2))

The picture element introduces a smarter way of loading images. We can use a syntax that tells the browser to disregard a source unless it recognizes the contents of a type attribute, meaning only one server request gets made.

	<picture>
	   <source type="image/svg+xml" srcset="pic.svg">
	   <img src="pic.png" alt="…">
	</picture>

---

## hiding text

Instead of the familiar `left:-9999px`, from [zeldman.com](http://www.zeldman.com/2012/03/01/replacing-the-9999px-hack-new-image-replacement/):

	
	.hide-text {
	    text-indent: 100%;
	    white-space: nowrap;
	    overflow: hidden;
	}