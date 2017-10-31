$(function() {
    //初始化
    setWallet.init();
});

var setWallet = {
    params: {
        pageIndex: 1,
        pageSize: 10 //每页显示多少条
    },
    init: function() {
        this.bindEvent();
        this.loadTableList(1, 1); //初始化加载第一个分类第一页数据
    },
    bindEvent: function() {
        var _this = this;
        //点击tab切换，并查询相应数据
        $('#walletTab').on('click', 'li', function() {
            var $li = $(this),
                type = $li.children('a').data('type');
            $li.addClass('actived').siblings().removeClass('actived');
            _this.params.pageIndex = 1;
            //每次点击切换不同类别，并加载对应类别的第一页数据
            _this.loadTableList(type, _this.params.pageIndex);
        });
    },
    loadTableList: function(type, thisPage) {
        var _this = this,
            params = _this.params;
        //ajax请求数据
        var postData = {
            type: type,
            thisPage: thisPage,
            pageSize: _this.params.pageSize
        };
        $.ajax({
            type: "get",
            url: "http://bbys.cn/index/user/wallet.html",
            data: postData,
            dataType: 'json',
            success: function(resData) {
                var tableHtml = _this.createTrHtml(type, resData.result);
                //如果存在数据才加载分页
                if (resData.recordCount > 0) {
                    $('#page').tPaginator({
                        current: thisPage, // 设置当前页
                        pageCount: Math.ceil(resData.recordCount / params.pageSize), // 设置总页数
                        callback: function(thisPage) {
                            console.log(thisPage);
                            _this.loadTableList(type, thisPage);
                        }
                    });
                }
                $('#table-list').html(tableHtml);
            }
        });
    },
    createTrHtml: function(type, data) {
        //type:1充值记录2消费记录3退款记录，可以根据type不同下面展示也可以不同
        var timeTip = '充值时间';
        if (type == 2) timeTip = '消费时间';
        if (type == 3) timeTip = '退款时间';
        var tHeadHtml = '<thead>' +
            '<tr>' +
            '<th>单号</th>' +
            '<th>金额</th>' +
            '<th>方式</th>' +
            '<th>' + timeTip + '</th>' +
            '</tr>' +
            '</thead><tbody>',
            trHtml = '';
        if (data.length > 0) {
            $.map(data, function(item, idx) {
                console.log(item);
                tHeadHtml += ' <tr>' +
                    '<td>' + item.order_sn + '</td>' +
                    '<td>' + item.trans_amount + '</td>' +
                    '<td>' + item.bank_name + '</td>' +
                    '<td>' + item.pay_time + '</td>' +
                    '</tr>';
            });
        }
        trHtml += '</tbody>';
        return tHeadHtml + trHtml;
    }
};