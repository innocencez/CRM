<?php
namespace Home\Controller;
use Think\Controller;

class LoginController extends Controller{
    public function index(){
        if(session('admin')){
            $this->redirect('Index/index');
        }else{
            $this->display();
        }
    }
    //验证登录
    public function checkUser(){
        if(IS_AJAX){
            $user = D('user');
            echo $user->checkUser(I('post.accounts'),I('post.password'));
        }else{
            $this->error('非法操作！');
        }
    }
    //登出系统
    public function logout(){
        session('admin',null);
        $this->redirect('Login/index');
    }
    //账号申请
    public function register(){
        if(IS_AJAX){
            $user = D('user');
            echo $user->register(I('post.accounts'),I('post.password'));
        }else{
            $this->error('非法操作！');
        }
    }
}