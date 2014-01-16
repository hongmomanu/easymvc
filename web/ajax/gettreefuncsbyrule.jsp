<%@ page import="Zsmzj.manager.usermanager.business.FuncControl" %>
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
    if(request.getParameter("roleid")==null){
       out.print("缺少参数roleid");
    }else if(request.getParameter("type")==null){
        out.print("缺少参数type");
    }
    else{
        int roleid=Integer.parseInt(request.getParameter("roleid"));
        String type=request.getParameter("type");
        String leaf=request.getParameter("leaf");
        FuncControl role=new FuncControl();
        out.print(role.getFuncsByRole(roleid,type,leaf));
    }
%>