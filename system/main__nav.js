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
    // setTimeout(function() {
      $("body").removeClass("fold");
    // }, 300);
    window.localStorage['nav_fold'] = "false";
  }

  function nav_fold() {
    $("nav, #sub_header, #nav_footer > i").addClass("fold");
    // setTimeout(function() {
      $("body").addClass("fold");
    // }, 300);
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
