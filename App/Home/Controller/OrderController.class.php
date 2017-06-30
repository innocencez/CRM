<?php
namespace Home\Controller;


class OrderController extends HomeController{
    //获取订单信息列表
    public function getList(){
        if(IS_AJAX){
            $order = D('Order');
            $this->ajaxReturn($order->getList(I('post.keywords'),I('post.pay_state'),I('post.dateType'), I('post.dateFrom'), I('post.dateTo'),I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else{
            $this->error('非法操作');
        }
    }
    //新增订单
    public function register(){
        if(IS_AJAX){
            $order = D('Order');
            echo $order->register(I('post.title'),I('post.documentary_id'),I('post.cost'),I('post.pay_state'),I('post.details'));
        }else{
            $this->error('非法操作');
        }
    }
    //获取一条信息
    public function getOne(){
        if(IS_AJAX){
            $client = D('Documentary');
            $this->ajaxReturn($client->getOne(I('post.id')));
        }else{
            $this->error('非法操作');
        }
    }
    //修改客户信息
    public function update(){
        if(IS_AJAX){
            $client = D('Documentary');
            echo $client->update(I('post.id'),I('post.client_id'),I('post.staff_id'),I('post.title'),I('post.client_company'),I('post.way'),I('post.evolve'),I('post.staff_name'),I('post.remark'));
        }else{
            $this->error('非法操作');
        }
    }
    //删除客户信息
    public function remove(){
        if(IS_AJAX){
            $client = D('Documentary');
            echo $client->remove(I('post.ids'));
        }else{
            $this->error('非法请求');
        }
    }
}