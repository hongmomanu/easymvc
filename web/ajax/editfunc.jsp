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
    if(request.getParameter("funcid")==null){
       out.print("缺少参数funcid");
    }
    else{
        String funcname=request.getParameter("funcname");
        String functype=request.getParameter("functype");
        String label=request.getParameter("label");
        String imgurl=request.getParameter("imgurl");
        int sortnum=Integer.parseInt(request.getParameter("sortnum"));
        int funcid=Integer.parseInt(request.getParameter("funcid"));
        FuncControl func=new FuncControl();
        out.print(func.EditFunc(funcid,funcname,functype,label,imgurl,sortnum));
    }
    //out.print("ok");
%>