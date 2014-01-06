<%-- 
    Document   : index
    Created on : 2013-1-26, 12:51:25
    Author     : jack
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>用户登入</title>

    <style type="text/css">
            /*html {background-color:#06294e;}*/
        body {background-image:url(img/loginbg.jpg); background-position:50% 50%; background-repeat:no-repeat;}
        form {padding-top:300px; text-align:center}

        table, tr, td, th, input{ border:none;}
            /*.table-4 {text-align:center}
            .table-4 th, .table-4 td{padding:2px}
            .table-4 tr{ height:30px;padding: 1px}*/
        .rowhead {font-family:'微软雅黑',Tahoma,arial,verdana,sans-serif;width:80px;
            font-weight:normal; font-size:14px;  border:none; text-align:right;}

        .text-2  {width:150px; height:22px; background-color:#a4c5e0; border:1px solid #035793; font-size:16px; font-weight:bold}
        .select-2{width:150px}

        #welcome     {background:none; text-align:left; border:none; color:#FFF; padding-top:8px; font-size:16px; font-weight:normal}
        #poweredby   {color:#fff; margin-top:30px; height:50px; text-align:center; line-height:1; font-size:14px;}
        #poweredby a {color:#fff}
        #keeplogin   {color:white; font-size:14px; text-align:left;}
        .button-s {height:30px; width:80px; font-size:14px; font-weight:bold; border:none; text-align:right;}
        .debugwin, .helplink{display:none}
        #updater {width:500px; height:30px; border:none; overflow:hidden;}

        .hidden{display:none}   /* Add it to avoid the white flash when load css later for the updater. */
        #demoUsers {margin:25px 0px -15px 0px;}
        #demoUsers span{color:white}
        #demoUsers a{color:yellow}
        #browserlinkdiv{
            position: absolute;
            left: 10px;
            bottom: 20px;
            text-align: left;
            font-size: 13px;
        }
        #browserlinkdiv a{

        }
    </style>

    <%--<link rel="stylesheet" type="text/css" href="css/login.css" />--%>

    <script type="text/javascript">

    </script>

</head>

<body>

<header class="body">


    <h1>

        <%-- <a style="padding-right:10px;text-decoration:none;color:white;   "  href="login.jsp">用户登录</a>
         <a style="padding-right:10px;text-decoration:none;display: none"  href="register.jsp">新用户</a>--%>
    </h1>

</header>
<section class="body">
    <%--<form method="post" action="login">
        <label>用户名</label>
        <input name="username" required="true" placeholder="在这里输入用户名">
        <label>密码</label>
        <input name="password" required="true"  placeholder="在这里输入密码" type="password">
        <input id="submit" type="submit" value="登录" name="submit">

    </form>--%>
    <form id="myform" method='post' action="login" >
        <table align='center' class='table-4'>
            <!--<caption id='welcome'>欢迎使用舟山市民政救助系统</caption>-->
            <tr>
                <td class='rowhead'>用户名：</td>
                <td><input tabindex="1" class='text-2' type='text' required="true" placeholder="在这里输入用户名" name='username' id='account' /></td>
                <!--<td rowspan='2'>
                    <input type='submit' id='submit' value='登录' class='button-s' style="text-align:center" />
                </td>-->
                <td rowspan="2" align="center" >
                    <div tabindex="3" id="img_div">
                        <img id="loginbtn" src="img/loginbtn.png" onclick="javascript:btnClick();">
                        <!--<input type='submit' id='submit' value='登录' class='button-s' style="text-align:center" />-->
                    </div>
                </td>
            </tr>

            <tr>
                <td class='rowhead'>密&nbsp;&nbsp;&nbsp;码：</td>
                <td><input tabindex="2" class='text-2' type='password' required="true" placeholder="在这里输入密码"
                           name='password' onkeydown="javascript:onEnterKeyDown(this,event);"/></td>

            </tr>
            <tr>
                <td colspan="2" align="right" style="font-size: 13px;">&nbsp;<%= request.getSession().getAttribute("loginerromsg")==null?"":((String)request.getSession().getAttribute("loginerromsg")).trim()%></td>
            </tr>

        </table>

        <div id='poweredby'>
            技术支持：浙江省海予信息技术有限公司
        </div>
        <div id='browserlinkdiv'>
            <span>如果系统不流畅，建议使用谷歌浏览器:</span><a href="http://172.25.102.101:8080/ext-4.2/ChromeStandaloneSetup.exe">下载</a>
        </div>
    </form>
        <%
            request.getSession().setAttribute("loginerromsg",null);
        %>

</section>

<div id="center" style=" margin:50px auto; width:350px;">
</div>

</body>
</html>
<script type="text/javascript">

    window.onload=function(){
        document.getElementById("account").focus();

        var imgdiv=document.getElementById('img_div');

        if(document.addEventListener){
            imgdiv.addEventListener('keydown',onKeyDown);
        }else if(document.attachEvent){
            imgdiv.attachEvent('onkeydown',onKeyDown);
        }
    };


    function btnClick(){
        document.getElementById("myform").submit();
    }
    function onEnterKeyDown(src,e){
        var keyPressed;
        if (window.event){
            keyPressed = window.event.keyCode; // IE
        }
        else{
            keyPressed = e.which; // Firefox
        }
        if (keyPressed == 13) {
            btnClick();
        }
    }

    function onKeyDown(e){
        onEnterKeyDown('',e);
    }



</script>