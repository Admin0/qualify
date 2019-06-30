const ad =
  '<section class="ad">' +
  '<!-- qualify 반응형 -->' +
  '<ins class="adsbygoogle"' +
  '     style="display:block"' +
  '     data-ad-client="ca-pub-8175591114279139"' +
  '     data-ad-slot="5452657644"' +
  '     data-ad-format="auto"' +
  '     data-full-width-responsive="true"></ins>' +
  '<script>' +
  '(adsbygoogle = window.adsbygoogle || []).push({});' +
  '</script>' +
  '</section>'

function after_load(full_id) {
  $('#title').html(full_id);
  $("#main_item .contents").addClass("on");
  // if ($('#' + full_id + "+a+.loading").length == 0) {
  //   $('#' + full_id + '+a').after("<div class='loading'><i class='material-icons spin'>autorenew</i>LOADING...</div>");
  // }

  $('.targeted').removeClass('targeted');
  $('#item_list #' + full_id + ', #nav_item_list .' + full_id + ', #nav_menu .' + full_id).addClass('targeted');

  // scroll to top for mobile
  $('html, body').animate({
    scrollTop: 0
  }, pageYOffset / 2);

  // next | prev able test
  console_event(",.");

  // x axis scroller reload (sub__scroll.js)
  if (!is_mobile) {
    $('.contents').hScroll(300); // You can pass (optionally) scrolling amount
    scroll_style(false);
  }
}

function load(id, content) {
  var full_id = id + (content != null ? "-" + content : "");
  $.ajax({
    type: 'get',
    url: id + (content != null ? "/" + content + ".html" : ".html"),
    dataType: 'html',
    success: function(data) {
      $("#main_item").html("");
      $('#main_item').append(data);
      after_load(full_id);

      // mathjax reload (sub__mathjax.js)
      // MathJax.Hub.Typeset();
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // same as above, but you should use this.

      // analytics
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'UA-39552694-1', {
        'page_title': full_id,
        'page_path': '/qualify/#' + id + (content != null ? "-" + content : "")
      });

      // adsense
      $("#main_item .contents").append(ad).prepend(ad);
      (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-8175591114279139",
        enable_page_level_ads: true
      });
    }
  });
}
