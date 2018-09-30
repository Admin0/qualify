// $(function() {
//   $("#bt").click(function() {
//     $.ajax({
//       type: 'post',
//       url: 'sop/TDS-10.html',
//       dataType: 'html',
//       success: function(data) {
//         $("#TDS-10").html(data);
//       }
//     });
//   });
// });

function ajax_tooltip(id) {
  $("[title]").attr({
    'data-title': function() {
      return this.title;
    },
    'title': null
  });
  $("[data-title]").each(function() {
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
  // console.log("loaded#1");
}

function ajax_coloring(id) {
  // console.log("COLOR CODE: " + color.material_500[color.i]);
  $("#작업표준-" + id + " a").css({
    "color": color.material_500[color.i],
    "fill": color.material_500[color.i]
  });
  $("#작업표준-" + id + " h4, #작업표준-" + id + " h5, #작업표준-" + id + " button").css({
    "background": color.material_500[color.i]
  });
  $("#작업표준-" + id + " input:not([type='checkbox'])").css({
    "border-color": color.material_700[color.i]
  });
  $("#작업표준-" + id + " textarea").css({
    "border-color": color.material_700[color.i]
  });
}

function ajax_fileReady(id) {
  // $("#작업표준-" + id + " a:not([src])").each(function() {
  $("#작업표준-" + id + " a[file]").each(function() {
    $(this).attr({
      "href": "sop/" + $(this).attr("file")
    });
  });
  $("#작업표준-" + id + " object[type='application/pdf']").each(function() {
    $(this).attr({
      "data": "sop/" + $(this).attr("data")
    });
  });
}

function ajax_imgReady(id) {

  $("#작업표준-" + id + " img").each(function() {
    $(this).attr({
      "src": "sop/" + $(this).attr("src")
    });
  });

  function ajax_showImg(src) {
    // $("body").append("<div id='img_wrap'><img class='shadow' src='" + src + "'></img></div>");
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

  $("#작업표준-" + id + " a[src]").each(function() {
    var src = "sop/" + $(this).attr("src");
    $(this).on("click", function() {
      ajax_showImg(src)
    });
  });

  $("#작업표준-" + id + " img").on("click", function() { //이미지를 클릭하면 크게 보이는 고얌
    ajax_showImg($(this).attr("src"));
  });

  var obj, flex, i, j;
  $(".img img").wrap("<div></div>"); //.img로 묶인 이미지를 높이에 맞게 정렬
  $(".img").each(function() {
    obj = new Array();
    i = $(".img").index(this);
    $(this).children().each(function() {
      obj.push([$(this).children("img").width(), $(this).children("img").height()]);
      // console.log(i+"번 값 저장: " + $(this).children("img").width() + ", " + $(this).children("img").height());
    });
    $(this).children().each(function() {
      j = $(".img:nth(" + i + ") > div").index(this);
      flex = 100 * obj[j][0] * obj[0][1] / obj[j][1];
      // console.log(i+"번 .img의 "+j+"번째 img 정렬: " + flex);
      $(this).css({
        "flex": flex + "%"
      });
    });
  });
}

function ajax_scroll(id) {
  $("#작업표준-" + id + " [href^='#']").click(function(event) {
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

      // $("section > .contents, section > link").remove();
      // $("section").removeClass("on");

      if (target[0].tagName == "TR") {
        target_bg = target.children("td").css("background-color");
      } else {
        target_bg = target.css("background-color");
      }

      // $("section > .contents, section > link").remove();
      // $("section").removeClass("on");
      if (isNotNav) {
        target_position = target.offset().top - event.pageY + pageYOffset + target.height() / 2;
      } else if (target.css("display") != "none") {
        // console.log(pageYOffset + ", " + target.offset().top);
        if (target[0].tagName == "H2" || $("section.on").length == 0 || pageYOffset > target.offset().top) {
          target_position = target.offset().top - 114;
        } else {
          target_position = target.offset().top - 114 - $("section.on").height();
        }
      } else {
        toast("항목이 없습니다.");
      }

      $('html, body').animate({
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

function ajax_filter(id) {
  function ajax_filter_on() {
    // $("section:not(.important), h3:not(.important)").addClass("hide");
    $(".contents > *:not(.important)").addClass("hide");
  }
  if (window.localStorage['filter'] == "true") {
    ajax_filter_on();
  }
}

function load(id, content) {
  var full_id = id + "_" + content;
  $.ajax({
    type: 'get',
    url: id + "/" + content + ".html",
    dataType: 'html',
    success: function(data) {

      $("#main_item").html("");

      $("<div/>", {
        "id": "card__" + full_id,
        "class": "card",
        html: data
      }).appendTo('#main_item');

      $('#' + full_id + ', #' + full_id + " .contents").addClass("on");
      if ($('#' + full_id + "+a+.loading").length == 0) {
        $('#' + full_id + '+a').after("<div class='loading'><i class='material-icons spin'>autorenew</i>LOADING...</div>");
      }
      MathJax.Hub.Typeset();
    }
  });
}
