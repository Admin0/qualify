// console.log("loaded main__initialize_locked.js");

$("body").keyup(function(event) {
  if ($("[locked=true]").length != 0 && $("#setting").hasClass("on")) {
    if (event.which == 81) { // q
      // console.log(event);
      $("[locked=true]").each(function() {
        $(this).attr("onclick", "load('" + $(this).attr("name") + "','" + $(this).attr("round") + "')");
        // console.log(this);
      });
      $("[locked=true] i").text("lock_open");
      $("[locked=true]").removeAttr("locked");

      toast("관리자 모드가 활성화되었습니다.");
    }
  }
})
