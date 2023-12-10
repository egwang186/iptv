######写入规则1
eval(readStr("QJS"));
var iptvfile="一个盒子直播规则.js";
var webfile="一个盒子站源规则.js";
if(getVar("按钮")=="添加远程订阅"){
    var filename=iptvfile;
    var 记录=[];
    if(getVar("iptvtext").indexOf(",http")!=-1){
        var 输入条目=getVar("iptvtext").match(/.+,http.+/g);
        for(var j in 输入条目){
           var title=输入条目[j].split(",")[0];
           var url=输入条目[j].split(",")[1];
           记录.push("####\n###type\niptv\n###分类\niptv\n###数据\n"+title+"\n##\n远程$"+url+"\n####");
        }
    }else{
        alert("格式输入错误: 分类名称不用填，订阅地址格式：xxx,http...");
    }
}else if(getVar("按钮")=="添加源文本"){
    var filename=iptvfile;
    var 记录=[];
    if(getVar("iptvtext").search(/,.+?:\/\//)!=-1){
        var 输入条目=getVar("iptvtext").match(/.+,.+?:\/\/.+/g).join("\n");
        var sort=getVar("iptvsort")||"未分类";
        记录.push("####\n###type\niptv\n###分类\niptv\n###数据\n"+sort+"\n##\n"+输入条目+"\n####");
    }else{
        alert("格式输入错误, 分类名称必填，源文本格式：xxx,http...");
    }
}else if(getVar("按钮")=="添加cms"){
    var filename=webfile;
    var 记录=[];
    if(getVar("cmstext").indexOf(",http")!=-1){
        var 输入条目=getVar("cmstext").match(/.+,http.+/g);
        var type="cms";var sort=getVar("cmssort")||"未分类";
        for(var j in 输入条目){
           var title=输入条目[j].split(",")[0];
           var url=输入条目[j].split(",")[1];
           var baseURL='"'+url+'";';var img="http://42.202.35.113:39000/tupian.php?text="+title;
           if(baseURL.indexOf("?")!=-1){
            var 分类地址='getVar("baseURL")+"&ac=videolist分类&pg=翻页";';
            var 首页地址='getVar("baseURL")+"&ac=list&pg=1";';
            var 搜索地址='getVar("baseURL")+"&wd=关键字&ac=显示&pg=翻页";';
           }else{
            var 分类地址='getVar("baseURL")+"?ac=videolist分类&pg=翻页";';
            var 首页地址='getVar("baseURL")+"?ac=list&pg=1";';
            var 搜索地址='getVar("baseURL")+"?wd=关键字&ac=显示&pg=翻页";';
           }
           记录.push("####\n###type\n"+type+"\n###分类\n"+sort+"\n###标题\n"+title+"\n###图片\n"+img+"\n###BaseURL\n"+baseURL+"\n###首页地址\n"+首页地址+"\n###分类地址\n"+分类地址+"\n###搜索地址\n"+搜索地址+"\n###rule\n####");
        }
    }else{
        alert("格式输入错误分类名称必填，订阅地址格式：xxx,http...");
    }
}else if(getVar("按钮")=="添加站源"){
    var filename=webfile;
    var 记录=[];
    if(getVar("webtext").indexOf("####")!=-1){
        记录.push(getVar("webtext"));
    }else{
        alert("格式输入错误");
    }
}
if(记录[0]){
if(readStr(filename).indexOf("#####")!=-1){
    var 新记录=readStr(filename).match(/#####[\s\S]+?#####/g);
}else{
    var 新记录=[];
}
for(var i in 记录){
var 当前条目=[];当前条目.push(记录[i]);
if(新记录.length==0) {
    var 分类=记录[i].split(/####/)[1].split(/###.*/)[2].replace(/\s+/g,"");
    新记录.push("#####"+分类+"\n"+记录[i]+"\n#####");
}else{
    let res=新记录.some(item=>{
    //判断类型，有就添加到当前项
      var 当前分类=item.match(/#####(.+)/)[1];
      var 分类=记录[i].split(/####/)[1].split(/###.*/)[2].replace(/\s+/g,"");
      if(当前分类 == 分类){
      return true
      }
    });
    if (!res) {
    //如果没找相同类型添加一个类型
    var 分类=记录[i].split(/####/)[1].split(/###.*/)[2].replace(/\s+/g,"");
    新记录.push("#####"+分类+"\n"+记录[i]+"\n#####");
    }else{
        新记录=新记录.map((item)=>{
            //判断类型，有就添加到当前项
              var 当前分类=item.match(/#####(.+)/)[1];
              var 分类=记录[i].split(/####/)[1].split(/###.*/)[2].replace(/\s+/g,"");
              if(当前分类 == 分类){
              var data=item.replace(/#####.*/g,"").match(/####[\s\S]+?####/g);
              data=当前条目.concat(data);
              item="#####"+当前分类+"\n"+data.join("\n")+"\n#####";
              return item
              }else{
              return item
              }
            });
    }
}
}
writeStr(filename,新记录.join("\n"));
alert("写入成功");
}else{
alert("写入失败");
}
######直播选集列表2
eval(readStr("QJS"));
if(getVar("地址").indexOf("远程$")!=-1){
    var u=getVar("地址").split("远程$")[1];
    var 本地数据=readStr(u.replace(/[:\.\/\?\s]+/g,"")+".txt")+"";
    if(本地数据.length>500){
        var code=本地数据;
    }else{
        var code=getHttp(u);
        writeStr(code,u.replace(/[:\.\/\?\s]+/g,"")+".txt");
    }
}else{
    var code=getVar("地址");
}
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
######直播免嗅探3
var uu=getVar("地址").split("/?wd=")[1].replace(/幻魔快修/g,"?");
if(uu.indexOf("#")!=-1){
var urls=uu.split("#");
var items=[];
for(var i=0;i<urls.length;i++){
    
    if(urls[i].indexOf(".php")!=-1){
        var resp = JZ(JSON.stringify({url:urls[i],redirect:false,head:{"User-Agent":"Mozilla/5.0","Accept-Language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"}}));
        var u = resp.head.Location || resp.head.location;
        if(!u){
            if(urls[i].indexOf(".php?")!=-1){
                u=urls[i]+"&type=.m3u8";
            }else if(urls[i].indexOf(".php")!=-1){
                u=urls[i];
            }
        }else if(u.indexOf(".php?")!=-1){
            u=u+"&type=.m3u8";
        }else if(u.indexOf(".php")!=-1){
            u=u+"?type=.m3u8";
        }else if(u.length<40){
            if(urls[i].indexOf(".php?")!=-1){
                u=urls[i]+"&type=.m3u8";
            }else if(urls[i].indexOf(".php")!=-1){
                u=urls[i]+"?type=.m3u8";
            }
        }
    }else if(urls[i].indexOf("mitv://")!=-1){
        var u=urls[i].replace("mitv://","P2p://");
    }else if(urls[i].indexOf("www.youtube.com/watch?v=")!=-1){
        var resp=getHttp(JSON.stringify({url:"https://www.azrotv.com/extras/youtube/",post:{"url":urls[i]}}));
        var u=e2Rex(resp,".get(textarea).t()");
    }else{
        var u=urls[i];
    }
    items.push({name:"地址"+(i+1),url:u,head:{"User-Agent":"Mozilla/5.0","Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"}});
}
JSON.stringify(items);
}else{
    if(uu.indexOf("43.224.33.165/")!=-1){
        if(uu.indexOf(".m3u8")!=-1||uu.indexOf(".php?url=http")!=-1){
            JSON.stringify({name:"地址",url:uu,head:{"User-Agent":"python","Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"}});
        }else{
            JSON.stringify({name:"地址",url:uu+"&type=.m3u8",head:{"User-Agent":"python","Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"}});
        }
    
    }else{
    if(uu.indexOf(".php")!=-1){
        var resp=JZ(JSON.stringify({url:uu,redirect:false,head:{"User-Agent":"Mozilla/5.0","Accept-Language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"}}));
        var u=resp.head.Location||resp.head.location;
        if(!u){
            if(uu.indexOf(".php?")!=-1){
                u=uu+"&type=.m3u8";
            }else if(uu.indexOf(".php")!=-1){
                u=uu+"?type=.m3u8";
            }
        }else if(u.indexOf(".php?")!=-1){
            u=u+"&type=.m3u8";
        }else if(u.indexOf(".php")!=-1){
            u=u+"?type=.m3u8";
        }else if(u.length<40){
            if(uu.indexOf(".php?")!=-1){
                u=uu+"&type=.m3u8";
            }else if(uu.indexOf(".php")!=-1){
                u=uu+"?type=.m3u8";
            }
        }
    }else if(uu.indexOf("mitv://")!=-1){
        var u=uu.replace("mitv://","P2p://");
    }else if(uu.indexOf("www.youtube.com/watch?v=")!=-1){
        var resp=getHttp(JSON.stringify({url:"https://www.azrotv.com/extras/youtube/",post:{"url":uu}}));
        var u=e2Rex(resp,".get(textarea).t()");
    }else{
        var u=uu;
    }
JSON.stringify({name:"地址",url:u,head:{"User-Agent":"Mozilla/5.0","Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"}});
    }
}
######通用免嗅探4
var uu=getVar("地址");
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
        JSON.stringify({name:"地址",url:playurl,head:{"User-Agent":"Lavf/58.12.100","Referer":"wkfile.com"}});
    }else if(playurl.indexOf(".m3u8")>15||playurl.indexOf(".mp4")>15||playurl.indexOf("/obj/tos")!=-1){
        if(playurl.indexOf("hsl.ysgc.xyz")!=-1){
        var cccc=JZ(JSON.stringify({url:"https://play.dushe520.com/m3u8.php?url="+playurl}));
        JSON.stringify({name:"地址",url:JSON.parse(cccc.code).url,head:{"Referer":"https://ysgc.cc"}});
        }else{
        JSON.stringify({name:"地址",url:playurl.match(/.*(http.*)/)[1]});
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
                            JSON.stringify({name:"地址",url:ppurl,head:{"User-Agent":"Mozilla/5.0","Referer":""}});
                        }else if(realurl.indexOf("bilibili.com")!=-1){
                            JSON.stringify({name:"地址",url:ppurl});
                        }else{
                            JSON.stringify({name:"地址",url:ppurl});
                        }
                    }
                }else{
                    if(playurl.indexOf("www.mgtv.com")!=-1){
                    JSON.stringify({name:"地址",url:realurl,head:{"User-Agent":"Mozilla/5.0","Referer":""}}); 
                    }else{
                    JSON.stringify({name:"地址",url:realurl});
                    }
                }
            }else{
                function 切换解析(data){
                        if(data.split("url=")[1].indexOf("http")!=-1){
                            return "web=http://42.202.35.113:39000/?url="+data.split("url=")[1];
                        }else if(data.split("url=")[1].indexOf("renrenmi")!=-1){
                            return "web=https://jx.blbo.cc:4433/?url="+data.split("url=")[1];
                        }else if(data.split("url=")[1].indexOf("LT-")!=-1){
                            return "web=https://analysis.yikan.one/analysis/player/?uid=8&my=fjkmoqFJLORTVZ1359&url="+data.split("url=")[1];
                        }else{
                            var 全能="http://jx.jisujiexi.vip/home/api?type=ys&uid=5196896&key=ajortuvxzRTUWXZ037&url="+data.split("url=")[1];
                            var link=e2Rex(getHttp(全能),".json(url).or().json(data).json(url)");
                            return JSON.stringify({name:"地址",url:link});
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
                            JSON.stringify({name:"地址",url:realurl,head:{"User-Agent":"Mozilla/5.0","Referer":""}});
                        }else if(playurl.indexOf("bilibili.com")!=-1){
                            JSON.stringify({name:"地址",url:realurl});
                        }else{
                            JSON.stringify({name:"地址",url:realurl});
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
    JSON.stringify({name:"地址",url:playurl});
}else{
"web="+uu;
}
######CMSrule规则5
##首页规则
if(getVar("源码").indexOf("<rss")!=-1){
    var 列表=e2Arr(getVar("源码"),".xml(list video)");var 标题规则=".xml(name).ty(CDATA).tz2(])";var 地址规则=".c(?ac=videolist&ids=).xml(id).z(\\d+)";var 图片规则=".xml(pic).t().z(\\S.*\\S)";var 简介规则=".c(<font color='#0997F7'><b>).xml(dt).t().ct(</b></font><br>)";var 图片底部规则=".xml(last).t()";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).xml(type).t().ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='#FFFFFF'>).xml(note).t().ct(</font></p>)";var NEXTPAGE="";var PREPAGE="";
}else if(baseURL.indexOf("?")!=-1){
    var 列表=e2Arr(getVar("源码"),".json(list)");var 标题规则=".json(vod_name)";var 地址规则=".c(&ac=videolist&ids=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font><br>)";var 图片底部规则=".json(vod_time)";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='#FFFFFF'>).json(vod_remarks).ct(</font></p>)";var NEXTPAGE="";var PREPAGE="";
}else{
    if(baseURL.indexOf("/provide/art/")!=-1){
        var 列表=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list)");
        var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=detail&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font>).or().json(art_from).ct(</b></font>)";var 图片底部规则=".json(vod_time).or().json(art_time)";var 左上规则=".tx(<p style='background-color:#0997F7'><font color='white' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='white'>).json(vod_remarks).ct(</font></p>).or().json(vod_remark).ct(</font></p>).or().json(art_remarks).ct(</font></p>)";
  }else{
  var 列表=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=videolist&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font>).or().json(art_from).ct(</b></font>)";var 图片底部规则=".json(vod_time).or().json(art_time)";var 左上规则=".tx(<p style='background-color:#0997F7'><font color='white' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='white'>).json(vod_remarks).ct(</font></p>).or().json(vod_remark).ct(</font></p>).or().json(art_remarks).ct(</font></p>)";
  }
}
##筛选数据
try{var 源码=getHttp(getVar("首页地址"));}catch(err){alert("筛选数据获取失败，错误描述："+err.message);}var baseURL=getVar("baseURL");alert("筛选数据获取成功");if(源码.indexOf("<rss")!=-1){var 列表=e2Arr(源码,".xml(class ty)");var a="";for(var i in 列表){var t=e2Rex(列表[i],".t()");var id=e2Rex(列表[i],".a(id)");a=a+"+"+t+"=&t="+id;}var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var a="分类+全部="+a;var b="翻页"+b;a+"\n"+b;}else if(baseURL.indexOf("?")!=-1){var 列表=e2Arr(源码,".json(class)");var a="";for(var i in 列表){var t=e2Rex(列表[i],".json(type_name)");var id=e2Rex(列表[i],".json(type_id)");a=a+"+"+t+"=&t="+id;}var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var a="分类+全部="+a;var b="翻页"+b;a+"\n"+b;}else{var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(class)");if(列表[0]){var a="";for(var i in 列表){var t=e2Rex(列表[i],".json(type_name).or().json(type_title)");var id=e2Rex(列表[i],".json(type_id)");a=a+"+"+t+"=&t="+id;}}else{var a="+网红主播=&t=20+偷拍自拍=&t=21+麻豆原创=&t=22+国产精品=&t=23+名人明星=&t=24+网曝门事件=&t=25+无码专区=&t=26+有码专区=&t=27+福利姬=&t=28+娇妻素人=&t=29+强奸乱伦=&t=30+制服职场=&t=31+国模私拍=&t=32+抖阴视频=&t=33";}var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var a="分类+全部="+a;var b="翻页"+b;a+"\n"+b;}
##分类规则
if(getVar("源码").indexOf("<rss")!=-1){var 列表=e2Arr(getVar("源码"),".xml(list video)");var 标题规则=".xml(name).ty(CDATA).tz2(])";var 地址规则=".c(?ac=videolist&ids=).xml(id).z(\\d+)";var 图片规则=".xml(pic).t().z(\\S.*\\S)";var 简介规则=".c(<font color='#0997F7'><b>).xml(dt).t().ct(</b></font><br>)";var 图片底部规则=".xml(last).t()";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).xml(type).t().ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='#FFFFFF'>).xml(note).t().ct(</font></p>)";var NEXTPAGE="";var PREPAGE="";}else if(baseURL.indexOf("?")!=-1){var 列表=e2Arr(getVar("源码"),".json(list)");var 标题规则=".json(vod_name)";var 地址规则=".c(&ac=videolist&ids=).json(vod_id)";var 图片规则=".json(vod_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font><br>)";var 图片底部规则=".json(vod_time)";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='#FFFFFF'>).json(vod_remarks).ct(</font></p>)";var NEXTPAGE="";var PREPAGE="";
}else{
    if(baseURL.indexOf("/provide/art/")!=-1){
        var 列表=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list)");
        var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=detail&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font>).or().json(art_from).ct(</b></font>)";var 图片底部规则=".json(vod_time).or().json(art_time)";var 左上规则=".tx(<p style='background-color:#0997F7'><font color='white' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='white'>).json(vod_remarks).ct(</font></p>).or().json(vod_remark).ct(</font></p>).or().json(art_remarks).ct(</font></p>)";
  }else{
  var 列表=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=videolist&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(vod_play_from).ct(</b></font>).or().json(art_from).ct(</b></font>)";var 图片底部规则=".json(vod_time).or().json(art_time)";var 左上规则=".tx(<p style='background-color:#0997F7'><font color='white' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='white'>).json(vod_remarks).ct(</font></p>).or().json(vod_remark).ct(</font></p>).or().json(art_remarks).ct(</font></p>)";
  }
}
##选集规则
var type="CMS";var baseURL=getVar("baseURL");
if(getVar("源码").indexOf("<rss")!=-1){
    var 分类=e2Arr(getVar("源码"),".get(dd)");var 简介=e2Rex(getVar("源码"),".c(类型:).xml(type).c(<br>演员表:).xml(actor).c(<br>简介:).xml(des)");var 列表规则=".z2(CDATA\\[\\([\\s\\S]*?\\)[#]*?\\]).fg(#)";var 标题规则=".a(flag)";var 选集规则=".tz($)";var 选集地址规则=".z2(\\$\\([^\$|&]*\\)).or().z(.*)";
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
var 选集规则=".tz($)";
  }else{
var 分类=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(vod_play_url).fg(\\$\\$\\$)");
var 线路=e2Arr(getVar("源码").replace(/<.*?>/g,""),".json(list).json(vod_play_from).fg(\\$\\$\\$)");
var 选集地址规则=".z2(\\$\\(.*\\)).or().z(.*)";
var 简介=e2Rex(getVar("源码"),".c(演员表:).json(list).json(vod_actor).c(<br>简介:).json(list).json(vod_content)");
var 列表规则=".fg(#)";
var 标题规则=".t()";
var 选集规则=".tz($)";
}
}
##搜索规则
var 源码=getVar("源码");if(源码.indexOf("<rss")!=-1){var 列表=e2Arr(源码,".xml(video)");var 标题规则=".xml(name).ty(CDATA).tz2(])";var 地址规则=".c(?ac=videolist&ids=).xml(id).z(\\d+)";var 图片规则=".xml(pic).t().z(http.*\\S)";var 简介规则=".c(<font color='#0997F7'><b>).xml(dt).t().c(</b></font><br>).xml(last).t()";var NEXTPAGE="";var PREPAGE="";}else{var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");var 标题规则=".json(vod_name).or().json(art_name)";var 地址规则=".c(?ac=videolist&ids=).json(vod_id).or().json(art_id)";var 图片规则=".json(vod_pic).or().json(art_pic)";var 简介规则=".json(type_name).c().json(vod_time).or().json(art_time).c().json(vod_remarks).or().json(art_remarks)";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
eval(getVar("通用免嗅探"));
######普通列表6
function 通用列表(){
    var res={};var items=[];
    var LIMIT=列表.length;
    for(var j=0;j<LIMIT;j++){
        var CODE=列表[j];
        var 预地址=地址规则.indexOf("@js=")!=-1?eval(地址规则.split("@js=")[1]):e2Rex(CODE,地址规则);
        var 地址=预地址.indexOf("http")!=-1?预地址:baseURL+预地址;
        if(地址.search(/\.php\/.+?\.vod/)!=-1){
            var 日期=e2Rex(getVar("TIME_"),".time(MMdd)");
            var 地址=地址+"&key="+日期+"&keytime="+getVar("TIME_");
        }
        var 标题=标题规则.indexOf("@js=")!=-1?eval(标题规则.split("@js=")[1]):e2Rex(CODE,标题规则);
        var 预图片=图片规则.indexOf("@js=")!=-1?eval(图片规则.split("@js=")[1]):e2Rex(CODE,图片规则);
        if(预图片.indexOf("/mac:")!=-1){
            var 图片="http:"+预图片.split("/mac:")[1];
        }else if(预图片.indexOf("=http")!=-1){
            var 图片=预图片.match(/.*(http.*)/)[1];
        }else if(预图片.indexOf("http")==0||预图片.indexOf("res://")==0){
            var 图片=预图片;
        }else if(预图片==""){
            var 图片="http://42.202.35.113:3000/apis/my-github/egwang186/iptv/main/onebox/kongbai.gif@{'User-Agent':'Mozilla/5.0'}";
        }else{
            var 图片=baseURL+预图片;
            if(baseURL.indexOf("1090ys2.com")!=-1){
            var 图片=图片+'@{"User-Agent":"Mozilla/5.0","Referer":"http://1090ys2.com/"}';
            }
        }
        var 简介=简介规则.indexOf("@js=")!=-1?eval(简介规则.split("@js=")[1]):e2Rex(CODE,简介规则);
        var 图片底部=图片底部规则.indexOf("@js=")!=-1?eval(图片底部规则.split("@js=")[1]):e2Rex(CODE,图片底部规则);
        var 左上=左上规则.indexOf("@js=")!=-1?eval(左上规则.split("@js=")[1]):e2Rex(CODE,左上规则);
        var 右上=右上规则.indexOf("@js=")!=-1?eval(右上规则.split("@js=")[1]):e2Rex(CODE,右上规则);
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
eval(readStr("QJS"));
var baseURL=getVar("baseURL");
eval(getVar("列表规则"));通用列表();
######选集列表7
function CMS选集列表(){
    var res={};var items=[];var detail=[];
    var d = [];
    for (let index = 0; index < 分类.length; index++) {
            function fn(i) {
              return function () {
        var 分类CODE=分类[i];
        var 列表=e2Arr(分类CODE,列表规则).filter(Boolean);
        if(线路){
        var 标题=标题规则.indexOf("@js=")!=-1?eval(标题规则.split("@js=")[1]):e2Rex(线路[i],标题规则);
        }else{
        var 标题=标题规则.indexOf("@js=")!=-1?eval(标题规则.split("@js=")[1]):e2Rex(分类CODE,标题规则);
        }
        var LIST=[];
        for(var j=0;j<列表.length;j++){
            if(列表[j].indexOf("$")!=-1){
                var 选集=选集规则.indexOf("@js=")!=-1?eval(选集规则.split("@js=")[1]):e2Rex(列表[j],选集规则);
                if(选集==""){
                选集=j+1;
                }
            }else{
              var 选集=j+1;
            }
            var 选集地址=选集地址规则.indexOf("@js=")!=-1?eval(选集地址规则.split("@js=")[1]):e2Rex(列表[j],选集地址规则);
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
    return play_;
    };
    }
    d.push(fn(index));
  }
    var s = _.submit(d, 分类.length); //n 改为你想开启的线程数
    for (let i = 0; i < s.length; i++) {
      for (let z of s[i].get()) {
        if(z.list.length/200 > 1){
            var zz=[];
            for (let j = 0; j < z.list.length;){
                zz.push(z.list.slice(j, j+=200));
            }
            for(let k=0;k<zz.length;k++){
                let 尾=(k+1)*200;
                let 头=尾-200+1;
                if(尾>z.list.length){
                    尾=z.list.length;
                }
                items.push({title:z.title+"|"+zz[k][0].title,list:zz[k]});
            }
        }else{
            items.push(z);
        }
      }
    }
    detail.push({desc:简介});
    res.data=items;
    res.desc=detail;
    return JSON.stringify(res);
}
function 选集列表(){
    var res={};var items=[];var detail=[];
    var d = [];
    for (let index = 0; index < 分类.length; index++) {
            function fn(i) {
              return function () {
        var 分类CODE=分类[i];
        var 列表=e2Arr(分类CODE,列表规则);
        if(线路){
        var 标题=标题规则.indexOf("@js=")!=-1?eval(标题规则.split("@js=")[1]):e2Rex(线路[i],标题规则);
        }else{
        var 标题=标题规则.indexOf("@js=")!=-1?eval(标题规则.split("@js=")[1]):e2Rex(分类CODE,标题规则);
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
           var 接口="http://42.202.35.113:39000/?url=";
           }
        }else if(baseURL.indexOf("api.php/app/")!=-1||baseURL.indexOf("xgapp.php/v")!=-1){
          var 接口=e2Rex(分类CODE,".json(parse_api)");
        }else{
        var 接口=baseURL;
        }
        var LIST=[];
        for(var j=0;j<列表.length;j++){
            var 选集=选集规则.indexOf("@js=")!=-1?eval(选集规则.split("@js=")[1]):e2Rex(列表[j],选集规则);
            var 选集地址=选集地址规则.indexOf("@js=")!=-1?eval(选集地址规则.split("@js=")[1]):e2Rex(列表[j],选集地址规则);
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
    return play_;
    };
    }
    d.push(fn(index));
  }
    var s = _.submit(d, 分类.length); //n 改为你想开启的线程数
    for (let i = 0; i < s.length; i++) {
      for (let z of s[i].get()) {
        if(z.list.length/200 > 1){
            var zz=[];
            for (let j = 0; j < z.list.length;){
                zz.push(z.list.slice(j, j+=200));
            }
            for(let k=0;k<zz.length;k++){
                let 尾=(k+1)*200;
                let 头=尾-200+1;
                if(尾>z.list.length){
                    尾=z.list.length;
                }
                items.push({title:z.title+"|"+zz[k][0].title,list:zz[k]});
            }
        }else{
            items.push(z);
        }
      }
    }
    detail.push({desc:简介});
    res.data=items;
    res.desc=detail;
    return JSON.stringify(res);
}
eval(readStr("QJS"));
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
######QJS8
KGZ1bmN0aW9uKCl7dmFyIF89e307dmFyIG09MS4wO3ZhciByPWFuZHJvaWQub3MuRW52aXJvbm1lbnQuZ2V0RXh0ZXJuYWxTdG9yYWdlRGlyZWN0b3J5KCk7dmFyIHM9YW5kcm9pZC53ZWJraXQuTWltZVR5cGVNYXAuZ2V0U2luZ2xldG9uKCk7dmFyIHQ9amF2YS5pbzt2YXIgdT1qYXZhLmxhbmc7dmFyIHY9dC5GaWxlLnNlcGFyYXRvcjt2YXIgdz1wYXRoKCkrdisnRG93bmxvYWQnK3YrJ3FtJyt2K2luZm8oKS5zaWduLnN1YnN0cmluZygwLDQpKyckJCQnK2luZm8oKS5uYW1lK3Y7aXNTdHJpbmc9KHZhbCk9PnR5cGVvZiB2YWw9PT0nc3RyaW5nJztmdW5jdGlvbiBpc09iamVjdChhKXtjb25zdCB0eXBlPXR5cGVvZiBhO3JldHVybiBhIT1udWxsJiYodHlwZT09J29iamVjdCd8fHR5cGU9PSdmdW5jdGlvbicpfXZhciB5PWphdmEudXRpbC5jb25jdXJyZW50O3ZhciB6PW5ldyB5LkV4ZWN1dG9ycy5uZXdDYWNoZWRUaHJlYWRQb29sKCk7ZnVuY3Rpb24gdGhyZWFkKGEpe29iaj17Y2FsbDpmdW5jdGlvbigpe3JldHVybiBhKCl9LH07dmFyIGI9bmV3IHkuRnV0dXJlVGFzayhvYmopO3ouc3VibWl0KGIpO3JldHVybiBifWZ1bmN0aW9uIGNodW5rKGEsYil7bGV0IGluZGV4PTA7bGV0IHJlcz1bXTt3aGlsZShpbmRleDxhLmxlbmd0aCl7cmVzLnB1c2goYS5zbGljZShpbmRleCxpbmRleCtiKSk7aW5kZXgrPWJ9cmV0dXJuIHJlcy5maWx0ZXIoKG8pPT5vLmxlbmd0aD4wKX1mdW5jdGlvbiBzdWJtaXQobCxuKXtjPVtdO2xpc3Q9Y2h1bmsobCxsLmxlbmd0aC9uKTt2YXIgbj0wO3doaWxlKG48bGlzdC5sZW5ndGgpe2Z1bmN0aW9uIGwoeCl7cmV0dXJuIGZ1bmN0aW9uIG8oKXt2YXIgYT1bXTtmb3IobGV0IGk9MDtpPGxpc3RbeF0ubGVuZ3RoO2krKyl7YS5wdXNoKGxpc3RbeF1baV0oKSl9cmV0dXJuIGF9fWMucHVzaCh0aHJlYWQobChuKSkpO24rK31yZXR1cm4gY31mdW5jdGlvbiBta2RpcnMoZil7dmFyIGE9Zi5nZXRQYXJlbnRGaWxlKCk7aWYoIWEuZXhpc3RzKCkpYS5ta2RpcnMoKX1mdW5jdGlvbiB3cml0ZShhLGIpe3ZhciBjPW5ldyB0LkZpbGUodysn5pWw5o2uJyt2K2IpO21rZGlycyhjKTt2YXIgZD1uZXcgdC5GaWxlV3JpdGVyKGMsZmFsc2UpO2Qud3JpdGUoYSk7ZC5jbG9zZSgpfWZ1bmN0aW9uIHJlYWQoYSl7dmFyIGI9bmV3IHQuRmlsZSh3KyfmlbDmja4nK3YrYSk7dmFyIGM9MDtpZighYi5leGlzdHMoKXx8KGM9Yi5sZW5ndGgoKSk9PTApcmV0dXJuJyc7dmFyIGQ9dS5yZWZsZWN0LkFycmF5Lm5ld0luc3RhbmNlKHUuQnl0ZS5UWVBFLGMpO3ZhciBlPW5ldyB0LkZpbGVJbnB1dFN0cmVhbShiKTtlLnJlYWQoZCk7ZS5jbG9zZSgpO3JldHVybiBuZXcgdS5TdHJpbmcoZCl9dmFyIEE9UGFja2FnZXMub3JnLmpzb3VwO3ZhciBCPUEuQ29ubmVjdGlvbi5NZXRob2Q7ZnVuY3Rpb24gaHR0cChvKXtsZXR7dXJsLGhlYWRlcixwYXJhbXMsanNvbixjaGFyc2V0LG1ldGhvZCxyZX09bzt2YXIgYT1BLkpzb3VwLmNvbm5lY3QodXJsKTthLmlnbm9yZUNvbnRlbnRUeXBlKHRydWUpO2EucG9zdERhdGFDaGFyc2V0KGNoYXJzZXQpO2EubWF4Qm9keVNpemUoMTA0ODU3NjAwMCk7cmU9PT1mYWxzZT9hLmZvbGxvd1JlZGlyZWN0cyhyZSk6YS5mb2xsb3dSZWRpcmVjdHModHJ1ZSk7aWYoaXNPYmplY3QoaGVhZGVyKSlmb3IoeCBpbiBoZWFkZXIpYS5oZWFkZXIoeCxoZWFkZXJbeF0pO2lmKGlzT2JqZWN0KHBhcmFtcykpe2lmKGpzb249PT10cnVlKWEucmVxdWVzdEJvZHkocGFyYW1zKTtlbHNlIGZvcihwIGluIHBhcmFtcylhLmRhdGEocCxwYXJhbXNbcF0pfXZhciBiO2lmKGpzb249PT10cnVlfHxtZXRob2Q9PSdwb3N0JyliPWEubWV0aG9kKEIuUE9TVCkuZXhlY3V0ZSgpO2Vsc2UgYj1hLm1ldGhvZChCLkdFVCkuZXhlY3V0ZSgpO3JldHVybiBifWZ1bmN0aW9uIGh0dHBCb2R5KGEsYil7YS5jaGFyc2V0KGIpO3JldHVybiBhLmJvZHkoKX1mdW5jdGlvbiBodHRwQ29va2llKGEsYil7cmV0dXJuIGIrJz0nK2EuY29va2llKGIpfWZ1bmN0aW9uIGh0dHBDb29raWVzKGEpe3ZhciBiPScnO3ZhciBjPWEuY29va2llcygpLmVudHJ5U2V0KCkuaXRlcmF0b3IoKTt3aGlsZShjLmhhc05leHQoKSl7dmFyIGQ9Yy5uZXh0KCk7Yis9ZC5nZXRLZXkoKSsnPScrZC5nZXRWYWx1ZSgpKyc7J31yZXR1cm4gYn1mdW5jdGlvbiBodHRwSGVhZGVyKGEsYil7cmV0dXJuIGEuaGVhZGVyKGIpfWZ1bmN0aW9uIGh0dHBIZWFkZXJzKGEpe3ZhciBiPScnO3ZhciBjPWEuaGVhZGVycygpLmVudHJ5U2V0KCkuaXRlcmF0b3IoKTt3aGlsZShjLmhhc05leHQoKSl7dmFyIGQ9Yy5uZXh0KCk7Yis9ZC5nZXRLZXkoKSsnPScrZC5nZXRWYWx1ZSgpKyc7J31yZXR1cm4gYn1mdW5jdGlvbiB0cmltVShhKXt2YXIgYj1hLmxhc3RJbmRleE9mKCcvJyk7aWYoYS5sZW5ndGgoKT09YisxKXthPWEuc3Vic3RyaW5nKDAsYik7cmV0dXJuIHRyaW1VKGEpfXJldHVybiBhLnN1YnN0cmluZygwLGEubGFzdEluZGV4T2YoJy4nKSl9ZnVuY3Rpb24gZG93bmxvYWQobyl7dHJ5e2xldHtzZXRwYXRoLHRpcHN9PW87dmFyIGE9aHR0cChvKTt2YXIgYj10cmltVShhLnVybCgpLnRvU3RyaW5nKCkpO3ZhciBjPXMuZ2V0RXh0ZW5zaW9uRnJvbU1pbWVUeXBlKGEuY29udGVudFR5cGUoKS5zcGxpdCgnOycpWzBdKTt2YXIgZD1iLnN1YnN0cmluZyhiLmxhc3RJbmRleE9mKCcvJykrMSkrJy4nK2M7c2F2ZXBhdGg9aXNTdHJpbmcoc2V0cGF0aCk/c2V0cGF0aCt2K2Q6dysn5LiL6L29Jyt2K2Q7dmFyIGY9YS5ib2R5U3RyZWFtKCk7dmFyIGc9bmV3IHUucmVmbGVjdC5BcnJheS5uZXdJbnN0YW5jZSh1LkJ5dGUuVFlQRSw0MDk2KTt2YXIgaD0wO3ZhciBpPW5ldyB0LkJ5dGVBcnJheU91dHB1dFN0cmVhbSgpO3doaWxlKChoPWYucmVhZChnKSkhPS0xKXtpLndyaXRlKGcsMCxoKX12YXIgaj1uZXcgdC5GaWxlKHNhdmVwYXRoKTtta2RpcnMoaik7dmFyIGs9bmV3IHQuRmlsZU91dHB1dFN0cmVhbShqKTtrLndyaXRlKGkudG9CeXRlQXJyYXkoKSk7aWYodGlwcz09PWZhbHNlKXJldHVybiBzYXZlcGF0aDt0b2FzdCgn5LiL6L295oiQ5Yqf77yM6Lev5b6EOicrc2F2ZXBhdGgpO3JldHVybiBzYXZlcGF0aH1jYXRjaChlKXtlcnJvcihlKTt0b2FzdCgn5LiL6L295aSx6LSlLOivt+aJk+W8gOiwg+ivleWPsOafpeeci+WFt+S9k+W8guW4uOS/oeaBrycpfWZpbmFsbHl7aWYoaSE9bnVsbClpLmNsb3NlKCk7aWYoayE9bnVsbClrLmNsb3NlKCk7aWYoZiE9bnVsbClmLmNsb3NlKCl9fWZ1bmN0aW9uIGVycm9yKGUpe2lzU3RyaW5nKGUpP+aKpemUmShlKTrmiqXplJkoZS50b1N0cmluZygpKX1mdW5jdGlvbiB0b2FzdChhKXthbGVydChhKX1mdW5jdGlvbiBiYWNrKCl7bmV3IFBhY2thZ2VzLmFuZHJvaWQuYXBwLkluc3RydW1lbnRhdGlvbigpLnNlbmRLZXlEb3duVXBTeW5jKDQpfWZ1bmN0aW9uIHBhdGgoKXtyZXR1cm4gci5nZXRBYnNvbHV0ZVBhdGgoKS50b1N0cmluZygpfWZ1bmN0aW9uIHNsZWVwKGEpe2phdmEubGFuZy5UaHJlYWQuc2xlZXAoYSl9ZnVuY3Rpb24gaW5mbygpe289e307by5zaWduPWUyUmV4KGdldFZhcignUU1JTkZPJyksJy5nZXQoc2lnbikudCgpJyk7by52ZXJzaW9uPWUyUmV4KGdldFZhcignUU1JTkZPJyksJy5nZXQodmVyc2lvbikudCgpJyk7by5uYW1lPWUyUmV4KGdldFZhcignUU1JTkZPJyksJy5nZXQobmFtZSkudCgpJyk7cmV0dXJuIG99Xy5WRVJTSU9OPW07Xy5yZWFkPXJlYWQ7Xy53cml0ZT13cml0ZTtfLnNsZWVwPXNsZWVwO18udGhyZWFkPXRocmVhZDtfLnN1Ym1pdD1zdWJtaXQ7Xy5jaHVuaz1jaHVuaztfLmJhY2s9YmFjaztfLmlzU3RyaW5nPWlzU3RyaW5nO18uaHR0cD1odHRwO18uYmQ9aHR0cEJvZHk7Xy5jaz1odHRwQ29va2llO18uY2tzPWh0dHBDb29raWVzO18uaGQ9aHR0cEhlYWRlcjtfLmhkcz1odHRwSGVhZGVycztfLmRvd25sb2FkPWRvd25sb2FkO18uaW5mbz1pbmZvO18udG9hc3Q9dG9hc3Q7Xy5lcnJvcj1lcnJvcjt0aGlzLl89X30uY2FsbCh0aGlzKSk7
