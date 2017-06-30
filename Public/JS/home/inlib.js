//初始化变量
var inlib = $('#inlib'),
    inlibAdd = $('#inlib-add'),
    inlibAddProductId = $('#inlib-add-product-id'),
    inlibAddProduct = $('#inlib-add-product'),
    inlibAddNumber = $('#inlib-add-number'),
    inlibAddStaff = $('#inlib-add-staff'),
    inlibAddType = $('#inlib-add-type'),
    inlibAddDetails = $('#inlib-add-details'),
    inlibSearchKeywords  =   $('#inlib-search-keywords'),
    inlibSearchType = $('#inlib-search-type'),
    inlibSearchDateType  =   $('#inlib-search-date-type'),
    inlibSearchDateFrom  =   $('#inlib-search-date-from'),
    inlibSearchDateTo    =   $('#inlib-search-date-to'),
    inlibTool    =   $('#inlib-tool'),
    inlibProduct = $('#inlib-product'),
    inlibStaff = $('#inlib-staff'),
    inlibSearchProduct = $('#inlib-search-product'),
    inlibSearchStaff = $('#inlib-search-staff'),
    inlibToolProduct = $('#inlib-tool-product'),
    inlibToolStaff = $('#inlib-tool-staff'),
    inlibSearchKeywordsProduct = $('#inlib-search-keywords-product'),
    inlibSearchKeywordsStaff = $('#inlib-search-keywords-staff'),
    inlibProductOpt,
    inlibStaffOpt,
    inlibOpt;
