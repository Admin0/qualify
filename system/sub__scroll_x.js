jQuery(function($) {
  $.fn.hScroll = function(amount) {
    amount = amount || 120;
    $(this).bind("DOMMouseScroll mousewheel", function(event) {
      var oEvent = event.originalEvent,
        direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta,
        position = $(this).scrollLeft();
      // console.log(position);
      position += direction > 0 ? -amount : amount;
      if (position > 0) {
        $('nav').css({
          'box-shadow': '2px 0 6px 0 rgba(60, 64, 67, .15)'
        });
      } else {
        $('nav').css({
          'box-shadow': 'none'
        });
      }
      $(this).scrollLeft(position);
      event.preventDefault();
    })
  };
});

$(document).ready(function() {
  $('.contents').hScroll(300); // You can pass (optionally) scrolling amount
});
