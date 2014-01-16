<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
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
    if(request.getParameter("businessid")==null){
       out.print("缺少参数businessid");
    }
    else{
        int businessid=Integer.parseInt(request.getParameter("businessid"));
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String totalname=request.getParameter("totalname");
        String rowsname=request.getParameter("rowsname");
        BusinessProcessControl bc=new BusinessProcessControl();

        out.print(bc.getProcessHistorybid(businessid,start,limit,totalname,rowsname));
    }
%>