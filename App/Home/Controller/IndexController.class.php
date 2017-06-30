<?php
namespace Home\Controller;

class IndexController extends HomeController{
    //获取导航数据
    public function getNav(){
        $nav = D('Nav');
        $this->ajaxReturn($nav->getNav());
    }
}