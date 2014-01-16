<%@ page import="Zsmzj.manager.usermanager.business.FuncControl" %>
<%@ page import="Zsmzj.manager.configmanager.business.DivisionControl" %>
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
    if(request.getParameter("id")==null){
       out.print("缺少参数id");
    }
    else{
        int parentid=Integer.parseInt(request.getParameter("id"));
        boolean onlychild=request.getParameter("onlychild")==null?false:true;
        DivisionControl dc=new DivisionControl();
        out.print(dc.getDivisions(parentid,onlychild));
    }
%>