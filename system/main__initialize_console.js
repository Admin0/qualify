$("body").keyup(function(event) {
  // console.log("key is up");
  var shortcut_trriger = $("#setting").hasClass("on");
  if (shortcut_trriger) {
    switch (event.which) {
      case 83: // s
      case 27: // ESC
        $('#setting, #setting_bg').removeClass('on');
        break;
      case 81: // q
        if ($("[locked=true]").length != 0) {
          $("[locked=true]").each(function() {
            $(this).attr("onclick", "load('" + $(this).attr("name") + "','" + $(this).attr("round") + "')");
            // console.log(this);
          });
          $("[locked=true] i").text("lock_open");
          $("[locked=true]").removeAttr("locked");

          toast("잠긴 문서가 해제되었습니다.");
          break;
        }
      case 65: // a
        if ($(".ad").length != 0) {
          $(".ad").remove();
          toast("광고가 해제되었습니다.");
        }
        break;
      default:

    }
  } else {
    switch (event.which) {
      case 83: // s
        $('#setting, #setting_bg').toggleClass('on');
        $('#setting').css({
          "top": $("#setting_bt").offset().top - pageYOffset,
          "left": $("#nav").width() - 16
        });
        check_setting();
        $('#context_menu').removeClass('on');
        break;
      case 82: // r
        location.reload();
        break;
      case 79: // o
        var t = $("section.targeted");
        var url = "/qualify/" + t.attr("name") + "/" + t.attr("round") + ".html"
        console.log(t.attr("name") + "-" + t.attr("round"));
        window.open(url, "_blank");
        break;
      case 81: // q
        $('#main_item .contents.on').remove();
        $('#title').text('#qualify');
        $('nav, #nav_bg').removeClass('on');
        break;
      case 70: // f
        if (!$("#item_list h2").hasClass("slided")) {
          $("#item_list h2").each(function() {
            slide($(this).attr("id"), true);
            toast("목록을 모두 접었습니다.");
          });
        } else {
          $("#item_list h2").each(function() {
            slide($(this).attr("id"), false);
            toast("목록을 모두 펼쳤습니다.");
          });
        }
        break;
      default:

    }
  }
});

// console.log("loaded main__initialize_console.js");
