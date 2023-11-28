######share_token1
if(getVar("地址").length>1&&getVar("地址")!="null"){
if(getVar("地址").indexOf("aliyundrive.com/s/")!=-1||getVar("地址").indexOf("alipan.com/s/")!=-1||getVar("地址").indexOf("share_id-")!=-1){
    if(getVar("地址").indexOf("aliyundrive.com/s/")!=-1||getVar("地址").indexOf("alipan.com/s/")!=-1){
    var share_id=getVar("地址").match(/\.com\/s\/([0-9a-zA-Z]+)/)[1];
    }else if(getVar("地址").indexOf("share_id-")!=-1){
    var share_id=getVar("地址").split("$$")[0].split("share_id-")[1];
    }
    if(getVar("pwd")!="null"&&getVar("pwd").length>1){
        var pwd=getVar("pwd");
    }else{
        if(getVar("地址").split("$$")[2]){
            var pwd=getVar("地址").split("$$")[2];
        }else{
        var pwd="";
        }
    }
    if(getVar("share_token")!="null"&&getVar("share_token").length>1){
    getVar("share_token");
    }else{
    JSON.parse(getHttp(JSON.stringify({url:"https://api.aliyundrive.com/v2/share_link/get_share_token",postJson:JSON.stringify({share_pwd:pwd,share_id:share_id})}))).share_token;
    }
}else if(getVar("地址").indexOf("$$")!=-1){
    "";
}else{
    alert("请输入完整的阿里云盘分享链接,比如https://www.aliyundrive.com/s/wUFXj7116uS");
}
}else{
  "";
}
######目录重组数据root2
if(getVar("地址")&&getVar("地址").length>1&&getVar("地址")!="null"){
if(getVar("地址").indexOf("aliyundrive.com/s/")!=-1||getVar("地址").indexOf("alipan.com/s/")!=-1){
    var xxx_id="share_id-"+getVar("地址").match(/\.com\/s\/([0-9a-zA-Z]+)/)[1];
    var file_id="root";
}else if(getVar("地址").indexOf("$$")!=-1){
    var xxx_id=getVar("地址").split("$$")[0];
    var file_id=getVar("地址").split("$$")[1];
}
if(getVar("pwd")!="null"&&getVar("pwd").length>1){
    var pwd=getVar("pwd");
}else{
    if(getVar("地址").split("$$")[2]){
        var pwd=getVar("地址").split("$$")[2];
    }else{
    var pwd="";
    }
}
}else{
    //我的云盘
var cm=android.webkit.CookieManager.getInstance();
var ALICOOKIE=cm.getCookie("www.aliyundrive.com");
if(readStr("阿里默认账号.txt")){
    var ALICOOKIE=e2Rex(readStr("阿里默认账号.txt"),".json(alicookie).dn64()")
}
if(ALICOOKIE&&ALICOOKIE!="null"&&ALICOOKIE.indexOf("access_token")!=-1&&ALICOOKIE.indexOf("refresh_token")!=-1){
var refresh_token=ALICOOKIE.match(/refresh_token=(.*?)[\s;]/)[1];
var code=getHttp(JSON.stringify({url:"https://auth.aliyundrive.com/v2/account/token",postJson:JSON.stringify({refresh_token:refresh_token,grant_type:"refresh_token"})}));
if(JSON.parse(code).access_token){
var access_token=JSON.parse(code).access_token;
var xxx_id="drive_id-"+ALICOOKIE.match(/drive_id=(.*?)[\s;]/)[1];
var file_id="root";
}else{
    alert("登陆已过期，请重新在m浏览器登陆");
}
}else{
alert("请重新登陆阿里云盘网页");
}
}
if(xxx_id.indexOf("share_id")!=-1){
    var HEAD=JSON.stringify({"X-Share-Token":getVar("share_token")});
    var data=JSON.stringify({share_id:xxx_id.split("-")[1],parent_file_id:file_id,limit: 200,all:true,url_expire_sec:86400,image_thumbnail_process:"image/resize,w_160/format,jpeg",image_url_process:"image/resize,w_1920/format,jpeg",video_thumbnail_process:"video/snapshot,t_1000,f_jpg,ar_auto,w_300",order_by:"name",order_direction:"ASC"});
}else if(xxx_id.indexOf("drive_id")!=-1){
    var cm=android.webkit.CookieManager.getInstance();
var ALICOOKIE=cm.getCookie("www.aliyundrive.com");
if(readStr("阿里默认账号.txt")){
    var ALICOOKIE=e2Rex(readStr("阿里默认账号.txt"),".json(alicookie).dn64()")
}
if(ALICOOKIE&&ALICOOKIE!="null"&&ALICOOKIE.indexOf("access_token")!=-1&&ALICOOKIE.indexOf("refresh_token")!=-1){
var refresh_token=ALICOOKIE.match(/refresh_token=(.*?)[\s;]/)[1];
var code=getHttp(JSON.stringify({url:"https://auth.aliyundrive.com/v2/account/token",postJson:JSON.stringify({refresh_token:refresh_token,grant_type:"refresh_token"})}));
if(JSON.parse(code).access_token){
var access_token=JSON.parse(code).access_token;
}else{
    alert("登陆已过期，请重新在m浏览器登陆");
}
if(readStr("aliyunKEY")){
    var HEAD=JSON.stringify({"Authorization":access_token});
    var data=JSON.stringify({drive_id:xxx_id.split("-")[1],parent_file_id:file_id,limit:100,all:true,url_expire_sec:14400,image_thumbnail_process:"image/resize,w_160/format,jpeg",image_url_process:"image/resize,w_1920/format,jpeg",video_thumbnail_process:"video/snapshot,t_1000,f_jpg,ar_auto,w_300",order_by:"name ASC",query:"name match \""+readStr("aliyunKEY")+"\""});
    writeStr("aliyunKEY","");
}else{
    var HEAD=JSON.stringify({"Authorization":access_token});
    var data=JSON.stringify({drive_id:xxx_id.split("-")[1],parent_file_id:file_id,limit:200,all:true,url_expire_sec:14400,image_thumbnail_process:"image/resize,w_160/format,jpeg",image_url_process:"image/resize,w_1920/format,jpeg",video_thumbnail_process:"video/snapshot,t_1000,f_jpg,ar_auto,w_300",order_by:"name",order_direction:"ASC"});
}
}else{
alert("请重新登陆阿里云盘网页");
}
}
if(data.indexOf("query")!=-1){
    var 目录数据=getHttp(JSON.stringify({url:"https://api.aliyundrive.com/adrive/v3/file/search",head:JSON.parse(HEAD),postJson:data}));
}else{
    var 目录数据=getHttp(JSON.stringify({url:"https://api.aliyundrive.com/adrive/v3/file/list",head:JSON.parse(HEAD),postJson:data}));
}
var items=JSON.parse(目录数据).items;
function SIZE(size){
    size=(size/1024).toFixed(2);
    if(size>1024){
        size=size/1024;
        if(size>1024){
            size=size/1024;
            if(size>1024){
                size=size/1024;
                return size.toFixed(1)+"T";
            }else{
                return size.toFixed(1)+"G";
            }
        }else{
            return size.toFixed(1)+"M";
        }
    }else{
        return size+"Kb";
    }
}
if(JSON.parse(目录数据).items){
    if(xxx_id.indexOf("share_id")!=-1){
        for(var i in items){
           if(items[i].category=="video"||items[i].category=="doc"||items[i].category=="image"){
           items[i].tugourl="q:"+items[i].category+"?url=share_id-"+items[i].share_id+"$$"+items[i].file_id+"$$"+pwd+"$$"+getVar("地址").split("$$")[3];
           if(items[i].thumbnail){
            items[i].thumbnail=items[i].thumbnail+"@{'User-Agent':'Mozilla/5.0','Referer':'https://www.aliyundrive.com/'}";
           }else{
            items[i].thumbnail="res://document.png";
           }
           items[i].文件类型="<font color='red'><b>["+items[i].file_extension+"文件]</b></font>";
           items[i].size=SIZE(items[i].size);
           }else if(items[i].type=="folder"){
            if(file_id=="root"){
                FNAME=";";
            }else{
                FNAME=getVar("地址").split("$$")[3];
            }
            items[i].tugourl="q:root?url=share_id-"+items[i].share_id+"$$"+items[i].file_id+"$$"+pwd+"$$"+FNAME+items[i].name+";";
            items[i].文件类型="<font color='red'><b>[文件夹]</b></font>";
            items[i].thumbnail="res://folder.png";
            items[i].size=SIZE(items[i].size);
           }else{
           items[i].tugourl="q:video?url=share_id-"+items[i].share_id+"$$"+items[i].file_id+"$$"+pwd;
           items[i].文件类型="<font color='red'><b>["+items[i].file_extension+"文件]</b></font>";
           items[i].thumbnail="res://otherfile.png";
           items[i].size=SIZE(items[i].size);
           }
        }
    }else if(xxx_id.indexOf("drive_id")!=-1){
        for(var i in items){
            if(items[i].category=="video"||items[i].category=="doc"||items[i].category=="image"){
            items[i].tugourl="q:"+items[i].category+"?url=drive_id-"+items[i].drive_id+"$$"+items[i].file_id+"$$"+getVar("地址").split("$$")[2];
            if(items[i].thumbnail){
                items[i].thumbnail=items[i].thumbnail+"@{'User-Agent':'Mozilla/5.0','Referer':'https://www.aliyundrive.com/'}";
            }else{
                items[i].thumbnail="res://document.png";
            }
            items[i].文件类型="<font color='red'><b>["+items[i].file_extension+"文件]</b></font>";
            items[i].size=SIZE(items[i].size);
            }else if(items[i].type=="folder"){
                if(file_id=="root"){
                    FNAME=";";
                }else{
                    FNAME=getVar("地址").split("$$")[2];
                }
            items[i].tugourl="q:root?url=drive_id-"+items[i].drive_id+"$$"+items[i].file_id+"$$"+FNAME+items[i].name+";";
            items[i].文件类型="<font color='red'><b>[文件夹]</b></font>";
            items[i].thumbnail="res://folder.png";
            items[i].size=SIZE(items[i].size);
            }else{
            items[i].tugourl="q:video?url=drive_id-"+items[i].drive_id+"$$"+items[i].file_id;
            items[i].文件类型="<font color='red'><b>["+items[i].file_extension+"文件]</b></font>";
            items[i].thumbnail="res://otherfile.png";
            items[i].size=SIZE(items[i].size);
            }
        }
    }
    JSON.stringify(items);
}else if(JSON.parse(目录数据).code=="ShareLinkTokenInvalid"){
    alert("来晚了，该分享已失效");
}
######历史记录3
eval(readStr("QJS"));
var filename='阿里云历史记录.txt';
var 记录=[];
if(getVar("标题")&&getVar("地址")&&getVar("标题")!='null'&&getVar("地址").indexOf("$$root")==-1){
var title=getVar("标题");
var url=getVar("地址");
var img=getVar("图片");
var type=getVar("作者");
var detail=getVar("简介");
记录.push({title:title,tugourl:url,img:img,type:type,detail:detail});
if(readStr(filename)){
var 新记录=记录.concat(JSON.parse(readStr(filename)).filter(d=>d.tugourl!=记录[0].tugourl));
}else{
var 新记录=记录;
}
writeStr(filename,JSON.stringify(新记录));
}
######读取历史4
eval(readStr("QJS"));
var filename='阿里云历史记录.txt';
readStr(filename);
######alicookie5
alert("快去首页安装新版吧");
######过滤非视频6
function 过滤非视频(item) {
    if(item.mime_type){
        return item.mime_type.indexOf("video")!=-1||item.category=="video"||item.category=="audio";
    }else{
        return item.category=="video"||item.category=="audio";
    }
}
var 过滤=JSON.parse(getVar("目录重组数据")).filter(过滤非视频);
/*过滤.sort(function(a,b){
    var 前=a.name.replace(/\(\d\)/g,"").replace(/[^\d]+/g, "")
    var 后=b.name.replace(/\(\d\)/g,"").replace(/[^\d]+/g, "")
    return parseInt(前)-parseInt(后);
    });*/
