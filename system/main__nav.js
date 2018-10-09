function nav_create() {

  var nav_w = 300;
  var nav_w_folded = 68;

  function nav_expand() {
    $("nav, #sub_header, #nav_footer > i").removeClass("fold");
    $("body").removeClass("fold");
    window.localStorage['nav_fold'] = "false";
  }

  function nav_fold() {
    $("nav, #sub_header, #nav_footer > i").addClass("fold");
    $("body").addClass("fold");
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
  });

  $('body').append('<div id="tooltip_nav"><div id="tooltip_nav_text"></div><div id="tooltip_nav_before"></div></div>');

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
          "border-color": "transparent #212121 transparent transparent",
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
          "border-color": "transparent #212121 transparent transparent",
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
          "border-color": "transparent #212121 transparent transparent",
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
