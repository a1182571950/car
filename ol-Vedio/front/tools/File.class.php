<?php
class File
{
    //写入二维数组
    public static function writer2Arr($Arr,$path,$model="w+"){
        $file = fopen($path,$model);
        foreach($Arr as $key=>$valArr){
            $res =  fwrite($file,json_encode($valArr,JSON_UNESCAPED_UNICODE)."\n");
        }
        return $res;//写入的字节数。如果失败，则返回false
    }

    //读取二维数组
    public static  function  read2Arr($path,$model="r+"){
        $file = fopen($path,$model);//打开
        $arr = [];
        while(feof($file)!=true){
            $nowArr = json_decode(fgets($file),true);
            if($nowArr){
                array_push($arr,$nowArr);
            }
        }
        return $arr;
    }
    //写入字符串文件
    public static function writerStr($str,$path,$model="w+"){
        $file = fopen($path,$model);
        $res = fwrite($file,$str);
        return $res;
    }
    //读取字符串文件
    public static function readStr($path,$model="r+"){
        $file = fopen($path,$model);
        $res = fgets($file);
        return $res;
    }
    //删除文件
    public static function Dele($path){
        if($path){
            return unlink($path);
        }else{
            return "未知错误";
        }
    }
}