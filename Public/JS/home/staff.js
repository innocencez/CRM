//初始化变量
var staff = $('#staff'),
    staffSearchKeywords  =   $('#staff-search-keywords'),
    staffSearchPost = $("#staff-search-post"),
    staffSearchEntryStatus = $("#staff-search-entry-status"),
    staffSearchDateType  =   $('#staff-search-date-type'),
    staffSearchDateFrom  =   $('#staff-search-date-from'),
    staffSearchDateTo    =   $('#staff-search-date-to'),
    staffSearchGender = $('#staff-search-gender'),
    staffSearchMaritalStatus = $('#staff-search-marital-status'),
    staffSearchIdCard = $('#staff-search-id-card'),
    staffSearchNation = $('#staff-search-nation'),
    staffTool    =   $('#staff-tool'),
    field = $('#field'),
    staffAdd = $('#staff-add'),
    staffAddName = $('#staff-add-name'),
    staffAddNumber = $('#staff-add-number'),
    staffAddGender = $('#staff-add-gender'),
    staffAddIdCard = $('#staff-add-id-card'),
    staffAddType = $('#staff-add-type'),
    staffAddTel = $('#staff-add-tel'),
    staffAddMaritalStatus = $('#staff-add-marital-status'),
    staffAddNation = $('#staff-add-nation'),
    staffAddEntryDate = $('#staff-add-entry-date'),
    staffAddEducation = $('#staff-add-education'),
    staffAddDimissionDate = $('#staff-add-dimission-date'),
    staffAddEntryStatus = $('#staff-add-entry-status'),
    staffAddSpecialty = $('#staff-add-specialty'),
    staffAddPoliticsStatus = $('#staff-add-politics-status'),
    staffAddHealth = $('#staff-add-health'),
    staffAddRegistered = $('#staff-add-registered'),
    staffAddGraduateDate = $('#staff-add-graduate-date'),
    staffAddRegisterdAddress = $('#staff-add-registered-address'),
    staffAddGraduateColleges = $('#staff-add-graduate-colleges'),
    staffAddIntro = $('#staff-add-intro'),
    staffAddPost = $('#staff-add-post'),
    staffAddDetails = $('#staff-add-details'),
    staffEdit = $('#staff-edit'),
    staffEditId = $('#staff-edit-id'),
    staffEditName = $('#staff-edit-name'),
    staffEditNumber = $('#staff-edit-number'),
    staffEditGender = $('#staff-edit-gender'),
    staffEditIdCard = $('#staff-edit-id-card'),
    staffEditType = $('#staff-edit-type'),
    staffEditTel = $('#staff-edit-tel'),
    staffEditMaritalStatus = $('#staff-edit-marital-status'),
    staffEditNation = $('#staff-edit-nation'),
    staffEditEntryDate = $('#staff-edit-entry-date'),
    staffEditEducation = $('#staff-edit-education'),
    staffEditDimissionDate = $('#staff-edit-dimission-date'),
    staffEditEntryStatus = $('#staff-edit-entry-status'),
    staffEditSpecialty = $('#staff-edit-specialty'),
    staffEditPoliticsStatus = $('#staff-edit-politics-status'),
    staffEditHealth = $('#staff-edit-health'),
    staffEditRegistered = $('#staff-edit-registered'),
    staffEditGraduateDate = $('#staff-edit-graduate-date'),
    staffEditRegisterdAddress = $('#staff-edit-registered-address'),
    staffEditGraduateColleges = $('#staff-edit-graduate-colleges'),
    staffEditIntro = $('#staff-edit-intro'),
    staffEditPost = $('#staff-edit-post'),
    staffEditDetails = $('#staff-edit-details'),
    staffOpt;
