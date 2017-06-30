<?php if (!defined('THINK_PATH')) exit();?><!--Firefox 火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="documentary"></table>
<!--工具条操作-->
<form id="documentary-tool" style="padding:5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="documentaryOpt.add();">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="documentaryOpt.edit();">修改</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="documentaryOpt.remove();">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="documentaryOpt.redo();">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="documentaryOpt.reload();">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="documentaryOpt.reset();">重置查询</a>
    </div>
    <!--查询区域-->
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="documentary-search-keywords">关键字：</label>
        <input type="text" id="documentary-search-keywords">
        <input type="text" id="documentary-search-date-type">
        <input type="text" id="documentary-search-date-from">
        <label for="documentary-search-date-to">-</label>
        <input type="text" id="documentary-search-date-to">
        <input type="text" id="documentary-search-way">
        <input type="text" id="documentary-search-evolve">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="documentaryOpt.search();" style="margin-top:-1px;">查询</a>
    </div>
</form>
<!--新增面板-->
<form id="documentary-add">
    <input type="hidden" id="documentary-add-client-id">
    <input type="hidden" id="documentary-add-staff-id">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="documentary-add-title" class="form-label">跟单标题：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-add-title">
            </td>
        </tr>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="documentary-add-company" class="form-label">关联公司：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-add-company">
            </td>
        </tr>
        <tr>
            <td class="label"  style="padding: 15px 0 0 0;">
                <label for="documentary-add-name">跟单员：</label>
            </td>
            <td class="input"  style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-add-name">
            </td>
        </tr>
        <tr>
            <td class="label"  style="padding: 15px 0 0 0;">
                <label for="documentary-add-way">跟单方式：</label>
            </td>
            <td class="input"  style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-add-way">
            </td>
        </tr>
        <tr>
            <td class="label"  style="padding: 15px 0 0 0;">
                <label for="documentary-add-evolve">进展状况：</label>
            </td>
            <td class="input"  style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-add-evolve">
            </td>
        </tr>
        <tr>
            <td class="label"  style="padding: 15px 0 0 0;">
                <label for="documentary-add-remark">详情备注：</label>
            </td>
            <td class="input"  style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-add-remark">
            </td>
        </tr>
        </tbody>
    </table>
</form>
<!--修改面板-->
<form id="documentary-edit">
    <input type="hidden" id="documentary-edit-id" name="id">
    <input type="hidden" id="documentary-edit-client-id" name="client_id">
    <input type="hidden" id="documentary-edit-staff-id" name="staff_id">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="documentary-edit-title" class="form-label">跟单标题：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-edit-title"  name="title">
            </td>
        </tr>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="documentary-edit-company" class="form-label">关联公司：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-edit-company"  name="client_company">
            </td>
        </tr>
        <tr>
            <td class="label"  style="padding: 15px 0 0 0;">
                <label for="documentary-edit-name">跟单员：</label>
            </td>
            <td class="input"  style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-edit-name"  name="staff_name">
            </td>
        </tr>
        <tr>
            <td class="label"  style="padding: 15px 0 0 0;">
                <label for="documentary-edit-way">跟单方式：</label>
            </td>
            <td class="input"  style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-edit-way"  name="way">
            </td>
        </tr>
        <tr>
            <td class="label"  style="padding: 15px 0 0 0;">
                <label for="documentary-edit-evolve">进展状况：</label>
            </td>
            <td class="input"  style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-edit-evolve"  name="evolve">
            </td>
        </tr>
        <tr>
            <td class="label"  style="padding: 15px 0 0 0;">
                <label for="documentary-edit-remark">详情备注：</label>
            </td>
            <td class="input"  style="padding: 15px 0 0 0;">
                <input type="text" id="documentary-edit-remark"  name="remark">
            </td>
        </tr>
        </tbody>
    </table>
</form>
<!--弹出客户信息列表-->
<div id="documentary-add-client">
    <table id="documentary-add-client-search"></table>
</div>
<div id="documentary-edit-client">
    <table id="documentary-edit-client-search"></table>
</div>
<form id="documentary-client-tool" style="padding:5px;">
    <div style="padding:0 0 0 7px;color:#333;">
        <label for="documentary-client-search-keywords">关键字：</label>
        <input type="text" id="documentary-client-search-keywords" class="easyui-textbox" name="documentary_client_search_keywords" prompt="公司名称|联系人" style="width:150px;padding: 0 5px;">
        <a href="javascript:void(0)" class="easyui-linkbutton" id="documentary-client-search-button" iconCls="icon-search" onclick="documentary_add_client_tool.search();" style="margin-top:-1px;">查询</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" id="documentary-client-search-reset" plain="true" style="float:right;" iconCls="icon-undo" onclick="documentary_add_client_tool.reset();" style="margin-top:-1px;">重置查询</a>
    </div>
</form>
<!--弹出员工信息列表-->
<div id="documentary-add-staff">
    <table id="documentary-add-staff-search"></table>
</div>
<div id="documentary-edit-staff">
    <table id="documentary-edit-staff-search"></table>
</div>
<form id="documentary-staff-tool" style="padding:5px;">
    <div style="padding:0 0 0 7px;color:#333;">
        <label for="documentary-staff-search-keywords">关键字：</label>
        <input type="text" id="documentary-staff-search-keywords" class="easyui-textbox" name="documentary_staff_search_keywords" prompt="员工姓名|工号" style="width:150px;padding: 0 5px;">
        <a href="javascript:void(0)" class="easyui-linkbutton" id="documentary-staff-search-button" iconCls="icon-search" onclick="documentary_add_staff_tool.search();" style="margin-top:-1px;">查询</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" id="documentary-staff-search-reset" plain="true" style="float:right;" iconCls="icon-undo" onclick="documentary_add_staff_tool.reset();" style="margin-top:-1px;">重置查询</a>
    </div>
</form>
<script type="text/javascript" src="/Public/js/home/documentary.js"></script>