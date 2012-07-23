


impressSlidesAdapter = {
    buildSlides: function(slides) {
      
      for(var i in slides) {
        var slide = slides[i];
        
        var $el = $("#" + slide.id);

        impressSlidesAdapter[slide.type]($el, slide);
        
        
      }
    },
    title: function($el, slide) {
      if (slide.title != null) {
        $el.append("<p class='title'>" + slide.title + "</p>");
      }
      if (slide.text != null) {
        $el.append("<p class='text'>" + slide.text + "</p>");
      }        
    },
    text: function($el, slide) {
      if (slide.title != null) {
        $el.append("<p class='title'>" + slide.title + "</p>");
      }
      if (slide.text != null) {
        $el.append("<p class='text'>" + slide.text + "</p>");
      }
    },
    code: function($el, slide) {
      if (slide.title != null) {
        $el.append("<p class='title'>" + slide.title + "</p>");
      }     
      if (slide.gist != null) {
        $el.append("<pre class='prettyprint'></pre>");
        $.get("https://api.github.com/users/RookieOne/gists/" + slide.gist, function(result) {
          var $codeDiv = $el.find(".prettyprint");
          console.log(result.files);
          console.log(result.files[0].content);          
        });
      }
    }
}
