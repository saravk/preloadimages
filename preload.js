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
      item = this.queue.shift();
      plHandler = this;
      if (item != undefined) {
        $('<img />').attr('src', item).load(function(){
            $('#preloadContainer').append( $(this));
            plHandler.plJob();
        });
      }
      return;
    };

    this.plAppend = function(data) {
      attrname = this.plOptions.attrname;

      //Extract the source urls (based on the attribute name) from the new data and load them to the array.
      //Note the : selector here is run within the context of the new data only ($(data))
      oldlength = this.queue.length;
      images = $(this.plOptions.selector, $(data)).map(function(){return $(this).attr(attrname);}).get();
      this.queue = this.queue.concat(images);

      //Spawn a new job if the old array length was zero (i.e the old job had completed)
      if (oldlength == 0){
        this.plJob();
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
