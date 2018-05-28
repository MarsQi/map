export default {
    Format(fmt) {
        var date = new Date(fmt),
            Y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            H = date.getHours(),
            i = date.getMinutes(),
            s = date.getSeconds();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        var t = Y + '-' + m + '-' + d + '  ' + H + ':' + i + ':' + s
            // var t = Y + '-' + m + '-' + d;
        return t;
    },
    hms(bef, aft) {
        var date1 = new Date(bef)
        var date2 = new Date(aft);
        var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数 
        var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        var H = Math.floor(date3 / (60 * 60 * 1000));
        //计算相差分钟数  
        var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数  
        var minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数  
        var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数  
        var seconds = Math.round(leave3 / 1000);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        var t = H + '时' + minutes + '分' + seconds + "秒";
        return t;
    },
    echartTime(time) {
        var arr = time.split("");
        arr.splice(4, 0, "-");
        arr.splice(7, 0, "-");
        arr.splice(10, 0, "  ");
        arr.splice(13, 0, ":");
        var str = arr.join("");
        return str
    },
    farmingTime(value) {
        var arr = value.split("  ");
        var day = arr[0].split("-");
        var hoursArr = arr[1].split(":");
        var hours = Number(hoursArr[0]);
        if (Number(hoursArr[0]) == "00") {
            hoursArr[0] = 23;
            --day[2];
            if (day[2].toString().length == "1") {
                day[2] = "0" + day[2]
            }
        } else {
            --hoursArr[0]
        }
        if (Number(hoursArr[0]).toString().length == "1") {
            hoursArr[0] = "0" + hoursArr[0]
        }
        return day.join("-") + "  " + hoursArr.join(":")
    }
}