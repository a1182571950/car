<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/3
 * Time: 9:38
 */
class CustomerCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new CustomerModel();
    }
    //显示客户管理界面的方法
    public function showCustomer(){
        $this->showView("Customer");
    }

    //显示客户列表
    public function showCustomerG(){
        $nowPage = $_GET['page'];
        $res = $this->link->getCustomer($nowPage);
        echo $this->ajaxSend($res);
    }

    //重置用户密码
    public function resetPwd(){
        $cid = $_POST['cid'];
        $res = $this->link->resetPwd($cid);
        if($res){
            echo 1;
        }else{
            echo 0;
        }
        //var_dump($res);
        return;
    }

    //锁定解锁操作
    public function isLockingG(){
        $cid = $_POST['cid'];
        $locking = $_POST['locking'];
        $res = $this->link->isLockingG($cid,$locking);
        if($res){
            echo 1;
        }else{
            echo 0;
        }
        //var_dump($res);
        return;
    }

    //客户查询
      public function seleCustomer(){
        $nowPage = $_GET['page'];
        $seleVal = $_POST['seleVal'];
        $res = $this->link->seleCustomer($nowPage,$seleVal);
        echo $this->ajaxSend($res);
    }

    //查询用户注册数据
    public function queryCustomer(){
        $startTime = isset($_POST["startTime"])?$_POST["startTime"]:"";
        $endTime = isset($_POST["endTime"])?$_POST["endTime"]:"";
        $res = $this->link->queryCustomer($startTime,$endTime);
        echo $this->ajaxSend($res);
    }
}