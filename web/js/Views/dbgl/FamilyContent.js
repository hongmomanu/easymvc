/**
 * Created by jack on 13-12-31.
 */
define(function(){

    function render(parameters){

        g = $("#familymemberscontent").ligerGrid({
            columns: [
                {display: '主键', name: 'CustomerID', align: 'left', width: 60 } ,
                { display: '户主姓名', name: 'CompanyName', minWidth: 60 ,width: 20, frozen: true},
                { display: '性别', name: 'ContactName', width: 60, align: 'left' },
                { display: '身份证号', name: 'ContactName', width: 60, align: 'left' },
                { display: '测试', name: 'ContactName', width: 60, align: 'left' },
                { display: '测试1', name: 'ContactName', width: 60, align: 'left', frozen: false},
                { display: '测试1', name: 'City', width: 60 },
                { display: '身份证号', name: 'ContactName', width: 60, align: 'left' },
                { display: '测试', name: 'ContactName', width: 60, align: 'left' },
                { display: '测试1', name: 'ContactName', width: 60, align: 'left', frozen: false},
                { display: '测试1', name: 'City', width: 60 },
                { display: '身份证号', name: 'ContactName', width: 60, align: 'left' },
                { display: '测试', name: 'ContactName', width: 60, align: 'left' },
                { display: '测试1', name: 'ContactName', width: 60, align: 'left', frozen: false},
                { display: '测试1', name: 'City', width: 60 }
            ], data: [], pageSize: 20, sortName: 'CustomerID',
            width: '800', height: '120', checkbox: true,rownumbers:true,
            fixedCellHeight:false
        });
       return   null;

    }

    return {
        render:render
    };
});