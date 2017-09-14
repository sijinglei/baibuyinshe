/*****************************************************
 * 为下拉列表填充数据
 * Author  : wench
 * Update  : Richa
 * Date    : 2016-01-21
 * Params  : {
		data 	   : null,		// 本地数据对象
		ajax 	   : null,		// ajax请求参数
		text	   : 'name',	// option文本存放于data对象中的属性名
		value 	   : 'code',	// option值（value）存放于data对象中的属性名
		attr       : [],      	// option值（其他值）存放于data对象中的属性名
		hasEmpty   : true,		// 是否拥有空值选项
		emptyText  : '',		// 空值时显示的字符串
		initValue  : '',		// 默认初始值
		onChange   : null,		// 值发生变化时触发的回调函数
		onComplete : null		// 成功填充数据后触发的回调函数
   }

 * Example :
 * 
  		// 城市级联
  		$('#province').combobox({
  			ajax: { url: 'public/info/province.html?tk=' + new Date().getTime() },
  			emptyText: '省',
  			hasEmpty: true,
  			text : 'name',
			value : 'provinceId',
  			onChange: function(id, text) {
  				$('#city').combobox({
  					ajax: { url: 'public/info/city.html?pid=' + id },
  					text : 'name',
					value : 'cityId',
  					onComplete: function() {
  						this.tSelect();
  					}
  				});
  			},
  			onComplete: function() {
  				// 这里写成功填充数据后做的操作，比如：
  				// this.tSelect();
  			}
  		});
 
 
  		// 本地数据对象直接填充下拉列表
  		$('#demo').combobox({
  			data: [
  				{ name: '列表项一', code: '0' },
  				{ name: '列表项二', code: '1' },
  				{ name: '列表项三', code: '2' },
  			]
  		});
 		
 */

(function($) {

	$.fn.combobox = function(params) {

		// 支持批量操作
		if(this.length > 1){
			this.each(function(){$(this).combobox(params)});
			return this;
		}

		var _self 		= this;
		var _data		= null;

		var _defaults 	= {
			data 	   : null,		// 本地数据对象
			ajax 	   : null,		// ajax请求参数
			text	   : 'name',	// option文本存放于data对象中的属性名
			value 	   : 'code',	// option值（value）存放于data对象中的属性名
			attr       : [],      // option值（其他值）存放于data对象中的属性名
			hasEmpty   : false,		// 是否拥有空值选项
			emptyText  : '',		// 空值时显示的字符串
			initValue  : '',		// 默认初始值
			onChange   : null,		// 值发生变化时触发的回调函数
			onComplete : null		// 成功填充数据后触发的回调函数
		};

		$.extend(_defaults, params || {});

		if ($.isFunction(_defaults.initValue)) {
			_defaults.initValue = _defaults.initValue(_self);
		}

		_data = _defaults.data || getDataByAjax(_defaults.ajax);

		fillBox(_self, _data, _defaults);

		if ($.isFunction(_defaults.onChange) && !_self.hasClass('actived')) {
			_self.addClass('actived').on('change', function() {
				_defaults.onChange.call(_self, _self.val(), _self.find("option:selected").text());
			});
		}

		if ($.isFunction(_defaults.onComplete)) {
			_defaults.onComplete.call(_self);
			_self.trigger('change').trigger('blur');
		}

		return this;
	};


	/**
	 * 发送ajax请求获取数据
	 * @param  {object} ajax 配置参数
	 * @return {object}      一个数组
	 */
	function getDataByAjax(ajax) {
		if (!ajax) return null;

		var _result = null;
		var _ajax = {
			type: 'get',
			async: false,
			cache: false,
			success: function(data) {
				_result = data;
			}
		};

		$.extend(_ajax, ajax);
		$.ajax(_ajax);

		return _result;
	}


	/**
	 * 填充代码
	 * @param  {object} self    目标下拉列表对象
	 * @param  {object} data    数据
	 * @param  {object} config  相关配置
	 */
	function fillBox(self, data, config) {
		var _data = data || [],
			_html = '';

		if ((config.hasEmpty || _data.length == 0) && config.emptyText !== undefined) {
			_html += '<option value="">' + config.emptyText + '</option>';
		}

		for (var i = 0; i < _data.length; i++) {
			if (_data[i][config.value] == config.initValue) {

				if (config.attr instanceof Array || config.attr.length !=0 ) {
					var dataArr='';
					$.each(config.attr, function(index, val) {
						dataArr+='data-'+val+'='+_data[i][val]+' ';
					});
					_html += '<option value="'+ _data[i][config.value] +'" '+dataArr+' selected="selected">'+ _data[i][config.text] +'</option>';

				}else{
					_html += '<option value="'+ _data[i][config.value] +'" selected="selected">'+ _data[i][config.text] +'</option>';
				}
				
			} else {
				if (config.attr instanceof Array || config.attr.length !=0 ) {
					var dataArr='';
					$.each(config.attr, function(index, val) {
						dataArr+='data-'+val+'='+_data[i][val]+' ';
					});
					_html += '<option value="'+ _data[i][config.value] +'" '+dataArr+'>'+ _data[i][config.text] +'</option>';

				}else{
					_html += '<option value="'+ _data[i][config.value] +'">'+ _data[i][config.text] +'</option>';
				}
			
			}
		};

		self.html(_html);

	}

})(jQuery);
