var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

$.getJSON("index.json", function(data) {
  var items = [];
  $.each(data, function(key, val) {
    $("<h2/>", {
      "id": key,
      "class": key,
      html: val.title
    }).appendTo("#item_list");
    $.each(val.contents, function(index, element) {
      var onclick = "load('" + key + "','" + element + "')";
      $("<section/>", {
        "id": key + "_" + element,
        "class": key + " item",
        "target": element,
        html: "<h3 onclick=" + onclick + "><i class='material-icons'>directions_run</i><span>" + element + "<span></h3>"
      }).appendTo("#item_list").append("<a href='" + key + "/" + element + ".html' target='_blank'><i class='material-icons'>open_in_new</i></a>");
    });
  });
});

$(document).ready(function() {

});
