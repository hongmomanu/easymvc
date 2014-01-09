/**
 * Created by jack on 13-12-31.
 */
define(function(){

    var a={

        render:function(parameters){
            $('#dbglacc,#dbedgeacc').tree({
                //url:'tree_data.json'
                onClick: function (node){

                    var tree=$(this);
                    var me=this;
                    if(tree.tree('isLeaf', node.target)){

                        if(!$('#tabs').tabs('exists',1)||me.nodeid!=node.id){
                            var folder=tree.attr('folder');
                            require(['commonfuncs/LookupItemName'],function(LookupItemName){
                                var views=[node.value];
                                var htmlfile='text!'+folder+node.value+'.htm';
                                var jsfile=folder+node.value;
                                parameters.LoadingMask.ajaxLoading();

                                require([htmlfile,jsfile],function(htmlfile,jsfile){
                                    var options= {
                                        title: node.text,
                                        content: htmlfile,
                                        closable: true
                                    };
                                    if($('#tabs').tabs('exists',1)){

                                        $('#tabs').tabs('select', 1);
                                        $('#tabs').tabs('close',1);

                                    }
                                    $('#tabs').tabs('add',options);
                                    var lookupname=LookupItemName.lookupitemname(formwidgettype,node.value);
                                    if(lookupname){
                                        var firstform=applyformviews[lookupname][0];
                                        firstformhtml='text!'+folder+firstform+'.htm';
                                        firstformjs=folder+firstform;
                                        require([firstformhtml,firstformjs],function(firstformhtml,firstformjs){
                                            $('#mainform').append(firstformhtml);
                                            firstformjs.render();
                                            parameters.LoadingMask.ajaxLoadEnd();
                                        });
                                    }

                                    jsfile.render(lookupname,folder,parameters);

                                })

                                /*var viewsjs=[];
                                var lookupname=LookupItemName.lookupitemname(formwidgettype,node.value);
                                if(lookupname){
                                    views=views.concat(applyformviews[lookupname]);
                                    viewsjs=viewsjs.concat(applyformviewsjs[lookupname]);
                                }
                                //如果没有自定义js则加载默认js与view同名
                                if(viewsjs.length==0){
                                    viewsjs=[node.value];
                                }
                                for(var i=0;i<views.length;i++){
                                    views[i]='text!'+folder+views[i]+'.htm';
                                }
                                for(var i=0;i<viewsjs.length;i++){
                                    viewsjs[i]=folder+viewsjs[i];
                                }
                                views=views.concat(viewsjs);

                                parameters.LoadingMask.ajaxLoading();
                                require(views, function(){
                                    var basicinfo='<div></div>';
                                    basicinfo=$(basicinfo).append(arguments[0])
                                    for(var i=1;i<(arguments.length-viewsjs.length);i++){
                                        $(basicinfo).find('#mainform').append(arguments[i]);
                                    }
                                    var options= {
                                        title: node.text,
                                        content: basicinfo.html(),
                                        closable: true
                                    };
                                    if($('#tabs').tabs('exists',1)){

                                        $('#tabs').tabs('select', 1);
                                        $('#tabs').tabs('close',1);

                                    }
                                    $('#tabs').tabs('add',options);
                                    parameters.LoadingMask.ajaxLoadEnd();

                                    for(var j=0;j<viewsjs.length;j++){
                                        arguments[arguments.length-1-j].render();
                                    }

                                });*/
                                me.nodeid=node.id;
                            });

                            /*parameters.LoadingMask.ajaxLoading();
                            require(['text!'+node.value+'.htm',node.value], function(basicinfo,basicinfojs){
                                var options= {
                                    title: node.text,
                                    content: basicinfo,
                                    closable: true
                                };
                                if($('#tabs').tabs('exists',1)){

                                    $('#tabs').tabs('select', 1);
                                    $('#tabs').tabs('close',1);

                                }
                                $('#tabs').tabs('add',options);
                                parameters.LoadingMask.ajaxLoadEnd();
                                *//**//*
                                basicinfojs.render();

                            });
                            this.nodeid=node.id;*/
                        }

                    }

                },
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
                    param.type=$(this).attr('name')+this.searchtype;
                },
                url:'ajax/gettreefuncsbyrule.jsp'

            });

        }
    }

    return a;
});