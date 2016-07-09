var 
	$ = function (selector) {
		return document.querySelector(selector);
	};

/*
 * 基本配置
 * 二维数组 4*4 {0}
 */
var main = $('.main');
var add = $('.add-score');
var s_n = $('.s-number');
var b_n = $('.b-number');
var new_game = $('.new-game');
var get = $('.get');
var qued = $('.qued');
var end = $('.end');

var flag = false;
var total = 0;
var arr = [];
var gene_tmp = [];
var i,j;
var f_num;
var best=0;

function getEqChild(par, index) {
	var childs = [],
		nodes = par.childNodes,
		inx = 0, i, 
		len = nodes.length;

	for (i=0; i<len; i++) {
		if (nodes[i].nodeType === 1) {
			childs[inx++] = nodes[i];
		}
	}
	return childs[index];
}

function init() {
	f_num = 0;
	arr = [];
	gene_tmp = [];
	total = 0;
	if (!!localStorage.getItem('best')) {
		flag = true;
		best = localStorage.getItem('best');
		b_n.innerHTML = best;
	}
	else 
	{
		b_n.innerHTML = total;
	}
	s_n.innerHTML = total;
	var i, j;
	for (i=0; i<4; i++) {
		arr[i] = [];
		gene_tmp[i] = [];
		for (j=0; j<4; j++) {
			arr[i][j] = 0;
		}
	}	
	arr[1][1] = 2;
	arr[1][2] = 2;
	paint();
}
function paint() {
	var i, j;
	var ele = null;
	for (i=0; i<4; i++) {
		for (j=0; j<4; j++) {
			ele = getEqChild(getEqChild(main, i), j);
			if (!!arr[i][j]) {
				ele.innerHTML = arr[i][j];
				if (arr[i][j] > 256) {
					ele.className = 'cols col-256';
				}
				else {
					ele.className = 'cols col-'+arr[i][j];					
				}
			}
			else {
				ele.innerHTML = '';
				ele.className = 'cols';
			}
		}
	}
}

function generate() {
	var i, j;
	var nums  = 1;
	while (!!nums) {
		i = Math.floor(Math.random()*4);
		j = Math.floor(Math.random()*4);
		if (arr[i][j] === 0) {
			nums --;
			switch(Math.floor(Math.random()*10+1)) {
				case 8:
				case 9:
					arr[i][j] = 4;
					break;
				case 10:
					arr[i][j] = 8;
					break;
				default:
					arr[i][j] = 2;
					break;
			}
		}
	}
}


/*
 * 运动
 * to-left/to-right/to-top/to-bottom
 */
function to_left(row) {
	var j, k;
	var tmp;
	tmp = [];
	j = 0;
	while (j < 3) {
		if (arr[row][j] !== 0) {
			k = j + 1;
			while (arr[row][k] === 0) {
				k ++;
				if (k >= 3) {
					break;
				}
			}
			if (k > 3) {
				break;
			}
			if (arr[row][j] === arr[row][k]) {
				arr[row][j] *= 2;
				add.innerHTML = '+'+arr[row][j];
				total += arr[row][j];
				add.style.opacity = 0;
				add.style.top = '-50%';
				if (!flag) {
					b_n.innerHTML = total;
				}
				s_n.innerHTML = total;
				arr[row][k] = 0;
				j = k + 1;
			}
			else 
			{
				j = k;
			}
		}
		else
		{
			j ++;
		}
	}
	for (j=0; j<4; j++) {
		if (arr[row][j] != 0) {
			tmp.push(arr[row][j]);
		}
		arr[row][j] = 0;
	}
	for (j=0; j<4; j++) {
		if (j<tmp.length) {
			arr[row][j] = tmp[j];
		}
	}
}

function to_right(row) {
	var j, r;
	var tmp, nums;
	tmp = [];
	nums = 0;
	j = 3;
	while (j > 0) {
		if (arr[row][j] !== 0) {
			r = j - 1;
			while (arr[row][r] === 0) {
				r --;
				if (r <= 0) {
					break;
				}
			}
			if (r<0) {
				break;
			}
			if (arr[row][j] === arr[row][r]) {
				arr[row][j] *= 2;
				arr[row][r] = 0;
				add.innerHTML = '+'+arr[row][j];
				total += arr[row][j];
				add.style.opacity = 0;
				add.style.top = '-50%';
				if (!flag) {
					b_n.innerHTML = total;
				}
				s_n.innerHTML = total;
				j = r - 1;
			}
			else {
				j = r;
			}
		}
		else {
			j --;			
		}
	}
	for (j=0; j<4; j++) {
		if (arr[row][j] != 0) {
			tmp.push(arr[row][j]);
			nums ++;
		}
		arr[row][j] = 0;
	}
	r = 3;
	for (nums=nums-1; nums>=0; nums--) {
		arr[row][r] = tmp[nums];
		r --;
	}
}

