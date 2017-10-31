$(function() {
    //初始化
    setPerson.init();
});

var setPerson = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        $('#updatePwdBtn').on('click', function() {
            _this.updatePwd();
        });
    },
    updatePwd: function() {
        var isOk = true;
        this.layerOpen('修改密码', $('.updatepwssword'), function(layero, index) {
            //弹出层打开绑定事件
            layero.on('blur', 'input[type=password]', function() {
                if ($.trim($(this).val()) != '') {
                    $(this).siblings('.help-block').html('');
                    isOk = true;
                }
            });
        }, function(layero) {
            var oldpwd = layero.find('#oldpwd'),
                oVal = oldpwd.val(),
                newpwd = layero.find('#newpwd'),
                nVal = newpwd.val(),
                replaypwd = layero.find('#replaypwd'),
                reVal = replaypwd.val();
            layero.find('input[type=password]').each(function() {
                var $this = $(this),
                    value = $.trim($this.val()),
                    parent = $this.parent(),
                    laberText = parent.find('label').text(),
                    $errText = parent.find('.help-block');
                if (value == '') {
                    $errText.html(laberText + '不能为空');
                    isOk = false;
                    return;
                } else {
                    $errText.html('');
                    isOk = true;
                }
            });
            if (nVal != '' && reVal != '' && nVal != reVal) {
                replaypwd.parent().find('.help-block').html('两次密码不一致，请重新输入');
                isOk = false;
                return;
            } else if (nVal != '' && reVal != '' && nVal == reVal) {
                replaypwd.parent().find('.help-block').html('');
                isOk = true;
            }
            //确认修改
            if (isOk) {
                var postData = {
                    userid: $('#userid').val(), //当前用户id
                    oldpwd: oVal,
                    newpwd: nVal,
                    replaypwd: reVal,
                };
                $.ajax({
                    type: "post",
                    url: "url", //发送修改请求
                    data: postData,
                    dataType: "json",
                    success: function(response) {

                        isOk && layer.closeAll();
                    }
                });
            }

        });
    },
    layerOpen: function(title, contentDom, successBack, yesBack) {
        layer.open({
            type: 1,
            title: title,
            area: ['500px'],
            content: contentDom,
            btn: ['确定', '取消'],
            success: function(layero, index) {
                successBack(layero, index);
            },
            yes: function(index, layero) {
                //确定的回调
                yesBack(layero);
            },
            btn2: function(index, layero) {
                //取消
                layer.closeAll();
            }
        });
    }
};