function scroll_style(is_true) {
  if (is_true) {
    if (!is_mobile && $(window).width() > 1080 && $('.contents').length != 0) {
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
      if ($(window).width() > 1080) {
        event.preventDefault();
      }
      scroll_style($(this).scrollLeft() > 0);
    })
  };
});

function scroll__item_list(t) {
  // var t = $('#item_list');
  if (t.scrollTop() != 0) {
    if (!is_mobile && $(window).width() > 1080) {
      $('header').addClass('shadow-bottom');
      // t.addClass('shadow-top-inset'); // 병목현상 유발
    }
  } else {
    $('header').removeClass('shadow-bottom');
    // t.removeClass('shadow-top-inset'); // 병목현상 유발
  }
  if ((t.scrollTop() + t.height() + 1) < t[0].scrollHeight) {
    if (!is_mobile && $(window).width() > 1080) {
      $('footer').addClass('shadow-top');
      // t.addClass('shadow-bottom-inset'); // 병목현상 유발
    }
  } else {
    $('footer').removeClass('shadow-top');
    // t.removeClass('shadow-bottom-inset'); // 병목현상 유발
  }
  // console.log(
  //   "scrollTop         : " + t.scrollTop() +
  //   "\nscrollHeight      : " + t[0].scrollHeight +
  //   "\nheight            : " + t.height() +
  //   "\nheight + scrollTop: " + (t.scrollTop() + t.height())
  // );
}

$(document).ready(function() {
  // $('.contents').hScroll(300); // main_ajax.js 로 대체되었다.

  $('#item_list').scroll(function() {
    scroll__item_list($('#item_list'));
  });
});

$(window).scroll(function() { // #main_item shadow for mobile
  // scroll_style($('#main_item').offset().top < pageYOffset);
  scroll_style(pageYOffset > 0);
});
