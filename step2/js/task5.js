(function (window, undefined) {
    var tmp = null;
    window.onload = function () {
        init();
        var form_fra_time = document.getElementById('form-gra-time');
        addEvent(form_fra_time, 'click', graTimeChange); 
    };
    /**
     * 仿jQuery获取DOM元素
     */
    function $(selector) {
        if (selector.match(/^#/)) {
            return document.getElementById(selector.replace('#', ''));
        } else {
            return document.querySelector(selector);
        }
    }
    /* 数据格式演示
        var aqiSourceData = {
            '北京': {
                '2016-01-01': 10,
                '2016-01-02': 10,
                '2016-01-03': 10,
                '2016-01-04': 10
            }
        };
    */
    // 以下两个函数用于随机模拟生成测试数据
    function getDateStr(dat) {
        var y = dat.getFullYear(),
            m = dat.getMonth() + 1,
            d = dat.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }
    function randomBuildData(seed) {
        var returnData = {},
            dat = new Date('2016-01-01'),
            datStr = '';
        for (var i=1; i<92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);
            dat.setDate(dat.getDate() + 1);
        }
        return returnData;
    }
    
    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "杭州": randomBuildData(300)
    };
    // 用于渲染图表的数据
    var chartData = {};
    
    // 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: -1,
        nowGraTime: 'day'
    };
    
    /**
     * 渲染图表
     */
    function renderChart() {
        var bgColor = ['#f00', '#9cc', '#ff6'],
            aqi_chart_wrap = $('.aqi-chart-wrap'),
            len = getObjLen(chartData), i, k=0;
        aqi_chart_wrap.innerHTML = '';
        for (i in chartData) {
            var newEle = document.createElement('div'),
                next = iterator(chartData, i);
            aqi_chart_wrap.appendChild(newEle);
            k = getObjMean(chartData);
            if (next > k) {
                newEle.style.backgroundColor = bgColor[0];
            } else if (next > k / 2) {
                newEle.style.backgroundColor = bgColor[1];
            } else {
                newEle.style.backgroundColor = bgColor[2];
            }
            newEle.title = i+': '+next;
            if (pageState.nowGraTime === 'day') {
                next /= 2;
            } else if (pageState.nowGraTime === 'month') {
                next /= 25;
            } else {
                next /= 5;
            }
            newEle.style.height = next+'px';
        }
    }
    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange() {
        // 确定是否选项发生了变化
        var event = arguments[0] || window.event,
            target = event.target || event.srcElement;
        console.log(target.nodeName);
        if (target.value === pageState.nowGraTime || target.nodeName.toUpperCase()!=='INPUT') {
            return ; // 未发生变化
        }
        pageState.nowGraTime = target.value;
        // 设置对应数据
        tmp = aqiSourceData[pageState.nowSelectCity];
        chartData = {};
        getData(tmp, pageState.nowGraTime);
        tmp = null;
        // 调用图表渲染函数
        renderChart();
    }
    /**
     * 下面函数分别获取时间粒度不同的数据
     */
    function getData(tmp, time) {
        var i, indexs=1, stage, index=null;
        switch(time) {
            case 'day':
                chartData = tmp;
                break;
            case 'week':
                stage = '第'+indexs+'周';
                chartData[stage] = 0;
                for (i in tmp) {
                    index = new Date(i);
                    if (index.getDay() == 0) {
                        stage = '第'+(++indexs)+'周';
                        chartData[stage]=0;
                    } else {
                        chartData[stage]+=tmp[i];
                    }
                }
                index = null;
                break;
            case 'month':
                index = new Date('2016-01-01');
                indexs = index.getMonth()+1;
                stage = indexs + '月';
                chartData[stage]=0;
                for (i in tmp) {
                    index = new Date(i);
                    if (index.getMonth() === indexs-1) {
                        chartData[stage]+=tmp[i];
                    } else {
                        indexs = index.getMonth()+1;
                        stage = indexs + '月';
                        chartData[stage] = 0;
                    }
                }
                index = null;
                break;
        }
    }
    /**
     * 得到对象的长度
     */
    function getObjLen(obj) {
        var i, len = 0;
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                len ++;
            }
        }
        return len;
    }
    /**
     * 迭代器，遍历对象
     */
    function iterator(obj, index) {
        var lidu = pageState.nowGraTime,
            nextData;
        var agg = (function () {
            nextData = obj[index];
            var hasNext = function () {
                return nextData?true: false;
            },
                next = function () {
                    if (hasNext()) {
                        return nextData;
                    }
                    return null;
                }
            return {
                next: next
            };
        }());
        return agg.next();
    }
    /**
     * select发生变化时的处理函数
     */
    function citySelectChange() {
        // 确定是否选项发生了变化
        var city_select = document.getElementById('city-select'),
            name = city_select.value,
            tmp = null;
        if (name === pageState.nowSelectCity) {
            return ;
        }
        // 设置对应数据
        pageState.nowSelectCity = name;
        tmp = aqiSourceData[pageState.nowSelectCity];
        getData(tmp, pageState.nowGraTime);
        tmp = null;
        // 调用图表渲染函数
        renderChart();
    }
    
    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
        var form_gra_time = document.getElementById('form-gra-time'),
            time = document.getElementsByName('gra-time'), i, len=time.length;
        for (i=0; i<len; i++) {
            if (time[i].checked) {
                pageState.nowGraTime = time[i].value;
            }
        }
    }
    
    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        var city_select = document.getElementById('city-select');
        pageState.nowSelectCity = city_select.value;
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        addEvent(city_select, 'change', citySelectChange);
    }
    
    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        var city_select = $('#city-select'),
            tmp = aqiSourceData[city_select.value];
        pageState.nowSelectCity = city_select.value;
        // 处理好的数据存到 chartData 中
        getData(tmp, pageState.nowGraTime);
        renderChart();
    }
    /**
     * 定义事件监听程序
     * 兼容Dom0/1/2
     */
    function addEvent(ele, type, handler, fn) {
        if (document.addEventListener) {
            ele.addEventListener(type, handler, false);
        } else if (document.attachEvent){
            ele.attachEvent('on'+type, handler);
        } else {
            ele['on'+type] = handler;
        }
        fn && fn();
    }
    /**
     * 获得平均值
     */
    function getObjMean(obj) {
        var result = 0, i;
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                result += obj[i];
            }
        }
        return result / getObjLen(obj);
    }
    /** 
     * 初始化函数
     */
    function init() {
        initGraTimeForm();
        initCitySelector();
        initAqiChartData();
    }
}(window));