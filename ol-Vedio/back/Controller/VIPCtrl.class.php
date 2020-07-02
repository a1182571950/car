<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/1
 * Time: 11:41
 */
class VIPCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new VIPModel();
    }
    //显示管理界面的方法
    public function showVIP(){
        $this->showView("VIP");
    }
    //显示VIP等级内容
    public function showVIPG(){
        $res = $this->link->getVIP();
        echo $this->ajaxSend($res);
    }
    //添加VIP等级
    public function addVIP(){
        $vipName = isset($_POST['vipName'])?$_POST['vipName']:'';
        $vipTime = isset($_POST['vipTime'])?$_POST['vipTime']:'';
        $vipPrice = isset($_POST['vipPrice'])?$_POST['vipPrice']:'';
        $res = $this->link->addVIP($vipName,$vipTime,$vipPrice);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }
    //修改VIP等级
    public function upVIP(){
        $vipName1 = isset($_POST['vipName1'])?$_POST['vipName1']:'';
        $vipTime1 = isset($_POST['vipTime1'])?$_POST['vipTime1']:'';
        $vipPrice1 = isset($_POST['vipPrice1'])?$_POST['vipPrice1']:'';
        $vid = isset($_POST['vipId'])?$_POST['vipId']:'';
        $res = $this->link->upVIP($vipName1,$vipPrice1,$vipTime1,$vid);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }
    //删除VIP等级
    public function delVIP(){
        $vid = isset($_POST['vipId'])?$_POST['vipId']:'';
        $res = $this->link->delVIP($vid);
        echo $this->ajaxSend($res);
    }
}