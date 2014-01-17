define(function () {
    return {
        grantmoney:function(btn){
            var form=$('#addnewgrantwin').find('.easyui-tabs').tabs('getSelected').find('form');
            var isnew=$(btn).linkbutton('options').isnew;
            require(['commonfuncs/AjaxForm'],function(ajax){
                var onsubmit=function(param){
                    if(form.attr('type')!='year'){
                        param.grantdate= $.formatDateTime('yy-mm-dd',new Date());
                    }
                    var businesstype=$('#tabs').tabs('getSelected').panel('options').businesstype;
                    param.isnew=isnew;
                    param.userid=userid;
                    param.businesstype=businesstype;
                    param.divisionpath=divisionpath;


                };
                var success=function(){
                    $.messager.alert('消息提示','资金发放成功');
                    $('#addnewgrantwin').dialog('close');
                    $('#businessgrid').datagrid('reload');
                };
                ajax.ajaxform(form,'ajax/grantmoneyform.jsp',onsubmit,success);
            });
        },
        render:function(){
            var me=this;
            var addnewgrantwindiv=$('#addnewgrantwin');
            if(addnewgrantwindiv.length>0){
                addnewgrantwindiv.dialog('open');
            }
            else{
                require(['text!views/dbgl/addnewgrantwin.htm'],function(windiv){
                    $('body').append(windiv);

                    $('#addnewgrantwin').dialog({
                        title: '资金发放',
                        width: 450,
                        height: 370,
                        //fit:true,

                        closed: false,
                        cache: false,
                        onOpen:function(){

                        },
                        buttons:[{
                            text:'资金发放',
                            isnew:true,
                            handler:function(){
                                me.grantmoney(this);

                            }
                        },{
                            text:'重新发放',
                            isnew:false,
                            handler:function(){
                                me.grantmoney(this);
                            }
                        },{
                            text:'取消',
                            handler:function(){
                                $('#addnewgrantwin').dialog('close');
                            }
                        }],
                        maximized:false,
                        modal:true
                    });
                    $.parser.parse($('#addnewgrantwin').parent());
                    var date = new Date();
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                    var form_1=$('#addnewgrantwin').find('.easyui-tabs').tabs('getTab',0).find('form');
                    var form_2=$('#addnewgrantwin').find('.easyui-tabs').tabs('getTab',1).find('form');

                    form_1.form('load',
                        {
                            bgdate:$.formatDateTime('yy-mm-dd',firstDay),
                            eddate:$.formatDateTime('yy-mm-dd',lastDay)
                        });
                    form_2.form('load',{
                        grantdate:$.formatDateTime('yy',new Date())
                    });

                });

            }


        }

    }


})