$(function() {
    //初始化
    indexPage.init();
});
var $equipmentList = $('.equipment-list>ul');
var indexPage = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        $('#areaId').select2({ width: '150px' });
        $('#fullpage').fullpage({
            paddingTop: '100px',
            paddingBottom: '156px'
        });
        //
        $('.btn-moveright').on('click', function() {
            $(this).closest('.page-wrpa').addClass('on');
        });
        $('.btn-cirle').on('click', function() {
            $(this).closest('.page-wrpa').removeClass('on');
        });
        $('.point').on('click', function() {
            $.fn.fullpage.moveSectionDown();
        });
        $('.tab-bar').on('click', 'a', function() {
            var $this = $(this),
                type = $this.data('type');
            $this.addClass('actived').siblings('a').removeClass('actived');
            _this.loadData(type);
        });
        $equipmentList.on('click', 'li', function() {
            $(this).addClass('actived').siblings().removeClass('actived');
            alert('已选择：地址id' + $(this).data('id') + ',可以进行下一步');
        });
    },
    //根据type类型获取不同的数据
    loadData: function(type) {
        var _this = this;
        // $.ajax({
        //     type: "get",
        //     url: "url",
        //     data: "data",
        //     dataType: "dataType",
        //     success: function (response) {
        //模拟数据
        var data = [{
            id: 1,
            name: '粤海大厦腾讯大厦',
            address: '广东省深圳市宝安区新安街道45区自由…',
            fileNum: 220,
            photoNum: 300
        }, {
            id: 2,
            name: '粤海大厦腾讯大厦' + type,
            address: '广东省深圳市宝安区新安街道45区自由…',
            fileNum: 240,
            photoNum: 350
        }];
        $equipmentList.html(_this.createHtml(data));
        //     }
        //});
    },
    createHtml: function(data) {
        var _htmlLi = '';
        if (data && data.length > 0) {
            $.map(data, function(item, index) {
                _htmlLi += '<li data-id="' + item.id + '">' +
                    '<div class="col-2 fl "> ' + item.name + '</div>' +
                    '<div class="col-4 fl"> ' + item.address + ' </div>' +
                    '<div class="col-2 fl"><i class="fa fa-file"></i>可用纸张' + item.fileNum + '张</div>' +
                    '<div class="col-2 fl"><i class="fa fa-fileimg"></i>可用相纸' + item.photoNum + '张</div>' +
                    '</li>';
            });
        }
        return _htmlLi;
    }
};