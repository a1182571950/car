<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/16
 * Time: 1:51
 */
class VedioCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new VedioModel();
    }

    //显示主页的方法
    public function showVedio(){
        //验证是否登录
        if(!isset($_COOKIE['nowUser'])){
            require "./View/main.php";
            return;
        }
        $this->showView("playVedio");
        setcookie("url","./index.php?ctrl=VedioCtrl&do=showVedio",0,"/") ;
        setcookie("type","Vedio",0,"/");
    }

    //查询vip
    public function selVip(){
        $vid = isset($_POST['vid'])?$_POST['vid']:'';
        $res = $this->link->selVip($vid);
        echo $this->ajaxSend($res);
    }

    //查询视频信息
    public function getNowResources(){
        $reid = isset($_POST['reid'])?$_POST['reid']:'';
        $res = $this->link->getNowResources($reid);
        echo $this->ajaxSend($res);
    }

    //点击率增加
    public function addVedio(){
        $reid = isset($_POST['reid'])?$_POST['reid']:'';
        $cid = isset($_POST['cid'])?$_POST['cid']:'';
        $res = $this->link->addVedio($reid,$cid);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }

    //发布评论
    public function pushInfo(){
        $reid = isset($_POST['reid'])?$_POST['reid']:'';
        $cid = isset($_POST['cid'])?$_POST['cid']:'';
        $info = isset($_POST['info'])?$_POST['info']:'';
        $res = $this->link->pushInfo($reid,$cid,$info);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }

    //评论获取
    public function getComment(){
        $page = $_GET['page'];
        $reid = isset($_POST['reid'])?$_POST['reid']:'';
        $res = $this->link->getComment($page,$reid);
        echo $this->ajaxSend($res);
    }
}