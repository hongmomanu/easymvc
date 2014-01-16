<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.UserControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("roleid")==null){
       out.print("缺少参数roleid");
    }
    else if(request.getParameter("password")==null){
        out.print("缺少参数password");
    }
    else if(request.getParameter("username")==null){
        out.print("缺少参数username");
    }else if(request.getParameter("displayname")==null){
        out.print("缺少参数displayname");
    }else if(request.getParameter("divisionid")==null){
        out.print("divisionid");
    }
    else{
        int roleid=Integer.parseInt(request.getParameter("roleid"));
        int divisionid=Integer.parseInt(request.getParameter("divisionid"));
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        String displayname=request.getParameter("displayname");
        UserControl user=new UserControl();
        out.print(user.addNewUser(username,password,roleid,divisionid,displayname));
    }
    //out.print("ok");
%>