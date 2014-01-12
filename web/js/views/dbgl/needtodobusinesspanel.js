/**
 * Created by jack on 13-12-31.
 */
define(function () {

    function render(parameters) {
        var options = $('#businessgrid').datagrid('options');
        $('#businessgrid').datagrid(
            {
                onBeforeLoad: function (params) {
                    params.businesstype = businessTableType.dbgl;
                    params.divisionpath = divisionpath;
                    params.start = (options.pageNumber - 1) * options.pageSize;
                    params.limit = options.pageSize;
                    params.totalname = "total";
                    params.rowsname = "rows";
                },
                onLoadSuccess:function(data){
                    var viewbtns=$('.viewbtn');
                    var alterbtns=$('.alterbtn');
                    var processbtns=$('.processbtn');
                    var submitbtns=$('.submitbtn');
                    var delbtns=$('.delbtn');
                    var canceltns=$('.cancelbtn');
                    require(['commonfuncs/LookupItemName'], function(LookupItemName){
                        var rows=data.rows;
                        for(var i=0;i<rows.length;i++){
                            var isviewfind=LookupItemName.lookup(LookupItemName.lookup(processRoleBtn,
                                {name:'name',value:rows[i]['processstatus']}).children,
                                {name:'name',value:'查看'});
                            var isalterfind=LookupItemName.lookup(LookupItemName.lookup(processRoleBtn,
                                {name:'name',value:rows[i]['processstatus']}).children,
                                {name:'name',value:'修改'});
                            var iscancelfind=LookupItemName.lookup(LookupItemName.lookup(processRoleBtn,
                                {name:'name',value:rows[i]['processstatus']}).children,
                                {name:'name',value:'取消'});
                            var isdelfind=LookupItemName.lookup(LookupItemName.lookup(processRoleBtn,
                                {name:'name',value:rows[i]['processstatus']}).children,
                                {name:'name',value:'删除'});
                            var issubmitfind=LookupItemName.lookup(LookupItemName.lookup(processRoleBtn,
                                {name:'name',value:rows[i]['processstatus']}).children,
                                {name:'name',value:'提交'});
                            var isprocessfind=LookupItemName.lookup(LookupItemName.lookup(processRoleBtn,
                                {name:'name',value:rows[i]['processstatus']}).children,
                                {name:'name',value:'流程'});

                            if(isviewfind){
                                $(viewbtns[i]).linkbutton({
                                    iconCls: 'icon-view'
                                });
                                $(viewbtns[i]).show();
                            }
                            if(isalterfind){
                                $(alterbtns[i]).linkbutton({
                                    iconCls: 'icon-alter'
                                });
                                (function(index){
                                    $(alterbtns[index]).bind('click',function(){
                                        var businessid=rows[index]['businessid'];


                                    });
                                })(i);

                                $(alterbtns[i]).show();
                            }
                            if(iscancelfind){
                                $(canceltns[i]).linkbutton({
                                    iconCls: 'icon-cancel'
                                });
                                $(canceltns[i]).show();
                            }
                            if(isdelfind){
                                $(delbtns[i]).linkbutton({
                                    iconCls: 'icon-del'
                                });
                                $(delbtns[i]).show();
                            }
                            if(issubmitfind){
                                $(submitbtns[i]).linkbutton({
                                    iconCls: 'icon-del'
                                });
                                $(submitbtns[i]).show();
                            }
                            if(isprocessfind){
                                $(processbtns[i]).linkbutton({
                                    iconCls: 'icon-del'
                                });
                                $(processbtns[i]).show();
                            }

                        }

                    });





                }

            });

    }

    function rowformater(value, rowData, rowIndex) {
        return '<a>查看</a>'
    }

    return {
        render: render,
        rowformater: rowformater
    };
});