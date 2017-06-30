<?php
namespace Home\Model;
use Think\Model;

class ProductModel extends Model{
    //自动验证
    protected $_validate = array(

    );
    //获取产品列表
    public  function getList($keywords,$type,$dateType,$dateFrom,$dateTo,$page,$rows,$sort,$order,$alarm){
        $map = array();
        if($keywords){
            $keywords_map['name'] = array('like','%'.$keywords.'%');
            $keywords_map['sn'] = array('like','%'.$keywords.'%');
            $keywords_map['_logic'] = 'OR';
        }
        if($keywords_map){
            $map['_complex'] = $keywords_map;
        }
        if($type){
            $map['type'] = $type;
        }
        if($dateTo && $dateFrom){
            $map["$dateType"] = array(array('egt',date($dateFrom)),array('elt',date($dateTo)));
        }else if($dateFrom){
            $map["$dateType"] = array('egt',date($dateFrom));
        }else if($dateTo){
            $map["$dateType"] = array('elt',date($dateTo));
        }
        //只显示低于库存的警报
        if($alarm){
            $map['_string'] = '`inventory` <= `inventory_alarm`';
        }
        $object = $this->field('id,name,sn,type,pro_price,sell_price,unit,inventory,create_time')
                               ->where($map)
                               ->order(array($sort=>$order))
                               ->limit($rows*($page-1),$rows)
                               ->select();
        //echo $this->getLastSql();
        return array(
            'total'=>$this->count(),
            'rows'=>$object ? $object : '',
        );
    }
    //获取ajax职位列表
    public function getAjaxList(){
        $object = $this->field('name')->select();
        return $object;
    }
    //添加职位
    public function register($name,$sn,$type,$pro_price,$sell_price,$unit,$inventory_alarm,$details){
        $addData = array(
            'name'=>$name,
            'sn'=>$sn,
            'type'=>$type,
            'pro_price'=>$pro_price,
            'sell_price'=>$sell_price,
            'unit'=>$unit,
            'inventory_alarm'=>$inventory_alarm,
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $id = $this->add($addData);

            if($details){
                $addExtendData = array(
                    'product_id'=>$id,
                    'details'=>$details
                );
                M('productExtend')->add($addExtendData);
            }
            return $id ? $id : 0;
        }else{
            if($this->getError() == '职位名称已存在'){
                return -1;
            }
            return $this->getError();
        }
    }
    //获取一条数据
    public function  getOne($id){
        $map = array(
            'crm_product.id'=>$id
        );
        $object = $this->field('crm_product.id,crm_product.name,crm_product.sn,crm_product.type,crm_product.pro_price,crm_product.sell_price,
                                                crm_product.unit,crm_product.inventory,crm_product.inventory_alarm,crm_product_extend.details')
                                ->join('crm_product_extend on crm_product.id = crm_product_extend.product_id','left')
                                ->where($map)
                                ->find();
        $object['details'] = htmlspecialchars_decode($object['details']);
        return $object;
    }
    //根据id修改一条记录
    public function update($id,$type,$pro_price,$sell_price,$unit,$inventory,$inventory_alarm,$details){
        $updateData= array(
            'id'=>$id,
            'type'=>$type,
            'pro_price'=>$pro_price,
            'sell_price'=>$sell_price,
            'unit'=>$unit,
            'inventory'=>$inventory,
            'inventory_alarm'=>$inventory_alarm
        );
        if($this->create($updateData)){
            $affectRow = $this->save($updateData);
            if($details){
                $updateExtendData = array(
                    'details'=>$details
                );
                $map['product_id'] = $id;
                $extendAffectRow = M('productExtend')->where($map)->save($updateExtendData);
            }
            return $affectRow || $extendAffectRow;
        }else{
            return $this->getError();
        }
    }
    //根据id删除记录
    public function remove($ids){
        return $this->delete($ids);
    }
    //获取单个产品详情
    public function getDetails($id){
        $object = $this->getOne($id);
        $map['product_id'] = $object['id'];
        $object['product'] = M('productExtend')->field('details')->where($map)->find();
        return $object;
    }
}