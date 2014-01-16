<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.RoleControl" %>
<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("limit")==null){
       out.print("缺少参数limit");
    }else if(request.getParameter("start")==null){
        out.print("缺少参数start");
    }
    else{
        BusinessProcessControl bp=new BusinessProcessControl();
        int start=Integer.parseInt(request.getParameter("start"));
        int limit=Integer.parseInt(request.getParameter("limit"));
        String keyword=request.getParameter("keyword");
        String totalname=request.getParameter("totalname");
        String rowsname=request.getParameter("rowsname");
        String type=request.getParameter("type");
        String bgdate=request.getParameter("bgdate");
        String eddate=request.getParameter("eddate");
        String businesstype=request.getParameter("businesstype");
        String divisionpath=request.getParameter("divisionpath");
        boolean ispublicinfo=request.getParameter("ispublicinfo")!=null?Boolean.parseBoolean(request.getParameter("ispublicinfo")):false;
        out.print(bp.getNeedTodoBusinessList(start,limit,keyword,type,businesstype,ispublicinfo,bgdate,eddate,divisionpath,totalname,rowsname));
    }
    //out.print("ok");
%>