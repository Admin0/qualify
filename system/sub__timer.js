// const start = localStorage.timer || Date.now();
setInterval(function() {
  let delta = Date.now() - time.start;
  output = (Math.floor(delta / 1000));
  let sec = (output % 60 < 10 ? "0" + output % 60 : output % 60)
  let min_raw = Math.floor(delta / 1000 / 60)
  let min = (min_raw % 60 < 10 ? "0" + min_raw % 60 : min_raw % 60)
  let hour = Math.floor(delta / 1000 / 60 / 60)
  timer.innerHTML = hour + ":" + min + ":" + sec;
}, 1000); // update about every second
