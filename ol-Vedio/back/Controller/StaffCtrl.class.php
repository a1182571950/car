<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/5
 * Time: 13:10
 */
class StaffCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new StaffModel();
    }
    //显示员工管理界面的方法
    public function showStaff(){
        $this->showView("staff");
    }
    //查询员工列表
    public function showStaffG(){
        $nowPage = $_GET['page'];
        $res = $this->link->getStaff($nowPage);
        echo $this->ajaxSend($res);
    }

    //查询角色表
    public function showRole(){
        $res = $this->link->getRole();
        echo $this->ajaxSend($res);
    }

    //重置用户密码
    public function resetPwd(){
        $sid = $_POST['sid'];
        $res = $this->link->resetPwd($sid);
        if($res){
            echo 1;
        }else{
            echo 0;
        }
        //var_dump($res);
        return;
    }

    //修改员工信息
    public function upStaff(){
        $sid = $_POST['sid'];
        $sName = $_POST['sName'];
        $sRid = $_POST['sRid'];
        $res = $this->link->upStaff($sName,$sRid,$sid);
        if($res){
            echo 1;
        }else{
            echo 0;
        }
        //var_dump($res);
        return;
    }

    //点击锁定解锁
    public function isLockingG(){
        $sid = $_POST['sid'];
        $locking = $_POST['locking'];
        $res = $this->link->isLockingG($sid,$locking);
        //var_dump($res);
        if($res){
            echo 1;
        }else{
            echo 0;
        }
        return;
    }

    //员工查询
    public function seleStaff(){
        $nowPage = $_GET['page'];
        $seleVal = $_POST['seleVal'];
        $res = $this->link->seleStaff($nowPage,$seleVal);
        echo $this->ajaxSend($res);
    }

    //添加员工
    public function appNewStaff(){
        $staffName = isset($_POST['staffName'])?$_POST['staffName']:'';
        $staffPwd = isset($_POST['staffPwd'])?$_POST['staffPwd']:'';
        $sRid = isset($_POST['sRid'])?$_POST['sRid']:'';
        $res = $this->link->appNewStaff($staffName,$staffPwd,$sRid);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }

}