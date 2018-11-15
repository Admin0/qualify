var is_card = document.querySelector("#main_item") == null;

if (is_card) {
  const card_ad =
    '<ins class="adsbygoogle"' +
    '     style="display:block; text-align:center;"' +
    '     data-ad-client="ca-pub-8175591114279139"' +
    '     data-ad-slot="5452657644"' +
    '     data-ad-format="auto"' +
    '     data-full-width-responsive="true"></ins>';

  const card_ad_1 = document.createElement('script');
  card_ad_1.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  card_ad_1.async = true;
  document.head.appendChild(card_ad_1);

  var card_title = decodeURIComponent(window.location.pathname);
  card_title = card_title.substring(card_title.indexOf('/', 2) + 1);
  card_title = card_title.substring(0, card_title.indexOf('/')) + '-' + card_title.substring(card_title.indexOf('/') + 1);
  card_title = '#' + card_title.substring(0, card_title.indexOf('.'));

  const card_title_html = '<h1 id="card_title">' + card_title + '</h1>'
  const card_footer_html = '<div id="card_footer">https://' + window.location.host + '/qualify/' + card_title + '</div>'
  document.querySelector('.contents').insertAdjacentHTML('beforebegin', card_title_html + card_ad);
  (adsbygoogle = window.adsbygoogle || []).push({});
  document.querySelector('.contents').insertAdjacentHTML('afterend', card_ad + card_footer_html);
  (adsbygoogle = window.adsbygoogle || []).push({});
}

// load svg

document.querySelectorAll('.load').forEach(function(element) {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", '/qualify/' + element.innerText, true);
  ajax.send();
  ajax.onload = function(e) {
    element.innerHTML = ajax.responseText;
  }
});
// <div class="svg">/qualify/위험물산업기사/chemical__2,4,6-Trinitrophenol(picric_acid).svg</div>
