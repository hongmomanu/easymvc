/**
 * Created by jack on 13-12-31.
 */
define(function(){

    function render(parameters){

        $("#formtoolbar").ligerToolBar({ items: [
            {
                text: '<div style="width:400"></div>', click: function (item)
            {
                alert(item.text);
            }, icon:'add'},
            { line:true },
            { text: '提交', click: function (item)
            {
                alert(item.text);
            } },{ text: '取消', click: function (item)
            {
                alert(item.text);
            } },
            { line:true },
            { text: '<div style="width:500"></div>', click: function (item)
            {
                alert(item.text);
            } }
        ]
        });
       return   null;

    }

    return {
        render:render
    };
});