staff.datagrid({
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
    toolbar : '#staff-tool',
    columns : [[
        {
            field : 'id',
            title : '编号',
            width : 100,
            checkbox : true
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
            field : 'user_id',
            title : '账号id',
            hidden : true
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
            field : 'nation',
            title : '民族',
            width : 50,
            sortable : true,
        },
        {
            field : 'entry_status',
            title : '入职状态',
            width : 50,
            sortable : true,
        },
        {
            field : 'entry_date',
            title : '入职时间',
            width : 50,
            sortable : true,
        },
        {
            field : 'marital_status',
            title : '婚姻状况',
            width : 50,
            sortable : true,
        },
        {
            field : 'politics_status',
            title : '政治面貌',
            width : 50,
            sortable : true,
        },
        {
            field : 'education',
            title : '学历',
            width : 50,
            sortable : true,
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable : true
        },
        {
            field : 'details',
            title : '详情',
            width : 40,
            fixed : true,
            formatter : function(value,row){
                return '<a href="javascript:void(0)" class="staff-details" style="height:18px;margin-left:2px;" onclick="staffOpt.details('+ row.id +');"></a>';
            }
        }
    ]],
    onLoadSuccess : function(){
        $('.staff-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function(index,field){
        if(field == 'details'){
            $('#staff').datagrid('selectRow',index);
        }
    }
});
//主工具栏操作
staffOpt = {
    //新增
    add : function(){
        staffAdd.dialog('open');
    },
    //小功能
    redo : function () {
        staff.datagrid('unselectAll');
    },
    reload : function () {
        staff.datagrid('reload');
    },
    search : function(){
        if(staffTool.form('validate')){
            staff.datagrid('load',{
                keywords : $.trim(staffSearchKeywords.textbox('getValue')),
                dateType : staffSearchDateType.textbox('getValue'),
                dateFrom : staffSearchDateFrom.textbox('getValue'),
                dateTo : staffSearchDateTo.textbox('getValue'),
                post : staffSearchPost.combobox('getValue'),
                entryStatus : staffSearchEntryStatus.combobox('getValue'),
                gender : staffSearchGender.combobox('getValue'),
                idCard : staffSearchIdCard.textbox('getValue'),
                nation : staffSearchNation.textbox('getValue'),
                maritalStatus : staffSearchMaritalStatus.combobox('getValue')
            });
        }else{
            staffSearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        staffSearchKeywords.textbox('clear');
        staffSearchPost.combobox('clear');
        staffSearchEntryStatus.combobox('clear');
        staffSearchGender.combobox('clear');
        staffSearchIdCard.textbox('clear');
        staffSearchNation.textbox('clear');
        staffSearchMaritalStatus.combobox('clear');
        staffSearchDateType.combobox('clear').combobox('disableValidation');
        staffSearchDateFrom.datebox('clear');
        staffSearchDateTo.datebox('clear');
        this.search();
        staff.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    field : function(){
        if(field.linkbutton('options').text == '展开查询字段'){
            $('.more').show();
            field.linkbutton({
                iconCls : 'icon-reducesearch',
                text : '收起查询字段'
            }).linkbutton('select');
        }else{
            $('.more').hide();
            field.linkbutton({
                iconCls : 'icon-addsearch',
                text : '展开查询字段'
            }).linkbutton('unselect');
        }
    },
    remove : function() {
        var rows = staff.datagrid('getSelections');
        if(rows.length > 0){
            $.messager.confirm('确认操作','您真的要删除所选的<strong>' + rows.length + '</strong>条记录吗？',function(flag){
                if(flag){
                    var ids = [];
                    for(var i=0;i<rows.length;i++){
                        //关联档案忽略删除命令
                        if(rows[i].user_id == 0){
                            ids.push(rows[i].id);
                        }
                    }
                }
                $.ajax({
                    url : ThinkPHP['MODULE'] + '/staff/remove',
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
                            staff.datagrid('loaded');
                            staff.datagrid('reload');
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
    edit : function(){
        var rows = staff.datagrid('getSelections');
        if(rows.length == 1){
            staffEdit.dialog('open');
            $.ajax({
                url : ThinkPHP['MODULE'] + '/staff/getOne',
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
                        staffEdit.form('load', {
                            id : data.id,
                            name : data.name,
                            gender : data.gender,
                            number : data.number,
                            post : data.post,
                            type : data.type,
                            id_card : data.id_card,
                            tel : data.tel,
                            nation : data.nation,
                            marital_status : data.marital_status,
                            entry_status : data.entry_status,
                            entry_date : data.entry_date,
                            dimission_date : data.dimission_date,
                            politics_status : data.politics_status,
                            education : data.education,
                            health : data.health,
                            specialty : data.specialty,
                            registered : data.registered,
                            registered_address : data.registered_address,
                            graduate_date : data.graduate_date,
                            graduate_colleges : data.graduate_colleges,
                            intro : data.intro,
                            details : data.details
                        });
                       STAFF_EDIT.html(data.details);
                        if (data.gender == '男')
                        {
                            $('#staff-edit-gender-1').linkbutton('select');
                        } else {
                            $('#staff-edit-gender-2').linkbutton('select');
                        }
                    }else{
                        $.messager.alert('警告操作', '没有获取到相应数据！', 'warning');
                    }
                    staffEditName.textbox('textbox').select();
                }
            });
        }else{
            $.messager.alert('警告操作','编辑必须选中一条记录！','warning');
        }
    },
    details : function(id){
        details.dialog('open').
                    dialog('setTitle','员工档案详情').
                    dialog('refresh',ThinkPHP['MODULE'] + '/staff/getDetails?id=' + id);
    }
};

//搜索关键词
staffSearchKeywords.textbox({
    width : 150,
    prompt : '姓名|工号|电话'
});
//职位搜索
staffSearchPost.combobox({
    width : 70,
    prompt : '职位',
    url : ThinkPHP['MODULE'] + '/post/getAjaxList',
    valueField : 'name',
    textField : 'name',
    editable : false,
    panelHeight : 'auto'
});
//职位状态搜索
staffSearchEntryStatus.combobox({
    width : 100,
    prompt : '入职状态',
    data : [{
        id : '在职',
        text : '在职'
    }, {
        id : '试用',
        text : '试用'
    },{
        id : '离职',
        text : '离职'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//性别搜索
staffSearchGender.combobox({
    width :73,
    prompt : '性别',
    data : [{
        id : '男',
        text : '男'
    }, {
        id : '女',
        text : '女'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//婚姻状态搜索
staffSearchMaritalStatus.combobox({
    width : 73,
    prompt : '婚姻',
    data : [{
        id : '未婚',
        text : '未婚'
    }, {
        id : '已婚',
        text : '已婚'
    }, {
        id : '离异',
        text : '离异'
    }, {
        id : '丧偶',
        text : '丧偶'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//身份证搜索
staffSearchIdCard.textbox({
    width : 220,
    prompt : '身份证(请输入精准18 位身份证号码)',
    validType : 'id_card',
    invalidMessage : '身份证格式不正确，且精确到18 位',
    tipPosition : 'bottom'
});
//民族证搜索
staffSearchNation.textbox({
    width : 220,
    prompt : '民族(请输入精准关键字，如：汉族)',
    validType : 'nation',
    invalidMessage : '民族查询必须填入完整名称，不得小于2 位，且末尾包含“族”字',
    tipPosition : 'bottom'
});
//时间类型
staffSearchDateType.combobox({
    prompt : '查询时间',
    width : 100,
    data : [{
        id : 'create_time',
        text : '创建时间'
    },{
        id : 'entry_date',
        text : '入职时间'
    },{
        id : 'dimission_date',
        text : '离职时间'
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
staffDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (staffSearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            staffSearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
staffDate.prompt = '起始时间';
staffSearchDateFrom.datebox(staffDate);
//结束时间
staffDate.prompt = '结束时间';
staffSearchDateTo.datebox(staffDate);
//浏览器改变大小时触发
$(window).resize(function(){
    staffAdd.dialog('center');
});
staffAdd.dialog({
    width :780,
    height : 500,
    title : '新增员工档案',
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
                //设置同步，否则接收不到值
                STAFF_ADD.sync();
                //验证通过后，ajax处理
                if(staffAdd.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/staff/register',
                        type : 'post',
                        data : {
                            name : $.trim(staffAddName.val()),
                            number : $.trim(staffAddNumber.val()),
                            post : staffAddPost.combobox('getValue'),
                            id_card : $.trim(staffAddIdCard.val()),
                            gender : staffAddGender.val(),
                            type : staffAddType.combobox('getValue'),
                            tel : $.trim(staffAddTel.val()),
                            marital_status : staffAddMaritalStatus.combobox('getValue'),
                            nation : $.trim(staffAddNation.val()),
                            entry_date : staffAddEntryDate.datebox('getValue'),
                            education : staffAddEducation.combobox('getValue'),
                            dimission_date : staffAddDimissionDate.datebox('getValue'),
                            entry_status : staffAddEntryStatus.combobox('getValue'),
                            specialty : $.trim(staffAddSpecialty.val()),
                            politics_status : staffAddPoliticsStatus.combobox('getValue'),
                            health : $.trim(staffAddHealth.val()),
                            registered : staffAddRegistered.combobox('getValue'),
                            graduate_date : staffAddGraduateDate.datebox('getValue'),
                            registered_address : $.trim(staffAddRegisterdAddress.val()),
                            graduate_colleges : $.trim(staffAddGraduateColleges.val()),
                            intro : $.trim(staffAddIntro.val()),
                            details : $.trim(staffAddDetails.val())
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
                                staffAdd.dialog('close');
                                staff.datagrid('load');
                            }else if(data == -1){
                                $.messager.alert('新增失败！','员工工号被占用！','warning',function(){
                                    staffAddNumber.textbox('textbox').select();
                                });
                            }else if(data == 0){
                                $.messager.alert('新增失败！','未知错误！','warning',function(){
                                    staffAddName.textbox('textbox').select();
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
                staffAdd.dialog('close');
            }
        }
    ],
    //新增dialog 的事件
    onOpen : function ()
    {
        STAFF_ADD.html('');
    },
    onClose : function(){
        staffAdd.form('reset');
        staffAdd.dialog('center');
       STAFF_ADD.html('');
    }
});
staffEdit.dialog({
    width :780,
    height : 500,
    title : '修改员工档案',
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
                //设置同步，否则接收不到值
                STAFF_EDIT.sync();
                //验证通过后，ajax处理
                if(staffEdit.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/staff/update',
                        type : 'post',
                        data : {
                            id : staffEditId.val(),
                            name : $.trim(staffEditName.val()),
                            number : $.trim(staffEditNumber.val()),
                            post : staffEditPost.combobox('getValue'),
                            id_card : $.trim(staffEditIdCard.val()),
                            gender : staffEditGender.val(),
                            type : staffEditType.combobox('getValue'),
                            tel : $.trim(staffEditTel.val()),
                            marital_status : staffEditMaritalStatus.combobox('getValue'),
                            nation : $.trim(staffEditNation.val()),
                            entry_date : staffEditEntryDate.datebox('getValue'),
                            education : staffEditEducation.combobox('getValue'),
                            dimission_date : staffEditDimissionDate.datebox('getValue'),
                            entry_status : staffEditEntryStatus.combobox('getValue'),
                            specialty : $.trim(staffEditSpecialty.val()),
                            politics_status : staffEditPoliticsStatus.combobox('getValue'),
                            health : $.trim(staffEditHealth.val()),
                            registered : staffEditRegistered.combobox('getValue'),
                            graduate_date : staffEditGraduateDate.datebox('getValue'),
                            registered_address : $.trim(staffEditRegisterdAddress.val()),
                            graduate_colleges : $.trim(staffEditGraduateColleges.val()),
                            intro : $.trim(staffEditIntro.val()),
                            details : $.trim(staffEditDetails.val())
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
                                staffEdit.dialog('close');
                                staff.datagrid('load');
                            }else if(data == 0){
                                $.messager.alert('修改失败！','未做任何修改！','warning',function(){
                                    staffEditName.textbox('textbox').select();
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
                staffEdit.dialog('close');
            }
        }
    ],
    onClose : function(){
        staffAdd.form('reset');
        staffAdd.dialog('center');
        STAFF_EDIT.html('');
    }
});
$('#staff-add-gender-1').linkbutton({
    plain : true,
    toggle : true,
    selected : true,
    group : 'staff_add_gender',
    iconCls : 'icon-male',
    onClick : function () {
        staffAddGender.val('男');
    }
});
$('#staff-add-gender-2').linkbutton({
    plain : true,
    toggle : true,
    group : 'staff_add_gender',
    iconCls : 'icon-female',
    onClick : function () {
        staffAddGender.val('女');
    }
});
$('#staff-edit-gender-1').linkbutton({
    plain : true,
    toggle : true,
    selected : true,
    group : 'staff_edit_gender',
    iconCls : 'icon-male',
    onClick : function () {
        staffEditGender.val('男');
    }
});
$('#staff-edit-gender-2').linkbutton({
    plain : true,
    toggle : true,
    group : 'staff_edit_gender',
    iconCls : 'icon-female',
    onClick : function () {
        staffEditGender.val('女');
    }
});
//新增名称
staffAddName.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入姓名',
    invalidMessage : '姓名长度2-20 位'
});
//修改名称
staffEditName.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入姓名',
    invalidMessage : '姓名长度2-20 位'
});
//新增工号
staffAddNumber.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'number',
    missingMessage : '请输入工号',
    invalidMessage : '工号长度不合法'
});
//修改工号
staffEditNumber.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'number',
    missingMessage : '请输入工号',
    invalidMessage : '工号长度不合法'
});
//身份证号
staffAddIdCard.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'id_card',
    missingMessage : '请输入身份证号',
    invalidMessage : '身份证号长度不合法'
});
//修改身份证号
staffEditIdCard.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'id_card',
    missingMessage : '请输入身份证号',
    invalidMessage : '身份证号长度不合法'
});
//新增职位
staffAddPost.combobox({
    width : 140,
    height : 32,
    url : ThinkPHP['MODULE'] + '/post/getAjaxList',
    valueField : 'name',
    textField : 'name',
    editable : false,
    panelHeight : 'auto'
});
//修改职位
staffEditPost.combobox({
    width : 140,
    height : 32,
    url : ThinkPHP['MODULE'] + '/post/getAjaxList',
    valueField : 'name',
    textField : 'name',
    editable : false,
    panelHeight : 'auto'
});
//新增员工类型
staffAddType.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '正式员工',
        text : '正式员工'
    }, {
        id : '合同工',
        text : '合同工'
    },{
        id : '实习生',
        text : '实习生'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//修改员工类型
staffEditType.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '正式员工',
        text : '正式员工'
    }, {
        id : '合同工',
        text : '合同工'
    },{
        id : '实习生',
        text : '实习生'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//新增手机号
staffAddTel.textbox({
    width : 240,
    height : 32,
    validType : 'tellphone',
    invalidMessage : '手机号码格式不合法'
});
//修改手机号
staffEditTel.textbox({
    width : 240,
    height : 32,
    validType : 'tellphone',
    invalidMessage : '手机号码格式不合法'
});
//新增婚姻状态
staffAddMaritalStatus.combobox({
    width : 140,
    height:32,
    data : [{
        id : '未婚',
        text : '未婚'
    }, {
        id : '已婚',
        text : '已婚'
    }, {
        id : '离异',
        text : '离异'
    }, {
        id : '丧偶',
        text : '丧偶'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//修改婚姻状态
staffEditMaritalStatus.combobox({
    width : 140,
    height:32,
    data : [{
        id : '未婚',
        text : '未婚'
    }, {
        id : '已婚',
        text : '已婚'
    }, {
        id : '离异',
        text : '离异'
    }, {
        id : '丧偶',
        text : '丧偶'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//新增民族
staffAddNation.textbox({
    width : 240,
    height : 32,
    validType : 'nation',
    invalidMessage : '民族格式不合法'
});
//修改民族
staffEditNation.textbox({
    width : 240,
    height : 32,
    validType : 'nation',
    invalidMessage : '民族格式不合法'
});
//新增入职时间
staffAddEntryDate.datebox({
    width : 140,
    height : 32,
    editable : false
});
//修改入职时间
staffEditEntryDate.datebox({
    width : 140,
    height : 32,
    editable : false
});
//新增学历
staffAddEducation.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '博士',
        text : '博士'
    }, {
        id : '硕士',
        text : '硕士'
    },{
        id : '本科',
        text : '本科'
    },{
        id : '专科',
        text : '专科'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//修改学历
staffEditEducation.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '博士',
        text : '博士'
    }, {
        id : '硕士',
        text : '硕士'
    },{
        id : '本科',
        text : '本科'
    },{
        id : '专科',
        text : '专科'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//新增入职状态
staffAddEntryStatus.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '在职',
        text : '在职'
    }, {
        id : '试用',
        text : '试用'
    },{
        id : '离职',
        text : '离职'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//修改入职状态
staffEditEntryStatus.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '在职',
        text : '在职'
    }, {
        id : '试用',
        text : '试用'
    },{
        id : '离职',
        text : '离职'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//新增离职时间
staffAddDimissionDate.datebox({
    width : 140,
    height : 32,
    editable : false
});
//修改离职时间
staffEditDimissionDate.datebox({
    width : 140,
    height : 32,
    editable : false
});
//新增专业
staffAddSpecialty.textbox({
    width : 240,
    height : 32,
});
//新增专业
staffEditSpecialty.textbox({
    width : 240,
    height : 32,
});
//新增政治面貌
staffAddPoliticsStatus.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '党员',
        text : '党员'
    }, {
        id : '群众',
        text : '群众'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//修改政治面貌
staffEditPoliticsStatus.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '党员',
        text : '党员'
    }, {
        id : '群众',
        text : '群众'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//新增健康状况
staffAddHealth.textbox({
    width : 240,
    height : 32,
});
//修改健康状况
staffEditHealth.textbox({
    width : 240,
    height : 32,
});
//新增户口
staffAddRegistered.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '农村',
        text : '农村'
    }, {
        id : '城市',
        text : '城市'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//修改户口
staffEditRegistered.combobox({
    width : 140,
    height : 32,
    data : [{
        id : '农村',
        text : '农村'
    }, {
        id : '城市',
        text : '城市'
    }],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//新增毕业时间
staffAddGraduateDate.datebox({
    width : 140,
    height : 32,
    editable : false
});
//修改毕业时间
staffEditGraduateDate.datebox({
    width : 140,
    height : 32,
    editable : false
});
//新增户口所在地
staffAddRegisterdAddress.textbox({
    width : 240,
    height : 32,
});
//修改户口所在地
staffEditRegisterdAddress.textbox({
    width : 240,
    height : 32,
});
//新增毕业院校
staffAddGraduateColleges.textbox({
    width : 240,
    height : 32,
});
//修改毕业院校
staffEditGraduateColleges.textbox({
    width : 240,
    height : 32,
});
//加载新增编辑器
STAFF_ADD = KindEditor.create('#staff-add-details', {
    width : '94%',
    height : '200px',
    resizeType : 0,
    items : editor_tool
});
//加载修改编辑器
STAFF_EDIT = KindEditor.create('#staff-edit-details', {
    width : '94%',
    height : '200px',
    resizeType : 0,
    items : editor_tool
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
//扩展手机号验证功能
$.extend($.fn.validatebox.defaults.rules, {
    tellphone : {
        validator: function(value){
            return /^1[34578]\d{9}$/.test(value);
        }
    }
});
//扩展工号验证功能
$.extend($.fn.validatebox.defaults.rules, {
    number : {
        validator: function(value){
            return /^[0-9]{4}$/.test(value);
        }
    }
});
//扩展身份证验证功能
$.extend($.fn.validatebox.defaults.rules, {
    id_card : {
        validator: function(value){
            return /^[0-9]{17}[xX0-9]$/.test(value);
        }
    }
});

//扩展民族验证功能
$.extend($.fn.validatebox.defaults.rules, {
    nation : {
        validator: function(value){
            return /^.{1,4}族$/.test(value);
        }
    }
});