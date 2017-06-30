<?php
namespace Home\Model;
use Think\Model;

class ClientModel extends Model{
    //自动验证
    protected $_validate = array(

 );
    //获取客户信息列表
    public  function getList($keywords,$source,$dateType,$dateFrom,$dateTo,$page,$rows,$sort,$order){
        $map = array();
        if($keywords){
            $keywords_map['company'] = array('like','%'.$keywords.'%');
            $keywords_map['name'] = array('like','%'.$keywords.'%');
            $keywords_map['tel'] = array('like','%'.$keywords.'%');
            $keywords_map['_logic'] = 'OR';
        }
        if($keywords_map){
            $map['_complex'] = $keywords_map;
        }
        if($source){
            $map['source'] = $source;
        }
        if($dateTo && $dateFrom){
            $map["$dateType"] = array(array('egt',date($dateFrom)),array('elt',date($dateTo)));
        }else if($dateFrom){
            $map["$dateType"] = array('egt',date($dateFrom));
        }else if($dateTo){
            $map["$dateType"] = array('elt',date($dateTo));
        }
        $object = $this->field('id,company,name,tel,source,enter,create_time')
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
    public function register($company,$name,$tel,$source){
        $addData = array(
            'company'=>$company,
            'name'=>$name,
            'tel'=>$tel,
            'source'=>$source,
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
        $object = $this->field('id,company,name,tel,source,enter,create_time')
            ->where($map)
            ->find();
        return $object;
    }
    //修改客户信息
    public function update($id,$name,$tel,$source){
        $updateData = [
            'id'=>$id,
            'name'=>$name,
            'tel'=>$tel,
            'source'=>$source,
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