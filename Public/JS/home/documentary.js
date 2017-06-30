//初始化变量
var documentary = $('#documentary'),
    documentaryAdd = $('#documentary-add'),
    documentaryAddTitle = $('#documentary-add-title'),
    documentaryAddName = $('#documentary-add-name'),
    documentaryAddCompany = $('#documentary-add-company'),
    documentaryAddWay = $('#documentary-add-way'),
    documentaryAddEvolve = $('#documentary-add-evolve'),
    documentaryAddRemark = $('#documentary-add-remark'),
    documentaryAddClient = $('#documentary-add-client'),
    documentaryAddClientSearch = $('#documentary-add-client-search'),
    documentaryAddStaff = $('#documentary-add-staff'),
    documentaryAddStaffSearch = $('#documentary-add-staff-search'),
    documentaryAddClientId = $('#documentary-add-client-id'),
    documentaryAddStaffId = $('#documentary-add-staff-id'),
    documentaryEdit = $('#documentary-edit'),
    documentaryEditId = $('#documentary-edit-id'),
    documentaryEditTitle = $('#documentary-edit-title'),
    documentaryEditName = $('#documentary-edit-name'),
    documentaryEditCompany = $('#documentary-edit-company'),
    documentaryEditWay = $('#documentary-edit-way'),
    documentaryEditEvolve = $('#documentary-edit-evolve'),
    documentaryEditRemark = $('#documentary-edit-remark'),
    documentaryEditClient = $('#documentary-edit-client'),
    documentaryEditClientSearch = $('#documentary-edit-client-search'),
    documentaryEditStaff = $('#documentary-edit-staff'),
    documentaryEditStaffSearch = $('#documentary-edit-staff-search'),
    documentaryEditClientId = $('#documentary-edit-client-id'),
    documentaryEditStaffId = $('#documentary-edit-staff-id'),
    documentarySearchKeywords  =   $('#documentary-search-keywords'),
    documentarySearchDateType  =   $('#documentary-search-date-type'),
    documentarySearchDateFrom  =   $('#documentary-search-date-from'),
    documentarySearchDateTo    =   $('#documentary-search-date-to'),
    documentarySearchWay = $('#documentary-search-way'),
    documentarySearchEvolve = $('#documentary-search-evolve'),
    documentaryTool    =   $('#documentary-tool'),
    documentaryOpt;
