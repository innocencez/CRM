//初始化变量
var payment = $('#payment'),
    paymentOpt;
    paymentSearchKeywords  =   $('#payment-search-keywords'),
    paymentSearchType = $('#payment-search-type'),
    paymentSearchDateType  =   $('#payment-search-date-type'),
    paymentSearchDateFrom  =   $('#payment-search-date-from'),
    paymentSearchDateTo    =   $('#payment-search-date-to'),
    paymentTool    =   $('#payment-tool');
    payment.datagrid({
    url : ThinkPHP['MODULE' ]+ '/payment/getList',
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
    toolbar : '#payment-tool',
    columns : [[
        {
            field : 'id',
            title : '编号',
            width : 100,
            checkbox : true,
            hidden : true
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
            title : '采购价格',
            width : 100,
        },
        {
            field : 'sell_price',
            title : '销售价格',
            hidden : true
        },
        {
            field : 'number',
            title : '入库数量',
            width : 50,
            sortable : true
        },
        {
          field : 'total',
          title : '支出费用',
          width : 60,
          formatter : function(value,row) {
            if(row.mode == '采购'){
                return (row.number * row.pro_price).toFixed(2);
            }else{
                return (row.number * row.sell_price).toFixed(2);
            }
          }
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
                return '<a href="javascript:void(0)" class="payment-details" style="height:18px;margin-left:2px;" onclick="paymentOpt.details('+ row.id +');"></a>';
            }
        }
    ]],
    onLoadSuccess : function(){
        $('.payment-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function(index,field){
        if(field == 'details'){
            $('#payment').datagrid('selectRow',index);
        }
    }
});
//主工具栏操作
paymentOpt = {
    reload : function () {
        payment.datagrid('reload');
    },
    search : function(){
        if(paymentTool.form('validate')){
            payment.datagrid('load',{
                keywords : $.trim(paymentSearchKeywords.textbox('getValue')),
                type : paymentSearchType.combobox('getValue'),
                dateType : paymentSearchDateType.textbox('getValue'),
                dateFrom : paymentSearchDateFrom.textbox('getValue'),
                dateTo : paymentSearchDateTo.textbox('getValue')
            });
        }else{
            paymentSearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        paymentSearchKeywords.textbox('clear');
        paymentSearchType.combobox('clear');
        paymentSearchDateType.combobox('clear').combobox('disableValidation');
        paymentSearchDateFrom.datebox('clear');
        paymentSearchDateTo.datebox('clear');
        this.search();
        payment.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    details : function(id){
        details.dialog('open').dialog('setTitle','入库产品详情').dialog('refresh',ThinkPHP['MODULE'] + '/Inlib/getDetails?id=' + id);
    }
};

//搜索关键词
paymentSearchKeywords.textbox({
    width : 150,
    prompt : '产品名称|编号'
});
//搜索产品类型
paymentSearchType.combobox({
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
paymentSearchDateType.combobox({
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
paymentDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (paymentSearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            paymentSearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
paymentDate.prompt = '起始时间';
paymentSearchDateFrom.datebox(paymentDate);
//结束时间
paymentDate.prompt = '结束时间';
paymentSearchDateTo.datebox(paymentDate);