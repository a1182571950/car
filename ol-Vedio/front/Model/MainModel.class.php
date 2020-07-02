<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/13
 * Time: 9:58
 */
class MainModel extends Model{

    //注册事件
    public function doReg($userName,$pwd){
        $sql = "INSERT INTO t_customer (cName,cPassword,vid) VALUES ('{$userName}',MD5('{$pwd}'),1);";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }

    //登录事件
    public function doLogin($userName,$pwd){
        $sql = "SELECT c.cid,c.cName,c.money,c.isLocking,c.vipExTime,v.vName,c.vid FROM t_customer c INNER JOIN t_vip v ON c.vid = v.vid
                WHERE c.cName = '{$userName}' AND c.cPassword = MD5('{$pwd}');";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //分类查询
    public function getClassify(){
        $sql = "SELECT * FROM t_classify ORDER BY sid ASC;";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //获取前十视频
    public function getResources(){
        $sql = "SELECT * FROM t_resources ORDER BY playbackNum DESC LIMIT 0,10;";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //获取轮播视频
    public function getResourcesS($clid){
        $sql = "SELECT * FROM t_resources WHERE clid ={$clid} ORDER BY playbackNum DESC LIMIT 0,11;";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }
}