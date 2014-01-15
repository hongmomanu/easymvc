define(function () {

    function render(lookupname,folder,ajaxloading,res) {



        $('#formcontentpanel').panel({
            onResize:function(width, height){

                $('#formcontentpanel').height($('#formcontentpanel').height()-30);
                $('#form_btns').height(30);
            }
        });

        var btns=$('.aprovlfuncs_btns');
        for(var i=0;i<btns.length;i++){
            (function (index){
                require(['commonfuncs/LookupItemName'], function(LookupItemName){
                    var isfind=LookupItemName.lookup(LookupItemName.lookup(processRoleBtn,
                        {name:"name",value:res.form['processstatus']})?LookupItemName.lookup(processRoleBtn,
                        {name:"name",value:res.form['processstatus']}).children:null,
                        {name:'name',value:$(btns[index]).text()});
                    if(isfind){
                        $(btns[index]).show();
                        $(btns[index]).linkbutton();
                        $(btns[index]).click(function(){
                            var clickitem=this;
                            require(['commonfuncs/ButtonsEvent'],function(ButtonsEvent){
                                ButtonsEvent.approvl_btns(clickitem,res);
                            });
                        });
                    }else{
                        $(btns[index]).hide();
                    }
                })

            })(i);

        }

        require(['views/dbgl/dbglbusinessapplyform'],function(dbglbusinessapplyform){
            //dbglbusinessapplyform.render(lookupname,folder,ajaxloading,res);

            function isscroll_func(){
                require(['commonfuncs/IsScroll'],function(IsScroll){
                    if(!IsScroll.isYscroll('formcontentpanel')){
                        //$('#appformmore').click();
                        require(['commonfuncs/FormAdd'],function(FormAdd){
                            FormAdd.addnewchild(lookupname,folder,ajaxloading,false,res,isscroll_func);
                        });

                    }else{

                        require(['jqueryplugin/jquery-paged-scroll'],function(scrolljs){
                            var settingsDiv = {
                                handleScroll:function (page,container,doneCallback) {
                                    //alert(1);
                                    if($('#mainform').children().length<applyformviews[lookupname].length){
                                        require(['commonfuncs/FormAdd'],function(FormAdd){
                                            FormAdd.addnewchild(lookupname,folder,ajaxloading,false,res,doneCallback);
                                        });
                                    }else{
                                        doneCallback();
                                    }


                                },
                                //        pagesToScroll : 5,
                                triggerFromBottom:'1',
                                loader:'<div class="loader"></div>',
                                debug  : false,
                                targetElement : $('#formcontentpanel'),
                                monitorTargetChange:false


                            };

                            $('#formcontentpanel').paged_scroll(settingsDiv);

                        });

                    }
                });
            }
            isscroll_func();


        });

    }
    return {
        render: render
    };
});