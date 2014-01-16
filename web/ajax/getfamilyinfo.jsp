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
    if(request.getParameter("limit")==null){
       out.print("缺少参数limit");
    }if(request.getParameter("start")==null){
        out.print("缺少参数start");
    }
    else{
        BusinessProcessControl bp=new BusinessProcessControl();
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String bgdate=request.getParameter("bgdate");
        String eddate=request.getParameter("eddate");
        String keyword=request.getParameter("keyword");
        String type=request.getParameter("businesstype");
        String[] name=request.getParameterValues("name");
        String[] compare=request.getParameterValues("compare");
        String[] value=request.getParameterValues("value");
        String[] logic=request.getParameterValues("logic");
        String divisionpath=request.getParameter("divisionpath");

        out.print(bp.getFamilyInfoList(start,limit,keyword,type,name,compare,value,logic,bgdate,eddate,divisionpath));
    }
%>