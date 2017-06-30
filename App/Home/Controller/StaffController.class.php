<?php
namespace Home\Controller;

class StaffController extends HomeController{
    //获取员工档案列表
    public function getList(){
        if(IS_AJAX){
            $staff = D('staff');
            $this->ajaxReturn($staff->getList(I('post.keywords'),I('post.post'),I('post.entryStatus'),I('post.gender'), I('post.dateType'),
                                                                    I('post.dateFrom'), I('post.dateTo'),I('post.idCard'),I('post.nation'),I('post.maritalStatus'),
                                                                    I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else{
            $this->error('非法操作');
        }
    }
    //新增员工档案
    public function register(){
        if(IS_AJAX){
            $staff = D('staff');
            echo $staff->register(I('post.name'),I('post.number'),I('post.post'),I('post.id_card'),I('post.gender'),
                                                I('post.type'),I('post.tel'),I('post.marital_status'),I('post.nation'),I('post.entry_date'),
                                                I('post.education'),I('post.dimission_date'),I('post.entry_status'),I('post.specialty'),
                                                I('post.politics_status'),I('post.health'),I('post.registered'),I('post.graduate_date'),
                                                I('post.registered_address'),I('post.graduate_colleges'),I('post.intro'),I('post.details'));
        }else{
            $this->error('非法操作');
        }
    }
    //修改员工档案
    public function update(){
        if(IS_AJAX){
            $staff = D('staff');
            echo $staff->update(I('post.id'),I('post.name'),I('post.number'),I('post.post'),I('post.id_card'),I('post.gender'),
                I('post.type'),I('post.tel'),I('post.marital_status'),I('post.nation'),I('post.entry_date'),
                I('post.education'),I('post.dimission_date'),I('post.entry_status'),I('post.specialty'),
                I('post.politics_status'),I('post.health'),I('post.registered'),I('post.graduate_date'),
                I('post.registered_address'),I('post.graduate_colleges'),I('post.intro'),I('post.details'));
        }else{
            $this->error('非法操作');
        }
    }
    //删除员工档案
    public function remove(){
        if(IS_AJAX){
            $staff = D('staff');
            echo $staff->remove(I('post.ids'));
        }else{
            $this->error('非法请求');
        }
    }
    //根据ID获取一条数据
    public function getOne(){
        if(IS_AJAX){
            $staff = D('staff');
            $this->ajaxReturn($staff->getOne(I('post.id')));
        }else{
            $this->error('非法请求');
        }
    }
    //获取未关联的档案
    public function getNotRelationList(){
        if(IS_AJAX){
            $staff = D('staff');
            $this->ajaxReturn($staff->getNotRelationList(I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else{
            $this->error('非法请求');
        }
    }
    //获取单个档案详情
    public function getDetails(){
        if(IS_AJAX){
            $staff = D('staff');
            $this->assign('object',$staff->getDetails(I('get.id')));
            $this->display('details');
        }else{
            $this->error('非法请求');
        }
    }
}