//初始化变量
var procure = $('#procure'),
    procureOpt;
    procureSearchKeywords  =   $('#procure-search-keywords'),
    procureSearchType = $('#procure-search-type'),
    procureSearchDateType  =   $('#procure-search-date-type'),
    procureSearchDateFrom  =   $('#procure-search-date-from'),
    procureSearchDateTo    =   $('#procure-search-date-to'),
    procureTool    =   $('#procure-tool');
    procure.datagrid({
    url : ThinkPHP['MODULE' ]+ '/procure/getList',
    fit : true,
    fitColumns : true,
    striped : true,
    border : false,
    pagination : true,
    queryParams :  {
        procure : true
     },
    pageSize : 20,
    pageList : [10,20,30,40,50],
    pageNumber : 1,
    sortName : 'create_time',
    sortOrder : 'DESC',
    toolbar : '#procure-tool',
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
                return '<a href="javascript:void(0)" class="procure-details" style="height:18px;margin-left:2px;" onclick="procureOpt.details('+ row.id +');"></a>';
            }
        }
    ]],
    onLoadSuccess : function(){
        $('.procure-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function(index,field){
        if(field == 'details'){
            $('#procure').datagrid('selectRow',index);
        }
    }
});
//主工具栏操作
procureOpt = {
    reload : function () {
        procure.datagrid('reload');
    },
    search : function(){
        if(procureTool.form('validate')){
            procure.datagrid('load',{
                keywords : $.trim(procureSearchKeywords.textbox('getValue')),
                type : procureSearchType.combobox('getValue'),
                dateType : procureSearchDateType.textbox('getValue'),
                dateFrom : procureSearchDateFrom.textbox('getValue'),
                dateTo : procureSearchDateTo.textbox('getValue')
            });
        }else{
            procureSearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        procureSearchKeywords.textbox('clear');
        procureSearchType.combobox('clear');
        procureSearchDateType.combobox('clear').combobox('disableValidation');
        procureSearchDateFrom.datebox('clear');
        procureSearchDateTo.datebox('clear');
        this.search();
        procure.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    details : function(id){
        details.dialog('open').dialog('setTitle','入库产品详情').dialog('refresh',ThinkPHP['MODULE'] + '/Inlib/getDetails?id=' + id);
    }
};

//搜索关键词
procureSearchKeywords.textbox({
    width : 150,
    prompt : '产品名称|编号'
});
//搜索产品类型
procureSearchType.combobox({
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
procureSearchDateType.combobox({
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
procureDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (procureSearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            procureSearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
procureDate.prompt = '起始时间';
procureSearchDateFrom.datebox(procureDate);
//结束时间
procureDate.prompt = '结束时间';
procureSearchDateTo.datebox(procureDate);