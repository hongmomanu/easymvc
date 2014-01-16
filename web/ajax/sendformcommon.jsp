<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Enumeration" %>
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


        Map<String,Object> params=new HashMap<String,Object>();
        String tablename=request.getParameter("tablename");
        /*
        *获取请求参数
        */
        Enumeration e  =(Enumeration) request.getParameterNames();
        while(e.hasMoreElements()){

            String  parName=(String)e.nextElement();
            if(parName.equals("tablename"))continue;
            else params.put(parName,request.getParameter(parName));
        }

        BusinessProcessControl business=new BusinessProcessControl();
        out.print(business.saveCommonForm(params,tablename));
%>