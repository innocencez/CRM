<?php
namespace Home\Model;
use Think\Model;

class NavModel extends Model{
    //获得导航数据
    public function getNav(){
        //返回节点对象
        $object = $this->field('id,text,url,iconCls,nid')->select();
        //创建一个树数组
        $tree = array();
        //筛选出根节点
        foreach($object as $key=>$val){
            if($val['nid'] == 0){
                $tree[] = $val;
            }
        }
        //将子节点添加到对应的位置
        foreach($tree as $tree_key=>$tree_val){
            foreach($object as $key=>$val){
                if($val['nid'] == $tree_val['id']){
                    $tree[$tree_key]['children'][] = $val;
                }
            }
        }
        return $tree;
    }

}