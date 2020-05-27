var is_card = document.querySelector("#main_item") == null; //단일 페이지인지 확인.

if (is_card) { //단일 페이지일 경우.
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
  const card_footer_html = '<div id="card_footer"><a href="//' + window.location.host + '/qualify/' + card_title + '">//' + window.location.host + '/qualify/' + card_title + '</a></div>'
  document.querySelector('.contents').insertAdjacentHTML('beforebegin', card_title_html + card_ad);
  (adsbygoogle = window.adsbygoogle || []).push({});
  document.querySelector('.contents').insertAdjacentHTML('afterend', card_ad + card_footer_html);
  (adsbygoogle = window.adsbygoogle || []).push({});

  // add important header items
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
  document.head.appendChild(viewport);
  const card_style = document.createElement('link');
  card_style.href = '/qualify/system/style_card.css';
  card_style.rel = "stylesheet";
  document.head.appendChild(card_style);
  const card_mathjax = document.createElement('script');
  card_mathjax.src = '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js';
  // card_mathjax.defer = true;
  card_mathjax.onload = function() {
    const card_mathjax_sub = document.createElement('script');
    card_mathjax_sub.src = '/qualify/system/sub__mathjax.js';
    // card_mathjax_sub.defer = true;
    document.head.appendChild(card_mathjax_sub);
  };
  document.head.appendChild(card_mathjax);

  // set class for page style
  document.querySelector('body').classList.add("page")
  document.querySelector('html').style.backgroundColor = '#e5e5e5';
}

// 모든 경우에 적용.
// load svg
document.querySelectorAll('.load').forEach(function(element) {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", '/qualify/' + element.innerText, true);
  ajax.send();
  ajax.onload = function(e) {
    if (ajax.status === 200) { //success
      element.innerHTML = ajax.responseText;

      MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
    } else { //failed
      console.log("load failed: " + element.innerText);
    }
  }
});
