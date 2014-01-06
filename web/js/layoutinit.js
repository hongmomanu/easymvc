/**
 * Created by jack on 14-1-6.
 */
define(function(){

    function setCookie(name,value) {//两个参数，一个是cookie的名子，一个是值
        var Days = 30; //此 cookie 将被保存 30 天
        var exp = new Date();    //new Date("December 31, 9998");
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }

    function getCookie(name) {//取cookies函数
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null) return unescape(arr[2]); return null;
    }


    $(function() {
        var themes = {
            'gray' : 'easyui/themes/gray/easyui.css',
            'black' : 'easyui/themes/black/easyui.css',
            'bootstrap' : 'easyui/themes/bootstrap/easyui.css',
            'default' : 'easyui/themes/default/easyui.css',
            'metro' : 'easyui/themes/metro/easyui.css',
            'pepper-grinder' : 'easyui/themes/pepper-grinder/easyui.css',
            'blue' : 'easyui/themes/default/easyui.css',
            'cupertino' : 'easyui/themes/cupertino/easyui.css',
            'dark-hive' : 'easyui/themes/dark-hive/easyui.css',
            'sunny' : 'easyui/themes/sunny/easyui.css'
        };

        var skins = $('.li-skinitem span').click(function() {
            var $this = $(this);
            if($this.hasClass('cs-skin-on')) return;
            skins.removeClass('cs-skin-on');
            $this.addClass('cs-skin-on');
            var skin = $this.attr('rel');
            $('#swicth-style').attr('href', themes[skin]);
            setCookie('cs-skin', skin);
            skin == 'dark-hive' ? $('.cs-north-logo').css('color', '#FFFFFF') : $('.cs-north-logo').css('color', '#000000');
        });

        if(getCookie('cs-skin')) {
            var skin = getCookie('cs-skin');
            $('#swicth-style').attr('href', themes[skin]);
            $this = $('.li-skinitem span[rel='+skin+']');
            $this.addClass('cs-skin-on');
            skin == 'dark-hive' ? $('.cs-north-logo').css('color', '#FFFFFF') : $('.cs-north-logo').css('color', '#000000');
        }
    });




})