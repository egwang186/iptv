var uu=getVar("url");
if(uu.indexOf("languang.wfss100")!=-1){
var id=uu.split("url=")[1];
var uu="https://j.languang.wfss100.com/jx/md5.php?url="+id;
}else if(uu.indexOf("&down=200")!=-1){
var uu=uu.replace("&down=200","");
}else if(uu.indexOf("789pan.hd8.pw")!=-1){
var id=uu.split("url=")[1];
var uu="https://vip.gaotian.love/api/?key=sRy0QAq8hqXRlrEtrq&url="+id;
}else if(uu.indexOf("uid=1735&my=abghmpqtwBGIKLOW24&url=")!=-1){
var id=uu.split("url=")[1];
var uu="https://api.parwix.com:4433/analysis/json/?uid=1735&my=bfgnqrstuINQRWZ034&url="+id;
}
if(uu.indexOf("nfmovies.com")!=-1){
var UA="Mozilla/5.0";
var COOKIE=getVar("COOKIE");
}else{
var UA="Mozilla/5.0";
var COOKIE="";
}
var resp=JZ(JSON.stringify({url:uu,head:{"User-Agent":UA,"Cookie":COOKIE}}));
if(uu.indexOf("cokemv.co")!=-1){
var DATA=e2Rex(resp.code,".ty(player_aaaa=).json(url)");
var playurl ='https://cokemv.co'+DATA;
JSON.stringify({url:playurl});
}else if(uu.indexOf("zxzj.me")!=-1){
var DATA=e2Rex(resp.code,".ty(player_data=).json(url)");
if(DATA.indexOf(".m3u8")!=-1||DATA.indexOf(".mp4")!=-1){
JSON.stringify({url:DATA});
}else{
var code=JZ(JSON.stringify({url:DATA,head:{'referer':uu}})).code.match(/var url.*?'(.*?)'/)[1];
code=code.split('').reverse().join('');
let temp="";
for (let i = 0x0; i < code.length; i = i + 0x2) {
temp += String.fromCharCode(parseInt(code[i] + code[i + 0x1], 0x10))
}
var playurl=temp.substring(0x0, (temp.length - 0x6) / 0x2) + temp.substring((temp.length - 0x6) / 0x2 + 0x6);
JSON.stringify({url:playurl,head:{"User-Agent":"Mozilla/5.0"}});
}
}else if(uu.indexOf("qianoo.cn")!=-1){
if(resp.code.indexOf("<iframe")!=-1){
var uuu=e2Rex(resp.code,".get(iframe).a(src)");
var playurl=e2Rex(JZ(JSON.stringify({url:uuu})).code,".z2(sources:[\\s\\S]*?'\\(.*?\\)')")+"?type=.m3u8";
JSON.stringify({url:playurl});
}else{
"web="+uu;
}
}else if(uu.indexOf("nfmovies.com")!=-1){
var script=e2Rex(resp.code,".get(div.embed-responsive.clearfix script).t()");
eval(script);JSON.stringify({url:now,head:{"Referer":"https://www.nfmovies.com/js/player/m3u8.html"}});
}else if(uu.indexOf("baidu.com")!=-1){
var playurl=uu.split("wd=")[1];
if(playurl.indexOf("vip.19jx.vip/api/?type=app")!=-1||playurl.indexOf("42.51.48.17/?url=")!=-1){
if(playurl.indexOf("www.mgtv.com")!=-1){
JSON.stringify([{name:"播放不了请切换mp4",url:playurl+"&_type=.m3u8",head:{"User-Agent":UA,"Referer":"https://www.mgtv.com/"}},{name:"mp4",url:playurl+"&_type=.mp4",head:{"User-Agent":UA,"Referer":"https://www.mgtv.com/"}}]);
}else{
JSON.stringify([{name:"播放不了请切换mp4",url:playurl+"&_type=.m3u8"},{name:"mp4",url:playurl+"&_type=.mp4"}]);
}
}else if(playurl.indexOf("cat.wkfile.com")!=-1){
JSON.stringify({url:playurl,head:{"Referer":"https://fkplayer.wkfile.com/"}});
}else{
JSON.stringify({url:playurl});
}
}else if(uu.indexOf("wp.umao.vp6.top")!=-1){
var uuu="http://u.umao.vp6.top/?url="+uu.replace("wp.umao.vp6.top","umao.v.vp8.top");
"web="+uuu;
}else if(uu.indexOf("languang.wfss100")!=-1){
var playurl=resp.code.match(/vodurl.*?'(.*?)[#|']/)[1].replace("https://languang","https://img");
JSON.stringify({url:playurl});
}else if(uu.indexOf("?u=http")!=-1||uu.indexOf("url=")!=-1||uu.indexOf("v=http")!=-1){
if(resp.code.indexOf("<html")!=-1){
if(resp.code.search(/<div id="video"/)!=-1||resp.code.search(/<div id="[^"]*?player"/)!=-1||resp.code.search(/\/\/视频链接/)!=-1||resp.code.search(/<iframe[\s\S]*?src="[^"]+?"/)!=-1||resp.code.search(/<video[\s\S]*?src="[^"]+?"/)!=-1){
"web="+uu;
}else{
if(uu.split("url=")[1].indexOf("alizy-")!=-1){
var id=uu.split("url=")[1];
var uuu="https://api.jhdyw.vip/?url="+id;
var resp2=JZ(JSON.stringify({url:uuu}));
var playurl=JSON.parse(resp2.code).url||JSON.parse(resp2.code).msg;
JSON.stringify({url:playurl});
}else if(uu.split("url=")[1].indexOf("http")!=-1){
"web=http://egwang186.gitee.io/?url="+uu.split("url=")[1];
}else{
var id=uu.split("url=")[1];
var uuu="https://vip.gaotian.love/api/?key=sRy0QAq8hqXRlrEtrq&url="+id;
var resp=JZ(JSON.stringify({url:uuu}));
var playurl=JSON.parse(resp.code).url||JSON.parse(resp.code).msg;
JSON.stringify({url:playurl});
}
}
}else if(resp.code.indexOf("#EXTINF")!=-1){
if(uu.indexOf("?")!=-1){
JSON.stringify({url:uu+"&_type=.m3u8"});
}else{
JSON.stringify({url:uu+"?type=.m3u8"});
}
}else{
if(e2Rex(resp.code,".json(url)").length>1){
var playurl=JSON.parse(resp.code).url;
if(playurl.indexOf("pcvideotestws.titan.mgtv.com")!=-1){
JSON.stringify({url:playurl,head:{"Referer":"https://www.mgtv.com/"}});
}else{
JSON.stringify({url:playurl});
}
}else if(uu.split("url=")[1].indexOf("alizy-")!=-1){
var id=uu.split("url=")[1];
var uuu="https://api.jhdyw.vip/?url="+id;
var resp2=JZ(JSON.stringify({url:uuu}));
var playurl=JSON.parse(resp2.code).url||JSON.parse(resp2.code).msg;
JSON.stringify({url:playurl});
}else if(uu.split("url=")[1].indexOf("http")!=-1){
"web=http://egwang186.gitee.io/?url="+uu.split("url=")[1];
}else{
var id=uu.split("url=")[1];
var uuu="https://vip.gaotian.love/api/?key=sRy0QAq8hqXRlrEtrq&url="+id;
var resp2=JZ(JSON.stringify({url:uuu}));
var playurl=JSON.parse(resp2.code).url||JSON.parse(resp2.code).msg;
JSON.stringify({url:playurl});
}
}
}else{
"web="+uu;
}