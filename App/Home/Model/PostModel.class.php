<?php
namespace Home\Model;
use Think\Model;

class PostModel extends Model{
    //职位信息自动验证
    protected $_validate = array(
        //职位名称长度不合法
        array('name','2,20','账号长度不合法',self::EXISTS_VALIDATE,'length',self::MODEL_INSERT),
        //职位名称已存在
        array('name','','职位名称已存在',self::EXISTS_VALIDATE,'unique',self::MODEL_BOTH),
    );
    //获取职位列表
    public  function getList($keywords,$dateType,$dateFrom,$dateTo,$page,$rows,$sort,$order){
        $map = array();
        if($keywords){
            $map['name'] = array('like','%'.$keywords.'%');
        }
        if($dateTo && $dateFrom){
            $map["$dateType"] = array(array('egt',date($dateFrom)),array('elt',date($dateTo)));
        }else if($dateFrom){
            $map["$dateType"] = array('egt',date($dateFrom));
        }else if($dateTo){
            $map["$dateType"] = array('elt',date($dateTo));
        }
        $object = $this->field('id,name,create_time')
                               ->where($map)
                               ->order(array($sort=>$order))
                               ->limit($rows*($page-1),$rows)
                               ->select();
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
    public function register($name){
        $addData = array(
            'name'=>$name,
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $id = $this->add($addData);
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
            'id'=>$id
        );
        return $this->field('id,name')->where($map)->find();
    }
    //根据id修改一条记录
    public function update($id,$name){
        $updateData= array(
            'id'=>$id,
            'name'=>$name
        );
        if($this->create($updateData)){
            $id = $this->save($updateData);
            return $id ? $id : 0;
        }else{
            if($this->getError() == '职位名称已存在'){
                return -1;
            }
            return $this->getError();
        }
    }
    //根据id删除记录
    public function remove($ids){
        return $this->delete($ids);
    }
}