function to_top(col) {
	var i, k;
	var tmp = [];
	i = 0;
	while (i < 3) {
		if (arr[i][col] !== 0) {
			k = i + 1;
			while (arr[k][col] === 0) {
				k ++;
				if (k >= 3) {
					break;
				}
			}
			if (k > 3) {
				break;
			}
			if (arr[i][col] === arr[k][col]) {
				arr[i][col] *= 2;
				arr[k][col] = 0;
				add.innerHTML = '+'+arr[i][col];
				total += arr[i][col];
				add.style.opacity = 0;
				add.style.top = '-50%';
				if (!flag) {
					b_n.innerHTML = total;
				}
				s_n.innerHTML = total;
				i = k+1;
			}
			else {
				i = k;
			}
		}
		else {
			i ++;			
		}
	}

	for (i=0; i<4; i++) {
		if (arr[i][col] != 0) {
			tmp.push(arr[i][col]);
		}
		arr[i][col] = 0;
	}
	for (i=0; i<4; i++) {
		if (i<tmp.length) {
			arr[i][col] = tmp[i];
		}
	}
}

function to_bottom(col) {
	var i, r;
	var tmp, nums;
	tmp = [];
	nums = 0;
	i = 3;
	while (i > 0) {
		if (arr[i][col] !== 0) {
			r = i - 1;
			while (arr[r][col] === 0) {
				r --;
				if (r <= 0) {
					break;
				}
			}
			if (r < 0) {
				break;
			}
			if (arr[i][col] === arr[r][col]) {
				arr[i][col] *= 2;
				arr[r][col] = 0;
				add.innerHTML = '+'+arr[i][col];
				total += arr[i][col];
				add.style.opacity = 0;
				add.style.top = '-50%';
				if (!flag) {
					b_n.innerHTML = total;
				}
				s_n.innerHTML = total;
				i = r-1;
			}
			else {
				i = r;
			}
		}
		else {
			i --;			
		}
	}

	for (i=0; i<4; i++) {
		if (arr[i][col] != 0) {
			tmp.push(arr[i][col]);
			nums ++;
		}
		arr[i][col] = 0;
	}
	r = 3;
	for (nums=nums-1; nums>=0; nums--) {
		arr[r][col] = tmp[nums];
		r --;
	}
}

var startX, startY,
	endX, endY,
	x, y;

document.addEventListener('touchmove', function (event) {
	event.preventDefault();
}, false);

main.addEventListener('touchstart', function (event) {
	event.preventDefault();
	f_num = 0;
	startX = event.touches[0].clientX;
	startY = event.touches[0].clientY;
	for (i=0; i<4; i++) {
		for (j=0; j<4; j++) {
			gene_tmp[i][j] = arr[i][j];			
		}
	}
}, false);
main.addEventListener('touchmove', function (event) {
	event.preventDefault();	
}, false);
main.addEventListener('touchend', function () {
	endX = event.changedTouches[0].clientX;
	endY = event.changedTouches[0].clientY;

	x = endX - startX;
	y = endY - startY;
	
	if (Math.abs(x) > Math.abs(y) && x > 0) {
		for (i=0; i<4; i++) {
			to_right(i); // 四行
		}
	}
	else if (Math.abs(x) > Math.abs(y) && x < 0) {
		for (i=0; i<4; i++) {
			to_left(i); // 四行
		}
	}
	else if (Math.abs(y) > Math.abs(x) && y > 0) {
		for (j=0; j<4; j++) {
			to_bottom(j); // 四列
		}
	}
	else if (Math.abs(y) > Math.abs(x) && y < 0) {
		for (j=0; j<4; j++) {
			to_top(j); // 四列			
		}
	}
	paint();	
	for (i=0; i<4; i++) {
		for (j=0; j<4; j++) {
			if (gene_tmp[i][j] == arr[i][j] && arr[i][j] != 0) {
				f_num ++;
			}
		}
	}
	if (f_num == 16) {
		end.style.display = 'block';
		var speed = 1/6;
		var timer = null;
		var opacity = 0;
		get.innerHTML = total;
		if (localStorage.getItem('best')) {
			if (total > localStorage.getItem('best')) {
				localStorage.setItem('best', total);
			}
		} else {
			localStorage.setItem('best', total);
		}
		clearInterval(timer);
		timer = setInterval(function () {
			if (opacity >= 1) {
				clearInterval(timer);
			}
			opacity += speed;
			end.style.opacity = opacity;
		}, 30)
	}
	setTimeout(function () {
		setTimeout(function () {
			add.style.opacity = 1;
			add.style.top = '50%';
			add.innerHTML = '';
		}, 600)
outer:		for (i=0; i<4; i++) {
				for (j=0; j<4; j++) {
					if (gene_tmp[i][j] !== arr[i][j]) {
						generate();
						break outer;
					}
				}
			}
		paint();
	}, 60)
}, false);
init();

new_game.addEventListener('touchstart', init, false);
qued.addEventListener('touchstart', function () {
	var speed = 1/6;
	var timer = null;
	var opacity = 1;
	clearInterval(timer);
	timer = setInterval(function () {
		if (opacity <= 0) {
			clearInterval(timer);
			end.style.display = 'none';
			init();
		}
		opacity -= speed;
		end.style.opacity = opacity;
	}, 30)
}, false)