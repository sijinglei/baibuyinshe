/*
 * author       : Richa
 * date      	: 2015-11-03
 * description  : 基于jQuery的分页组件
 */


;(function($) {


	$.fn.tPaginator = function(options) {

		if(this.length == 0) return this;

		// 支持批量操作
		if(this.length > 1){
			this.each(function(){$(this).tPaginator(options)});
			return this;
		}

		var self = this;						 // 容器


		/**
		 * ===================================================================================
		 * = 定义变量
		 * ===================================================================================
		 */
		
		var size = 7;							// 组件显示的最多页码数量，只能是奇数

		var config = {

			current: 0,							// 当前页码
			pageCount: 0,						// 总页数
			callback: function() {}				// 回调函数

		};



		/**
		 * ===================================================================================
		 * = 定义函数
		 * ===================================================================================
		 */
		

		/**
		 * 初始化
		 */
		var init = function() {

			// 布局
			layout(options);

			if (!self.hasClass('t-paginator')) {
				self.addClass('t-paginator');
			}

			bindEvent();
		}


		/**
		 * 布局
		 */
		var layout = function(_options) {

			// 更新配置参数
			config = $.extend(config, _options);

			// 存放代码
			var html = '';

			// 总页数不超过一页时让组件隐藏
			if (config.pageCount <= 1) {
				self.addClass('t-hide');
				return false;
			} else {
				self.removeClass('t-hide');
			}

			// 组合“上一页”
			html += '<a class="'+ (config.current == 1 ? 't-disabled' : '') +'" href="javascript:;" data-type="prev">上一页</a>';

			if (config.pageCount <= size) {

				for (var i = 1; i <= config.pageCount; i++) {
					html += getCode(i);
				}

			} else {

				if (config.current > size / 2 + 1) {
					html += '<a class="t-page-num" href="javascript:;" data-type="num" data-num="1">1</a><span class="t-page-dot">...</span>';
				}

				var _start, _end;

				if (config.current < size / 2 + 1) {
					_start = 1;
					_end = size;
				} else if(config.current > config.pageCount - size / 2){
					_start = config.pageCount - size + 2;
					_end = config.pageCount + 1;
				} else {
					_start = config.current - (size - 3) / 2;
					_end = config.current + (size - 1) / 2;
				}

				for (var i = _start; i < _end; i++) {
					html += getCode(i);
				}

				if (config.current < config.pageCount - size / 2) {
					html += '<span class="t-page-dot">...</span><a class="t-page-num" href="javascript:;" data-type="num" data-num="'+ config.pageCount +'">'+ config.pageCount +'</a>';
				}


			}

			html += '<a class="'+ (config.current == config.pageCount ? 't-disabled' : '') +'" href="javascript:;" data-type="next">下一页</a>';

			// 添加代码
			self.html(html);

		}


		/**
		 * 拼凑代码
		 */
		var getCode = function(i) {

			var _html = '';

			if (config.current == i)
				_html = '<i class="t-current">'+ i +'</i>';
			else
				_html = '<a class="t-page-num" href="javascript:;" data-type="num" data-num="'+ i +'">'+ i +'</a>';

			return _html;

		}


		/**
		 * 事件定义
		 */
		function bindEvent() {

			self.find('a').on('click', function() {
				
				var $this = $(this);
				var type = $this.data('type');

				switch(type) {

					case 'num':
						var num = parseInt($this.data('num'));
						config.current = num;
						config.callback(config.current);
						break;

					case 'prev':
						if (!$this.hasClass('t-disabled')) {
							config.current--;
							config.callback(config.current);
						}
						break;

					case 'next':
						if (!$this.hasClass('t-disabled')) {
							config.current++;
							config.callback(config.current);
						}
						break;

					default:
						break;

				}


			});

		}






		init();

		// 返回jQuery对象本身
		return this;

	}

})(jQuery);