<?php
/**
 * Created by PhpStorm.
 * User: Maibenben
 * Date: 2020/3/17
 * Time: 15:18
 */
class DB{
    private $dbName;
    private $host;
    private $userName;
    private $pwd;
    private $port;
    private $link;
    public function __construct($dbName,$host='127.0.0.1',$userName='root',$pwd='root',$port=3306)
    {
        $this->dbName = $dbName;
        $this->host = $host;
        $this->userName = $userName;
        $this->pwd = $pwd;
        $this->port = $port;
    // 链接数据库
        $this->link = @(mysqli_connect($this->host,$this->userName,$this->pwd,$this->dbName,$this->port));
        echo $this->link == false ? mysqli_connect_error():'';

    // 设置编码
        mysqli_query($this->link,"set names 'utf8'");
    }
    // 增、删、改
    public function dealSQL($sql){
        return mysqli_query($this->link,$sql);
    }
    //  查询
    public function selectSQL($sql){
        $res = mysqli_query($this->link,$sql);
        $dataArr =[];
        if($res){
            while($rowData = mysqli_fetch_assoc($res)){
                array_push($dataArr,$rowData);
            }
            return $dataArr;
        }
    }
}





