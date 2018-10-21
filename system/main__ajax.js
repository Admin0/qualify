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

function load(id, content) {
  var full_id = id + "-" + content;
  $.ajax({
    type: 'get',
    url: id + "/" + content + ".html",
    dataType: 'html',
    success: function(data) {

      $('#title').html(full_id);
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

      // analytics
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'UA-39552694-1', {
        'page_title': full_id,
        'page_path': '/qualify/' + id + '/' + content
      });

      // adsense
      $("#main_item .contents").append(ad).prepend(ad);

      // scroll to top for mobile
      $('html, body').animate({
        scrollTop: 0
      }, 3000);

      // mathjax reload (sub__mathjax.js)
      MathJax.Hub.Typeset();

      // x axis scroller reload (sub__scroll.js)
      if (!is_mobile) {
        $('.contents').hScroll(300); // You can pass (optionally) scrolling amount
      }

    }
  });
}
