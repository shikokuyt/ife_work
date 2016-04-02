/**
 * aqiData, 存储用户输入的空气指数数据
 * 示例格式:
 * aqiData = {
 *     "北京": 90,
 *     "上海": 50 
 * };
 */
var aqiData = {
    /*'北京': 58,
    '杭州': 60,
    '丽水': 10*/
};

/**
 * 去除字符串前后的空格
 */
function trim(str) {
    var reg = /^\s+|\s+$/g;
    return str.replace(reg, '');
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input'),
        air = document.getElementById('aqi-value-input'),
        city_value = trim(city.value),
        air_value = trim(air.value),
        reg_city = /[^\u4e00-\u9fa5a-zA-Z]/g,
        reg_air = /[^0-9]/g;
    if (city_value.length === 0 ||                  air_value.length === 0) {
        throw ({
            name: 'User Error',
            message: '用户输入为空'
        });
    }
    if (reg_city.test(city_value) || reg_air.test(air_value)) {
        console.warn('城市名必须为中英文字符，空气质量必须为整数');
    } else {
        aqiData[city_value] = air_value;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqi_table = document.getElementById('aqi-table'),
        instart = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>',
        intext = '', i;
    for (i in aqiData) {
        if (aqiData.hasOwnProperty(i)) {
            intext += '<tr><td>'+i+'</td><td>'+aqiData[i]+'</td><td><button>删除</button></td></tr>';
        }
    }
    aqi_table.innerHTML = instart+intext;
    init();
} 

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(btn) {
    // do sth
    var name = btn.parentNode.parentNode.firstChild.innerHTML;
    delete aqiData[name];
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var add_btn = document.getElementById('add-btn');
    add_btn.onclick = function () {
        addBtnHandle();  
    };
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var aqi_table = document.getElementById('aqi-table'),
        button = aqi_table.getElementsByTagName('button'),
        i, len = button.length;
    for (i=0; i<len; ++i) {
        (function (j) {
            button[j].onclick = function () {
                delBtnHandle(this);
            };
        }(i));    
    }
}
renderAqiList();
init();