function context_menu() {

  var c = $("#context_menu");
  var target = $(this);
  var output = "";

  $("body").on("contextmenu", function(event) {
    event.preventDefault();

    if (!is_mobile) {
      function set_location() {

        var context_x,
          context_y,
          con_sub_x,
          con_sub_y;
        if ($(document).width() - c.outerWidth() > event.pageX) {
          context_x = event.pageX;
        } else {
          context_x = $(document).width() - c.outerWidth();
        }
        if ($(window).height() - c.outerHeight() > event.pageY - $(document).scrollTop()) {
          context_y = event.pageY - $(document).scrollTop();
        } else {
          context_y = $(window).height() - c.outerHeight();
        }
        c.css({
          'left': context_x + "px",
          'top': context_y + "px"
        }).addClass("on");
        $('.context_menu').parent().hover(function() { //하위 메뉴 항목
          if ($(document).width() - c.outerWidth() - target.children().last().outerWidth() > event.pageX) {
            con_sub_x = 'calc(100% - .5em)';
          } else {
            con_sub_x = 'calc(' + (-target.children().last().outerWidth()) + 'px + .5em)';
          }
          if ($(window).height() - target.children().last().outerHeight() - target.position().top > event.pageY - $(document).scrollTop()) {
            con_sub_y = '-7px';
          } else {
            con_sub_y = $(window).height() - c.position().top - target.position().top - target.children().last().outerHeight() + 'px';
          }
          target.children().last().css({
            'left': con_sub_x,
            'top': con_sub_y
          });
        });
      }
      set_location();
    } else {
      if ($('nav').attr('class') != 'on') {
        $('nav, #nav_bg').addClass('on');
      } else {
        $('nav, #nav_bg').removeClass('on');
      }
    }
  });
  $(document).on("click", function() {
    if ($('#context_menu:hover').length > 0) {
      if ($('.context_able:hover').length > 0) {
        //      $('#output_for_context_menu').html('1');
        c.removeClass("on");
      } else {
        //      $('#output_for_context_menu').html('2');
      }
    } else {
      //    $('#output_for_context_menu').html('3');
      c.removeClass("on");
    }
  });
}
