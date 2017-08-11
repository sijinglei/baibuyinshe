/**
 * @author:sjl
 * @date:2017-08-03
 * @desc:后台首页js
 */
define([
    'mock'
], function(Mock) {

    var index = {
        init: function() {
            this.bindEvent();
        },
        bindEvent: function() {
            var _this = this;
            console.log(22222222222222);
        }
    }
    index.init();
})