<?php
namespace Home\Controller;


class DocumentaryController extends HomeController{
    //获取客户信息列表
    public function getList(){
        if(IS_AJAX){
            $documentary = D('Documentary');
            $this->ajaxReturn($documentary->getList(I('post.keywords'),I('post.way'), I('post.evolve'),I('post.dateType'), I('post.dateFrom'), I('post.dateTo'),I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else{
            $this->error('非法操作');
        }
    }
    //新增客户
    public function register(){
        if(IS_AJAX){
            $client = D('Documentary');
            echo $client->register(I('post.title'),I('post.client_company'),I('post.way'),I('post.evolve'),I('post.staff_name'),I('post.remark'),I('post.client_id'),I('post.staff_id'));
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