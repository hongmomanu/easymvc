/**
 * Created by jack on 13-12-31.
 */
define(function(){

    function render(parameters){
       /* var appDiv = document.getElementById('app');

        //var users = parameters.users;

        var html = '<ul>';
        for (var i = 0, len = users.length; i < len; i++){
            html += '<li>' + users[i].name + '</li>';
        }
        html += '</ul>';

        appDiv.innerHTML = html;*/
        //console.log("hello jack");
        var navigationDiv=document.getElementById('navigation');
        var html='<div title="功能列表" class="l-scroll">';

        html+='<ul id="tree1" style="margin-top:3px;">'
            + '</div>'
            + '<div title="jquery ui">'
            +'<div style=" height:7px;"></div>'
            +'<a class="l-link" )">测试2</a>'
            +'<a class="l-link">测试1</a>'
            +'</div>'
            +'<div title="性能测试">'
            +'<div style=" height:7px;"></div>'
            +'<a class="l-link" href="lab/generate/index.htm" target="_blank">表格表单设计器</a>'
            +'<a class="l-link" href="lab/formdesign/index.htm" target="_blank">可视化表单设计</a>'
            +'</div>';
        navigationDiv.innerHTML=html;
        var height = $(".l-layout-center").height();
        $("#navigation").ligerAccordion({leftWidth: 200,height: height - 24, speed: null });
        // alert("done");
        //$("#navigation").ligerLayout({ leftWidth: 200});
    }

    return {
        render:render
    };
});