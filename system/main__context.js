function contextmenu() {
  $("body").on("contextmenu", function(event) {
    event.preventDefault();
    if (window.localStorage["cccv"] == "true") {
      var c = $("#contextmenu");
      var target = $(this);
      var output = "";

      function print() {
        if (window.localStorage["cccv__style"] == "true") {
          output += '<link rel="stylesheet" type="text/css" href="http://admin0.github.io/bucket/style_card.css">\n<style>\n\t.card_wrap { margin:1em auto; display: block; font-size: 16px; }\n</style>\n\n';
        }
        output += '<div class=card_wrap>' + target.html() + '</div>';
        if (window.localStorage["cccv__to_here"] == "true") {
          var id;
          if (target.children().attr("id") != null) {
            id = "/#" + target.children().attr("id");
          } else if (target.children().children().attr("id") != null) {
            id = "/#" + target.children().children().attr("id");
          } else {
            id = "";
          }
          output = '<h2><a href="http://admin0.github.io/bucket' + id + '">버킷리스트' + id + '</a></h2>\n\n' + output;
        }
        // $("#contextmenu > .output").val(output); //.select();

        // auto copy to Clipboard


      }

      function set_location() {

        var context_x,
          context_y,
          con_sub_x,
          con_sub_y;
        if ($(document).width() - $("#contextmenu").outerWidth() > event.pageX) {
          context_x = event.pageX;
        } else {
          context_x = $(document).width() - $("#contextmenu").outerWidth();
        }
        if ($(window).height() - $("#contextmenu").outerHeight() > event.pageY - $(document).scrollTop()) {
          context_y = event.pageY - $(document).scrollTop();
        } else {
          context_y = $(window).height() - $("#contextmenu").outerHeight();
        }
        $("#contextmenu").css({
          'left': context_x + "px",
          'top': context_y + "px"
        }).addClass("on");
        $('.contextmenu').parent().hover(function() { //하위 메뉴 항목
          if ($(document).width() - $("#contextmenu").outerWidth() - target.children().last().outerWidth() > event.pageX) {
            con_sub_x = 'calc(100% - .5em)';
          } else {
            con_sub_x = 'calc(' + (-target.children().last().outerWidth()) + 'px + .5em)';
          }
          if ($(window).height() - target.children().last().outerHeight() - target.position().top > event.pageY - $(document).scrollTop()) {
            con_sub_y = '-7px';
          } else {
            con_sub_y = $(window).height() - $("#contextmenu").position().top - target.position().top - target.children().last().outerHeight() + 'px';
          }
          target.children().last().css({
            'left': con_sub_x,
            'top': con_sub_y
          });
        });
      }

      set_location();
      print();
    }
  })
  $(document).on("click", function() {
    if ($('#contextmenu:hover').length > 0) {
      if ($('.context_able:hover').length > 0) {
        //      $('#output_for_contextmenu').html('1');
        $("#contextmenu").removeClass("on");
      } else {
        //      $('#output_for_contextmenu').html('2');
      }
    } else {
      //    $('#output_for_contextmenu').html('3');
      $("#contextmenu").removeClass("on");
    }
  });
}
