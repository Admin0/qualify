function setting() {

  var item = [
    "general__dark", "general__dark_auto",
    "answer__serif", "answer__quiz",
  ];

  function check_setting() {

    $("#setting .setting_item input").prev("i").remove();

    for (i = 0; i < item.length; i++) {
      if (localStorage[item[i]] == "true") {
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
        if (localStorage[arguments[i]] == "true") {
          $('body').addClass(arguments[i]);
        } else {
          $('body').removeClass(arguments[i]);
        }
      }
    }
    // 개별 적용
    css_option("general__dark", "general__dark_auto", "answer__serif", "answer__quiz");

    if (localStorage.general__dark_auto == "true") { //다크 모드 자동 적용
      $("#general__dark").addClass("disabled");
    } else {
      $("#general__dark").removeClass("disabled");
    }

    if (localStorage.general__dark == "true") {
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
      if (localStorage[item[i]] == "true") {
        localStorage[item[i]] = "false"
      } else {
        localStorage[item[i]] = "true"
      }
      toast("설정이 저장되었습니다.", "save");

      if ($(this)[0] == $("#theme_color")[0] && localStorage.theme_color == "true") {
        localStorage.theme_color__i = color.i;
      }

      // 개별 적용 (클릭 즉시 적용)
      if (localStorage.general__dark_auto == "true") { //다크 모드 자동 적용
        var hour = new Date().getHours();
        if (hour >= 18 || hour < 6) {
          localStorage.general__dark = "true";
        } else {
          localStorage.general__dark = "false";
        }
      }

      // filter();
      // columns();
      check_setting();
    }
  });

}

$(document).ready(function() {
  // browser_alert();
  // contextmenu();

  if (localStorage.general__dark_auto == undefined || localStorage.general__dark_auto == "true") {
    localStorage.general__dark_auto = "true";
    var hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      localStorage.general__dark = "true";
    } else {
      localStorage.general__dark = "false";
    }
  }

  setting();

});
