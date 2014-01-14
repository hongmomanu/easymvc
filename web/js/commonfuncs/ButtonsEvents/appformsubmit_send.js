/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={
        render:function(item,data){
            $.messager.confirm('确定提交申请?', '你正在试图提交申请.你想继续么?', function(r){
                if (r){
                    //alert('confirmed: '+r);


                }
            });

        }

    }

    return a;
});
