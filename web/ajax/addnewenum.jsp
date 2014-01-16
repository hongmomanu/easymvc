<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.configmanager.business.EnumControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("enumlabel")==null){
       out.print("缺少参数enumlabel");
    }else if(request.getParameter("enumtype")==null){
        out.print("缺少参数enumtype");
    }
    else if(request.getParameter("enumvalue")==null){
        out.print("缺少参数enumvalue");
    }
    else{
        String enumlabel=request.getParameter("enumlabel");
        String enumtype=request.getParameter("enumtype");
        String enumvalue=request.getParameter("enumvalue");
        EnumControl role=new EnumControl();
        out.print(role.addEnum(enumlabel,enumvalue,enumtype));
    }
    //out.print("ok");
%>