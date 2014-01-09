define( function () {

    function render(parameters) {
        /**这里添加住房绑定事件**/
        $('#uploadaffixdialog').bind('change',function(){
            var filename= $(this).val().slice($(this).val().lastIndexOf("\\")+1);
            $('#uploadaffixname').val(filename);
        });
        $('.affixfile').click(function(){
            //console.log(this);

            $('#affixwin').window('open');
            $('#affixwin').window('window').clickitem=this;
            var data=$('#affixwin').window('window').clickitem.formdata?
                $('#affixwin').window('window').clickitem.formdata:[];
            $('#affixfilegrid').datagrid('loadData',data);
        });
        $('#affixwin_confirm').bind('click',function(){

            $('#affixwin').window('window').clickitem.formdata=$('#affixfilegrid').datagrid('getRows');
            require(['commonfuncs/UpdateItemNum'],function(UpdateItemNum){
                UpdateItemNum.updateitemnum($($('#affixwin').window('window').clickitem),
                    $('#affixfilegrid').datagrid('getRows').length,"(",")");
                $('#affixwin').window('close');
            });
        });
        $('#affixwin_submit').bind('click', function () {
            require(['jqueryplugin/jquery-form'],function(AjaxFormjs){
                var success=function(data, jqForm, options)
                {
                    $('#affixfilegrid').datagrid('appendRow',{
                        attachmentname: data.filename,
                        attachmentpath:data.filepath
                    });
                };
                var options = {
                    //beforeSubmit:  showRequest,  // pre-submit callback
                    dataType:"json",
                    success: success,  // post-submit callback
                    timeout:   3000
                };
                $('#affixwinimg_form').ajaxForm(options).submit() ;

            });
        });

        $('#affixwin_cancel').bind('click', function () {
            $('#affixwin').window('close');
        });

    }

    return {
        render: render
    };
});