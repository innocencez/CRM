//初始化变量
var user = $('#user'),
    userAdd = $('#user-add'),
    userAddName = $('#user-add-name'),
    userAddPassword = $('#user-add-password'),
    userEdit = $('#user-edit'),
    userEditName = $('#user-edit-name'),
    userEditPassword = $('#user-edit-password'),
    userEditId = $('#user-edit-id'),
    userSearchKeywords  =   $('#user-search-keywords'),
    userSearchDateType  =   $('#user-search-date-type'),
    userSearchDateFrom  =   $('#user-search-date-from'),
    userSearchDateTo    =   $('#user-search-date-to'),
    userTool    =   $('#user-tool'),
    randAdd = $('.rand-add'),
    randEdit = $('.rand-edit'),
    userEditStateButton = $('#user-edit-state-button'),
    userEditState = $('#user-edit-state'),
    userSearchState = $('#user-search-state'),
    userAddStaffName = $('#user-add-staff-name'),
    userEditStaffName = $('#user-edit-staff-name'),
    userOpt;
user.datagrid({
    url : ThinkPHP['MODULE' ]+ '/user/getList',
    fit : true,
    fitColumns : true,
    striped : true,
    border : false,
    pagination : true,
    pageSize : 20,
    pageList : [10,20,30,40,50],
    pageNumber : 1,
    sortName : 'create_time',
    sortOrder : 'DESC',
    toolbar : '#user-tool',
    columns : [[
        {
            field : 'id',
            title : '编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'accounts',
            title : '账号名称',
            width : 100,
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable : true
        },
        {
            field : 'login_count',
            title : '登录次数',
            width : 50,
            sortable : true
        },
        {
            field : 'staff_name',
            title : '绑定员工姓名',
            width : 80,
            sortable : true
        },
        {
            field : 'last_login_time',
            title : '最后登录时间',
            width : 100,
            sortable : true
        },
        {
            field : 'last_login_ip',
            title : '最后登录IP',
            width : 100,
            sortable : true
        },
        {
            field : 'state',
            title : '账号状态',
            width : 50,
            sortable : true,
            formatter : function (value, row)
            {
                var state = '';
                switch (value) {
                    case '冻结' :
                        state = '<a href="javascript:void(0)" user-id="' + row.id + '" user-state="冻结" class="user-state user-state-1" style="height:18px;margin-left:11px;"></a>';
                        break;
                    case '启用' :
                        state = '<a href="javascript:void(0)" user-id="' + row.id + '" user-state="启用" class="user-state user-state-2" style="height:18px;margin-left:11px;"></a>';
                        break;
                }
                return state;
            }
        }
    ]],
    onLoadSuccess : function(){
        $('.user-state-1').linkbutton({
            iconCls : 'icon-lock',
            plain : true
        });
        $('.user-state-2').linkbutton({
            iconCls : 'icon-ok',
            plain : true
        });
        $('.user-state').click(function(){
            var id = $(this).attr('user-id'),
                state = $(this).attr('user-state');
            switch (state){
                case  '冻结' :
                    $.messager.confirm('确认','通过审核？',function(flag){
                        if(flag){
                            $.ajax({
                                url : ThinkPHP['MODULE'] + '/user/state',
                                type : 'post',
                                data : {
                                    id : id,
                                    state : '启用'
                                },
                                beforeSend : function(){
                                    $.messager.progress({
                                        text : '正在通过审核...',
                                    });
                                },
                                success : function(data){
                                    $.messager.progress('close');
                                    if (data > 0){
                                        $.messager.show({
                                            title : '操作提醒',
                                            msg : '账号审核通过！'
                                        });
                                        user.datagrid('reload');
                                    }
                                }
                            });
                        }
                    });
                    break;
                case  '启用' :
                    $.messager.confirm('确认','冻结账号？',function(flag){
                        if(flag){
                            $.ajax({
                                url : ThinkPHP['MODULE'] + '/user/state',
                                type : 'post',
                                data : {
                                    id : id,
                                    state : '冻结'
                                },
                                beforeSend : function(){
                                    $.messager.progress({
                                        text : '正在冻结账号...',
                                    });
                                },
                                success : function(data){
                                    $.messager.progress('close');
                                    if (data > 0){
                                        $.messager.show({
                                            title : '操作提醒',
                                            msg : '账号冻结成功！'
                                        });
                                        user.datagrid('reload');
                                    }
                                }
                            });
                        }
                    });
                    break;
            }
        });
    }
});
//主工具栏操作
userOpt = {
    add : function(){
        userAdd.dialog('open');
        userAddStaffName.combogrid({
            width : 120,
            height : 32,
            url : ThinkPHP['MODULE'] + '/Staff/getNotRelationList',
            panelWidth : 450,
            panelHeight : 'auto',
            panelMaxHeight : 227,
            sortName : 'create_time',
            sortOrder : 'DESC',
            pagination : true,
            pageSize : 10,
            pageList : [10, 20, 30, 40, 50],
            pageNumber : 1,
            fitColumns : true,
            striped : true,
            rownumbers : true,
            border : false,
            idField:'id',
            textField:'name',
            editable : false,
            columns : [[
                {
                    field : 'id',
                    title : '编号',
                    width : 50,
                    hidden : true
                },
                {
                    field : 'name',
                    title : '姓名',
                    width : 80
                },
                {
                    field : 'number',
                    title : '工号',
                    width : 50,
                    sortable : true
                },
                {
                    field : 'gender',
                    title : '性别',
                    width : 50,
                    sortable : true
                },
                {
                    field : 'id_card',
                    title : '身份证',
                    width : 150
                },
                {
                    field : 'post',
                    title : '职位',
                    width : 50
                },
                {
                    field : 'create_time',
                    title : '创建时间',
                    width : 100,
                    hidden: true
                }
            ]],
            onOpen : function(){
                userAddStaffName.combogrid('grid').datagrid('reload');
            },
            onShowPanel : function(){
                userAddStaffName.combogrid('panel').panel('resize',{
                    width : '450px'
                });
            }
        });
    },
    edit : function(){
        var rows = user.datagrid('getSelections');
        if(rows.length == 1){
            userEdit.dialog('open');
            $.ajax({
                url : ThinkPHP['MODULE'] + '/user/getOne',
                type : 'post',
                data : {
                    id : rows[0].id
                },
                beforeSend : function(){
                    $.messager.progress({
                        text : '正在获取数据...',
                    });
                },
                success : function(data){
                    $.messager.progress('close');
                    if (data){
                        //修改状态
                        if (data.state == '启用')
                        {
                            userEditStateButton.switchbutton('check');
                        } else {
                            userEditStateButton.switchbutton('uncheck');
                        }
                        userEdit.form('load', {
                            id : data.id,
                            name : data.accounts,
                            staff_name : data.staff_name
                        });
                    }else{
                        $.messager.alert('警告操作', '没有获取到相应数据！', 'warning');
                    }
                    userEditName.textbox('textbox').select();
                }
            });
            userEditStaffName.combogrid({
                width : 120,
                height : 32,
                url : ThinkPHP['MODULE'] + '/Staff/getNotRelationList',
                panelWidth : 450,
                panelHeight : 'auto',
                panelMaxHeight : 227,
                sortName : 'create_time',
                sortOrder : 'DESC',
                pagination : true,
                pageSize : 10,
                pageList : [10, 20, 30, 40, 50],
                pageNumber : 1,
                fitColumns : true,
                striped : true,
                rownumbers : true,
                border : false,
                idField:'id',
                textField:'name',
                editable : false,
                columns : [[
                    {
                        field : 'id',
                        title : '编号',
                        width : 50,
                        hidden : true
                    },
                    {
                        field : 'name',
                        title : '姓名',
                        width : 80
                    },
                    {
                        field : 'number',
                        title : '工号',
                        width : 50,
                        sortable : true
                    },
                    {
                        field : 'gender',
                        title : '性别',
                        width : 50,
                        sortable : true
                    },
                    {
                        field : 'id_card',
                        title : '身份证',
                        width : 150
                    },
                    {
                        field : 'post',
                        title : '职位',
                        width : 50
                    },
                    {
                        field : 'create_time',
                        title : '创建时间',
                        width : 100,
                        hidden: true
                    }
                ]],
                onOpen : function(){
                    userEditStaffName.combogrid('grid').datagrid('reload');
                },
                onShowPanel : function(){
                    userEditStaffName.combogrid('panel').panel('resize',{
                        width : '450px'
                    });
                }
            });
        }else {
            $.messager.alert('警告操作', '编辑记录必须选定一条数据！', 'warning');
        }
    },
    remove : function() {
        var rows = user.datagrid('getSelections');
        if(rows.length > 0){
            $.messager.confirm('确认操作','您真的要删除所选的<strong>' + rows.length + '</strong>条记录吗？',function(flag){
                if(flag){
                    var ids = [];
                    for(var i=0;i<rows.length;i++){
                        ids.push(rows[i].id);
                    }
                }
                $.ajax({
                    url : ThinkPHP['MODULE'] + '/user/remove',
                    type : 'post',
                    data : {
                        ids : ids.join(',')
                    },
                    beforeSend : function(){
                        $.messager.progress({
                            text : '正在尝试删除...',
                        });
                    },
                    success : function(data){
                        $.messager.progress('close');
                        if(data){
                            user.datagrid('loaded');
                            user.datagrid('reload');
                            $.messager.show({
                                title : '操作提醒',
                                msg : data + '条记录被删除！'
                            });
                        }else{
                            $.messager.alert('警告操作','删除失败或遇到未知错误','warning');
                        }
                    }
                });
            });
        }else{
            $.messager.alert('警告操作','删除操作至少选择一条数据','warning');
        }
    },
    //小功能
    redo : function () {
        user.datagrid('unselectAll');
    },
    reload : function () {
        user.datagrid('reload');
    },
    search : function(){
        if(userTool.form('validate')){
            user.datagrid('load',{
                keywords : $.trim(userSearchKeywords.textbox('getValue')),
                dateType : userSearchDateType.textbox('getValue'),
                dateFrom : userSearchDateFrom.textbox('getValue'),
                dateTo : userSearchDateTo.textbox('getValue'),
                state : userSearchState.textbox('getValue'),
            });
        }else{
            userSearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        userSearchKeywords.textbox('clear');
        userSearchDateType.combobox('clear').combobox('disableValidation');
        userSearchDateFrom.datebox('clear');
        userSearchDateTo.datebox('clear');
        userSearchState.combobox('clear');
        this.search();
        user.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    }
};
//新增面板
userAdd.dialog({
    width : 400,
    height : 270,
    title : '新增账号',
    iconCls : 'icon-add',
    closed : true,
    modal : true,
    maximizable : true,
    buttons : [
        {
            'text' : '保存',
            iconCls : 'icon-accept',
            size : 'large',
            handler : function(){
                //验证通过后，ajax处理
                if(userAdd.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/user/register',
                        type : 'post',
                        data : {
                            accounts : userAddName.val(),
                            password : userAddPassword.val(),
                            staff_id : userAddStaffName.combogrid('getValue'),
                            staff_name : userAddStaffName.combogrid('getText')
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
                                    msg : '添加成功！'
                                });
                                userAdd.dialog('close');
                                user.datagrid('load');
                            }else if(data == -1) {
                                $.messager.alert('添加失败！','账号名称已存在！','warning',function(){
                                    userAddName.textbox('textbox').select();
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
                userAdd.dialog('close');
            }
        }
    ],
    onClose : function(){
        userAdd.form('reset');
        userAdd.dialog('center');
    }
});
//修改面板
userEdit.dialog({
    width : 400,
    height : 300,
    title : '修改账号',
    iconCls : 'icon-edit',
    closed : true,
    modal : true,
    maximizable : true,
    buttons : [
        {
            'text' : '保存',
            iconCls : 'icon-accept',
            size : 'large',
            handler : function(){
                //通过验证后，ajax处理
                if(userEdit.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/user/update',
                        type : 'post',
                        data : {
                            id : userEditId.val(),
                            accounts : userEditName.val(),
                            password : userEditPassword.val(),
                            state : userEditState.val(),
                            staff_id : userEditStaffName.combogrid('getValue'),
                            staff_name : userEditStaffName.combogrid('getText')
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
                                    msg : '修改成功'
                                });
                                userEdit.dialog('close');
                                user.datagrid('reload');
                            }else if(data == -1){
                                $.messager.alert('修改失败！','账号名称已存在！','warning',function(){
                                    userEditName.textbox('textbox').select();
                                });
                            }else if( data == 0){
                                $.messager.alert('修改失败！','尚未修改字段或未知错误！','warning',function(){
                                    userEditName.textbox('textbox').select();
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
                userEdit.dialog('close');
            }
        }
    ],
});
//修改状态
userEditStateButton.switchbutton({
    width: 65,
    onText : '启用',
    offText : '冻结',
    onChange : function(checked)
    {
        if (checked)
        {
            userEditState.val('启用');
        } else {
            userEditState.val('冻结');
        }
    }
});
//新增名称
userAddName.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入账号名称',
    invalidMessage : '账号名称2-20 位'
});
//新增账号密码
userAddPassword.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'minLength[6]',
    missingMessage : '请输入账号密码',
    invalidMessage : '账号密码至少6位'
});
//修改账号名称
userEditName.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入账号名称',
    invalidMessage : '账号名称2-20 位'
});
//修改密码
userEditPassword.textbox({
    width : 220,
    height : 32,
    validType : 'minLength[6]',
    missingMessage : '请输入账号密码',
    invalidMessage : '账号密码至少6位'
});
//搜索关键词
userSearchKeywords.textbox({
    width : 150,
    prompt : '账号'
});
//时间类型
userSearchDateType.combobox({
    width : 100,
    data : [{
        id : 'create_time',
        text : '创建时间'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    required : true,
    panelHeight : 'auto',
    novalidate : true,
    tipPosition : 'left',
    missingMessage : '请选择时间类型'
});
//搜索状态
userSearchState.combobox({
    width : 70,
    prompt : '状态',
    data : [{
        id : '启用',
        text : '启用'
    },{
        id : '冻结',
        text : '冻结'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//时间触发事件
userDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (userSearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            userSearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
userDate.prompt = '起始时间';
userSearchDateFrom.datebox(userDate);
//结束时间
userDate.prompt = '结束时间';
userSearchDateTo.datebox(userDate);
//浏览器改变大小时触发
$(window).resize(function(){
    userAdd.dialog('center');
});
//自定义validate验证规则
$.extend($.fn.validatebox.defaults.rules, {
    minLength: {
        validator: function(value, param){
            return value.length >= param[0];
        },
        message: '请至少输入{0}个字符'
    }
});
//新增时的随机密码
randAdd.click(function() {
    userAddPassword.textbox('setValue', getRandPassword(8, 16));
});
//修改时的随机密码
randEdit.click(function() {
    userEditPassword.textbox('setValue', getRandPassword(8, 16));
});
//扩展获取随机密码
var getRandPassword = function (min,max)
{
    var source =  'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789',
        length = Math.ceil(Math.random() * (max - min) + min),
        password = '';
    for(var i = 0;i < length; i++) {
        password += source.charAt(Math.ceil(Math.random() * 1000) %
            source.length);
    }
    return password;
};