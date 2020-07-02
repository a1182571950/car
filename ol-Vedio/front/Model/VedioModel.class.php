<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/16
 * Time: 1:51
 */

class VedioModel extends Model{
    //查询vip
    public function selVip($vid){
        $sql = "SELECT * FROM t_vip WHERE vid = {$vid};";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //查询视频信息
    public function getNowResources($reid){
        $sql = "SELECT * FROM t_resources WHERE reid = {$reid};";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //视频记录增加 点击率增加
    public function addVedio($reid,$cid){
        $sql = "UPDATE t_resources SET playbackNum = playbackNum+1 WHERE reid = {$reid};";
        $sql1 = "INSERT INTO t_playvedio (reid,cid) VALUES ({$reid},{$cid});";
        $res = $this->dbObj->dealSQL($sql);
        if($res){
            $res1 = $this->dbObj->dealSQL($sql1);
            return $res1;
        }
    }

    //评论上传
    public function pushInfo($reid,$cid,$info){
        $sql = "INSERT INTO t_comment (content,reid,cid) VALUES ('{$info}',{$reid},{$cid});";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }

    //数据库获取用户信息
    public function getComment($page,$reid){
        $start = ($page - 1)*5;
        $sql01 = "select COUNT(*) as a from t_comment WHERE reid = {$reid};";
        $sql02 = "SELECT co.coid,co.content,co.reid,co.cid,co.createTime,c.cName FROM t_comment co INNER JOIN t_customer c ON co.cid = c.cid WHERE co.reid = {$reid} ORDER BY co.createTime DESC LIMIT $start,5;";
        $res = $this->delPage($sql01,$sql02,$page,$start);
        return $res;
    }
}