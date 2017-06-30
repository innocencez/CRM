<?php
namespace Home\Model;
use Think\Model;

class InlibModel extends Model{
    //自动验证
    protected $_validate = array(

 );
    //获取产品列表
    public  function getList($keywords,$type,$dateType,$dateFrom,$dateTo,$page,$rows,$sort,$order,$procure = false){
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
        if($procure){
            $map['mode'] = '采购';
        }
        $object = $this->field('crm_inlib.id,crm_inlib.number,crm_inlib.staff_name,crm_inlib.mode,crm_inlib.mode_explain,crm_inlib.enter,crm_inlib.create_time,
                                                crm_product.name,crm_product.sn,crm_product.type,crm_product.pro_price,crm_product.sell_price')
                                ->join('crm_product on crm_inlib.product_id = crm_product.id','left')
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
    //新增入库
    public function register($product_id,$number,$staff_name,$mode,$mode_explain){
        $addData = array(
            'product_id'=>$product_id,
            'number'=>$number,
            'staff_name'=>$staff_name,
            'mode'=>$mode,
            'mode_explain'=>$mode_explain,
            'enter' => session('admin')['accounts'],
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $id = $this->add($addData);
            /*修改产品表的库存量*/
            if($id){
                $map['id'] = $product_id;
                M('product')->where($map)->save(array(
                    'inventory'=>array('exp','inventory + ' . $number),
                    'inventory_in'=>array('exp','inventory_in + ' . $number)
                ));
            }
            return $id ? $id : 0;
        }else{
            return $this->getError();
        }
    }
    //获取单条入库记录
    public function getDetails($id){
        $map = array(
            'crm_inlib.id'=>$id
        );
        $object = $this->field('crm_inlib.number,crm_inlib.staff_name,crm_inlib.mode,crm_inlib.mode_explain,crm_inlib.enter,
                                                crm_product.name,crm_product.sn,crm_product.type,crm_product.pro_price')
            ->join('crm_product on crm_inlib.product_id = crm_product.id','left')
            ->where($map)
            ->find();
        return $object;
    }
}