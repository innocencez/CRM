<?php
namespace Home\Model;
use Think\Model;

class DocumentaryModel extends Model{
    //自动验证
    protected $_validate = array(

 );
    //获取客户信息列表
    public  function getList($keywords,$way,$evolve,$dateType,$dateFrom,$dateTo,$page,$rows,$sort,$order){
        $map = array();
        if($keywords){
            $keywords_map['client_company'] = array('like','%'.$keywords.'%');
            $keywords_map['staff_name'] = array('like','%'.$keywords.'%');
            $keywords_map['_logic'] = 'OR';
        }
        if($keywords_map){
            $map['_complex'] = $keywords_map;
        }
        if($way){
            $map['way'] = $way;
        }
        if($evolve){
            $map['evolve'] = $evolve;
        }
        if($dateTo && $dateFrom){
            $map["$dateType"] = array(array('egt',date($dateFrom)),array('elt',date($dateTo)));
        }else if($dateFrom){
            $map["$dateType"] = array('egt',date($dateFrom));
        }else if($dateTo){
            $map["$dateType"] = array('elt',date($dateTo));
        }
        $object = $this->field('id,sn,title,client_company,way,evolve,staff_name,remark,enter,create_time')
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
    public function register($title,$client_company,$way,$evolve,$staff_name,$remark,$client_id,$staff_id){
        $addData = array(
            'sn'=>get_time_string(),
            'title'=>$title,
            'client_company'=>$client_company,
            'way'=>$way,
            'evolve'=>$evolve,
            'staff_name'=>$staff_name,
            'remark'=>$remark,
            'client_id'=>$client_id,
            'staff_id'=>$staff_id,
            'enter' => session('admin')['accounts'],
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $id = $this->add($addData);
            return $id ? $id : 0;
        }else{
            return $this->getError();
        }
    }
    //获取单条客户信息
    public function getOne($id){
        $map = array(
            'id'=>$id
        );
        $object = $this->field('id,sn,title,client_company,way,evolve,staff_name,remark,client_id,staff_id,enter,create_time')
            ->where($map)
            ->find();
        return $object;
    }
    //修改客户信息
    public function update($id,$client_id,$staff_id,$title,$client_company,$way,$evolve,$staff_name,$remark){
        $updateData = [
            'id'=>$id,
            'client_id'=>$client_id,
            'staff_id'=>$staff_id,
            'title'=>$title,
            'client_company'=>$client_company,
            'way'=>$way,
            'evolve'=>$evolve,
            'staff_name'=>$staff_name,
            'remark'=>$remark,
            'enter'=>session('admin')['accounts']
        ];
        if($this->create($updateData)){
            $affectRow = $this->save($updateData);
            return $affectRow;
        }else{
            return $this->getError();
        }
    }
    //根据id删除记录
    public function remove($ids){
        $affectRow = $this->delete($ids);
        return $affectRow;
    }
}