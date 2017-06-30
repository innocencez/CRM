<?php
namespace Home\Controller;


class PostController extends HomeController{
    //获取职位列表
    public function getList(){
        if(IS_AJAX){
            $post = D('Post');
            $this->ajaxReturn($post->getList(I('post.keywords'), I('post.dateType'), I('post.dateFrom'), I('post.dateTo'),I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else{
            $this->error('非法操作');
        }
    }
    //获取ajax职位列表
    public function getAjaxList(){
        if(IS_AJAX){
            $post = D('post');
            $this->ajaxReturn($post->getAjaxList());
        }else{
            $this->error('非法操作');
        }
    }
    //新增职位
    public function register(){
        if(IS_AJAX){
            $post = D('Post');
            echo $post->register(I('post.name'));
        }else{
            $this->error('非法操作！');
        }
    }
    //获取一条数据
    public function getOne(){
        if(IS_AJAX){
            $post = D('post');
            $this->ajaxReturn($post->getOne(I('post.id')));
        }else{
            $this->error('非法请求');
        }
    }
    //根据id修改一条记录
    public function update(){
        if(IS_AJAX){
            $post = D('Post');
            echo $post->update(I('post.id'),I('post.name'));
        }else{
            $this->error('非法请求');
        }
    }
    //根据id删除记录
    public function remove(){
        if(IS_AJAX){
            $post = D('Post');
            echo $post->remove(I('post.ids'));
        }else{
            $this->error('非法请求');
        }
    }
}