documentary.datagrid({
    url : ThinkPHP['MODULE' ]+ '/documentary/getList',
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
    toolbar : '#documentary-tool',
    columns : [[
        {
            field : 'id',
            title : '编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'sn',
            title : '编号',
            width : 100,
        },
        {
            field : 'title',
            title : '跟单名称',
            width : 100,
        },
        {
            field : 'client_company',
            title : '公司名称',
            width : 100,
        },
        {
            field : 'staff_name',
            title : '跟单员',
            width : 100,
        },
        {
            field : 'way',
            title : '跟单方式',
            width : 50,
        },
        {
            field : 'evolve',
            title : '进展阶段',
            width : 80,
        },
        {
            field : 'remark',
            title : '简要详情',
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
        $('.documentary-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function(index,field){
        if(field == 'details'){
            $('#documentary').datagrid('selectRow',index);
        }
    }
});
//主工具栏操作
documentaryOpt = {
    add : function(){
        documentaryAdd.dialog('open');
    },
    reload : function () {
        documentary.datagrid('reload');
    },
    search : function(){
        if(documentaryTool.form('validate')){
            documentary.datagrid('load',{
                keywords : $.trim(documentarySearchKeywords.textbox('getValue')),
                way : documentarySearchWay.combobox('getValue'),
                evolve : documentarySearchEvolve.combobox('getValue'),
                dateType : documentarySearchDateType.textbox('getValue'),
                dateFrom : documentarySearchDateFrom.textbox('getValue'),
                dateTo : documentarySearchDateTo.textbox('getValue')
            });
        }else{
            documentarySearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        documentarySearchKeywords.textbox('clear');
        documentarySearchWay.combobox('clear');
        documentarySearchEvolve.combobox('clear');
        documentarySearchDateType.combobox('clear').combobox('disableValidation');
        documentarySearchDateFrom.datebox('clear');
        documentarySearchDateTo.datebox('clear');
        this.search();
        documentary.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    edit : function(){
        var rows = documentary.datagrid('getSelections');
        if(rows.length == 1){
            documentaryEdit.dialog('open');
            $.ajax({
                url : ThinkPHP['MODULE'] + '/documentary/getOne',
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
                        documentaryEdit.form('load', {
                            id : data.id,
                            client_id : data.client_id,
                            staff_id : data.staff_id,
                            sn : data.sn,
                            title : data.title,
                            client_company : data.client_company,
                            way : data.way,
                            evolve : data.evolve,
                            staff_name : data.staff_name,
                            remark : data.remark
                        });
                    }else{
                        $.messager.alert('警告操作', '没有获取到相应数据！', 'warning');
                    }
                    documentaryEditTitle.textbox('textbox').select();
                }
            });
        }else {
            $.messager.alert('警告操作', '编辑记录必须选定一条数据！', 'warning');
        }
    },
    remove : function(){
        var rows = documentary.datagrid('getSelections');
        if(rows.length > 0){
            $.messager.confirm('确认操作','您真的要删除所选的<strong>' + rows.length + '</strong>条记录吗？',function(flag){
                if(flag){
                    var ids = [];
                    for(var i=0;i<rows.length;i++){
                            ids.push(rows[i].id);
                    }
                }
                $.ajax({
                    url : ThinkPHP['MODULE'] + '/documentary/remove',
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
                            documentary.datagrid('loaded');
                            documentary.datagrid('reload');
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
documentaryAdd.dialog({
    width : 420,
    height : 420,
    title : '新增跟单记录',
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
                if(documentaryAdd.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/documentary/register',
                        type : 'post',
                        data : {
                            title : $.trim(documentaryAddTitle.val()),
                            client_company : documentaryAddCompany.val(),
                            client_id : documentaryAddClientId.val(),
                            way : documentaryAddWay.combobox('getValue'),
                            evolve : documentaryAddEvolve.combobox('getValue'),
                            staff_name : documentaryAddName.val(),
                            staff_id : documentaryAddStaffId.val(),
                            remark : $.trim(documentaryAddRemark.val())
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
                                documentaryAdd.dialog('close');
                                documentary.datagrid('load');
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
                documentaryAdd.dialog('close');
            }
        }
    ],
    onClose : function(){
        documentaryAdd.form('reset');
        documentaryAdd.dialog('center');
    }
});
//修改面板
documentaryEdit.dialog({
    width : 420,
    height : 420,
    title : '修改跟单记录',
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
                if(documentaryEdit.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/documentary/update',
                        type : 'post',
                        data : {
                            id : documentaryEditId.val(),
                            title : $.trim(documentaryEditTitle.val()),
                            client_company : documentaryEditCompany.val(),
                            client_id : documentaryEditClientId.val(),
                            way : documentaryEditWay.combobox('getValue'),
                            evolve : documentaryEditEvolve.combobox('getValue'),
                            staff_name : documentaryEditName.val(),
                            staff_id : documentaryEditStaffId.val(),
                            remark : $.trim(documentaryEditRemark.val())
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
                                documentaryEdit.dialog('close');
                                documentary.datagrid('load');
                            }else if(data == 0){
                                $.messager.alert('警告错误','未修改任何数据','warning');
                            }else{
                                $.messager.alert('警告操作','遇到未知错误或修改失败','warning');
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
                documentaryEdit.dialog('close');
            }
        }
    ],
    onClose : function(){
        documentaryEdit.form('reset');
        documentaryEdit.dialog('center');
    }
});
/*表单元素*/
//新增跟单标题
documentaryAddTitle.textbox({
    width : 240,
    height : 32,
    required : true,
    missingMessage : '请填写跟单标题',
    invalidMessage : '跟单标题不得为空'
});
//修改跟单标题
documentaryEditTitle.textbox({
    width : 240,
    height : 32,
    required : true,
    missingMessage : '请填写跟单标题',
    invalidMessage : '跟单标题不得为空'
});
//新增关联公司
documentaryAddCompany.textbox({
    width : 240,
    height : 32,
    required : true,
    editable : false,
    icons : [{
       iconCls : 'icon-zoom',
        handler : function(){
            documentaryAddClient.dialog('open');
        }
    }],
    missingMessage : '请点击放大镜选择公司名称',
    invalidMessage : '关联公司不得为空'
});
//修改关联公司
documentaryEditCompany.textbox({
    width : 240,
    height : 32,
    required : true,
    editable : false,
    icons : [{
        iconCls : 'icon-zoom',
        handler : function(){
            documentaryEditClient.dialog('open');
        }
    }],
    missingMessage : '请点击放大镜选择公司名称',
    invalidMessage : '关联公司不得为空'
});
//点击弹出客户信息
documentaryAddClient.dialog({
    width : 550,
    height : 380,
    title : '选择客户',
    iconCls : 'icon-zoom',
    modal : true,
    closed : true,
    maximizable : true,
    onOpen : function(){
        documentaryAddClientSearch.datagrid({
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
            toolbar : '#documentary-client-tool',
            columns : [[
                {
                    field : 'id',
                    title : '编号',
                    hidden : true
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
                    field : 'create_time',
                    title : '创建时间',
                    width : 100,
                    sortable : true
                },
                {
                    field : 'select',
                    title : '选择客户',
                    width : 70,
                    formatter : function(value,row){
                        return '<a href="javascript:void(0)" class="select-button" style="height: 18px;margin-left:2px;" onclick="documentary_add_client_tool.select(\'' + row.id + '\', \'' + row.company + '\');">选择</a>';
                    }
                }
            ]],
            onLoadSuccess : function(){
                $('.select-button').linkbutton({
                    iconCls : 'icon-tick',
                    plain : true
                });
            },
            onClickCell : function(index,field){
                if(field == 'select'){
                    $('#documentary-add-client-search').datagrid('selectRow',index);
                }
            }
        });
    }
});
//点击弹出客户信息(修改)
documentaryEditClient.dialog({
    width : 550,
    height : 380,
    title : '选择客户',
    iconCls : 'icon-zoom',
    modal : true,
    closed : true,
    maximizable : true,
    onOpen : function(){
        documentaryEditClientSearch.datagrid({
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
            toolbar : '#documentary-client-tool',
            columns : [[
                {
                    field : 'id',
                    title : '编号',
                    hidden : true
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
                    field : 'create_time',
                    title : '创建时间',
                    width : 100,
                    sortable : true
                },
                {
                    field : 'select',
                    title : '选择客户',
                    width : 70,
                    formatter : function(value,row){
                        return '<a href="javascript:void(0)" class="select-button" style="height: 18px;margin-left:2px;" onclick="documentary_edit_client_tool.select(\'' + row.id + '\', \'' + row.company + '\');">选择</a>';
                    }
                }
            ]],
            onLoadSuccess : function(){
                $('.select-button').linkbutton({
                    iconCls : 'icon-tick',
                    plain : true
                });
            },
            onClickCell : function(index,field){
                if(field == 'select'){
                    $('#documentary-edit-client-search').datagrid('selectRow',index);
                }
            }
        });
    }
});
//选择客户公司工具栏
var documentary_add_client_tool = {
    select : function(id,company){
        $('#documentary-add-client-id').val(id);
        $('#documentary-add-company').textbox('setValue',company);
        documentaryAddClient.dialog('close');
        this.reset();
    },
    search : function(){
        documentaryAddClientSearch.datagrid('load',{
            keywords : $.trim($('#documentary-client-search-keywords').textbox('getValue'))
        });
    },
    reset : function(){
        $('#documentary-client-search-keywords').textbox('clear');
        this.search();
        documentaryAddClientSearch.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'DESC'
        });
    }
};
//选择客户公司工具栏(修改)
var documentary_edit_client_tool = {
    select : function(id,company){
        $('#documentary-edit-client-id').val(id);
        $('#documentary-edit-company').textbox('setValue',company);
        documentaryEditClient.dialog('close');
        this.reset();
    },
    search : function(){
        documentaryEditClientSearch.datagrid('load',{
            keywords : $.trim($('#documentary-client-search-keywords').textbox('getValue'))
        });
    },
    reset : function(){
        $('#documentary-client-search-keywords').textbox('clear');
        this.search();
        documentaryEditClientSearch.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'DESC'
        });
    }
};
//新增跟单员
documentaryAddName.textbox({
    width : 240,
    height : 32,
    required : true,
    icons : [{
       iconCls : 'icon-zoom',
       handler : function(){
           documentaryAddStaff.dialog('open');
       }
    }],
    missingMessage : '请点击放大镜选择跟单员',
    invalidMessage : '跟单员不得为空',
    editable : false
});
//修改跟单员
documentaryEditName.textbox({
    width : 240,
    height : 32,
    required : true,
    icons : [{
        iconCls : 'icon-zoom',
        handler : function(){
            documentaryEditStaff.dialog('open');
        }
    }],
    missingMessage : '请点击放大镜选择跟单员',
    invalidMessage : '跟单员不得为空',
    editable : false
});
//点击弹出员工信息
documentaryAddStaff.dialog({
    width : 550,
    height : 380,
    title : '选择跟单员',
    iconCls : 'icon-zoom',
    modal : true,
    closed : true,
    maximizable : true,
    onOpen : function(){
        documentaryAddStaffSearch.datagrid({
            url : ThinkPHP['MODULE' ]+ '/staff/getList',
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
            toolbar : '#documentary-staff-tool',
            columns : [[
                {
                    field : 'id',
                    title : '编号',
                    hidden : true
                },
                {
                    field : 'name',
                    title : '姓名',
                    width : 50,
                },
                {
                    field : 'number',
                    title : '员工编号',
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
                    title : '身份证号',
                    width : 100,
                },
                {
                    field : 'post',
                    title : '职位名称',
                    width : 50,
                    sortable : true,
                },
                {
                    field : 'tel',
                    title : '联系电话',
                    width : 70,
                },
                {
                  field : 'create_time',
                  title : '创建时间',
                  width : 70,
                },
                {
                    field : 'select',
                    title : '选择跟单员',
                    width : 70,
                    formatter : function(value,row){
                        return '<a href="javascript:void(0)" class="select-button" style="height: 18px;margin-left:2px;" onclick="documentary_add_staff_tool.select(\'' + row.id + '\', \'' + row.name + '\');">选择</a>';
                    }
                }
            ]],
            onLoadSuccess : function(){
                $('.select-button').linkbutton({
                    iconCls : 'icon-tick',
                    plain : true
                });
            },
            onClickCell : function(index,field){
                if(field == 'select'){
                    $('#documentary-add-staff-search').datagrid('selectRow',index);
                }
            }
        });
    }
});
//点击弹出员工信息(修改)
documentaryEditStaff.dialog({
    width : 550,
    height : 380,
    title : '选择跟单员',
    iconCls : 'icon-zoom',
    modal : true,
    closed : true,
    maximizable : true,
    onOpen : function(){
        documentaryEditStaffSearch.datagrid({
            url : ThinkPHP['MODULE' ]+ '/staff/getList',
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
            toolbar : '#documentary-staff-tool',
            columns : [[
                {
                    field : 'id',
                    title : '编号',
                    hidden : true
                },
                {
                    field : 'name',
                    title : '姓名',
                    width : 50,
                },
                {
                    field : 'number',
                    title : '员工编号',
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
                    title : '身份证号',
                    width : 100,
                },
                {
                    field : 'post',
                    title : '职位名称',
                    width : 50,
                    sortable : true,
                },
                {
                    field : 'tel',
                    title : '联系电话',
                    width : 70,
                },
                {
                    field : 'create_time',
                    title : '创建时间',
                    width : 70,
                },
                {
                    field : 'select',
                    title : '选择跟单员',
                    width : 70,
                    formatter : function(value,row){
                        return '<a href="javascript:void(0)" class="select-button" style="height: 18px;margin-left:2px;" onclick="documentary_edit_staff_tool.select(\'' + row.id + '\', \'' + row.name + '\');">选择</a>';
                    }
                }
            ]],
            onLoadSuccess : function(){
                $('.select-button').linkbutton({
                    iconCls : 'icon-tick',
                    plain : true
                });
            },
            onClickCell : function(index,field){
                if(field == 'select'){
                    $('#documentary-edit-staff-search').datagrid('selectRow',index);
                }
            }
        });
    }
});
//选择跟单员工具栏
var documentary_add_staff_tool = {
    select : function(id,name){
        $('#documentary-add-staff-id').val(id);
        $('#documentary-add-name').textbox('setValue',name);
        documentaryAddStaff.dialog('close');
        this.reset();
    },
    search : function(){
        documentaryAddStaffSearch.datagrid('load',{
            keywords : $.trim($('#documentary-staff-search-keywords').textbox('getValue'))
        });
    },
    reset : function(){
        $('#documentary-staff-search-keywords').textbox('clear');
        this.search();
        documentaryAddStaffSearch.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'DESC'
        });
    }
};
//选择跟单员工具栏(修改)
var documentary_edit_staff_tool = {
    select : function(id,name){
        $('#documentary-edit-staff-id').val(id);
        $('#documentary-edit-name').textbox('setValue',name);
        documentaryEditStaff.dialog('close');
        this.reset();
    },
    search : function(){
        documentaryEditStaffSearch.datagrid('load',{
            keywords : $.trim($('#documentary-staff-search-keywords').textbox('getValue'))
        });
    },
    reset : function(){
        $('#documentary-staff-search-keywords').textbox('clear');
        this.search();
        documentaryEditStaffSearch.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'DESC'
        });
    }
};
//新增跟单方式
documentaryAddWay.combobox({
    width : 200,
    height : 32,
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto',
    data : [
        {
            id : '电话联系',
            text : '电话联系'
        },{
            id : '上门拜访',
            text : '上门拜访'
        },{
            id : '网络咨询',
            text : '网络咨询'
        }
    ]
});
//修改跟单方式
documentaryEditWay.combobox({
    width : 200,
    height : 32,
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto',
    data : [
        {
            id : '电话联系',
            text : '电话联系'
        },{
            id : '上门拜访',
            text : '上门拜访'
        },{
            id : '网络咨询',
            text : '网络咨询'
        }
    ]
});
//新增进展状况
documentaryAddEvolve.combobox({
    width : 200,
    height : 32,
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto',
    data : [
        {
            id : '商务谈判',
            text : '商务谈判'
        },{
            id : '已签单',
            text : '已签单'
        },{
            id : '已放弃',
            text : '已放弃'
        }
    ]
});
//修改进展状况
documentaryEditEvolve.combobox({
    width : 200,
    height : 32,
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto',
    data : [
        {
            id : '商务谈判',
            text : '商务谈判'
        },{
            id : '已签单',
            text : '已签单'
        },{
            id : '已放弃',
            text : '已放弃'
        }
    ]
});
//新增详情备注
documentaryAddRemark.textbox({
    width : 240,
    height : 32,
});
//修改详情备注
documentaryEditRemark.textbox({
    width : 240,
    height : 32,
});

