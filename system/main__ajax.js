function load(id, content) {
  var full_id = id + "_" + content;
  $.ajax({
    type: 'get',
    url: id + "/" + content + ".html",
    dataType: 'html',
    success: function(data) {

      $('#title').html(id + "-" + content);
      $("#main_item").html("");

      $("<div/>", {
        "id": "card__" + full_id,
        "class": "card",
        html: data
      }).appendTo('#main_item');

      $("#main_item .contents").addClass("on");
      if ($('#' + full_id + "+a+.loading").length == 0) {
        $('#' + full_id + '+a').after("<div class='loading'><i class='material-icons spin'>autorenew</i>LOADING...</div>");
      }

      // mathjax reload (sub__mathjax.js)
      MathJax.Hub.Typeset();

      // x axis scroller reload (sub__scroll.js)
      if (!is_mobile) {
        $('.contents').hScroll(300); // You can pass (optionally) scrolling amount
      }

    }
  });
}
