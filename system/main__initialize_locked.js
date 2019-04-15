// console.log("loaded main__initialize_locked.js");

$("body").keyup(function(event) {
  if ($("[locked]").length != 0 && $("#setting").hasClass("on")) {
    if (event.which == 81) { // q
      // console.log(event);
      $("[locked]").each(function() {
        $(this).attr("onclick", "load('" + $(this).attr("name") + "','" + $(this).attr("round") + "')");
        // console.log(this);
      });
      $("[locked] i").text("lock_open");
      $("[locked]").removeAttr("locked");

      toast("관리자 모드가 활성화되었습니다.");
    }
  }
})
