<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/6
 * Time: 11:46
 */

class PowersCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new PowersModel();
    }
    //显示角色界面的方法
    public function showPowers(){
        $this->showView("powers");
    }
    //显示角色列表
    public function showPowersG(){
        $res = $this->link->showPowersG();
        echo $this->ajaxSend($res);
    }

    //权限显示
    public function isPowers(){
        $rid = isset($_POST["rid"])?$_POST["rid"]:"";
        $res = $this->link->isPowers($rid);
        echo $this->ajaxSend($res);
    }

    //修改权限
    public function upPowers(){
        $rid = isset($_POST["rid"])?$_POST["rid"]:"";
        $powersArr = isset($_POST["powersArr"])?$_POST["powersArr"]:"";
        $res = $this->link->upPowers($powersArr,$rid);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }

    //添加新角色
    public function addRole(){
        $rNameVal = isset($_POST["rNameVal"])?$_POST["rNameVal"]:"";
        $powersArr = isset($_POST["powersArr"])?$_POST["powersArr"]:"";
        $res = $this->link->addRole($rNameVal,$powersArr);
        echo $this->ajaxSend($res);
    }

    //修改角色
    public function upRole(){
        $rid = isset($_POST["rid"])?$_POST["rid"]:"";
        $rName = isset($_POST["rName"])?$_POST["rName"]:"";
        $res = $this->link->upRole($rid,$rName);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }

    //删除角色
    public function delRole(){
        $rid = isset($_POST["rid"])?$_POST["rid"]:"";
        $res = $this->link->delRole($rid);
        echo $this->ajaxSend($res);
    }
}