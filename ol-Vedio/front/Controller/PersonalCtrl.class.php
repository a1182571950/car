<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/17
 * Time: 0:23
 */

class PersonalCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new PersonalModel();
    }

    //显示个人中心的方法
    public function showPersonal(){
        //验证是否登录
        if(!isset($_COOKIE['nowUser'])){
            require "./View/main.php";
            return;
        }
        $this->showView("Personal");
        setcookie("url","./index.php?ctrl=PersonalCtrl&do=showPersonal",0,"/") ;
        setcookie("type","Personal",0,"/");
    }

    //余额充值
    public function upMoney(){
        $cid = isset($_POST['cid'])?$_POST['cid']:"";
        $money = isset($_POST['money'])?$_POST['money']:"";
        $res = $this->link->upMoney($cid,$money);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }

    //获取用户信息
    public function getUser(){
        $cid = isset($_POST['cid'])?$_POST['cid']:"";
        $res = $this->link->getUser($cid);
        echo $this->ajaxSend($res);
    }

    //显示VIP等级内容
    public function getVIP(){
        $res = $this->link->getVIP();
        echo $this->ajaxSend($res);
    }

    //升级vip
    public function payVIP(){
        $cid = isset($_POST['cid'])?$_POST['cid']:"";
        $vid = isset($_POST['vid'])?$_POST['vid']:"";
        $money = isset($_POST['money'])?$_POST['money']:"";
        $time = isset($_POST['time'])?$_POST['time']:"";
        $oid = isset($_POST['oid'])?$_POST['oid']:"";
        $res = $this->link->payVIP($cid,$vid,$money,$time,$oid);
        if($res != null){
            $cid = $res[0]['cid'];
            $cName = $res[0]['cName'];
            $money= $res[0]['money'];
            $vipExTime= $res[0]['vipExTime'];
            $vName= $res[0]['vName'];
            $vid= $res[0]['vid'];
            $showTime = date("Y-m-d H:i:s");
            $nowUser = ["cid"=>$cid,
                "cName"=>$cName,
                "money"=>$money,
                "vipExTime"=>$vipExTime,
                "vName"=>$vName,
                "vid"=>$vid,
                "showTime"=>$showTime];
            setcookie('nowUser',serialize($nowUser),0);
            echo 1;
        }else{
            echo 2;
        }
    }


    public function upVIP(){
        $cid = isset($_POST['cid'])?$_POST['cid']:"";
        $vid = isset($_POST['vid'])?$_POST['vid']:"";
        $money = isset($_POST['money'])?$_POST['money']:"";
        $time = isset($_POST['time'])?$_POST['time']:"";
        $res = $this->link->upVIP($cid,$vid,$money,$time);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }
    //全部订单查询
    public function allOrder(){
        $page = isset($_GET['page'])?$_GET['page']:"";
        $res = $this->link->allOrder($page);
        echo $this->ajaxSend($res);
    }

    //payOrder($page)
    public function payOrder(){
        $page = isset($_GET['page'])?$_GET['page']:"";
        $res = $this->link->payOrder($page);
        echo $this->ajaxSend($res);
    }
    //noPayOrder($page)
    public function noPayOrder(){
        $page = isset($_GET['page'])?$_GET['page']:"";
        $res = $this->link->noPayOrder($page);
        echo $this->ajaxSend($res);
    }

    //播放记录查询
    public function getPlayvedio(){
        $page = isset($_GET['page'])?$_GET['page']:"";
        $cid = isset($_POST['cid'])?$_POST['cid']:"";
        $res = $this->link->getPlayvedio($page,$cid);
        echo $this->ajaxSend($res);
    }

}