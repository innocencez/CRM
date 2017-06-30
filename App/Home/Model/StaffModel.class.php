<?php
namespace Home\Model;
use Think\Model;

class StaffModel extends Model{
    //账号信息自动验证
    protected $_validate = array(
        //姓名长度不合法
        array('name','2,20','账号长度不合法',self::EXISTS_VALIDATE,'length',self::MODEL_INSERT),
        //工号格式不合法
        array('number','/^[0-9]{4}$/','工号格式不合法',self::EXISTS_VALIDATE),
        //工号被占用
        array('number','','工号被占用',self::EXISTS_VALIDATE,'unique',self::MODEL_INSERT),
        //其余字段后期完善
    );
    //获取员工档案
    public  function getList($keywords,$post,$entryStatus,$gender,$dateType,$dateFrom,$dateTo,$idCard,$nation,$maritalStatus,$page,$rows,$sort,$order){
        $map = array();
        if($keywords){
            $keywords_map['name'] = array('like','%'.$keywords.'%');
            $keywords_map['number'] = array('like','%'.$keywords.'%');
            $keywords_map['tel'] = array('like','%'.$keywords.'%');
            $keywords_map['_logic'] = 'OR';
        }
        if($dateTo && $dateFrom){
            $map["$dateType"] = array(array('egt',date($dateFrom)),array('elt',date($dateTo)));
        }else if($dateFrom){
            $map["$dateType"] = array('egt',date($dateFrom));
        }else if($dateTo){
            $map["$dateType"] = array('elt',date($dateTo));
        }
        if(!empty($keywords_map)){
            $map['_complex'] = $keywords_map;
        }
        if($post){
            $map['post'] = $post;
        }
        if($entryStatus){
            $map['entry_status'] = $entryStatus;
        }
        if($gender){
            $map['gender'] = $gender;
        }
        if($idCard){
            $map['id_card'] = $idCard;
        }
        if($nation){
            $map['nation'] = $nation;
        }
        if($maritalStatus){
            $map['marital_status'] = $maritalStatus;
        }
        $object = $this->field('id,name,number,gender,post,id_card,tel,nation,entry_status,entry_date,marital_status,politics_status,education,create_time,user_id')
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
    public function register($name,$number,$post,$id_card,$gender,$type,$tel,$marital_status,$nation,$entry_date,$education,$dimission_date,$entry_status,$specialty,$politics_status,$health,$registered,$graduate_date,$registered_address,$graduate_colleges,$intro,$details){
        $addData = array(
            'name'=>$name,
            'number'=>$number,
            'post'=>$post,
            'id_card'=>$id_card,
            'gender'=>$gender,
            'type'=>$type,
            'tel'=>$tel,
            'nation'=>$nation,
            'marital_status'=>$marital_status,
            'entry_status'=>$entry_status,
            'entry_date'=>$entry_date,
            'dimission_date'=>$dimission_date,
            'politics_status'=>$politics_status,
            'education'=>$education,
            'create_time'=>getTime()
        );
        if($this->create($addData)){
            $id = $this->add($addData);
            if($id){
                //向附表添加数据
                M('staffExtend')->add(array(
                    'staff_id'=>$id,
                    'health'=>$health,
                    'specialty'=>$specialty,
                    'registered'=>$registered,
                    'registered_address'=>$registered_address,
                    'graduate_date'=>$graduate_date,
                    'graduate_colleges'=>$graduate_colleges,
                    'intro'=>$intro,
                    'details'=>$details
                ));
                return $id;
            }
        }else if($this->getError() == '工号被占用'){
            return -1;
        }else{
            return 0;
        }
    }
    //获取一条数据
    public function  getOne($id){
        $map['crm_staff.id'] = $id;
        $object = $this->field('crm_staff.id,crm_staff.name,crm_staff.number,crm_staff.gender,crm_staff.post,crm_staff.type,crm_staff.id_card,crm_staff.user_id,crm_staff.tel,crm_staff.nation,
                                                crm_staff.marital_status,crm_staff.entry_status,crm_staff.entry_date,crm_staff.dimission_date,crm_staff.politics_status,crm_staff.education,
                                                crm_staff_extend.health,crm_staff_extend.specialty,crm_staff_extend.registered,crm_staff_extend.registered_address,crm_staff_extend.graduate_date,
                                                crm_staff_extend.graduate_colleges,crm_staff_extend.intro,crm_staff_extend.details')
                                    ->join('crm_staff_extend on crm_staff.id = crm_staff_extend.staff_id','left')
                                    ->where($map)
                                    ->find();
        $object['details'] = htmlspecialchars_decode($object['details']);
        return $object;
    }
    //根据id修改一条记录
    public function update($id,$name,$number,$post,$id_card,$gender,$type,$tel,$marital_status,$nation,$entry_date,$education,$dimission_date,$entry_status,$specialty,$politics_status,$health,$registered,$graduate_date,$registered_address,$graduate_colleges,$intro,$details){
        $updateData= array(
            'id'=>$id,
            'name'=>$name,
            'number'=>$number,
            'gender'=>$gender,
            'post'=>$post,
            'type'=>$type,
            'id_card'=>$id_card,
            'tel'=>$tel,
            'marital_status'=>$marital_status,
            'entry_status'=>$entry_status,
            'nation'=>$nation,
            'entry_date'=>$entry_date,
            'dimission_date'=>$dimission_date,
            'education'=>$education,
            'politics_status'=>$politics_status
        );
        if($this->create($updateData)){

            $affectRow = $this->save($updateData);
            $map['staff_id'] = $id;
            $extendRow = M('staffExtend')->where($map)->save(array(
                'health'=>$health,
                'specialty'=>$specialty,
                'registered'=>$registered,
                'registered_address'=>$registered_address,
                'graduate_date'=>$graduate_date,
                'graduate_colleges'=>$graduate_colleges,
                'intro'=>$intro,
                'details'=>$details
            ));
            return $affectRow || $extendRow;
        }else{
            return $this->getError();
        }
    }
    //根据id删除记录
    public function remove($ids){
        $affectRow = $this->delete($ids);
        if($affectRow){
            $map['staff_id'] = array('in',$ids);
            M('staffExtend')->where($map)->delete();
        }
        return $affectRow;
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
    //获取未关联的档案
    public function getNotRelationList($page,$rows,$sort,$order){
        $map['user_id'] = 0;
        $object = $this->field('id,name,gender,number,id_card,post,create_time')
                                ->where($map)
                                ->order(array($sort=>$order))
                                ->limit($rows * ($page - 1),$rows)
                                ->select();
        return array(
            'total'=>$this->count(),
            'rows'=>$object ? $object : ''
        );
    }
    //获取单个档案详情
    public function getDetails($id){
        $object = $this->getOne($id);
        $map['id'] = $object['user_id'];
        $object['user'] = M('user')->field('accounts,state,last_login_time,last_login_ip')->where($map)->find();
        return $object;
    }
}