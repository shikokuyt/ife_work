/*
 * 事件流处理函数
 * @param { func, ctx}
 * @return void
 */
function throttle(method, context) {
	clearTimeout(method.tId);
	method.tId = setTimeout(function () {
		method.call(context);
	}, 100);
}

/*
 * 只执行一次函数
 * @param {func, ctx}
 * @return {func}
 */
function runOnce(method, context) {
	return function () {
		try {
			method.apply(context || this, arguments);
		} catch (e) {}
		finally { method = null; }
	}
}

(function ($, window) {
	/*
	  锚节点跳转
	*/
	$('.nav').delegate('a', 'click', function(event) {
			var href = $(this).attr('data-href');
			$('html, body').animate({
				scrollTop: $(href).offset().top
				},
				600);
	});

	/*
	 * 返回顶部
	 * 检测DOCUMENT的scroll事件
	 * 并用事件流来处理
	 */
	function show_back() {
		$back = $('#back_top');
		if ($(this).scrollTop() >= 150) {
			$back
			.css('display', 'block')
			.click(function () {
				$('html, body').animate({
					scrollTop: 0
				},
				600);
			});
		} else {
			$back.css('display', 'none');
		}
	}


	$(document).on('scroll', function (event) {
		if ($(this).scrollTop() >= 700) {
			runOnce(show_skill)();
		}
		throttle(show_back, this)
	})


	function show_skill() {
		var $how = $('.how');
		;
		$how.each(function(index, el) {
			var $this = $(this);
			var width = $this.attr('data-value')
			$this.animate({
				'width': width},
				450, function() {
				if (parseInt(width) >= 50 ) {
					$this.find('.name, .progress').animate({'marginTop': 0}, 600);
				} else {
					$this.attr('title', 'NODE.JS '+width)
				}
			});
		});
	}

	/*
	 * 作品展示
	 */
	var $work = $('.portfolio');
	var $prev = $work.find('.prev');
	var $next = $work.find('.next');
	var index = 0;
	var Page = (function() {
		var 
			slicebox = $( '.sb-slider' ).slicebox( {
				orientation : 'r',
				cuboidsRandom : true,
				disperseFactor : 30
			} ),
			
			init = function() {
				initEvents();
				/* 渲染 work */
				$('.portfolio').find('.aside').html(window.tppl($('#work')[0].innerHTML, window.project[index]));
			},
			initEvents = function() {
				// add navigation events
				$prev.on( 'click', function() {
					index --;
					if (index < 0) {
						index = window.project.length - 1;
					}
					slicebox.previous();
					/* 渲染 work */
					$('.portfolio').find('.aside').html(window.tppl($('#work')[0].innerHTML, window.project[index]));
					return false;
				} );
				$next.on( 'click', function() {
					index ++;
					if (index >= window.project.length) {
						index = 0;
					}
					slicebox.next();
					/* 渲染 work */
					$('.portfolio').find('.aside').html(window.tppl($('#work')[0].innerHTML, window.project[index]));
					return false;
				} );
			};
			return { init : init };
	})();

	/*
	 * 程序初始化
	 */
	function init() {
		Page.init();
		$('#typed-name').typed({
			strings: ['Welcome To You!'],
			typeSpeed: 60,
			startDelay: 100,
			callback: function () {
				$('.typed-cursor').remove();
				$('#typed-words').typed({
					strings: ['My name is 周宇涛', 'I\'m a Front-End Developer study in HDU. '],
					typeSpeed: 60,
					startDelay: 100,
					backSpeed: 60
				})
				$('.typed-cursor').remove();
			}
		})
	}
	init();
})(jQuery, window);