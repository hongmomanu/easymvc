<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.FuncControl" %>
<%@ page import="Zsmzj.manager.usermanager.business.RoleControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("roleid")==null){
       out.print("{sucess:false,msg:\"缺少参数roleid\"}");
    }
    else{
        int roleid=Integer.parseInt(request.getParameter("roleid"));
        String[] func_arr=request.getParameterValues("funcid");
        String[] delete_arr=request.getParameterValues("deleteid");
        RoleControl role=new RoleControl();
        out.print(role.makeRoleFuncs(roleid,func_arr,delete_arr));
        //out.print("ok");
    }
%>