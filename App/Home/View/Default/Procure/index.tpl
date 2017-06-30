<!--Firefox 火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="procure"></table>
<!--工具条操作-->
<form id="procure-tool" style="padding:5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="procureOpt.reload();">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="procureOpt.reset();">重置查询</a>
    </div>
    <!--查询区域-->
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="procure-search-keywords">关键字：</label>
        <input type="text" id="procure-search-keywords">
        <input type="text" id="procure-search-type">
        <input type="text" id="procure-search-date-type">
        <input type="text" id="procure-search-date-from">
        <label for="procure-search-date-to">-</label>
        <input type="text" id="procure-search-date-to">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="procureOpt.search();" style="margin-top:-1px;">查询</a>
    </div>
</form>
<script type="text/javascript" src="__JS__/home/procure.js"></script>
