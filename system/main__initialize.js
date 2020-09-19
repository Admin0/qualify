time.init0 = Date.now();
console.log('init.js delay: ' + (-time.start + time.init0) + ' ms');

const is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// const custom_icon_list = [
//   "certificate", "contract", "deer", "exit_sign", "fire_extinguisher", "gears", "kicking",
//   "microsoft_access", "microsoft_excel", "microsoft_office", "microsoft_powerpoint", "microsoft_word",
//   "oil_industry", "oil_pump", "poison",
//   "share__facebook", "share__kakaolink", "share__twitter",
//   "star", "test_tube", "water"
// ];
// var custom_icon_set = [];
// for (var i = 0; i < custom_icon_list.length; i++) {
//   $.ajax({
//     url: "/qualify/system/icons/" + custom_icon_list[i] + ".svg",
//     type: 'get',
//     dataType: 'text',
//     async: false,
//     success: function(data) {
//       custom_icon_set[i] = data;
//     }
//   });
// }

let custom_icon = [];
$.getScript("system/main__initialize_icons.js");

function get_icon(name) {
  let result = (custom_icon[0] == undefined) ? "error" : name;
  const l = custom_icon.length;
  for (let i = 0; i < l; i++) {
    if (name == custom_icon[i][0]) {
      result = custom_icon[i][1];
      break;
    }
  }
  return result;
}

function slide(target, wanna_fold) {
  const time = 10;
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
      localStorage["item_" + target + "_is_folded"] = "true";
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
      localStorage["item_" + target + "_is_folded"] = "false";
      break;
    default:
  }
}

function check_item_folded(key) {
  // console.log('dom_key: ' + key);
  if (localStorage["item_" + key + "_is_folded"] == "true") {
    // console.log(localStorage["item_" + key + "_is_folded"]);
    $("#item_list section." + key).hide();
    $("#nav_item_list h3." + key).hide();
    $("#" + key + " i").text("unfold_more");
    $("#" + key).addClass("slided");
  }
}

function load_navigat_title(key, val) {
  $("<h2/>", {
    "id": "nav_" + key,
    "class": key,
    "onclick": "slide(\"" + key + "\")",
    html: "<a>" + val.title + (val.contents != null ? " <span class='translation'>(" + val.contents.length + ")</span>" : "") + "</a>"
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
    // console.log(data);
    $.each(data, function(key, val) {
      load_content_title(key, val);
      load_navigat_title(key, val);
      $.each(val.contents, function(index, element) {
        // if (localStorage["item_" + key + "_is_folded"] != "true") //감춰진 항목은 시작시 로드 안하게??
        load_content_items(key, element);
        load_navigat_items(key, element);
      });
      // console.log(key);
      check_item_folded(key);
    });
  });
  console.log('init(inner) done: ' + (Date.now() - time.init0) + ' ms');
}

$(document).ready(function() {
  initialize();
  console.log('init done: ' + (Date.now() - time.init0) + ' ms');
  $("#nav_menu").load("system/module/nav_menu.html");
  $("#share").load("system/module/share.html", function() {
    nav_create();
  });
  $("#context_menu").load("system/module/context_menu.html");

  // $("div#splash").removeClass("on");

  console.log('modul load done: ' + (Date.now() - time.init0) + ' ms');
  $.getScript("system/main__initialize_console.js");
});

$(window).on('load', function() {
  $("div#splash").fadeOut();
  console.log('splash removed: ' + (Date.now() - time.init0) + ' ms');
})