//搜索关键词
documentarySearchKeywords.textbox({
    width : 150,
    prompt : '公司名称|跟单员'
});
//搜索跟单方式
documentarySearchWay.combobox({
    width : 100,
    prompt : '跟单方式',
    data : [
        {
            id : '电话联系',
            text : '电话联系'
        },{
            id : '上门拜访',
            text : '上门拜访'
        },{
            id : '网络咨询',
            text : '网络咨询'
        }
    ],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//搜索进展阶段
documentarySearchEvolve.combobox({
    width : 100,
    prompt : '进展阶段',
    data : [
        {
            id : '商务谈判',
            text : '商务谈判'
        },{
            id : '已签单',
            text : '已签单'
        },{
            id : '已放弃',
            text : '已放弃'
        }
    ],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//时间类型
documentarySearchDateType.combobox({
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
documentaryDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (documentarySearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            documentarySearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
documentaryDate.prompt = '起始时间';
documentarySearchDateFrom.datebox(documentaryDate);
//结束时间
documentaryDate.prompt = '结束时间';
documentarySearchDateTo.datebox(documentaryDate);
//浏览器改变大小时触发
$(window).resize(function(){
    documentaryAdd.dialog('center');
});
//扩展手机号验证功能
$.extend($.fn.validatebox.defaults.rules, {
    tellphone : {
        validator: function(value){
            return /^1[34578]\d{9}$/.test(value);
        }
    }
});