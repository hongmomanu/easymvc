/**
 * Created by jack on 13-12-31.
 */
define(function(){

    function render(parameters){

        $("#familymembers").ligerForm({
            inputWidth: 170, labelWidth: 90, space: 40,
            fields: [
                { display: "", name: "ProductName", newline: true, appendID:true,  group: "家庭成员信息"}
            ]/*,
             buttons:[{name:"提交"},{name:"取消"}]*/
        });
        var hack_a=$("#familymembers");
        hack_a.children('div').children('ul').remove();
        hack_a.children('div').append('<div id="familymemberscontent" style="width: 800;"></div>')

        return   null;

    }

    return {
        render:render
    };
});