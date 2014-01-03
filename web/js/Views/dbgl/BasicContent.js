/**
 * Created by jack on 13-12-31.
 */
define(function(){

    function render(parameters){

        $("#basicformcontent").ligerForm({
            inputWidth: 170, labelWidth: 90, space: 40,
            fields: [
                { display: "测试1", name: "ces", newline: true,  type: "text" },
                { display: "测试2", name: "ces2", newline: false,  type: "text" },
                { display: "测试3", name: "ces3", newline: true,  type: "text" },
                { display: "测试4", name: "ces4", newline: false,  type: "text" },
                { display: "测试5", name: "ces5", newline: true,  type: "text" },
                { display: "测试6", name: "ces6", newline: false,  type: "text" }
            ]/*,
             buttons:[{name:"提交"},{name:"取消"}]*/
        });
       return   null;

    }

    return {
        render:render
    };
});