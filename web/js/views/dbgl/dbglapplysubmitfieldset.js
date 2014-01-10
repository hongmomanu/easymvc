define( function () {

    function render(parameters) {
        /**这里添加审批信息绑定事件**/


        $.parser.parse($(parameters));
        var curr_time = new Date();
         var strDate = curr_time.getFullYear()+"-";
        strDate += curr_time.getMonth()+1+"-";
         strDate += curr_time.getDate();
        var next_time=new Date(curr_time.setDate(curr_time.getDate()+7));

        var strDate_end = next_time.getFullYear()+"-";
        strDate_end += next_time.getMonth()+1+"-";
        strDate_end += next_time.getDate();

        $("#helpbgtime").datebox("setValue", strDate);
        $("#helpedtime").datebox("setValue", strDate_end);




    }

    return {
        render: render
    };
});