<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-12
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>


<%@ page import="Zsmzj.manager.usermanager.business.RoleControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("roleid")==null){
        out.print("缺少分页参数roleid");
    }
    else{
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        int roleid=Integer.parseInt(request.getParameter("roleid"));
        String keyword=request.getParameter("keyword");
        String type=request.getParameter("type");
        RoleControl role=new RoleControl();
        out.print(role.getRoleFuncs(start,limit,keyword,roleid,type));
    }
    //out.print("ok");
%>