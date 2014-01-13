/**
 * Created by jack on 13-12-31.
 */
define(function () {

    function render(parameters,res) {
        $.parser.parse($(parameters));
        var options = $('#processhistorygrid').datagrid('options');
        //console.log(options);
        $('#processhistorygrid').datagrid(
            {
                onBeforeLoad: function (params) {
                    params.businessid =res.form.id;
                    params.start = (options.pageNumber - 1) * options.pageSize;
                    params.limit = options.pageSize;
                    params.totalname = "total";
                    params.rowsname = "rows";
                }
            });

    }

    function rowformater(value, rowData, rowIndex) {
        return '<a>查看</a>'
    }

    return {
        render: render,
        rowformater: rowformater
    };
});