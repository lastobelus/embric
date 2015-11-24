$(function () {
  prettyPrint();

  $('.menuToggleContainer').on('click', function () {
    $('body').toggleClass('menuClosed');
    $('.menuToggle').toggleClass('open');
  });

  $('pre, code').each(function () {
    var $this = $(this),
        $p = $this.find('p:first-child');

    if ($p) {
      var html = $this.find('p:first-child').html()
      $p.remove();
      $this.html(html);
    }
    
  });
});