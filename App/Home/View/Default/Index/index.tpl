<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>crm客户关系管理系统</title>
    <link rel="stylesheet" href="__EASYUI__/themes/bootstrap/easyui.css">
    <link rel="stylesheet" href="__EASYUI__/themes/icon.css">
    <link rel="stylesheet" href="__CSS__/home/index.css">
    <script type="text/javascript">
        var ThinkPHP = {
            'MODULE' : '__MODULE__',
            'EASYUI' : '__EASYUI__'
        };
    </script>
    <script type="text/javascript" src="__EDITOR__/kindeditor.js"></script>
    <script type="text/javascript" src="__EDITOR__/lang/zh_CN.js"></script>
</head>
<body class="easyui-layout">
<!--软件头部-->
<div data-options="region:'north',split:true,border:false" class="layout-north">
    <div class="logo">
        <img src="__IMG__/logo.png" alt="CRM 客户关系管理系统">
    </div>
    <div class="info">
        您好，{:session('admin')['accounts']}！
        <a href="javascript:void(0)" id="btn-edit"
           class="easyui-linkbutton" iconCls="icon-edit">修改密码</a>
        <a href="javascript:void(0)" id="btn-logout"
           class="easyui-linkbutton" iconCls="icon-remove">登出系统</a>
    </div>
    <!--密码修改面板-->
    <form id="password-edit" class="easyui-dialog">
        <input type="hidden" id="user-id" value="{:session('admin')['id']}">
        <table class="form-table" style="max-width: 420px;">
            <tbody>
            <tr>
                <td class="label">
                    <label for="user-name" class="form-label">账号名称：</label>
                </td>
                <td class="input">
                    <input type="text" id="user-name" class="easyui-textbox" value="{:session('admin')['accounts']}">
                </td>
            </tr>
            <tr>
                <td class="label" style="padding: 15px 0 0 0;">
                    <label for="user-password" class="form-label">账号密码：</label>
                </td>
                <td class="input" style="padding: 15px 0 0 0;">
                    <input type="password" id="user-password" class="easyui-textbox">
                </td>
            </tr>
            <tr>
                <td class="label" style="padding: 15px 0 0 0;">
                    <label for="user-nopassword" class="form-label">确认密码：</label>
                </td>
                <td class="input" style="padding: 15px 0 0 0;">
                    <input type="password" id="user-nopassword" class="easyui-textbox">
                </td>
            </tr>
            </tbody>
        </table>
    </form>
</div>
<!--软件左侧菜单-->
<div data-options="region:'west',split:true,border:true,title:'导航',iconCls:'icon-world'" class="layout-west">
    <div id="tree"></div>
</div>
<!--软件主体-->
<div data-options="region:'center',border:true">
    <div id="tabs">
        <div title="起始页" iconCls="icon-house">
            <p>欢迎来到CRM客户关系管理系统</p>
        </div>
        <div id="menu" class="easyui-menu">
            <div class="closecur">关闭</div>
            <div class="closeall">关闭所有</div>
            <div class="closeother" iconCls="icon-cross">关闭其他所有</div>
        </div>
    </div>
</div>
<!--软件底部-->
<div data-options="region:'south',split:true,border:false"
     class="layout-south">
    ©2009-2017 Innocence_zhang. Powered by ThinkPHP and EasyUI.
</div>
<!--详情容器-->
<div id="details"></div>
<script type="text/javascript" src="__EASYUI__/jquery.min.js"></script>
<script type="text/javascript" src="__EASYUI__/jquery.easyui.min.js"></script>
<script type="text/javascript" src="__EASYUI__/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="__JS__/home/index.js"></script>
</body>
</html>

