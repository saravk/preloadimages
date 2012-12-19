  (function( $ ){
    $.fn.preloadimages = function(options) {
      if(!this.plOptions) {
        this.plOptions = $.extend( {
            attrname: 'data-image',
            batchnum: 10,
          }, options);
      } else if(options) {
        this.plOptions = $.extend(this.plOptions, options);
      }
      // Preload the images in batches
      this.plJob = function() {
        this.preLoadTimer = null;
        i = 0;
        item = this.sourceArray.shift();
        while(item != undefined) {
           $('<img />').attr('src', item).load(function(){
             $('body').append( $(this).height('5px').width('5px'));
           });
           i += 1;
           if (i >= this.plOptions.batchnum) {
              //Randomize the time between 1 to 1000ms
              this.preLoadTimer = setTimeout($.proxy(this.plJob, this), Math.floor(Math.random()*1000+100));
              return;
           }
           item = this.sourceArray.shift();
        }
        return;
      };

      this.plAppend = function(data) {
        attrname = this.plOptions.attrname;

        //Extract the source urls (based on the attribute name) from the new data and load them to the array.
        //Note the : selector here is run within the context of the new data only ($(data))
        images = $("div["+attrname+"]", $(data)).map(function(){return $(this).attr(attrname);}).get();
        this.sourceArray = this.sourceArray.concat(images);
        if (!this.preLoadTimer) {
          //Randomize the time between 1 to 1000ms
          this.preLoadTimer = setTimeout($.proxy(this.plJob, this), Math.floor(Math.random()*1000+100));
        }
      };

      //Extract the source urls ('data-image') from the given selector into an array
      attrname = this.plOptions.attrname;
      this.sourceArray = this.map(function(){return $(this).attr(attrname);}).get();

      //Randomize the time between 1 to 1000ms
      this.preLoadTimer = setTimeout($.proxy(this.plJob, this), Math.floor(Math.random()*1000+100));
    };
  })( jQuery );
