const card_ad =
  '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>' +
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

const is_card = document.querySelector("#main_item") == null;

if (is_card) {
  var card_title = decodeURIComponent(window.location.pathname);
  card_title = card_title.substring(decodeURIComponent(window.location.host).length);
  card_title = card_title.substring(0, card_title.indexOf('/')) + '-' + card_title.substring(card_title.indexOf('/') + 1);
  card_title = '#' + card_title.substring(0, card_title.indexOf('.'));

  const card_title_html = '<h1 id="card_title">' + card_title + '</h1>'
  const card_footer_html = '<div id="card_footer">https://' + window.location.host + '/qualify/</div>'
  document.querySelector('.contents').insertAdjacentHTML('beforebegin', card_title_html + card_ad);
  document.querySelector('.contents').insertAdjacentHTML('afterend', card_ad + card_footer_html);
}
