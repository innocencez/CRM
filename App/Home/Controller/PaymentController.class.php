<?php
namespace Home\Controller;


class PaymentController extends HomeController{
    //获取入库列表
    public function getList(){
        if(IS_AJAX){
            $post = D('Inlib');
            $this->ajaxReturn($post->getList(I('post.keywords'),I('post.type'), I('post.dateType'), I('post.dateFrom'), I('post.dateTo'),I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else{
            $this->error('非法操作');
        }
    }
}