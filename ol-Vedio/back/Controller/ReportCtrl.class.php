<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/13
 * Time: 19:56
 */
class ReportCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new ReportModel();
    }
    //显示报表界面的方法
    public function showReport(){
        $this->showView("Report");
    }

    //获取播放次数报表数据
    public function queryPlaybackNum(){
        $startTime = isset($_POST["startTime"])?$_POST["startTime"]:"";
        $endTime = isset($_POST["endTime"])?$_POST["endTime"]:"";
        $res = $this->link->queryPlaybackNum($startTime,$endTime);
        echo $this->ajaxSend($res);
    }

    //获取分类数据
    public function queryClassifyPlayNum(){
        $startTime = isset($_POST["startTime"])?$_POST["startTime"]:"";
        $endTime = isset($_POST["endTime"])?$_POST["endTime"]:"";
        $res = $this->link->queryClassifyPlayNum($startTime,$endTime);
        echo $this->ajaxSend($res);
    }

    //获取前十播放量视频
    public function queryPlayback10Num(){
        $startTime = isset($_POST["startTime"])?$_POST["startTime"]:"";
        $endTime = isset($_POST["endTime"])?$_POST["endTime"]:"";
        $res = $this->link->queryPlayback10Num($startTime,$endTime);
        echo $this->ajaxSend($res);
    }
}