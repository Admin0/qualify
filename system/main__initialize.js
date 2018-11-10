var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function load_navigat_title(key, val) {
  $("<h2/>", {
    "id": key,
    "class": key,
    html: "<a href='#" + val.title + "'>" + val.title + "</a>"
  }).appendTo("#nav_item_list");
}

function load_navigat_items(category, item) {
  var onclick = "load('" + category + "','" + item + "')";
  $("<h3/>", {
    "class": category + " item " + category + "-" + item,
    "name": category,
    "round": item,
    html: "<a href=#" + category + "-" + item + " onclick=" + onclick + "><i class='material-icons'>book</i><span>" + item + "<span></a>"
  }).appendTo("#nav_item_list").append("<a href='" + category + "/" + item + ".html' target='_blank'><i class='material-icons'>open_in_new</i></a>");
}

function load_content_title(key, val) {
  $("<h2/>", {
    "id": key,
    "class": key,
    html: val.title
  }).appendTo("#item_list");
}

function load_content_items(category, item) {
  var onclick = "load('" + category + "','" + item + "')";
  $("<section/>", {
    "id": category + "-" + item,
    "class": category + " item",
    "name": category,
    "round": item,
    html: "<h3 onclick=" + onclick + "><a href=#" + category + "-" + item + " onclick=" + onclick + "><i class='material-icons'>book</i><span>" + item + "<span></a></h3>"
  }).appendTo("#item_list").append("<a href='" + category + "/" + item + ".html' target='_blank'><i class='material-icons'>open_in_new</i></a>");
}

function initialize() {
  $.getJSON("index.json", function(data) {
    // var items = [];
    $.each(data, function(key, val) {
      load_content_title(key, val);
      load_navigat_title(key, val);
      $.each(val.contents, function(index, element) {
        load_content_items(key, element);
        load_navigat_items(key, element);
      });
    });
  });
}

$(document).ready(function() {
  initialize();
  $("#nav_menu").load("system/module/nav_menu.html");
  $("#share").load("system/module/share.html", function() {
    nav_create();
  });

});
