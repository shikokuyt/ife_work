/**
 * 功能性函数
 * author: shikokuyt
 */

/**
 * 获取元素
 * 不支持低版本浏览器
 */
var $ = function (selector) {
    return document.querySelector(selector);
}

/**
 * 事件监听函数
 */
function addEvent(ele, type, handle, fn) {
    try {
        ele.addEventListener(type, handle, false);
    } catch (ex) {
        try {
            ele.attachEvent('on'+type, handle);
        } catch (ex) {
            ele['on'+type] = handle;
        }
    }
    fn && fn(); // 是否传入回调函数
}

/**
 * 表单验证对象
 */
var validator = {
    // 所有可用的检查
    // 可以自行添加/删除
    types: {},
    
    // 在当前验证会话中的错误信息
    messages: [],
    
    // 当前验证配置
    // 名称: 验证类型
    config: {},
    
    // 接口方法
    // 'data'为键-值对
    validate: function (data) {
        var i, j, len, msg, type, checker, result_ok;
        
        // 重置所有消息
        this.messages = [];
        
        for (i in data) {
            if (data.hasOwnProperty(i)) {
                type = this.config[i];
                for (j=0, len=type.length; j<len; ++j) {
                    checker = this.types[type[j]];
                    if (!type) {
                        continue; // 不需要验证
                    }
                    if (!checker) {
                        throw {
                            name: 'ValidationError',
                            message: 'No handler to validate type '+type
                        };
                    }

                    result_ok = checker.validate(data[i]);
                    if (!result_ok) {
                        msg = checker.instructions;
                        this.messages.push(msg);
                    }
                }
            }
        }
        return this.hasErrors();
    },
    
    // 帮助程序
    hasErrors: function () {
        return this.messages.length !== 0;
    }
} 

/**
 * Dom渲染函数
 */
function render(par, data) {
    var inner = data.map(function (d) {
        return '<div style="height: '+d+'px">'+d+'</div>';
    }).join('');
    par.innerHTML = inner;
}

/**
 * 获取css属性值
 */
function getStyle(ele, attr) {
    return window.getComputedStyle?window.getComputedStyle(ele, false)[attr]:ele.currentStyle[attr];
}
/**
 * 获取某元素的index值
 */
function getIndex(value, data) {
    return [].indexOf.call(data, value);
}
/**
 * 排序算法对象
 */
var sorts = {
    quickSort: {
        data: [],
        init: function (data) {
            this.data = data;
            return this.func(data);
        },
        func: function (data, left, right) {
            if (data.length < 2) {
                return data;
            }
            left = (typeof left !== 'number')?0:left;
            right = (typeof right !== 'number')?data.length - 1:right;
            var index = this.partition(data, left, right);
            if (left < index - 1) {
                arguments.callee.call(this, data, left, index - 1);
            } 
            if (index < right) {
                arguments.callee.call(this, data, index, right);
            }
            return data;
        },
        partition: function (arr, left, right) {
            var pivot = arr[Math.floor((left+right) / 2)],
                i = left,
                j = right,
                aDiv = $('#result').getElementsByTagName('div');
            while (i<=j) {
                while (arr[i] < pivot) {
                    i ++;
                }
                while (arr[j] > pivot) {
                    j --;
                }
                if (i<=j) {
                    aDiv[Math.floor((left+right)/2)].style.backgroundColor = 'blue';
                    changeDom(aDiv, this.data, i, j);
                    this.swap(arr, i, j);
                    i ++;
                    j --;
                }
            }
            return i;
        },
        swap: function (arr, index1, index2) {
            var temp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = temp;
        }
    }
};
/**
 * 改变Dom元素
 */
function changeDom(aDiv, data, index1, index2) {
    aDiv[index1].style.height = data[index2] + 'px';
    aDiv[index1].innerHTML = data[index2];
    aDiv[index2].style.height = data[index1] + 'px';
    aDiv[index2].innerHTML = data[index1];
}