 /*************************************************************
  * #倒计时
  * @param  {number}   count      	倒计时总时间（默认：0）
  * @param  {string}   fmtStr      	格式化字符串（默认：'#{count}秒后重新发送'）
  * @param  {string}   endStr 		计时完成后按钮显示该字符串（默认：'免费获取验证码'）
  * 
  * demo:  $('#id').countdown(60, '重新发送（#{count}）', '重新发送验证码');
  * 
  *************************************************************/
 $.fn.countdown = function(count, fmtStr, endStr) {
         var _self = this,
             _count = count || 60,
             _fmtStr = fmtStr || '#{count}秒后重新发送',
             _endStr = endStr || '免费获取验证码',
             _interval = null;

         _self.html(_fmtStr.replace('#{count}', _count)).addClass('disabled');
         _interval = setInterval(function() {
             _count--;
             if (_count == 0) {
                 _self.html(_endStr).removeClass('disabled');
                 clearInterval(_interval);
             } else {
                 _self.html(_fmtStr.replace('#{count}', _count));
             }
         }, 1000);

         return _interval;
     }
     /******************************************************************
      * 序列化对象为表单字符串
      ******************************************************************/
 function serializeBy(obj) {
     var arr = [];

     for (var i in obj) {
         arr.push(i + '=' + encodeURIComponent(obj[i].toString()));
     }
     return arr.join('&');
 }


 /******************************************************************
  * 图片加载后完执行
  * @param  {string}   url      [图片地址]
  * @param  {function} callback [回调函数]
  *
  ******************************************************************/
 function loadImage(url, callback) {
     var img = new Image();

     img.src = url;

     if (img.complete) {
         // 如果图片已经存在于浏览器缓存，直接调用回调函数
         callback.call(img);
         return;
     }
     img.onload = function() {
         //图片下载完毕时异步调用callback函数。
         callback.call(img);
     };
 }