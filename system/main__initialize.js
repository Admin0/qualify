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

function slide(target, wanna_fold) {
  var time = 10;
  switch (wanna_fold != null ? wanna_fold : !$("#" + target).hasClass("slided")) {
    case true:
      // console.log("true");
      $("#item_list .item." + target).each(function(index) {
        var t = $(this);
        setTimeout(function() {
          t.hide();
        }, time * index);
        // console.log(index);
      });
      $("#nav_item_list .item." + target).each(function(index) {
        var t = $(this);
        setTimeout(function() {
          t.hide();
        }, time * index);
        // console.log(index);
      });
      $("#" + target + " i").text("unfold_more");
      $("#" + target).addClass("slided");
      window.localStorage["item_" + target + "_is_folded"] = "true";
      break;
    case false:
      // console.log("false");
      $("#item_list .item." + target).each(function(index) {
        var t = $(this);
        setTimeout(function() {
          t.show();
        }, time * index);
        // console.log(index);
      });
      $("#nav_item_list .item." + target).each(function(index) {
        var t = $(this);
        setTimeout(function() {
          t.show();
        }, time * index);
        // console.log(index);
      });
      $("#" + target + " i").text("unfold_less");
      $("#" + target).removeClass("slided");
      window.localStorage["item_" + target + "_is_folded"] = "false";
      break;
    default:
  }
}

function check_item_folded() {
  $("#nav_item_list h2").each(function(index) {
    if (window.localStorage["item_" + $(this).attr("id") + "_is_folded"] == "true") {
      // console.log(window.localStorage["item_" + $(this).attr("id") + "_is_folded"]);
      $("#item_list section." + $(this).attr("id")).hide();
      $("#nav_item_list h3." + $(this).attr("id")).hide();
      $("#" + $(this).attr("id") + " i").text("unfold_more");
      $("#" + $(this).attr("id")).addClass("slided");
    }
  });
}

function load_navigat_title(key, val) {
  $("<h2/>", {
    "id": key,
    "class": key,
    "onclick": "slide(\"" + key + "\")",
    html: "<a href='#" + key + "'>" + val.title + (val.contents != null ? " <span class='translation'>(" + val.contents.length + ")</span>" : "") + "</a>"
  }).appendTo("#nav_item_list").append("<a class='btn_item_fold'><i class='material-icons'>unfold_less</i></a>");
}

function load_navigat_items(category, item) {
  var onclick = !item.locked ? "load('" + category + "','" + item.title + "')" : "load('notice');";
  var icon = !item.locked ? (item.icon != null ? "<i class='material-icons'>" + get_icon(item.icon) + "</i>" : "<i class='material-icons'>book</i>") : "<i class='material-icons'>lock</i>";
  $("<h3/>", {
    "class": category + " item " + category + "-" + item.title,
    "name": category,
    "round": item.title,
    "locked": item.locked,
    html: "<a href=#" + (!item.locked ? category + "-" + item.title : "") + " onclick=" + onclick + ">" + icon + "<span>" + item.title + "</span></a>"
  }).appendTo("#nav_item_list").append(!item.locked ? "<a class='btn_item_open' href='" + category + "/" + item.title + ".html' target='_blank'><i class='material-icons'>open_in_new</i></a>" : "");
}

function load_content_title(key, val) {
  $("<h2/>", {
    "id": key,
    "class": key,
    "onclick": "slide(\"" + key + "\")",
    html: val.title + (val.contents != null ? " <span class='translation'>(" + val.contents.length + ")</span>" : "")
  }).appendTo("#item_list").append("<a class='btn_item_fold'><i class='material-icons'>unfold_less</i></a>");;
  // console.log(val);
}

function load_content_items(category, item) {
  var onclick = !item.locked ? "load('" + category + "','" + item.title + "')" : "load('notice');";
  var icon = !item.locked ? (item.icon != null ? "<i class='material-icons'>" + get_icon(item.icon) + "</i>" : "<i class='material-icons'>book</i>") : "<i class='material-icons'>lock</i>";
  $("<section/>", {
    "id": category + "-" + item.title,
    "class": category + " item",
    "name": category,
    "round": item.title,
    "locked": item.locked,
    html: "<h3 onclick=" + onclick + "><a href=#" + category + "-" + item.title + ">" + icon + "<span>" + item.title + "</span></a></h3>"
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
    check_item_folded();
  });
}

$(document).ready(function() {
  initialize();
  $("#nav_menu").load("system/module/nav_menu.html");
  $("#share").load("system/module/share.html", function() {
    nav_create();
  });
  $("#context_menu").load("system/module/context_menu.html");
  $.getScript("system/main__initialize_console.js");
  setTimeout(function() {
    $("div#splash").fadeOut();
  }, 30);
});
