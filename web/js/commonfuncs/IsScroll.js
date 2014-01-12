/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={

        isYscroll:function(id){
            var eDiv=$('#'+id);
            if(eDiv.css("overflow-y")!="hidden"
                &&eDiv.css("overflow-y")!="visible"
                &&eDiv.css("scroll")!="no"
                &&eDiv.attr("scrollHeight")>eDiv.attr("clientHeight"))
            {
                return true
            }else {
                return false;
            }

        }
    }

    return a;
});
