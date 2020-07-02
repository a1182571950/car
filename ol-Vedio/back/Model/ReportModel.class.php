<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/13
 * Time: 19:56
 */
class ReportModel extends Model{
    //查询用户播放数据
    public function queryPlaybackNum($startTime,$endTime){
        $sql = "SELECT count(plid) num ,DATE_FORMAT(playTime,'%Y-%m') M FROM t_playvedio WHERE playTime >= '{$startTime}' AND playTime <= '{$endTime}' GROUP BY M;";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //查询分类播放数据
    public function queryClassifyPlayNum($startTime,$endTime){
        $sql = "SELECT count(pl.plid) num ,DATE_FORMAT(pl.playTime,'%Y-%m') M,cl.clName FROM t_playvedio pl INNER JOIN t_resources re ON pl.reid = re.reid  INNER JOIN t_classify cl ON cl.clid = re.clid WHERE pl.playTime >= '{$startTime}' AND pl.playTime <= '{$endTime}' GROUP BY re.clid;";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //查询前十分类播放数据
    public function queryPlayback10Num($startTime,$endTime){
        $sql = "SELECT count(pl.plid) num ,DATE_FORMAT(pl.playTime,'%Y-%m') M,re.reName FROM t_playvedio pl INNER JOIN t_resources re ON pl.reid = re.reid WHERE pl.playTime >= '{$startTime}' AND pl.playTime <= '{$endTime}' GROUP BY re.reid ORDER BY num DESC LIMIT 0,10;";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }
}