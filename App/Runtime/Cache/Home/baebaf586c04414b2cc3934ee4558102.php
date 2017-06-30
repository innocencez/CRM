<?php if (!defined('THINK_PATH')) exit();?><!--Firefox 火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="payment"></table>
<!--工具条操作-->
<form id="payment-tool" style="padding:5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="paymentOpt.reload();">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="paymentOpt.reset();">重置查询</a>
    </div>
    <!--查询区域-->
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="payment-search-keywords">关键字：</label>
        <input type="text" id="payment-search-keywords">
        <input type="text" id="payment-search-type">
        <input type="text" id="payment-search-date-type">
        <input type="text" id="payment-search-date-from">
        <label for="payment-search-date-to">-</label>
        <input type="text" id="payment-search-date-to">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="paymentOpt.search();" style="margin-top:-1px;">查询</a>
    </div>
</form>
<script type="text/javascript" src="/Public/js/home/payment.js"></script>