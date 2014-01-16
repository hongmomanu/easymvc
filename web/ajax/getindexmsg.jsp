<%@ page import="Zsmzj.manager.usermanager.business.FuncControl" %>
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
    if(request.getParameter("roleid")==null){
       out.print("缺少参数roleid");
    }else if(request.getParameter("userid")==null){
        out.print("缺少参数userid");
    }
    else{
        int roleid=Integer.parseInt(request.getParameter("roleid"));
        int userid=Integer.parseInt(request.getParameter("userid"));
        BusinessProcessControl bc=new BusinessProcessControl();
        out.print(bc.getIndexMsg(roleid,userid));
    }
%>