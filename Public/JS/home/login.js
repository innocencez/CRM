/**
 * Created by Innocence on 2017/4/3.
 */
//登录页背景随机
var rand                           =    Math.floor(Math.random() * 5) + 1,
      body                           =   $('body'),
      login                           =   $('#login'),
      loginAccounts             =   $('#login-accounts'),
      loginPassword             =   $('#login-password'),
      registerAdd                 =   $('#register-add'),
      registerAddName        =   $('#register-add-name'),
      registerAddPassword   =   $('#register-add-password'),
      btnRegister                  =    $('.btn-register');
body.css('background','url(' + ThinkPHP['IMG'] + '/bg' + rand + '.jpg) no-repeat center center fixed').css('background-size', 'cover');
//浏览器改变大小时触发
$(window).resize(function () {
    login.dialog('center');
});
//登录弹窗
login.dialog({
    title : '登录后台',
    width : 370,
    height : 260,
    modal : false,
    closable : false,
    draggable : false,
    iconCls : 'icon-lock',
    buttons : [{
        text : '登录',
        id : 'login-btn',
        size : 'large',
        iconCls : 'icon-go',
        handler : function(){
            //将数据发送到服务器端
            if (login.form('validate')) {
                $.ajax({
                    url : ThinkPHP['MODULE'] + '/Login/checkUser',
                    type : 'POST',
                    data : {
                        accounts : loginAccounts.val(),
                        password : loginPassword.val()
                    },
                    beforeSend : function () {
                        $.messager.progress({
                            text : '正在尝试登录...'
                        });
                    },
                    success : function (data) {
                        $.messager.progress('close');
                        if (data > 0) {
                            location.href = ThinkPHP['INDEX'];
                        } else if (data == 0) {
                            $.messager.alert('登录失败！', '登录帐号或密码不正确！', 'warning', function () {
                            loginPassword.textbox('textbox').select();
                        });
                        } else if (data == -1) {
                                $.messager.alert('登录失败！', '帐号处在冻结审核状态！', 'warning', function () {
                                    loginPassword.textbox('textbox').select();
                            });
                        }
                    }
                });
            }
        }
    }],
    onOpen : function(){
        $(function(){
            $('#login-btn').parents().css('text-align','center');
        })
    }
});
//快速申请点击
btnRegister.click(function(){
    login.dialog('close');
    registerAdd.dialog('open');
});
/*快速申请弹窗*/
registerAdd.dialog({
    title : '快速申请',
    width : 370,
    height : 220,
    modal : true,
    closable : false,
    draggable : false,
    closed : true,
    iconCls : 'icon-add',
    buttons : [{
        text : '快速申请',
        id : 'register-btn',
        size : 'large',
        iconCls : 'icon-save',
        handler : function(){
            //将数据发送到服务器端
            if (registerAdd.form('validate')) {
                $.ajax({
                    url : ThinkPHP['MODULE'] + '/Login/register',
                    type : 'POST',
                    data : {
                        accounts : registerAddName.val(),
                        password : registerAddPassword.val()
                    },
                    beforeSend : function () {
                        $.messager.progress({
                            text : '正在尝试登录...'
                        });
                    },
                    success : function (data) {
                        $.messager.progress('close');
                        if (data > 0) {
                            location.href = ThinkPHP['LOGIN'];
                        } else if(data == -1){
                            $.messager.alert('申请失败！', '账号名称已存在！', 'warning', function () {
                                registerAddName.textbox('textbox').select();
                            });
                        }else{
                            $.messager.alert('申请失败！', '未知错误！', 'warning', function () {
                                registerAddName.textbox('textbox').select();
                            });
                        }
                    }
                });
            }
        }
    },{
        text : '返回登录',
        id : 'register-btn',
        size : 'large',
        iconCls : 'icon-redo',
        handler : function(){
            registerAdd.dialog('close');
            login.dialog('open');
        }
    }],
    onOpen : function(){
        $(function(){
            $('#register-btn').parents().css('text-align','center');
        })
    }
});
/*表单字段区域*/
loginAccounts.textbox({
    width : 220,
    height : 32,
    iconCls : 'icon-man',
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入登录帐号',
    invalidMessage : '登录帐号2-20位之间'
});
registerAddName.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入帐号',
    invalidMessage : '帐号长度2-20位之间'
});
//登录密码
loginPassword.textbox({
    width : 220,
    height : 32,
    iconCls : 'icon-lock2',
    validType : 'length[6,30]',
    required : true,
    missingMessage : '请输入登录密码',
    invalidMessage : '登录密码6-30位之间'
});
registerAddPassword.textbox({
    width : 220,
    height : 32,
    validType : 'length[6,30]',
    required : true,
    missingMessage : '请输入密码',
    invalidMessage : '密码长度6-30位之间'
});