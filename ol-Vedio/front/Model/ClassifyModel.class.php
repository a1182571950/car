<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/16
 * Time: 0:25
 */
class ClassifyModel extends Model{

    //分类获取最近资源
    public function getResourcesNew($clid){
        $sql = "SELECT * FROM t_Resources WHERE clid = {$clid} ORDER BY createTime DESC LIMIT 0,10 ";
        $res = $res = $this->dbObj->selectSQL($sql);
        return $res;
    }
}