/**
 * Created by jack on 13-12-31.
 */
define(['commonfuncs/PersonidValidator'],function(PersonidValidator){

    function render(parameters){
        $.extend($.fn.validatebox.defaults.rules, {
            personid: {
                validator: PersonidValidator.IdentityCodeValid,
                message: '身份证不合法,请确认身份证是否正确输入!'
            }
        });
        $('#owername').blur(function() {
            require(['jqueryplugin/jquery-scrollto'], function(jqueryscroll){
                $('#formcontentpanel').scrollTo($('#familymembersdiv'));
                $('#familymembersgrid').datagrid('appendRow',{status:'P',owername:$('#owername').val(),owership:'户主'});
                var editIndex = $('#familymembersgrid').datagrid('getRows').length-1;
                $('#familymembersgrid').datagrid('selectRow', editIndex)
                    .datagrid('beginEdit', editIndex);
            } );
       });

       $('#personimg').click(function() {
           $('#imgwin').window('open');
       });
       $('#imgwin_cancel').bind('click', function(){
           $('#imgwin').window('close');
       });
        $('#newfamilymemer_btn').bind('click', function(){
            $('#familymembersgrid').datagrid('appendRow',{status:'P',owername:'',owership:'其它'});
            var editIndex = $('#familymembersgrid').datagrid('getRows').length-1;
            $('#familymembersgrid').datagrid('selectRow', editIndex)
                .datagrid('beginEdit', editIndex);
       });

        $('#delfamilymemer_btn').bind('click', function(){
            var editIndex = $('#familymembersgrid').datagrid('getRows').length-1;
            $('#familymembersgrid').datagrid('deleteRow',editIndex);
        });


    }

    return {
        render:render
    };
});