for(var i in 过滤){
if(过滤[i].tugourl.indexOf("drive_id")!=-1){
    过滤[i].tugourl="http://ip111.cn/?wd="+过滤[i].url+"###"+过滤[i].drive_id+"###"+过滤[i].file_id+"###"+过滤[i].file_extension+"###"+过滤[i].category+"###"+过滤[i].name;
}else{
    过滤[i].tugourl="http://ip111.cn/?wd="+过滤[i].thumbnail+"$$"+过滤[i].share_id+"$$"+过滤[i].file_id+"$$"+过滤[i].file_extension+"$$"+过滤[i].category+"$$"+getVar("地址").split("$$")[2]+"$$"+getVar("地址").split("$$")[3]+"$$"+过滤[i].parent_file_id+"$$"+过滤[i].name;
}
}
JSON.stringify(过滤);
######视频地址7
eval(readStr("QJS"));
if(getVar("地址").indexOf("$$")!=-1){
    var cm=android.webkit.CookieManager.getInstance();
    var ALICOOKIE=cm.getCookie("www.aliyundrive.com");
    if(readStr("阿里默认账号.txt")){
        var ALICOOKIE=e2Rex(readStr("阿里默认账号.txt"),".json(alicookie).dn64()")
    }
    if(ALICOOKIE&&ALICOOKIE.indexOf("access_token")!=-1&&ALICOOKIE.indexOf("refresh_token")!=-1&&ALICOOKIE.indexOf("user_id")!=-1){
        //
        var pwd=getVar("地址").split("?wd=")[1].split("$$")[5];
        var share_id=getVar("地址").split("?wd=")[1].split("$$")[1];
        var refresh_token=ALICOOKIE.match(/refresh_token=(.*?)[\s;]/)[1];
        var mydrive_id=ALICOOKIE.match(/drive_id=(.*?)[\s;]/)[1];
        var user_id=ALICOOKIE.match(/user_id=(.*?)[\s;]/)[1];
        var device_id=ALICOOKIE.match(/device_id=(.*?)[\s;]/)[1];
        if(device_id.length<32){
            device_id=e2Rex(user_id,".md5()")
        }
        var d = [];
        var A=JSON.stringify({url:"https://auth.aliyundrive.com/v2/account/token",postJson:JSON.stringify({refresh_token:refresh_token,grant_type:"refresh_token"})});
        var S=JSON.stringify({url:"https://api.aliyundrive.com/v2/share_link/get_share_token",postJson:JSON.stringify({share_pwd:pwd,share_id:share_id})});
        var urls = []; //网址列表
        urls[0]=A;urls[1]=S;
        for (let index = 0; index < urls.length; index++) {
          function fn(i) {
            return function () {
                 //这里改成你想要进行的操作
               var code = getHttp(urls[i]);
               return code //这里改成你自己想要的返回 没有返回删掉这行就行
            };
          }
          d.push(fn(index));
        }
        var result = []; //result为每个线程运行后返回的结果集
        var s = _.submit(d, 2); //n 改为你想开启的线程数
        for (let i = 0; i < s.length; i++) {
          for (let z of s[i].get()) {
            result.push(z);
          }
        }
        //
        var Acode=result[0];var Scode=result[1];
        var share_token=JSON.parse(Scode).share_token;
        if(JSON.parse(Acode).access_token){
           var access_token=JSON.parse(Acode).access_token;
        }else{
            alert("登陆已过期，请重新在浏览器登陆");
        }
    }else{
        alert("COOKIE缺失,请重新安装新版脚本并重新登陆阿里云盘网页");
    }
    var file_id=getVar("地址").split("?wd=")[1].split("$$")[2];
    var 后缀=getVar("地址").split("?wd=")[1].split("$$")[3];
    var 类型=getVar("地址").split("?wd=")[1].split("$$")[4];
    var videoname=getVar("地址").split("?wd=")[1].split("$$")[8];
    var u=getVar("地址").split("?wd=")[1].split("$$")[0];
    if(类型=="audio"){
    var code=getHttp(JSON.stringify({url:"https://api.aliyundrive.com/adrive/v2/file/get_share_link_download_url",head:{"Authorization":access_token,"X-Share-Token":share_token},postJson:JSON.stringify({share_id:share_id,get_audio_play_info:true,file_id:file_id,expire_sec:600})}));
    }else{
    var code=getHttp(JSON.stringify({url:"https://api.aliyundrive.com/adrive/v2/file/get_share_link_download_url",head:{"Authorization":access_token,"X-Share-Token":share_token},postJson:JSON.stringify({share_id:share_id,file_id:file_id,expire_sec:600})}));
    }
    if(JSON.parse(code).code){
        alert("登陆已过期，请重新在浏览器登陆");
    }else{
    if(JSON.parse(code).audio_template_list){
        //var resp=JZ(JSON.stringify({url:JSON.parse(code).audio_template_list[JSON.parse(code).audio_template_list.length-1].url,redirect:false,head:{"Referer":"https://www.aliyundrive.com/"}}));
        var 转码HQ='http://42.202.35.113:3000/apis/yun-audio/'+file_id+'/'+share_id+'/'+access_token+'/'+share_token+'/HQ/master.mp3';
        var 本地转码HQ='http://127.0.0.1:3000/apis/yun-audio/'+file_id+'/'+share_id+'/'+access_token+'/'+share_token+'/HQ/master.mp3';
        var 播放模式=getVar("播放模式")||"全部";
        if(播放模式=="全部"||播放模式=="null"){
            JSON.stringify([{name:"原始文件",url:JSON.parse(code).audio_template_list[JSON.parse(code).audio_template_list.length-1].url,head:{"Authorization":access_token,"Referer":"https://www.aliyundrive.com/"}},{name:"高音质转码",url:转码HQ,head:{"Referer":"https://www.aliyundrive.com/"}},{name:"本地高音质转码",url:本地转码HQ,head:{"Referer":"https://www.aliyundrive.com/"}}]);
        }else if(播放模式=="本地转码"){
            JSON.stringify([{name:"原始文件",url:JSON.parse(code).audio_template_list[JSON.parse(code).audio_template_list.length-1].url,head:{"Authorization":access_token,"Referer":"https://www.aliyundrive.com/"}},{name:"本地高音质转码",url:本地转码HQ,head:{"Referer":"https://www.aliyundrive.com/"}}]);
        }else{
            JSON.stringify([{name:"原始文件",url:JSON.parse(code).audio_template_list[JSON.parse(code).audio_template_list.length-1].url,head:{"Authorization":access_token,"Referer":"https://www.aliyundrive.com/"}},{name:"高音质转码",url:转码HQ,head:{"Referer":"https://www.aliyundrive.com/"}}]);
        }
        
    }else{
         //var rz=JZ(JSON.stringify({url:JSON.parse(code).download_url,redirect:false,head:{"Referer":"https://www.aliyundrive.com/","User-Agent":"Aliapp(AYSD/4.1.2)","Authorization":access_token}}));
            /*var file_data={};
            var 路径=getVar("地址").split("?wd=")[1].split("$$")[6];
            var 最后文件夹名=路径.split(";")[路径.split(';').length-2];
            file_data.parent_name=路径+最后文件夹名;
            file_data.folder_id=getVar("地址").split("?wd=")[1].split("$$")[7];
            file_data.file_id=file_id;file_data.share_id=share_id;file_data.share_pwd=pwd;file_data.expiration="";
            file_data.file_name=getVar("地址").split("?wd=")[1].split("$$")[8];
            var _d=e2Rex(encodeURI(JSON.stringify(file_data)),".en64()").replace(/\//g,"$");*/
            //var 转码1080='http://116.85.31.19:4000/apis/yun-play/'+_d+'/'+access_token+'/'+share_token+'/FHD/index.m3u8';
            //var 转码720='http://116.85.31.19:4000/apis/yun-play/'+_d+'/'+access_token+'/'+share_token+'/HD/index.m3u8';
            //var 转码1080='http://42.202.35.113:3000/apis/yun-play/'+share_id+'/'+file_id+'/'+access_token+'/'+share_token+'/FHD/'+mydrive_id+'/'+user_id+'/'+device_id+'/index.m3u8';
            var 转码2K会员专享='http://42.202.35.113:3000/apis/yun-play/'+share_id+'/'+file_id+'/'+access_token+'/'+share_token+'/QHD/'+mydrive_id+'/'+user_id+'/'+device_id+'/index.m3u8';
            var 转码720='http://42.202.35.113:3000/apis/yun-play/'+share_id+'/'+file_id+'/'+access_token+'/'+share_token+'/HD/'+mydrive_id+'/'+user_id+'/'+device_id+'/index.m3u8';
            var 本地转码2K会员专享='http://127.0.0.1:3000/apis/yun-play/'+share_id+'/'+file_id+'/'+access_token+'/'+share_token+'/QHD/'+mydrive_id+'/'+user_id+'/'+device_id+'/index.m3u8';
            
            var 播放模式=getVar("播放模式")||"全部";
            if(播放模式=="全部"||播放模式=="null"){
                JSON.stringify([{name:"原画",url:JSON.parse(code).download_url,head:{"Authorization":access_token,"Referer":"https://www.aliyundrive.com/"}},{name:"本地高画质转码(会员2K)",url:本地转码2K会员专享,head:{"Referer":"https://www.aliyundrive.com/"}},{name:"720P转码",url:转码720,head:{"Referer":"https://www.aliyundrive.com/"}},{name:"高画质转码(会员2K)",url:转码2K会员专享,head:{"Referer":"https://www.aliyundrive.com/"}}]);
            }else if(播放模式=="本地转码"){
                JSON.stringify([{name:"原画",url:JSON.parse(code).download_url,head:{"Authorization":access_token,"Referer":"https://www.aliyundrive.com/"}},{name:"本地高画质转码(会员2K)",url:本地转码2K会员专享,head:{"Referer":"https://www.aliyundrive.com/"}}]);
            }else{
                JSON.stringify([{name:"高画质转码(会员2K)",url:转码2K会员专享,head:{"Referer":"https://www.aliyundrive.com/"}},{name:"720P转码",url:转码720,head:{"Referer":"https://www.aliyundrive.com/"}}]);
            }
    }
    }
}else{
var 类型=getVar("地址").split("?wd=")[1].split("###")[4];
var videoname=getVar("地址").split("?wd=")[1].split("###")[5];
var playurl=getVar("地址").split("?wd=")[1].split("###")[0];
var cm=android.webkit.CookieManager.getInstance();
var ALICOOKIE=cm.getCookie("www.aliyundrive.com");
if(readStr("阿里默认账号.txt")){
    var ALICOOKIE=e2Rex(readStr("阿里默认账号.txt"),".json(alicookie).dn64()")
}
if(ALICOOKIE.indexOf("access_token")!=-1&&ALICOOKIE.indexOf("refresh_token")!=-1){
var refresh_token=ALICOOKIE.match(/refresh_token=(.*?)[\s;]/)[1];
var code=getHttp(JSON.stringify({url:"https://auth.aliyundrive.com/v2/account/token",postJson:JSON.stringify({refresh_token:refresh_token,grant_type:"refresh_token"})}));
if(JSON.parse(code).access_token){
var access_token=JSON.parse(code).access_token;
var mydrive_id=ALICOOKIE.match(/drive_id=(.*?)[\s;]/)[1];
var user_id=ALICOOKIE.match(/user_id=(.*?)[\s;]/)[1];
var device_id=ALICOOKIE.match(/device_id=(.*?)[\s;]/)[1];
if(device_id.length<32){
    device_id=e2Rex(user_id,".md5()")
}
var HEAD=JSON.stringify({"Authorization":access_token});
    if(类型=="audio"){
    /*var file_id=getVar("地址").split("?wd=")[1].split("###")[2];
    var drive_id=getVar("地址").split("?wd=")[1].split("###")[1];*/
    var file_id=getVar("地址").split("?wd=")[1].split("###")[2];
    var drive_id=getVar("地址").split("?wd=")[1].split("###")[1];
    var u=getVar("地址").split("?wd=")[1].split("###")[0];
    var xincode=getHttp(JSON.stringify({url:"https://api.aliyundrive.com/adrive/v1/file/get_path",postJson:JSON.stringify({drive_id:drive_id,file_id:file_id}),head:JSON.parse(HEAD)}));
    var 转码HQ='http://42.202.35.113:3000/apis/my-yun-audio/'+file_id+'/'+drive_id+'/'+access_token+'/'+user_id+'/'+device_id+'/LQ/master.mp3';
    var 本地转码HQ='http://127.0.0.1:3000/apis/my-yun-audio/'+file_id+'/'+drive_id+'/'+access_token+'/'+user_id+'/'+device_id+'/LQ/master.mp3';
    var 播放模式=getVar("播放模式")||"全部";
    if(播放模式=="全部"||播放模式=="null"){
    JSON.stringify([{name:"原始文件",url:JSON.parse(xincode).items[0].download_url,head:{"Authorization":access_token,"Referer":"https://www.aliyundrive.com/"}},{name:"LQ低音质转码",url:转码HQ,head:{"Referer":"https://www.aliyundrive.com/"}},{name:"本地LQ低音质转码",url:本地转码HQ,head:{"Referer":"https://www.aliyundrive.com/"}}]);
    }else if(播放模式=="本地转码"){
        JSON.stringify([{name:"原始文件",url:JSON.parse(xincode).items[0].download_url,head:{"Authorization":access_token,"Referer":"https://www.aliyundrive.com/"}},{name:"本地LQ低音质转码",url:本地转码HQ,head:{"Referer":"https://www.aliyundrive.com/"}}]);
    }else{
        JSON.stringify([{name:"原始文件",url:JSON.parse(xincode).items[0].download_url,head:{"Authorization":access_token,"Referer":"https://www.aliyundrive.com/"}},{name:"LQ低音质转码",url:转码HQ,head:{"Referer":"https://www.aliyundrive.com/"}}]);
    }
    }else{
        var file_id=getVar("地址").split("?wd=")[1].split("###")[2];
        var drive_id=getVar("地址").split("?wd=")[1].split("###")[1];
        var u=getVar("地址").split("?wd=")[1].split("###")[0];
        var xincode=getHttp(JSON.stringify({url:"https://api.aliyundrive.com/adrive/v1/file/get_path",postJson:JSON.stringify({drive_id:mydrive_id,file_id:file_id}),head:JSON.parse(HEAD)}));
        //alert(code)
        //var 转码1080='http://116.85.31.19:4000/apis/my-yun-play/'+file_id+'/'+drive_id+'/'+access_token+'/FHD/index.m3u8';
        //var 转码720='http://116.85.31.19:4000/apis/my-yun-play/'+file_id+'/'+drive_id+'/'+access_token+'/HD/index.m3u8';
        //var 云端原画='http://42.202.35.113:3000/apis/down-url/'+file_id+'/'+drive_id+'/'+access_token+'/'+user_id+'/'+device_id+'/index.m3u8';
        var 高画质转码='http://42.202.35.113:3000/apis/my-yun-play/'+file_id+'/'+drive_id+'/'+access_token+'/QHD/index.m3u8';
        var 本地高画质转码='http://127.0.0.1:3000/apis/my-yun-play/'+file_id+'/'+drive_id+'/'+access_token+'/QHD/index.m3u8';
        var 转码720='http://42.202.35.113:3000/apis/my-yun-play/'+file_id+'/'+drive_id+'/'+access_token+'/HD/index.m3u8';
        //var downloadurl='http://198.52.118.199:3000/apis/my-yun-play/'+file_id+'/'+drive_id+'/'+access_token+'/alidownloadurl/'+mydrive_id+'/'+user_id+'/'+device_id+"/"+videoname;
        //var 新原画code=getHttp(downloadurl)
        var 播放模式=getVar("播放模式")||"全部";
            if(播放模式=="全部"||播放模式=="null"){
                JSON.stringify([{name:"原画",url:JSON.parse(xincode).items[0].download_url,head:{"Authorization":access_token,"Referer":"https://www.aliyundrive.com/"}},{name:"本地高画质转码",url:本地高画质转码,head:{"Referer":"https://www.aliyundrive.com/"}},{name:"720P转码",url:转码720,head:{"Referer":"https://www.aliyundrive.com/"}},{name:"高画质转码",url:高画质转码,head:{"Referer":"https://www.aliyundrive.com/"}}]);
            }else if(播放模式=="本地转码"){
                JSON.stringify([{name:"原画",url:JSON.parse(xincode).items[0].download_url,head:{"Authorization":access_token,"Referer":"https://www.aliyundrive.com/"}},{name:"本地高画质转码",url:本地高画质转码,head:{"Referer":"https://www.aliyundrive.com/"}}]);
            }else{
                JSON.stringify([{name:"高画质转码",url:高画质转码,head:{"Referer":"https://www.aliyundrive.com/"}},{name:"720P转码",url:转码720,head:{"Referer":"https://www.aliyundrive.com/"}}]);
            }
    }
}else{
    alert("登陆已过期，请重新在浏览器登陆");
}
}else{
alert("请重新登陆阿里云盘网页");
}
}
######文档预览8
var cm=android.webkit.CookieManager.getInstance();
var ALICOOKIE=cm.getCookie("www.aliyundrive.com");
if(readStr("阿里默认账号.txt")){
    var ALICOOKIE=e2Rex(readStr("阿里默认账号.txt"),".json(alicookie).dn64()")
}
    if(ALICOOKIE.indexOf("access_token")!=-1&&ALICOOKIE.indexOf("refresh_token")!=-1){
        var refresh_token=ALICOOKIE.match(/refresh_token=(.*?)[\s;]/)[1];
        var Acode=getHttp(JSON.stringify({url:"https://auth.aliyundrive.com/v2/account/token",postJson:JSON.stringify({refresh_token:refresh_token,grant_type:"refresh_token"})}));
        if(JSON.parse(Acode).access_token){
           var access_token=JSON.parse(Acode).access_token;
        }else{
            alert("登陆已过期，请重新在浏览器登陆");
        }
    }else{
        alert("请重新登陆阿里云盘网页");
    }
