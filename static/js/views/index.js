$(function() {
    //初始化
    indexPage.init();
});

var indexPage = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
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

    }
};