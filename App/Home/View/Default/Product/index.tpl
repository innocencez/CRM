<!--Firefox 火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="product"></table>
<!--工具条操作-->
<form id="product-tool" style="padding:5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="productOpt.add();">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="productOpt.edit();">修改</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="productOpt.remove();">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="productOpt.redo();">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="productOpt.reload();">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="productOpt.reset();">重置查询</a>
    </div>
    <!--查询区域-->
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="product-search-keywords">关键字：</label>
        <input type="text" id="product-search-keywords">
        <input type="text" id="product-search-type">
        <input type="text" id="product-search-date-type">
        <input type="text" id="product-search-date-from">
        <label for="product-search-date-to">-</label>
        <input type="text" id="product-search-date-to">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="productOpt.search();" style="margin-top:-1px;">查询</a>
    </div>
</form>
<!--新增面板-->
<form id="product-add">
    <table class="form-table" style="max-width: 780px;">
        <tbody>
        <tr>
            <td class="label">
                <label for="product-add-name">产品名称：</label>
            </td>
            <td class="input">
                <input type="text" id="product-add-name">
            </td>
            <td class="label">
                <label for="product-add-sn">产品编号：</label>
            </td>
            <td class="input">
                <input type="text" id="product-add-sn">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="product-add-type">产品类型：</label>
            </td>
            <td class="input">
                <input type="text" id="product-add-type">
            </td>
            <td class="label">
                <label for="product-add-pro-price">采购价格：</label>
            </td>
            <td class="input">
                <input type="text" id="product-add-pro-price">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="product-add-sell-price">销售价格：</label>
            </td>
            <td class="input">
                <input type="text" id="product-add-sell-price" >
            </td>
            <td class="label">
                <label for="product-add-unit">计量单位：</label>
            </td>
            <td class="input">
                <input type="text" id="product-add-unit">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="product-add-inventory-alarm">库存警报：</label>
            </td>
            <td class="input" colspan="3">
                <input type="text" id="product-add-inventory-alarm">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="product-add-details">详情备注：</label>
            </td>
            <td class="input" colspan="3">
                <textarea id="product-add-details" class="textarea"></textarea>
            </td>
        </tr>
        </tbody>
    </table>
</form>

<!--修改面板-->
<form id="product-edit">
    <input type="hidden" id="product-edit-id" name="id">
    <table class="form-table" style="max-width: 780px;">
        <tbody>
        <tr>
            <td class="label">
                <label for="product-edit-name">产品名称：</label>
            </td>
            <td class="input">
                <input type="text" id="product-edit-name" name="name">
            </td>
            <td class="label">
                <label for="product-edit-sn">产品编号：</label>
            </td>
            <td class="input">
                <input type="text" id="product-edit-sn" name="sn">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="product-edit-type">产品类型：</label>
            </td>
            <td class="input">
                <input type="text" id="product-edit-type" name="type">
            </td>
            <td class="label">
                <label for="product-edit-pro-price">采购价格：</label>
            </td>
            <td class="input">
                <input type="text" id="product-edit-pro-price" name="pro_price">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="product-edit-sell-price">销售价格：</label>
            </td>
            <td class="input">
                <input type="text" id="product-edit-sell-price" name="sell_price">
            </td>
            <td class="label">
                <label for="product-edit-unit">计量单位：</label>
            </td>
            <td class="input">
                <input type="text" id="product-edit-unit" name="unit">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="product-edit-inventory-alarm">库存警报：</label>
            </td>
            <td class="input" colspan="3">
                <input type="text" id="product-edit-inventory-alarm" name="inventory_alarm">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="product-edit-details">详情备注：</label>
            </td>
            <td class="input" colspan="3">
                <textarea id="product-edit-details" class="textarea"></textarea>
            </td>
        </tr>
        </tbody>
    </table>
</form>
<script type="text/javascript" src="__JS__/home/product.js"></script>
