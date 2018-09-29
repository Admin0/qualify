color = {
  "length": 19,
  "material_50": [
    "#FFEBEE", "#FCE4EC", "#F3E5F5", "#EDE7F6", "#E8EAF6",
    "#E3F2FD", "#E1F5FE", "#E0F7FA", "#E0F2F1", "#E8F5E9",
    "#F1F8E9", "#F9FBE7", "#FFFDE7", "#FFF8E1", "#FFF3E0",
    "#FBE9E7", "#EFEBE9", "#FAFAFA", "#EFEBE9"
  ],
  "material_100": [
    "#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9",
    "#BBDEFB", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9",
    "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFECB3", "#FFE0B2",
    "#FFCCBC", "#D7CCC8", "#F5F5F5", "#CFD8DC"
  ],
  "material_300": [
    "#E57373", "#F06292", "#BA68C8", "#9575CD", "#7986CB",
    "#64B5F6", "#4FC3F7", "#4DD0E1", "#4DB6AC", "#81C784",
    "#AED581", "#DCE775", "#FFF176", "#FFD54F", "#FFB74D",
    "#FF8A65", "#A1887F", "#E0E0E0", "#90A4AE"
  ],
  "material_500": [
    "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B"
  ],
  "material_600": [
    "#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB",
    "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047",
    "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00",
    "#F4511E", "#6D4C41", "#757575", "#546E7A"
  ],
  "material_700": [
    "#D32F2F", "#C2185B", "#7B1FA2", "#512DA8", "#303F9F",
    "#1976D2", "#0288D1", "#0097A7", "#00796B", "#388E3C",
    "#689F38", "#AFB42B", "#FBC02D", "#FFA000", "#F57C00",
    "#E64A19", "#5D4037", "#616161", "#455A64"
  ],
  "material_800": [
    "#C62828", "#AD1457", "#6A1B9A", "#4527A0", "#283593",
    "#1565C0", "#0277BD", "#00838F", "#00695C", "#2E7D32",
    "#558B2F", "#9E9D24", "#F9A825", "#FF8F00", "#EF6C00",
    "#D84315", "#4E342E", "#424242", "#37474F"
  ],
  "material_900": [
    "#B71C1C", "#880E4F", "#4A148C", "#311B92", "#1A237E",
    "#0D47A1", "#01579B", "#006064", "#004D40", "#1B5E20",
    "#33691E", "#827717", "#F57F17", "#FF6F00", "#E65100",
    "#BF360C", "#3E2723", "#212121", "#263238"
  ],
  "material_a100": [
    "#FF8A80", "#FF80AB", "#EA80FC", "#B388FF", "#8C9EFF",
    "#82B1FF", "#80D8FF", "#84FFFF", "#A7FFEB", "#B9F6CA",
    "#CCFF90", "#F4FF81", "#FFFF8D", "#FFE57F", "#FFD180",
    "#FF9E80", "#D7CCC8", "#F5F5F5", "#CFD8DC"
  ],
  "name": [
    "Red", "Pink", "Purple", "Deep Purple", "Indigo",
    "Blue", "Light Blue", "Cyan", "Teal", "Green",
    "Light Green", "Lime", "Yellow", "Amber", "Orange",
    "Deep Orange", "Brown", "Grey", "Blue Grey"
  ]
}

function dice(n, s, b) {
  var out = 0;
  for (i = 0; i < n; i++) {
    out += Math.ceil(Math.random() * s);
  }
  return out + b;
}

if (window.localStorage["theme_color"] == "true") {
  color.i = window.localStorage["theme_color__i"];
} else {
  color.i = dice(1, color.length, -1);
}

if (color.i == 12 /*yellow*/ ) {
  color.material_500 = color.material_600;
}
if (color.i == 17 /* grey */ ) {
  color.i = 5;
}
console.log("COLOR CODE: " + color.name[color.i]);

function coloring() {
  $("header").css({
    "background": color.material_700[color.i]
  });
  $("#sub_header .filter_bt, #column_bt").hover(function() {
    $(this).css({
      "background": color.material_700[color.i]
    });
  }, function() {
    $(this).css({
      "background": color.material_500[color.i]
    });
  })
  $("#sub_header > #line1").css({
    "background": color.material_500[color.i]
  });
  $("dl .material-icons, a:not(nav a), #to_github, #to_github > i").css({
    "color": color.material_500[color.i],
    "fill": color.material_500[color.i]
  })

  // $("link[rel~='icon']").attr("href", "img/[favicon]/favicon" + color.i + ".ico");
  $("meta[name='theme-color']").attr("content", color.material_700[color.i]);
}

