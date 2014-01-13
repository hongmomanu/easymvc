/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={
        approvl_btns:function(item,data){
            var action=$(item).attr('action');
            require(['commonfuncs/ButtonsEvents/'+action],function(action){
                action.render(item,data);
            });

        },
        changeapplystatus:function(businessid,status,callfunc){
            var params = {
                businessid:businessid,
                status:status
            };
            $.messager.progress();
            var successFunc = function(){
                $.messager.progress('close');
                if(callfunc)callfunc();
            };

            $.ajax({
                type: "post",
                dataType: "json",
                url: "ajax/changeapplystatus.jsp",
                data: params,
                complete :function(){},
                success: successFunc
            });
        }

    }

    return a;
});
