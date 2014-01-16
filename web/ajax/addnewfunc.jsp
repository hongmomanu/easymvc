<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.FuncControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("funcname")==null){
       out.print("缺少参数funcname");
    }else if(request.getParameter("functype")==null){
        out.print("缺少参数functype");
    }
    else{
        String funcname=request.getParameter("funcname");
        String functype=request.getParameter("functype");
        FuncControl role=new FuncControl();
        out.print(role.addNewFunc(funcname,functype));
    }
    //out.print("ok");
%>