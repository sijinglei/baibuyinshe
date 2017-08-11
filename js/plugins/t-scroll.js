/*
 * author       : Richa
 * date      	: 2015-09-28
 * description  : 基于jQuery的滚动条插件，使用前需先引入jQuery.mousewheel.js
 */


/**
 * demo:
	
	// 初始化
	$selector.tScroll({
		skin: 'custom-style',
		height: 400,
		unit: 200
	});


	// 刷新
	var scrollObj = $selector.tScroll();
	scrollObj.reset({
		skin: 'custom-style',
		height: 400,
		unit: 200
	});


	// 跳转到指定位置
	scrollObj.scrollTo(100);


	// 获取当前位置
	var scrollTop = scrollObj.scrollTo();


	// 跳转到指定元素(第二个参数为偏移量)
	var scrollTop = scrollObj.scrollToElem('.target', 0);

 * 
 */


define(['jquery', 'mousewheel'], function($) {


	$.fn.tScroll = function(options) {

		if(this.length == 0) return this;

		// 支持批量操作
		if(this.length > 1){
			this.each(function(){$(this).tScroll(options)});
			return this;
		}

		var self = this;						 	// 容器
		var content = self.children(':first');		// 内容
		var slider;									// 滑块

		if (content.length == 0) return false;


		/**
		 * ===================================================================================
		 * = 定义变量
		 * ===================================================================================
		 */
		
		var self_H,			// 容器高度
			content_H,		// 内容高度
			slider_H;		// 滑块高度

		var contentTop,		// 当前内容的 top 偏移量
			sliderTop;		// 当前滑块的 top 偏移量

		var unit;			// 鼠标滚动一次的内容单位偏移量



		/**
		 * ===================================================================================
		 * = 定义函数
		 * ===================================================================================
		 */
		
		/**
		 * 初始化
		 */
		var init = function() {

			// 添加滚动条代码，设置样式
			if (!self.hasClass('t-scroll')) {
				self.addClass('t-scroll').append('<div class="t-scrollbar"><div class="t-slider"><div class="t-scrollbar-bg"></div></div><div class="t-scrollbar-bg"></div></div>');
				content.addClass('t-scroll-content');
			}
			

			// 构造组件
			construct(options);

		}


		/**
		 * 构造组件
		 */
		var construct = function(_options) {

			// 设置自定义样式、高度以及变量
			if (_options) {
				_options.skin && self.addClass(_options.skin);
				_options.height && self.height(_options.height);
				unit = _options.unit || 0;
			}

			// 计算容器、内容、滑块的高度
			self_H 		= self.height();
			content_H 	= content.outerHeight();
			slider_H	= self_H * self_H / content_H;
			
			// 设置滑块高度
			slider 		= self.find('.t-slider').height(slider_H);

			// 计算单位偏移量
			unit 		= unit || (self_H * 0.25 > 50 ? self_H * 0.25 : 50);

			// 默认置顶
			scrollTo(0);

			// 取消原有的滚动事件，因为当滚动元素高度小于容器高度时并不需要该事件
			self.unmousewheel();


			if (content_H > self_H) {

				self.addClass('t-scroll-active');		// 表示此时滚动组件为激活状态
				content.addClass('t-transition');		// 添加平滑过渡效果

				// 定义鼠标滚动事件
				self.mousewheel(function(e, delta) {

					scrollTo(-contentTop - delta * unit);

					e.stopPropagation();
					e.preventDefault();
				});

				// 注销原滑块的 mousedown 事件
				slider.off('mousedown');

				// 重新定义滑块的 mousedown 事件
				slider.on('mousedown', function(e1) {

					// 记录原坐标
					var pageY 		= e1.pageY;
					var _sliderTop 	= sliderTop;

					// 移除平滑过渡效果
					content.removeClass('t-transition');

					// 为document元素添加鼠标移动事件
					$(document).on('mousemove', function(e2) {

						scrollTo((_sliderTop + e2.pageY - pageY) * content_H / self_H);

						// 取消浏览器默认行为，在拖动过程中防止文字被选中
						e2.preventDefault();

					}).on('mouseup', function() {

						// 添加平滑过渡效果
						content.addClass('t-transition');

						// 注销事件
						$(document).off('mousemove mouseup');

					});

					e1.preventDefault();
				});

			} else {

				// 此时不出现滚动条
				self.removeClass('t-scroll-active');

			}

		}


		/**
		 * 滚动到指定位置
		 */
		var scrollTo = function(y) {

			y = y <= 0 ? 0 : (y < content_H - self_H ? y : content_H - self_H);

			contentTop 	= -y;
			sliderTop 	= y * self_H / content_H;
			content.css('top', contentTop);
			slider.css('top', sliderTop);

		}


		/**
		 * 计算指定元素在内容中的相对位置
		 */
		var getTopByContent = function(elem, top) {

			var t = top ? top : 0;
			t += elem.position().top;
			return elem.parent().hasClass('t-scroll-content') ? t : getTopByContent(elem.parent(), t);

		}


		/**
		 * ===================================================================================
		 * = 开发外部接口
		 * ===================================================================================
		 */
		
		/**
		 * 根据传入的数值滚动到指定位置
		 */
		self.scrollTo = function(y) {
			if (y === undefined) {
				return -contentTop;
			} else {
				scrollTo(parseInt(y));
				return self;
			}
		};


		/**
		 * 根据传入的 jQuery选择器 滚动到指定位置
		 */
		self.scrollToElem = function(selector, offset) {
			if (typeof selector === 'string') {

				var node = content.find(selector).eq(0);
				if (node.length > 0) scrollTo(getTopByContent(node, offset || 0));

			}

			return self;
		};


		/**
		 * 刷新组件
		 */
		self.reset = function(options) {

			construct(options);

			return self;
			
		};



		init();

		// 返回jQuery对象本身
		return this;

	}

});