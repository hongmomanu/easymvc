define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        $('#appformsubmitcancel').click(function(){
            $('#tabs').tabs('close',1);
        });

        $('#appformmore').click(function(){
            var isValid = $('#mainform').form('validate');
            if(isValid){
                require(['commonfuncs/FormAdd'],function(FormAdd){
                    FormAdd.addnewchild(lookupname,folder,ajaxloading,true,res,null);
                });

            }

        });

        $('#appformsubmit').click(function(){
            //$('#tabs').tabs('close',1);
            require(['commonfuncs/AjaxForm'],function(ajaxform){
                var sucfun=function(){
                    $('#tabs').tabs('close',1);
                };
                ajaxform.submitForm('new',null,sucfun);
            });
        });

    }
    return {
        render: render
    };
});