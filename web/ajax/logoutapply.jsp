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
    if(request.getParameter("businessid")==null){
       out.print("缺少参数businessid");
    }
    else{

        Map<String,Object> params=new HashMap<String,Object>();
        String familymembers="";
        String affixfiles="";
        String signatures="";
        int businessid=Integer.parseInt(request.getParameter("businessid"));
        /*
        *获取请求参数
        */
        Enumeration e  =(Enumeration) request.getParameterNames();
        while(e.hasMoreElements()){

            String  parName=(String)e.nextElement();
            if(parName.equals("familymembers"))familymembers=request.getParameter(parName);
            else if(parName.equals("affixfiles"))affixfiles=request.getParameter(parName);
            else if(parName.equals("signatures"))signatures=request.getParameter(parName);
            else if(parName.equals("mktime")||parName.equals("mkperson")||parName.equals("businessid")
                    ||parName.equals("displayname"))continue;
            else params.put(parName,request.getParameter(parName));
        }

        BusinessProcessControl business=new BusinessProcessControl();
        out.print(business.logoutUpdateBusinessApply(businessid,params,familymembers,affixfiles,signatures));
    }
%>