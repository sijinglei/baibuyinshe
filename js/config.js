require.config({
    baseUrl: 'js/',
    paths: {
        jquery: 'plugins/jquery.min',
        global: 'global', // 全局模块，用来定义全局变量以及工具函数
        // bootstrap: 'plugins/bootstrap/bootstrap.min',
        // bootstraptable: 'plugins/bootstrap-table/bootstrap-table.min',
        stateman: 'plugins/stateman.min', //jquery路由
        tForm: 'plugins/t-form',
        tScroll: 'plugins/t-scroll',
        tPage: 'plugins/t-paginator',
        tooltip: 'plugins/tooltip',
        combobox: 'plugins/combobox',

        ejs: 'plugins/ejs/ejs',
        text: 'plugins/text',
        rejs: 'plugins/rejs',
        layer: 'plugins/layer/layer.min',
        slimScroll: 'plugins/slimScroll/jquery.slimscroll.min',
        iCheck: 'plugins/iCheck/icheck.min',
        vue: 'plugins/vue',



        mock: 'http://mockjs.com/dist/mock'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        // bootstrap: {
        //     deps: ['jquery']
        // },
        // bootstraptable: {
        //     deps: ['jquery', 'css!/css/plugins/bootstrap-table/bootstrap-table.min']
        // },
        swiper: {
            deps: ['jquery', 'css!../css/plugins/swiper.min']
        },
        tForm: {
            deps: ['tScroll']
        },
        tooltip: {
            deps: ['jquery', 'css!../css/plugins/tooltip'],
            exports: 'tooltip'
        },
        metisMenu: {
            deps: ['jquery']
        },
        combobox: {
            deps: ['jquery']
        },
        tPage: {
            deps: ['jquery', 'css!../css/plugins/t-paginator'],
            exports: 'tPage'
        },
        tScroll: {
            deps: ['jquery', 'mousewheel', 'css!../css/plugins/t-scroll']
        },
        layer: {
            deps: ['jquery']
        },
        slimScroll: {
            deps: ['jquery']
        },
        // iCheck: {
        //     deps: ['jquery', 'css!/css/plugins/iCheck/custom']
        // },
        ejs: {
            exports: 'ejs'
        },
        cas: {
            deps: ['jquery']
        }
    },
    map: {
        '*': {
            'css': 'plugins/require-css/css'
        }

    }
});