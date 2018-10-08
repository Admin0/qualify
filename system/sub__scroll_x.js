function scroll_style(is_true) {
  if (is_true) {
    if (!is_mobile) {
      $('nav').css({
        'box-shadow': '2px 0 6px 0 rgba(60, 64, 67, .15)'
      });
    }
    $('header').css({
      'box-shadow': '0 2px 6px 0 rgba(60, 64, 67, .15)'
    });
  } else {
    $('nav').css({
      'box-shadow': 'none'
    });
    $('header').css({
      'box-shadow': 'none'
    });
  }
}

jQuery(function($) {
  $.fn.hScroll = function(amount) {
    amount = amount || 120;
    $(this).bind("DOMMouseScroll mousewheel", function(event) {
      var oEvent = event.originalEvent,
        direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta,
        position = $(this).scrollLeft();
      // console.log(position);
      position += direction > 0 ? -amount : amount;
      $(this).scrollLeft(position);
      event.preventDefault();
      scroll_style(position > 0);
    })
  };
});

$(document).ready(function() {
  if (!is_mobile) {
    $('.contents').hScroll(300); // You can pass (optionally) scrolling amount
  }
});

$(window).scroll(function() {
  scroll_style($('#main_item').offset().top < pageYOffset);
});
