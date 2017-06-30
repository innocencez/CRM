<?php if (!defined('THINK_PATH')) exit();?><!--Firefox 火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="user"></table>
<!--工具条操作-->
<form id="user-tool" style="padding:5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="userOpt.add();">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="userOpt.edit();">修改</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="userOpt.remove();">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="userOpt.redo();">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="userOpt.reload();">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="userOpt.reset();">重置查询</a>
    </div>
    <!--查询区域-->
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="user-search-keywords">关键字：</label>
        <input type="text" id="user-search-keywords">
        <input type="text" id="user-search-date-type">
        <input type="text" id="user-search-date-from">
        <label for="user-search-date-to">-</label>
        <input type="text" id="user-search-date-to">
        <input type="text" id="user-search-state">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="userOpt.search();" style="margin-top:-1px;">查询</a>
    </div>
</form>
<!--新增面板-->
<form id="user-add">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="user-add-name" class="form-label">账号名称：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="user-add-name">
            </td>
        </tr>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="user-add-name" class="form-label">账号密码：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="user-add-password"><span class="link rand-add">生成</span>
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="user-add-staff-name">关联档案：</label>
            </td>
            <td class="input">
                <input type="text" id="user-add-staff-name">
            </td>
        </tr>
        </tbody>
    </table>
</form>
<!--修改面板-->
<form id="user-edit">
    <input type="hidden" id="user-edit-id" name="id">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
        <tr>
            <td class="label">
                <label for="user-edit-name" class="form-label">账号名称：</label>
            </td>
            <td class="input">
                <input type="text" id="user-edit-name" name="name">
            </td>
        </tr>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="user-edit-password" class="form-label">账号密码：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="user-edit-password"><span class="link rand-edit">生成</span>
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="user-edit-staff-name">关联档案：</label>
            </td>
            <td class="input">
                <input type="text" name="staff_name"  id="user-edit-staff-name">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="user-edit-state-button">状态：</label>
            </td>
            <td class="input">
                <input type="text" id="user-edit-state-button">
                <input type="hidden" id="user-edit-state">
            </td>
        </tr>
        </tbody>
    </table>
</form>
<script type="text/javascript" src="/Public/js/home/user.js"></script>