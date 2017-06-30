//初始化变量
var product = $('#product'),
    productAdd = $('#product-add'),
    productAddName = $('#product-add-name'),
    productAddSn  =   $('#product-add-sn'),
    productAddType =   $('#product-add-type'),
    productAddProPrice  =   $('#product-add-pro-price'),
    productAddSellPrice  =   $('#product-add-sell-price'),
    productAddInventoryAlarm  =   $('#product-add-inventory-alarm'),
    productAddUnit  =   $('#product-add-unit'),
    productAddDetails  =   $('#product-add-details'),
    productEdit  =  $('#product-edit'),
    productEditId  =  $('#product-edit-id'),
    productEditName  =  $('#product-edit-name'),
    productEditSn = $('#product-edit-sn'),
    productEditType =$('#product-edit-type'),
    productEditProPrice = $('#product-edit-pro-price'),
    productEditSellPrice  = $('#product-edit-sell-price'),
    productEditInventoryAlarm = $('#product-edit-inventory-alarm'),
    productEditUnit = $('#product-edit-unit'),
    productEdit = $('#product-edit'),
    productEditName = $('#product-edit-name'),
    productEditId = $('#product-edit-id'),
    productEditDetails = $('#product-edit-details'),
    productSearchKeywords  =   $('#product-search-keywords'),
    productSearchType = $('#product-search-type'),
    productSearchDateType  =   $('#product-search-date-type'),
    productSearchDateFrom  =   $('#product-search-date-from'),
    productSearchDateTo    =   $('#product-search-date-to'),
    productTool    =   $('#product-tool'),
    productOpt;
