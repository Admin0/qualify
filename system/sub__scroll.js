function scroll_style(is_true) {
  if (is_true) {
    if (!is_mobile) {
      $('nav').addClass('shadow-right');
    }
    $('header').addClass('shadow-bottom');
  } else {
    $('nav').removeClass('shadow-right');
    $('header').removeClass('shadow-bottom');
  }
}

jQuery(function($) {
  $.fn.hScroll = function(amount) {
    amount = amount || 120;
    $(this).bind("DOMMouseScroll mousewheel", function(event) {
      var oEvent = event.originalEvent,
        direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta,
        position = $(this).scrollLeft();
      position += direction > 0 ? -amount : amount;
      $(this).scrollLeft(position);
      event.preventDefault();
      scroll_style($(this).scrollLeft() > 0);
    })
  };
});

$(document).ready(function() {
  // main_ajax.js 로 대체되었다.
});

$(window).scroll(function() {
  scroll_style($('#main_item').offset().top < pageYOffset);
});
