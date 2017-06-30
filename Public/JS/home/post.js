//初始化变量
var post = $('#post'),
    postAdd = $('#post-add'),
    postAddName = $('#post-add-name'),
    postEdit = $('#post-edit'),
    postEditName = $('#post-edit-name'),
    postEditId = $('#post-edit-id'),
    postSearchKeywords  =   $('#post-search-keywords'),
    postSearchDateType  =   $('#post-search-date-type'),
    postSearchDateFrom  =   $('#post-search-date-from'),
    postSearchDateTo    =   $('#post-search-date-to'),
    postTool    =   $('#post-tool'),
    postOpt;
post.datagrid({
    url : ThinkPHP['MODULE' ]+ '/Post/getList',
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
    toolbar : '#post-tool',
    columns : [[
        {
            field : 'id',
            title : '编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'name',
            title : '职位名称',
            width : 100,
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable : true
        }
    ]]
});
//主工具栏操作
postOpt = {
    add : function(){
        $('#post-add').dialog('open');
    },
    edit : function(){
        var rows = post.datagrid('getSelections');
        if(rows.length == 1){
            postEdit.dialog('open');
            $.ajax({
                url : ThinkPHP['MODULE'] + '/Post/getOne',
                type : 'POST',
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
                        postEdit.form('load', {
                            id : data.id,
                            name : data.name,
                        });
                    }else{
                        $.messager.alert('警告操作', '没有获取到相应数据！', 'warning');
                    }
                    postEditName.textbox('textbox').select();
                }
            });
        }else {
            $.messager.alert('警告操作', '编辑记录必须选定一条数据！', 'warning');
        }
    },
    remove : function() {
        var rows = post.datagrid('getSelections');
        if(rows.length > 0){
            $.messager.confirm('确认操作','您真的要删除所选的<strong>' + rows.length + '</strong>条记录吗？',function(flag){
                if(flag){
                    var ids = [];
                    for(var i=0;i<rows.length;i++){
                        ids.push(rows[i].id);
                    }
                }
                $.ajax({
                    url : ThinkPHP['MODULE'] + '/Post/remove',
                    type : 'POST',
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
                            post.datagrid('loaded');
                            post.datagrid('reload');
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
        post.datagrid('unselectAll');
    },
    reload : function () {
        post.datagrid('reload');
    },
    search : function(){
        if(postTool.form('validate')){
            post.datagrid('load',{
                keywords : $.trim(postSearchKeywords.textbox('getValue')),
                dateType : postSearchDateType.textbox('getValue'),
                dateFrom : postSearchDateFrom.textbox('getValue'),
                dateTo : postSearchDateTo.textbox('getValue')
            });
        }else{
            postSearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        postSearchKeywords.textbox('clear');
        postSearchDateType.combobox('clear').combobox('disableValidation');
        postSearchDateFrom.datebox('clear');
        postSearchDateTo.datebox('clear');
        this.search();
        post.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    }
};
//新增面板
postAdd.dialog({
    width : 400,
    height : 190,
    title : '新增职位',
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
                if(postAdd.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/Post/register',
                        type : 'POST',
                        data : {
                            name : postAddName.val()
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
                                postAdd.dialog('close');
                                post.datagrid('load');
                            }else if(data == -1) {
                                $.messager.alert('添加失败！','职位名称已存在！','warning',function(){
                                    postAddName.textbox('textbox').select();
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
                postAdd.dialog('close');
            }
        }
    ],
    onClose : function(){
        postAdd.form('reset');
        postAdd.dialog('center');
    }
});
//修改面板
postEdit.dialog({
    width : 400,
    height : 190,
    title : '修改职位',
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
                if(postEdit.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/Post/update',
                        type : 'POST',
                        data : {
                            id : postEditId.val(),
                            name : postEditName.val(),
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
                                postEdit.dialog('close');
                                post.datagrid('reload');
                            }else if(data == -1){
                                $.messager.alert('修改失败！','职位名称已存在！','warning',function(){
                                    postEditName.textbox('textbox').select();
                                });
                            }else if( data == 0){
                                $.messager.alert('修改失败！','尚未修改字段或未知错误！','warning',function(){
                                    postEditName.textbox('textbox').select();
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
                postEdit.dialog('close');
            }
        }
    ],

});
//新增名称
postAddName.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入职位名称',
    invalidMessage : '职位名称2-20 位'
});
//修改名称
postEditName.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入职位名称',
    invalidMessage : '职位名称2-20 位'
});
//搜索关键词
postSearchKeywords.textbox({
    width : 150,
    prompt : '职位'
});
//时间类型
postSearchDateType.combobox({
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
//时间触发事件
postDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (postSearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            postSearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
postDate.prompt = '起始时间';
postSearchDateFrom.datebox(postDate);
//结束时间
postDate.prompt = '结束时间';
postSearchDateTo.datebox(postDate);
//浏览器改变大小时触发
$(window).resize(function(){
    postAdd.dialog('center');
});