product.datagrid({
    url : ThinkPHP['MODULE' ]+ '/product/getList',
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
    toolbar : '#product-tool',
    columns : [[
        {
            field : 'id',
            title : '编号',
            width : 100,
            checkbox : true
        },
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
        },
        {
            field : 'details',
            title : '详情',
            width : 40,
            fixed : true,
            formatter : function(value,row){
                return '<a href="javascript:void(0)" class="product-details" style="height:18px;margin-left:2px;" onclick="productOpt.details('+ row.id +');"></a>';
            }
        }
    ]],
    onLoadSuccess : function(){
        $('.product-details').linkbutton({
            iconCls : 'icon-text',
            plain : true
        });
    },
    onClickCell : function(index,field){
        if(field == 'details'){
            $('#product').datagrid('selectRow',index);
        }
    }
});
//主工具栏操作
productOpt = {
    add : function(){
        productAdd.dialog('open');
    },
    edit : function(){
        var rows = product.datagrid('getSelections');
        if(rows.length == 1){
            productEdit.dialog('open');
            $.ajax({
                url : ThinkPHP['MODULE'] + '/product/getOne',
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
                        productEdit.form('load', {
                            id : data.id,
                            name : data.name,
                            sn : data.sn,
                            type : data.type,
                            pro_price : data.pro_price,
                            sell_price : data.sell_price,
                            unit : data.unit,
                            inventory_alarm : data.inventory_alarm
                        });
                        PRODUCT_EDIT.html(data.details);
                    }else{
                        $.messager.alert('警告操作', '没有获取到相应数据！', 'warning');
                    }
                    productEditName.textbox('textbox').select();
                }
            });
        }else {
            $.messager.alert('警告操作', '编辑记录必须选定一条数据！', 'warning');
        }
    },
    remove : function() {
        var rows = product.datagrid('getSelections');
        if(rows.length > 0){
            $.messager.confirm('确认操作','您真的要删除所选的<strong>' + rows.length + '</strong>条记录吗？',function(flag){
                if(flag){
                    var ids = [];
                    for(var i=0;i<rows.length;i++){
                        ids.push(rows[i].id);
                    }
                }
                $.ajax({
                    url : ThinkPHP['MODULE'] + '/product/remove',
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
                            product.datagrid('loaded');
                            product.datagrid('reload');
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
        product.datagrid('unselectAll');
    },
    reload : function () {
        product.datagrid('reload');
    },
    search : function(){
        if(productTool.form('validate')){
            product.datagrid('load',{
                keywords : $.trim(productSearchKeywords.textbox('getValue')),
                type : productSearchType.combobox('getValue'),
                dateType : productSearchDateType.textbox('getValue'),
                dateFrom : productSearchDateFrom.textbox('getValue'),
                dateTo : productSearchDateTo.textbox('getValue')
            });
        }else{
            productSearchDateType.combobox('showPanel');
        }
    },
    reset : function(){
        productSearchKeywords.textbox('clear');
        productSearchType.combobox('clear');
        productSearchDateType.combobox('clear').combobox('disableValidation');
        productSearchDateFrom.datebox('clear');
        productSearchDateTo.datebox('clear');
        this.search();
        product.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'desc'
        });
    },
    details : function(id){
        details.dialog('open').
        dialog('setTitle','产品信息详情').
        dialog('refresh',ThinkPHP['MODULE'] + '/product/getDetails?id=' + id);

    }
};
//新增面板
productAdd.dialog({
    width : 780,
    height : 506,
    title : '新增产品',
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
                PRODUCT_ADD.sync();
                //验证通过后，ajax处理
                if(productAdd.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/product/register',
                        type : 'post',
                        data : {
                            name : productAddName.val(),
                            sn : productAddSn.val(),
                            type : productAddType.combobox('getValue'),
                            pro_price : productAddProPrice.val(),
                            sell_price : productAddSellPrice.val(),
                            unit : productAddUnit.val(),
                            inventory_alarm : productAddInventoryAlarm.val(),
                            details : $.trim(productAddDetails.val())
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
                                productAdd.dialog('close');
                                product.datagrid('load');
                            }else if(data == -1) {
                                $.messager.alert('添加失败！','职位名称已存在！','warning',function(){
                                    productAddName.textbox('textbox').select();
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
                productAdd.dialog('close');
            }
        }
    ],
    onOpen : function(){
        PRODUCT_ADD.html('');
    },
    onClose : function(){
        productAdd.form('reset');
        productAdd.dialog('center');
        PRODUCT_ADD.html('');
    }
});
//修改面板
productEdit.dialog({
    width : 780,
    height : 506,
    title : '修改产品',
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
                PRODUCT_EDIT.sync();
                //通过验证后，ajax处理
                if(productEdit.form('validate')){
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/product/update',
                        type : 'post',
                        data : {
                            id : productEditId.val(),
                            type : productEditType.combobox('getValue'),
                            pro_price : $.trim(productEditProPrice.val()),
                            sell_price : $.trim(productEditSellPrice.val()),
                            unit : $.trim(productEditUnit.val()),
                            inventory_alarm : $.trim(productEditInventoryAlarm.val()),
                            details : productEditDetails.val()
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
                                productEdit.dialog('close');
                                product.datagrid('reload');
                            }else if( data == 0){
                                $.messager.alert('修改失败！','尚未修改字段或未知错误！','warning',function(){
                                    productEditName.textbox('textbox').select();
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
                productEdit.dialog('close');
            }
        }
    ],
    onOpen : function(){
        PRODUCT_EDIT.html('');
    },
    onClose : function(){
        productEdit.form('reset');
        productEdit.dialog('center');
        PRODUCT_EDIT.html('');
    }
});
//新增名称
productAddName.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入产品名称',
    invalidMessage : '产品名称2-20 位'
});
//修改名称
productEditName.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    disabled : true,
    missingMessage : '请输入产品名称',
    invalidMessage : '产品名称2-20 位'
});
//产品编号
productAddSn.textbox({
    width : 240,
    height : 32,
    required : true,
    validType : 'sn'
});
productEditSn.textbox({
    width : 240,
    height : 32,
    required : true,
    disabled : true
});
//产品类型
productAddType.combobox({
    width : 140,
    height : 32,
    panelHeight : 'auto',
    data : [{
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
    }],
    editable : false,
    valueField : 'id',
    textField : 'text'
});
productEditType.combobox({
    width : 140,
    height : 32,
    panelHeight : 'auto',
    data : [{
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
    }],
    editable : false,
    valueField : 'id',
    textField : 'text'
});
//采购价格
productAddProPrice.numberbox({
    width : 140,
    height : 32
});
productEditProPrice.numberbox({
    width : 140,
    height : 32
});
//销售价格
productAddSellPrice.numberbox({
    width : 140,
    height : 32
});
productEditSellPrice.numberbox({
    width : 140,
    height : 32
});
//库存警报
productAddInventoryAlarm.numberbox({
    width : 140,
    height : 32,
    value : 10
});
productEditInventoryAlarm.numberbox({
    width : 140,
    height : 32
});
//计量单位
productAddUnit.textbox({
    width : 140,
    height : 32
});
productEditUnit.textbox({
    width : 140,
    height : 32
});
//加载新增编辑器
PRODUCT_ADD = KindEditor.create('#product-add-details', {
    width : '94%',
    height : '200px',
    resizeType : 0,
    items : editor_tool
});
//加载修改编辑器
PRODUCT_EDIT = KindEditor.create('#product-edit-details', {
    width : '94%',
    height : '200px',
    resizeType : 0,
    items : editor_tool
});

//搜索关键词
productSearchKeywords.textbox({
    width : 150,
    prompt : '产品名称|编号'
});
//搜索产品类型
productSearchType.combobox({
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
productSearchDateType.combobox({
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
productDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if
        (productSearchDateType.combobox('enableValidation').combobox('isValid')
            == false)
        {
            productSearchDateType.combobox('showPanel');
        }
    }
};
//起始时间
productDate.prompt = '起始时间';
productSearchDateFrom.datebox(productDate);
//结束时间
productDate.prompt = '结束时间';
productSearchDateTo.datebox(productDate);
//浏览器改变大小时触发
$(window).resize(function(){
    productAdd.dialog('center');
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