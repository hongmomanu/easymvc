define( function () {

    function render(parameters,res) {
       require(['views/dbgl/dbglapplysubmitfieldset'],function(dbglapplysubmitfieldset){
           dbglapplysubmitfieldset.render(parameters,res);

       });

    }
    return {
        render: render
    };
});