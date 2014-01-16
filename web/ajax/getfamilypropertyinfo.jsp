<%@ page import="Zsmzj.propertycheck.control.FamilyPropertyQuery" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Enumeration" %>
<%--
  Created by IntelliJ IDEA.
  User: weipan
  Date: 13-11-19
  Time: 下午14:32
  To change this template use File | Settings | File Templates.
--%>

<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%

    FamilyPropertyQuery propchk=new FamilyPropertyQuery();
    Enumeration e  =(Enumeration) request.getParameterNames();
    Map paraMap=new HashMap<String,Object>();
    while(e.hasMoreElements()){
        String name=(String)e.nextElement();
        paraMap.put(name,request.getParameter(name));
    }
    out.print(propchk.findAll(paraMap));


%>