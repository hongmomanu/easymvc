/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={

        initbusinessgrid:function(type,businesstype){

            $('#businessgrid').datagrid(
                {
                    singleSelect: true,
                    collapsible: true,
                    rownumbers: true,
                    method:'post',
                    remoteSort: false,
                    sortName:'time',
                    sortOrder:'desc',
                    fit:true,
                    toolbar:'#businesstb',
                    pagination:true,
                    pageSize:10,
                    rowStyler:function(index,row){
                        if (row.processstatus===processdiction.stepthree){
                            if(row.processstatustype===processstatustype.logout){
                                return 'color:red;font-weight:bold;';
                            }
                            return 'color:green;font-weight:bold;';
                        }else if(row.processstatus===processdiction.steptwo){
                            return 'color:blue;font-weight:bold;';
                        }else if(row.processstatus===processdiction.stepone){
                            return 'color:gray;font-weight:bold;';
                        }else{
                            return 'color:pink;font-weight:bold;';
                        }
                    },
                    onBeforeLoad: function (params) {
                        var options = $('#businessgrid').datagrid('options');

                        params.businesstype = businesstype;
                        params.type=type;
                        params.divisionpath = divisionpath;
                        params.start = (options.pageNumber - 1) * options.pageSize;
                        params.limit = options.pageSize;
                        params.totalname = "total";
                        params.rowsname = "rows";
                    },
                    onLoadSuccess:function(data){
                        var viewbtns=$('#businessgrid,.viewbtn');
                        var alterbtns=$('#businessgrid,.alterbtn');
                        var processbtns=$('#businessgrid,.processbtn');
                        var submitbtns=$('#businessgrid,.submitbtn');
                        var delbtns=$('#businessgrid,.delbtn');
                        var canceltns=$('#businessgrid,.cancelbtn');
                        var btns_arr=[viewbtns,alterbtns,processbtns,submitbtns,delbtns,canceltns];
                        require(['commonfuncs/LookupItemName'], function(LookupItemName){
                            var rows=data.rows;
                            for(var i=0;i<rows.length;i++){

                                for(var j=0;j<btns_arr.length;j++){
                                    var isfind=LookupItemName.lookup(LookupItemName.lookup(processRoleBtn,
                                        {name:'name',value:rows[i]['processstatus']}).children,
                                        {name:'name',value:$(btns_arr[j][i]).text()});
                                    if(isfind){
                                        var classname=$(btns_arr[j][i]).attr("class");
                                        $(btns_arr[j][i]).linkbutton({
                                            iconCls: 'icon-'+classname
                                        });
                                        (function(index){
                                            $(btns_arr[j][i]).click(function(){
                                                var clickitem=this;
                                                var record=rows[index];
                                                require(['commonfuncs/ButtonsEvent'],function(ButtonsEvent){
                                                    var data={record:record};
                                                    ButtonsEvent.approvl_btns(clickitem,data);
                                                });
                                            });
                                        })(i);

                                        $(btns_arr[j][i]).show();
                                    }
                                }


                            }

                        });





                    }

                });

            $('#businesstb .search,#businesstb .keyword').bind('click keypress',function(e){
                var keycode = (event.keyCode ? event.keyCode : event.which);

                if($(this).attr("type")==='keyword'&&keycode!=13)return;

                $('#businessgrid').datagrid('load',{

                    bgdate:$('#businesstb .bgdate').datebox('getValue'),
                    eddate:$('#businesstb .eddate').datebox('getValue'),
                    keyword:$('#businesstb .keyword').val()

                })
            });

            require(['commonfuncs/LookupItemName'],function(lookjs){
                var isfind=lookjs.lookup(processRoleBtn,
                        {name:"name",value:"资金发放"});
                if(isfind){
                    $('#businesstb .newgrant').bind('click',function(e){
                        require(['views/dbgl/addnewgrantwin','jqueryplugin/jquery-formatDateTime'],function(js){
                            js.render();
                        });
                    });
                }else{
                    $('#businesstb .newgrant').hide();
                }
            })




        }

    }

    return a;
});
