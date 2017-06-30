//初始化变量
var order = $('#order'),
        orderSearchKeywords = $('#order-search-keywords'),
        orderSearchDateType = $('#order-search-date-type'),
        orderSearchDateFrom = $('#order-search-date-from'),
        orderSearchDateTo = $('#order-search-date-to'),
        orderSearchPayState = $('#order-search-pay-state'),
        orderTool = $('#order-tool'),
        orderAdd = $('#order-add'),
        orderAddTitle = $('#order-add-title'),
        orderAddDocumentary = $('#order-add-documentary'),
        orderAddDocumentaryId = $('#order-add-documentary-id'),
        orderAddCost = $('#order-add-cost'),
        orderAddDetails = $('#order-add-details'),
        orderDocumentary = $('#order-documentary'),
        orderSearchDocumentary = $('#order-search-documentary'),
        orderToolDocumentary = $('#order-tool-documentary'),
        orderSearchKeywordsDocumentary = $('#order-search-keywords-documentary'),
        orderDocumentaryOpt,
        orderOpt;
order.datagrid({
    url : ThinkPHP['MODULE' ]+ '/order/getList',
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
    toolbar : '#order-tool',
    columns : [[
        {
            field : 'id',
            title : '编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'sn',
            title : '订单编号',
            width : 100,
        },
        {
            field : 'title',
            title : '订单名称',
            width : 100,
        },
        {
            field : 'client_company',
            title : '所属公司',
            width : 100,
        },
        {
            field : 'cost',
            title : '订单金额',
            width : 50,
        },
        {
            field : 'pay_state',
            title : '支付状态',
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
        $('.order-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function(index,field){
        if(field == 'details'){
            $('#order').datagrid('selectRow',index);
        }
    }
});
orderOpt = {
    add : function(){
      orderAdd.dialog('open');
    },
    search : function(){
        if(orderTool.form('validate')){
            order.datagrid('load',{
                keywords : $.trim(orderSearchKeywords.val()),
                dateType : orderSearchDateType.combobox('getValue'),
                dateFrom : orderSearchDateFrom.datebox('getValue'),
                dateTo : orderSearchDateTo.datebox('getValue'),
                pay_state : orderSearchPayState.combobox('getValue')
            });
        }else{
            orderSearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        orderSearchKeywords.textbox('clear');
        orderSearchDateType.combobox('clear').combobox('disableValidation');
        orderSearchDateFrom.datebox('clear');
        orderSearchDateTo.datebox('clear');
        orderSearchPayState.combobox('clear');
        this.search();
        order.datagrid('sort',{
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    reload : function(){
        order.datagrid('reload');
    },
    redo : function(){
        order.datagrid('unselectAll');
    }
}
orderAdd.dialog({
    width : 780 ,
    height : 400,
    title : '添加订单',
    iconCls : 'icon-add',
    closed : true,
    modal : true,
    buttons : [
        {
            text : '保存',
            iconCls : 'icon-accept',
            size : 'large',
            handler : function(){
                //设置同步，否则接收不到值
                ORDER_ADD.sync();
                if(orderAdd.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/order/register',
                        type : 'post',
                        data : {
                            title : $.trim(orderAddTitle.textbox('getValue')),
                            documentary_id : orderAddDocumentaryId.val(),
                            cost : orderAddCost.numberbox('getValue'),
                            pay_state : '未支付',
                            details : $.trim(orderAddDetails.val())
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
                                orderAdd.dialog('close');
                                order.datagrid('load');
                            }else if(data == 0){
                                $.messager.alert('新增失败！','未知错误！','warning',function(){
                                    orderAddTitle.textbox('textbox').select();
                                });
                            }
                        }
                    });
                }
            }
        },{
            text : '取消',
            iconCls : 'icon-cross',
            size : 'large',
            handler : function(){
                orderAdd.dialog('close');
            }
        }
    ],
    onOpen : function(){
        ORDER_ADD.html('');
    },
    onClose : function(){
        orderAdd.form('reset');
        orderAdd.dialog('center');
        ORDER_ADD.html('');
    }
});
//订单产品列表
$('#order-product-list').datagrid({
    width : '95%',
    columns:[[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            hidden : true
        },
        {
            field : 'sn',
            title : '产品编号',
            width : 100
        },
        {
            field : 'name',
            title : '产品名称',
            width : 130
        },
        {
            field : 'unit',
            title : '计量单位',
            width : 80
        },
        {
            field : 'sell_price',
            title : '出售价',
            width : 80
        },
        {
            field : 'number',
            title : '数量',
            width : 80
        },
        {
            field : 'opt',
            title : '操作',
            width : 40,
            formatter : function (value, row, index) {
                return '<a href="javascript:void(0)" style="height:18px;margin-left:2px;"><img src="'+ThinkPHP['EASYUI']+'/themes/icons/remove.png" style="margin-top: 5px;margin-left:4px;"></a>';
            }
        }
    ]],
    onClickCell : function(index){
        $('#order-product-list').datagrid('selectRow',index);
    }
});
$('#order-product-list').datagrid('appendRow',{
    id : 1,
    sn : 111,
    name : 111,
    unit : 111,
    sell_price : 111,
    number : 111
});
/*浏览器改变大小时对话框居中*/
$(window).resize(function(){
    orderAdd.dialog('center');
});
/*添加订单选择跟单数据列表*/
orderDocumentary.dialog({
    width : 650 ,
    height : 380,
    closed : true,
    modal : true,
    maximizable : true,
    iconCls : 'icon-zoom',
    title : '选择跟单',
    onOpen : function(){
        orderSearchDocumentary.datagrid({
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
            toolbar : orderToolDocumentary,
            columns : [[
                {
                    field : 'id',
                    title : 'ID',
                    hidden : true
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
                    field : 'evolve',
                    title : '进展阶段',
                    width : 80,
                },
                {
                    field : 'create_time',
                    title : '创建时间',
                    width : 100,
                    sortable : true
                },
                {
                    field : 'select',
                    title : '选择跟单',
                    width : 80,
                    formatter: function (value, row) {
                        return '<a href="javascript:void(0)" class = "select-button" style = "height: 18px;margin-left:2px;" onclick="orderDocumentaryOpt.select(\'' + row.id + '\',\'' + row.title + '\');" > 选择 </a > ';
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

            }
        });
    }
});
orderDocumentaryOpt = {
    search : function(){
        if(orderToolDocumentary.form('validate')){
            orderSearchDocumentary.datagrid('load',{
                keywords : $.trim(orderSearchKeywordsDocumentary.val())
            });
        }
    },
    reset : function(){
        orderSearchKeywordsDocumentary.textbox('clear');
        this.search();
        orderSearchDocumentary.datagrid('sort',{
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    select : function(id,title){
        orderAddDocumentary.textbox('setValue',title);
        orderAddDocumentaryId.val(id);
        orderDocumentary.dialog('close');
    }
}
/*表单区域*/
/*订单产品列表*/
$('#order-add-product-button').linkbutton({
    iconCls : 'icon-add',
    onClick : function(){
        //创建订单界面
        $('#order-product').dialog('open');
    }
});
//加载新增编辑器
ORDER_ADD = KindEditor.create('#order-add-details', {
    width : '94%',
    height : '200px',
    resizeType : 0,
    items : editor_tool
});
orderSearchKeywordsDocumentary.textbox({
    prompt : '公司名称|跟单员',
    width : 150,
    height : 25,
    missingMessage : '请输出关键词',
    invalidMessage : '搜索关键词不能为空'
});
orderAddTitle.textbox({
    width : 240 ,
    height : 32,
    required : true,
    validType : 'length[2,50]',
    missingMessage : '请输入订单标题',
    invalidMessage : '订单标题2-50位'
});
orderAddDocumentary.textbox({
    width : 240,
    height : 32,
    required : true,
    editable : false,
    icons : [{
        iconCls: 'icon-zoom',
        handler : function(){
            orderDocumentary.dialog('open');
        }
    }],
    missingMessage : '请输入关联跟单',
    invalidMessage : '关联跟单不得为空'
});
orderAddCost.numberbox({
    width : 240,
    height : 32,
    required : true,
    missingMessage : '请输入订单金额',
    invalidMessage : '订单金额不得为空'
});
orderSearchKeywords.textbox({
    prompt : '订单编号|名称',
    width : 150
});
orderSearchPayState.combobox({
    width : 100,
    prompt : '支付状态',
    data : [{
        id : '已支付',
        text : '已支付'
    },{
        id : '未支付',
        text : '未支付'
    }],
    textField : 'text',
    valueField : 'id',
    panelHeight : 'auto',
    editable : false
});
//时间类型
orderSearchDateType.combobox({
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
orderDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (orderSearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            orderSearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
orderDate.prompt = '起始时间';
orderSearchDateFrom.datebox(orderDate);
//结束时间
orderDate.prompt = '结束时间';
orderSearchDateTo.datebox(orderDate);


