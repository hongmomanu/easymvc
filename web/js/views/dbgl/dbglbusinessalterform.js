define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/dbgl/dbglbusinessapplyform'],function(dbglbusinessapplyform){
            dbglbusinessapplyform.render(lookupname,folder,ajaxloading,res);

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
                                debug  : true,
                                targetElement : $('#formcontentpanel'),
                                monitorTargetChange:false


                            };

                            $('#formcontentpanel').paged_scroll(settingsDiv);

                        });

                    }
                });
            }
            isscroll_func();




            //$('#appformmore').bind("click",function(){alert(1);});

        });

    }
    return {
        render: render
    };
});