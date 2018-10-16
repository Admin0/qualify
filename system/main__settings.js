function setting() {

  var item = [
    "general__dark",
    "answer__serif", "answer__quiz",
    // "cccv", "cccv__style", "cccv__to_here",
    "dev__login"
  ];

  function check_setting() {

    $("#setting .setting_item input").prev("i").remove();

    for (i = 0; i < item.length; i++) {
      if (window.localStorage[item[i]] == "true") {
        $("#" + item[i] + " input").attr("checked", true);
      } else {
        $("#" + item[i] + " input").attr("checked", false);
      }
    };

    $("#setting input[checked]").before("<i class='material-icons'>check_box</i>");
    $("#setting input:not([checked]):not([failed])").before("<i class='material-icons'>check_box_outline_blank</i>");

    $("#setting input").next().next().next(".off").removeClass("hide");
    $("#setting input").next().next(".on").removeClass("hide");
    $("#setting input[checked]").next().next().next(".off").addClass("hide");
    $("#setting input:not([checked])").next().next(".on").addClass("hide");

    function css_option() {
      for (var i = 0; i < arguments.length; i++) {
        if (window.localStorage[arguments[i]] == "true") {
          $('body').addClass(arguments[i]);
        } else {
          $('body').removeClass(arguments[i]);
        }
      }
    }
    // 개별 적용
    css_option("general__dark", "answer__serif", "answer__quiz");

    if (window.localStorage["general__dark"] == "true") {
      $("meta[name='theme-color']").attr("content", "rgba(50, 54, 57, 1)");
    } else {
      $("meta[name='theme-color']").attr("content", "#ffffff");
    }

  }
  check_setting();

  $("#setting_bt").on("click", function() {
    // $(this).css("color",color.material_500[color.i]);
    $('#tooltip_nav').css({
      'visibility': 'hidden',
      'opacity': "0"
    });
    $("#setting, #setting_bg").toggleClass("on");
    $("#setting").css({
      "top": $("#setting_bt").offset().top - pageYOffset,
      "left": $("#nav").width() - 16
    });
    check_setting();
  });

  $("#setting > .setting_item").on("click", function() {
    // console.log($(this).hasClass("disabled"));
    if (!$(this).hasClass("disabled")) {
      var i = $("#setting > .setting_item").index(this);
      if (window.localStorage[item[i]] == "true") {
        window.localStorage[item[i]] = "false"
      } else {
        window.localStorage[item[i]] = "true"
      }
      toast("설정이 저장되었습니다.", "save");

      if ($(this)[0] == $("#theme_color")[0] && window.localStorage["theme_color"] == "true") {
        window.localStorage["theme_color__i"] = color.i;
      }

      filter();
      // columns();
      check_setting();
    }
  });

}

function contextmenu() {
  $("body").on("contextmenu", function(event) {
    event.preventDefault();
  });
  $("section").on("contextmenu", function(event) {
    // event.preventDefault();
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

function browser_alert() {
  var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
  var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
  var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
  if ((is_chrome) && (is_safari)) {
    is_safari = false;
  }
  if ((is_chrome) && (is_opera)) {
    is_chrome = false;
  }

  if (!is_chrome || is_firefox) $("#browser_alert").addClass("on");
}

$(document).ready(function() {
  // browser_alert();
  // contextmenu();
  setting();

});
