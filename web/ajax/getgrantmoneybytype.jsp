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
    if(request.getParameter("businesstype")==null){
       out.print("缺少参数businesstype");
    }
    else{
        BusinessProcessControl bp=new BusinessProcessControl();

        String type=request.getParameter("businesstype");
        String bgmonth=request.getParameter("bgmonth");
        String bgdate=request.getParameter("bgdate");
        String eddate=request.getParameter("eddate");
        String keyword=request.getParameter("keyword");
        String totalname=request.getParameter("totalname");
        String rowsname=request.getParameter("rowsname");
        String[] name=request.getParameterValues("name");
        String[] compare=request.getParameterValues("compare");
        String[] value=request.getParameterValues("value");
        String[] logic=request.getParameterValues("logic");
        int start=Integer.parseInt(request.getParameter("start"));
        int limit =Integer.parseInt(request.getParameter("limit"));
        String divisionpath=request.getParameter("divisionpath");
        out.print(bp.getGrantMoneyBytype(type,bgmonth,keyword,name,compare,value,logic,start,limit,bgdate,eddate,divisionpath,totalname,rowsname));
    }
%>