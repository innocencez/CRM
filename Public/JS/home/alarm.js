//初始化变量
var alarm = $('#alarm'),
    alarmSearchKeywords  =   $('#alarm-search-keywords'),
    alarmSearchType = $('#alarm-search-type'),
    alarmSearchDateType  =   $('#alarm-search-date-type'),
    alarmSearchDateFrom  =   $('#alarm-search-date-from'),
    alarmSearchDateTo    =   $('#alarm-search-date-to'),
    alarmTool    =   $('#alarm-tool'),
    alarmOpt;
alarm.datagrid({
    url : ThinkPHP['MODULE' ]+ '/alarm/getList',
    queryParams : {
        alarm : true
    },
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
    toolbar : '#alarm-tool',
    columns : [[
        {
            field : 'name',
            title : '产品名称',
            width : 100,
        },
        {
            field : 'sn',
            title : '产品编号',
            width : 50,
            sortable : true
        },
        {
            field : 'type',
            title : '类型',
            width : 50,
        },
        {
            field : 'pro_price',
            title : '采购价格',
            width : 50,
            sortable : true
        },
        {
            field : 'sell_price',
            title : '销售价格',
            width : 50,
            sortable : true
        },
        {
            field : 'unit',
            title : '单位',
            width : 50,
        },
        {
          field : 'inventory',
            title : '库存量',
            width : 50
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable : true
        }
    ]],
    onLoadSuccess : function(){
        $('.alarm-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function(index,field){
        if(field == 'details'){
            $('#alarm').datagrid('selectRow',index);
        }
    }
});
//主工具栏操作
alarmOpt = {
    //小功能
    reload : function () {
        alarm.datagrid('reload');
    },
    search : function(){
        if(alarmTool.form('validate')){
            alarm.datagrid('load',{
                keywords : $.trim(alarmSearchKeywords.textbox('getValue')),
                type : alarmSearchType.combobox('getValue'),
                dateType : alarmSearchDateType.textbox('getValue'),
                dateFrom : alarmSearchDateFrom.textbox('getValue'),
                dateTo : alarmSearchDateTo.textbox('getValue'),
                alarm : true,
            });
        }else{
            alarmSearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        alarmSearchKeywords.textbox('clear');
        alarmSearchType.combobox('clear');
        alarmSearchDateType.combobox('clear').combobox('disableValidation');
        alarmSearchDateFrom.datebox('clear');
        alarmSearchDateTo.datebox('clear');
        this.search();
        alarm.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    }
};

//搜索关键词
alarmSearchKeywords.textbox({
    width : 150,
    prompt : '产品名称|编号'
});
//搜索产品类型
alarmSearchType.combobox({
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
alarmSearchDateType.combobox({
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
alarmDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (alarmSearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            alarmSearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
alarmDate.prompt = '起始时间';
alarmSearchDateFrom.datebox(alarmDate);
//结束时间
alarmDate.prompt = '结束时间';
alarmSearchDateTo.datebox(alarmDate);
//浏览器改变大小时触发
$(window).resize(function(){
    alarmAdd.dialog('center');
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