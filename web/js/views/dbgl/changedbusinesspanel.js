/**
 * Created by jack on 13-12-31.
 */
define(function () {

    function render(parameters) {
        var type=processstatustype.change;
        require(['commonfuncs/BusinessGridCommon'],function(BusinessGridCommon){
            BusinessGridCommon.initbusinessgrid(type);

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