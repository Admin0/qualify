$(".share").on("click", function() {
  $("#share, #setting_bg").removeClass("on");
});

// kakao
Kakao.init('f27e2f52c6d1e181e147def81e2b3b28');

function kakao_share() {
  Kakao.Link.sendCustom({
    templateId: 12918
  });
}
