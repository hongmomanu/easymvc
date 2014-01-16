<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("querystr")==null){
       out.print("缺少参数querystr");
    }if(request.getParameter("tablename")==null){
        out.print("缺少参数tablename");
    }
    else{
        BusinessProcessControl bp=new BusinessProcessControl();

        String querystr=request.getParameter("querystr");
        String tablename=request.getParameter("tablename");
        out.print(bp.getCommonList(querystr,tablename));
    }
    //out.print("ok");
%>