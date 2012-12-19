Introduction
=============

jQuery plugin to preload images in a webpage with support for Ajax loading.


Installation
------------

###Prequisites

jQuery - 1.4.3 or better

###Required files

Copy jquery.preload.js to your javascript folder.


Usage - HTML Markup
-------------------
Use a consistent markup for specifying the urls of the images to be preloaded. 

In the below example you can either the first or second type of markup but not both. The plugin supports only one type
of selector for extracting the image urls for preloading.
  
    <img src="http://somewhere/1.jpg">
    <img src="http://somewhere/2.jpg">
    <img src="http://somewhere/3.jpg">
    
    <div class="something" data-image="http://somewhere/1.jpg"></div>
    <div class="something" data-image="http://somewhere/2.jpg"></div>
    <div class="something" data-image="http://somewhere/3.jpg"></div>

Usage - Javascript
------------------

The plugin can be called with jQuery in different ways.
    
### Standard call with default settings:

    var handle = $('selector').preloadimages();
    
Use `selector` to find all the elements containing the URLs for the images to preloed (e.g "div[data-image]"). 

### Options

You can change the 'selector' and 'attribute name' (where the URLs are specified) while initializing the plugin. 

    var handle = $('.selector).preloadimages({
                                  selector: "div[data-image]",
                                  attrname: 'data-image',
                                });

Preloading Images after a AJAX load
-----------------------------------

The plugin will preload all the images (specified by the selector) in the HTML page when you initialize it. After that if
you change the DOM by inserting new data from Ajax calls you'll need to call the 'handle.plAppend(data)' method to preload
any images specified in the new data retrieved from the Ajax call.

        $.get('/fromsomewhere', function(data) {
                handle.plAppend(data);
        });
