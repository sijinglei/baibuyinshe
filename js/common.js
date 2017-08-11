/*
 * author       : Richa
 * date         : 2016-06-05
 * description  : 公用模块，几乎每个页面都要引入
 * 
 */

define([
    'jquery',
    'global',
    'dialog',
    'tForm',
    'tIM'
], function($, setBindCard) {

    var $win = $(window);
    var $document = $(document);

    /************************************************************************************************
     * 延迟执行函数
     *
     ************************************************************************************************/
    ;
    (function(window, delayfun) {

        var delay;

        delayfun.state = true;

        /**
         * [延迟初始化函数]
         * @param  {Number}   time     [延迟时间/毫秒]
         * @param  {Function} callback [回调函数]
         */
        delayfun.init = function(time, callback) {
            if (delayfun.state) {
                delayfun.state = false;
                delay = setTimeout(function() {
                    callback();
                    delayfun.state = true;
                }, time);
                delay = null;
            }
        }
        window.delayfun = delayfun;

    }(window, window.delayfun || {}));




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





    /************************************************************************************************
     * 头部信息总数/下拉
     *
     ************************************************************************************************/
    ;
    (function() {
        // 消息中心提示
        var userId = $('#userId').val();
        if (userId) {
            getAjax('msg/count.html', 'get', '', function(data) {
                if (data.total != 0) {
                    $('#t-msg-center').addClass('t-msg-btn');
                };
            })
        }


        // 下拉组件初始化
        $('#user').tDropdown();

    }());

    (function() {
        $('#register').click(function() {
            window.location.href = $('#contextPath').val() + '/tronker/register.html?backUrl=' + encodeURIComponent(window.location.href);
        });

        $('#login').click(function() {
            window.location.href = $('#contextPath').val() + '/tronker/login.html?backUrl=' + encodeURIComponent(window.location.href);
        });

        // 回到顶部
        $('#backtop').on('click', function() {
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        });

    }());

    // 初始化下拉组件
    $('.J_dropdown').tDropdown();


    //关闭悬浮提示
    $('#finance-info').on('click', '.icon-close', function() {
        $(this).closest('.header-info').remove();
    });


    // 当屏幕高度较高时使页脚固定在底部
    $win.on('resize', function() {
        $('#main-ft').css('position', $win.height() >= $document.height() ? 'fixed' : 'static');
    });
    $win.on('load', function() {
        $win.trigger('resize');
    });

    return {};

});