var xxx_id=getVar("地址").split("$$")[0];
var file_id=getVar("地址").split("$$")[1];
if(xxx_id.indexOf("share_id")!=-1){
    var HEAD=JSON.stringify({"Authorization":access_token,"X-Share-Token":getVar("share_token")});
    var data=JSON.stringify({share_id:xxx_id.split("-")[1],file_id:file_id});
}else if(xxx_id.indexOf("drive_id")!=-1){
    var HEAD=JSON.stringify({"Authorization":access_token});
    var data=JSON.stringify({drive_id:xxx_id.split("-")[1],file_id:file_id});
}
var code=getHttp(JSON.stringify({url:"https://api.aliyundrive.com/v2/file/get_office_preview_url",head:JSON.parse(HEAD),postJson:data}));
if(JSON.parse(code).code){
  if(JSON.parse(code).code=="NotSupportedFileType"){
    alert("此文档格式不支持预览");
  }else{
    alert("登陆已过期，请重新在浏览器登陆");
  }
}else{
var url=JSON.parse(code).preview_url+"??"+JSON.parse(code).access_token;
var name=getVar("标题");
JSON.stringify([{name:name,url:url}]);
}
######搜索链接9
[
    {"title":"阿里盘搜","url":"https://www.alipansou.com/search?k="},
    {"title":"奈斯搜索","url":"https://www.niceso.fun/search/?q="},
    {"title":"大盘搜","url":"https://dapanso.com/search?page=1&type=&keyword="},
    {"title":"UP云搜","url":"https://www.upyunso.com/search.html?page=1&keyword="},
    {"title":"云盘资源网","url":"https://www.yunpanziyuan.com/fontsearch.htm?fontname="},
    {"title":"云盘资源分享社区","url":"https://alyunpan.com/?q="},
    {"title":"阿里小站","url":"https://www.pan666.cn/?q="},
    {"title":"霸王龙影库","url":"https://t-rex.tzfile.com/?s="},
    {"title":"TG_云盘资源发布","url":"https://tx.me/s/sharealiyun?q="},
    {"title":"TG_云盘盘","url":"https://tx.me/s/yunpanpan?q="},
    {"title":"TG_云盘影视共享","url":"https://tx.me/s/alypysgx?q="},
    {"title":"TG_V云盘","url":"https://tx.me/s/aliyun69?q="},
    {"title":"TG_云盘资源共享","url":"https://tx.me/s/aliyunziyuanfenxiang?q="},
    {"title":"TG_WAYOU资源","url":"https://tx.me/s/wayouziyuan?q="},
    {"title":"TG_影视必应阁","url":"https://tx.me/s/moviebyg?q="},
    {"title":"TG_4K影视资源","url":"https://tx.me/s/remux_2160p?q="},
    {"title":"TG_蓝光影音","url":"https://tx.me/s/voidrss?q="},
    {"title":"TG_阿里云影视","url":"https://tx.me/s/aliyunys?q="},
    {"title":"小纸条","url":"https://u.gitcafe.net/?wd="}
]
######多链接10
if(getVar("url")&&getVar("url")!="null"){
if(getVar("url").indexOf("aliyundrive.com/s/")!=-1||getVar("url").indexOf("alipan.com/s/")!=-1){
var list=getVar("url").match(/[\s\S]*?https:\/\/www\.ali.+?\.com\/s\/.*/g);
var items=[];
for(var i in list){
    var title=list[i].replace(/\s/g,"").replace(/<.+?>/g,"").split("https://")[0]||"加个标题吧，能从历史记录找到我";
    var share_id=list[i].match(/\.com\/s\/([0-9a-zA-Z]+)/)[1];
    if(list[i].search(/\/s\/.+?\/folder\/.+/)!=-1){
        file_id=list[i].match(/\.com\/s\/.+?\/folder\/([0-9a-zA-Z]+)/)[1];
    }else{
        file_id="root";
    }
    if(list[i].indexOf("提取码")!=-1){
        var pwd=list[i].match(/提取码.*?([0-9a-zA-Z]+)/)[1];
    }else if(list[i].indexOf("密码")!=-1){
        var pwd=list[i].match(/密码.*?([0-9a-zA-Z]+)/)[1];
    }else{
        var pwd="";
    }
    var url="q:root?url=share_id-"+share_id+"$$"+file_id+"$$"+pwd;
    items.push({name:title,url:url,detail:url});
}
JSON.stringify(items);
}else if(getVar("url").indexOf("stariverpan.com/web/share/")!=-1){
    if(getVar("url").indexOf("ushare.stariverpan.com/web/share/")!=-1){
        var list=getVar("url").match(/[\s\S]*?https:\/\/.+?\.stariverpan\.com\/web\/.+/g);
        var items=[];
        try{
            var ipfstoken=JSON.parse(readStr("当前ipfs配置")).token;
        }catch(e){
            alert("未添加ipfs配置")
        }
        for(var i in list){
        if(list[i].indexOf("提取码")!=-1){
            var pwd=list[i].match(/提取码.*?([0-9a-zA-Z]+)/)[1];
        }else if(list[i].indexOf("密码")!=-1){
            var pwd=list[i].match(/密码.*?([0-9a-zA-Z]+)/)[1];
        }else{
            var pwd="";
        }
        var title=list[i].replace(/\s/g,"").replace(/<.+?>/g,"").split("https://")[0]||"加个标题吧，能从历史记录找到我";
        var share_id=e2Rex(list[i].match(/shareId=([0-9a-zA-Z]+)/)[1],".dn64()");
        var url="q:ipfsshareinfo?tugourl="+ipfstoken+"$$usb-"+share_id+"$$"+pwd;
        items.push({name:title,url:url,detail:url});
        }
        JSON.stringify(items);
    }else{
    var list=getVar("url").match(/[\s\S]*?https:\/\/.+?\.stariverpan\.com\/web\/.+/g);
    var items=[];
    try{
        var ipfstoken=JSON.parse(readStr("当前ipfs配置")).token;
    }catch(e){
        alert("未添加ipfs配置")
    }
    for(var i in list){
        var title=list[i].replace(/\s/g,"").replace(/<.+?>/g,"").split("https://")[0]||"加个标题吧，能从历史记录找到我";
        var share_id=e2Rex(list[i].match(/shareId=([0-9a-zA-Z]+)/)[1],".dn64()");
        var postdata=JSON.stringify({id:share_id});
        var HEAD=JSON.stringify({"Authorization":"Bearer "+ipfstoken});
        var code=getHttp(JSON.stringify({url:"https://productapi.stariverpan.com/cmsprovider/v2.0/cloud/checkShareId",head:JSON.parse(HEAD),postJson:postdata}));
        if(JSON.parse(code).data){
            var pwd=JSON.parse(code).data;
        }else{
            var pwd="";
        }
        var url="q:ipfsshareinfo?tugourl="+ipfstoken+"$$"+share_id+"$$"+pwd;
        items.push({name:title,url:url,detail:url});
    }
    JSON.stringify(items);
    }
}else{
    alert("请输入完整分享链接");
}
}else{
    alert("请输入分享链接");
}
######图片预览11
var cm=android.webkit.CookieManager.getInstance();
var ALICOOKIE=cm.getCookie("www.aliyundrive.com");
if(readStr("阿里默认账号.txt")){
    var ALICOOKIE=e2Rex(readStr("阿里默认账号.txt"),".json(alicookie).dn64()")
}
    if(ALICOOKIE.indexOf("access_token")!=-1&&ALICOOKIE.indexOf("refresh_token")!=-1){
        var refresh_token=ALICOOKIE.match(/refresh_token=(.*?)[\s;]/)[1];
        var Acode=getHttp(JSON.stringify({url:"https://auth.aliyundrive.com/v2/account/token",postJson:JSON.stringify({refresh_token:refresh_token,grant_type:"refresh_token"})}));
        if(JSON.parse(Acode).access_token){
           var access_token=JSON.parse(Acode).access_token;
        }else{
            alert("登陆已过期，请重新在浏览器登陆");
        }
    }else{
        alert("请重新登陆阿里云盘网页");
    }
