<!--Firefox 火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="order"></table>
<!--工具条操作-->
<form id="order-tool" style="padding:5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="orderOpt.add();">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="orderOpt.edit();">修改</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="orderOpt.remove();">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="orderOpt.redo();">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="orderOpt.reload();">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="orderOpt.reset();">重置查询</a>
    </div>
    <!--查询区域-->
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="order-search-keywords">关键字：</label>
        <input type="text" id="order-search-keywords">
        <input type="text" id="order-search-date-type">
        <input type="text" id="order-search-date-from">
        <label for="order-search-date-to">-</label>
        <input type="text" id="order-search-date-to">
        <input type="text" id="order-search-pay-state">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="orderOpt.search();" style="margin-top:-1px;">查询</a>
    </div>
</form>
<!--新增订单-->
<form id="order-add">
    <input type="hidden" id="order-add-documentary-id">
    <table class="form-table" style="max-width: 780px;">
        <tr>
            <td class="label" style="padding:15px 0 0 0">
                <label for="order-add-title" class="form-label">订单标题：</label>
            </td>
            <td class="input" style="padding:15px 0 0 0">
                <input type="text" id="order-add-title">
            </td>
            <td class="label">
                <label for="order-add-documentary" class="form-label">关联跟单：</label>
            </td>
            <td class="input">
                <input type="text" id="order-add-documentary">
            </td>
        </tr>
        <tr>
            <td class="label" style="padding:15px 0 0 0;">
                <label for="order-add-original" class="form-label">订单原价：</label>
            </td>
            <td class="input order-add-original" style="padding:15px 0 0 0;">
                ￥0.00
            </td>
        </tr>
        <tr>
            <td class="label" style="padding:15px 0 0 0;">
                <label for="order-add-product-button">订单产品：</label>
            </td>
            <td class="input" colspan="3" style="padding:15px 0 0 0;">
                <a id="order-add-product-button" style="width: 70px;height:26px;">添加</a>
            </td>
        </tr>
        <tr>
            <td class="label">
            </td>
            <td class="input" colspan="3">
                <table id="order-product-list"></table>
            </td>
        </tr>
        <tr>
            <td class="label" style="padding:15px 0 0 0;">
                <label for="order-add-cost" class="form-label">订单金额：</label>
            </td>
            <td class="input" style="padding:15px 0 0 0;">
                <input type="text" id="order-add-cost">
            </td>
        </tr>
        <tr>
            <td class="label" style="padding:15px 0 0 0;">
                <label for="order-add-details" class="form-label">订单备注：</label>
            </td>
            <td class="input" colspan="3" style="padding:15px 0 0 0;">
                <textarea id="order-add-details" class="textarea"></textarea>
            </td>
        </tr>
    </table>
</form>
<!--跟单选择数据列表-->
<div id="order-documentary">
    <table id="order-search-documentary"></table>
</div>
<!--跟单选择工具条操作-->
<form id="order-tool-documentary" style="padding:5px;">
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="order-search-keywords-documentary">关键字：</label>
        <input type="text" id="order-search-keywords-documentary">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="orderDocumentaryOpt.search();" style="margin-top:-1px;">查询</a>
        <a href="javascript:void(0)" class="easyui-linkbutton"  style="float: right;" plain="true" iconCls="icon-undo" onclick="orderDocumentaryOpt.reset();">重置查询</a>
    </div>
</form>
<script type="text/javascript" src="__JS__/home/order.js"></script>