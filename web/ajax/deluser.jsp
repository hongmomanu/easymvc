<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.UserControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("userid")==null){
       out.print("缺少分页参数userid");
    }
    else{
        int userid=Integer.parseInt(request.getParameter("userid"));
        UserControl user=new UserControl();
        out.print(user.delUser(userid));
    }
%>