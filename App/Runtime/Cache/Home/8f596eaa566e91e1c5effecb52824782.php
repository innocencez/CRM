<?php if (!defined('THINK_PATH')) exit();?><!--Firefox 火狐浏览器渲染遮罩专用-->
<div class="tabs-loading">Loading...</div>
<!--数据列表-->
<table id="staff"></table>
<!--工具条操作-->
<form id="staff-tool" style="padding:5px;">
    <div class="tool-opt">
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="staffOpt.add();">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="staffOpt.edit();">修改</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="staffOpt.remove();">删除</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-redo" onclick="staffOpt.redo();">取消选定</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-reload" onclick="staffOpt.reload();">刷新表</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-undo" onclick="staffOpt.reset();">重置查询</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-addsearch" onclick="staffOpt.field();" id="field">展开查询字段</a>
    </div>
    <!--查询区域-->
    <div style="padding:0 0 0 7px;color:#333;" class="tool-search">
        <label for="staff-search-keywords">关键字：</label>
        <input type="text" id="staff-search-keywords">
        <input type="text" id="staff-search-post">
        <input type="text" id="staff-search-entry-status">
        <input type="text" id="staff-search-gender">
        <input type="text" id="staff-search-date-type">
        <input type="text" id="staff-search-date-from">
        <label for="staff-search-date-to">-</label>
        <input type="text" id="staff-search-date-to">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-search" onclick="staffOpt.search();" style="margin-top:-1px;">查询</a>
        <div class="more">
            <input type="text" id="staff-search-id-card">
            <input type="text" id="staff-search-nation">
            <input type="text" id="staff-search-marital-status">
        </div>
    </div>
</form>
<!--新增面板-->
<form id="staff-add">
    <table class="form-table" style="max-width: 780px;">
        <tbody>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="staff-add-name" class="form-label">姓名：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="staff-add-name">
            </td>
            <td class="label">
                <label for="staff-add-gender" class="form-label">性别：</label>
            </td>
            <td class="input">
                <a href="javascript:void(0)" id="staff-add-gender-1" name="staff_add_gender">男</a>
                <a href="javascript:void(0)" id="staff-add-gender-2" name="staff_add_gender">女 </a>
                <input type="hidden" id="staff-add-gender" value="男">
            </td>
        </tr>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="staff-add-number" class="form-label">工号：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="staff-add-number">
            </td>
            <td class="label">
                <label for="staff-add-post" class="form-label">职位：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-post">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-add-id-card" class="form-label">身份证：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-id-card">
            </td>
            <td class="label">
                <label for="staff-add-type" class="form-label">员工类型：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-type">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-add-tel" class="form-label">移动电话：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-tel">
            </td>
            <td class="label">
                <label for="staff-add-marital-status" class="form-label">婚姻状况：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-marital-status">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-add-nation" class="form-label">民族：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-nation">
            </td>
            <td class="label">
                <label for="staff-add-entry-date" class="form-label">入职日期：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-entry-date">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-add-education" class="form-label">学历：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-education">
            </td>
            <td class="label">
                <label for="staff-add-dimission-date" class="form-label">离职日期：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-dimission-date">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-add-entry-status" class="form-label">入职状态：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-entry-status">
            </td>
            <td class="label">
                <label for="staff-add-specialty" class="form-label">专业：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-specialty">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-add-politics-status" class="form-label">政治面貌：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-politics-status">
            </td>
            <td class="label">
                <label for="staff-add-health" class="form-label">健康状况：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-health">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-add-registered" class="form-label">户口：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-registered">
            </td>
            <td class="label">
                <label for="staff-add-graduate-date" class="form-label">毕业时间：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-graduate-date">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-add-registered-address" class="form-label">户口所在地：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-registered-address">
            </td>
            <td class="label">
                <label for="staff-add-graduate-colleges" class="form-label">毕业院校：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-add-graduate-colleges">
            </td>
        </tr>
        <tr>
            <td class="label">
                个人简介：
            </td>
            <td class="input" colspan="3">
                <textarea id="staff-add-intro" class="textarea" placeholder="255字内简单介绍一下自己！"></textarea>
            </td>
        </tr>
        <tr>
            <td class="label">
                详情备注：
            </td>
            <td class="input" colspan="3">
                <textarea id="staff-add-details" class="textarea" placeholder="添加个人详情介绍（选填）！"></textarea>
            </td>
        </tr>
        </tbody>
    </table>
