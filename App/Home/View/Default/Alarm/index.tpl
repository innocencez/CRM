<!--Firefox 火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="alarm"></table>
<!--工具条操作-->
<form id="alarm-tool" style="padding:5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="alarmOpt.reload();">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="alarmOpt.reset();">重置查询</a>
    </div>
    <!--查询区域-->
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="alarm-search-keywords">关键字：</label>
        <input type="text" id="alarm-search-keywords">
        <input type="text" id="alarm-search-type">
        <input type="text" id="alarm-search-date-type">
        <input type="text" id="alarm-search-date-from">
        <label for="alarm-search-date-to">-</label>
        <input type="text" id="alarm-search-date-to">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="alarmOpt.search();" style="margin-top:-1px;">查询</a>
    </div>
</form>

<script type="text/javascript" src="__JS__/home/alarm.js"></script>
