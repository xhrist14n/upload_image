
$(function () {
    'use strict';

    var upload_url = '';

    try{
        upload_url = $("#upload_url").attr("data-url");
    }catch(ex){}

    if(!upload_url){
        upload_url = '';
    }

    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );


    $('#fileupload').fileupload('option', {
        url: upĺoad_url,
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        maxFileSize: 999000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
    });
    // Upload server status check for browsers with CORS support:
    if ($.support.cors) {
        $.ajax({
            url: upload_url,
            type: 'HEAD'
        }).fail(function () {
            $('<div class="alert alert-danger"/>')
                .text('Upload server currently unavailable - ' +
                        new Date())
                .appendTo('#fileupload');
        });
    }


});
