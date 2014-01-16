<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory" %>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload" %>
<%@ page import="org.apache.commons.fileupload.FileItem" %>
<%@ page import="java.util.List" %>
<%@ page import="Zsmzj.conmmon.FileHelper" %>
<%@ page import="Zsmzj.conmmon.Config" %>
<%@ page import="java.util.Map" %>
<%@ page import="net.sf.json.JSONObject" %>
<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-19
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%


    String doc=request.getParameter("doc");
    FileHelper fh=new FileHelper();
    ServletContext context = request.getServletContext();
    Config dbconfig = Config.getConfig("config.properties");
    String filedir = dbconfig.getValue("tempdirname");
    String filepath=context.getRealPath(filedir);
    Map<String,Object> result=fh.htmldocToPdf(doc, filepath+"/");
    result.put("filepath",filedir+"/"+result.get("filepath"));
    out.print(JSONObject.fromObject(result).toString());

%>