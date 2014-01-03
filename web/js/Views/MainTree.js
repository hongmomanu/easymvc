/**
 * Created by jack on 13-12-31.
 */
define(function(){

    function render(parameters){

        $("#tree1").ligerTree({
            data : [
                { text: '复杂组件测试',isexpand:true, children: [
                    {value:"form",text:"复杂表单"},
                    {value:"grid",text:"复杂表格"}
                ]
                }],
            checkbox: false,
            slide: false,
            nodeWidth: 120,
            attribute: ['nodename', 'url'],
            onSelect: function (node)
            {
                var tab = $("#framecenter").ligerGetTabManager();

                var tabid = $(node.target).attr("tabid");
                if(tabid!=tab.getSelectedTabItemID())tab.removeAll();
                if (!tabid)
                {

                    tabid = new Date().getTime();
                    $(node.target).attr("tabid", tabid);
                }else{

                }
                var height = $(".l-layout-center").height();
                //$("#framecenter").ligerTab({ height: height });

                tab.addTabItem({ tabid : tabid,text: node.data.text,content:'<div id="form2" style="padding: 30;MARGIN-RIGHT: auto; MARGIN-LEFT: auto;">' +
                    '<div style="position:relative;overflow-y:auto;overflow-x:hidden;height:'+(height-88)+'">' +
                    '<div id="basicform" style="width: 80%"></div>' +
                    '<div style="width: 80%"><div id="basicformcontent" style="width: 80%;float:left;">' +
                    '</div>' +
                    '<div id="imgdiv" style="width: 10%;float:left;">' +
                    '<img src="img/noperson.gif" alt="用户照片" height="91" width="101"></div></div>' +
                    '<div id="familymembers" style="float: left;width:80%;"></div>' +
                    '<div id="otherinfo" style="float: left;width:80%;"></div>' +
                    '</div>' +

                    '<div id="formtoolbar" style="text-align:center;"></div>' +
                    '</div>'});



                require(['Views/dbgl/BasicInfo','Views/dbgl/BasicContent','Views/dbgl/Familymembers','Views/dbgl/FamilyContent',
                    'Views/dbgl/FormToolbar','Views/dbgl/OtherInfo'],
                    function(BasicInfo,BasicContent,Familymembers,FamilyContent,FormToolbar,OtherInfo){
                            BasicInfo.render();
                            BasicContent.render();
                            Familymembers.render();
                            //FamilyContent.render();
                            FormToolbar.render();
                            OtherInfo.render();
                });


            }
        });

    }

    return {
        render:render
    };
});