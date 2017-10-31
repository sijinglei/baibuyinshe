$(function() {
    //初始化
    setWallet.init();
});

var setWallet = {
    params: {
        pageIndex: 1,
        pageSize: 10
    },
    init: function() {
        this.bindEvent();
        this.loadTableList(1);
    },
    bindEvent: function() {
        $('.login-box-head').on('click', 'a', function() {
            var showid = $(this).data('showid');
            $(this).addClass('actived').siblings().removeClass('actived');
            $('.login-box-inner').addClass('hide');
            $(showid).removeClass('hide');
        });
    },
    loadTableList: function(thisPage) {
        var _this = this,
            params = _this.params;
        params.pageIndex = thisPage;
        //ajax请求数据

        $('#page').tPaginator({
            current: thisPage, // 设置当前页
            pageCount: Math.ceil(20 / params.pageSize), // 设置总页数
            callback: function(thisPage) {
                _this.loadTableList(thisPage);
            }
        });
    }
};