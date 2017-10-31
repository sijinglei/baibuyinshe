/*
 * author	 	: Richa
 * date			: 2016-04-12
 * description	: webuploader自定义封装（仅上传单个图片）
 */

/* demo */
/*
	html: 	<div class="upload-wrap" id="toUpload" data-progress="#progress-wrap">
				<a href="javascript:;" class="btn"></a>
			</div>
			
			<div id="progress-wrap"><i></i></div>

	js: 	$('#toUpload').uploadImage({
				server: '*****',
				fileVal: 'file',
				_uploadSuccess: function(file, data) {
					// do something
				}
			});
 */

window.inProgress = 0;

function initWebUpload(item, options) {

    if (!WebUploader.Uploader.support()) {
        alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
        throw new Error('WebUploader does not support the browser you are using.');
    }

    var defaults = {
        swf: 'plugins/webuploader/Uploader.swf', // swf文件路径
        server: '', // 服务器地址
        fileVal: 'file', // 文件上传域的name
        auto: true, // 自动上传
        method: 'POST', // 文件上传方式，POST或者GET
        fileSingleSizeLimit: 5242880, // 单个文件大小，超出则不允许加入队列
        fileSingleSizeLimitMsg: null, // 文件大小超过指定值的提示文本
        compress: false, // 禁止图片压缩
        duplicate: true, // 允许重复上传

        _fileQueued: function() {}, // 队列事件
        _uploadStart: function() {}, // 开始上传事件
        _uploadProgress: function() {}, // 上传进度事件
        _uploadSuccess: function() {}, // 上传成功事件
        _uploadError: function() {}, // 上传失败事件
        _uploadComplete: function() {}, // 上传结束事件（不管成功失败）

        // 只允许选择图片文件（若要选择所有文件，可设置为null）
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        }
    };

    var opts = $.extend({}, defaults, options);
    var target = $(item); // 容器

    // 创建按钮
    opts.pick = {
        id: target,
        innerHTML: target.html(),
        multiple: false
    };

    var uploader = WebUploader.create(opts); // 创建上传对象

    var progress = $(target.data('progress'));

    // 队列事件
    uploader.on('fileQueued', function(file) {
        opts._fileQueued(file);
        if (opts._makeThumb) {
            uploader.makeThumb(file, function(error, ret) {
                opts._makeThumb(file, error, ret);
            });
        }
    });

    // 开始上传事件
    uploader.on('uploadStart', function() {
        window.inProgress++;

        if (progress.length > 0) {
            progress.show();
        }

        opts._uploadStart();
    });

    // 上传进度事件
    uploader.on('uploadProgress', function(file, percentage) {
        if (progress.length > 0) {
            progress.children().css('width', percentage * 100 + '%');
        }

        opts._uploadProgress(file, percentage);
    });

    // 上传成功事件
    uploader.on('uploadSuccess', function(file, data) {
        opts._uploadSuccess(file, data);
    });

    // 上传失败事件
    uploader.on('uploadError', function(file, reason) {
        opts._uploadError(file, reason);
    });

    // 上传结束事件（不管成功失败）
    uploader.on('uploadComplete', function(file) {
        window.inProgress--;

        if (progress.length > 0) {
            progress.children().css('width', '0%');
            progress.hide();
        }

        opts._uploadComplete(file);
    });

    // 错误类型的反馈事件
    uploader.on('error', function(type, param1) {
        if (type == 'Q_TYPE_DENIED') {
            layer.msg('文件上传类型不匹配', { icon: 0 });
        } else if (type == 'Q_EXCEED_NUM_LIMIT') {
            layer.msg('文件上传数量超出限制', { icon: 0 });
        } else if (type == 'Q_EXCEED_SIZE_LIMIT') {
            layer.msg('文件总大小超出限制', { icon: 0 });
        } else if (type == 'F_EXCEED_SIZE') {
            layer.msg(opts.fileSingleSizeLimitMsg || '上传的文件大小不能大于5M', { icon: 0 });
        } else if (type == 'F_DUPLICATE') {
            layer.msg('该文件已经上传', { icon: 0 });
        } else {
            layer.msg('上传失败，请稍候重试', { icon: 0 });
        }
        return false;
    });
}

$.fn.uploadImage = function(options) {
    if (this.length == 0) return this;
    if (this.length > 1) {
        this.each(function() { $(this).uploadImage(options) });
        return this;
    }
    initWebUpload(this, options);
}