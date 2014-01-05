/**
 * Created by jack on 13-12-31.
 */
define(function(){

    function render(parameters){

        /*$('#showinfo_btn').bind('click', function(){
            //$('#imgwin').window('close');
            alert("查看信息");
        });*/


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