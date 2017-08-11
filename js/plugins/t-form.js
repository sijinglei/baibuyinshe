/*
 * author       : Richa
 * date      	: 2015-11-03
 * description  : 表单工具
 */


define(['jquery', 'global', 'tScroll'], function($) {


	/**
	 * 该变量用来储存当点击document时触发的动作，如当下拉组件显示时，点击组件外面的任何区域应该让组件关闭，前提是组件关闭的事件应该写进该变量
	 */
	var forDocumentClick = {};

	$(document).on('mousedown', function(event) {

		for (var e in forDocumentClick) {
			forDocumentClick[e]();
		};

	});






	/**
	 * 控制下拉组件缩放
	 * @param  {string} option
	 *
	 * html代码: 	<!-- data-mode为2时鼠标移入组件时显示组件，移出组件隐藏组件；为3时鼠标移入组件时显示组件，需要点击按钮或者组件外部才能隐藏组件 -->
	 * 				<!-- t-dropdown-up为上拉 -->
	 * 				<div class="t-dropdown t-dropdown-up" id="dropdown" data-mode="2">
	 * 					<div class="t-dropdown-btn">按钮</div>
	 * 					<div class="t-dropdown-content">内容</div>
	 * 				</div>
	 * 
	 * demo1: $('#dropdown').tDropdown();				下拉组件初始化
	 * demo2: $('#dropdown').tDropdown('open');			显示下拉组件
	 * demo3: $('#dropdown').tDropdown('close');		隐藏下拉组件
	 * demo4: $('#dropdown').tDropdown('toggle');		切换下拉组件
	 * demo5: $('#dropdown').tDropdown('disable');		不可用
	 * demo6: $('#dropdown').tDropdown({				带回调函数
	 *     onOpen: function() {},
	 *     onClose: function() {}
	 * });
	 * 
	 */
	$.fn.tDropdown = function(option) {

		if(this.length == 0) return this;

		// 支持批量操作
		if(this.length > 1){
			this.each(function(){$(this).tDropdown(option)});
			return this;
		}

		var self = this;						 		// 容器
		var btn  = self.find('.t-dropdown-btn');		// 组件按钮
		var menu = self.find('.t-dropdown-content');	// 组件内容
		var mode = self.data('mode');					// 组件的调用模式


		/**
		 * 初始化
		 */
		var init = function() {

			self.isOpen = false;

			// 如果组件未被初始化，添加初始化标识，以及绑定组件事件
			if (!self.hasClass('t-dropdown-active')) {

				// 表示此时组件已被初始化
				self.addClass('t-dropdown-active');

				self.on('mousedown', function(event) {
					event.stopPropagation();
				});


				if (mode == '2') {

					// 鼠标移入组件时显示组件，移出组件隐藏组件
					self.on('mouseleave', close).on('mouseenter', '.t-dropdown-btn', open);

				} else if(mode == '3') {

					// 鼠标移入组件时显示组件，需要点击按钮或者组件外部才能隐藏组件
					self.on('mouseenter', '.t-dropdown-btn', open).on('click', '.t-dropdown-btn', close);

				} else {

					// 默认模式，显示或隐藏组件都需要点击触发
					self.on('click', '.t-dropdown-btn', function() {
						if (!self.hasClass('t-disabled')) {
							self.hasClass('t-open') ? close() : open();
						}
					});

				}

			}

			switch(option) {

				case 'open':
					open();
					break;

				case 'close':
					close();
					break;

				case 'toggle':
					self.hasClass('t-open') ? close() : open();
					break;

				case 'disable':
					self.addClass('t-disabled');
					break;

				default:
					break;

			}

		}


		/**
		 * 展开下拉组件
		 */
		var open = function() {
			// 收缩其他下拉组件
			if (forDocumentClick.dropdown) {
				forDocumentClick.dropdown()
			}
			self.isOpen = true;
			self.addClass('t-open');
			forDocumentClick.dropdown = close;

			if (option && option.onOpen) {
				option.onOpen();
			}
		}


		/**
		 * 收缩下拉组件
		 */
		var close = function() {
			self.isOpen = false;
			self.removeClass('t-open');
			forDocumentClick.dropdown = function() {};
			
			if (option && option.onClose) {
				option.onClose();
			}
		}


		/**
		 * ===================================================================================
		 * = 开发外部接口
		 * ===================================================================================
		 */
		
		self.open = open;
		self.close = close;




		init();

		// 返回jQuery对象本身
		return this;

	}












	/**
	 * 下拉列表(原理就是特殊的下拉组件)
	 * @param  {object} options
	 *
	 * demo1: $('select').tSelect();				下拉组件初始化
	 * demo2: $('select').tSelect('disable');		下拉组件禁用
	 * demo3: $('select').tSelect({					带参数的初始化
	 *
	 *		mode: 1,				// 下拉模式，同下拉组件的mode，默认为1
	 *		maxHeight: 300,			// 下拉列表的最大高度，默认为300px
	 *		dropUp: 1				// 是否为上拉，默认为 0（下拉）
	 *		skin: 'select-1'		// 自定义class属性
	 * 
	 * });
	 */
	$.fn.tSelect = function(options) {

		if(this.length == 0) return this;

		// 支持批量操作
		if(this.length > 1){
			this.each(function(){$(this).tSelect(options)});
			return this;
		}


		var self 			= this;							// select对象
		var self_options 	= self.find('option');			// option选项
		var config = {

			mode: 1,			// 下拉模式
			maxHeight: 300,		// 列表最大高度
			dropUp: 0			// 是否为上拉

		};


		/**
		 * 初始化
		 */
		var init = function() {

			// 更新配置参数
			if (options && typeof options === 'object') {
				config = $.extend(config, options);
			}


			// 如果组件未被初始化，以及绑定组件事件
			if (self.next('.t-select').length < 1) {

				// 隐藏原select元素
				self.hide();

				self.outlook = $('<div class="t-select t-dropdown '+ (config.dropUp ? 't-dropdown-up ' : '') + (config.skin ? config.skin : '') +'" data-mode="'+ config.mode +'">'+ getSelectCode() +'</div>');

				// 添加下拉列表模型
				self.after(self.outlook);

				// 初始化下拉组件
				self.outlook.tDropdown(options === 'disable' ? 'disable' : '');


				// 绑定事件
				self.outlook.on('click', 'li', function() {
					var $self = $(this);
					var $btn = self.outlook.find('.t-dropdown-btn');
					var currentText = $self.find('.t-select-text').text();

					self.find('option').eq($self.data('index')).prop('selected', true);
					$self.addClass('t-checked').siblings().removeClass('t-checked');
					$btn.html('<span>'+ currentText +'</span>')[$self.data('value') === '' ? 'addClass' : 'removeClass']('t-empty');
					self.outlook.tDropdown('close');
					self.trigger('change').trigger('blur');
				});


			} else {

				self.outlook = self.next('.t-select');
				reDraw(self.next('.t-select'));

			}

			// 刷新滚动条
			self.outlook.find('.t-dropdown-content').tScroll();

		}


		/**
		 * 布局
		 */
		var getSelectCode = function() {
			var current = self.find('option:selected');
			var currentText = current.text();
			var currentVal = current.val();
			var html = '<a class="t-dropdown-btn '+ (currentVal === '' ? 't-empty' : '') +'" href="javascript:;"><span>'+ currentText +'</span></a><div class="t-dropdown-content" style="max-height:'+ config.maxHeight +'px;"><ul>';

			self[currentVal === '' ? 'removeClass' : 'addClass']('edited');

			$.each(self_options, function(index, el) {
				var _el = $(el);
				html += '<li data-index="'+ index +'" data-value="'+ _el.attr('value') +'" class="'+ (_el.is(':selected') ? 't-checked' : '') +'"><span class="t-select-text">'+ _el.text() +'</span><i class="t-select-icon"></i></li>';
			});

			html += '</ul></div>';

			return html;

		};


		/**
		 * 刷新组件
		 */
		var reDraw = function(elem) {

			elem.data('mode', config.mode);

			if (config.dropUp) {
				elem.addClass('t-dropdown-up');
			}

			elem.html(getSelectCode());

		};
		


		init();

		// 返回jQuery对象本身
		return this;

	}




	/**
	 * 可搜索输入框
	 * demo: $('input').tSearchable({
			ajax: null,								// ajax接口
  			text : 'name',							// 文本对应的属性
			value : 'code',							// id对应的属性
			maxHeight: 300,							// 最大高度
  			onChange: function(text, value) {}		// 当选中值时触发
	 * });
	 */
	$.fn.tSearchable = function(options) {

		if(this.length == 0) return this;

		// 支持批量操作
		if(this.length > 1){
			this.each(function(){$(this).tSearchable(options)});
			return this;
		}


		var self = this;
		
		var config = {

			ajax: null,								// ajax接口
  			text : 'name',							// 文本对应的属性
			value : 'code',							// id对应的属性
			maxHeight: 300,							// 最大高度
  			onChange: function(text, value) {}		// 当选中值时触发

		};

		var isok = true;				// 是否允许发送请求
		var hoverIndex = -1;			// hover索引
		var scrollObj = null;			// 滚动插件返回的对象
		var dropdownObj = null;			// 下拉组件返回的对象
		var searchResult = null;		// 用来储存查找后返回的数据


		/**
		 * 初始化
		 */
		var init = function() {

			// 更新配置参数
			if (options && typeof options === 'object') {
				config = $.extend(config, options);
			}
			

			self.dropdown = $('<div class="t-searchable t-dropdown"></div>');
			self.scrollPart = $('<div class="t-dropdown-content" style="max-height:'+ config.maxHeight +'px;"></div>');
			self.elems = $('<ul></ul>');


			// 组合代码
			self.after(self.dropdown);
			self.dropdown.append(self.scrollPart);
			self.scrollPart.append(self.elems);


			// 初始化下拉组件
			dropdownObj = self.dropdown.tDropdown({
				onClose: function() {
					selectCurrentHoverItem();
				}
			});


			// 初始化滚动组件
			scrollObj = self.scrollPart.tScroll();


			/**
			 * 绑定事件
			 */
			self.on('input', function() {
				search();
			});

			self.on('keydown', function(event) {
				event.stopPropagation();
				if (dropdownObj.isOpen) {
					if(event.which === 13){
						event.preventDefault();
						dropdownObj.close();

					} else if (event.which == 9) {
						dropdownObj.close();

					} else if (event.which == 40) {
						hoverNextItem();

					} else if (event.which == 38) {
						hoverPreviousItem();
					}
				}
			});

			self.elems.on('click', 'li', function(event) {
				event.stopPropagation();
				hoverIndex = $(this).index();
				dropdownObj.close();
			});

		}


		// 搜索数据
		var search = debounce(function() {
			if (isok) {
				isok = false;
				$.ajax({
					url: config.ajax.url + encodeURIComponent(self.val()),
					type: 'GET'
				})
				.done(function(data) {
					var html = '';
					searchResult = data;	// 储存查找结果
					isok = true;
					$.each(data, function(i, obj) {
						html += '<li data-value="'+ obj[config.value] +'" data-text="'+ obj[config.text] +'"><span>'+ obj[config.text] +'</span></li>'
					});
					self.elems.html(html);
					if (!dropdownObj.isOpen) {
						dropdownObj.open();
					}
					scrollObj.reset();						// 刷新滚动组件
					hoverIndex = -1;						// 重置hover索引
				});
			}
		}, 200);


		// 移动到下一个子项
		function hoverNextItem() {
			var $lis = self.elems.find('li');
			var currentItem, scrollTop;

			if (hoverIndex < self.elems.find('li').length - 1) {
				if (hoverIndex > -1) {
					$lis.eq(hoverIndex).removeClass('t-hover');
				}
				currentItem = self.elems.find('li').eq(++hoverIndex);
				scrollTop = scrollObj.scrollTo();
				currentItem.addClass('t-hover');
				if (currentItem.position().top - scrollTop > self.scrollPart.height()*0.8) {
					scrollObj.scrollTo(scrollTop + currentItem.outerHeight());
				}
			}
		}


		// 移动到上一个子项
		function hoverPreviousItem() {
			var $lis = self.elems.find('li');
			var currentItem, scrollTop;

			if (hoverIndex > 0) {
				$lis.eq(hoverIndex).removeClass('t-hover');
				currentItem = self.elems.find('li').eq(--hoverIndex);
				scrollTop = scrollObj.scrollTo();
				currentItem.addClass('t-hover');
				if (currentItem.position().top - scrollTop < self.scrollPart.height()*0.1) {
					scrollObj.scrollTo(scrollTop - currentItem.outerHeight());
				}
			}
		}


		// 选中当前值
		function selectCurrentHoverItem() {
			var text, value;
			var $item = self.elems.find('li').eq(hoverIndex);

			if (hoverIndex > -1) {
				text = $item.data('text');
				value = $item.data('value');
				self.val(text);
			} else {
				text = self.val();
				value = '';
				$.each(searchResult, function(i, obj) {
					if (obj[config.text] == text) {
						value = obj[config.value];
						return false;
					}
				});
			}

			config.onChange(text, value);				// 执行回调
			self.trigger('blur');
			self.trigger('focus');
		}




		init();

		// 返回jQuery对象本身
		return this;

	}





	/**
	 * 单选复选框
	 * @param  {string} options
	 *
	 * demo1: $('select').tCheck();					初始化
	 * demo2: $('select').tCheck('check');			设置checked状态
	 * demo2: $('select').tCheck('uncheck');		移除checked状态
	 * demo2: $('select').tCheck('toggle');			切换checked状态
	 * demo2: $('select').tCheck('disable');		设置disabled状态			
	 * demo2: $('select').tCheck('enable');			移除disabled状态
	 * demo2: $('select').tCheck('update');			更新
	 * 
	 */
	$.fn.tCheck = function(options) {

		if(this.length == 0) return this;

		// 支持批量操作
		if(this.length > 1){
			this.each(function(){$(this).tCheck(options)});
			return this;
		}


		var self = this;				// 元素本身
		var self_parent = null;			// 元素父节点
		var type = self.attr('type');	// 元素类型 'checkbox' or 'radio'


		/**
		 * 初始化
		 */
		var init = function() {

			if (self.is('input[type="checkbox"],input[type="radio"]')) {

				// 如果元素未初始化过
				if (!self.parent().hasClass('t-' + type)) {

					self.wrap('<div class="t-'+ type +' '+ (self.is(':checked') ? 't-checked' : '') +' '+ (self.is(':disabled') ? 't-disabled' : '') +'"></div>');

					// 绑定事件
					self.on('change', function() {

						update(self);

					});

				}

			}

			if (/^(check|uncheck|toggle|disable|enable|update)$/i.test(options)) {

				self_parent = self.parent();

				switch(options) {

					case 'check':
						self.prop('checked', true);
						update(self);
						break;

					case 'uncheck':
						self.prop('checked', false);
						self_parent.removeClass('t-checked');
						break;

					case 'toggle':
						if (self.is(':checked')) {
							self.prop('checked', false);
							self_parent.removeClass('t-checked');
						} else {
							self.prop('checked', true);
							update(self);
						}
						break;

					case 'disable':
						self.prop('disabled', true);
						self_parent.addClass('t-disabled');
						break;

					case 'enable':
						self.prop('disabled', false);
						self_parent.removeClass('t-disabled');
						break;

					case 'update':
						update(self);
						break;

					default:
						break;

				}

			}

		}



		/**
		 * 同步
		 * @param  {jqObject} elem
		 */
		var sync = function(elem) {

			var parent = elem.parent();

			if (elem.is(':checked')) {
				parent.addClass('t-checked');
			} else {
				parent.removeClass('t-checked');
			}


		}



		/**
		 * 更新
		 * @param  {jqObject} elem [description]
		 */
		var update = function(elem) {

			// 元素为单选按钮时，必须手动改变其他同name值的单选按钮的状态
			if (type == 'radio') {
				var form = elem.closest('form');
				var brother = form.find('[name="'+ elem.attr('name') +'"]');
				if (brother.length > 1) {
					$.each(brother, function(i, val) {
						sync($(this));
					});
				}
			} else {
				sync(elem);
			}

		}



		init();

		// 返回jQuery对象本身
		return this;

	}




	// 输入框有内容时显示标题（旧版表单UI）
    $(document).on('input change', 'input,textarea', function() {
        var $parent = $(this).closest('.forms-group');
        if ($parent.length > 0 && !$(this).hasClass('z-ignore')) {
            $(this).val() == '' ? $parent.removeClass('z-hasvalue') : $parent.addClass('z-hasvalue');
        }
    });
    $(document).on('change', 'select', function() {
        var $parent = $(this).closest('.forms-group');
        if ($parent.length > 0 && !$(this).hasClass('z-ignore')) {
            $(this).val() == '' ? $parent.removeClass('z-hasvalue') : $parent.addClass('z-hasvalue');
        }
    });



    // 表单UI交互脚本
    $(document).on('blur', '.form-line-input .form-control', function() {
		var self = $(this);

		if ($.trim(self.val()) === '') {
			self.removeClass('edited');
		} else {
			self.addClass('edited');
		}
	});

    // 文本域计算字数脚本
	$(document).on('input', '.form-line-input textarea.form-control', function() {
		var $this = $(this),
			$count = null,
			maxlength = null,
			current = null;

		if (!$this.attr('maxlength')) return false;
		$count = $this.siblings('.text-count');
		if ($count.length === 0) return false;
		maxlength = parseInt($this.attr('maxlength'));
		current = $this.val().length;
		$count.html(current + '&nbsp;&nbsp;/&nbsp;&nbsp;' + maxlength);
	});

    // 防止用户使用删除键
	$(document).find('input[readonly]').on('keydown', function() {
		return false;
	});

	// 页面刚加载时主动触发一次
	$(document).find('.form-line-input .form-control').trigger('blur');



});