</form>
<!--修改面板-->
<form id="staff-edit">
    <input type="hidden" name="id" id="staff-edit-id">
    <table class="form-table" style="max-width: 780px;">
        <tbody>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="staff-edit-name" class="form-label">姓名：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="staff-edit-name" name="name">
            </td>
            <td class="label">
                <label for="staff-edit-gender" class="form-label">性别：</label>
            </td>
            <td class="input">
                <a href="javascript:void(0)" id="staff-edit-gender-1" name="staff_edit_gender">男</a>
                <a href="javascript:void(0)" id="staff-edit-gender-2" name="staff_edit_gender">女 </a>
                <input type="hidden" id="staff-edit-gender" value="男" name="gender">
            </td>
        </tr>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="staff-edit-number" class="form-label">工号：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="staff-edit-number" name="number">
            </td>
            <td class="label">
                <label for="staff-edit-post" class="form-label">职位：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-post" name="post">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-edit-id-card" class="form-label">身份证：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-id-card" name="id_card">
            </td>
            <td class="label">
                <label for="staff-edit-type" class="form-label">员工类型：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-type" name="type">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-edit-tel" class="form-label">移动电话：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-tel" name="tel">
            </td>
            <td class="label">
                <label for="staff-edit-marital-status" class="form-label">婚姻状况：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-marital-status" name="marital_status">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-edit-nation" class="form-label">民族：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-nation" name="nation">
            </td>
            <td class="label">
                <label for="staff-edit-entry-date" class="form-label">入职日期：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-entry-date" name="entry_date">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-edit-education" class="form-label">学历：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-education" name="education">
            </td>
            <td class="label">
                <label for="staff-edit-dimission-date" class="form-label">离职日期：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-dimission-date" name="dimission_date">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-edit-entry-status" class="form-label">入职状态：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-entry-status" name="entry_status">
            </td>
            <td class="label">
                <label for="staff-edit-specialty" class="form-label">专业：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-specialty" name="specialty">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-edit-politics-status" class="form-label">政治面貌：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-politics-status" name="politics_status">
            </td>
            <td class="label">
                <label for="staff-edit-health" class="form-label">健康状况：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-health" name="health">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-edit-registered" class="form-label">户口：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-registered" name="registered">
            </td>
            <td class="label">
                <label for="staff-edit-graduate-date" class="form-label">毕业时间：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-graduate-date" name="graduate_date">
            </td>
        </tr>
        <tr>
            <td class="label">
                <label for="staff-edit-registered-address" class="form-label">户口所在地：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-registered-address" name="registered_address">
            </td>
            <td class="label">
                <label for="staff-edit-graduate-colleges" class="form-label">毕业院校：</label>
            </td>
            <td class="input">
                <input type="text" id="staff-edit-graduate-colleges" name="graduate_colleges">
            </td>
        </tr>
        <tr>
            <td class="label">
                个人简介：
            </td>
            <td class="input" colspan="3">
                <textarea id="staff-edit-intro" class="textarea" placeholder="255字内简单介绍一下自己！" name="intro"></textarea>
            </td>
        </tr>
        <tr>
            <td class="label">
                详情备注：
            </td>
            <td class="input" colspan="3">
                <textarea id="staff-edit-details" class="textarea" placeholder="添加个人详情介绍（选填）！" name="details"></textarea>
            </td>
        </tr>
        </tbody>
    </table>
</form>

<script type="text/javascript" src="/Public/js/home/staff.js"></script>