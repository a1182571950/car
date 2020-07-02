<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/19
 * Time: 23:16
 */
class MyResourcesModel extends Model{

    public function getMyResources($selName,$page){
        $start = ($page - 1)*10;
        $sql01 = "select COUNT(*) as a from t_resources WHERE `reName` LIKE '%{$selName}%'";
        $sql02 = "SELECT * FROM t_resources WHERE  `reName` LIKE '%{$selName}%' LIMIT $start,20;";
        $res = $this->delPage($sql01,$sql02,$page,$start);
        return $res;
    }
}