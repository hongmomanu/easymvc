<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.RoleControl" %>
<%@ page import="Zsmzj.manager.configmanager.business.DivisionControl" %>
<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Enumeration" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("id")==null){
       out.print("缺少参数id");
    }else if(request.getParameter("idname")==null){
        out.print("缺少参数idname");
    }else if(request.getParameter("tablename")==null){
        out.print("缺少参数tablename");
    }else if(request.getParameter("isrowid")==null){
        out.print("缺少参数isrowid");
    }
    else{
        int id=Integer.parseInt(request.getParameter("id"));
        String idname =request.getParameter("idname");
        String tablename=request.getParameter("tablename");
        boolean isrowid=Boolean.parseBoolean(request.getParameter("isrowid"));

        Map<String,Object> params=new HashMap<String,Object>();
        /*
        *获取请求参数
        */
        Enumeration e  =(Enumeration) request.getParameterNames();
        while(e.hasMoreElements()){

            String  parName=(String)e.nextElement();
            if(parName.equals("tablename")||parName.equals("id")||parName.equals("idname")||parName.equals("isrowid"))continue;
            else params.put(parName,request.getParameter(parName));
        }

        BusinessProcessControl bc=new BusinessProcessControl();
        out.print(bc.updateCommonbyid(id,idname,tablename,isrowid,params));
    }
%>