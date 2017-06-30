<?php
namespace Home\Controller;


class AlarmController extends HomeController{
    //获取库存预警列表
    public function getList(){
        if(IS_AJAX){
            $post = D('Product');
            $this->ajaxReturn($post->getList(I('post.keywords'),I('post.type'), I('post.dateType'), I('post.dateFrom'), I('post.dateTo'),I('post.page'),I('post.rows'),I('post.sort'),I('post.order'),I('post.alarm')));
        }else{
            $this->error('非法操作');
        }
    }
}