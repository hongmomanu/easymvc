define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        $('#appformsubmitcancel').click(function(){
            $('#tabs').tabs('close',1);
        });

        $('#appformmore').click(function(){
            var isValid = $('#mainform').form('validate');
            if(isValid){
                require(['commonfuncs/FormAdd'],function(FormAdd){
                    FormAdd.addnewchild(lookupname,folder,ajaxloading,true,res,null);
                });
                /*ajaxloading.ajaxLoading();
                var length=$('#mainform').children().length;
                var formname=applyformviews[lookupname][length];
                formhtml='text!'+folder+formname+'.htm';
                formjs=folder+formname;
                require([formhtml,formjs],function(formhtml,formjs){
                    $('#mainform').append(formhtml);
                    var newform=$('#mainform').children()[length];
                    formjs.render(newform,res);
                    ajaxloading.ajaxLoadEnd();
                    require(['jqueryplugin/jquery-scrollto'], function (jqueryscroll) {
                        $('#formcontentpanel').scrollTo($(newform));
                    });
                    if($('#mainform').children().length==applyformviews[lookupname].length){
                        $('#appformmore').hide();
                        $('#appformsubmit').show();
                        $('#appformsubmitcancel').show();
                    }
                });*/
            }

        });

        $('#appformsubmit').click(function(){
            //$('#tabs').tabs('close',1);
            var type=$('#appformsubmit').attr('type');//获取type
            $.messager.progress();
            $('#mainform').form('submit', {
                url: 'ajax/sendapply.jsp',
                onSubmit: function(param){
                    var isValid = $(this).form('validate');
                    if (!isValid){

                        $.messager.progress('close');	// hide progress bar while the form is invalid
                    }else{

                        var affixfiles=[];
                        var affixitems=$('.affixfile');
                        for(var i=0;i<affixitems.length;i++){
                            if(affixitems[i].formdata&&affixitems[i].formdata.length>0){
                                var formdata=affixitems[i].formdata;
                                var affixfileitem={};
                                affixfileitem[$(affixitems[i]).attr('type')]=formdata;
                                affixfiles.push(affixfileitem);
                            }
                        }
                        affixfiles.push({"accountimgpath":[{'attachmentname':'照片',
                            'attachmentpath':$('#personimg').attr('src')}]});
                        param.businesstype=businessTableType.dbgl;
                        param.userid=userid;
                        param.familymembers=$.toJSON($('#familymembersgrid').datagrid('getRows'));
                        param.processstatustype=processstatustype.ok;
                        param.isprocess=true;
                        param.affixfiles=$.toJSON(affixfiles);//附件数据

                    }
                    return isValid;
                },
                success: function(){
                    $.messager.progress('close');	// hide progress bar while submit successfully
                    $('#tabs').tabs('close',1);
                }
            });
        });

    }
    return {
        render: render
    };
});