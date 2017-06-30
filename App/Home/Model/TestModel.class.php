<?php
namespace Home\Model;
use Think\Model;

class TestModel extends Model{
    //测试返回数据
    public  function getData(){
            return 'abc';
    }
}