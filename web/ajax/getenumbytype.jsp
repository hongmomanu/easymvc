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
    if(request.getParameter("type")==null){
       out.print("缺少参数type");
    }
    else{

        String type=request.getParameter("type");
        EnumControl obj=new EnumControl();
        out.print(obj.getEnumsBytype(type));
    }
%>