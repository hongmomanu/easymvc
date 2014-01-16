<%@ page import="Zsmzj.manager.configmanager.business.EnumControl" %>
<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("start")==null){
       out.print("缺少分页参数start");
    }else if(request.getParameter("start")==null){
        out.print("缺少分页参数limit");
    }
    else{
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String keyword=request.getParameter("keyword");
        EnumControl obj=new EnumControl();
        out.print(obj.getEnums(start,limit,keyword));
    }
%>