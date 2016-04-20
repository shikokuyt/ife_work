// 变量定义
var __shift = [].shift,
    __push = [].push,
    __indexOf = [].indexOf,
    tagData = [1, 2, 3, 4, 5],
    pyData = [];

var $ = function (el) {
  return document.querySelector(el);
};
var $$ = function (el) {
  return document.querySelectorAll(el);
};
function getTagValue() {
  return trim($('#addTag').value);
}
function render(par, data) {
    par.innerHTML = data.map(function (d) {
      return '<div>'+d+'</div>';
    }).join('');
}
function isOverflow(data, max) {
  return data.length >= max;
}
function trim(str) {
  return str.toString().replace(/^\s+|\s+$/, '');
}
// in_array(search, array)
function in_array(search, array) {
  var i;
  for (i in array) {
    if (array[i] === search) {
      return true;
    }
  }
  return false;
}
