function filter() {

  $("section.important > h3").addClass("important")

  function filter_off() {
    $("section.hide, h3.hide").removeClass("hide");
    $(".contents > *.hide").removeClass("hide");
    $("body").removeClass("quick");
  }

  function filter_on() {
    $("section:not(.important), h3:not(.important)").addClass("hide");
    $(".contents > *:not(.important)").addClass("hide");
    $("body").addClass("quick");
  }

  if (window.localStorage['filter'] == "false") {
    $("#sub_header .filter_bt").removeClass("on");
    $("#filter_off").addClass("on");
    filter_off();
  } else if (window.localStorage['filter'] == "true") {
    $("#sub_header .filter_bt").removeClass("on");
    $("#filter_on").addClass("on");
    filter_on();
  } else {
    window.localStorage['filter'] = "false";
    $("#sub_header .filter_bt").removeClass("on");
    $("#filter_off").addClass("on");
    filter_off();
  }

  $("#sub_header .filter_bt").on("click", function() {
    $("#sub_header .filter_bt").removeClass("on");
    $(this).addClass("on");
    if ($(this).attr("id") == "filter_off") { //show notyet
      window.localStorage['filter'] = "false";
      filter_off();
      toast("전체 보기 모드가 적용되었습니다.", "directions_walk");
    } else if ($(this).attr("id") == "filter_on") { //show notyet
      window.localStorage['filter'] = "true";
      filter_on();
      toast("퀵 매뉴얼 모드가 적용되었습니다.", "directions_run");
    }
    // columns();
  });

}
