define(function () {

    function render(parameters) {
        /**这里添加住房绑定事件**/
        $(parameters).find(".lazy-combobox").combobox({
            onShowPanel: function () {
                var searchtype = $(this).attr('searchtype');
                var url = 'ajax/getenumbytype.jsp?type=' + searchtype;
                $(this).combobox('reload', url);
            }

        });
        /*计算帮助金额*/
        require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
            familygridfieldsbinds.caculatehelpmoney();
        });


    }

    return {
        render: render
    };
});