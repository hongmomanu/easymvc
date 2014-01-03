<%-- Created by IntelliJ IDEA. --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title></title>
      <link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css">
      <link rel="stylesheet" type="text/css" href="easyui/themes/icon.css">
      <script type="text/javascript" src="easyui/jquery-1.8.0.min.js"></script>
      <script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
      <script type="text/javascript" src="easyui/locale/easyui-lang-zh_CN.js"></script>
  </head>
  <body>
  <div class="easyui-layout" fit="true" style="width:100%;height:100%;">
      <div data-options="region:'north'" style="height:50px"></div>
      <div data-options="region:'south',split:true" style="height:50px;"></div>
      <div data-options="region:'east',split:true" title="East" style="width:180px;"></div>
      <div data-options="region:'west',split:true" title="West" style="width:100px;"></div>
      <div data-options="region:'center',title:'Main Title',iconCls:'icon-ok'">
          <table class="easyui-datagrid"
                 data-options="url:'datagrid_data1.json',method:'get',border:false,singleSelect:true,fit:true,fitColumns:true">
              <thead>
              <tr>
                  <th data-options="field:'itemid'" width="80">Item ID</th>
                  <th data-options="field:'productid'" width="100">Product ID</th>
                  <th data-options="field:'listprice',align:'right'" width="80">List Price</th>
                  <th data-options="field:'unitcost',align:'right'" width="80">Unit Cost</th>
                  <th data-options="field:'attr'" width="150">Attribute</th>
                  <th data-options="field:'status',align:'center'" width="50">Status</th>
              </tr>
              </thead>
          </table>
      </div>
  </div>


  </body>
</html>