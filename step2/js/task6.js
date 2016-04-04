(function (window, undefined) {
    window.onload = function () {
        var entry = getEleById('entry'),
            left_in = getEleById('left-in'),
            left_out = getEleById('left-out'),
            right_in = getEleById('right-in'),
            right_out = getEleById('right-out'),
            lists = getEleById('lists');
        addEvent(left_in, 'click', leftIn);
        addEvent(left_out, 'click', leftOut);
        addEvent(right_in, 'click', rightIn);
        addEvent(right_out, 'click', rightOut);
        addEvent(lists, 'click', removeClickObj);
    };
    /**
     * 检测Entry是否填入数据，并且判断是否为数字
     */
    function checkData() {
        var reg = /\D/g,
            entry = getEleById('entry');
        if (entry.value.length === 0 || reg.test(entry.value)) {
            return 6; // 如果没输入或输入不符合条件就添加6
        }
        return entry.value.replace(/^\s+|\s+$/, '');
    }
    /**
     * 获取元素By ID
     */
    function getEleById(id) {
        return document.getElementById(id);
    }
    /**
     * 检测节点是否有子节点
     */
    function hasChild(par) {
        var len = par.children.length,
            i;
        for (i=0; i<len; i++) {
            if (par.children[i].nodeType === 1) {
                return true;
            }
        }
        return false;
    }
    /**
     * 定义事件监听
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
        fn && fn();
    }
    /**
     * 左侧插入子节点
     */
    function leftIn() {
        var lists = getEleById('lists'),
            newEle = createEle('li', checkData());
        if (hasChild(lists)) {
            lists.insertBefore(newEle, lists.firstChild);
        } else {
            lists.appendChild(newEle);
        }
    }
    /**
     * 右侧插入子节点
     */
    function rightIn() {
        var lists = getEleById('lists'),
            newEle = createEle('li', checkData());
        lists.appendChild(newEle);
    }
    /**
     * 左侧删除子节点
     */
    function leftOut() {
        var lists = getEleById('lists'),
            value;
        if (hasChild(lists)) {
           value = getFirstEle(lists, lists.firstChild); 
            lists.removeChild(value);
            alert(value.innerHTML);
        } else {
            alert('列表为空，删除失败');
        }
    }
    
    /**
     * 右侧删除子节点
     */
    function rightOut() {
        var lists = getEleById('lists'),
            value;
        if (hasChild(lists)) {
            value = getLastEle(lists, lists.lastChild); 
            lists.removeChild(value);
            alert(value.innerHTML);
        } else {
            alert('列表为空，删除失败');
        }
    }
    /**
     * 为元素定义事件，当点击某元素，则从其父元素中删除该元素
     */
    function removeClickObj(event) {
        var event = event || window.event,
            target = event.target || event.srcElement,
            lists = getEleById('lists');
        if (target.nodeName.toUpperCase() === 'LI') {
            lists.removeChild(target);
        }
    }
    /**
     * 创建元素
     */
    function createEle(type, value) {
        var newEle = document.createElement(type);
        newEle.innerHTML = value;
        return newEle;
    }
    /**
     * 得到第一个子元素
     */
    function getFirstEle(par, first) {
        if (first.nodeType === 1 && first.nodeName.toUpperCase() === 'LI') {
            return first;
        } else {
            return getFirstEle(par, first.nextSibling);
        }
    }
    /**
     * 得到最后一个子元素
     */
    function getLastEle(par, last) {
        if (last.nodeType === 1 && last.nodeName.toUpperCase() === 'LI') {
            return last;
        } else {
            return getLastEle(par, last.previousSibling);
        }
    }
}(window));