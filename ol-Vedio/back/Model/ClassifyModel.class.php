<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/8
 * Time: 16:35
 */
class ClassifyModel extends Model{
    //数据库f分类
    public function getClassify(){
        $sql = "SELECT * FROM t_classify ORDER BY sid ASC;";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //数据库修改分类信息
    public function upClassify($clid,$gid,$pid,$sid,$classifyName,$sid1){
        $sql1 = "UPDATE t_classify SET gid = {$gid},pid ={$pid},sid ={$sid},clName = '{$classifyName}'WHERE clid = {$clid};";
        $res2 = $this->dbObj->dealSQL($sql1);
        if($res2){
            $sql2 = "UPDATE t_classify SET sid = sid+1 WHERE pid={$pid} AND sid > {$sid}-1  AND clid != {$clid} AND sid<{$sid1};";
            $res3 = $this->dbObj->dealSQL($sql2);
            return $res3;
        }
    }

    //新增分类信息
    public function addClassify($gid,$pid,$sid,$classifyName){
        $sql1 = "UPDATE t_classify SET sid = sid+1 WHERE pid={$pid} AND sid > {$sid}-1";
        $res1 = $this->dbObj->dealSQL($sql1);
        if($res1){
            $sql2 = "INSERT INTO t_classify (clName,pid,sid,gid) VALUES ('{$classifyName}',{$pid},{$sid},{$gid});";
            $res2 = $this->dbObj->dealSQL($sql2);
            return $res2;
        }
    }

    //删除分类信息
    public function delClassify($clid,$pid,$sid1){
        $sql1 = "UPDATE t_classify SET sid = sid-1 WHERE pid={$pid} AND sid > {$sid1}";
        $res1 = $this->dbObj->dealSQL($sql1);
        if($res1){
            $res2 = $this->del("t_classify","clid",$clid);
            return $res2;
        }
    }
}