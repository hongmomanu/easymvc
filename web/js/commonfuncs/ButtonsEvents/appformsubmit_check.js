/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={
        render:function(item,record){
            var checkwindiv=$('#checkwin');
            if(checkwindiv.length>0){
                checkwindiv.window('open');
            }
            else{
                require(['text!views/dbgl/dbglcheckwin.htm','text!views/dbgl/dbglapplyhistoryfieldset.htm'],
                    function(div,table){
                    $('body').append(div);
                    //console.log($(table).find('div .siglecontent').html());

                    $('#checkwin').append($(table).find('div .siglecontent').html());
                    $('#checkwin').dialog({
                        title: '业务审核',
                        width: 650,
                        height: 370,
                        closed: false,
                        cache: false,
                        onOpen:function(){
                          alert(1);
                        },
                        buttons:[{
                            text:'确定',
                            handler:function(){

                                require(['jqueryplugin/easyui-form','commonfuncs/AjaxForm'],function(js,AjaxForm){
                                    var form=$('#checkwin').find('form');
                                    var approvalstr=form.form('getValue','approvalresult');

                                    var submit=function(param){
                                        param.userid=userid;
                                        param.businessid=record.id;
                                        param.processstatus=record['processstatus'];
                                        param.submituid=record['approvaluserid']?record['approvaluserid']:record['userid'];

                                        param.isapproval=(approvalstr==approvalresult.yes);
                                        param.approvalname=$(item).attr('namevalue');


                                    };
                                    var success=function(res){
                                        var resitem=$.evalJSON(res)
                                        if(resitem.success){
                                            $.messager.alert('操作成功','审核成功!');
                                            $('#checkwin').dialog('close');
                                            $('#tabs').tabs('close',1);
                                        }else{
                                            $.messager.alert('操作失败',resitem.msg);
                                        }

                                    };
                                    AjaxForm.ajaxform(form,'ajax/sendcheckform.jsp',submit,success);


                                });


                                //me.formSubmit(ajaxform, params, 'ajax/sendcheckform.jsp', successFunc, failFunc,"正在提交数据");


                            }
                        },{
                            text:'取消',
                            handler:function(){alert(2);}
                        }],
                        modal: true });
                     $.parser.parse($('#checkwin').parent());

                });
                //$('#tabs').append('<div id="checkwin"></div>');
            }
        }

    }

    return a;
});
