/**
 * Created by jack on 13-12-31.
 */
define(function(){

    function render(parameters){

       $('#owername').blur(function() {
           //alert( "Handler for .blur() called." );
           $($('#tabs').tabs('getSelected')).stop().scrollTo(200,10);
           $('#familymembersgrid').datagrid('appendRow',{status:'P',owername:$('#owername').val(),owership:'户主'});
           var editIndex = $('#familymembersgrid').datagrid('getRows').length-1;
           $('#familymembersgrid').datagrid('selectRow', editIndex)
               .datagrid('beginEdit', editIndex);
           //alert(editIndex);

       });

       $('#personimg').click(function() {
           $('#imgwin').window('open');
       });
       $('#imgwin_cancel').bind('click', function(){
           $('#imgwin').window('close');
       });



    }

    return {
        render:render
    };
});