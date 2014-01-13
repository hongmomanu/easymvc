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
                                   $(btns_arr[j][i]).linkbutton({
                                       iconCls: 'icon-alter'
                                   });
                                   (function(index){
                                       $(btns_arr[j][i]).click(function(){
                                           var clickitem=this;
                                           var record=rows[index];
                                           require(['commonfuncs/ButtonsEvent'],function(ButtonsEvent){
                                               ButtonsEvent.approvl_btns(clickitem,record);
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

    }

    function rowformater(value, rowData, rowIndex) {
        return '<a>查看</a>'
    }

    return {
        render: render,
        rowformater: rowformater
    };
});