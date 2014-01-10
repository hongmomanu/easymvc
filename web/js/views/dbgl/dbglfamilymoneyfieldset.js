define( function () {

    function render(parameters) {
        $('.moneybasic').blur(function(){

            require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                familygridfieldsbinds.moneychange('.moneybasic');
            });

        });
    }

    return {
        render: render
    };
});