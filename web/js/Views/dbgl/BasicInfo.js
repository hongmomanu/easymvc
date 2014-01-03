/**
 * Created by jack on 13-12-31.
 */
define(function(){

    function render(parameters){

        testobj=$("#basicform").ligerForm({
            inputWidth: 170, labelWidth: 90, space: 40,
            fields: [
                { display: "", name: "ProductName", newline: true, appendID:true,  group: "基础信息"}
            ]/*,
             buttons:[{name:"提交"},{name:"取消"}]*/
        });
        var hack_a=$("#basicform");
        hack_a.children('div').children('ul').remove();
       return   null;

    }

    return {
        render:render
    };
});