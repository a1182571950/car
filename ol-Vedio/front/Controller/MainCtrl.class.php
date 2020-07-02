<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/13
 * Time: 9:57
 */
class MainCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new MainModel();
    }

    //显示主页的方法
    public function showMain(){
        $this->showView("main");
    }

    //注册事件
    public function doReg(){
        $userName = isset($_POST['userName'])?$_POST['userName']:'';
        $pwd = isset($_POST['pwd'])?$_POST['pwd']:'';
        $code1 = isset($_POST['userCode'])?$_POST['userCode']:'';
        session_start();
        $code = $_SESSION["code"];
        if(strtolower($code1) != strtolower($code)){
            echo 2;
            return;
        }else{
            $res = $this->link->doReg($userName,$pwd);
            if($res){
                echo 1;
            }else{
                echo 3;
            }
        }
    }

    //登录事件
    public function doLogin(){
        $userName = isset($_POST['userName'])?$_POST['userName']:'';
        $pwd = isset($_POST['pwd'])?$_POST['pwd']:'';
        $code1 = isset($_POST['userCode'])?$_POST['userCode']:'';
        session_start();
        $code = $_SESSION["code"];
        if(strtolower($code1) != strtolower($code)){
            echo 2;
            return;
        }else{
            $res = $this->link->doLogin($userName,$pwd);
            if($res != null){
                if($res[0]['isLocking'] == '未锁定'){
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
                    echo 3;
                }
            }else{
                echo 0;
            }
        }
    }
    //点击注销
    public function outLogin(){
        setcookie('nowUser','',time()-1);
        setcookie("type","home",0,"/");
        echo 1;
    }

    //获取分类
    public function getClassify(){
        $res = $this->link->getClassify();
        echo $this->ajaxSend($res);
    }

    //获取前十视频
    public function getResources(){
        $res = $this->link->getResources();
        echo $this->ajaxSend($res);
    }

    //获取轮播视频
    public function getResourcesS(){
        $clid = isset($_POST['clid'])?$_POST['clid']:'';
        $res = $this->link->getResourcesS($clid);
        echo $this->ajaxSend($res);
    }
}