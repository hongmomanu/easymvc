<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.RoleControl" %>
<%@ page import="Zsmzj.manager.configmanager.business.DivisionControl" %>
<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("id")==null){
       out.print("缺少参数id");
    }else if(request.getParameter("idname")==null){
        out.print("缺少参数idname");
    }else if(request.getParameter("tablename")==null){
        out.print("缺少参数tablename");
    }else if(request.getParameter("isrowid")==null){
        out.print("缺少参数isrowid");
    }
    else{
        int id=Integer.parseInt(request.getParameter("id"));
        String idname =request.getParameter("idname");
        String tablename=request.getParameter("tablename");
        boolean isrowid=Boolean.parseBoolean(request.getParameter("isrowid"));
        BusinessProcessControl bc=new BusinessProcessControl();
        out.print(bc.delCommonbyid(id,idname,tablename,isrowid));
    }
%>