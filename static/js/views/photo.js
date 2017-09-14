$(function() {
    //初始化
    common.init();
});

var common = {
    init: function() {
        photo.init();
        file.init();
        this.bindEvent();
    },
    bindEvent: function() {
        $('.btn-ok').on('click', function() {

            window.location.href = '/success.html';
        });
    }
}

var photo = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {

    }
};



//文档打印

var file = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        $('.file-list ').on('click', 'table>tbody>tr>td>div.single-sided >span.switch', function() {

            _this.clickHover($(this));
        });
        $('.file-list ').on('click', 'table>tbody>tr>td>div.what-color >span.switch', function() {

            _this.clickHover($(this));
        });
        $('.file-list ').on('click', 'table>tbody>tr>td>.fa-del', function() {
            $(this).closest('tr').remove();
        });
    },
    clickHover: function(thisElemt) {
        var $this = thisElemt;
        if ($this.hasClass('actived')) {
            $this.removeClass('actived');
            $this.siblings('span').addClass('actived');
        } else {
            $this.addClass('actived');
            $this.siblings('span').removeClass('actived');
        }
    }
}