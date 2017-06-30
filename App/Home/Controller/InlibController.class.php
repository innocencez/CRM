<?php
namespace Home\Controller;


class InlibController extends HomeController{
    //获取入库列表
    public function getList(){
        if(IS_AJAX){
            $post = D('Inlib');
            $this->ajaxReturn($post->getList(I('post.keywords'),I('post.type'), I('post.dateType'), I('post.dateFrom'), I('post.dateTo'),I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else{
            $this->error('非法操作');
        }
    }
    //新增入库
    public function register(){
        if(IS_AJAX){
            $product = D('Inlib');
            echo $product->register(I('post.product_id'),I('post.number'),I('post.staff_name'),I('post.mode'),I('post.mode_explain'));
        }else{
            $this->error('非法操作！');
        }
    }
    //获取单个产品详情
    public function getDetails(){
        if(IS_AJAX){
            $inlib = D('inlib');
            $this->assign('object',$inlib->getDetails(I('get.id')));
            $this->display('details');
        }else{
            $this->error('非法请求');
        }
    }
}