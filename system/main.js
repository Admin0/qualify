function toast(msg, icon, time) {
  if (icon == null) {
    icon = "priority_high";
  }
  if (time == null) {
    time = 1500;
  }

  $('#toast').remove();
  $('body').append('<div id="toast" class="shadow"><i class="material-icons">' + icon + '</i>' + msg + '</div>');
  $('#toast').css("left", "calc(1em + " + $("nav").width() + "px)").addClass("on").removeClass("off");

  setTimeout(function() {
    $("#toast").addClass("off").removeClass("on", function() {
      $(this).delay(300).remove();
    });
  }, time + 300);
}

function scroll_smooth() {
  $("[href^='#']").click(function(event) {
    event.preventDefault();

    if (document.height === null) {
      pageYOffset = document.documentElement.scrollTop;
    }
    var isNotNav = true;
    if ($(this).parent().prop("tagName") == "H3" || $(this).parent().prop("tagName") == "H2") {
      isNotNav = false;
    }

    var target_pre = this.hash;
    var target = (target_pre.substring(1, 2) == "%" ? $(decodeURIComponent(target_pre)) : $(target_pre));
    var target_reverse; // = $(this) //old code
    if ($(this).parent("p").parent(".back").prev(".front").length != 0) {
      target_reverse = $(this).parent("p").parent(".back").prev(".front");
    } else {
      target_reverse = $(this);
    }
    var target_bg;
    var reversible = true;

    function bg_change(t, color, time) {
      if (t[0].tagName == "TR") {
        t.children("td").css({
          "background-color": color,
          "transition": time
        });
      } else {
        t.css({
          "background-color": color,
          "transition": time
        });
      }
    }

    function scroll(target, event) {

      $("section > .contents, section > link").remove();
      $("section").removeClass("on");

      if (target[0].tagName == "TR") {
        target_bg = target.children("td").css("background-color");
      } else {
        target_bg = target.css("background-color");
      }

      $("section > .contents, section > link").remove();
      $("section").removeClass("on");
      if (isNotNav) {
        target_position = target.offset().top - event.pageY + pageYOffset + target.height() / 2;
      } else if (target.css("display") != "none") {
        // console.log(pageYOffset + ", " + target.offset().top);
        if (pageYOffset > target.offset().top - 114) {
          target_position = target.offset().top - 114;
        } else {
          target_position = target.offset().top - 179;
        }
      } else {
        toast("항목이 없습니다.");
      }

      $('html, body').delay(350).animate({
        scrollTop: target_position
      }, 500, function() {
        bg_change(target, target_bg, ".75s");
      });
    }

    scroll(target, event);
    bg_change(target, "#ffa", ".25s");

    if (isNotNav) {
      toast("원래 자리로 가려면 더블 클릭.", "refresh", 2500);
      document.ondblclick = function(event) {
        if (reversible) {
          scroll(target_reverse, event);
          bg_change(target_reverse, "#ffa", ".25s");
          reversible = false;
        }
      };
    }
    // alert(target_reverse.offset().top);
  });
}

function scroll_at_open() {

  if (window.location.href.substring(window.location.href.length - 8, window.location.href.length) != window.location.pathname.substring(window.location.pathname.length - 8, window.location.pathname.length)) {
    setTimeout(function() {
      var target_pre = window.location.href.substring(window.location.href.indexOf("#") + 1);
      var target = (target_pre.substring(0, 1) == "%" ? $(decodeURIComponent("#" + target_pre)) : $("#" + target_pre));
      var target_by_class = (target_pre.substring(0, 1) == "%" ? $(decodeURIComponent("." +target_pre)) : $("." + target_pre)); //use for <nav>
      // console.log(target.prop("tagName"));
      // $('html, body').animate({
      //   scrollTop: target.offset().top - $('header').height() - $('#sub_header').height() - 12 //116
      // }, 500);
      target.addClass("targeted");
      target_by_class.addClass("targeted");
      load($(target).attr("name"), $(target).attr("round"));
      // load($(target).attr("class"));
    }, 0)
  }
}

// $(document).scroll(function() {
//     if (document.height === null) {
//         pageYOffset = document.documentElement.scrollTop;
//     }
//     if($( document ).width()>=600){
//         if (pageYOffset >= 89.88) {
//             $("nav").css({"position":"fixed",   "top":"1em", "max-height": "calc(100% -  4em)"});
//         } else{
//             $("nav").css({"position":"absolute","top":"7em", "max-height": "calc(100% - 10em)"});
//         }
//     }
// });

function title_tooltip() {
  $('[title]').attr({
    'data-title': function() {
      return this.title;
    },
    'title': null
  });
  $('body').append('<div id="tooltip"><div id="tooltip_text"></div><div id="tooltip_before"></div></div>');
  $("#tooltip").css({
    "background": "#000"
  });
  $("#tooltip").append($("#tooltip_before"));
  $("#tooltip_before").css({
    "border-color": "#000 transparent transparent transparent"
  });
  $('[data-title]').each(function() {
    $(this).hover(
      function() {
        // console.log($(this).attr('data-title'));
        if (document.height === null) {
          pageYOffset = document.documentElement.scrollTop;
        }
        $('#tooltip_text').html($(this).attr('data-title'));
        var left = $(this).offset().left + ($(this).outerWidth() - $('#tooltip').outerWidth()) / 2;
        if (left <= 0) {
          left = 0;
        }
        $('#tooltip').css({
          'visibility': 'visible',
          'opacity': 1,
          'top': $(this).offset().top - $('#tooltip').outerHeight() /*+ pageYOffset*/ - 16 + 'px',
          'left': left + 'px'
        });
      },
      function() {
        $('#tooltip').css({
          'visibility': 'hidden',
          'opacity': 0
        });
      }
    );
  });
}

$(window).scroll(function() {
  for (i = $("h3:not(nav h3)").length - 1; i >= 0; i--) {
    var target = $("h3:not(nav h3):nth(" + i + ")");
    // console.log(target.offset().top);
    if (target.offset().top < pageYOffset + 256 && target.css("display") != "none") {
      $("nav h3 a").css({
        "color": "inherit"
      });
      if ($('section.on').length >= 1 && target.parent().hasClass("on")) {
        // document.title = '#' + target.children("span").text();
        // $('#title').html('#' + target.children("span").text());
      } else {
        // document.title = "qualify";
        // $('#title').html('<span class="hide_mobile"></span>스크롤하면 어지러웡');
      }
      // console.log(target.children("span").text());
      // console.log('<span class="hide_mobile">초보자 가이드 > </span>' + target.children("span").text()));
      break;
    }
  }
  // $("h2:not(nav h2), h3:not(nav h3)").each(function(){
  //     if($(this).offset().top < pageYOffset){
  //         console.log($(this).text());
  //     }
  // });
  // console.log("sex");
});

function clear() {
  $('.contents').html("");
}

$(window).resize(function() {
  // columns();
});

$(document).ready(function() {
  nav_create();
  scroll_smooth();
  // columns();
  title_tooltip();
});

$(window).on('load', function() {
  setTimeout(function() {
    // columns();
    scroll_at_open();
  }, 0);
  imgReady();
});
