<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-12-31
  Time: 下午2:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%--<!Doctype html>--%>
<html xmlns=http://www.w3.org/1999/xhtml>

<head>
    <title>轻量级速度测试</title>
    <link href="LigerUI/lib/ligerUI/skins/Gray/css/all.css" rel="stylesheet" type="text/css" />
    <link href="LigerUI/lib/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />

    <script src="LigerUI/lib/jquery/jquery-1.5.2.min.js" type="text/javascript"></script>
    <script src="LigerUI/lib/ligerUI/js/ligerui.all.js" type="text/javascript"></script>

    <script data-main="js/main" src="require.js"></script>
    <style type="text/css">
        body{ padding:10px; margin:0;}
        #app{  width:100%; margin:40px;  height:400px;
            margin:0; padding:0;}

        h4{ margin:20px;}
        .yangshi{
            max-width: 880px;
            margin:0 auto;
            _width:expression((document.documentElement.clientWidth||document.body.clientWidth)<880?"880px":"");
            overflow:hidden;}
    </style>
</head>
<body>
     <%--<div id="app"></div>--%>
     <%--<div class="l-page-top"></div>--%>
     <div id="app">
         <div position="left" id="navigation" title="导航栏"></div>
         <div position="center" id="framecenter" style="overflow:hidden;">
             <%--<h4>$("#app").ligerLayout({ leftWidth: 200});</h4>
             <br />
             如果上面有其他页面元素，layout会自适应调整--%>

         </div>
     </div>
</body>
</html>
