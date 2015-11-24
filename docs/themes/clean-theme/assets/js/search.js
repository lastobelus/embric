$(function () {
  var keyupBuffer  = null,
      $autoSuggest = $('.autoSuggest'),
      urlRoot = $('#urlRoot').data('url'),
      classes;

  $.getJSON(urlRoot + "data.json", function (data) {
    classes = Object.keys(data.classes);
  });

  $('.searchInput').on('keyup', function () {
    var searchQuery  = $(this).val();
        
    //don't search until the first 3 characters have been entered
    if (searchQuery.length > 2) {
      if (keyupBuffer != null) {
        clearTimeout(keyupBuffer);
      }
      //limits the number of api calls we make when searching
      keyupBuffer = setTimeout(function() {
        var matchingClasses = [];

        keyupBuffer = null;  

        $autoSuggest.html('').show();

        $.each(classes, function (index, className) {
          if (className.indexOf(searchQuery) > -1) {
            matchingClasses.push(className);
          }
        });

        if (matchingClasses.length > 0) {
          $.each(matchingClasses, function (index, className) {
            $autoSuggest.append('<li><a href="'+urlRoot+'classes/'+className+'.html">'+className+'</a></li>');
          });
        } else {
          $autoSuggest.html('<p>No classes found.</p>');
        }       
      }, 200);
    } else {
      $autoSuggest.html('').hide();
    }
  }); //end #calendar-search keyup

});