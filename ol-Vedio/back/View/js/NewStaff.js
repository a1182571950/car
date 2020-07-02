
$.ajax({
    url:"index.php?ctrl=StaffCtrl&do=showRole",
    type:"get",
    dataType:"json",
    success:function(res) {
        //console.log(res.data);
        var role = res.data;
        var editStr = showRole(role);
        $("#roleDiv").html(editStr);
    }

})

function showRole(data){
    var editStr = `<span>员工角色：</span><select name="a" id="sRid">`
    data.forEach(function(val,index){
        editStr+=`<option value="${val.rid}" name="a">${val.rName}</option>`

    })
    editStr+=  `</select>`;
    return editStr;
}

//员工名失焦
var flag1 = false;
var flag2 = false;
var flag3 = false;
$("#staffName").blur(function(){
    var r = /^[a-zA-Z0-9_-]{4,16}$/;
    if(!r.test($(this).val())){
        $("#noUserName").css("display","block");
        flag1 = false;
    }else{
        flag1 = true;
        $("#noUserName").css("display","none");
    }
})
$("#staffPwd").blur(function(){
    if($(this).val().length<6){
        $("#noPwd").css("display","block");
        flag2 = false;
    }else{
        flag2 = true;
        $("#noPwd").css("display","none");
    }
})
$("#staffPwd2").blur(function(){
    if($(this).val() !== $("#staffPwd").val()){
        $("#noPwd2").css("display","block");
        flag3 = false;
    }else{
        flag3 = true;
        $("#noPwd2").css("display","none");
    }
})
//点击确认添加
$("#appNewStaff_but").click(function(){
    if(flag1&&flag2&&flag3){
        var staffName = $("#staffName").val();
        var staffPwd = $("#staffPwd2").val();
        var sRid = $("#sRid").val();
        var staffObj = {
            staffName:staffName,
            staffPwd:staffPwd,
            sRid:sRid
        }
        layui.use('layer', function(){
            $.ajax({
                url:"index.php?ctrl=StaffCtrl&do=appNewStaff",
                type:"post",
                data:staffObj,
                dataType:"text",
                success:function(res){
                    if(res==1){
                        layer.msg('添加成功');
                    }else{
                        layer.msg('添加失败');
                    }
                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
        })
    }else{
        alert("请认真填写信息");
    }
})