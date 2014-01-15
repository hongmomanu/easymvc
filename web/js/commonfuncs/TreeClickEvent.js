/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={
        ShowContent:function(htmlfile,jsfile,title,value,folder,res,id,businesstype){
            require(['commonfuncs/LookupItemName','commonfuncs/LoadingMask'],function(LookupItemName,LoadingMask){
                LoadingMask.ajaxLoading();
                require([htmlfile,jsfile],function(htmlfile,jsfile){

                    var options= {
                        title: title,
                        content: htmlfile,
                        id:id,
                        businesstype:businesstype,
                        closable: true
                    };
                    if($('#tabs').tabs('exists',1)){

                        $('#tabs').tabs('select', 1);
                        $('#tabs').tabs('close',1);

                    }
                    $('#tabs').tabs('add',options);
                    var lookupname=LookupItemName.lookupitemname(formwidgettype,value);
                    if(lookupname){
                        var firstform=applyformviews[lookupname][0];
                        firstformhtml='text!'+folder+firstform+'.htm';
                        firstformjs=folder+firstform;
                        require([firstformhtml,firstformjs],function(firstformhtml,firstformjs){
                            $('#mainform').append(firstformhtml);
                            firstformjs.render($('#mainform').children()[0],res);
                            jsfile.render(lookupname,folder,LoadingMask,res);
                            LoadingMask.ajaxLoadEnd();
                        });
                    }
                    else{
                        LoadingMask.ajaxLoadEnd();

                        jsfile.render(lookupname,folder,LoadingMask,res);
                    }

                    //jsfile.render(lookupname,folder,LoadingMask,res);

                });

            });


        }

    }

    return a;
});
