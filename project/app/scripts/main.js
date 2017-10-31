/*jslint unparam: true */
/*global window, $ */
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var upload_url = '';
    try{
        upload_url = $("#upload_url").attr("data-url");
    }catch(ex){}
    if(!upload_url){
        upload_url = '';
    }
    //console.log(upload_url);


    $('#fileupload').fileupload(
        {
            url: upload_url,
            dataType: 'json',
            done: function (e, data) {
                console.log(data.result);
                /*$.each(data.result.files, function (index, file) {
                    $('<p/>').text(file.name).appendTo('#files');
                });*/
                setTimeout(
                    function(){
                        $('#progress .progress-bar').css('width','0%');
                    },
                    3000
                );
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            }
        }
    ).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
        /**/
});