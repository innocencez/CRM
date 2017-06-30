<?php
namespace Home\Model;
use Think\Model;

class UserModel extends Model{
    //账号信息自动验证
    protected $_validate = array(
        //账号名称长度不合法
        array('accounts','2,20','账号长度不合法',self::EXISTS_VALIDATE,'length',self::MODEL_INSERT),
        //新增密码长度不合法！
        array('password', '6,30', '密码长度不合法', self::EXISTS_VALIDATE,'length',self::MODEL_INSERT),
        //账号名称已存在
        array('accounts','','账号名称已存在',self::EXISTS_VALIDATE,'unique',self::MODEL_BOTH),
        //修改密码长度不合法！可以为空
        array('password', '6,30', '密码长度不合法', self::VALUE_VALIDATE,'length',self::MODEL_UPDATE),
        //确认密码是否与密码相同
        array('noPassword','password','确认密码不正确',self::EXISTS_VALIDATE,'confirm',self::MODEL_UPDATE),
        //登录账号2-20位之间
        array('accounts','2,20','登录账号长度不合法',self::EXISTS_VALIDATE,'length',4),
        //登录密码密码6-30 位
        array('password', '6,30', ' 登录密码长度不合法', self::EXISTS_VALIDATE, 'length', 4),
    );
    //获取账号列表
    public  function getList($keywords,$dateType,$dateFrom,$dateTo,$state,$page,$rows,$sort,$order){
        $map = array();
        if($keywords){
            $map['accounts'] = array('like','%'.$keywords.'%');
        }
        if($state){
            $map['state'] = $state;
        }
        if($dateTo && $dateFrom){
            $map["$dateType"] = array(array('egt',date($dateFrom)),array('elt',date($dateTo)));
        }else if($dateFrom){
            $map["$dateType"] = array('egt',date($dateFrom));
        }else if($dateTo){
            $map["$dateType"] = array('elt',date($dateTo));
        }
        $object = $this->field('id,accounts,create_time,login_count,staff_name,last_login_time,last_login_ip,state')
                               ->where($map)
                               ->order(array($sort=>$order))
                               ->limit($rows*($page-1),$rows)
                               ->select();
        return array(
            'total'=>$this->count(),
            'rows'=>$object ? $object : '',
        );
    }
    //添加账号
    public function register($accounts,$password,$staff_id,$staff_name,$state=''){
        $addData = array(
            'accounts'=>$accounts,
            'password'=>$password,
            'staff_name'=>$staff_name,
            'create_time'=>getTime(),
            'state' =>$state ? $state : '冻结'
        );
        if($this->create($addData)){
            $addData['password'] = sha1($password);
            $id = $this->add($addData);
            if($id){
                if($staff_id){
                    $map['id'] = $staff_id;
                    M('staff')->where($map)->save(array(
                        'user_id'=>$id
                    ));
                }
            }
            return $id ? $id : 0;
        }else{
            if($this->getError() == '账号名称已存在'){
                return -1;
            }
            return $this->getError();
        }
    }
    //获取一条数据
    public function  getOne($id){
        $map = array(
            'id'=>$id
        );
        return $this->field('id,accounts,state,staff_name')->where($map)->find();
    }
    //根据id修改一条记录
    public function update($id,$accounts,$password,$state,$staff_id,$staff_name){
        $updateData= array(
            'id'=>$id,
            'accounts'=>$accounts,
            'password'=>$password,
            'state' =>$state ? $state : '冻结'
        );
        if($this->create($updateData)){
            if(empty($password)){
                unset($updateData['password']);
            }else{
                $updateData['password'] = sha1($password);
            }
            //判断是否修改了关联档案
            if(is_numeric($staff_id)){
                $updateData['staff_name'] = $staff_name;
                //清零之前的关联
                M('staff')->where(array('user_id'=>$id))->save(array('user_id'=>0));
                //新的关联赋值
                M('staff')->where('id='.$staff_id)->setField('user_id',$id);
            }
            $id = $this->save($updateData);
            return $id ? $id : 0;
        }else{
            if($this->getError() == '账号名称已存在'){
                return -1;
            }
            return $this->getError();
        }
    }
    //根据id删除记录
    public function remove($ids){
        $re = $this->delete($ids);
        //删除账号后，将档案清零
        $map['user_id'] = array('in',$ids);
        M('Staff')->where($map)->save(array(
            'user_id'=>0
        ));
        return $re;
    }
    //账号审核
    public function state($id,$state){
        $data = array(
            'id'=>$id,
            'state'=>$state
        );
        return $this->save($data);
    }
    //验证账号登录
    public function checkUser($accounts,$password){
        $checkData = array(
            'accounts'=>$accounts,
            'password'=>$password
        );
        if($this->create($checkData,4)){
            $map['accounts'] = $accounts;
            $map['password'] = sha1($password);
            $object = $this->field('id,accounts,state')
                                   ->where($map)
                                   ->find();
            if($object){
                //账号冻结状态返回-1,
                if($object['state'] == '冻结') return -1;
                //登录成功写入session
                session('admin',array(
                    'id' => $object['id'],
                    'accounts'=>$object['accounts']
                ));
                //更新账号登录次数
                $loginUpdate = array(
                    'id' =>$object['id'],
                    'last_login_time'=>getTime(),
                    'last_login_ip'=>get_client_ip(),
                    'login_count'=>array('exp','login_count+1')
                );
                $this->save($loginUpdate);
                //验证成功返回账号ID
                return $object['id'];
            }else{
                //验证失败返回0
                return 0;
            }
        }else{
            return $this->getError();
        }
    }
    //根据id修改账号密码
    public function editPassword($id,$password,$noPassword){
        $updateData= array(
            'id'=>$id,
            'password'=>$password,
            'noPassword'=>$noPassword,
        );
        if($this->create($updateData)){
            unset($updateData['noPassword']);
                $updateData['password'] = sha1($password);
            $id = $this->save($updateData);
            return $id ? $id : 0;

        }else{
            return $this->getError();
        }
    }
}