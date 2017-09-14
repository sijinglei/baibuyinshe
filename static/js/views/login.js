$(function() {
    //初始化
    loginAndRegister.init();
});

var loginAndRegister = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        $('.login-box-head').on('click', 'a', function() {
            var showid = $(this).data('showid');
            $(this).addClass('actived').siblings().removeClass('actived');
            $('.login-box-inner').addClass('hide');
            $(showid).removeClass('hide');
        });
    }
};