//初始化变量
var client = $('#client'),
    clientAdd = $('#client-add'),
    clientAddCompany = $('#client-add-company'),
    clientAddName = $('#client-add-name'),
    clientAddTel = $('#client-add-tel'),
    clientAddSource = $('#client-add-source'),
    clientEdit = $('#client-edit'),
    clientEditId = $('#client-edit-id'),
    clientEditCompany = $('#client-edit-company'),
    clientEditName = $('#client-edit-name'),
    clientEditTel = $('#client-edit-tel'),
    clientEditSource = $('#client-edit-source'),
    clientSearchKeywords  =   $('#client-search-keywords'),
    clientSearchDateType  =   $('#client-search-date-type'),
    clientSearchDateFrom  =   $('#client-search-date-from'),
    clientSearchDateTo    =   $('#client-search-date-to'),
    clientSearchSource = $('#client-search-source'),
    clientTool    =   $('#client-tool'),
    clientOpt;
client.datagrid({
    url : ThinkPHP['MODULE' ]+ '/client/getList',
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
    toolbar : '#client-tool',
    columns : [[
        {
            field : 'id',
            title : '编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'company',
            title : '公司名称',
            width : 100,
        },
        {
            field : 'name',
            title : '联系人',
            width : 100,
        },
        {
            field : 'tel',
            title : '联系电话',
            width : 100,
        },
        {
            field : 'source',
            title : '客户来源',
            width : 100,
        },
        {
            field : 'enter',
            title : '录入员',
            width : 100,
            sortable : true
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable : true
        }
    ]],
    onLoadSuccess : function(){
        $('.client-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function(index,field){
        if(field == 'details'){
            $('#client').datagrid('selectRow',index);
        }
    }
});
//主工具栏操作
clientOpt = {
    add : function(){
        clientAdd.dialog('open');
    },
    reload : function () {
        client.datagrid('reload');
    },
    search : function(){
        if(clientTool.form('validate')){
            client.datagrid('load',{
                keywords : $.trim(clientSearchKeywords.textbox('getValue')),
                source : clientSearchSource.combobox('getValue'),
                dateType : clientSearchDateType.textbox('getValue'),
                dateFrom : clientSearchDateFrom.textbox('getValue'),
                dateTo : clientSearchDateTo.textbox('getValue')
            });
        }else{
            clientSearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        clientSearchKeywords.textbox('clear');
        clientSearchSource.combobox('clear');
        clientSearchDateType.combobox('clear').combobox('disableValidation');
        clientSearchDateFrom.datebox('clear');
        clientSearchDateTo.datebox('clear');
        this.search();
        client.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    edit : function(){
        var rows = client.datagrid('getSelections');
        if(rows.length == 1){
            clientEdit.dialog('open');
            $.ajax({
                url : ThinkPHP['MODULE'] + '/client/getOne',
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
                        clientEdit.form('load', {
                            id : data.id,
                            company : data.company,
                            name : data.name,
                            tel : data.tel,
                            source : data.source
                        });
                    }else{
                        $.messager.alert('警告操作', '没有获取到相应数据！', 'warning');
                    }
                    clientEditName.textbox('textbox').select();
                }
            });
        }else {
            $.messager.alert('警告操作', '编辑记录必须选定一条数据！', 'warning');
        }
    },
    remove : function(){
        var rows = client.datagrid('getSelections');
        if(rows.length > 0){
            $.messager.confirm('确认操作','您真的要删除所选的<strong>' + rows.length + '</strong>条记录吗？',function(flag){
                if(flag){
                    var ids = [];
                    for(var i=0;i<rows.length;i++){
                            ids.push(rows[i].id);
                    }
                }
                $.ajax({
                    url : ThinkPHP['MODULE'] + '/client/remove',
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
                            client.datagrid('loaded');
                            client.datagrid('reload');
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
    }
};
//新增面板
clientAdd.dialog({
    width : 420,
    height : 330,
    title : '新增客户',
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
                if(clientAdd.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/client/register',
                        type : 'post',
                        data : {
                            company : $.trim(clientAddCompany.val()),
                            name : $.trim(clientAddName.val()),
                            tel : $.trim(clientAddTel.val()),
                            source : clientAddSource.combobox('getValue')
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
                                clientAdd.dialog('close');
                                client.datagrid('load');
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
                clientAdd.dialog('close');
            }
        }
    ],
    onClose : function(){
        clientAdd.form('reset');
        clientAdd.dialog('center');
    }
});
//修改面板
clientEdit.dialog({
    width : 420,
    height : 330,
    title : '修改客户信息',
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
                //验证通过后，ajax处理
                if(clientEdit.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/client/update',
                        type : 'post',
                        data : {
                            id : clientEditId.val(),
                            name : $.trim(clientEditName.val()),
                            tel : $.trim(clientEditTel.val()),
                            source : clientEditSource.combobox('getValue')
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
                                    msg : '修改成功！'
                                });
                                clientEdit.dialog('close');
                                client.datagrid('load');
                            }else if(data == 0){
                                $.messager.alert('警告操作','没有修改任何信息','warning');
                            }else{
                                $.messager.alert('警告操作','修改失败或遇到未知错误','warning');
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
                clientEdit.dialog('close');
            }
        }
    ],
    onClose : function(){
        clientEdit.form('reset');
        clientEdit.dialog('center');
    }
});
/*表单元素*/
//新增客户公司
clientAddCompany.textbox({
    width : 240,
    height : 32,
    required : true,
    missingMessage : '请填写公司名称',
    invalidMessage : '公司名称不得为空'
});
//修改客户公司
clientEditCompany.textbox({
    width : 240,
    height : 32,
    required : true,
    disabled : true,
    missingMessage : '请填写公司名称',
    invalidMessage : '公司名称不得为空'
});
//新增客户联系人
clientAddName.textbox({
    width : 240,
    height : 32,
    required : true,
    missingMessage : '请填写联系人',
    invalidMessage : '联系人不得为空'
});
//修改客户联系人
clientEditName.textbox({
    width : 240,
    height : 32,
    required : true,
    missingMessage : '请填写联系人',
    invalidMessage : '联系人不得为空'
});
//新增客户手机号码
clientAddTel.textbox({
   width : 240,
    height : 32,
    required : true,
    validType : 'tellphone',
    missingMessage : '请输入手机号',
    invalidMessage : '手机号码格式不正确'
});
//新增客户手机号码
clientEditTel.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'tellphone',
    missingMessage : '请输入手机号',
    invalidMessage : '手机号码格式不正确'
});
//新增客户来源方式
clientAddSource.combobox({
    width : 200,
    height : 32,
    textField : 'text',
    valueField : 'id',
    panelHeight : 'auto',
    editable : false,
    data : [{
        id : '网络推广',
        text : '网络推广'
    },{
        id : '地推活动',
        text : '地推活动'
    },{
        id : '会议营销',
        text : '会议营销'
    },{
        id : '电话营销',
        text : '电话营销'
    }]
});
//修改客户来源方式
clientEditSource.combobox({
    width : 200,
    height : 32,
    textField : 'text',
    valueField : 'id',
    panelHeight : 'auto',
    editable : false,
    data : [{
        id : '网络推广',
        text : '网络推广'
    },{
        id : '地推活动',
        text : '地推活动'
    },{
        id : '会议营销',
        text : '会议营销'
    },{
        id : '电话营销',
        text : '电话营销'
    }]
});
//搜索关键词
clientSearchKeywords.textbox({
    width : 150,
    prompt : '公司名称|联系人|电话'
});
//搜索产品类型
clientSearchSource.combobox({
    width : 100,
    prompt : '客户来源',
    data : [
        {
            id : '网络推广',
            text : '网络推广'
        },{
            id : '地推活动',
            text : '地推活动'
        },{
            id : '会议营销',
            text : '会议营销'
        },{
            id : '电话营销',
            text : '电话营销'
        }
    ],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//时间类型
clientSearchDateType.combobox({
    width : 100,
    prompt : '查询时间',
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
//时间触发事件
clientDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (clientSearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            clientSearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
clientDate.prompt = '起始时间';
clientSearchDateFrom.datebox(clientDate);
//结束时间
clientDate.prompt = '结束时间';
clientSearchDateTo.datebox(clientDate);
//浏览器改变大小时触发
$(window).resize(function(){
    clientAdd.dialog('center');
});
//扩展手机号验证功能
$.extend($.fn.validatebox.defaults.rules, {
    tellphone : {
        validator: function(value){
            return /^1[34578]\d{9}$/.test(value);
        }
    }
});