/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={

        addnewchild:function(lookupname,folder,ajaxloading,isbottom,res,callback){
            if(isbottom)ajaxloading.ajaxLoading();
            var length=$('#mainform').children().length;
            var formname=applyformviews[lookupname][length];
            formhtml='text!'+folder+formname+'.htm';
            formjs=folder+formname;
            require([formhtml,formjs],function(formhtml,formjs){
                $('#mainform').append(formhtml);
                var newform=$('#mainform').children()[length];
                formjs.render(newform,res);
                if(isbottom)ajaxloading.ajaxLoadEnd();
                require(['jqueryplugin/jquery-scrollto'], function (jqueryscroll) {
                    if(isbottom)$('#formcontentpanel').scrollTo($(newform));
                });
                if($('#mainform').children().length==applyformviews[lookupname].length){
                    $('#appformmore').hide();
                    $('#appformsubmit').show();
                    $('#appformsubmitcancel').show();
                }
                if(callback)callback();
            });
        }
    }

    return a;
});
