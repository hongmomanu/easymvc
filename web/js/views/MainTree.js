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
                onBeforeExpand:function(node){
                    this.searchtype=node.text;

                },
                onLoadSuccess:function(node, data){

                },
                onBeforeLoad:function(node, param){
                    param.roleid=roleid;
                    //param.leaf=true;
                    if(this.searchtype){
                        param.leaf=true;
                    }else{
                        this.searchtype="";
                    }
                    param.type=$('#dbglacc').attr('name')+this.searchtype;
                },
                url:'ajax/gettreefuncsbyrule.jsp'

            });
            me.tree=tree;

        }
    }

    return a;
});