<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.configmanager.business.DivisionControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("divisionid")==null){
       out.print("缺少参数divisionid");
    }
    else{
        String divisionname=request.getParameter("divisionname");
        int divisionid=Integer.parseInt(request.getParameter("divisionid"));
        String signaturepath=request.getParameter("signaturepath");
        DivisionControl dc=new DivisionControl();
        out.print(dc.editDivision(divisionid,divisionname,signaturepath));
    }
    //out.print("ok");
%>