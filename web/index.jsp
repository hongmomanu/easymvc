<%@ page import="Zsmzj.listener.SessionListener" %>
<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-12-31
  Time: 下午2:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    if(request.getSession().getAttribute("username")==null) {
        response.sendRedirect("login.jsp");
    }

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <title>jquery ui测试</title>
    <%--<link rel="stylesheet" type="text/css" href="easyui/themes/cupertino/easyui.css" id="swicth-style">--%>
    <link rel="stylesheet" type="text/css" href="index.css">
    <%--<script type="text/javascript" src="easyui/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="easyui/locale/easyui-lang-zh_CN.js"></script>--%>
    <%--<script data-main="js/mainapp" src="require.js"></script>--%>
    <script type="text/javascript" src="js/config.js"></script>


    <script type="text/javascript">
        /*session全局变量*/
        var onlinenums=<%= SessionListener.size()%>;
        var userid=<%=request.getSession().getAttribute("userid")%>;
        var username="<%=request.getSession().getAttribute("username")%>";
        var roleid=<%=request.getSession().getAttribute("roleid")%>;
        var displayname="<%=request.getSession().getAttribute("displayname")%>";
        var divisionpath="<%=request.getSession().getAttribute("divisionpath")%>";
        var password="<%=request.getSession().getAttribute("password")%>";
        var divisionid=<%=request.getSession().getAttribute("divisionid")%>;


    </script>

    <script>
        /**加载easyui**/

        document.write('<script type="text/javascript"  src="'+extLocation+
                'jquery-1.8.0.min.js"><\/script>');
        document.write('<script type="text/javascript"  src="'+extLocation+
                'jquery.easyui.min.js"><\/script>');
        document.write('<script type="text/javascript"  src="'+extLocation+
                'locale/easyui-lang-zh_CN.js"><\/script>');
        document.write('<link rel="stylesheet" type="text/css" id="swicth-style" href="'+extLocation+
                'themes/cupertino/easyui.css"><\/>');//resources/css/ext-all.css

    </script>
    <script data-main="js/mainapp" src="require.js"></script>
    <script type="text/javascript"  src="js/commonfuncs/jquery.json-2.4.js"></script>
</head>
<body class="easyui-layout" id="mainlayoutpanel">
<div region="north" border="true" class="cs-north" >
    <div class="cs-north-bg">
        <div class="cs-north-logo">社会救助管理系统</div>
        <ul class="ui-skin-nav">
            <li class="li-skinitem" title="gray"><span class="gray" rel="gray"></span></li>
            <li class="li-skinitem" title="default"><span class="default" rel="default"></span></li>
            <li class="li-skinitem" title="bootstrap"><span class="bootstrap" rel="bootstrap"></span></li>
            <li class="li-skinitem" title="black"><span class="black" rel="black"></span></li>
            <li class="li-skinitem" title="metro"><span class="metro" rel="metro"></span></li>
            <li class="li-skinitem" title="pepper-grinder"><span class="pepper-grinder" rel="pepper-grinder"></span></li>
            <li class="li-skinitem" title="blue"><span class="blue" rel="blue"></span></li>
            <li class="li-skinitem" title="cupertino"><span class="cupertino" rel="cupertino"></span></li>
            <li class="li-skinitem" title="dark-hive"><span class="dark-hive" rel="dark-hive"></span></li>
            <li class="li-skinitem" title="sunny"><span class="sunny" rel="sunny"></span></li>
        </ul>
        <input id="routermenu" class="easyui-combobox" data-options="
        valueField: 'value',
        mode:'remote',
        textField: 'name',
        url: 'ajax/getfuncsbyrule.jsp'">

    </div>
</div>
<div region="west" id="westpanel" border="true" split="true" title="Navigation" class="cs-west">

</div>
<div id="mainPanle" region="center" border="true" border="false">
    <div id="tabs" class="easyui-tabs"   fit="true" border="false" >
        <div title="主页">
            <div class="cs-home-remark">
                <h1>jack的实验室</h1> <br>
                测试人：jack <br>
                说明：jQuery ui。
            </div>
        </div>
    </div>
</div>

<div region="south" border="false" class="cs-south">@hongmomanu@gmail.com</div>


</body>
</html>
