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
    if(request.getParameter("divisionname")==null){
       out.print("缺少参数divisionname");
    }
    else{
        String divisionname=request.getParameter("divisionname");
        String divisionpath=request.getParameter("divisionpath")+divisionname;
        int parentid=Integer.parseInt(request.getParameter("parentid"));
        String signaturepath=request.getParameter("signaturepath");
        DivisionControl dc=new DivisionControl();
        out.print(dc.addNewDivision(divisionname,divisionpath,parentid,signaturepath));
    }
    //out.print("ok");
%>