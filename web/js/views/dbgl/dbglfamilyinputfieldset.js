define( function () {

    function render(parameters,res) {
        /**这里添加绑定事件**/
        $('.inputbasic').blur(function(){
            require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                familygridfieldsbinds.moneychange('.inputbasic');
                var arr=$('.inputbasic');
                var sum=parseFloat($(arr[arr.length-1]).val());
                var num=parseInt($('#FamilyPersons').val());
                $('#incomesumareaperson').val((sum/12/num).toFixed(1));
                $('#incomesumarea').val((sum/12).toFixed(1));

            });

        });
        if(res){
            $(parameters).form('load',res.form);
        }

    }

    return {
        render: render
    };
});