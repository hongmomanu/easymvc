/**
 * Created by jack on 13-12-31.
 */
define(function(){

    function render(parameters){
        var options=$('#businessgrid').datagrid('options');
        $('#businessgrid').datagrid(
            {onBeforeLoad: function(params){

            params.businesstype=businessTableType.dbgl;
            params.divisionpath=divisionpath;
            params.start=(options.pageNumber-1)*options.pageSize;
            params.limit=options.pageSize;
            params.totalname="total"     ;
            params.rowsname="rows"        ;
        }});

    }
    function rowformater(value,rowData,rowIndex)
    {
        return '<a>查看</a>'
    }

    return {
        render:render,
        rowformater:rowformater
    };
});