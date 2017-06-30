<?php
namespace Home\Controller;

class EmptyController extends HomeController{
    //空控制器
    public function index(){
        $this->redirect('Index/index');
    }
}