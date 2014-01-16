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
    if(request.getParameter("node")==null){
       out.print("缺少参数node");
    }
    else{
        int parentid=Integer.parseInt(request.getParameter("node"));
        boolean onlychild=request.getParameter("onlychild")==null?false:true;
        DivisionControl dc=new DivisionControl();
        out.print(dc.getDivisions(parentid,onlychild));
        /*out.print("{\"text\":\"\",\"value\":1,\"children\":[{\"text\": \"舟山市\",\"id\":12,\"expanded\": false}]}");*/
    }
%>