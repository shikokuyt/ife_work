window.onload = function () {
    var par = document.getElementById('par'),
        prev = document.getElementById('preSort'),
        center = document.getElementById('centerSort'),
        next = document.getElementById('nextSort');
    prev.onclick = deal(traverse);
    center.onclick = deal(traverseCen);
    next.onclick = deal(traverseBtm);
};
function deal(type) {
  return function () {
    var result = [];
    type(function (node) {
      result.push(node);
    }, par);
    render(result);
  };
}
/**
 * 先序遍历
 * 根-left-right
 */
function traverse(process, node) {
    function inOrder(node) {
        if (hasChild(node)) {
            node.left = getFirst(node);
            node.right = getLast(node);
        }
        process.call(null, node);
        if (hasChild(node.left)) {
            inOrder(node.left);
        } else {
            process.call(null, node.left);
        }
        if (hasChild(node.right)) {
            inOrder(node.right);
        } else {
            process.call(null, node.right);
        }
    }
    inOrder(node);
}

/**
 * 中序遍历
 * left-根-right
 */
function traverseCen(process, node) {
    function inOrder(node) {
        if (hasChild(node)) {
            node.left = getFirst(node);
            node.right = getLast(node);
        }
        if (hasChild(node.left)) {
            inOrder(node.left);
        } else {
            process.call(null, node.left);
        }
        process.call(null, node);
        if (hasChild(node.right)) {
            inOrder(node.right);
        } else {
            process.call(null, node.right);
        }
    }
    inOrder(node);
}

/**
 * 后序遍历
 * left-right-根
 */
function traverseBtm(process, node) {
    function inOrder(node) {
        if (hasChild(node)) {
            node.left = getFirst(node);
            node.right = getLast(node);
        }
        if (hasChild(node.left)) {
            inOrder(node.left);
        } else {
            process.call(null, node.left);
        }
        if (hasChild(node.right)) {
            inOrder(node.right);
        } else {
            process.call(null, node.right);
        }
        process.call(null, node);
    }
    inOrder(node);
}

function hasChild(node) {
    var childs = node.children,
        i, len = childs.length;
    for (i=0; i<len; i+=1) {
        if (childs[i].nodeType === 1) {
            return true;
        }
    }
    return false;
}
function getFirst(node) {
    return node.firstElementChild;
}
function getLast(node) {
    return node.lastElementChild;
}

/**
 * 渲染函数
 */
function render(queue) {
    var num = 0;
    function inQueue(i) {
        var timer = setTimeout(function () {
            if (i > 0) {
                queue[i-1].className = '';
            }
            if (i === queue.length) {
                return ;
            }
            queue[i].className = 'active';
            timer = null;
            inQueue(num ++);
        }, 1000);
    }
    inQueue(num);
}