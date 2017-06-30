<?php
namespace Home\Controller;

use Think\Controller;

class TestController extends Controller{
    public function index(){
        $test = D('Test');
        $re = $test->getData();
        echo $re;
}
}