/**
 * Created by jack on 14-1-7.
 */
define(function(){
    function getDoc(frame) {
        var doc = null;

        // IE8 cascading access check
        try {
            if (frame.contentWindow) {
                doc = frame.contentWindow.document;
            }
        } catch(err) {
        }

        if (doc) { // successful getting content
            return doc;
        }

        try { // simply checking may throw in ie8 under ssl or mismatched protocol
            doc = frame.contentDocument ? frame.contentDocument : frame.document;
        } catch(err) {
            // last attempt
            doc = frame.document;
        }
        return doc;
    }
    var a={

        ajaxformMultipart:function(formid,successFunc,errorFunc){
            $("#"+formid).submit(function(e)
            {
                var formObj = $(this);
                var formURL = formObj.attr("action");
                if(window.FormData !== undefined)  // for HTML5 browsers
                {
                    var formData = new FormData(this);
                    $.ajax({
                        url: formURL,
                        type: 'POST',
                        data:  formData,
                        mimeType:"multipart/form-data",
                        contentType: false,
                        cache: false,
                        processData:false,
                        success:successFunc,
                        error: errorFunc
                    });
                    e.preventDefault();
                }
                else  //for olden browsers
                {
                    //generate a random id
                    var  iframeId = 'unique' + (new Date().getTime());
                    //create an empty iframe
                    var iframe = $('<iframe src="javascript:false;" name="'+iframeId+'" />');
                    //hide it
                    iframe.hide();
                    //set form target to iframe
                    formObj.attr('target',iframeId);
                    //Add iframe to body
                    iframe.appendTo('body');
                    iframe.load(function(e)
                    {
                        var doc = getDoc(iframe[0]);
                        var docRoot = doc.body ? doc.body : doc.documentElement;
                        var data = docRoot.innerHTML;
                        successFunc(data);
                        //data is returned from server.

                    });

                }

            });
            $("#"+formid).submit();

        }
    };
    return a;
});
