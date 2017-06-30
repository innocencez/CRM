<?php
namespace Home\Controller;


class ProductController extends HomeController{
    //获取产品信息列表
    public function getList(){
        if(IS_AJAX){
            $post = D('Product');
            $this->ajaxReturn($post->getList(I('post.keywords'),I('post.type'), I('post.dateType'), I('post.dateFrom'), I('post.dateTo'),I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else{
            $this->error('非法操作');
        }
    }
    //新增产品
    public function register(){
        if(IS_AJAX){
            $product = D('Product');
            echo $product->register(I('post.name'),I('post.sn'),I('post.type'),I('post.pro_price'),I('post.sell_price'),I('post.unit'),I('post.inventory_alarm'),I('post.details'));
        }else{
            $this->error('非法操作！');
        }
    }
    //获取一条数据
    public function getOne(){
        if(IS_AJAX){
            $product = D('product');
            $this->ajaxReturn($product->getOne(I('post.id')));
        }else{
            $this->error('非法请求');
        }
    }
    //根据id修改一条记录
    public function update(){
        if(IS_AJAX){
            $product = D('Product');
            echo $product->update(I('post.id'),I('post.type'),I('post.pro_price'),I('post.sell_price'),I('post.unit'),I('post.inventory'),I('post.inventory_alarm'),I('post.details'));
        }else{
            $this->error('非法请求');
        }
    }
    //根据id删除记录
    public function remove(){
        if(IS_AJAX){
            $product = D('Product');
            echo $product->remove(I('post.ids'));
        }else{
            $this->error('非法请求');
        }
    }
    //获取单个产品详情
    public function getDetails(){
        if(IS_AJAX){
            $product = D('product');
            $this->assign('object',$product->getDetails(I('get.id')));
            $this->display('details');
        }else{
            $this->error('非法请求');
        }
    }
}