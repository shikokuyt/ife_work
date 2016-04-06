(function (window, undefined) {
    var data = [];
    
    /**
     * 获取输入的值
     */
    function getInputValue() {
        return checkData($('#entry').value);
    }
    
    /**
     * 随机初始函数
     */
    function initRand() {
        data = [];
        var num;
        for (var i=0; i<50; ++i) {
            num = Math.floor(Math.random()*91)+10;
            data.push(num);
        }
        render($('#result'), data);
    }
    /**
     * 验证数据函数
     */
    function checkData(data) {
        var data = {
            values: data
        };
        validator.config = {
            values: ['isNonEmpty', 'isNumber', 'isSizeFlow']
        };
        validator.types.isNonEmpty = {
            validate: function (value) {
                return value !== '';
            },
            instructions: '输入的值不能为空!'
        };
        validator.types.isNumber = {
            validate: function (value) {
                return !isNaN(value);
            },
            instructions: '只能输入数字!'
        };
        validator.types.isSizeFlow = {
            validate: function (value) {
                return value >= 10 && value <= 100;
            },
            instructions: '输入的值只能在10-100间'
        };
        if (validator.validate(data)) {
            for (i in validator.messages) {
                alert(validator.messages[i]);
                return null;
            }
        } else {
            return data.values;
        }
    }
    
    /**
     * Dom事件处理
     */
    function deal(func, fn) {
        var args = [].slice.call(arguments, 2);
        return function (e) {
            if (data.length > 60) {
                window.alert('数量超过60不符合系统要求');
                return ;
            }
            var arg = args.map(function (item) {
                return typeof item === 'function'?item(e):item;
            })[0];
            if (fn !== null ) {
                fn(func.call(data));
            }
            if (!!arg) {
                func.call(data, arg);
            }
            render($('#result'), data);
        };
    }
    /**
     * 程序入口函数
     */
    window.onload = function () {
        $('#rand').onclick = initRand   ;
        $('#left-in').onclick = deal([].unshift, null, getInputValue);
        $('#right-in').onclick = deal([].push, null, getInputValue);
        $('#left-out').onclick = deal([].shift, window.alert);
        $('#right-out').onclick = deal([].pop, window.alert);
        $('#sort').onclick = function () {
            data = sorts.quickSort.init(data);
//            changeDom(data);
        };
        $('#result').onclick = function (ev) {
            var event = ev || window.event,
                target = event.target || event.srcElement;
  
//            sorts.quickSortRd();
        };
    };
}(window));