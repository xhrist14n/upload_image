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

    var upload_image = '';
    try{
        upload_image = $("#upload_image_id").attr("data-url");
    }catch(ex){}
    if(!upload_image){
        upload_image = '';
    }
    //console.log(upload_image);


    $('#fileupload').fileupload(
        {
            url: upload_url,
            dataType: 'json',
            done: function (e, data) {
                var value = '';
                var images = new Array();
                try{
                    value = $("#"+upload_image).val();
                    images = value.split(",");
                }catch(ex){}
                var image = '';
                var flag =      data.result.success=="true";
                flag = flag ||  data.result.success==true;
                if( flag ){
                    try{
                        image = data.result.name;
                        images.push(image);
                        value = images.join(",");
                    }catch(ex){}
                }
                $("#"+upload_image).val(value);
                //console.log(value);
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