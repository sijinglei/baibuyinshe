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
        //刷新验证码
        $('.v-code-img').on('click', function() {
            $(this).attr('src', 'http://dev.bbys.cn/captcha.html?' + Math.random());
        });
    },
    login: function() {

    }
};