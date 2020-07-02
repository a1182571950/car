export default{
	// 计算当前日期星座
	getHoroscope(date) {
	  let c = ['摩羯','水瓶','双鱼','白羊','金牛','双子','巨蟹','狮子','处女','天秤','天蝎','射手','摩羯']
	  date=new Date(date);
	  let month = date.getMonth() + 1;
	  let day = date.getDate();
	  let startMonth = month - (day - 14 < '865778999988'.charAt(month));
	  return c[startMonth]+'座';
	},
	// 计算指定时间与当前的时间差
	sumAge(data){
		let dateBegin = new Date(data.replace(/-/g, "/"));
		let dateEnd = new Date();//获取当前时间
		let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
		let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
		let leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
		let hours=Math.floor(leave1/(3600*1000))//计算出小时数
		//计算相差分钟数
		let leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
		let minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
		//计算相差秒数
		let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
		let seconds=Math.round(leave3/1000)
		return dayDiff+"天 "+hours+"小时 ";
	},
	// 获取聊天时间（相差300s内的信息不会显示时间）
	getChatTime(v1,v2){
		v1=v1.toString().length<13 ? v1*1000 : v1;
		v2=v2.toString().length<13 ? v2*1000 : v2;
		if(((parseInt(v1)-parseInt(v2))/1000) > 300){
			return this.gettime(v1);
		}
	},
	// 人性化时间格式
	gettime(shorttime){
		shorttime=shorttime.toString().length<13 ? shorttime*1000 : shorttime;
		let now = (new Date()).getTime();
		let cha = (now-parseInt(shorttime))/1000;
		
		if (cha < 43200) {
			// 当天
			return this.dateFormat(new Date(shorttime),"{A} {t}:{ii}");
		} else if(cha < 518400){
			// 隔天 显示日期+时间
			return this.dateFormat(new Date(shorttime),"{Mon}月{DD}日 {A} {t}:{ii}");
		} else {
			// 隔年 显示完整日期+时间
			return this.dateFormat(new Date(shorttime),"{Y}-{MM}-{DD} {A} {t}:{ii}");
		}
	},
	
	parseNumber(num) {
		return num < 10 ? "0" + num : num;
	},
	 
	dateFormat(date, formatStr) {
		let dateObj = {},
			rStr = /\{([^}]+)\}/,
			mons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
		 
		dateObj["Y"] = date.getFullYear();
		dateObj["M"] = date.getMonth() + 1;
		dateObj["MM"] = this.parseNumber(dateObj["M"]);
		dateObj["Mon"] = mons[dateObj['M'] - 1];
		dateObj["D"] = date.getDate();
		dateObj["DD"] = this.parseNumber(dateObj["D"]);
		dateObj["h"] = date.getHours();
		dateObj["hh"] = this.parseNumber(dateObj["h"]);
		dateObj["t"] = dateObj["h"] > 12 ? dateObj["h"] - 12 : dateObj["h"];
		dateObj["tt"] = this.parseNumber(dateObj["t"]);
		dateObj["A"] = dateObj["h"] > 12 ? '下午' : '上午';
		dateObj["i"] = date.getMinutes();
		dateObj["ii"] = this.parseNumber(dateObj["i"]);
		dateObj["s"] = date.getSeconds();
		dateObj["ss"] = this.parseNumber(dateObj["s"]);
	 
		while(rStr.test(formatStr)) {
			formatStr = formatStr.replace(rStr, dateObj[RegExp.$1]);
		}
		return formatStr;
	},
	// 获取年龄
	getAgeByBirthday(data){
		let birthday=new Date(data.replace(/-/g, "\/")); 
		let d=new Date(); 
		return d.getFullYear()-birthday.getFullYear()-((d.getMonth()<birthday.getMonth()|| d.getMonth()==birthday.getMonth() && d.getDate()<birthday.getDate())?1:0);
	},
	// 格式化时间戳
	formatTime(time){
		if (!time) return '';
		time = time.toString().length<13 ?  Number(time)*1000 : Number(time);
		var nowTime = new Date(time);
		var year = nowTime.getFullYear();
		var month = nowTime.getMonth()+1;
		if(month<10){
			month = "0"+month;
		}
		var day = nowTime.getDate();
		if(day<10){
			day = "0"+day;
		}
		var hours = nowTime.getHours();
		if(hours<10){
			hours = "0"+hours;
		}
		var minutes = nowTime.getMinutes();
		if(minutes<10){
			minutes = "0"+minutes;
		}
		var seconds = nowTime.getSeconds();
		if(seconds<10){
			seconds = "0"+seconds;
		}
		var resStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		return resStr;
	},
	// 坐标转化
	gcj02tobd09(lng, lat) {
		var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
		var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
		var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
		var bd_lng = z * Math.cos(theta) + 0.0065;
		var bd_lat = z * Math.sin(theta) + 0.006;
		return {bd_lng, bd_lat}
	}
}