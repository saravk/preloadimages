
//
// Image Preload Plugin
//
(function( $ ){
  $.fn.preloadimages = function(options) {
    if(!this.plOptions) {
      this.plOptions = $.extend( {
          selector: "div[data-image]",
          attrname: 'data-image',
        }, options);
    } else if(options) {
      this.plOptions = $.extend(this.plOptions, options);
    }
    // Preload the images one after the other fom the queue
    this.plJob = function() {
      this.preLoadTimer = null;
      item = this.queue.shift();
      if (item != undefined) {
        plHandler = this;
        $('<img />').attr('src', item).appendTo('#preloadContainer');
        //Randomize the time between 1 to 800ms
        this.preLoadTimer = setTimeout($.proxy(this.plJob, this), Math.floor(Math.random()*800+1));
      }
      return;
    };

    this.plAppend = function(data) {
      attrname = this.plOptions.attrname;

      //Extract the source urls (based on the attribute name) from the new data and load them to the array.
      //Note the : selector here is run within the context of the new data only ($(data))
      images = $(this.plOptions.selector, $(data)).map(function(){return $(this).attr(attrname);}).get();
      this.queue = this.queue.concat(images);

      //Spawn a new job if the old array length was zero (i.e the old job had completed)
      if (!this.preLoadTimer) {
        this.preLoadTimer = setTimeout($.proxy(this.plJob, this), Math.floor(Math.random()*500+1));
      }
    };

    //Extract the source urls ('data-image') from the given selector into an array
    attrname = this.plOptions.attrname;
    this.queue     = this.map(function(){return $(this).attr(attrname);}).get();
    this.container = $('body').append("<div id='preloadContainer' style='display:none;'></div>");

    //Load the first image
    this.plJob();
  };
})( jQuery );