function nav_create() {
  // $("body").prepend("<nav><div id='nav_header'></div><div id='nav'></div><div id='nav_footer'><i class='material-icons'>chevron_left</i></div></nav>");
  // $("nav").prepend("<section id='in-page'></section>");
  $("h2, h3").each(function() {
    $(this).clone()
      .html("<a href='#" + $(this).attr("id") + "'>" + $(this).html() + "</a>")
      .attr("id", null)
      .appendTo($("#nav"));
    // .appendTo($("#in-page"));
  })

  var nav_w = 256;
  var nav_w_folded = 68;

  function nav_expand() {
    $("nav, #sub_header, #nav_footer > i").removeClass("fold");
    setTimeout(function() {
      $("body").removeClass("fold");
    }, 300);
    window.localStorage['nav_fold'] = "false";
  }

  function nav_fold() {
    $("nav, #sub_header, #nav_footer > i").addClass("fold");
    setTimeout(function() {
      $("body").addClass("fold");
    }, 300);
    window.localStorage['nav_fold'] = "true";
  }

  if (window.localStorage['nav_fold'] == "true") {
    nav_fold();
  } else {
    nav_expand();
  }

  $("#nav_footer").on("click", function() {
    if (window.localStorage['nav_fold'] != "true") {
      nav_fold();
    } else {
      nav_expand();
    }
    setTimeout(function() {
      // columns();
    }, 300);
    // columns();
  });

  $('body').append('<div id="tooltip_nav"><div id="tooltip_nav_text"></div><div id="tooltip_nav_before"></div></div>');
  $("#tooltip_nav").css({
    "background": color.material_700[color.i]
  });
  $("#tooltip_nav").append($("#tooltip_before"));
  $("#nav h3").hover(function() {
      if ($("nav").attr("class") == "fold") {
        if (document.height === null) {
          pageYOffset = document.documentElement.scrollTop;
        }
        $('#tooltip_nav_text').html($(this).children("a").children("span:nth(0)").text());
        $('#tooltip_nav').css({
          'visibility': 'visible',
          'opacity': 1,
          'top': $(this).offset().top - pageYOffset + 'px',
          'left': 68 + 16 + 'px'
        });
        $("#tooltip_nav_before").css({
          "border-color": "transparent " + color.material_700[color.i] + " transparent transparent",
          "border-width": "1ex 1ex 1ex 0",
          "left": "-.9ex",
          "bottom": "calc(50% - .5em)"
        });
      }
    },
    function() {
      $('#tooltip_nav').css({
        'visibility': 'hidden',
        'opacity': "0"
      });
    });
  $("#nav #setting_bt").hover(function() {
      if ($("nav").attr("class") == "fold") {
        if (document.height === null) {
          pageYOffset = document.documentElement.scrollTop;
        }
        $('#tooltip_nav_text').html("설정");
        $('#tooltip_nav').css({
          'visibility': 'visible',
          'opacity': 1,
          'top': $(this).offset().top - pageYOffset + 'px',
          'left': 68 + 16 + 'px'
        });
        $("#tooltip_nav_before").css({
          "border-color": "transparent " + color.material_700[color.i] + " transparent transparent",
          "border-width": "1ex 1ex 1ex 0",
          "left": "-.9ex",
          "bottom": "calc(50% - .5em)"
        });
      }
    },
    function() {
      $('#tooltip_nav').css({
        'visibility': 'hidden',
        'opacity': "0"
      });
    });
  $("#nav #to_github").hover(function() {
      if ($("nav").attr("class") == "fold") {
        if (document.height === null) {
          pageYOffset = document.documentElement.scrollTop;
        }
        $('#tooltip_nav_text').html("메일 보내기");
        $('#tooltip_nav').css({
          'visibility': 'visible',
          'opacity': 1,
          'top': $(this).offset().top - pageYOffset + 'px',
          'left': 68 + 16 + 'px'
        });
        $("#tooltip_nav_before").css({
          "border-color": "transparent " + color.material_700[color.i] + " transparent transparent",
          "border-width": "1ex 1ex 1ex 0",
          "left": "-.9ex",
          "bottom": "calc(50% - .5em)"
        });
      }
    },
    function() {
      $('#tooltip_nav').css({
        'visibility': 'hidden',
        'opacity': "0"
      });
    });

  //for mobile
  $("nav a").on("click", function() {
    $("nav, #nav_bg").removeClass("on");
  });
}

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
    bg_change(target, color.material_a100[color.i], ".25s");

    if (isNotNav) {
      toast("원래 자리로 가려면 더블 클릭.", "refresh", 2500);
      document.ondblclick = function(event) {
        if (reversible) {
          scroll(target_reverse, event);
          bg_change(target_reverse, color.material_a100[color.i], ".25s");
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
        "background-color": color.material_a100[color.i],
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
    "background": color.material_700[color.i]
  });
  $("#tooltip").append($("#tooltip_before"));
  $("#tooltip_before").css({
    "border-color": color.material_700[color.i] + " transparent transparent transparent"
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
      $("nav h3:nth(" + i + ") a").css({
        "color": color.material_500[color.i]
      });
      if ($('section.on').length >= 1 && target.parent().hasClass("on")) {
        document.title = '#' + target.children("span").text();
        $('#title').html('#' + target.children("span").text());
      } else {
        document.title = "qualify";
        $('#title').html('<span class="hide_mobile"></span>스크롤하면 어지러웡');
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
  coloring();
});

$(window).on('load', function() {
  setTimeout(function() {
    // columns();
    scroll_at_open();
  }, 0);
  imgReady();
});