var xxx_id=getVar("地址").split("$$")[0];
var file_id=getVar("地址").split("$$")[1];
if(xxx_id.indexOf("share_id")!=-1){
    var HEAD=JSON.stringify({"Authorization":access_token,"X-Share-Token":getVar("share_token")});
    var data=JSON.stringify({share_id:xxx_id.split("-")[1],file_id:file_id,expire_sec:600});
    var code=getHttp(JSON.stringify({url:"https://api.aliyundrive.com/v2/file/get_share_link_download_url",head:JSON.parse(HEAD),postJson:data}));
if(JSON.parse(code).code){
alert(JSON.parse(code).code)
}else{
var url=JSON.parse(code).url+'@{"Referer":"https://www.aliyundrive.com/"}';
JSON.stringify([{url:url}]);
}
}else if(xxx_id.indexOf("drive_id")!=-1){
    var 过滤=JSON.parse(getVar("目录重组数据")).filter(item=>item.category=="image");
    var items=[];
for(var i in 过滤){
    var url=过滤[i].url+'@{"Referer":"https://www.aliyundrive.com/"}';
    items.push({url:url});
}
JSON.stringify(items);
}
######QJS12
KGZ1bmN0aW9uKCl7dmFyIF89e307dmFyIG09MS4wO3ZhciByPWFuZHJvaWQub3MuRW52aXJvbm1lbnQuZ2V0RXh0ZXJuYWxTdG9yYWdlRGlyZWN0b3J5KCk7dmFyIHM9YW5kcm9pZC53ZWJraXQuTWltZVR5cGVNYXAuZ2V0U2luZ2xldG9uKCk7dmFyIHQ9amF2YS5pbzt2YXIgdT1qYXZhLmxhbmc7dmFyIHY9dC5GaWxlLnNlcGFyYXRvcjt2YXIgdz1wYXRoKCkrdisnRG93bmxvYWQnK3YrJ3FtJyt2K2luZm8oKS5zaWduLnN1YnN0cmluZygwLDQpKyckJCQnK2luZm8oKS5uYW1lK3Y7aXNTdHJpbmc9KHZhbCk9PnR5cGVvZiB2YWw9PT0nc3RyaW5nJztmdW5jdGlvbiBpc09iamVjdChhKXtjb25zdCB0eXBlPXR5cGVvZiBhO3JldHVybiBhIT1udWxsJiYodHlwZT09J29iamVjdCd8fHR5cGU9PSdmdW5jdGlvbicpfXZhciB5PWphdmEudXRpbC5jb25jdXJyZW50O3ZhciB6PW5ldyB5LkV4ZWN1dG9ycy5uZXdDYWNoZWRUaHJlYWRQb29sKCk7ZnVuY3Rpb24gdGhyZWFkKGEpe29iaj17Y2FsbDpmdW5jdGlvbigpe3JldHVybiBhKCl9LH07dmFyIGI9bmV3IHkuRnV0dXJlVGFzayhvYmopO3ouc3VibWl0KGIpO3JldHVybiBifWZ1bmN0aW9uIGNodW5rKGEsYil7bGV0IGluZGV4PTA7bGV0IHJlcz1bXTt3aGlsZShpbmRleDxhLmxlbmd0aCl7cmVzLnB1c2goYS5zbGljZShpbmRleCxpbmRleCtiKSk7aW5kZXgrPWJ9cmV0dXJuIHJlcy5maWx0ZXIoKG8pPT5vLmxlbmd0aD4wKX1mdW5jdGlvbiBzdWJtaXQobCxuKXtjPVtdO2xpc3Q9Y2h1bmsobCxsLmxlbmd0aC9uKTt2YXIgbj0wO3doaWxlKG48bGlzdC5sZW5ndGgpe2Z1bmN0aW9uIGwoeCl7cmV0dXJuIGZ1bmN0aW9uIG8oKXt2YXIgYT1bXTtmb3IobGV0IGk9MDtpPGxpc3RbeF0ubGVuZ3RoO2krKyl7YS5wdXNoKGxpc3RbeF1baV0oKSl9cmV0dXJuIGF9fWMucHVzaCh0aHJlYWQobChuKSkpO24rK31yZXR1cm4gY31mdW5jdGlvbiBta2RpcnMoZil7dmFyIGE9Zi5nZXRQYXJlbnRGaWxlKCk7aWYoIWEuZXhpc3RzKCkpYS5ta2RpcnMoKX1mdW5jdGlvbiB3cml0ZShhLGIpe3ZhciBjPW5ldyB0LkZpbGUodysn5pWw5o2uJyt2K2IpO21rZGlycyhjKTt2YXIgZD1uZXcgdC5GaWxlV3JpdGVyKGMsZmFsc2UpO2Qud3JpdGUoYSk7ZC5jbG9zZSgpfWZ1bmN0aW9uIHJlYWQoYSl7dmFyIGI9bmV3IHQuRmlsZSh3KyfmlbDmja4nK3YrYSk7dmFyIGM9MDtpZighYi5leGlzdHMoKXx8KGM9Yi5sZW5ndGgoKSk9PTApcmV0dXJuJyc7dmFyIGQ9dS5yZWZsZWN0LkFycmF5Lm5ld0luc3RhbmNlKHUuQnl0ZS5UWVBFLGMpO3ZhciBlPW5ldyB0LkZpbGVJbnB1dFN0cmVhbShiKTtlLnJlYWQoZCk7ZS5jbG9zZSgpO3JldHVybiBuZXcgdS5TdHJpbmcoZCl9dmFyIEE9UGFja2FnZXMub3JnLmpzb3VwO3ZhciBCPUEuQ29ubmVjdGlvbi5NZXRob2Q7ZnVuY3Rpb24gaHR0cChvKXtsZXR7dXJsLGhlYWRlcixwYXJhbXMsanNvbixjaGFyc2V0LG1ldGhvZCxyZX09bzt2YXIgYT1BLkpzb3VwLmNvbm5lY3QodXJsKTthLmlnbm9yZUNvbnRlbnRUeXBlKHRydWUpO2EucG9zdERhdGFDaGFyc2V0KGNoYXJzZXQpO2EubWF4Qm9keVNpemUoMTA0ODU3NjAwMCk7cmU9PT1mYWxzZT9hLmZvbGxvd1JlZGlyZWN0cyhyZSk6YS5mb2xsb3dSZWRpcmVjdHModHJ1ZSk7aWYoaXNPYmplY3QoaGVhZGVyKSlmb3IoeCBpbiBoZWFkZXIpYS5oZWFkZXIoeCxoZWFkZXJbeF0pO2lmKGlzT2JqZWN0KHBhcmFtcykpe2lmKGpzb249PT10cnVlKWEucmVxdWVzdEJvZHkocGFyYW1zKTtlbHNlIGZvcihwIGluIHBhcmFtcylhLmRhdGEocCxwYXJhbXNbcF0pfXZhciBiO2lmKGpzb249PT10cnVlfHxtZXRob2Q9PSdwb3N0JyliPWEubWV0aG9kKEIuUE9TVCkuZXhlY3V0ZSgpO2Vsc2UgYj1hLm1ldGhvZChCLkdFVCkuZXhlY3V0ZSgpO3JldHVybiBifWZ1bmN0aW9uIGh0dHBCb2R5KGEsYil7YS5jaGFyc2V0KGIpO3JldHVybiBhLmJvZHkoKX1mdW5jdGlvbiBodHRwQ29va2llKGEsYil7cmV0dXJuIGIrJz0nK2EuY29va2llKGIpfWZ1bmN0aW9uIGh0dHBDb29raWVzKGEpe3ZhciBiPScnO3ZhciBjPWEuY29va2llcygpLmVudHJ5U2V0KCkuaXRlcmF0b3IoKTt3aGlsZShjLmhhc05leHQoKSl7dmFyIGQ9Yy5uZXh0KCk7Yis9ZC5nZXRLZXkoKSsnPScrZC5nZXRWYWx1ZSgpKyc7J31yZXR1cm4gYn1mdW5jdGlvbiBodHRwSGVhZGVyKGEsYil7cmV0dXJuIGEuaGVhZGVyKGIpfWZ1bmN0aW9uIGh0dHBIZWFkZXJzKGEpe3ZhciBiPScnO3ZhciBjPWEuaGVhZGVycygpLmVudHJ5U2V0KCkuaXRlcmF0b3IoKTt3aGlsZShjLmhhc05leHQoKSl7dmFyIGQ9Yy5uZXh0KCk7Yis9ZC5nZXRLZXkoKSsnPScrZC5nZXRWYWx1ZSgpKyc7J31yZXR1cm4gYn1mdW5jdGlvbiB0cmltVShhKXt2YXIgYj1hLmxhc3RJbmRleE9mKCcvJyk7aWYoYS5sZW5ndGgoKT09YisxKXthPWEuc3Vic3RyaW5nKDAsYik7cmV0dXJuIHRyaW1VKGEpfXJldHVybiBhLnN1YnN0cmluZygwLGEubGFzdEluZGV4T2YoJy4nKSl9ZnVuY3Rpb24gZG93bmxvYWQobyl7dHJ5e2xldHtzZXRwYXRoLHRpcHN9PW87dmFyIGE9aHR0cChvKTt2YXIgYj10cmltVShhLnVybCgpLnRvU3RyaW5nKCkpO3ZhciBjPXMuZ2V0RXh0ZW5zaW9uRnJvbU1pbWVUeXBlKGEuY29udGVudFR5cGUoKS5zcGxpdCgnOycpWzBdKTt2YXIgZD1iLnN1YnN0cmluZyhiLmxhc3RJbmRleE9mKCcvJykrMSkrJy4nK2M7c2F2ZXBhdGg9aXNTdHJpbmcoc2V0cGF0aCk/c2V0cGF0aCt2K2Q6dysn5LiL6L29Jyt2K2Q7dmFyIGY9YS5ib2R5U3RyZWFtKCk7dmFyIGc9bmV3IHUucmVmbGVjdC5BcnJheS5uZXdJbnN0YW5jZSh1LkJ5dGUuVFlQRSw0MDk2KTt2YXIgaD0wO3ZhciBpPW5ldyB0LkJ5dGVBcnJheU91dHB1dFN0cmVhbSgpO3doaWxlKChoPWYucmVhZChnKSkhPS0xKXtpLndyaXRlKGcsMCxoKX12YXIgaj1uZXcgdC5GaWxlKHNhdmVwYXRoKTtta2RpcnMoaik7dmFyIGs9bmV3IHQuRmlsZU91dHB1dFN0cmVhbShqKTtrLndyaXRlKGkudG9CeXRlQXJyYXkoKSk7aWYodGlwcz09PWZhbHNlKXJldHVybiBzYXZlcGF0aDt0b2FzdCgn5LiL6L295oiQ5Yqf77yM6Lev5b6EOicrc2F2ZXBhdGgpO3JldHVybiBzYXZlcGF0aH1jYXRjaChlKXtlcnJvcihlKTt0b2FzdCgn5LiL6L295aSx6LSlLOivt+aJk+W8gOiwg+ivleWPsOafpeeci+WFt+S9k+W8guW4uOS/oeaBrycpfWZpbmFsbHl7aWYoaSE9bnVsbClpLmNsb3NlKCk7aWYoayE9bnVsbClrLmNsb3NlKCk7aWYoZiE9bnVsbClmLmNsb3NlKCl9fWZ1bmN0aW9uIGVycm9yKGUpe2lzU3RyaW5nKGUpP+aKpemUmShlKTrmiqXplJkoZS50b1N0cmluZygpKX1mdW5jdGlvbiB0b2FzdChhKXthbGVydChhKX1mdW5jdGlvbiBiYWNrKCl7bmV3IFBhY2thZ2VzLmFuZHJvaWQuYXBwLkluc3RydW1lbnRhdGlvbigpLnNlbmRLZXlEb3duVXBTeW5jKDQpfWZ1bmN0aW9uIHBhdGgoKXtyZXR1cm4gci5nZXRBYnNvbHV0ZVBhdGgoKS50b1N0cmluZygpfWZ1bmN0aW9uIHNsZWVwKGEpe2phdmEubGFuZy5UaHJlYWQuc2xlZXAoYSl9ZnVuY3Rpb24gaW5mbygpe289e307by5zaWduPWUyUmV4KGdldFZhcignUU1JTkZPJyksJy5nZXQoc2lnbikudCgpJyk7by52ZXJzaW9uPWUyUmV4KGdldFZhcignUU1JTkZPJyksJy5nZXQodmVyc2lvbikudCgpJyk7by5uYW1lPWUyUmV4KGdldFZhcignUU1JTkZPJyksJy5nZXQobmFtZSkudCgpJyk7cmV0dXJuIG99Xy5WRVJTSU9OPW07Xy5yZWFkPXJlYWQ7Xy53cml0ZT13cml0ZTtfLnNsZWVwPXNsZWVwO18udGhyZWFkPXRocmVhZDtfLnN1Ym1pdD1zdWJtaXQ7Xy5jaHVuaz1jaHVuaztfLmJhY2s9YmFjaztfLmlzU3RyaW5nPWlzU3RyaW5nO18uaHR0cD1odHRwO18uYmQ9aHR0cEJvZHk7Xy5jaz1odHRwQ29va2llO18uY2tzPWh0dHBDb29raWVzO18uaGQ9aHR0cEhlYWRlcjtfLmhkcz1odHRwSGVhZGVycztfLmRvd25sb2FkPWRvd25sb2FkO18uaW5mbz1pbmZvO18udG9hc3Q9dG9hc3Q7Xy5lcnJvcj1lcnJvcjt0aGlzLl89X30uY2FsbCh0aGlzKSk7
######直播选集列表13
eval(readStr("QJS"));
function read(path) {
    var b = new java.io.File(path);
    var c = 0;
    if (!b.exists() || (c = b.length()) == 0) return '';
    var d = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, c);
    var e = new java.io.FileInputStream(b);
    e.read(d);
    e.close();
    return new java.lang.String(d)
}
    var path=getVar("地址").split("?tugourl=")[1].split("$tugopath$")[0];
    var code=read(path);
    function 选集列表(){
        var res={};var items=[];
        var d = [];
        for (let index = 0; index < 分类.length; index++) {
                function fn(i) {
                  return function () {
            var 分类CODE=分类[i];
            var 列表=e2Arr(分类CODE,列表规则).filter(Boolean);
            if(线路){
            var 标题=e2Rex(线路[i],标题规则);
            }else{
            var 标题=e2Rex(分类CODE,标题规则);
            }
            var LIST=[];
            for(let j=0;j<列表.length;j++){
                let 选集=e2Rex(列表[j],选集规则);
                let 选集地址=e2Rex(列表[j],选集地址规则);
                LIST.push({title:选集,url:"http://ip111.cn/?wd="+选集地址.replace(/\?/g,"幻魔快修")});
            }
        return {title:标题,list:LIST};
        };
        }
        d.push(fn(index));
      }
      var s = _.submit(d, 分类.length); //n 改为你想开启的线程数
      for (let i = 0; i < s.length; i++) {
        for (let z of s[i].get()) {
            /*let LIST=z.list;
            var addLIST = [{title:LIST[0].title, url: LIST[0].url}];
            LIST.forEach((item, index)=>{
            addLIST.forEach((item2, index2) => {
            if (item.title == item2.title) {
                addLIST[index2].url += "#"+item.url.split("ip111.cn/?wd=")[1];
            } else {
                addLIST.push(item);
            }
            })
            });
            z.list=addLIST;*/
          if(z.list.length/100 > 1){
            var zz=[];
            for (let j = 0; j < z.list.length;){
                zz.push(z.list.slice(j, j+=100));
            }
            for(let k=0;k<zz.length;k++){
                /*let 尾=(k+1)*100;
                let 头=尾-100+1;
                if(尾>z.list.length){
                    尾=z.list.length;
                }*/
                items.push({title:z.title+"|"+zz[k][0].title,list:zz[k]});
            }
          }else{
            items.push(z);
          }
        }
      }
        res.data=items;
        var et=e2Rex("null",".time()");
        e3('提示框("重组数据完成'+(et-st)+'毫秒")')
        return JSON.stringify(res);
    }
    if(code.indexOf("#genre#")!=-1){
        var st=e2Rex("null",".time()");
        var 分类=code.split(/.+#genre#.*/g).filter(item=>item.indexOf("://")!=-1);
        var 线路=code.match(/.+#genre#.*/g);
        var 列表规则=".z(.+?,.+?://.+)";
        var 标题规则=".tz(,#genre#)";
        var 选集地址规则=".ty(,)";
        var 选集规则=".tz(,)";选集列表();
    }else if(code.indexOf("#EXTINF:")!=-1){
        var st=e2Rex("null",".time()");
        var code=code.match(/#EXTINF:.+[\s]+[^#"]+?:\/\/.+/g);
        var res={};var items=[];var d=[];
        for (let index = 0; index < code.length; index++) {
            function fn(i) {
              return function () {
                if(code[i].indexOf(",")!=-1){
                    var 选集=code[i].match(/,(.*)/)[1]||"无选集名称";var 选集地址=code[i].match(/,.*[\s]+(.+)/)[1]||"无播放地址";
                }else{
                    var 选集=code[i].match(/.+"(.*)/)[1]||"无选集名称";var 选集地址=code[i].match(/.+[\s]+(.+)/)[1]||"无播放地址";
                }
        if(code[i].search(/group-title=".*?"/)!=-1){
            var type=code[i].match(/group-title="(.*?)"/)[1]||"不规范分类";
        }else{
            var type="未分类";
        }
        var 当前条目=[];当前条目.push({title:选集,url:"http://ip111.cn/?wd="+选集地址.replace(/\?/g,"幻魔快修")});
            return {title:type,list:当前条目};
        };
        }
        d.push(fn(index));
      }
    var s=_.submit(d, code.length); //n 改为你想开启的线程数
    for (let i = 0; i < s.length; i++) {
        for (let z of s[i].get()) {
            /*let LIST=z.list;
            var addLIST = [{title:LIST[0].title, url: LIST[0].url}];
            LIST.forEach((item, index)=>{
            addLIST.forEach((item2, index2) => {
            if (item.title == item2.title) {
                addLIST[index2].url += "#"+item.url.split("ip111.cn/?wd=")[1];
            } else {
                addLIST.push(item);
            }
            })
            });
            z.list=addLIST;*/
            if(items.length==0) {
                items.push(z);
            }else{
                let 寻找=items.some(item=>{
                //判断类型，有就添加到当前项
                  if(item.title == z.title&&item.list.length<100){
                  item.list=item.list.concat(z.list);
                  return true
                  }
                });
                if (!寻找) {
                //如果没找相同类型添加一个类型
                items.push(z);
                }
            }
        }
      }
    res.data=items;
    var et=e2Rex("null",".time()");
    e3('提示框("重组数据完成'+(et-st)+'毫秒")')
    JSON.stringify(res);
    }else if(code.search(/\$c_start.+?\$c_end/)!=-1){
        var st=e2Rex("null",".time()");
        var 分类=code.split(/\$c_start.+\$c_end/).filter(item=>item.indexOf("://")!=-1);
        var 线路=code.match(/\$c_start.+\$c_end/g);
        var 列表规则=".z(.+?,.+?://.+)";
        var 标题规则=".ty(c_start).tz($c_end)";
        var 选集地址规则=".ty(,)";
        var 选集规则=".tz(,)";选集列表();
    }else{
        var st=e2Rex("null",".time()");
        var code=code.match(/.+?,.+?:\/\/.+/g);
        var res={};var items=[];var d=[];
        for (let index = 0; index < code.length; index++) {
            function fn(i) {
              return function () {
        var 选集=code[i].match(/(.+),/)[1];var 选集地址=code[i].match(/,[\s]*?(.+)/)[1];
        if(code[i].indexOf("|")!=-1){
            var type=选集.split("|")[0];
            var 选集标题=选集.split("|")[1];
        }else{
            var type=getVar("标题")+"-无子分类";
            var 选集标题=选集;
        }
        var 当前条目=[];当前条目.push({title:选集标题,url:"http://ip111.cn/?wd="+选集地址.replace(/\?/g,"幻魔快修")});
        return {title:type,list:当前条目};
    };
    }
    d.push(fn(index));
    }
    var s=_.submit(d, code.length); //n 改为你想开启的线程数
    for (let i = 0; i < s.length; i++) {
    for (let z of s[i].get()) {
        /*let LIST=z.list;
        var addLIST = [{title:LIST[0].title, url: LIST[0].url}];
            LIST.forEach((item, index)=>{
            addLIST.forEach((item2, index2) => {
            if (item.title == item2.title) {
                addLIST[index2].url += "#"+item.url.split("ip111.cn/?wd=")[1];
            } else {
                addLIST.push(item);
            }
            })
            });
        z.list=addLIST;*/
        if(items.length==0) {
            items.push(z);
        }else{
            let 寻找=items.some(item=>{
            //判断类型，有就添加到当前项
              if(item.title == z.title&&item.list.length<100){
              item.list=item.list.concat(z.list);
              return true
              }
            });
            if (!寻找) {
            //如果没找相同类型添加一个类型
            items.push(z);
            }
        }
    }
    }
    res.data=items;
    var et=e2Rex("null",".time()");
    e3('提示框("重组数据完成'+(et-st)+'毫秒")')
    JSON.stringify(res);
    }
######直播免嗅探14
var uu=getVar("地址").split("/?wd=")[1].replace(/幻魔快修/g,"?");
if(uu.indexOf("#")!=-1){
var urls=uu.split("#");
var items=[];
for(var i=0;i<urls.length;i++){
    if(urls[i].indexOf(".php")!=-1){
        var resp = JZ(JSON.stringify({ url: urls[i], redirect: false }));
        var u = resp.head.Location || resp.head.location;
        if(!u){
            u=urls[i]+"&type=.m3u8";
        }
    }else if(urls[i].indexOf("mitv://")!=-1){
        var u=urls[i].replace("mitv://","P2p://");
    }else if(urls[i].indexOf("www.youtube.com/watch?v=")!=-1){
        var resp=getHttp(JSON.stringify({url:"https://www.azrotv.com/extras/youtube/",post:{"url":urls[i]}}));
        var u=e2Rex(resp,".get(textarea).t()");
    }else{
        var u=urls[i];
    }
    items.push({name:"地址"+(i+1),url:u}); 
}
JSON.stringify(items);
}else{
    if(uu.indexOf(".php")!=-1){
        var resp=JZ(JSON.stringify({url:uu,redirect:false}));
        var u=resp.head.Location||resp.head.location;
        if(!u){
            u=uu+"&type=.m3u8";
        }
    }else if(uu.indexOf("mitv://")!=-1){
        var u=uu.replace("mitv://","P2p://");
    }else if(uu.indexOf("www.youtube.com/watch?v=")!=-1){
        var resp=getHttp(JSON.stringify({url:"https://www.azrotv.com/extras/youtube/",post:{"url":uu}}));
        var u=e2Rex(resp,".get(textarea).t()");
    }else{
        var u=uu;
    }
JSON.stringify({name:"地址",url:u});
}