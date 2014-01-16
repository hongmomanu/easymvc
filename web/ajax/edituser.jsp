<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.FuncControl" %>
<%@ page import="Zsmzj.manager.usermanager.business.UserControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("userid")==null){
       out.print("缺少参数userid");
    }
    else{
        String username=request.getParameter("username");
        String displayname=request.getParameter("displayname");
        String password=request.getParameter("password");
        String oldpassword=request.getParameter("oldpassword");
        boolean iscommon=Boolean.parseBoolean(request.getParameter("iscommon"));
        int userid=Integer.parseInt(request.getParameter("userid"));
        UserControl user=new UserControl();
        out.print(user.EditUser(userid,username,displayname,password,iscommon,oldpassword));
    }
    //out.print("ok");
%>