# images on the web

for meeting Apr. 2012; additions/updates May 2015, Feb. 2016 

**proper images add visual content to the story/page/site**

## what to do 

- add all the images that are practical and appropriate
- correctly crop and adjust levels (discussion); or contact a designer
- link the photo to either a relevant URL or a larger version of the image. The smaller the image is, *the less cool it is to not be linked to a larger version*


### use the appropriate mode/file type

- don't use .jpg for a continous-tone graphic (use 8-bit .png)
- use 24-bit .png for transparency with non-clean edges
- For transparency on images with clean edges, use .gif
- work in RGB not CMYK. When converting from CMYK, the colors will change  
- use the sRGB color space in Photoshop 

### use the appropriate dimensions

Don't use the image right out of the camera, with 4000+ pixel dimensions. **The largest dimension uploaded may not need to be more than ~1600px.** Size before uploading, accordingly. 


### image compression

- start with 30% quality in PS save-for-web
- don't undercompress: iPodsPadsPhones etc. on 3G/Edge still slow d/l'ing

### html image attributes

#### `title` attribute

don't leave an image with the default cryptic filename in the `title` attribute

#### `alt` attribute 

**always need a valid `alt` attribute for an image** (an empty string applies, if appropriate)  

- be accurate, equivalent, and succinct
- if the image is *only* for sighted users, use `alt=""`
- not the same as the `title` attribute
- not the same as the caption
- NOT be redundant. Ex.:
- NOT use the phrases “image of.. “, “graphic of…”
- not add additional information, beyond the content of the image
	
decision tree from [4 Syllables](http://www.4syllables.com.au/wp-content/uploads/2010/12/decision-tree1.png):  

<a href="http://www.4syllables.com.au/2010/12/text-alternatives-decision-tree/"><img alt="image decision tree; link to full article" longdesc="http://www.4syllables.com.au/2010/12/text-alternatives-decision-tree/" src="http://www.4syllables.com.au/wp-content/uploads/2010/12/decision-tree1.png" /></a>  


### avoid:

- the [decapitation](http://o7.no/t1Mn02)
- the [squash](http://dl.dropbox.com/u/12710016/Screenshots/sqaush-gates.png)
- the click it and it's the same size :-/
- the click it and it goes to a page with just that media. and it's the same size (WordPress' media page for that image)
	- **note:** automatic fix for WordPress [here](http://andrewnorcross.com/tutorials/functions-file/stop-hyperlinking-images/)




