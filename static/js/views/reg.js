$(function() {
    //初始化
    loginAndRegister.init();
});

var loginAndRegister = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        $('#register-getsmscode').on('click', function() {
            _this.sendSms($(this));
        });
        //刷新验证码
        $('.v-code-img').on('click', function() {
            $(this).attr('src', 'http://dev.bbys.cn/captcha.html?' + Math.random());
        });

        $('#agree').on('change', function() {
            if ($(this).is(':checked')) {
                $('#submit-register').removeClass('disabled').bind('click', function() { _this.save(); });
            } else {
                $('#submit-register').addClass('disabled').unbind('click');
            }
        });
        $('#submit-register').on('click', function() {
            _this.save();
        });
    },
    save: function() {
        alert('注册成功');
    },
    sendSms: function(thisElem) {
        // 点击发送短信验证码（注册页面）
        var $this = thisElem,
            $mobile = $('#register-mobile'),
            $vcode = $('#register-vcode');

        if (!$this.hasClass('disabled')) { // && valid($mobile) && valid($vcode)验证必填
            $this.countdown(60, '#{count} s', '重新发送');
            $this.addClass('disabled');
            // $.ajax({
            //     type: 'POST',
            //     url: 'register/code',
            //     buffer: true,
            //     data: { mobile: $mobile.val(), valiCode: $vcode.val() },
            //     success: function(data) {
            //         if (data.code == 0) {
            //             // 发送成功
            //             $this.countdown(60, '#{count} s', '重新发送');
            //         } else {
            //             layer.alert(data.message);
            //             $('.v-code-img').click();
            //             $vcode.val('');
            //         }
            //     },
            //     error: function(data) {
            //         layer.alert(data.message || '网络错误，请稍后重试！');
            //         $('.v-code-img').click();
            //         $vcode.val('');
            //     }
            // });
        }
    }
};