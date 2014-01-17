define( function () {

    function render(parameters,res) {
        /**这里添加住房绑定事件**/
        $(parameters).find(".lazy-combobox").combobox({
            onShowPanel: function () {
                var searchtype = $(this).attr('searchtype');
                var url = 'ajax/getenumbytype.jsp?type=' + searchtype;
                $(this).combobox('reload', url);
            }

        });
        if(res){
            $(parameters).form('load',res.form);
        }

    }

    return {
        render: render
    };
});