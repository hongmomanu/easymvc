<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.RoleControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("start")==null){
       out.print("缺少分页参数start");
    }else if(request.getParameter("limit")==null){
        out.print("缺少分页参数limit");
    }
    else{
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String keyword=request.getParameter("keyword");
        RoleControl role=new RoleControl();
        out.print(role.getRoles(start,limit,keyword));
    }
    //out.print("ok");
%>