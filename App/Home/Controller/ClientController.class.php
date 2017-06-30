<?php
namespace Home\Controller;


class ClientController extends HomeController{
    //获取客户信息列表
    public function getList(){
        if(IS_AJAX){
            $client = D('Client');
            $this->ajaxReturn($client->getList(I('post.keywords'),I('post.source'), I('post.dateType'), I('post.dateFrom'), I('post.dateTo'),I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else{
            $this->error('非法操作');
        }
    }
    //新增客户
    public function register(){
        if(IS_AJAX){
            $client = D('Client');
            echo $client->register(I('post.company'),I('post.name'),I('post.tel'),I('post.source'));
        }else{
            $this->error('非法操作');
        }
    }
    //获取一条信息
    public function getOne(){
        if(IS_AJAX){
            $client = D('client');
            $this->ajaxReturn($client->getOne(I('post.id')));
        }else{
            $this->error('非法操作');
        }
    }
    //修改客户信息
    public function update(){
        if(IS_AJAX){
            $client = D('client');
            echo $client->update(I('post.id'),I('post.name'),I('post.tel'),I('post.source'));
        }else{
            $this->error('非法操作');
        }
    }
    //删除客户信息
    public function remove(){
        if(IS_AJAX){
            $client = D('client');
            echo $client->remove(I('post.ids'));
        }else{
            $this->error('非法请求');
        }
    }
}