######普通列表1
function 通用列表(){
    var res={};var items=[];
    var LIMIT=列表.length;
    for(var j=0;j<LIMIT;j++){
        var CODE=列表[j];
        var 预地址=e2Rex(CODE,地址规则);
        var 地址=预地址.indexOf("http")!=-1?预地址:baseURL+预地址;
        if(地址.search(/\.php\/.+?\.vod/)!=-1){
            var 日期=e2Rex(getVar("TIME_"),".time(MMdd)");
            var 地址=地址+"&key="+日期+"&keytime="+getVar("TIME_");
        }
        var 标题=e2Rex(CODE,标题规则);
        var 预图片=e2Rex(CODE,图片规则);
        if(预图片.indexOf("/mac:")!=-1){
            var 图片="http:"+预图片.split("/mac:")[1];
        }else if(预图片.indexOf("=http")!=-1){
            var 图片=预图片.match(/.*(http.*)/)[1];
        }else if(预图片.indexOf("http")==0){
            var 图片=预图片;
        }else if(预图片==""){
            var 图片="https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/js3.0/kongbai.gif";
        }else{
            var 图片=baseURL+预图片;
            if(baseURL.indexOf("1090ys2.com")!=-1){
            var 图片=图片+'@{"user-agent":"Mozilla/5.0","referer":"http://1090ys2.com/"}';
            }
        }
        var 简介=e2Rex(CODE,简介规则);
        var 图片底部=e2Rex(CODE,图片底部规则);
        var 左上=e2Rex(CODE,左上规则);
        var 右上=e2Rex(CODE,右上规则);
        items.push({title:标题,url:地址,img:图片,detail:简介,td:图片底部,zs:左上,ys:右上});
    }
    res.data=items;
    if(NEXTPAGE){
        res.nextpage=NEXTPAGE;
    }
    if(PREPAGE){
        res.prepage=PREPAGE;
    }
    return JSON.stringify(res);
}
var baseURL=getVar("baseURL");
eval(getVar("列表规则"));通用列表();
######选集列表2
function CMS选集列表(){
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
    //开始根据网址，线路判断前缀
    if(标题=="xhzy"){
          选集地址=选集地址;
    }else if(baseURL.indexOf("api.yunboys.cn")!=-1){
          选集地址="https://jx.yunboys.cn/?url="+选集地址;
    }else if(baseURL.indexOf("ttky8.com")!=-1){
          选集地址="http://ip111.cn/?wd="+选集地址;
    }else if(标题.indexOf("Tcm3u8")!=-1){
          选集地址="https://api.iopenyun.com:88/vips/?url="+选集地址;
    }else if(标题.indexOf("bjhu")!=-1){
        选集地址="http://124.223.69.144:8999/web/115?url="+选集地址;
    }else if(baseURL.indexOf("ujuba.com")!=-1){
          选集地址="https://www.dmplay.xyz/j0?url="+选集地址;
    }else if(baseURL.indexOf("xinlangapi.com")!=-1){
        if(标题=="xlm3u8"){
        选集地址="https://www.xinlangjiexi.com/m3u8/?url="+选集地址;
        }else{
        选集地址=选集地址;  
        }
    }else if(标题=="ddzy"){
        选集地址="http://qiqi.520say.cn/json/dd.php?url="+选集地址;
    }else if(标题=="autue"){
        选集地址=e2Rex(选集地址,".dn64()");
    }else if(标题=="Mika"){
        选集地址="https://mika.ovooa.com/api/player/xg.php?key=200OK&url="+选集地址;
    }else if(baseURL.indexOf("app.netflixmi.com")!=-1){
        选集地址="https://player.naifeimi.com/?url="+选集地址;
    }else if(baseURL.indexOf("yanaifei.cn")!=-1||baseURL.indexOf("45.125.46.41:4433")!=-1){
        /*if(标题=="VIP"){
            选集地址="http://ip111.cn/?wd=http://www.yanaifei.cn/addons/dplayer/?pid="+选集地址;
        }else if(标题=="qq"){
            选集地址="http://ip111.cn/?wd=http://www.yanaifei.cn/addons/dplayer/qq.php?url="+选集地址;
        }else if(标题=="VIP3"){
            选集地址="http://ip111.cn/?wd=http://www.yanaifei.cn/addons/dplayer/rrjx.php?fid="+选集地址;
        }else if(标题=="VIP2"){
            选集地址="http://ip111.cn/?wd=http://www.yanaifei.cn/addons/dplayer/ddjx.php?url="+选集地址;
        }else if(标题=="LIBVIO"){
            选集地址="http://ip111.cn/?wd=http://www.yanaifei.cn/addons/dplayer/lbjx.php?url="+选集地址;
        }else{
            选集地址=选集地址;
        }*/
        选集地址="https://www.nfjx.xyz/player/?url="+选集地址;
  }else if(baseURL.indexOf("apicdn.vipm3u8.com")!=-1){
          选集地址="https://player.vipparsing.com/player?token=4732bUERfVb60lWNSLrsd5-2s1r70KeA89C3VwrGYYdByboQT9o4OzxIr5-8/cX9-sO6&vid="+选集地址;
    }else if(选集地址.indexOf("html")!=-1||选集地址.indexOf("www.bilibili.com")!=-1||选集地址.indexOf("share.weiyun.")!=-1){
          选集地址="http://1.117.152.239:39000/?url="+选集地址;
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
    }else if(标题.indexOf("ltnb")!=-1){
      //选集地址="https://jifei.longtengzy.fun/video/?url="+选集地址;
      //选集地址="http://jx.yinliub.cn/home/api?type=ys&uid=51213&key=chiprvyFHJNOTUVZ39&url="+选集地址;
      选集地址="https://analysis.yikan.one/analysis/player/?uid=8&my=fjkmoqFJLORTVZ1359&url="+选集地址;
    }else if(选集地址.indexOf(".ruifenglb.com")!=-1){
       选集地址="http://ip111.cn/?wd=https://js.jisujiexi.vip/home/api?type=ys&uid=196395&key=aejlnoprsABDNUZ159&url="+选集地址;
    }else if(选集地址.indexOf(".m3u8")>15||选集地址.indexOf(".mp4")>15){
          选集地址="http://ip111.cn/?wd="+选集地址;
    }else if(标题=="4kdym"||标题=="8kvod"){
          选集地址="http://ip111.cn/?wd="+decodeURIComponent(选集地址);
    }else if(标题=="789pan"||标题=="pll"){
        选集地址="https://dp.jiexi.work/bfq.php?url="+选集地址;
    }else if(标题=="zbkplayer"){
          选集地址="http://analysis.yikan.one/analysis/player/?uid=8&my=fjkmoqFJLORTVZ1359&url="+选集地址;
    }else if(标题=="lekanzyw"){
          //选集地址="https://bfq.ikan6.vip/m3u8.php?url="+选集地址+'@{"Referer":"https://ikan6.vip/","User-Agent":"Mozilla/5.0 Android"}';
          选集地址='https://play.ekvod.com/play/?url='+选集地址;
    }else if(标题.indexOf("miaoparty2")!=-1){
      选集地址="https://vip5.jiexi.one?url="+选集地址;
    }else if(标题.indexOf("miaoparty")!=-1){
      选集地址="https://jx.yingciyuan.cn/?url="+选集地址;
    }else if(标题.indexOf("mx771")!=-1||标题.indexOf("mengxin886")!=-1){
      选集地址="https://vip.mengx.vip/home/api?type=ys&uid=2117076&key=abghklvyDEIJLNT025&url="+选集地址;
    }else if(标题.indexOf("taiyi")!=-1){
      选集地址="https://jx.cyu0.cn/?url="+选集地址;
    }else if(标题.indexOf("x1play")!=-1){
      选集地址="https://www.xing1.vip/player/dp/?url="+选集地址;
    }else if(标题.indexOf("xfyun")!=-1){
      选集地址="https://b.sigu.tv/api/type/?key=b08DPxVf9MCYrAX8fP&url="+选集地址;
    }else if(标题=="rx"){
      选集地址="https://svip.rongxingvr.top/api/?key=B26J6jO5MOnjUv3GqW&url="+选集地址;
    }else if(标题=="renrenmi"){
          //选集地址="http://www.1080kan.cc/jiexi/rrmi.php?url="+选集地址+'@{"Referer":"http://www.1080kan.cc/"}';
          //选集地址="https://kuba.renrenmi.cc:2266/api/?key=2WzAj2s0pgQ1AYQoPT&url="+选集地址;
          //选集地址="https://sudu.renrenmi.cc:2021/ku/?url="+选集地址;
          //选集地址="https://jiexi.astv.vip/home/api?type=ys&uid=1&key=free&url="+选集地址;
          选集地址="https://jx.blbo.cc:4433/?url="+选集地址;
    }else if(baseURL.indexOf('fqzy.cc')!=-1){
          选集地址="https://jx.fqzy.cc/jx.php?url="+选集地址;
    }else if(标题=='dym3'){
          选集地址="https://1.m3u8.shop/m3u8.php?url="+选集地址;
    }else if(baseURL.indexOf('zy.7kjx.com')!=-1){
          选集地址="https://jx.xmflv.vip/?url="+选集地址;
    }else if(标题.indexOf('leduo')!=-1){
          选集地址="https://api.ldjx.cc/wp-api/ifr.php?vid="+选集地址;
    }else if(标题.indexOf("mengxin")!=-1){
          选集地址="https://jx3.bifenvip.com/?url="+选集地址;
    }else if(标题.indexOf("aly")!=-1){
          选集地址="https://aly.178du.com/"+选集地址;
    }else if(标题=='niux'){
          选集地址="https://www.juztv.com/jx.php?id="+选集地址;
    }else if(标题=='u'){
          选集地址="https://jx.dxsdkw.cn/nv/"+选集地址+".m3u8";
    }else if(标题=='youbo'){
          选集地址="http://1090ys2.com/x2.php?id="+选集地址+'@{"Referer":"http://1090ys2.com/"}';
    }else if(baseURL.indexOf('tvyb02.com')!=-1||baseURL.indexOf('zy.vodcdn.top')!=-1){
          if(标题=='hkm3u8'){
          选集地址="https://jxn.dxsdkw.cn/jm/x2.php?id="+选集地址+'@{"referer":"http://www.tvyb02.com/"}';
          }else if(选集地址.indexOf(".m3u8")>15||选集地址.indexOf(".mp4")>15||选集地址.indexOf("/obj/tos")!=-1){
          选集地址="http://ip111.cn/?wd="+选集地址;
          }else if(标题=='banyun'||标题=='yunbo'){
          var playurl="https://www.mayigq.com/vodzip/player.php?vid="+选集地址;
          选集地址="http://ip111.cn/?wd="+playurl;
          }
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
function 选集列表(){
    var res={};var items=[];var detail=[];
    for(var i=0;i<分类.length;i++){
        var 分类CODE=分类[i];
        var 列表=e2Arr(分类CODE,列表规则);
        if(线路){
        var 标题=e2Rex(线路[i],标题规则);
        }else{
        var 标题=e2Rex(分类CODE,标题规则);
        }
        if(baseURL.search(/\.php\/.+?\.vod/)!=-1){
           var PARSE=e2Rex(分类CODE,".json(player_info).json(parse)").split(",");
           var PARSE2=e2Rex(分类CODE,".json(player_info).json(parse2)").split(",");
           var 总接口=PARSE.concat(PARSE2).filter(item => item.search(/\/.+?\?.+?=/)!=-1);
           var 过滤规则=[
    /jx\.+huimaojia\.+com\/player/,/py\.+789pan\.+cn\/player\/tm\.php\?url=/,/ztys\.+waruanzy\.+com\/player\/\?url=/,/yingshi\.+waruanzy\.+com\/789pan\/\?url=/,/vip\.+parwix\.+com:4433\/player\/\?url=/,/api\.+cxitco\.+cn/,/\/vip\.+renrenmi.cc/,/yanbing\.+parwix\.+com:4433\/player/,/json\.+cantin\.+cc\/apijson\.php/,/ffdm\.+miaoletv\.+com\/\?url=/,/vip\.+sylwl\.+cn\/api\/\?key=/,/jx\.+dikotv\.+com\/\?url=/,/zly\.+xjqxz\.+top\/player\/\?url=/,/5znn\.+xyz\/m3u8\.+php/,/uid=1735&my=/,/api\.+xkvideo\.+design\/m3u8\.+php\?url=/,/play\.+szbodankyy\.+com\/xxoocnmb/,/vip\.+fj6080\.+xyz\/player\/\?url=/,/a\.+dxzj88\.+com\/jiexi/,/host\.+q-q\.+wang\/api/,/qpsvipr\.+naifeimi\.+com/,/保佑/
    ];
           var 可用接口=总接口.filter(function (text) {return !过滤规则.some(function (regex) {return regex.test(text);});});
           if(JSON.stringify(可用接口).indexOf("=")!=-1){
              if(可用接口[0].indexOf("http")!=-1){
              var 接口=可用接口[0].match(/.+(url|v|vid|php\?id)=/)[0].replace("..",".");
              }else if(可用接口[0].indexOf("//")==0){
              var 接口=baseURL.split(":")[0]+可用接口[0].match(/\/\/.+(url|v|vid|php\?id)=/)[0].replace("..",".");
              }else{
              var 接口=baseURL.match(/https?:\/\/[^\/]*/)[0]+可用接口[0].match(/\/.+(url|v|vid|php\?id)=/)[0].replace("..",".");
              }
           }else{
           var 接口="http://1.117.152.239:39000/?url=";
           }
        }else if(baseURL.indexOf("api.php/app/")!=-1||baseURL.indexOf("xgapp.php/v")!=-1){
          var 接口=e2Rex(分类CODE,".json(parse_api)");
        }else{
        var 接口=baseURL;
        }
        var LIST=[];
        for(var j=0;j<列表.length;j++){
            var 选集=e2Rex(列表[j],选集规则);
            var 选集地址=e2Rex(列表[j],选集地址规则);
            if(baseURL.indexOf("xgapp.php/v")!=-1||baseURL.indexOf("api.php/app/")!=-1||baseURL.search(/\.php\/.+?\.vod/)!=-1){
               if(选集地址.indexOf(".m3u8")>15||选集地址.indexOf(".mp4")>15){
                   if(选集地址.indexOf(".ruifenglb.com")!=-1){
                       var 接口="https://js.jisujiexi.vip/home/api?type=ys&uid=196395&key=aejlnoprsABDNUZ159&url=";
                       var 选集地址="http://ip111.cn/?wd="+接口+选集地址;
                   }else{
                       var 选集地址="http://ip111.cn/?wd="+选集地址;
                   }
               }else{
               var 选集地址="http://ip111.cn/?wd="+接口+选集地址;
               }
            }else if(baseURL.search(/api\.php\/.*?\/vod/)!=-1){
                if(baseURL.indexOf("ppzhu.vip")!=-1||baseURL.indexOf("api.8d8q.com")!=-1){
                    var 选集地址="http://ip111.cn/?wd="+选集地址+"&app=10003&account=272775028&password=qq272775028";
                }else{
                   if(选集地址.indexOf("=")!=-1||选集地址.indexOf(".m3u8")>15||选集地址.indexOf(".mp4")>15){
                        var 选集地址="http://ip111.cn/?wd="+选集地址;
                   }else if(选集地址.indexOf("html")||选集地址.indexOf("www.bilibili.com")){
                        var 选集地址="http://ip111.cn/?wd=https://api.m3u8.tv:5678/home/api?type=ys&uid=233711&key=bgjnopvDHPUY035689&url="+选集地址;
                   }else{
                        var 选集地址=选集地址;
                   }
                }
            }else if(选集地址.indexOf("http")!=-1){
                var 选集地址=选集地址;
            }else{
                if(baseURL.indexOf("gimytv.com")!=-1){
                    var 选集地址=接口+选集地址+'@{"user-agent":"Mozilla/5.0 Windows10","Referer":"'+接口+'"}';
                }else{
                    var 选集地址=接口+选集地址;
                }
            }
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
var baseURL=getVar("baseURL");
if(typeof(type) == "undefined"){
    var 类型="";
}else{
    var 类型=type;
}
if(类型){
CMS选集列表();
}else{
选集列表();
}
######UA3
var baseURL=getVar("baseURL");
if(baseURL.indexOf(".php/")!=-1){
    if(baseURL.indexOf("api.php/app")!=-1||baseURL.indexOf("xgapp")!=-1||baseURL.indexOf("freekan")!=-1){
        "Dart/2.14 (dart:io)";
    }else if(baseURL.indexOf("zsb")!=-1||baseURL.indexOf("fkxs")!=-1||baseURL.indexOf("xays")!=-1||baseURL.indexOf("xcys")!=-1||baseURL.indexOf("szys")!=-1||baseURL.indexOf("dxys")!=-1||baseURL.indexOf("ytys")!=-1||baseURL.indexOf("qnys")!=-1){
        "Dart/2.15 (dart:io)";
    }else if(baseURL.indexOf(".vod")!=-1){
        "okhttp/4.1.0";
    }else{
        "Dalvik/2.1.0";
    }
}else if(baseURL.indexOf("xchina.xyz")!=-1){
"Windows 10";
}else{
"";
}
######通用免嗅探4
var uu=getVar("url");
if(uu.indexOf("ip111.cn/?wd=")!=-1){
var playurl=uu.split("ip111.cn/?wd=")[1];
    if(playurl.indexOf("duoduozy.com")!=-1||playurl.indexOf("m3u8.cache.suoyo.cc")!=-1){
    /*var uuu="https://bo.movie06.com/ddplay/play.php?url="+playurl;
    var resp=getHttp(JSON.stringify({url:uuu,head:{"referer":"https://www.duoduozy.com/"}}));
    var uuuu=resp.match(/var urls.+?"(.+?)"/)[1];
    JSON.stringify({url:uuuu});*/
    "web=https://jhpc.manduhu.com/duoduo/?url="+playurl+'@{"Referer":"https://555dy3.com"}';
    }else if(playurl.indexOf("1080p.one/mogai_api.php/v1.api/Index?list=")!=-1){
        uu="https://zy.youhuima.vip/?url="+playurl.split("url=")[1];
        "web="+uu;
    }else if(playurl.indexOf("cat.wkfile.com")!=-1){
        JSON.stringify({url:playurl,head:{"User-Agent":"Lavf/58.12.100","Referer":"wkfile.com"}});
    }else if(playurl.indexOf(".m3u8")>15||playurl.indexOf(".mp4")>15||playurl.indexOf("/obj/tos")!=-1){
        if(playurl.indexOf("hsl.ysgc.xyz")!=-1){
        var cccc=JZ(JSON.stringify({url:"https://play.dushe520.com/m3u8.php?url="+playurl}));
        JSON.stringify({url:JSON.parse(cccc.code).url,head:{"Referer":"https://ysgc.cc"}});
        }else{
        JSON.stringify({url:playurl.match(/.*(http.*)/)[1]});
        }
    }else if(playurl.indexOf("=")!=-1){
            var resp=JZ(JSON.stringify({url:playurl,redirect:false}));
            if(resp.head.location||resp.head.Location){
                   var a=resp;
                   while(a.head.location||a.head.Location){
                    var finalurl=a.head.location||a.head.Location;
                    if(finalurl.indexOf(".mp4")>30){
                        var a={"head":{"cookie":"ccccc"}};
                    }else{
                        var a=JZ(JSON.stringify({url:finalurl,redirect:false,head:{"User-Agent":"Mozilla/5.0 Android"}}));
                    }
                   }
                   var realurl=finalurl;
                if(realurl.indexOf("=http")!=-1||realurl.indexOf("url=")!=-1){
                    if(a.code.indexOf("<html")!=-1){
                        "web="+realurl;
                    }else{
                        var ppurl=JSON.parse(a.code).url;
                        if(realurl.indexOf("mgtv.com")!=-1){
                            JSON.stringify({url:ppurl,head:{"User-Agent":"Mozilla/5.0","Referer":""}});
                        }else if(realurl.indexOf("bilibili.com")!=-1){
                            JSON.stringify({url:ppurl});
                        }else{
                            JSON.stringify({url:ppurl});
                        }
                    }
                }else{
                    if(playurl.indexOf("www.mgtv.com")!=-1){
                    JSON.stringify({url:realurl,head:{"User-Agent":"Mozilla/5.0","Referer":""}}); 
                    }else{
                    JSON.stringify({url:realurl});
                    }
                }
            }else{
                function 切换解析(data){
                        if(data.split("url=")[1].indexOf("http")!=-1){
                            return "web=http://1.117.152.239:39000/?url="+data.split("url=")[1];
                        }else if(data.split("url=")[1].indexOf("renrenmi")!=-1){
                            return "web=https://jx.blbo.cc:4433/?url="+data.split("url=")[1];
                        }else if(data.split("url=")[1].indexOf("LT-")!=-1){
                            return "web=https://analysis.yikan.one/analysis/player/?uid=8&my=fjkmoqFJLORTVZ1359&url="+data.split("url=")[1];
                        }else{
                            var 全能="http://jx.jisujiexi.vip/home/api?type=ys&uid=5196896&key=ajortuvxzRTUWXZ037&url="+data.split("url=")[1];
                            var link=e2Rex(getHttp(全能),".json(url).or().json(data).json(url)");
                            return JSON.stringify({url:link});
                        }
                }
                if(resp.code.indexOf("<html")!=-1){
                    if(resp.code.search(/player=new/)!=-1||resp.code.search(/<div id="video"/)!=-1||resp.code.search(/<div id="[^"]*?player"/)!=-1||resp.code.search(/\/\/视频链接/)!=-1||resp.code.search(/<iframe[\s\S]*?src="[^"]+?"/)!=-1||resp.code.search(/<video[\s\S]*?src="[^"]+?"/)!=-1){
                       "web="+playurl;
                    }else{
                       切换解析(playurl);
                    }
                }else{
                    if(e2Rex(resp.code,".json(url).or().json(data).json(url)").length>1){
                        var realurl=e2Rex(resp.code,".json(url).or().json(data).json(url)");
                        if(playurl.indexOf("mgtv.com")!=-1){
                            JSON.stringify({url:realurl,head:{"User-Agent":"Mozilla/5.0","Referer":""}});
                        }else if(playurl.indexOf("bilibili.com")!=-1){
                            JSON.stringify({url:realurl});
                        }else{
                            JSON.stringify({url:realurl});
                        }
                    }else{
                        切换解析(playurl);
                    }
                }
            }
        
    }
}else if(uu.indexOf("https://www.nfjx.xyz/player/?url=")!=-1){
    var resp=JZ(JSON.stringify({url:uu,head:{"Referer":"http://yanaifei.cn/","User-Agent":"Mozilla/5.0 Android"}})).code;
    var playurl=resp.match(/var config[\s\S]+?"url":"(.+?)"/)[1];
    JSON.stringify({url:playurl});
}else{
"web="+uu;
}
######模板规则5
var 模板库=[
    {
        "title":"iptv/vod",
        "匹配":"api\\.php\\/.+?\\/vod\\/",
        "rule":{
            "首页规则":'var 列表=e2Arr(getVar("源码"),".json(data)");var 标题规则=".json(title)";var 地址规则=".json(nextlink)";var 图片规则=".json(pic)";var 简介规则=".json(state).c().json(type)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "筛选数据":'alert("请等待几秒...列表加载中");var a="分类+电影=movie&start=&area=&type=+电视剧=tvplay&start=&area=&type=+综艺=tvshow&start=&area=&type=+动漫=comic&start=&area=&type=+动作片=movie&start=&area=&type=动作+喜剧片=movie&start=&area=&type=喜剧+爱情片=movie&start=&area=&type=爱情+科幻片=movie&start=&area=&type=科幻+恐怖片=movie&start=&area=&type=恐怖+剧情片=movie&start=&area=&type=剧情+大陆剧=tvplay&start=&area=大陆&type=+香港剧=tvplay&start=&area=香港&type=+台湾剧=tvplay&start=&area=台湾&type=+美国剧=tvplay&start=&area=美国&type=+日本剧=tvplay&start=&area=日本&type=+韩国剧=tvplay&start=&area=韩国&type=";var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var b="翻页+"+b;a+"\\n"+b;',
            "分类规则":'var 列表=e2Arr(getVar("源码"),".json(data)");var 标题规则=".json(title)";var 地址规则=".json(nextlink)";var 图片规则=".json(pic)";var 简介规则=".json(state).c().json(type)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "选集规则":'var 分类=e2Arr(getVar("源码"),".json(videolist).z(\\".*?\\\\])");var 线路="";var 简介=e2Arr(getVar("源码"),".json(intro)");var 列表规则=".z(\\\\{.*?\\\\})";var 标题规则=".z2(\\"\\\\(.*?\\\\)\\")";var 选集规则=".json(title)";var 选集地址规则=".json(url)";',
            "搜索规则":'var URL=baseURL+"?ac=list&page=1&wd="+getVar("KEY");if(baseURL.indexOf("api.php/app")!=-1||baseURL.indexOf("xgapp")!=-1||baseURL.indexOf("freekan")!=-1){var UA="Dart/2.14 (dart:io)"}else if(baseURL.indexOf("zsb")!=-1||baseURL.indexOf("fkxs")!=-1||baseURL.indexOf("xays")!=-1||baseURL.indexOf("xcys")!=-1||baseURL.indexOf("szys")!=-1||baseURL.indexOf("dxys")!=-1||baseURL.indexOf("ytys")!=-1||baseURL.indexOf("qnys")!=-1){var UA="Dart/2.15 (dart:io)"}else if(baseURL.indexOf(".vod")!=-1){var UA="okhttp/4.1.0"}else{var UA="Dalvik/2.1.0"}var 源码=getHttp(JSON.stringify({url:URL,head:{"User-Agent":UA}}));var 列表=e2Arr(源码,".json(data)");var 标题规则=".json(title)";var 地址规则=".json(nextlink)";var 图片规则=".json(pic)";var 简介规则=".json(state).c().json(type)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "免嗅探规则":'eval(getVar("通用免嗅探"))'
        }
    },
    {
        "title":"v1.vod",
        "匹配":"\\.php\\/.+?\\.vod",
        "rule":{
            "首页规则":'var 列表=getVar("源码").replace(/<.*?>/g,"").replace(/[\\s]*/g,"").match(/\\{[^\\{]*"vod_id".*?"type_1".*?\\}/g);var 标题规则=".json(vod_name)";var 地址规则=".c(/detail?vod_id=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_remarks).c().json(vod_actor).c().json(vod_blurb)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "筛选数据":'alert("请等待几秒...列表加载中");try{var resp=getHttp(JSON.stringify({url:getVar("baseURL")+"/types",head:{"User-Agent":getVar("当前UA")}}));}catch(err){alert("哦，报错了，错误描述："+err.message);}var 主=e2Arr(resp,".json(data).json(list)");var a="";for(var i in 主){a=a+"+"+JSON.parse(主[i]).type_name+"="+JSON.parse(主[i]).type_id+"&class=&area=";var 类型=e2Rex(主[i],".json(type_extend).json(class)").split(",").filter(Boolean);if(类型.length>1){for(var j in 类型){a=a+"+"+JSON.parse(主[i]).type_name+"-"+类型[j]+"="+JSON.parse(主[i]).type_id+"&class="+类型[j]+"&area=";}}var 地区=e2Rex(主[i],".json(type_extend).json(area)").split(",").filter(Boolean);if(地区.length>1){for(var k in 地区){a=a+"+"+JSON.parse(主[i]).type_name+"-"+地区[k]+"="+JSON.parse(主[i]).type_id+"&class=&area="+地区[k];}}}var a="分类"+a;var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var b="翻页+"+b;a+"\\n"+b;',
            "分类规则":'var 列表=e2Arr(getVar("源码"),".json(data).json(list)");var 标题规则=".json(vod_name)";var 地址规则=".c(/detail?vod_id=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_remarks).c().json(vod_actor).c().json(vod_blurb)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "选集规则":'var 分类=e2Arr(getVar("源码"),".json(data).json(vod_play_list)");var 线路="";var 简介=e2Rex(getVar("源码"),".json(data).json(vod_content)");var 列表规则=".json(url).ct(#).z(.*?\\\\$.*?#)";var 标题规则=".json(player_info).json(show)";var 选集规则=".z2(\\\\(.+?\\\\)\\\\$)";var 选集地址规则=".z2(\\\\$\\\\(.+?\\\\)[#|\\"])";',
            "搜索规则":'var URL=baseURL+"?page=1&limit=10&wd="+getVar("KEY");if(baseURL.indexOf("api.php/app")!=-1||baseURL.indexOf("xgapp")!=-1||baseURL.indexOf("freekan")!=-1){var UA="Dart/2.14 (dart:io)"}else if(baseURL.indexOf("zsb")!=-1||baseURL.indexOf("fkxs")!=-1||baseURL.indexOf("xays")!=-1||baseURL.indexOf("xcys")!=-1||baseURL.indexOf("szys")!=-1||baseURL.indexOf("dxys")!=-1||baseURL.indexOf("ytys")!=-1||baseURL.indexOf("qnys")!=-1){var UA="Dart/2.15 (dart:io)"}else if(baseURL.indexOf(".vod")!=-1){var UA="okhttp/4.1.0"}else{var UA="Dalvik/2.1.0"}var 源码=getHttp(JSON.stringify({url:URL,head:{"User-Agent":UA}}));var 列表=e2Arr(源码,".json(data).json(list)");var 标题规则=".json(vod_name)";var 地址规则=".c(/detail?vod_id=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_remarks).c().json(vod_actor).c().json(vod_blurb)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "免嗅探规则":'eval(getVar("通用免嗅探"))'
        }
    },
    {
        "title":"xgapp.php/v",
        "匹配":"xgapp\\.php\\/v",
        "rule":{
            "首页规则":'var 列表=getVar("源码").replace(/<.*?>/g,"").replace(/[\\s]*/g,"").match(/\\{"vod_id".*?\\}/g);var 标题规则=".json(vod_name)";var 地址规则=".c(video_detail?id=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_remarks).c().json(vod_time_add)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "筛选数据":'alert("请等待几秒...列表加载中");try{var resp=getHttp(JSON.stringify({url:getVar("baseURL")+"nav",head:{"User-Agent":getVar("当前UA")}}));}catch(err){alert("哦，报错了，错误描述："+err.message);}var 主=e2Arr(resp,".json(list).or().json(data)");var a="";for(var i in 主){a=a+"+"+JSON.parse(主[i]).type_name+"="+JSON.parse(主[i]).type_id+"&class=&area=";var 类型=e2Rex(主[i],".json(type_extend).json(class)").split(",").filter(Boolean);if(类型.length>1){for(var j in 类型){a=a+"+"+JSON.parse(主[i]).type_name+"-"+类型[j]+"="+JSON.parse(主[i]).type_id+"&class="+类型[j]+"&area=";}}var 地区=e2Rex(主[i],".json(type_extend).json(area)").split(",").filter(Boolean);if(地区.length>1){for(var k in 地区){a=a+"+"+JSON.parse(主[i]).type_name+"-"+地区[k]+"="+JSON.parse(主[i]).type_id+"&class=&area="+地区[k];}}}var a="分类"+a;var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var b="翻页+"+b;a+"\\n"+b;',
            "分类规则":'var 列表=e2Arr(getVar("源码"),".json(data)");var 标题规则=".json(vod_name)";var 地址规则=".c(video_detail?id=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_remarks).c().json(vod_time_add)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "选集规则":'var 分类=e2Arr(getVar("源码"),".json(data).json(vod_info).json(vod_url_with_player)");var 线路="";var 简介=e2Rex(getVar("源码"),".json(data).json(vod_info).json(vod_content)");var 列表规则=".json(url).ct(#).z(.*?\\\\$.*?#)";var 标题规则=".json(name)";var 选集规则=".z2(\\\\(.+?\\\\)\\\\$)";var 选集地址规则=".z2(\\\\$\\\\(.+?\\\\)[#|\\"])";',
            "搜索规则":'var URL=baseURL+"search?pg=1&text="+getVar("KEY");if(baseURL.indexOf("api.php/app")!=-1||baseURL.indexOf("xgapp")!=-1||baseURL.indexOf("freekan")!=-1){var UA="Dart/2.14 (dart:io)"}else if(baseURL.indexOf("zsb")!=-1||baseURL.indexOf("fkxs")!=-1||baseURL.indexOf("xays")!=-1||baseURL.indexOf("xcys")!=-1||baseURL.indexOf("szys")!=-1||baseURL.indexOf("dxys")!=-1||baseURL.indexOf("ytys")!=-1||baseURL.indexOf("qnys")!=-1){var UA="Dart/2.15 (dart:io)"}else if(baseURL.indexOf(".vod")!=-1){var UA="okhttp/4.1.0"}else{var UA="Dalvik/2.1.0"}var 源码=getHttp(JSON.stringify({url:URL,head:{"User-Agent":UA}}));var 列表=e2Arr(源码,".json(data)");var 标题规则=".json(vod_name)";var 地址规则=".c(video_detail?id=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_remarks).c().json(vod_time_add)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "免嗅探规则":'eval(getVar("通用免嗅探"))'
        }
    },
    {
        "title":"api.php/app",
        "匹配":"api\\.php\\/app\\/",
        "rule":{
            "首页规则":'var 列表=getVar("源码").replace(/<.*?>/g,"").replace(/[\\s]*/g,"").match(/\\{"vod_id".*?\\}/g);var 标题规则=".json(vod_name)";var 地址规则=".c(video_detail?id=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_remarks).c().json(vod_time_add)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "筛选数据":'alert("请等待几秒...列表加载中");try{var resp=getHttp(JSON.stringify({url:getVar("baseURL")+"nav",head:{"User-Agent":getVar("当前UA")}}));}catch(err){alert("哦，报错了，错误描述："+err.message);}var 主=e2Arr(resp,".json(list).or().json(data)");var a="";for(var i in 主){a=a+"+"+JSON.parse(主[i]).type_name+"="+JSON.parse(主[i]).type_id+"&class=&area=";var 类型=e2Rex(主[i],".json(type_extend).json(class)").split(",").filter(Boolean);if(类型.length>1){for(var j in 类型){a=a+"+"+JSON.parse(主[i]).type_name+"-"+类型[j]+"="+JSON.parse(主[i]).type_id+"&class="+类型[j]+"&area=";}}var 地区=e2Rex(主[i],".json(type_extend).json(area)").split(",").filter(Boolean);if(地区.length>1){for(var k in 地区){a=a+"+"+JSON.parse(主[i]).type_name+"-"+地区[k]+"="+JSON.parse(主[i]).type_id+"&class=&area="+地区[k];}}}var a="分类"+a;var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var b="翻页+"+b;a+"\\n"+b;',
            "分类规则":'var 列表=e2Arr(getVar("源码"),".json(list)");var 标题规则=".json(vod_name)";var 地址规则=".c(video_detail?id=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_remarks).c().json(vod_time_add)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "选集规则":'var 分类=e2Arr(getVar("源码"),".json(data).json(vod_url_with_player)");var 线路="";var 简介=e2Rex(getVar("源码"),".json(data).json(vod_content)");var 列表规则=".json(url).ct(#).z(.*?\\\\$.*?#)";var 标题规则=".json(name)";var 选集规则=".z2(\\\\(.+?\\\\)\\\\$)";var 选集地址规则=".z2(\\\\$\\\\(.+?\\\\)[#|\\"])";',
            "搜索规则":'var URL=baseURL+"search?pg=1&text="+getVar("KEY");if(baseURL.indexOf("api.php/app")!=-1||baseURL.indexOf("xgapp")!=-1||baseURL.indexOf("freekan")!=-1){var UA="Dart/2.14 (dart:io)"}else if(baseURL.indexOf("zsb")!=-1||baseURL.indexOf("fkxs")!=-1||baseURL.indexOf("xays")!=-1||baseURL.indexOf("xcys")!=-1||baseURL.indexOf("szys")!=-1||baseURL.indexOf("dxys")!=-1||baseURL.indexOf("ytys")!=-1||baseURL.indexOf("qnys")!=-1){var UA="Dart/2.15 (dart:io)"}else if(baseURL.indexOf(".vod")!=-1){var UA="okhttp/4.1.0"}else{var UA="Dalvik/2.1.0"}var 源码=getHttp(JSON.stringify({url:URL,head:{"User-Agent":UA}}));var 列表=e2Arr(源码,".json(list)");var 标题规则=".json(vod_name)";var 地址规则=".c(video_detail?id=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".json(vod_remarks).c().json(vod_time_add)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";',
            "免嗅探规则":'eval(getVar("通用免嗅探"))'
        }
    }
];
function 匹配模板(item){
    var rex=new RegExp(item.匹配);
    return baseURL.search(rex)!=-1;
}
var baseURL=getVar("baseURL");
if(e2Rex(getVar("CODE"),".json(type)")=="CMS"){
    var rule={};
    rule.首页规则='if(getVar("源码").indexOf("<rss")!=-1){var 列表=e2Arr(getVar("源码"),".xml(list video)");var 标题规则=".xml(name).ty(CDATA).tz2(])";var 地址规则=".c(?ac=videolist&ids=).xml(id).z(\\\\d+)";var 图片规则=".xml(pic).t().z(\\\\S.*\\\\S).th( ##%20)";var 简介规则=".c(<font color=\\"#0997F7\\"><b>).xml(dt).t().ct(</b></font><br>)";var 图片底部规则=".xml(last).t()";var 左上规则=".tx(<p style=\\"background-color:#7091fc\\"><font color=\\"#FFFFFF\\" size=\\"40px\\">).xml(type).t().ct(</font></p>)";var 右上规则=".tx(<p style=\\"background-color:#CC00FF\\"><font color=\\"#FFFFFF\\">).xml(note).t().ct(</font></p>)";var NEXTPAGE="";var PREPAGE="";}else if(baseURL.indexOf("?")!=-1){var 列表=e2Arr(getVar("源码"),".json(list)");var 标题规则=".json(vod_name)";var 地址规则=".c(&ac=videolist&ids=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".c(<font color=\\"#0997F7\\"><b>).json(vod_play_from).ct(</b></font><br>)";var 图片底部规则=".json(vod_time)";var 左上规则=".tx(<p style=\\"background-color:#7091fc\\"><font color=\\"#FFFFFF\\" size=\\"40px\\">).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style=\\"background-color:#CC00FF\\"><font color=\\"#FFFFFF\\">).json(vod_remarks).ct(</font></p>)";var NEXTPAGE="";var PREPAGE="";}else{var 列表=e2Arr(getVar("源码"),".json(list)");var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=videolist&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".c(<font color=\\"#0997F7\\"><b>).json(vod_play_from).or().json(art_from).ct(</b></font><br>)";var 图片底部规则=".json(vod_time).or().json(art_time)";var 左上规则=".tx(<p style=\\"background-color:#7091fc\\"><font color=\\"#FFFFFF\\" size=\\"40px\\">).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style=\\"background-color:#CC00FF\\"><font color=\\"#FFFFFF\\">).json(vod_remarks).or().json(art_remarks).ct(</font></p>)";var NEXTPAGE="";var PREPAGE="";}';
    rule.筛选数据='alert("请等待几秒...列表加载中");try{var 源码=getHttp(getVar("首页地址"));}catch(err){alert("哦，报错了，错误描述："+err.message);}var baseURL=getVar("baseURL");if(源码.indexOf("<rss")!=-1){var 列表=e2Arr(源码,".xml(class ty)");var a="";for(var i in 列表){var t=e2Rex(列表[i],".t()");var id=e2Rex(列表[i],".a(id)");a=a+"+"+t+"=&t="+id;}var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var a="分类+全部="+a;var b="翻页"+b;a+"\\n"+b;}else if(baseURL.indexOf("?")!=-1){var 列表=e2Arr(源码,".json(class)");var a="";for(var i in 列表){var t=e2Rex(列表[i],".json(type_name)");var id=e2Rex(列表[i],".json(type_id)");a=a+"+"+t+"=&t="+id;}var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var a="分类+全部="+a;var b="翻页"+b;a+"\\n"+b;}else{var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(class)");if(列表[0]){var a="";for(var i in 列表){var t=e2Rex(列表[i],".json(type_name).or().json(type_title)");var id=e2Rex(列表[i],".json(type_id)");a=a+"+"+t+"=&t="+id;}}else{var a="+电影=&t=1+电视剧=&t=2+综艺=&t=3+动漫=&t=4+动作片=&t=6+喜剧片=&t=7+爱情片=&t=8+科幻片=&t=9+恐怖片=&t=10+剧情片=&t=11+国产剧=&t=13+港台剧=&t=14+日韩剧=&t=15+欧美剧=&t=16";}var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var a="分类+全部="+a;var b="翻页"+b;a+"\\n"+b;}';
    rule.分类规则='if(getVar("源码").indexOf("<rss")!=-1){var 列表=e2Arr(getVar("源码"),".xml(list video)");var 标题规则=".xml(name).ty(CDATA).tz2(])";var 地址规则=".c(?ac=videolist&ids=).xml(id).z(\\\\d+)";var 图片规则=".xml(pic).t().z(\\\\S.*\\\\S).th( ##%20)";var 简介规则=".c(<font color=\\"#0997F7\\"><b>).xml(dt).t().ct(</b></font><br>)";var 图片底部规则=".xml(last).t()";var 左上规则=".tx(<p style=\\"background-color:#7091fc\\"><font color=\\"#FFFFFF\\" size=\\"40px\\">).xml(type).t().ct(</font></p>)";var 右上规则=".tx(<p style=\\"background-color:#CC00FF\\"><font color=\\"#FFFFFF\\">).xml(note).t().ct(</font></p>)";var NEXTPAGE="";var PREPAGE="";}else if(baseURL.indexOf("?")!=-1){var 列表=e2Arr(getVar("源码"),".json(list)");var 标题规则=".json(vod_name)";var 地址规则=".c(&ac=videolist&ids=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".c(<font color=\\"#0997F7\\"><b>).json(vod_play_from).ct(</b></font><br>)";var 图片底部规则=".json(vod_time)";var 左上规则=".tx(<p style=\\"background-color:#7091fc\\"><font color=\\"#FFFFFF\\" size=\\"40px\\">).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style=\\"background-color:#CC00FF\\"><font color=\\"#FFFFFF\\">).json(vod_remarks).ct(</font></p>)";var NEXTPAGE="";var PREPAGE="";}else{var 列表=e2Arr(getVar("源码"),".json(list)");var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=videolist&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".c(<font color=\\"#0997F7\\"><b>).json(vod_play_from).or().json(art_from).ct(</b></font><br>)";var 图片底部规则=".json(vod_time).or().json(art_time)";var 左上规则=".tx(<p style=\\"background-color:#7091fc\\"><font color=\\"#FFFFFF\\" size=\\"40px\\">).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style=\\"background-color:#CC00FF\\"><font color=\\"#FFFFFF\\">).json(vod_remarks).or().json(art_remarks).ct(</font></p>)";var NEXTPAGE="";var PREPAGE="";}';
    rule.选集规则='var type="CMS";var baseURL=getVar("baseURL");if(getVar("源码").indexOf("<rss")!=-1){var 分类=e2Arr(getVar("源码"),".get(dd)");var 简介=e2Rex(getVar("源码"),".c(类型:).xml(type).c(<br>演员表:).xml(actor).c(<br>简介:).xml(des)");var 列表规则=".z2(CDATA\\\\[\\\\([\\\\s\\\\S]*?\\\\)[#]*?\\\\]).fg(#)";var 标题规则=".a(flag)";var 选集规则=".tz($)";var 选集地址规则=".z2(\\\\$\\\\([^\\$|&]*\\\\)).or().z(.*)";}else{if(baseURL.indexOf("61783.xyz")!=-1){var 分类=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(art_remarks).fg(\\\\$\\\\$\\\\$)");var 线路=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(art_name).fg(\\\\$\\\\$\\\\$)");var 选集地址规则=".z2(\\\\$\\\\(.*\\\\)).or().z(.*)";var 简介=e2Rex(getVar("源码"),".c(演员表:).json(list).json(art_author).c(<br>简介:).json(list).json(art_name)");var 列表规则=".fg(#)";var 标题规则=".t()";var 选集规则=".tz($)";}else{var 分类=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(vod_play_url).fg(\\\\$\\\\$\\\\$)");var 线路=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(vod_play_from).fg(\\\\$\\\\$\\\\$)");var 选集地址规则=".z2(\\\\$\\\\(.*\\\\)).or().z(.*)";var 简介=e2Rex(getVar("源码"),".c(演员表:).json(list).json(vod_actor).c(<br>简介:).json(list).json(vod_content)");var 列表规则=".fg(#)";var 标题规则=".t()";var 选集规则=".tz($)";}}';
    rule.搜索规则='if(baseURL.indexOf("?")!=-1){var URL=baseURL+"&ac=videolist&wd="+getVar("KEY");}else{var URL=baseURL+"?ac=videolist&wd="+getVar("KEY");}var 源码=getHttp(URL);if(源码.indexOf("<rss")!=-1){var 列表=e2Arr(源码,".xml(video)");var 标题规则=".xml(name).ty(CDATA).tz2(])";var 地址规则=".c(?ac=videolist&ids=).xml(id).z(\\d+)";var 图片规则=".xml(pic).t().z(http.*\\S).th( ##%20)";var 简介规则=".c(<font color=\\"#0997F7\\"><b>).xml(dt).t().c(</b></font><br>).xml(last).t()";var NEXTPAGE="";var PREPAGE="";}else{var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=videolist&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".json(type_name).c().json(vod_time).or().json(art_time).c().json(vod_remarks).or().json(art_remarks)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}';
    rule.免嗅探规则='eval(getVar("通用免嗅探"))';
JSON.stringify(rule);
}else{
JSON.stringify(模板库.find(匹配模板).rule);
}
######读取本地规则6
if(getVar("QJS")&&getVar("QJS")!="null"){
eval(getVar("QJS"));
}else{
eval(e2Rex(getHttp('https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/aliyun/QJS.js'),'.dn64()'));
}
var filename='一个影视本地规则.txt';
_.read(filename);
######写入本地规则7
if(getVar("QJS")&&getVar("QJS")!="null"){
eval(getVar("QJS"));
}else{
eval(e2Rex(getHttp('https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/aliyun/QJS.js'),'.dn64()'));
}
var filename='一个影视本地规则.txt';
var 记录=[];
if(getVar("KEY").length>10){
var rule=e2Rex(getVar("KEY"),".json(rule)")||e2Rex(getVar("KEY"),".dn64().json(rule)");
if(rule){
var title=e2Rex(getVar("KEY"),".json(title)")||e2Rex(getVar("KEY"),".dn64().json(title)");
var img=e2Rex(getVar("KEY"),".json(img)")||e2Rex(getVar("KEY"),".dn64().json(img)");
var baseURL=e2Rex(getVar("KEY"),".json(baseURL)")||e2Rex(getVar("KEY"),".dn64().json(baseURL)");
var 分类地址=e2Rex(getVar("KEY"),".json(分类地址)")||e2Rex(getVar("KEY"),".dn64().json(分类地址)");
var 首页地址=e2Rex(getVar("KEY"),".json(首页地址)")||e2Rex(getVar("KEY"),".dn64().json(首页地址)");
var type="网页类";
记录.push({title:title,img:img,baseURL:baseURL,分类地址:分类地址,首页地址:首页地址,type:type,rule:rule});
}else{
if(e2Rex(getVar("KEY"),".json(title)")&&e2Rex(getVar("KEY"),".json(url)")&&e2Rex(getVar("KEY"),".json(img)")){
var title=e2Rex(getVar("KEY"),".json(title)");var baseURL='"'+e2Rex(getVar("KEY"),".json(url)")+'";';var img=e2Rex(getVar("KEY"),".json(img)");
if(baseURL.search(/api\.php\/app\//)!=-1||baseURL.search(/xgapp\.php\/v/)!=-1){
var 分类地址='getVar("baseURL")+"video?tid=分类&lang=&year=&pg=翻页";';
var 首页地址='getVar("baseURL")+"index_video?token=";';
var type="小龟";
}else if(baseURL.search(/\.php\/.+?\.vod/)!=-1){
var 分类地址='getVar("baseURL")+"?type=分类&lang=&year=&page=翻页";';
var 首页地址='getVar("baseURL")+"/vodPhbAll";';
var type="v1.vod";
}else if(baseURL.search(/api\.php\/.+?\/vod\//)!=-1){
var 分类地址='getVar("baseURL")+"?ac=list&class=分类&page=翻页";';
var 首页地址='getVar("baseURL")+"?ac=list&class=&start=&area=&type=&page=1";';
var type="iptv";
}else{
    alert("暂未适配");
}
记录.push({title:title,img:img,baseURL:baseURL,分类地址:分类地址,首页地址:首页地址,type:type});
}else if(getVar("KEY").indexOf(",http")!=-1){
var 输入条目=getVar("KEY").match(/.+,http.+/g);
for(var j in 输入条目){
var title=e2Rex(输入条目[j],".tz(,)");var baseURL='"'+e2Rex(输入条目[j],".ty(,)")+'";';var img="http://1.117.152.239:39000/tupian.php?text="+title;
if(baseURL.indexOf("?")!=-1){
var 分类地址='getVar("baseURL")+"&ac=videolist分类&pg=翻页";';
var 首页地址='getVar("baseURL")+"&ac=list&pg=1";';
var type="CMS";
}else{
var 分类地址='getVar("baseURL")+"?ac=videolist分类&pg=翻页";';
if(baseURL.indexOf("yanaifei.cn")!=-1){
var 首页地址='getVar("baseURL")+"?ac=videolist&pg=1";';
}else{
var 首页地址='getVar("baseURL")+"?ac=list&pg=1";';
}
var type="CMS";
}
记录.push({title:title,img:img,baseURL:baseURL,分类地址:分类地址,首页地址:首页地址,type:type});
}
}else{
    alert("请输入正确规则格式：\n1,APP类：{\"title\":\"播放呀\",\"url\":\"https:\/\/www.bofangya.com\/xgapp.php\/v1\/\",\"img\":\"https:\/\/inmemory.coding.net\/p\/InMemory\/d\/MBrowser\/git\/raw\/master\/AppFile\/AppIcon\/播放呀.png\"}\n2,CMS类：xx资源,http..... \n3,网页类：参考内置网页源模板");
}
}
if(_.read(filename)){
    var 新记录=JSON.parse(_.read(filename));
}else{
    var 新记录=[];
}
for(var i in 记录){
var 当前条目=[];当前条目.push(记录[i]);
if(新记录.length==0) {
    新记录.push({title:记录[i].type,data:当前条目});
}else{
    let res=新记录.some(item=>{
    //判断类型，有就添加到当前项
      if(item.title == 记录[i].type){
      item.data=当前条目.concat(item.data.filter(d=>d.baseURL!=记录[i].baseURL));
      return true
      }
    });
    if (!res) {
    //如果没找相同类型添加一个类型
      新记录.push({title:记录[i].type,data:当前条目});
    }
}
}
_.write(JSON.stringify(新记录),filename);
_.read(filename);
}else{
    alert("请输入正确规则格式：\n1,APP类：{\"title\":\"播放呀\",\"url\":\"https:\/\/www.bofangya.com\/xgapp.php\/v1\/\",\"img\":\"https:\/\/inmemory.coding.net\/p\/InMemory\/d\/MBrowser\/git\/raw\/master\/AppFile\/AppIcon\/播放呀.png\"}\n2,CMS类：xx资源,http..... \n3,网页类：参考内置网页源模板");
}
######COOKIE8
var baseURL=getVar("baseURL");
var cm=android.webkit.CookieManager.getInstance();
var COOKIE=cm.getCookie(baseURL);
COOKIE;
######QJS9
ZXZhbChmdW5jdGlvbihlLGYsYSxkLGMsZyl7Yz1mdW5jdGlvbihiKXtyZXR1cm4oYjxmPyIiOmMocGFyc2VJbnQoYi9mKSkpKygzNTwoYiU9Zik/U3RyaW5nLmZyb21DaGFyQ29kZShiKzI5KTpiLnRvU3RyaW5nKDM2KSl9O2lmKCEiIi5yZXBsYWNlKC9eLyxTdHJpbmcpKXtmb3IoO2EtLTspZ1tjKGEpXT1kW2FdfHxjKGEpO2Q9W2Z1bmN0aW9uKGIpe3JldHVybiBnW2JdfV07Yz1mdW5jdGlvbigpe3JldHVybiJcXHcrIn07YT0xfWZvcig7YS0tOylkW2FdJiYoZT1lLnJlcGxhY2UobmV3IFJlZ0V4cCgiXFxiIitjKGEpKyJcXGIiLCJnIiksZFthXSkpO3JldHVybiBlfSgiKDUoKXszIDY9e307MyBtPTEuMDszIHE9Ui4xdi4xdy4xeC4xeTszIHI9Ui4xdi4xdy4xeC4xeSgpLmMuMjc7MyBzPTF6LjI4LjI5LjJhKCk7MyB0PVMuMmI7MyB1PVMuMUE7MyB2PXQuVC4yYzszIHc9MUIoKSt2KycyZCcrditFKCkuVS5WKDAsNCkrJyQkJCcrRSgpLjE4K3Y7SD0oMUMpPT4xRCAxQz09PScyZSc7NSAxOShhKXsyZiAxYT0xRCBhOzcgYSE9SSYmKDFhPT0nMmcnfHwxYT09JzUnKX0zIHk9Uy4yaC4yaTszIHo9OCB5LjJqLjJrKCk7NSBXKGEpezFFPXsxRjo1KCl7NyBhKCl9LH07MyBiPTggeS4ybCgxRSk7ei5YKGIpOzcgYn01IFkoYSxiKXtKIEs9MDtKIDFiPVtdO0woSzxhLkQpezFiLjFjKGEuMm0oSyxLK2IpKTtLKz1ifTcgMWIuMm4oKG8pPT5vLkQ+MCl9NSBYKGwsbil7Yz1bXTtaPVkobCxsLkQvbik7MyBuPTA7TChuPFouRCl7NSBsKHgpezcgNSBvKCl7MyBhPVtdOzFkKEogaT0wO2k8Wlt4XS5EO2krKyl7YS4xYyhaW3hdW2ldKCkpfTcgYX19Yy4xYyhXKGwobikpKTtuKyt9NyBjfTUgMTAoZil7MyBhPWYuMm8oKTs5KCFhLjFHKCkpYS4xMCgpfTUgRihhLGIpezMgYz04IHQuVCh3KydcdTY1NzBcdTYzNmUnK3YrYik7MTAoYyk7MyBkPTggdC4ycChjLDFlKTtkLkYoYSk7ZC5NKCl9NSBOKGEpezMgYj04IHQuVCh3KydcdTY1NzBcdTYzNmUnK3YrYSk7MyBjPTA7OSghYi4xRygpfHwoYz1iLkQoKSk9PTApNycnOzMgZD11LjFILjFJLjFKKHUuMUsuMUwsYyk7MyBlPTggdC4ycShiKTtlLk4oZCk7ZS5NKCk7NyA4IHUuMnIoZCl9MyBBPVIuMnMuMnQ7MyBCPUEuMnUuMnY7NSAxMShvKXtKezFmLEcsTywxZywxMiwxaH09bzszIGE9QS4ydy4yeCgxZik7YS4yeSgxMyk7YS4yeigyQSk7MWg9PT0xZT9hLjFNKDFoKTphLjFNKDEzKTs5KDE5KEcpKTFkKHggMU4gRylhLkcoeCxHW3hdKTs5KDE5KE8pKXs5KDFnPT09MTMpYS4yQihPKTsxTyAxZChwIDFOIE8pYS4yQyhwLE9bcF0pfTMgYjs5KDFnPT09MTN8fDEyPT0nMkQnKWI9YS4xMihCLjJFKS4xUCgpOzFPIGI9YS4xMihCLjJGKS4xUCgpOzcgYn01IDFRKGEsYil7YS4yRyhiKTs3IGEuMkgoKX01IDFSKGEsYil7NyBiKyc9JythLjJJKGIpfTUgMVMoYSl7MyBiPScnOzMgYz1hLjJKKCkuMVQoKS4xVSgpO0woYy4xVigpKXszIGQ9Yy4xVygpO2IrPWQuMVgoKSsnPScrZC4xWSgpKyc7J303IGJ9NSAxWihhLGIpezcgYS5HKGIpfTUgMjAoYSl7MyBiPScnOzMgYz1hLjJLKCkuMVQoKS4xVSgpO0woYy4xVigpKXszIGQ9Yy4xVygpO2IrPWQuMVgoKSsnPScrZC4xWSgpKyc7J303IGJ9NSAxaShhKXszIGI9YS4xaignLycpOzkoYS5EKCk9PWIrMSl7YT1hLlYoMCxiKTs3IDFpKGEpfTcgYS5WKDAsYS4xaignLicpKX01IDFrKG8pezJMe0p7MWwsMjF9PW87MyBhPTExKG8pOzMgYj0xaShhLjFmKCkuMjIoKSk7MyBjPXMuMk0oYS4yTigpLjJPKCc7JylbMF0pOzMgZD1iLlYoYi4xaignLycpKzEpKycuJytjO1A9SCgxbCk/MWwrditkOncrJ1x1NGUwYlx1OGY3ZCcrditkOzMgZj1hLjJQKCk7MyBnPTggdS4xSC4xSS4xSih1LjFLLjFMLDJRKTszIGg9MDszIGk9OCB0LjJSKCk7TCgoaD1mLk4oZykpIT0tMSl7aS5GKGcsMCxoKX0zIGo9OCB0LlQoUCk7MTAoaik7MyBrPTggdC4yUyhqKTtrLkYoaS4yVCgpKTs5KDIxPT09MWUpNyBQO1EoJ1x1NGUwYlx1OGY3ZFx1NjIxMFx1NTI5Zlx1ZmYwY1x1OGRlZlx1NWY4NDonK1ApOzcgUH0yVShlKXsxNChlKTtRKCdcdTRlMGJcdThmN2RcdTU5MzFcdThkMjUsXHU4YmY3XHU2MjUzXHU1ZjAwXHU4YzAzXHU4YmQ1XHU1M2YwXHU2N2U1XHU3NzBiXHU1MTc3XHU0ZjUzXHU1ZjAyXHU1ZTM4XHU0ZmUxXHU2MDZmJyl9MlZ7OShpIT1JKWkuTSgpOzkoayE9SSlrLk0oKTs5KGYhPUkpZi5NKCl9fTMgQz1yLjJXKEUoKS5VLHIuMlgpOzUgMW0oYSxiKXszIGM9Qy4xbigpO2MuMlkoYSxiKTtjLjFvKCl9NSAxcChhLGIpezcgQy4yWihhLGIpfTUgMXEoYSl7MyBjPUMuMW4oKTtjLjMwKGEpO2MuMW8oKX01IDIzKCl7MyBjPUMuMW4oKTtjLjMxKCk7Yy4xbygpfTUgJCgpezMgYT0xNS5EOzMyKGEpezI0IDE6NyAxNigxNVswXSk7MjQgMjo3IDMzKDE1WzBdLDE1WzFdKTszNDo3IDM1KCl9fTUgMTQoZSl7SChlKT9cdTYyYTVcdTk1MTkoZSk6XHU2MmE1XHU5NTE5KGUuMjIoKSl9NSBRKGEpe3EuaC5iKGEpfTUgMXIoKXs4IFIuMXouMzYuMzcoKS4zOCg0KX01IDFCKCl7NyByLjM5KEkpLjNhKCl9NSAxNyhhKXtTLjFBLjNiLjE3KGEpfTUgRSgpe289e307by5VPTFzKDE2KCcxdCcpLCcuMXUoVSkudCgpJyk7by4yNT0xcygxNignMXQnKSwnLjF1KDI1KS50KCknKTtvLjE4PTFzKDE2KCcxdCcpLCcuMXUoMTgpLnQoKScpOzcgb302LjNjPW07Ni5OPU47Ni5GPUY7Ni4xNz0xNzs2Llc9Vzs2Llg9WDs2Llk9WTs2LjFyPTFyOzYuSD1IOzYuMTE9MTE7Ni4zZD0xUTs2LjNlPTFSOzYuM2Y9MVM7Ni4zZz0xWjs2LjNoPTIwOzYuMWs9MWs7Ni5FPUU7Ni5RPVE7Ni4xND0xNDs2LjFtPTFtOzYuMXA9MXA7Ni4xcT0xcTs2LjNpPTIzOzYuJD0kOzI2LjY9Nn0uMUYoMjYpKTsiLAo2MiwyMDUsIiAgIHZhciAgZnVuY3Rpb24gXyByZXR1cm4gbmV3IGlmICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoIGluZm8gd3JpdGUgaGVhZGVyIGlzU3RyaW5nIG51bGwgbGV0IGluZGV4IHdoaWxlIGNsb3NlIHJlYWQgcGFyYW1zIHNhdmVwYXRoIHRvYXN0IFBhY2thZ2VzIGphdmEgRmlsZSBzaWduIHN1YnN0cmluZyB0aHJlYWQgc3VibWl0IGNodW5rIGxpc3QgbWtkaXJzIGh0dHAgbWV0aG9kIHRydWUgZXJyb3IgYXJndW1lbnRzIGdldFZhciBzbGVlcCBuYW1lIGlzT2JqZWN0IHR5cGUgcmVzIHB1c2ggZm9yIGZhbHNlIHVybCBqc29uIHJlIHRyaW1VIGxhc3RJbmRleE9mIGRvd25sb2FkIHNldHBhdGggcHV0U3AgZWRpdCBjb21taXQgZ2V0U3AgY2xlYXJTcCBiYWNrIGUyUmV4IFFNSU5GTyBnZXQgY24gbWJyb3dzZXIgY29uZmlnIEFwcCBhbmRyb2lkIGxhbmcgcGF0aCB2YWwgdHlwZW9mIG9iaiBjYWxsIGV4aXN0cyByZWZsZWN0IEFycmF5IG5ld0luc3RhbmNlIEJ5dGUgVFlQRSBmb2xsb3dSZWRpcmVjdHMgaW4gZWxzZSBleGVjdXRlIGh0dHBCb2R5IGh0dHBDb29raWUgaHR0cENvb2tpZXMgZW50cnlTZXQgaXRlcmF0b3IgaGFzTmV4dCBuZXh0IGdldEtleSBnZXRWYWx1ZSBodHRwSGVhZGVyIGh0dHBIZWFkZXJzIHRpcHMgdG9TdHJpbmcgcmVtb3ZlU3AgY2FzZSB2ZXJzaW9uIHRoaXMgYXBwbGljYXRpb25Db250ZXh0IHdlYmtpdCBNaW1lVHlwZU1hcCBnZXRTaW5nbGV0b24gaW8gc2VwYXJhdG9yIHFtIHN0cmluZyBjb25zdCBvYmplY3QgdXRpbCBjb25jdXJyZW50IEV4ZWN1dG9ycyBuZXdDYWNoZWRUaHJlYWRQb29sIEZ1dHVyZVRhc2sgc2xpY2UgZmlsdGVyIGdldFBhcmVudEZpbGUgRmlsZVdyaXRlciBGaWxlSW5wdXRTdHJlYW0gU3RyaW5nIG9yZyBqc291cCBDb25uZWN0aW9uIE1ldGhvZCBKc291cCBjb25uZWN0IGlnbm9yZUNvbnRlbnRUeXBlIG1heEJvZHlTaXplIDEwNDg1NzYwMDAgcmVxdWVzdEJvZHkgZGF0YSBwb3N0IFBPU1QgR0VUIGNoYXJzZXQgYm9keSBjb29raWUgY29va2llcyBoZWFkZXJzIHRyeSBnZXRFeHRlbnNpb25Gcm9tTWltZVR5cGUgY29udGVudFR5cGUgc3BsaXQgYm9keVN0cmVhbSA0MDk2IEJ5dGVBcnJheU91dHB1dFN0cmVhbSBGaWxlT3V0cHV0U3RyZWFtIHRvQnl0ZUFycmF5IGNhdGNoIGZpbmFsbHkgZ2V0U2hhcmVkUHJlZmVyZW5jZXMgTU9ERV9QUklWQVRFIHB1dFN0cmluZyBnZXRTdHJpbmcgcmVtb3ZlIGNsZWFyIHN3aXRjaCBwdXRWYXIgZGVmYXVsdCBnZXRDb2RlIGFwcCBJbnN0cnVtZW50YXRpb24gc2VuZEtleURvd25VcFN5bmMgZ2V0RXh0ZXJuYWxGaWxlc0RpciBnZXRQYXRoIFRocmVhZCBWRVJTSU9OIGJkIGNrIGNrcyBoZCBoZHMgZGVsU3AiLnNwbGl0KCIgIiksCjAse30pKTs=