inlib.datagrid({
    url : ThinkPHP['MODULE' ]+ '/inlib/getList',
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
    toolbar : '#inlib-tool',
    columns : [[
        {
            field : 'id',
            title : '编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'name',
            title : '入库产品',
            width : 100,
        },
        {
            field : 'sn',
            title : '产品编号',
            width : 100,
        },
        {
            field : 'type',
            title : '产品类型',
            width : 100,
        },
        {
            field : 'pro_price',
            title : '销售价格',
            width : 100,
        },
        {
            field : 'number',
            title : '入库数量',
            width : 50,
            sortable : true
        },
        {
            field : 'staff_name',
            title : '经办人姓名',
            width : 70,
        },
        {
            field : 'mode',
            title : '入库方式',
            width : 50,
            sortable : true
        },
        {
            field : 'mode_explain',
            title : '入库说明',
            width : 50,
        },
        {
            field : 'enter',
            title : '录入员',
            width : 50,
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
                return '<a href="javascript:void(0)" class="inlib-details" style="height:18px;margin-left:2px;" onclick="inlibOpt.details('+ row.id +');"></a>';
            }
        }
    ]],
    onLoadSuccess : function(){
        $('.inlib-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function(index,field){
        if(field == 'details'){
            $('#inlib').datagrid('selectRow',index);
        }
    }
});
//主工具栏操作
inlibOpt = {
    add : function(){
        inlibAdd.dialog('open');
    },
    reload : function () {
        inlib.datagrid('reload');
    },
    search : function(){
        if(inlibTool.form('validate')){
            inlib.datagrid('load',{
                keywords : $.trim(inlibSearchKeywords.textbox('getValue')),
                type : inlibSearchType.combobox('getValue'),
                dateType : inlibSearchDateType.textbox('getValue'),
                dateFrom : inlibSearchDateFrom.textbox('getValue'),
                dateTo : inlibSearchDateTo.textbox('getValue')
            });
        }else{
            inlibSearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        inlibSearchKeywords.textbox('clear');
        inlibSearchType.combobox('clear');
        inlibSearchDateType.combobox('clear').combobox('disableValidation');
        inlibSearchDateFrom.datebox('clear');
        inlibSearchDateTo.datebox('clear');
        this.search();
        inlib.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    details : function(id){
        details.dialog('open').dialog('setTitle','入库产品详情').dialog('refresh',ThinkPHP['MODULE'] + '/Inlib/getDetails?id=' + id);
    }
};
//新增面板
inlibAdd.dialog({
    width : 420,
    height : 380,
    title : '新增入库',
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
                if(inlibAdd.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/inlib/register',
                        type : 'post',
                        data : {
                            product_id : inlibAddProductId.val(),
                            number : inlibAddNumber.val(),
                            staff_name : inlibAddStaff.val(),
                            mode : inlibAddType.combobox('getValue'),
                            mode_explain : $.trim(inlibAddDetails.val())
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
                                inlibAdd.dialog('close');
                                inlib.datagrid('load');
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
                inlibAdd.dialog('close');
            }
        }
    ],
    onClose : function(){
        inlibAdd.form('reset');
        inlibAdd.dialog('center');
    }
});
/*表单元素*/
//新增入库产品
inlibAddProduct.textbox({
    width : 240,
    height : 32,
    editable : false,
    icons : [{
        iconCls : 'icon-zoom',
        handler : function(){
            inlibProduct.dialog('open');
        }
    }],
    required : true,
    missingMessage : '请点击放大镜图表选择产品',
    invalidMessage : '产品不得为空'
}).siblings('span').find('input').focus(function () {
    for (var i = 0; i < $('.tooltip-content').length; i ++) {
        if ($('.tooltip-content').eq(i).text() == '请点击放大镜图标选择产品') {
        $('.tooltip-content').eq(i).parent().css('margin-left', '15px');
    }
}
}).hover(function () {
    for (var i = 0; i < $('.tooltip-content').length; i ++) {
        if ($('.tooltip-content').eq(i).text() == '请点击放大镜图标选择产品') {
        $('.tooltip-content').eq(i).parent().css('margin-left', '15px');
    }
}
});
inlibProduct.dialog({
    width: 550,
    height: 380,
    title: '选择产品',
    iconCls: 'icon-zoom',
    modal: true,
    closed: true,
    maximizable: true,
    onOpen : function (){
        inlibSearchProduct.datagrid({
            url: ThinkPHP['MODULE'] + '/Product/getList',
            fit: true,
            fitColumns: true,
            striped: true,
            rownumbers: true,
            border: false,
            pagination: true,
            pageSize: 10,
            pageList: [10, 20, 30, 40, 50],
            pageNumber: 1,
            sortName: 'create_time',
            sortOrder: 'DESC',
            toolbar : inlibToolProduct,
            columns: [[
                {
                    field: 'sn',
                    title: '产品编号',
                    width: 60
                },
                {
                    field: 'name',
                    title: '产品名称',
                    width: 100
                },
                {
                    field: 'unit',
                    title: '计量单位',
                    width: 50
                },
                {
                    field: 'pro_price',
                    title: '采购价',
                    width: 50
                },
                {
                    field: 'select',
                    title: '选择产品',
                    width: 60,
                    formatter: function (value, row) {
                        return '<a href="javascript:void(0)" class = "select-button" style = "height: 18px;margin-left:2px;" onclick="inlibProductOpt.select(\'' + row.id + '\',\'' + row.name + '\');" > 选择 </a > ';
                    }
                },
                {
                    field: 'create_time',
                    title: '创建时间',
                    width: 60,
                    hidden: true
                }
            ]],
            onLoadSuccess : function(){
                $('.select-button').linkbutton({
                    iconCls : 'icon-tick',
                    plain : true
                });
            },
            onClickCell : function (index){
                inlibSearchProduct.datagrid('selectRow',index);
            }
        });
    }
});
inlibStaff.dialog({
    width: 550,
    height: 380,
    title: '选择经办人',
    iconCls: 'icon-zoom',
    modal: true,
    closed: true,
    maximizable: true,
    onOpen : function (){
        inlibSearchStaff.datagrid({
            url: ThinkPHP['MODULE'] + '/Staff/getList',
            fit: true,
            fitColumns: true,
            striped: true,
            rownumbers: true,
            border: false,
            pagination: true,
            pageSize: 10,
            pageList: [10, 20, 30, 40, 50],
            pageNumber: 1,
            sortName: 'create_time',
            sortOrder: 'DESC',
            toolbar : inlibToolStaff,
            columns: [[
                {
                    field : 'name',
                    title : '姓名',
                    width : 70,
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
                    field: 'select',
                    title: '选择经办人',
                    width: 60,
                    formatter: function (value, row) {
                        return '<a href="javascript:void(0)" class = "select-button" style = "height: 18px;margin-left:2px;" onclick="inlibStaffOpt.select(\'' + row.id + '\',\'' + row.name + '\');" > 选择 </a > ';
                    }
                },
                {
                    field: 'create_time',
                    title: '创建时间',
                    width: 60,
                    hidden: true
                }
            ]],
            onLoadSuccess : function(){
                $('.select-button').linkbutton({
                    iconCls : 'icon-tick',
                    plain : true
                });
            },
            onClickCell : function (index){
                inlibSearchStaff.datagrid('selectRow',index);
            }
        });
    }
});
//选择产品工具栏
inlibProductOpt = {
    search : function(){
        if(inlibToolProduct.form('validate')){
            inlibSearchProduct.datagrid('load',{
                keywords : $.trim(inlibSearchKeywordsProduct.textbox('getValue')),
            });
        }else{
            inlibSearchKeywordsProduct.textbox('textbox').select();
        }
    },
    reset : function(){
        inlibSearchKeywordsProduct.textbox('clear');
        this.search();
        inlibSearchProduct.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    select : function(id,name){
        inlibAddProductId.val(id);
        inlibAddProduct.textbox('setValue', name);
        inlibProduct.dialog('close');
    }
};
//选择j经办人工具栏
inlibStaffOpt = {
    search : function(){
        if(inlibToolStaff.form('validate')){
            inlibSearchStaff.datagrid('load',{
                keywords : $.trim(inlibSearchKeywordsStaff.textbox('getValue')),
            });
        }else{
            inlibSearchKeywordsStaff.textbox('textbox').select();
        }
    },
    reset : function(){
        inlibSearchKeywordsStaff.textbox('clear');
        this.search();
        inlibSearchStaff.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    select : function(id,name){
        inlibAddStaff.textbox('setValue', name);
        inlibStaff.dialog('close');
    }
};
//选择产品搜索关键词
inlibSearchKeywordsProduct.textbox({
    prompt : '产品名称|编号'
});
//选择经办人搜索关键词
inlibSearchKeywordsStaff.textbox({
    prompt : '姓名|工号|电话'
});
//新增入库数量
inlibAddNumber.numberbox({
    width : 240,
    height : 32,
    required : true,
    missingMessage : '请输入入库数量'
});
//新增入库经办人
inlibAddStaff.textbox({
   width : 240,
    height : 32,
    editable : false,
    required : true,
    icons : [{
        iconCls : 'icon-zoom',
        handler : function(){
            inlibStaff.dialog('open');
        }
    }],
    missingMessage : '请输入入库经办人',
    invalidMessage : '经办人不能为空'
});
//新增入库方式
inlibAddType.combobox({
    width : 200,
    height : 32,
    textField : 'text',
    valueField : 'id',
    panelHeight : 'auto',
    editable : false,
    data : [{
        id : '采购',
        text : '采购'
    },{
        id : '退货',
        text : '退货'
    }]
});
//新增入库说明
inlibAddDetails.textbox({
    width : 240,
    height : 32,
    prompt : '产品入库方式说明'
});
//搜索关键词
inlibSearchKeywords.textbox({
    width : 150,
    prompt : '产品名称|编号'
});
//搜索产品类型
inlibSearchType.combobox({
    width : 70,
    prompt : '类型',
    data : [
        {
            id : '男鞋',
            text : '男鞋'
        },{
            id : 'T恤',
            text : 'T恤'
        },{
            id : '男包',
            text : '男包'
        },{
            id : '裤子',
            text : '裤子'
        },{
            id : '运动装备',
            text : '运动装备'
        }
    ],
    editable : false,
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto'
});
//时间类型
inlibSearchDateType.combobox({
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
inlibDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (inlibSearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            inlibSearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
inlibDate.prompt = '起始时间';
inlibSearchDateFrom.datebox(inlibDate);
//结束时间
inlibDate.prompt = '结束时间';
inlibSearchDateTo.datebox(inlibDate);
//浏览器改变大小时触发
$(window).resize(function(){
    inlibAdd.dialog('center');
});
//扩展产品编号验证功能
$.extend($.fn.validatebox.defaults.rules, {
    sn : {
        validator: function(value){
            return /^[0-9]{5}$/.test(value);
        },
        message: '产品编号必须是5位'
    }
});