<?php
namespace Home\Controller;
use Think\Controller;
class HomeController extends Controller{
    //加载主页面
    public function index()
    {
        if (session('admin')) {
            $this->display();
        } else {
            $this->redirect('Login/index');
        }
    }
    //空方法操作，屏蔽不存在的页面
     public function _empty(){
         $this->redirect('Index/index');
     }
}