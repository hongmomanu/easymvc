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

        $("#app").ligerLayout({ leftWidth: 200,height: '100%',  heightDiff: -34,
            space: 4,
            onHeightChanged: heightChanged
        });
        var height = $(".l-layout-center").height();
        var tab=$("#framecenter").ligerTab({ height: height });
        var accordion=accordion = $("#navigation").ligerGetAccordionManager();
        function heightChanged(options)
        {
            if (tab)
                tab.addHeight(options.diff);
            if (accordion && options.middleHeight - 24 > 0) {

                accordion.setHeight(options.middleHeight - 24);

            }

        }

    }

    return {
        render:render
    };
});