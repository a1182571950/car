<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/8
 * Time: 16:34
 */
class ClassifyCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new ClassifyModel();
    }
    //显示分类管理界面的方法
    public function showClassify(){
        $this->showView("Classify");
    }
    //查询分类表
    public function getClassify(){
        $res = $this->link->getClassify();
        echo $this->ajaxSend($res);
    }

    //修改分类信息
    public function upClassify(){
        $clid = isset($_POST['clid'])?$_POST['clid']:"";
        $gid = isset($_POST['gid'])?$_POST['gid']:"";
        $pid = isset($_POST['pid'])?$_POST['pid']:"";
        $sid = isset($_POST['sid'])?$_POST['sid']:"";
        $sid1 = isset($_POST['sid1'])?$_POST['sid1']:"";
        $classifyName = isset($_POST['classifyName'])?$_POST['classifyName']:"";
        $res = $this->link->upClassify($clid,$gid,$pid,$sid,$classifyName,$sid1);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }

    //新增分类信息
    public function addClassify(){
        $gid = isset($_POST['gid'])?$_POST['gid']:"";
        $pid = isset($_POST['pid'])?$_POST['pid']:"";
        $sid = isset($_POST['sid'])?$_POST['sid']:"";
        $classifyName = isset($_POST['classifyName'])?$_POST['classifyName']:"";
        $res = $this->link->addClassify($gid,$pid,$sid,$classifyName);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }

    //删除分类信息
    public function delClassify(){
        $clid = isset($_POST['clid'])?$_POST['clid']:"";
        $pid = isset($_POST['pid'])?$_POST['pid']:"";
        $sid1 = isset($_POST['sid1'])?$_POST['sid1']:"";
        $res = $this->link->delClassify($clid,$pid,$sid1);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }
}