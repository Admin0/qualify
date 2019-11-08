var start = Date.now();
setInterval(function() {
  var delta = Date.now() - start;
  output = (Math.floor(delta / 1000));
  var sec = (output % 60 < 10 ? "0" + output % 60 : output % 60)
  var min_raw = Math.floor(delta / 1000 / 60)
  var min = (min_raw % 60 < 10 ? "0" + min_raw % 60 : min_raw % 60)
  var hour = Math.floor(delta / 1000 / 60 / 60)
  timer.innerHTML = hour + ":" + min + ":" + sec;
}, 1000); // update about every second
