<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/9
 * Time: 22:08
 */

class ResourcesCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new ResourcesModel();
    }
    //显示资源管理界面的方法
    public function showResources(){
        $this->showView("resources");
    }

    //显示资源管理界面的方法
    public function showNewResources(){
        $this->showView("newResources");
    }

    //显示资源表
    public function getResources(){
        $nowPage = $_GET['page'];
        $clid = isset($_POST['clid'])?$_POST['clid']:"";
        $searchVal = isset($_POST['searchVal'])?$_POST['searchVal']:"";
        $res = $this->link->getResources($nowPage,$clid,$searchVal);
        echo $this->ajaxSend($res);
    }

/*    //分类筛选资源
    public function selResources(){
        $nowPage = $_GET['page'];
        $clid = $_POST['clid'];
        $res = $this->link->selResources($nowPage);
        echo $this->ajaxSend($res);
    }

    //分类查询
    public function searchResources(){
        $nowPage = $_GET['page'];
        $searchVal = $_POST['searchVal'];
        $res = $this->link->searchResources($nowPage);
        echo $this->ajaxSend($res);
    }*/

    //修改资源信息
    public function upResources(){
        $reid = isset($_POST['reid'])?$_POST['reid']:"";
        $vid = isset($_POST['vid'])?$_POST['vid']:"";
        $reName = isset($_POST['reName'])?$_POST['reName']:"";
        $res = $this->link->upResources($reid,$vid,$reName);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }
    //删除资源信息
    public function delResources(){
        $reid = isset($_POST['reid'])?$_POST['reid']:"";
        $res = $this->link->delResources($reid);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }

    //添加
    public function  addResources (){
        $fileArr = $_FILES['fileImg'];
        $fileArr1 = $_FILES['fileVedio'];
        $reName = $_POST['reName'];
        $clid = $_POST['clid'];
        $vid = $_POST['vid'];
        $director = isset($_POST['director'])? $_POST['director']:'';
        $performer = isset($_POST['performer'])?$_POST['performer']:'';
        $info = isset($_POST['info'])?$_POST['info']:'';
        $array=array('jpeg', 'jpg', 'jfif', 'png', 'gif', 'bmp');
        $array1=array('avi', 'mp4');
        //防止重名
         $ext = strtolower(substr(strrchr($fileArr['name'],'.'),1));
         $ext1 = strtolower(substr(strrchr($fileArr1['name'],'.'),1));
         if(!in_array($ext,$array) || !in_array($ext1,$array1)){
             echo 2;
             return;
         }
         $savename = date('YmdHis',time()).".".$ext;
         $savename1 = date('YmdHis',time()).".".$ext1;
        //文件保存的路径
        $path = "../img/".$savename;
        $path1 = "../vedio/".$savename1;
        //临时存放路径
        move_uploaded_file($fileArr['tmp_name'],$path);
        move_uploaded_file($fileArr1['tmp_name'],$path1);
        $res = $this->link->addResources($reName,$clid,$vid,$director,$performer,$info,$path,$path1);
        if($res){
            echo 1;
        }else{
            echo 3;
        }
    }
}