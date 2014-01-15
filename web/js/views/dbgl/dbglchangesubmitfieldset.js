define( function () {

    function render(parameters,res) {
       require(['views/dbgl/dbglapplysubmitfieldset'],function(dbglapplysubmitfieldset){
           dbglapplysubmitfieldset.render(parameters,res);
           var clickitem=$('#appformsubmit_saveapplychange');
           if(clickitem.length>0)clickitem.linkbutton('enable');
       });

    }
    return {
        render: render
    };
});