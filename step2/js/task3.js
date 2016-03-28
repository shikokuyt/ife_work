/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
    var source = document.getElementById('source'),
        aLi = source.getElementsByTagName('li'),
        data = [], ss, reg = /空气/g,  
        city, score, content,
        i, len = aLi.length;
    for (i=0; i<len; ++i) {
        content = aLi[i].innerHTML;
        score = aLi[i].querySelector('b').innerText;
        city = content.substring(0, content.search(reg));
        data.push([city, score]);
    }
    return data;
}

/**
 * sortAqiData方法
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    data.sort(function (value1, value2) {
        return value1[1] - value2[1];
    });
    return data;
}

/**
 * render方法
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
    var resort = document.getElementById('resort'),
        len = data.length, i, result = '';
    for (i=0; i<len; ++i) {
        result += '<li>第'+(i+1)+'名: '+data[i][0]+'空气质量: <b>'+data[i][1]+'</b></li>';
    }
    resort.innerHTML = result;
}

/**
 * btnHandler方法
 * 当按钮被点击后触发绑定的事件
 * 事件参加函数内调用
 */
function btnHandler() {
    var aqiData = getData();
     aqiData = sortAqiData(aqiData);
     render(aqiData);
}

/**
 * init方法
 * 当页面加载完全时触发
 * 获取相应元素，并为按钮绑定事件
 */
function init() {
    var btn = document.getElementById('sort-btn');
    btn.onclick = function () {
        btnHandler();  
    };
}

init();