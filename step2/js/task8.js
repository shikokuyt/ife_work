var data = [2,2,3,4,5];
var $ = function (el) {
  return document.querySelector(el);
};
var $$ = function (el) {
  return document.querySelectorAll(el);
};
// 获取输入值
function getInputValue() {
  var value = $('#txt').value;
  var reg = /\u3000+|\u0020+|、+|,+|，|[\r\n]+/g;
  /**
   * \u3000全角空格
   * \u0020半角空格
   * [\r\n]回车换行(CRLF)
   */
  var result = value.replace(reg, ',').split(',').filter(function (d) {
    if (d.length !== 0) {
      return trim(d);
    }
  });
  return result;
}
// 去除字符串两端空格
function trim(str) {
  if (typeof str !== 'string') {
    return '';
  }
  return str.replace(/^\s+|\s+$/, str);
}
function deal(fn, target) {
  var args = [].slice.call(arguments, 2);
  return function (event) {
    var arg = args.map(function (item) {
      return typeof item === 'function'?item(event):item;
    })[0];
    if (target != null ) {
      target('HackaThon');
    }
    fn.apply(data, arg);
    render();
  }
}
function getSearchValue() {
  var value = trim($('#search').value);
  return value;
}
function search() {
  var getValue = getSearchValue();
  var $data = [].slice.call($$('#result div'), 0).map(function (d) {
    return d.innerHTML;
  });
  $data.forEach(function (value, idx) {
      if (value.indexOf(getValue) !== -1) {
        $$('#result div')[idx].className = 'search';
      }
  });
}
function render() {
  $('#result').innerHTML = data.map(function(d) {
    return '<div>'+d+'</div>';
  }).join('');
}
