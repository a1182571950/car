<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/3/24
 * Time: 0:58
 */

class Model{
    protected $dbObj;

    //链接数据库
    public function __construct()
    {
        require_once "./tools/DB.class.php";
        $this->dbObj  = new DB('hf191004video');
    }

    //分页
    public function delPage($sql01,$sql02,$nowPage,$start){
        $total = $this->dbObj->selectSQL($sql01);
        $totalPage = $total[0]["a"];        //总共几条数据
        $pages = ceil($totalPage/5);        //总共几页
        $res = $this->dbObj->selectSQL($sql02);
        $resArr = [
            "totalPage"=>$totalPage,
            "res"=>$res,
            "pages"=>$pages,
            "nowPage"=>$nowPage,
            "start"=>$start
        ];
        return $resArr;
    }
    //查询某个表
    public function selectTab($tab){
        $sql = "select * from {$tab}";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //模糊查询
//    public function searchKeyWord($tab,$keyWord){
//        $sql = "select * from $tab as a where sno like '%{$keyWord}%' or sname like '%{$keyWord}%' or ssex like '%{$keyWord}%' or sage like '%{$keyWord}%'";
//        return $this->dbObj->selectSQL($sql);
//    }

    //删除
    public function del($tab,$val,$str){
        $sql = "DELETE FROM $tab WHERE $val = '{$str}'";
        return $this->dbObj->dealSQL($sql);
    }
}