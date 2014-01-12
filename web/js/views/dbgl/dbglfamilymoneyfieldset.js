define( function () {

    function render(parameters,res) {
        $('.moneybasic').blur(function(){

            require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                familygridfieldsbinds.moneychange('.moneybasic');
            });

        });
        if(res){
            $('#mainform').form('load',res.form);
        }
    }

    return {
        render: render
    };
});