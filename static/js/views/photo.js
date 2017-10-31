$(function() {
    //初始化
    common.init();
});

var common = {
    init: function() {
        photo.init();
        file.init();
        this.bindEvent();
        this.initUpload();
    },
    bindEvent: function() {
        $('.btn-ok').on('click', function() {
            layer.open({
                    title: '账户详情',
                    type: 1,
                    area: ['500px'],
                    content: $('#order-wrap'),
                    success: function(layero, index) {
                        layero.find('#surePay').on('click', function() {
                            // $.ajax({
                            //     type: "method",
                            //     url: "url",
                            //     dataType: "json",
                            //     success: function (response) {
                            layer.alert('支付成功！', function() {
                                window.location.href = '/success.html';
                            });
                            //     }
                            // });
                        });
                    }
                })
                // window.location.href = '/success.html';
        });
    },
    initUpload: function() {
        // id:btnFileUpload
    }
};
//相册相关js
var photo = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;

        layer.photos({
            photos: '.photo-list',
            anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
        });
        $('.photo-list').on('click', 'table>tbody>tr>td>.fa-del', function() {
            $(this).closest('tr').remove();
        });

        $('#btnPhotoUpload').on('click', function() {
            layer.open({
                type: 1,
                area: ['780px', '600px'],
                content: $('#layer-wrap'),
                success: function(layero, index) {
                    _this.bindLayerEvent(layero);
                }
            });
        });

    },
    bindLayerEvent: function(layero) {
        var _this = this;
        layero.find('.btn-choose').on('click', function() {
            layer.alert('选择照片事件', { icon: 1 });
        });
        layero.find('.btn-ok').on('click', function() {
            layer.alert('开始上传事件', { icon: 1 });
        });
        layero.find('.layphoto-list').on('click', '.fa-btn-edit', function() {
            var id = $(this).parent().data('id'); //编辑照片的id
            // layer.alert('编辑照片' + id + '事件', { icon: 1 });
            _this.edits(id);
        });
        layero.find('.layphoto-list').on('click', '.fa-btn-del', function() {
            var id = $(this).parent().data('id');
            $(this).closest('li').remove();
            layer.alert('删除照片' + id + '事件', { icon: 1 });
        });

    },
    loadFileTemp: function(file, data) {

    },
    edits: function(id) {

        layer.open({
            type: 1,
            area: ['780px', '600px'],
            content: $('#edit-wrap'),
            success: function(layero, index) {
                layero.find('.icon-roll').on('click', function() {
                    layer.alert('旋转');
                });
                layero.find('.icon-suoxiao').on('click', function() {
                    layer.alert('缩小');
                });
                layero.find('.icon-fangda').on('click', function() {
                    layer.alert('放大');
                });
                layero.find('.fa-btn-return').on('click', function() {
                    layer.alert('还原');
                });
                layero.find('.fa-btn-submit').on('click', function() {
                    layer.alert('提交');
                });
            }
        })
    },
    deletes: function(id) {
        $.ajax({
            type: "method",
            url: "url",
            data: "data",
            dataType: "dataType",
            success: function(response) {

            }
        });
    }
};

//文档打印js
var file = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        $('.file-list').on('click', 'table>tbody>tr>td>div.single-sided >span.switch', function() {
            _this.clickHover($(this));
        });
        $('.file-list').on('click', 'table>tbody>tr>td>div.what-color >span.switch', function() {
            _this.clickHover($(this));
        });
        $('.file-list').on('click', 'table>tbody>tr>td>.fa-del', function() {
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
    },
    loadFileTemp: function(file, data) {

    }
}