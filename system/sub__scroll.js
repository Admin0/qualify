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
      // console.log(position);
      position += direction > 0 ? -amount : amount;
      $(this).scrollLeft(position);
      event.preventDefault();
      scroll_style(position > 0);
    })
  };
});

$(document).ready(function() {
  // if (!is_mobile) {
  //   $('.contents').hScroll(300); // You can pass (optionally) scrolling amount
  // }
});

$(window).scroll(function() {
  scroll_style($('#main_item').offset().top < pageYOffset);
});
