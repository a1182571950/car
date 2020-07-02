layui.use('laydate', function(){
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#sel_div1' //指定元素
        ,type: 'month'
        ,range: '~'
    });
});

//点击确认查询
$("#button1").click(function(){
    //计算两个日期相差的月份
    var time = $("#sel_div1").val();
    if(time == ''){
        alert("请选择日期");
        return;
    }
    var timeArr = time.split("~");
    var startTime = timeArr[0].trim();
    var endTime = timeArr[1].trim();
    var query = $("#sel_div3").val();
    var startTimeArr = startTime.split("-");
    var endTimeArr = endTime.split("-");
    var startTimeY = startTimeArr[0];
    var startTimeM = startTimeArr[1];
    var endTimeY = endTimeArr[0];
    var endTimeM = endTimeArr[1];
    var months = (endTimeY-startTimeY)*12+(endTimeM-startTimeM);
    //console.log(months);
    if(query == "0"){
        alert("请选择查询的类别");
        return;
    }
    var timeObj = {
        "startTime":startTime,
        "endTime":endTime
    }
    switch (query){
        case '1':
            var dataArr = xAxisoObj(startTimeY,startTimeM,months);
            userNum(timeObj,dataArr);
            break;
        case '2':
            var dataArr = xAxisoObj(startTimeY,startTimeM,months);
            //console.log(dataArr);
            playNum(timeObj,dataArr);
            break;
        case '3':
            /*var dataArr = xAxisoClassifyObj();*/
            classifyPlayNum(timeObj);
            break;
        case '4':
            play10Num(timeObj);
            break;
    }
})
//月份
function xAxisoObj(startTimeY,startTimeM,months){
    var dataArr = [];
    var startTimeY = Number(startTimeY);
    var startTimeM = Number(startTimeM);
    if(startTimeM.toString().length < 2){
        var time =  `${startTimeY}-0${startTimeM}`;

    }else{
        var time =  `${startTimeY}-${startTimeM}`;
    }
    dataArr.push(time);
    //console.log(months);
    for(var i=0;i<months;i++){
        if(startTimeM<12){
            startTimeM++;
            //console.log(startTimeM);
        }else{
            startTimeY++;
            startTimeM = 1;
        }
        if(startTimeM.toString().length < 2){
            var time =  `${startTimeY}-0${startTimeM}`;

        }else{
            var time =  `${startTimeY}-${startTimeM}`;
        }
        dataArr.push(time);
    }
    //console.log(dataArr);
    return dataArr;
}

function seriesData(data,xAxisoData){
    var seriesDataArr = [];
    xAxisoData.forEach(function(val,index){
        var num = 0;
        data.forEach(function(val1,index1){
            if(val1.M == val){
                num = val1.num;
            }
        })
        seriesDataArr.push(num);
    })
    //console.log(seriesDataArr);
    return seriesDataArr;
}

//分类数据
function series1Data(data,xAxisoData){
    var seriesDataArr = [];
    xAxisoData.forEach(function(val,index){
        var num = 0;
        data.forEach(function(val1,index1){
            if(val1.clName == val){
                num = val1.num;
            }
        })
        seriesDataArr.push(num);
    })
    //console.log(seriesDataArr);
    return seriesDataArr;
}


//用户表
function userNum(timeObj,dataArr){
    //console.log(timeObj);
    $.ajax({
        url:"index.php?ctrl=CustomerCtrl&do=queryCustomer",
        type:"post",
        data:timeObj,
        dataType:"json",
        success:function(res){
            //console.log(res);
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '注册用户数据'
                },
                tooltip: {},
                legend: {
                    data:['用户数']
                },
                xAxis: {
                    data: dataArr,
                    axisLabel: {show: true,interval:0,rotate:40 },
                },
                yAxis: {},
                series: [{
                    name: '用户数',
                    type: 'bar',
                    data: seriesData(res.data,dataArr)
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
}

//获取总播放次数表
function playNum(timeObj,dataArr){
    $.ajax({
        url:"index.php?ctrl=ReportCtrl&do=queryPlaybackNum",
        type:"post",
        data:timeObj,
        dataType:"json",
        success:function(res){
            //console.log(res);
            //console.log(res);
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '视频播放总数'
                },
                tooltip: {},
                legend: {
                    data:['播放总数']
                },
                xAxis: {
                    data: dataArr,
                    axisLabel: {show: true,interval:0,rotate:40 },
                },
                yAxis: {},
                series: [{
                    name: '播放总数',
                    type: 'bar',
                    data: seriesData(res.data,dataArr)
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        error:function(){
            console.log("ajax连接失败");
        }

    })
}

//分类视频播放
function classifyPlayNum(timeObj){
    var dataArr = [];
    $.ajax({
        url:"index.php?ctrl=ClassifyCtrl&do=getClassify",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(res);
            res.data.forEach(function(val,index){
                if(val.gid>1&&val.gid<3){
                    dataArr.push(val.clName);
                }
            })
            $.ajax({
                url:"index.php?ctrl=ReportCtrl&do=queryClassifyPlayNum",
                type:"post",
                data:timeObj,
                dataType:"json",
                success:function(res){
                    //  console.log(res);
                    //console.log(res);
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('main'));
                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '分类视频播放'
                        },
                        tooltip: {},
                        legend: {
                            data:['播放总数']
                        },
                        xAxis: {
                            data: dataArr,
                            axisLabel: {show: true,interval:0,rotate:40 },
                        },
                        yAxis: {},
                        series: [{
                            name: '播放总数',
                            type: 'bar',
                            data: series1Data(res.data,dataArr)
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                },
                error:function(){
                    console.log("ajax连接失败");
                }

            })
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })

}

//前十播放视频
function play10Num(play10Num){
    var dataArr = [];
    var dataArr2 = [];
    $.ajax({
        url:"index.php?ctrl=ReportCtrl&do=queryPlayback10Num",
        type:"post",
        data:play10Num,
        dataType:"json",
        success:function(res){
            //console.log(res);
            //console.log(res);
            // 基于准备好的dom，初始化echarts实例
            res.data.forEach(function(val){
                dataArr.push(val.reName);
                dataArr2.push(val.num);
            })
            var myChart = echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '视频播放总数'
                },
                tooltip: {},
                legend: {
                    data:['播放总数']
                },
                xAxis: {
                    data: dataArr,
                    axisLabel: {show: true,interval:0,rotate:40 },
                },
                yAxis: {},
                series: [{
                    name: '播放总数',
                    type: 'bar',
                    data: dataArr2
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        error:function(){
            console.log("ajax连接失败");
        }

    })

}