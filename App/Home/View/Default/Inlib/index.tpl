<!--Firefox 火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="inlib"></table>
<!--工具条操作-->
<form id="inlib-tool" style="padding:5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="inlibOpt.add();">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="inlibOpt.reload();">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="inlibOpt.reset();">重置查询</a>
    </div>
    <!--查询区域-->
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="inlib-search-keywords">关键字：</label>
        <input type="text" id="inlib-search-keywords">
        <input type="text" id="inlib-search-type">
        <input type="text" id="inlib-search-date-type">
        <input type="text" id="inlib-search-date-from">
        <label for="inlib-search-date-to">-</label>
        <input type="text" id="inlib-search-date-to">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="inlibOpt.search();" style="margin-top:-1px;">查询</a>
    </div>
</form>
<!--新增面板-->
<form id="inlib-add">
    <input type="hidden" id="inlib-add-product-id">
    <table class="form-table" style="max-width: 780px;">
        <tbody>
        <tr>
            <td class="label">
                <label for="inlib-add-product">入库产品：</label>
            </td>
            <td class="input">
                <input type="text" id="inlib-add-product">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="inlib-add-number">入库数量：</label>
            </td>
            <td class="input">
                <input type="text" id="inlib-add-number">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="inlib-add-staff">经办人：</label>
            </td>
            <td class="input">
                <input type="text" id="inlib-add-staff" >
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="inlib-add-type">入库方式：</label>
            </td>
            <td class="input">
                <input type="text" id="inlib-add-type">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="inlib-add-details">方式说明：</label>
            </td>
            <td class="input">
                <input type="text" id="inlib-add-details">
            </td>
        </tr>
        </tbody>
    </table>
</form>
<!--产品选择数据列表-->
<div id="inlib-product">
    <table id="inlib-search-product"></table>
</div>
<!--产品选择工具条操作-->
<form id="inlib-tool-product" style="padding:5px;">
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="inlib-search-keywords-product">关键字：</label>
        <input type="text" id="inlib-search-keywords-product">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="inlibProductOpt.search();" style="margin-top:-1px;">查询</a>
        <a href="javascript:void(0)" class="easyui-linkbutton"  style="float: right;" plain="true" iconCls="icon-undo" onclick="inlibProductOpt.reset();">重置查询</a>
    </div>
</form>
<!--经办人数据列表-->
<div id="inlib-staff">
    <table id="inlib-search-staff"></table>
</div>
<!--经办人选择工具条操作-->
<form id="inlib-tool-staff" style="padding:5px;">
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="inlib-search-keywords-staff">关键字：</label>
        <input type="text" id="inlib-search-keywords-staff">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="inlibStaffOpt.search();" style="margin-top:-1px;">查询</a>
        <a href="javascript:void(0)" class="easyui-linkbutton"  style="float: right;" plain="true" iconCls="icon-undo" onclick="inlibStaffOpt.reset();">重置查询</a>
    </div>
</form>
<script type="text/javascript" src="__JS__/home/inlib.js"></script>
