<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/9
 * Time: 22:14
 */

class ResourcesModel extends Model{

    //获取资源数据
    public function getResources($nowPage,$clid,$searchVal){
        $start = ($nowPage - 1)*5;
        if($clid == 0 && $searchVal == '' ){
            $sql01 = "select COUNT(*) as a from t_resources";
            $sql02 = "SELECT re.reid,re.reName,re.paths,re.covers,re.playbackNum,re.director,cl.clName,v.vName,re.createTime,re.vid
              FROM t_resources re INNER JOIN t_classify cl ON re.clid = cl.clid INNER JOIN t_vip v ON v.vid = re.vid LIMIT $start,5;";
            $res = $this->delPage($sql01,$sql02,$nowPage,$start);
            return $res;
        }else if($clid == 0 && $searchVal != ''){
            $sql01 = "select COUNT(*) as a from t_resources WHERE `reName` LIKE '%{$searchVal}%'";
            $sql02 = "SELECT re.reid,re.reName,re.paths,re.covers,re.playbackNum,re.director,cl.clName,v.vName,re.createTime,re.vid
              FROM t_resources re INNER JOIN t_classify cl ON re.clid = cl.clid INNER JOIN t_vip v ON v.vid = re.vid WHERE re.reName LIKE '%{$searchVal}%' LIMIT $start,5;";
            $res = $this->delPage($sql01,$sql02,$nowPage,$start);
            return $res;
        }else if($clid != 0 && $searchVal == ''){
            $sql01 = "select COUNT(*) as a from t_resources WHERE clid={$clid}";
            $sql02 = "SELECT re.reid,re.reName,re.paths,re.covers,re.playbackNum,re.director,cl.clName,v.vName,re.createTime,re.vid
              FROM t_resources re INNER JOIN t_classify cl ON re.clid = cl.clid INNER JOIN t_vip v ON v.vid = re.vid WHERE re.clid ={$clid} LIMIT $start,5;";
            $res = $this->delPage($sql01,$sql02,$nowPage,$start);
            return $res;
        }else{
            $sql01 = "select COUNT(*) as a from t_resources WHERE clid={$clid} AND `reName` LIKE '%{$searchVal}%'";
            $sql02 = "SELECT re.reid,re.reName,re.paths,re.covers,re.playbackNum,re.director,cl.clName,v.vName,re.createTime,re.vid
              FROM t_resources re INNER JOIN t_classify cl ON re.clid = cl.clid INNER JOIN t_vip v ON v.vid = re.vid WHERE re.clid ={$clid} AND re.reName LIKE '%{$searchVal}%' LIMIT $start,5;";
            $res = $this->delPage($sql01,$sql02,$nowPage,$start);
            return $res;
        }
    }

    //资源数据修改
    public function upResources($reid,$vid,$reName){
        $sql="UPDATE t_resources SET `reName` = '{$reName}',vid = {$vid} WHERE reid={$reid};";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }

    //删除资源数据
    public function delResources($reid){
        $res = $this->del('t_resources','reid',$reid);
        return $res;
    }

    //添加资源数据
    public function addResources($reName,$clid,$vid,$director,$performer,$info,$path,$path1){
        $sql = "INSERT INTO t_resources (`reName`,paths,covers,director,clid,vid,performer,info) VALUES
              ('{$reName}','{$path1}','{$path}','{$director}',{$clid},{$vid},'{$performer}','{$info}');";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }
}