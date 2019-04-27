$(document).keyup(function(event) {
  // console.log("key is up");
  event.preventDefault();
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
          toast("잠긴 문서가 해제되었습니다.", get_icon("lock_open"));
        }
        break;
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
        console_event("s");
        break;
      case 82: // r
        // console_event("r");
        break;
      case 79: // o
        console_event("o");
        break;
      case 81: // q
      case 27: // Esc
      case 8: // BS(←)
        console_event("q");
        break;
      case 70: // f
        console_event("f");
        break;
      case 188: // ,
      case 37: // ←
      case 38: // ↑
        console_event(",");
        break;
      case 190: // .
      case 39: // →
      case 40: // ↓
        console_event(".");
        break;
      case 68: // d
        console_event("d");
        break;
      case 65: // a
        console_event("a");
        break;
      case 78: // n
        console_event("n");
        break;
      case 49: // 1
        console_event("1");
        break;
      case 220: // \
        console_event("helper");
        break;
      default:

    }
  }
});

function console_event(code) {
  var t = $("section.targeted");
  var url;
  switch (code) {
    case "s":
      $('#setting, #setting_bg').toggleClass('on');
      $('#setting').css({
        "top": $("#setting_bt").offset().top - pageYOffset,
        "left": $("#nav").width() - 16
      });
      check_setting();
      $('#context_menu').removeClass('on');
      break;
    case "q":
      $('#main_item .contents.on').remove();
      $('#title').text('#qualify');
      $('nav, #nav_bg').removeClass('on');
      history.pushState(null, null, "/qualify/");

      $('nav').removeClass('shadow-right');
      $('header').removeClass('shadow-bottom');
      break;
    case "f":
      if (!$("#item_list h2").hasClass("slided")) {
        $("#item_list h2").each(function() {
          slide($(this).attr("id"), true);
          toast("목록을 모두 접었습니다.", "unfold_less");
        });
      } else {
        $("#item_list h2").each(function() {
          slide($(this).attr("id"), false);
          toast("목록을 모두 펼쳤습니다.", "unfold_more");
        });
      }
      break;
    case "o":
      url = "/qualify/" + t.attr("name") + "/" + t.attr("round") + ".html"
      console.log(t.attr("name") + "-" + t.attr("round"));
      window.open(url, "_blank");
      break;
    case "r":
      location.reload(true);
      break;
    case ",":
      if (t.prev('section.item').length != 0 && t.prev('section.item').attr('locked') != "true") {
        load(t.attr('name'), t.prev('section.item').attr('round'));
        url = '/qualify/#' + t.attr('name') + "-" + t.prev('section.item').attr('round');
        history.pushState(null, null, url);
      } else {
        toast("이동할 수 있는 이전 항목이 없습니다.");
      }
      break;
    case ".":
      if (t.next('section.item').length != 0 && t.next('section.item').attr('locked') != "true") {
        load(t.attr('name'), t.next('section.item').attr('round'));
        url = '/qualify/#' + t.attr('name') + "-" + t.next('section.item').attr('round');
        history.pushState(null, null, url);
      } else {
        toast("이동할 수 있는 다음 항목이 없습니다.");
      }
      break;
    case "d":
      if (window.localStorage["general__dark"] != "true") {
        $("meta[name='theme-color']").attr("content", "rgba(50, 54, 57, 1)");
        $('body').addClass("general__dark");
        window.localStorage["general__dark"] = "true"
        toast("다크 모드가 적용되었습니다.");
      } else {
        $("meta[name='theme-color']").attr("content", "#ffffff");
        $('body').removeClass("general__dark");
        window.localStorage["general__dark"] = "false"
        toast("다크 모드가 해제되었습니다.");
      }
      break;
    case "a":
      if (window.localStorage["answer__quiz"] != "true") {
        $('body').addClass("answer__quiz");
        window.localStorage["answer__quiz"] = "true"
        toast("퀴즈 모드가 적용되었습니다.");
      } else {
        $('body').removeClass("answer__quiz");
        window.localStorage["answer__quiz"] = "false"
        toast("퀴즈 모드가 해제되었습니다.");
      }
      break;
    case "n":
      if (window.localStorage['nav_fold'] == "true" && !is_mobile) {
        nav_expand();
      } else {
        nav_fold();
      }
      break;
    case "1":
      load('notice');
      break;
    case "helper":
      load('helper');
      break;
    default:

  }
}
// console.log("loaded main__initialize_console.js");
