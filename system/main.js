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
      var target_pre = window.location.href.substring(window.location.href.indexOf("#"));
      var target = (target_pre.substring(1, 2) == "%" ? $(decodeURIComponent(target_pre)) : $(target_pre));
      // console.log(target.prop("tagName"));
      $('html, body').animate({
        scrollTop: target.offset().top - $('header').height() - $('#sub_header').height() - 12 //116
      }, 500);
      target.css({
        "background-color": '#aaf',
        "transition": ".75s"
      });
      load($(target).attr("id"));
    }, 1000)
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

function showMovie(src) {
  var url = src.replace("watch?v=", "embed/");
  $("body").append("<div id='movie_wrap'><iframe class='shadow' width='560' height='315' src='" + url + "?rel=0&amp;showinfo=0'  frameborder='0' allowfullscreen></iframe></div>")
  $("#movie_wrap").show(); //.fadeIn(500);
  $("#movie_wrap").on("click", function() {
    $(this).fadeOut(500, function() {
      $(this).remove();
    })
  })
  $("#movie_wrap > iframe").css({
    "height": $("#movie_wrap > iframe").width() * 315 / 560 + "px",
    "top": "calc(50% - " + $("#movie_wrap > iframe").width() * 315 / 560 / 2 + "px)"
  });
}

function showImg(src) {
  // $("body").append("<div id='img_wrap'><img class='shadow' src='" + src + "'></img></div>")
  $("#img_wrap img").attr('src', src);
  $("#img_wrap").css({
    "display": "flex",
    "opacity": "1"
  });
  // fadeIn(500);
  $("#img_wrap").on("click", function() {
    $(this).css("display", 'none');
    // $(this).fadeOut(500, function() {
    //   $(this).remove();
    // })
  })

  $("#img_wrap > img").load(function() {
    if ($("#img_wrap > img").height() >= $(window).height() * .9) {
      $("#img_wrap > img").css({
        "width": "initial",
        "height": "90%",
        "top": "5%"
      });
    } else {
      $("#img_wrap > img").css("top", function() {
        return "calc(50% - " + $(this).height() / 2 + "px)"
      });
    }
  });
}

function imgReady() {

  $("a[src]").each(function() {
    var src = $(this).attr("src");
    $(this).on("click", function() {
      showImg(src)
    });
  });

  $("img").on("click", function() { //이미지를 클릭하면 크게 보이는 고얌
    showImg($(this).attr("src"));
  });

  // var obj, flex, i, j;
  // $(".img img").wrap("<div></div>"); //.img로 묶인 이미지를 높이에 맞게 정렬
  // $(".img").each(function() {
  //   obj = new Array();
  //   i = $(".img").index(this);
  //   $(this).children().each(function() {
  //     obj.push([$(this).children("img").width(), $(this).children("img").height()]);
  //     // console.log(i+"번 값 저장: " + $(this).children("img").width() + ", " + $(this).children("img").height());
  //   });
  //   $(this).children().each(function() {
  //     j = $(".img:nth(" + i + ") > div").index(this);
  //     flex = 100 * obj[j][0] * obj[0][1] / obj[j][1];
  //     // console.log(i+"번 .img의 "+j+"번째 img 정렬: " + flex);
  //     $(this).css({
  //       "flex": flex + "%"
  //     });
  //   });
  // });
}


var column_only_mode = window.localStorage['column_only_mode'];

function headline() {

  $("section.sup > h3").each(function() {
    if ($(this).next().height() == 0) {
      $(this).css("display", "none");
    } else {
      $(this).css("display", "block");
    };
  });
  $("h2:not(nav h2)").each(function() {
    if ($(this).next().height() == 0) {
      $(this).css("display", "none");
    } else {
      $(this).css("display", "block");
    };
  });
}

function checkbox() {
  $("input[checked]").before("<i class='material-icons'>check_box</i>");
  $("input:not([checked]):not([failed])").before("<i class='material-icons'>check_box_outline_blank</i>");
  $("input[failed]").before("<i class='material-icons'>priority_high</i>");

  // $("a[href]:not(nav a):not([href$='.zip']):not([href^='#'])").prepend("<i class='material-icons'>open_in_new</i>");
  // $("a[href$='.zip']").prepend("<i class='material-icons'>save</i>");
  // $("a[href^='#']:not(nav a)").prepend("<i class='material-icons'>find_in_page</i>");
  // $("a[onclick]").prepend("<i class='material-icons'>theaters</i>");
  // $("a[src]").prepend("<i class='material-icons'>photo</i>");
}

function card_wrap() {
  $(".card").each(function() {
    $(this).after("<div class='card_wrap'></div>")
    $(this).appendTo($(this).next());
  });
  $("dl").each(function() {
    if ($(this).parent().attr("class") == "sub") {
      $(this).after("<div class='card_wrap'></div>")
      $(this).appendTo($(this).next());
    }
  });
  $(".back li").each(function() {
    $(this).replaceWith('<li><span>' + $(this).html() + '</span></li>');
  });
}

function percentage() {

  // 세포분열
  var list_total = ($("input").length - $("input[failed]").length);
  if (list_total >= 1000) {
    $("#세포분열_1000").attr("checked", true);
    $("#세포분열_1000 + dt + dd > .date").text(list_total + "개 생성");
  }
  if (list_total >= 500) {
    $("#세포분열_500").attr("checked", true);
    $("#세포분열_500 + dt + dd > .date").text(list_total + "개 생성");
  }
  if (list_total >= 100) {
    $("#세포분열_100").attr("checked", true);
    $("#세포분열_100 + dt + dd > .date").text(list_total + "개 생성");
  }

  //재귀함수
  var percent_total;

  function checke_total() {
    percent_total = ($("input[checked]").length / ($("input").length - $("input[failed]").length) * 100).toFixed(0);
    if (percent_total >= 75) {
      $("#재귀함수_75").attr("checked", true);
    }
    if (percent_total >= 50) {
      $("#재귀함수_50").attr("checked", true);
    }
    if (percent_total >= 25) {
      $("#재귀함수_25").attr("checked", true);
    }

    if (percent_total != ($("input[checked]").length / ($("input").length - $("input[failed]").length) * 100).toFixed(0)) {
      checke_total();
    }
  }
  checke_total();

  if (percent_total >= 75) {
    $("#재귀함수_75 + dt + dd > .date").text("." + percent_total + " 완료");
  } else if (percent_total >= 50) {
    $("#재귀함수_50 + dt + dd > .date").text("." + percent_total + " 완료");
  } else if (percent_total >= 25) {
    $("#재귀함수_25 + dt + dd > .date").text("." + percent_total + " 완료");
  }

  $("h1").append("<class class='percentage'>" + percent_total + "% (" +
    $("input[checked]").length + "/" + ($("input").length - $("input[failed]").length) + ")</span>");

  $("h2:not(nav h2)").each(function() {
    var i = $("h2").index(this);
    $(this).append("<span class='percentage'>" + ($("h2:nth(" + i + ") + section.sup input[checked]").length / $("h2:nth(" + i + ") + section.sup input").length * 100).toFixed(0) + "%</span>");
  });

  $("h3:not(nav h3)").each(function() {
    var i = $("h3").index(this);
    $(this).append("<span class='percentage'>" + ($("h3:nth(" + i + ") + section.sub input[checked]").length / $("h3:nth(" + i + ") + section.sub input").length * 100).toFixed(0) + "%</span>");
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
  browser_alert();
  // percentage();
  card_wrap();
  filter();
  nav_create();
  scroll_smooth();
  checkbox();
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
