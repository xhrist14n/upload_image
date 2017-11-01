/*jslint unparam: true */
/*global window, $ */

function getHtmlImage(image,view_url){
    var html = "";
    html = html + '<div class="col-sm-2">';
    html = html + '<a target="blank" href="'+view_url+image+'">';
    html = html + '<div class="covered-image" style="background-image: url(\''+view_url+image+'\');" >';
    html = html + '</div>';
    html = html + '</a>';
    html = html + '</div>';
    return html;
}

function getDataUrl(id){
    var answer = ''
    try{
        answer = $("#"+id).attr("data-url");
    }catch(ex){}
    if(!answer){
        answer = '';
    }
    return answer;
}

$(function () {
    'use strict';

    var upload_url = getDataUrl("upload_url");

    var view_url = getDataUrl("view_url");

    var upload_image = getDataUrl("upload_image_id");

    var uploaded_images = getDataUrl("uploaded_images");


    $('#fileupload').click(
        function(){
            $('#progress .progress-bar').css('width','0%');
        }
    );


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
                        var html = $("#"+uploaded_images).html();
                        html = html + getHtmlImage(image,view_url);
                        $("#"+uploaded_images).html(html);
                    }catch(ex){}
                }
                $("#"+upload_image).val(value);

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