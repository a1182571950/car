<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/15
 * Time: 19:58
 */

class HomeModel extends Model{
    public function getResources($clid){
        $sql = "SELECT * FROM t_Resources WHERE clid = {$clid} ORDER BY playbackNum DESC LIMIT 0,10 ";
        $res = $res = $this->dbObj->selectSQL($sql);
        return $res;
    }
}