var       logout                     = $('#btn-logout'),
            edit                         = $('#btn-edit'),
            passwordEdit          = $('#password-edit'),
            userName              = $('#user-name'),
            userId                    =   $('#user-id'),
            userPassword         = $('#user-password'),
            userNoPassword    =   $('#user-nopassword'),
            details                     = $('#details');
$(function(){
    $('#tabs').tabs({
        fit : true,
        border : false,
        onContextMenu : function(e,title,index){
            var _this = this;
            e.preventDefault();
            var menu = $('#menu');
            //跟随鼠标定位
            menu.menu('show',{
                top : e.pageY,
                left : e.pageX
            });
            //起始标签禁用关闭
            if(index == 0){
                menu.menu('disableItem',$('.closecur')[0]);
            }else{
                menu.menu('enableItem',$('.closecur')[0]);
            }
            //三个关闭功能
            menu.menu({
                onClick : function(item){
                    var tablist = $(_this).tabs('tabs');
                    switch(item.text){
                        case '关闭' :
                            $(_this).tabs('close',index);
                            break;
                        case '关闭所有' :
                            for(var i = tablist.length;i>0;i--){
                                $(_this).tabs('close',i);
                            }
                            break;
                        case '关闭其他所有' :
                            for(var i = tablist.length;i>0;i--) {
                                if(i != index){
                                    $(_this).tabs('close', i);
                                }
                            }
                            $(_this).tabs('select',1);
                            break;
                            }
                    }
                })
            },
        onLoad : function () {
            //非火狐浏览器，移出掉loading...
            if (navigator.userAgent.indexOf('Firefox') <= 0) {
                $('.tabs-loading').remove();
            }
        }
    });
    //在index.js 判断针对火狐浏览器，并判断easyui 渲染完毕后再隐藏遮罩
    if (navigator.userAgent.indexOf('Firefox') > 0) {
        $.parser.onComplete = function () {
            $('.tabs-loading').hide();
        };
    }
    $('#tree').tree({
        url : ThinkPHP['MODULE']+'/Index/getNav',
        lines : true,
        animate : true,
        onClick : function(node){
            var tabs = $('#tabs');
            //判断是否存在模块链接
            if(node.url){
                //判断是否已打开标签页
                if(tabs.tabs('exists',node.text)){
                    //页面已存在，就实现选中
                    tabs.tabs('select',node.text);
                }else{
                    //打开标签页时，先清理掉前一次的dialog
                    switch (node.text){
                        case '登录账号' :
                            $('#user-add').dialog('destroy');
                            $('#user-edit').dialog('destroy');
                            break;
                        case '职位部门' :
                            $('#post-add').dialog('destroy');
                            $('#post-edit').dialog('destroy');
                            break;
                        case '员工档案' :
                            $('#staff-add').dialog('destroy');
                            break;
                    }
                    //页面不存在，就给选项卡添加标签
                    tabs.tabs('add',{
                        title : node.text,
                        closable : true,
                        iconCls : node.iconCls,
                        href : ThinkPHP['MODULE']+'/'+node.url,
                    });
                }
            }
        }
    });
    //登出系统
    logout.click(function(){
        $.messager.confirm('操作提醒','是否退出系统？',function(flag){
            if(flag){
                $.messager.progress({
                    text : '登出系统中...',
                });
                location.href = ThinkPHP['MODULE'] + '/Login/logout'
            }
        });
    });
    //修改密码
    edit.click(function(){
        passwordEdit.dialog('open');
    });
    //密码修改面板
    passwordEdit.dialog({
        width : 400,
        height : 280,
        title : '修改密码',
        iconCls : 'icon-edit',
        modal : true,
        closed : true,
        maximizable : true,
        buttons : [
            {
                'text' : '保存',
                iconCls : 'icon-accept',
                size : 'large',
                handler : function(){
                    //通过验证后，ajax处理
                    if(passwordEdit.form('validate')){
                        $.ajax({
                            url : ThinkPHP['MODULE'] + '/user/editPassword',
                            type : 'post',
                            data : {
                                id : userId.val(),
                                password : userPassword.val(),
                                noPassword : userNoPassword.val()
                            },
                            beforeSend : function(){
                                $.messager.progress({
                                    text : '正在尝试保存...'
                                });
                            },
                            success : function(data){
                                $.messager.progress('close');
                                if(data > 0){
                                    $.messager.show({
                                        title : '操作提醒',
                                        msg : '修改密码成功'
                                    });
                                    passwordEdit.form('reset');
                                    passwordEdit.dialog('close');
                                    $.messager.alert('操作提醒','密码修改成功','info',function(){
                                        location.href = ThinkPHP['MODULE'] + '/Login/logout';
                                    });
                                }else{
                                    $.messager.alert('修改失败！','尚未修改密码或未知错误！','warning',function(){
                                        userPassword.textbox('textbox').select();
                                    });
                                }
                            }
                        });
                    }
                }
            },{
                'text' : '取消',
                iconCls : 'icon-cross',
                size : 'large',
                handler : function(){
                    passwordEdit.dialog('close');
                }
            }
        ],
    });
    //详情弹窗
    details.dialog({
        width : 780,
        height : 500,
        modal : true,
        closed : true,
        maximizable : true,
        iconCls : 'icon-tip',
        buttons : [{
            text : '关闭',
            size : 'large',
            iconCls : 'icon-cross',
            handler : function () {
                details.dialog('close');
            }
        }],
    });
})
//修改账号名称
userName.textbox({
    width : 220,
    height : 32,
    editable : false
});
//修改密码
userPassword.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'minLength[6]',
    missingMessage : '请输入账号密码',
    invalidMessage : '账号密码至少6位'
});
//修改确认密码
userNoPassword.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'equals["#user-password"]',
    missingMessage : '请输入确认密码',
    invalidMessage : '确认密码和密码不一致'
});
//判断两个字段是否一致的扩展
$.extend($.fn.validatebox.defaults.rules, {
    equals : {
        validator : function(value, param)
        {
            return value == $(param[0]).val();
        },
        message: '密码和密码确认必须一致'
    },
    minLength: {
        validator: function(value, param){
            return value.length >= param[0];
        },
        message: '请至少输入{0}个字符'
    }
});
//kindeditor 设置工具栏
editor_tool = [
    'source', '|',
    'formatblock', 'fontname', 'fontsize','|',
    'forecolor', 'hilitecolor', 'bold','italic', 'underline', 'link',
    'removeformat', '|',
    'justifyleft', 'justifycenter', 'justifyright', '|',
    'insertorderedlist', 'insertunorderedlist','|',
    'emoticons', 'image','baidumap','|',
    'fullscreen'
];