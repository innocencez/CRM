<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户登录 - crm客户关系管理系统</title>
    <link rel="stylesheet" href="__EASYUI__/themes/bootstrap/easyui.css">
    <link rel="stylesheet" href="__EASYUI__/themes/icon.css">
    <link rel="stylesheet" href="__CSS__/home/login.css">
    <script type="text/javascript">
        var ThinkPHP = {
            'MODULE' : '__MODULE__',
            'IMG' : '__PUBLIC__/img',
            'INDEX' : '{:U("Index/index")}',
            'LOGIN' : '{:U("Login/index")}'
        };
    </script>
</head>
<body>
<form id="login" class="easyui-dialog">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
            <tr>
                    <td class="label" style="width: 83px;">
                        <label for="login-accounts">帐号：</label>
                    </td>
                    <td class="input">
                        <input type="text" id="login-accounts" class="easyui-textbox">
                    </td>
            </tr>
            <tr>
                    <td class="label" style="width: 83px;">
                        <label for="login-password">密码：</label>
                    </td>
                    <td class="input">
                        <input type="password" id="login-password" class="easyui-textbox">
                    </td>
            </tr>
            <tr>
                    <td colspan="2" class="register">
                        没有业务帐号？<a href="javascript:void(0)" class="btn-register">「快速申请」</a>
                    </td>
            </tr>
        </tbody>
    </table>
</form>
<!--快速申请-->
<form id="register-add">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="register-add-name" class="form-label">账号名称：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="text" id="register-add-name">
            </td>
        </tr>
        <tr>
            <td class="label" style="padding: 15px 0 0 0;">
                <label for="register-add-password" class="form-label">账号密码：</label>
            </td>
            <td class="input" style="padding: 15px 0 0 0;">
                <input type="password" id="register-add-password">
            </td>
        </tr>
        </tbody>
    </table>
</form>
<script type="text/javascript" src="__EASYUI__/jquery.min.js"></script>
<script type="text/javascript" src="__EASYUI__/jquery.easyui.min.js"></script>
<script type="text/javascript" src="__EASYUI__/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="__JS__/home/login.js"></script>
</body>
</html>

