const ad =
  '<section class="ad">' +
  '<!-- 반응형 -->' +
  '<ins class="adsbygoogle"' +
  '     style="display:block"' +
  '     data-ad-client="ca-pub-8175591114279139"' +
  '     data-ad-slot="6064236981"' +
  '     data-ad-format="auto"' +
  '     data-full-width-responsive="true"></ins>' +
  '<script>' +
  '(adsbygoogle = window.adsbygoogle || []).push({});' +
  '</script>' +
  '</section>'

  // <!-- Global site tag (gtag.js) - Google Analytics -->
  
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-39552694-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-39552694-1', {
      'page_path': '/화학분석기사/필답-2018-1.html'
    });
  </script>
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

      // adsense
      $("#main_item .contents").append(ad).prepend(ad);

      // scroll to top for mobile
      $('html, body').animate({
        scrollTop: 0
      }, 500);

      // mathjax reload (sub__mathjax.js)
      MathJax.Hub.Typeset();

      // x axis scroller reload (sub__scroll.js)
      if (!is_mobile) {
        $('.contents').hScroll(300); // You can pass (optionally) scrolling amount
      }

    }
  });
}
