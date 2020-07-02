<?php
class Code{
    private $width;
    private $height;
    private $size;//长度
    private $img;//操作图片
    private $code;//验证码的值

    public function __construct($width,$height,$size=4)
    {
        $this->width=$width;
        $this->height=$height;
        $this->size=$size;
        $this->outPut();
    }

    public function outPut(){
        ob_clean();//清空
        header("Content-type:image/png");
        $this->createImg();//生成图片
        $this->createCode();//生成验证码
        $this->drawCode();//画验证码
        $this->drawCode1();//画*
        $this->drawCode2();//画圆弧
        $this->drawCode3();//画-
        imagepng($this->img);
    }

    //计算出一个答案str

    public function createImg(){
        $this->img = imagecreate($this->width,$this->height);
        //颜色
      imagecolorallocate($this->img,mt_rand(200,255),mt_rand(200,255),mt_rand(200,255));
    }
    //画验证码

    public function createCode(){
        $this->code = "";
        for($i=1;$i<=$this->size;$i++){
            $this->code.=chr(mt_rand(97,122));
        }
    }
    public function getCode(){
        return $this->code;
    }
    public function drawCode(){
        for($i=0;$i< $this->size;$i++){
            $color =  imagecolorallocate($this->img,mt_rand(0,125),mt_rand(0,125),mt_rand(0,125));
            imagettftext($this->img,17,mt_rand(0,37),15+$i*30,$this->height/2+5,$color,"./Adorable.TTF",$this->code[$i]);//20字体大小，角度mt_rand(0,90)
        }
    }
    public function drawCode1(){
        for($i=0;$i< $this->size;$i++){
            $color =  imagecolorallocate($this->img,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255));
            imagettftext($this->img,18,mt_rand(0,90),20+$i*30,mt_rand(0,$this->height/1.5),$color,"./Adorable.TTF","*");//20字体大小，角度mt_rand(0,90)
        }
    }

    public function drawCode2(){
        for($i=0;$i< $this->size;$i++){
            $color =  imagecolorallocate($this->img,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255));
            imagearc($this->img, 20+$i*30,  mt_rand(0,$this->height/1.5),  50,  50,mt_rand(0,10), mt_rand(10,90), $color);//bool imagearc ( resource $image , int $cx , int $cy , int $w , int $h , int $s , int $e , int $color )
        }
    }

    public function drawCode3(){
        for($i=0;$i< $this->size;$i++){
            $color =  imagecolorallocate($this->img,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255));
            imagettftext($this->img,18,mt_rand(0,90),20+$i*30,mt_rand(0,$this->height/1.5),$color,"./Adorable.TTF","-");//20字体大小，角度mt_rand(0,90)
        }
    }
    //析构方法

    public function __destruct()
    {
        imagedestroy($this->img); //img实在内存当中的资源 imagedestroy释放内存
    }

}