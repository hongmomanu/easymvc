/**
 * Created by jack on 13-12-31.
 */
define(function(){

    var a={

        render:function(parameters){
            var me=this;
            var tree=$('#dbglacc').tree({
                //url:'tree_data.json'
                onClick: me.itemclick,
                data: [{
                    text: '审批系统',
                    id:0,
                    state: 'closed',
                    children: [{
                        id:1,
                        text: '业务申请1',
                        value:'views/dbgl/BasicInfo'
                    },{
                        id:2,
                        text: '业务办理',
                        value:'views/dbgl/BusinessGrid'
                    }]
                },{
                    text: 'Item2',
                    state: 'closed'
                }]
            });
            me.tree=tree;

        }
    }

    return a;
});