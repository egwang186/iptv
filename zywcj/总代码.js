######头部导航1
var URL=getVar("地址");
function 头部导航(){
var res={};var items=[];
if(列表[0]){
for(var j=0;j<列表.length;j++){
     var 标题=e2Rex(列表[j],标题规则)?e2Rex(列表[j],标题规则):e2Rex(列表[j],标题规则1);
     var 地址=e2Rex(列表[j],地址规则);
     分类地址=URL+前+地址+后;
     items.push({title:标题,url:分类地址});
}
}else{
    var 自定义数据="网红主播=20+偷拍自拍=21+麻豆原创=22+国产精品=23+名人明星=24+网曝门事件=25+无码专区=26+有码专区=27+福利姬=28+娇妻素人=29+强奸乱伦=30+制服职场=31+国模私拍=32+抖阴视频=33";
    var Arr=自定义数据.split("+");
    for(var i in Arr){
          var 标题=Arr[i].split("=")[0];var 地址=Arr[i].split("=")[1];
          分类地址=URL+前+地址+后;
     items.push({title:标题,url:分类地址});
    }
}
res.data=items;
return JSON.stringify(res);
}
var 源码=getCode();
if(源码.indexOf("<rss")!=-1){
var 列表=e2Arr(源码,".xml(class ty)");
var 标题规则=".t()";
var 地址规则=".a(id)";var 前="?ac=videolist&pg=#PN#&t=";var 后="";头部导航();
}else if(URL.indexOf("/vodd/json")!=-1){
var 列表=e2Arr(源码,".json(list)");
var 标题规则=".json(list_name).th( ##)";var 地址规则=".json(list_id)";var 前="?ac=videolist&pg=#PN#&t=";var 后="";头部导航();
}else if(URL.indexOf("?")!=-1){
var 列表=e2Arr(源码,".json(class)");
var 标题规则=".json(type_name)";var 地址规则=".json(type_id)";var 前="&ac=videolist&pg=#PN#&t=";var 后="";头部导航();      
}else{
var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(class)");
if(列表[0]){
      if(URL.indexOf("/videos")!=-1){
      var 标题规则=".json(type_name)";var 标题规则1=".json(type_title)";var 地址规则=".json(type_id)";var 前="?ac=list&pg=#PN#&t=";var 后="";头部导航();   
      }else{
      var 标题规则=".json(type_name)";var 标题规则1=".json(type_title)";var 地址规则=".json(type_id)";var 前="?ac=videolist&pg=#PN#&t=";var 后="";头部导航();
      }
}else{
var 前="?ac=videolist&pg=#PN#&t=";var 后="";头部导航();
}
}
######通用列表2
var baseURL=getVar("地址").split(/[?&]ac=.*?list/)[0];
var NEXTPAGE=Number(getVar("PN"))+1;
function 通用列表(){
var res={};var items=[];var LIST=[];
var LIMIT=列表.length;
for(var j=0;j<LIMIT;j++){
    var CODE=列表[j];
   var 地址=e2Rex(CODE,地址规则).indexOf("http")==0?e2Rex(CODE,地址规则):baseURL+e2Rex(CODE,地址规则);
    var 标题=e2Rex(CODE,标题规则);
    var 预图片=e2Rex(CODE,图片规则);
    if(预图片.indexOf("/mac:")!=-1){
    var 图片="http:"+预图片.split("mac:")[1];
    }else if(预图片.indexOf(".test.com")!=-1||预图片.indexOf(".maccms.com")!=-1||预图片.indexOf(".maccms.pro")!=-1){
    var 图片=getVar("地址").match(/https?:\/\/.+?\//)[0]+预图片.split(/img\.[a-z]+?\.[a-z]+/)[1];
    var 图片=图片.match(/.*(http.*)/)[1];
    }else if(预图片.indexOf("http")!=-1){
    var 图片=预图片.match(/.*(http.*[a-zA-Z])/)[1];
    }else if(预图片==""){
    var 图片="http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/kongbai.gif";
    }else if(预图片.indexOf("//")!=-1){
    var 图片="http:"+预图片;
    }else{
    var 图片=getVar("地址").match(/https?:\/\/.+?\//)[0]+预图片;
    }
    var 简介=e2Rex(CODE,简介规则);
    var 图片底部=e2Rex(CODE,图片底部规则);
    var 左上=e2Rex(CODE,左上规则);
    var 右上=e2Rex(CODE,右上规则);
   LIST.push({title:标题,url:地址,img:图片,detail:简介,td:图片底部,zs:左上,ys:右上});
}
var play_={};
play_.list=LIST;
items.push(play_);
res.data=items;
res.nextpage=getVar("前")+NEXTPAGE+getVar("后");
return JSON.stringify(res);
}
var 源码=getVar("源码");
if(源码.indexOf("<rss")!=-1){
var 列表=e2Arr(源码,".xml(list video)");
var 标题规则=".xml(name).ty(CDATA).tz2(])";
var 地址规则=".c(?ac=videolist&ids=).xml(id).z(\\d+)";
var 图片规则=".xml(pic).t().z(\\S.+\\S).th( ##%20)";
var 简介规则=".c(<font color='#0997F7'><b>).xml(dt).t().ct(</b></font>)";
var 图片底部规则=".xml(last).t()";
var 左上规则=".tx(<p style='background-color:#0997F7'><font color='white' size='40px'>).xml(type).t().ct(</font></p>)";
var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='white'>).xml(note).t().ct(</font></p>)";
通用列表();
}else if(baseURL.indexOf("/vodd/json")!=-1){
var 列表=e2Arr(源码,".json(data)");
var 标题规则=".json(vod_name)";var 地址规则=".c(?ac=videolist&ids=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font>)";var 图片底部规则=".json(vod_addtime)";var 左上规则=".tx(<p style='background-color:#0997F7'><font color='white' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='white'>).json(vod_type).ct(</font></p>)";通用列表();
}else if(baseURL.indexOf("?")!=-1){
var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(vod_name)";var 地址规则=".c(&ac=videolist&ids=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font>)";var 图片底部规则=".json(vod_time)";var 左上规则=".tx(<p style='background-color:#0997F7'><font color='white' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='white'>).json(vod_remarks).ct(</font></p>)";通用列表();
}else{
      if(baseURL.indexOf("/videos")!=-1){
      var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(vod_name)";var 地址规则=".c(?ac=detail&ids=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font>)";var 图片底部规则=".json(vod_time)";var 左上规则=".tx(<p style='background-color:#0997F7'><font color='white' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='white'>).json(vod_remarks).ct(</font></p>)";通用列表();   
      }else if(baseURL.indexOf("/provide/art/")!=-1){
            var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
            var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=detail&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font>).or().json(art_from).ct(</b></font>)";var 图片底部规则=".json(vod_time).or().json(art_time)";var 左上规则=".tx(<p style='background-color:#0997F7'><font color='white' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='white'>).json(vod_remarks).ct(</font></p>).or().json(vod_remark).ct(</font></p>).or().json(art_remarks).ct(</font></p>)";通用列表();
      }else{
      var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=videolist&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font>).or().json(art_from).ct(</b></font>)";var 图片底部规则=".json(vod_time).or().json(art_time)";var 左上规则=".tx(<p style='background-color:#0997F7'><font color='white' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='white'>).json(vod_remarks).ct(</font></p>).or().json(vod_remark).ct(</font></p>).or().json(art_remarks).ct(</font></p>)";通用列表();
      }
}
######选集列表3
var baseURL=getVar("地址");
function 选集列表(){
var res={};var items=[];var detail=[];
for(var i=0;i<分类.length;i++){
    var 分类CODE=分类[i];
    var 列表=e2Arr(分类CODE,列表规则).filter(Boolean);
    if(线路){
    var 标题=e2Rex(线路[i],标题规则);
    }else{
    var 标题=e2Rex(分类CODE,标题规则);
    }
    var LIST=[];
    for(var j=0;j<列表.length;j++){
        if(列表[j].indexOf("$")!=-1){
            var 选集=e2Rex(列表[j],选集规则);
            if(选集==""){
            选集=j+1;
            }
        }else{
          var 选集=j+1;
        }
        var 选集地址=e2Rex(列表[j],选集地址规则);
        if(选集地址.indexOf("http")>=0){
            选集地址=选集地址.match(/http.+/)[0];
        }
//开始根据网址，线路判断前缀
if(baseURL.indexOf("1080api.com")!=-1){
      选集地址="https://vo.1080jx.com:7788/player?url="+选集地址;
}else if(标题=="mdm3u8"){
      选集地址="https://m3u8.cmsv10.fun/?url="+选集地址;
}else if(baseURL.indexOf("hikan.xyz")!=-1){
      选集地址="https://www.dmplay.xyz/d?url="+选集地址;
}else if(baseURL.indexOf("xinlangapi.com")!=-1){
      选集地址="https://www.xinlangjiexi.com/m3u8/?url="+选集地址;
}else if(标题=="autue"){
      选集地址=e2Rex(选集地址,".dn64()");
}else if(选集地址.indexOf("html")!=-1||选集地址.indexOf("www.bilibili.com")!=-1||选集地址.indexOf("share.weiyun.")!=-1){
      选集地址="http://42.202.35.113:39000/?url="+选集地址;
}else if(选集地址.indexOf(":6688/player")!=-1){
      var hash=选集地址.split("player/")[1];
      var dd=hash.substring(0,2);
      选集地址="http://ip111.cn/?wd=https://qq.iqiyi3.b555b.com:7777/"+dd+"/"+hash+"/hd.m3u8";
}else if(baseURL.indexOf("api.yparse.com")!=-1){
      选集地址="https://yparse.jn1.cc/index.php?url="+选集地址;
}else if(标题.indexOf("rrm3u8")!=-1){
  选集地址="https://www.meiju11.com/ckplayerx/m3u8.php?url="+选集地址;
}else if(标题=="dmplay"||标题=="base"){
选集地址="https://play.omofun.tv/m3u8.php?url="+选集地址;
}else if(baseURL.indexOf("dianyingleida.com")!=-1){
  选集地址="https://player.fxfkfz.top/player/ec.php?code=qw&if=1&url="+选集地址;
}else if(选集地址.indexOf(".m3u8")>15||选集地址.indexOf(".mp4")>15){
      选集地址="http://ip111.cn/?wd="+选集地址;
}else if(标题=="789pan"||标题=="pll"){
      选集地址="http://dp.jiexi.work/jsonno.php?url="+选集地址;
}
//结束判断
        LIST.push({title:选集,url:选集地址});
    }
var play_={};
play_.title=标题;
play_.list=LIST;
items.push(play_);
}
detail.push({desc:简介});
res.data=items;
res.desc=detail;
return JSON.stringify(res);
}
if(getVar("源码").indexOf("<rss")!=-1){
var 分类=e2Arr(getVar("源码"),".get(dd)");
var 简介=e2Rex(getVar("源码"),".c(类型:).xml(type).c(<br>演员表:).xml(actor).c(<br>简介:).xml(des)");
var 列表规则=".z2(CDATA\\[\\([\\s\\S]*?\\)[#]*?\\]).fg(#)";
var 标题规则=".a(flag)";
var 选集规则=".tz($)";
var 选集地址规则=".z2(\\$\\([^\$|&]*\\)).or().z(.*)";选集列表();
}else{
if(baseURL.indexOf("/vodd/json")!=-1){
var 分类=e2Arr(getVar("源码"),".json(data).json(vod_play_url).fg(\\$\\$\\$)");
var 线路=e2Arr(getVar("源码"),".json(data).json(vod_play_from).fg(\\$\\$\\$)");
var 选集地址规则=".z2(\\$\\(.*\\)).or().z(.*)";
var 简介=e2Rex(getVar("源码"),".c(演员表:).json(data).json(vod_actor).c(<br>简介:).json(data).json(vod_content)");
var 列表规则=".fg(#)";
var 标题规则=".t()";
var 选集规则=".tz($)";选集列表();
}else{
      if(baseURL.indexOf("provide/art/")!=-1){
            if(e2Rex(getVar("源码").replace(/<.*?>/g,""),".json(list).json(art_content)")){ 
                  if(e2Rex(getVar("源码"),".json(list).json(art_content)").indexOf("<iframe")!=-1){
                        var 播放地址=e2Arr(getVar("源码"),".json(list).json(art_content).get(iframe)");
                        var 分类="";
                        for(var i in 播放地址){
                        分类=分类+"$$$"+e2Rex(播放地址[i],".a(src).z(http.+).tz(&)");
                        }
                        var 分类=e2Arr(分类,".fg(\\$\\$\\$)").filter(Boolean);
                  }else{
                        var 分类=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(art_content).fg(\\$\\$\\$)");
                  }
                  
            }else{
                  var 分类=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(art_blurb).fg(\\$\\$\\$)");
            }

var 线路=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(art_name).fg(\\$\\$\\$)");
var 选集地址规则=".z2(\\$\\(.*\\)).or().z(.*)";
var 简介=e2Rex(getVar("源码"),".c(演员表:).json(list).json(art_author).c(<br>简介:).json(list).json(art_name)");
var 列表规则=".fg(#)";
var 标题规则=".t()";
var 选集规则=".tz($)";选集列表();
      }else{
var 分类=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(vod_play_url).fg(\\$\\$\\$)");
var 线路=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(vod_play_from).fg(\\$\\$\\$)");
var 选集地址规则=".z2(\\$\\(.*\\)).or().z(.*)";
var 简介=e2Rex(getVar("源码"),".c(演员表:).json(list).json(vod_actor).c(<br>简介:).json(list).json(vod_content)");
var 列表规则=".fg(#)";
var 标题规则=".t()";
var 选集规则=".tz($)";选集列表();
    }
}
}
######搜索列表4
function 搜索列表(){
var res={};var items=[];var LIST=[];
var LIMIT=列表.length;
for(var j=0;j<LIMIT;j++){
    var CODE=列表[j];
   var 地址=e2Rex(CODE,地址规则).indexOf("http")==0?e2Rex(CODE,地址规则):getVar("Url")+e2Rex(CODE,地址规则);
    var 标题=e2Rex(CODE,标题规则);
    var 预图片=e2Rex(CODE,图片规则);
    if(预图片.indexOf("/mac:")!=-1){
    var 图片="http:"+预图片.split("mac:")[1];
    }else if(预图片.indexOf("=")!=-1){
    var 图片=预图片.match(/.*(http.*)/)[1];
    }else if(预图片.indexOf("http")!=-1){
    var 图片=预图片;
    }else if(预图片==""){
    var 图片="http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/kongbai.gif";
    }else if(预图片.indexOf("//")!=-1){
    var 图片="http:"+预图片;
    }else{
    var 图片=getVar("Url")+预图片;
    }
    var 简介=e2Rex(CODE,简介规则);
    var 作者=e2Rex(CODE,作者规则);
   LIST.push({title:标题,url:地址,img:图片,detail:简介,author:作者});
}
var play_={};
play_.list=LIST;
items.push(play_);
res.data=items;
return JSON.stringify(res);
}
var 源码=getCode();
if(源码.indexOf("<rss")!=-1){
var 列表=e2Arr(源码,".xml(video)");
var 标题规则=".xml(name).ty(CDATA).tz2(])";
var 地址规则=".c(?ac=videolist&ids=).xml(id).z(\\d+)";
var 图片规则=".xml(pic).t().z(http.+\\S).th( ##%20)";
var 简介规则=".xml(dt).t().c().xml(last).t()";
var 作者规则=".xml(note).t()";搜索列表();
}else if(getVar("Url").indexOf("/vodd/json")!=-1){
var 列表=e2Arr(源码,".json(data)");
var 标题规则=".json(vod_name)";var 地址规则=".c(?ac=videolist&ids=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(type_name).c().json(vod_addtime).c().json(vod_type)";var 作者规则=".json(vod_play_from)";搜索列表();
}else if(getVar("Url").indexOf("?")!=-1){
var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(vod_name)";var 地址规则=".c(&ac=videolist&ids=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_play_from)";var 图片底部规则=".json(vod_time)";var 左上规则=".json(type_name)";var 右上规则=".json(vod_remarks)";搜索列表();
}else{
      if(getVar("Url").indexOf("/videos")!=-1){
      var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(vod_name)";var 地址规则=".c(?ac=detail&ids=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_play_from)";var 图片底部规则=".json(vod_time)";var 左上规则=".json(type_name)";var 右上规则=".json(vod_remarks)";搜索列表();   
      }else{
var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=videolist&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".json(type_name).c().json(vod_time).or().json(art_time).c().json(vod_remarks).or().json(art_remarks)";var 作者规则=".json(vod_play_from).or().json(art_from)";搜索列表();
      }
}
######免嗅探5
var uu=getVar("地址");
var UA="Mozilla/5.0";
var COOKIE="";
if(uu.indexOf("www.meiju11.com")!=-1){
'web='+uu+'@{"Referer":"https://www.meiju11.com/"}';
}else if(uu.indexOf("moefun.goingstock.net")!=-1){
'web='+uu+'@{"Referer":"https://www.goingstock.net/"}';
}else if(uu.indexOf("www.dmplay.xyz/d?url=")!=-1){
'web='+uu+'@{"Referer":"https://zy.hikan.xyz/"}';
}else if(uu.indexOf("https://www.nfjx.xyz/player/?url=")!=-1){
var resp=JZ(JSON.stringify({url:uu,head:{"Referer":"http://yanaifei.cn/","User-Agent":"Mozilla/5.0 Android"}})).code;
var playurl=resp.match(/var config[\s\S]+?"url":"(.+?)"/)[1];
JSON.stringify({url:playurl,name:"地址"});
}else if(uu.indexOf("magnet:?xt=")!=-1){
JSON.stringify({url:uu,name:"地址"});
}else if(uu.indexOf("play.ekvod.com/play")!=-1){
var resp=JZ(JSON.stringify({url:uu}));
function v_decrypt(data,token_key,token_iv) {
    return CryptoJS.AES.decrypt(data, token_key, {iv: token_iv}).toString(CryptoJS.enc.Utf8);
    }
    function getVideoInfo(url){
    return v_decrypt(url,_token_key,_token_iv);
    }
    var bt_token=resp.code.match(/var le_token.+?"(.+?)"/)[1];
var _token_key = CryptoJS.enc.Utf8.parse("OJBKYANGOJBKYANG");
//定义IV偏移
var _token_iv = CryptoJS.enc.Utf8.parse(bt_token);
//定义IV偏移
var key_token = CryptoJS.enc.Utf8.parse("G8ad2WUbKPaO55mx");
var 加密链接=resp.code.match(/getVideoInfo.+?"(.+?)"/)[1];
var realurl=getVideoInfo(加密链接);
JSON.stringify({url:realurl,name:"地址",head:{"User-Agent":"Mozilla/5.0","Origin":"https://play.ekvod.com","Referer":""}});
}else if(uu.indexOf("yparse.jn1.cc/index.php")!=-1||uu.indexOf("dmplay.xyz/j0?url=")!=-1){
"web="+uu;
}else if(uu.indexOf("mgtv.com.byteamone.cn")!=-1){
var playurl=uu.split("url=")[1];
JSON.stringify({url:playurl,name:"地址",head:{"Referer":"","User-Agent":"Mozilla/5.0"}});
}else if(uu.indexOf("hjjjjhd.top")!=-1){
var playurl=uu.split("url=")[1];
JSON.stringify({url:playurl,name:"地址",head:{"Referer":uu}});
}else if(uu.indexOf("http://ip111.cn/?wd=")!=-1){
var playurl=uu.split("wd=")[1];
if(playurl.indexOf("http://1.117.152.239:39000/jiexi.php?url=")!=-1){
var resp=JZ(JSON.stringify({url:playurl}));
resp.code;
}else if(playurl.indexOf("dxcc.meijutt.top")!=-1){
var RF="https://www.psinu.com/static/player/aliplayer.html";
var real=decodeURI(playurl);
JSON.stringify({url:real,name:"地址",head:{"Referer":RF,"User-Agent":"Mozilla/5.0 Windows NT 10.0"}});
}else if(playurl.indexOf("tc.yuanmajs.cn/jxplayer.php")!=-1){
var resp=getHttp(playurl);
var realurl=e2Rex(resp,".get(video).a(src)");
var UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";
JSON.stringify({url:realurl,name:"地址",head:{"Origin":"https://tc.yuanmajs.cn","User-Agent":UA}});
}else if(playurl.indexOf("xing1.vip/player")!=-1){
var resp=getHttp(playurl);
var le_token=resp.match(/le_token.+?"(.+?)"/)[1];
var 加密地址=resp.match(/var config[\s\S]*?"url".*?"(.*?)"/)[1];
var _token_key = CryptoJS.enc.Utf8.parse("A42EAC0C2B408472");
var _token_iv = CryptoJS.enc.Utf8.parse(le_token);
var 解密地址=CryptoJS.AES.decrypt(加密地址,_token_key,{'iv':_token_iv}).toString(CryptoJS.enc.Utf8);
var UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";
JSON.stringify({url:解密地址,name:"地址",head:{"Referer":playurl,"User-Agent":UA}});
}else if(playurl.indexOf("api.iopenyun.com:88")!=-1){
"web="+playurl;
}else if(playurl.indexOf("SSPLUS_SSPLUS_SS")!=-1){
function decrypt(str, key, iv) {
    //密钥16位
    var key = CryptoJS.enc.Utf8.parse(key);
    //加密向量16位
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var decrypted = CryptoJS.AES.decrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
var $ds = playurl.split('|');
var str = decrypt($ds[2], $ds[1], $ds[0]);
var urlObj = JSON.parse(str);
JSON.stringify({url:urlObj[0].url,name:"地址"});
}else if(playurl.indexOf("www.ml0513.com/?url=")!=-1){
"web="+playurl+'@{"Referer":"https://www.siguyy.net/"}';
}else if(playurl.indexOf("https://www.baidu.com")!=-1){
//解密
function v_decrypt(data,token_key,token_iv) {
    return CryptoJS.AES.decrypt(data, token_key, {iv: token_iv}).toString(CryptoJS.enc.Utf8);
}
function getVideoInfo(url){
    return v_decrypt(url,_token_key,_token_iv);
}
var resp=JZ(JSON.stringify({url:playurl}));
var bt_token=resp.code.match(/var bt_token.+?"(.+?)"/)[1];
var _token_key = CryptoJS.enc.Utf8.parse("977D6DECA2E9C7E6");
//定义IV偏移
var _token_iv = CryptoJS.enc.Utf8.parse(bt_token);
//定义IV偏移
var key_token = CryptoJS.enc.Utf8.parse("b9kfPepZc6mI7Ry7");
var 加密链接=resp.code.match(/getVideoInfo.+?"(.+?)"/)[1];
var realurl=getVideoInfo(加密链接);
JSON.stringify({url:realurl,name:"地址",head:{"User-Agent":"Mozilla/5.0","Referer":"https://www.juhaokan.cc/"}});
}else if(playurl.indexOf("duoduozy.com")!=-1||playurl.indexOf("m3u8.cache.suoyo.cc")!=-1){
/*var uuu="https://bo.movie06.com/ddplay/play.php?url="+playurl;
var resp=getHttp(JSON.stringify({url:uuu,head:{"referer":"https://www.duoduozy.com/"}}));
var uuuu=resp.match(/var urls.+?"(.+?)"/)[1];
JSON.stringify({url:uuuu});*/
"web=https://jhpc.manduhu.com/duoduo/?url="+playurl+'@{"Referer":"http://555dy3.com/"}';
}else if(playurl.indexOf("api.cultureplus.shop/play/")!=-1){
var referer="https://jx.jxbdzyw.com/m3u8/?url="+playurl;
JSON.stringify({url:playurl,name:"地址",head:{"Referer":referer}});
}else if(playurl.indexOf("mayigq.com/vodzip/player.php?vid=")!=-1){
     "web="+playurl+'@{"Referer":"https://www.mayigq.com"}'; 
/*var resp1=getHttp(JSON.stringify({url:playurl,head:{'Referer':'https://www.mayigq.com'}}));
var menudata=e2Rex(resp1,".get(#player_swf).a(lovevod)");
var resp2=getHttp(JSON.stringify({url:"https://www.mayigq.com/vodzip/config/token.php",post:{'menudata':menudata},head:{'User-Agent':'Mozilla/5.0 Android','content-type':'application/x-www-form-urlencoded','Referer':playurl,'x-requested-with':'XMLHttpRequest'}}));
alert(resp2);
var realurl="https://www.mayigq.com/vodzip/"+e2Rex(resp2,".z2(var url.*?\"\\(.*?\\)\").ty(/)");
alert(realurl);
var a=JZ(JSON.stringify({url:realurl,redirect:false,head:{"Referer":playurl,"User-Agent":"Mozilla/5.0 Android","Cookie":"UM_distinctid=17bed9f3ec1239-0e52198f3410a6-1b3f0a2f-62b80-17bed9f3ec243a"}}));
var finalurl="";
while(a.head.location||a.head.Location){
      var finalurl=a.head.location||a.head.Location;
      var a=JZ(JSON.stringify({url:finalurl,redirect:false,head:{"Referer":playurl,"User-Agent":"Mozilla/5.0 Android","Cookie":"UM_distinctid=17bed9f3ec1239-0e52198f3410a6-1b3f0a2f-62b80-17bed9f3ec243a"}}));
}
JSON.stringify({url:finalurl});*/
}else if(playurl.indexOf("cat.wkfile.com")!=-1){
JSON.stringify({url:playurl,name:"地址",head:{"User-Agent":"Mozilla/5.0","Referer":"https://qian.wkfile.com/"}});
}else if(playurl.indexOf("api.m3u8.tv:5678")!=-1){
var resp=JZ(JSON.stringify({url:playurl,head:{"User-Agent":UA,"Cookie":COOKIE}}));
if(e2Rex(resp.code,".json(url)").length>1){
var realurl=JSON.parse(resp.code).url;
if(playurl.indexOf("mgtv.com")!=-1){
JSON.stringify({url:realurl,name:"地址",head:{"User-Agent":"Mozilla/5.0","Referer":""}});
}else{
JSON.stringify({url:realurl,name:"地址"});
}
}else{
"web=http://1.117.152.239:39000/?url="+playurl.split("url=")[1];
}
}else{
JSON.stringify({url:playurl,name:"地址"});
}
}else if(uu.indexOf("php?pid=")!=-1||uu.indexOf("?u=http")!=-1||uu.indexOf("url=")!=-1||uu.indexOf("v=http")!=-1||uu.indexOf("json.php?id=")!=-1){
var resp=JZ(JSON.stringify({url:uu,head:{"User-Agent":UA,"Cookie":COOKIE}}));
if(resp.code.indexOf("<html")!=-1){
if(resp.code.search(/<div class="video"/)!=-1||resp.code.search(/<div id="video"/)!=-1||resp.code.search(/<div id="[^"]*?player"/)!=-1||resp.code.search(/\/\/视频链接/)!=-1||resp.code.search(/<iframe[\s\S]*?src="[^"]+?"/)!=-1||resp.code.search(/<video[\s\S]*?src="[^"]+?"/)!=-1||resp.code.search(/<div id="jx-content"/)!=-1){
      if(uu.indexOf("dmplay.xyz/d?url=")!=-1){
"web="+uu+'@{"Referer":"https://zy.hikan.xyz/","sec-ch-ua-platform":"Windows","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.50"}';
      }else{
"web="+uu;
      }
}else{
if(uu.split("url=")[1].indexOf("http")!=-1){
"web=http://1.117.152.239:39000/?url="+uu.split("url=")[1];
}else{
"web="+uu;
}
}
}else if(resp.code.indexOf("#EXTINF")!=-1){
if(uu.indexOf("?")!=-1){
if(uu.indexOf("www.mgtv.com")!=-1){
JSON.stringify([{name:"播放不了请切换mp4",url:uu+"&_type=.m3u8",head:{"User-Agent":"Mozilla/5.0","Referer":""}},{name:"mp4",url:uu+"&_type=.mp4",head:{"User-Agent":"Mozilla/5.0","Referer":""}}]);
}else{
JSON.stringify({url:uu+"&_type=.m3u8",name:"地址"});
}
}else{
JSON.stringify({url:uu+"?type=.m3u8",name:"地址"});
}
}else{
if(e2Rex(resp.code,".json(url)").length>1){
var playurl=e2Rex(resp.code,".json(url)");
if(playurl.indexOf(".titan.mgtv.com")!=-1){
JSON.stringify({url:playurl,head:{"User-Agent":UA,"Referer":""}});
}else{
      if(playurl.indexOf("auuyruyc.com")!=-1){
      JSON.stringify({url:playurl+"&type=.m3u8",name:"地址"});
      }else{
      JSON.stringify({url:playurl,name:"地址"});
      }
}
}else if(uu.split("url=")[1].indexOf("alizy-")!=-1){
var id=uu.split("url=")[1];
var uuu="https://api.jhdyw.vip/?url="+id;
var resp2=JZ(JSON.stringify({url:uuu}));
var playurl=JSON.parse(resp2.code).url||JSON.parse(resp2.code).msg;
JSON.stringify({url:playurl,name:"地址"});
}else if(uu.split("url=")[1].indexOf("http")!=-1){
"web=http://1.117.152.239:39000/?url="+uu.split("url=")[1];
}else{
var id=uu.split("url=")[1];
var uuu="https://vip.gaotian.love/api/?key=sRy0QAq8hqXRlrEtrq&url="+id;
var resp2=JZ(JSON.stringify({url:uuu}));
var playurl=JSON.parse(resp2.code).url||JSON.parse(resp2.code).msg;
JSON.stringify({url:playurl,name:"地址"});
}
}
}else if(uu.indexOf("juztv.com/jx.php")!=-1){
var resp=getHttp(JSON.stringify({url:uu}));
var uuu='https://www.juztv.com/'+resp.match(/var u="(.*?)"/)[1];
var resp2=getHttp(JSON.stringify({url:uuu,head:{'Referer':uu}}));
var playurl=resp2.match(/<video src="(.*?)"/)[1];
JSON.stringify({url:playurl,name:"地址"});
}else{
"web="+uu;
}
