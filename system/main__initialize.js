var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function get_icon(name) {
  var result = null;
  var scriptUrl = "somefile.php?name=" + name;
  $.ajax({
    url: "/qualify/system/icons/" + name + ".svg",
    type: 'get',
    dataType: 'text',
    async: false,
    success: function(data) {
      result = data;
    }
  }).fail(function() {
    result = name;
  });
  return result;
}

function load_navigat_title(key, val) {
  $("<h2/>", {
    "id": key,
    "class": key,
    html: "<a href='#" + key + "'>" + val.title + "</a>"
  }).appendTo("#nav_item_list").append("<a onclick='$(\"h3." + key + "\").slideToggle();'><i class='material-icons'>unfold_less</i></a>");
}

function load_navigat_items(category, item) {
  var onclick = "load('" + category + "','" + item.title + "')";
  var icon = item.icon != null ? "<i class='material-icons'>" + get_icon(item.icon) + "</i>" : "<i class='material-icons'>book</i>";
  $("<h3/>", {
    "class": category + " item " + category + "-" + item.title,
    "name": category,
    "round": item.title,
    html: "<a href=#" + category + "-" + item.title + " onclick=" + onclick + ">" + icon + "<span>" + item.title + "<span></a>"
  }).appendTo("#nav_item_list").append("<a href='" + category + "/" + item.title + ".html' target='_blank'><i class='material-icons'>open_in_new</i></a>");
}

function load_content_title(key, val) {
  $("<h2/>", {
    "id": key,
    "class": key,
    html: val.title
  }).appendTo("#item_list");
}

function load_content_items(category, item) {
  var onclick = "load('" + category + "','" + item.title + "')";
  var icon = item.icon != null ? "<i class='material-icons'>" + get_icon(item.icon) + "</i>" : "<i class='material-icons'>book</i>";
  $("<section/>", {
    "id": category + "-" + item.title,
    "class": category + " item",
    "name": category,
    "round": item.title,
    html: "<h3 onclick=" + onclick + "><a href=#" + category + "-" + item.title + " onclick=" + onclick + ">" + icon + "<span>" + item.title + "<span></a></h3>"
  }).appendTo("#item_list");
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
