<?php
namespace Home\Controller;

class UserController extends HomeController{
    //获取账号列表
    public function getList(){
        if(IS_AJAX){
            $user = D('user');
            $this->ajaxReturn($user->getList(I('post.keywords'), I('post.dateType'), I('post.dateFrom'), I('post.dateTo'),I('post.state'),I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else{
            $this->error('非法操作');
        }
    }
    //新增账号
    public function register(){
        if(IS_AJAX){
            $user = D('user');
            echo $user->register(I('post.accounts'),I('post.password'),I('post.staff_id'),I('post.staff_name'));
        }else{
            $this->error('非法操作！');
        }
    }
    //获取一条数据
    public function getOne(){
        if(IS_AJAX){
            $user = D('user');
            $this->ajaxReturn($user->getOne(I('post.id')));
        }else{
            $this->error('非法请求');
        }
    }
    //根据id修改一条记录
    public function update(){
        if(IS_AJAX){
            $user = D('user');
            echo $user->update(I('post.id'),I('post.accounts'),I('post.password'),I('post.state'),I('post.staff_id'),I('post.staff_name'));
        }else{
            $this->error('非法请求');
        }
    }
    //根据id删除记录
    public function remove(){
        if(IS_AJAX){
            $user = D('user');
            echo $user->remove(I('post.ids'));
        }else{
            $this->error('非法请求');
        }
    }
    //账号审核设置
    public function state(){
        if(IS_AJAX){
            $user = D('user');
            echo $user->state(I('post.id'),I('post.state'));
        }else{
            $this->error('非法请求');
        }
    }
    //修改密码
    public function editPassword(){
        if(IS_AJAX){
            $user = D('user');
            echo $user->editPassword(I('post.id'),I('post.password'),I('post.noPassword'));
        }else{
            $this->error('非法请求');
        }
    }
}