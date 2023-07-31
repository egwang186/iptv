#####网页18站源
####
###type
iptv
###分类
iptv
###数据
台湾p2p
##
远程$http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/台湾p2p.txt
####

####
###type
web
###分类
网页18站源
###标题
XChina(VPN)
###图片
http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/xchina.png
###BaseURL
"https://xchina.xyz";
###首页地址
getVar("baseURL")+"/videos.html";
###分类地址
getVar("baseURL")+"/分类/翻页.html";
###搜索地址
getVar("baseURL")+"/videos/keyword-关键字/翻页.html";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".get(div.videos div.item)");var 标题规则=".get(div.text a).t()";var 地址规则=".get(div.text a).a(href)";var 图片规则=".get(video).a(poster)";var 简介规则=".get(div.tag).t()";var 图片底部规则=".get(div.duration)";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).get(div.series).t().ct(</font></p>)";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var 源码=getHttp(JSON.stringify({url:"https://xchina.xyz/videos.html",head:{"User-Agent":"Windows 10"}}));var Series=源码.match(/<a href="\/videos\/series-.+?<\/a>/g);var Model=源码.match(/<a href="\/videos\/model-.+?<\/a>/g);var a="";for(var i in Series){var title=e2Rex(Series[i],".t()");var id=e2Rex(Series[i],".ty(/).tz(.html)");a=a+"+"+title+"="+id;}for(var i in Model){var title=e2Rex(Model[i],".t()");var id=e2Rex(Model[i],".ty(/).tz(.html)");a=a+"+"+title+"="+id;}var a="分类"+a;var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var b="翻页+"+b;a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".get(div.videos div.item)");var 标题规则=".get(div.text a).t()";var 地址规则=".get(div.text a).a(href)";var 图片规则=".get(video).a(poster)";var 简介规则=".get(div.tag).t()";var 图片底部规则=".get(div.duration)";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).get(div.series).t().ct(</font></p>)";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".ty(video.src).ty(\").tz(\")");var 简介=getVar("简介");var 线路="";var 列表规则=".t()";var 标题规则=getVar("标题");var 选集规则=".t()";var 选集地址规则=".t()";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(div.videos div.item)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则=getVar("baseURL");var 图片规则=".get(img).a(data-original)";var 简介规则="长按网页打开，验证后返回重新搜索即可";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(div.text a).t()";var 地址规则=".get(div.text a).a(href)";var 图片规则=".get(video).a(poster)";var 简介规则=".get(div.tag).t()";var 图片底部规则=".get(div.duration)";var 左上规则=".get(div.series)";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
JSON.stringify([{name:"地址",url:getVar("地址"),head:{"Referer":"https://xchina.xyz"}}]);
####

####
###type
web
###分类
网页18站源
###标题
搬淫家
###图片
http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/byj.png
###BaseURL
var code=getHttp("https://byjav.me/js/home.js");e2Rex(code,".ty(byjios.).th(http://##https://).z(http.*me).or().z(http.*com).or().z(http.*tv)");
###首页地址
getVar("baseURL")+"/index/home.html";
###分类地址
getVar("baseURL")+"分类翻页";
###搜索地址
getVar("baseURL")+"/search/video/?s=关键字&page=翻页";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".get(div.cell.video)");var 标题规则=".get(h5).t()";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".get(span.badge).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var code=getHttp(getVar("baseURL")+"/community/");var arr=e2Arr(code,".get(div.cell.category)");var sort=["分类"];for(let i=0;i<arr.length;i++){let a=e2Rex(arr[i],".get(h5).t().ct(=)");let b=e2Rex(arr[i],".get(a).href()");sort.push(a+b);};var pn=["翻页+第1页="];for(let i=2;i<=999;i++){let a="第"+i+"页="let b=i+"/";pn.push(a+b);};sort.join("+")+"\n"+pn.join("+");
##分类规则
var 列表=e2Arr(getVar("源码"),".get(div.cell.video)");var 标题规则=".get(h5).t()";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".get(span.badge).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##选集规则
var uri=e2Rex(getVar("源码"),".get(div#player-fluid).a(style).z(/.+/)");var uri="https://storage.banyinjia8.com"+uri.replace("tmb","hls");var hd=getVar("msg");var list=["1080p","720p","480p","playlist"];var title=["1080p","720p","480p","默认"];var j=list.indexOf(hd)>-1?list.indexOf(hd):0;var res=[];for(var i=j;i<list.length;i++){var 标题=title[i];var 地址=uri+list[i]+".m3u8";res.push({name:标题,url:地址});};var 分类=e2Arr(JSON.stringify(res),".c()");;var 简介="";var 线路="";var 列表规则=".json()";var 标题规则=".var(标题)";var 选集规则=".json(name)";var 选集地址规则=".json(url)";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(div.cell.video)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则=getVar("baseURL");var 图片规则=".get(img).a(data-original)";var 简介规则="长按网页打开，验证后返回重新搜索即可";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(h5).t()";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".get(span.badge).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
JSON.stringify([{name:"地址",url:getVar("地址")}]);
####

####
###type
web
###分类
网页18站源
###标题
直播盒子
###图片
http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/zhibohezi.png
###BaseURL
"http://api.vipmisss.com:81";
###首页地址
"http://api.hclyz.com:81/mf/json.txt";
###分类地址
getVar("baseURL")+"/分类/json.txt翻页";
###搜索地址
"http://ip111.cn/?wd=关键字翻页";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".json(pingtai)");var 标题规则=".json(title)";var 地址规则=".c(http://api.hclyz.com:81/mf/).json(address)";var 图片规则=".json(xinimg)";var 简介规则=".json(Number).ct(位主播)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var a="分类+xcdsw";var b="翻页+全部=";a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".json(pingtai)");var 标题规则=".json(title)";var 地址规则=".c(/xcdsw/).json(address)";var 图片规则=".json(xinimg)";var 简介规则=".json(Number).ct(位主播)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".all()");var 简介=getVar("标题");var 线路="";var 列表规则=".json(zhubo)";var 标题规则=getVar("标题");var 选集规则=".json(title)";var 选集地址规则=".c(http://ip111.cn/?wd=).json(address).th(?##幻魔快修)";
##搜索规则
var 源码=getHttp(JSON.stringify({url:"http://api.vipmisss.com:81/xcdsw/json.txt"}));var 列表=e2Arr(源码,".json(pingtai)").filter(item=>item.indexOf(getVar("关键字"))!=-1);if(!列表[0]){var 列表=["未匹配到任何平台"];var 标题规则=".t()";var 地址规则=getVar("baseURL");var 图片规则=".get(img).a(data-original)";var 简介规则="未匹配到任何平台";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".json(title)";var 地址规则=".c(/xcdsw/).json(address)";var 图片规则=".json(xinimg)";var 简介规则=".json(Number).ct(位主播)";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="翻页+全部=";b;
##免嗅探规则
JSON.stringify([{name:"地址",url:getVar("地址").split("http://ip111.cn/?wd=")[1].replace(/幻魔快修/g,"?")}]);
####

####
###type
web
###分类
网页18站源
###标题
肉视频(VPN)
###图片
http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/rouvideo.png
###BaseURL
"https://rou.video";
###首页地址
getVar("baseURL")+"/home";
###分类地址
getVar("baseURL")+"分类?page=翻页";
###搜索地址
getVar("baseURL")+"/search?q=关键字&page=翻页";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".get(div.shadow.p-1)");var 标题规则=".get(img).a(alt)";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(src)";var 简介规则=".get(div.absolute).st().t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var code=getHttp(getVar("baseURL")+"/cat");var arr=e2Arr(code,".get(div.grid).i(0).get(a)");var sort=["分类+國產AV=/t/國產AV+自拍流出=/t/自拍流出+探花=/t/探花"];for(let i=0;i<arr.length;i++){let a=e2Rex(arr[i],".t().ct(=)");let b=e2Rex(arr[i],".href()");sort.push(a+b);};var pn=["翻页"];for(let i=1;i<=99;i++){let a="第"+i+"页="let b=i;pn.push(a+b);};sort.join("+")+"\n"+pn.join("+");
##分类规则
var 列表=e2Arr(getVar("源码"),".get(div.shadow.p-1)");var 标题规则=".get(img).a(alt)";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(src)";var 简介规则=".get(div.absolute).st().t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".get(script).i(-1).t()");;var 简介="";var 线路="";var 列表规则=".json(props).json(pageProps).json(video)";var 标题规则=".var(标题)";var 选集规则=".json(name)";var 选集地址规则=".json(videoUrl)";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(div.shadow.p-1)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则=getVar("baseURL");var 图片规则=".get(img).a(data-original)";var 简介规则="长按网页打开，验证后返回重新搜索即可";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(img).a(alt)";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(src)";var 简介规则=".get(div.absolute).st().t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
var 头=getVar("地址").split("/hls")[0];var code=getHttp(getVar("地址")).match(/#EXT-X-STREAM-INF[^#]+/g);var playlist=[];for(var i in code){var title=code[i].match(/RESOLUTION=(.+)/)[1];var url=头+"/"+code[i].match(/hls.+/)[0];playlist.push({name:title,url:url});}JSON.stringify(playlist);
####

####
###type
web
###分类
网页18站源
###标题
黄色仓库(VPN)
###图片
http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/hsck.png
###BaseURL
var url="http://hscangku.com/";var jx=e2Rex(getHttp(url),".z(http[^\"]+)");var code=JZ(JSON.stringify({url:jx+url,redirect:false}));code.head.Location;
###首页地址
getVar("baseURL")+"/";
###分类地址
getVar("baseURL")+"/vodtype/分类-翻页.html";
###搜索地址
getVar("baseURL")+"/vodsearch/关键字----------翻页---.html";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".get(ul.stui-vodlist li)");var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(a).a(data-original)";var 简介规则=".get(span).st().t().c().get(p).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var a="分类+日韩AV=1+国产系列=2+欧美=3+成人动漫=4+中字无码=8+中字有码=9+日本无码=10+日本有码=7+国产视频=15+欧美高清=21+动漫剧情=22";var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var b="翻页+"+b;a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".get(ul.stui-vodlist li)");var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(a).a(data-original)";var 简介规则=".get(span).st().t().c().get(p).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".get(div.stui-warp-content)");var 线路="";var 简介=e2Rex(getVar("源码"),".get(div.stui-warp-content).t()");var 列表规则=".ty(player_aaaa=).json(url)";var 标题规则=".get(h3).t()";var 选集规则="播放";var 选集地址规则=".t()";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(ul.stui-vodlist li)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则=getVar("baseURL");var 图片规则=".get(img).a(data-original)";var 简介规则="长按网页打开，验证后返回重新搜索即可";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(a).a(data-original)";var 简介规则=".get(span).st().t().c().get(p).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
JSON.stringify([{name:"地址",url:getVar("地址")}]);
####

####
###type
web
###分类
网页18站源
###标题
JableTV(VPN)
###图片
http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/jable.png
###BaseURL
"https://jable.tv";
###首页地址
getVar("baseURL")+"/";
###分类地址
getVar("baseURL")+"分类?mode=async&function=get_block&block_id=list_videos_common_videos_list&sort_by=post_date&from=翻页";
###搜索地址
getVar("baseURL")+"/search/关键字/?mode=async&function=get_block&block_id=list_videos_videos_list_search_result&q=关键字&sort_by=&from_videos=翻页";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".get(div.video-img-box.mb-e-20)");var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".t()";var 图片底部规则=".get(span.label).t()";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##筛选数据
try{var 源码=getHttp("https://jable.tv/categories/");}catch(err){alert("哦，报错了，错误描述："+err.message);}var 标签列表=e2Arr(源码,".get(a.tag)");var 主题列表=e2Arr(源码,".get(div.video-img-box.mb-e-20)");var a="";for(var i in 主题列表){var title=e2Rex(主题列表[i],".get(h4).t()");var id=e2Rex(主题列表[i],".get(a).a(href).ty(jable.tv)");a=a+"+"+title+"="+id;}for(var i in 标签列表){var title=e2Rex(标签列表[i],".get(a).t()");var id=e2Rex(标签列表[i],".get(a).a(href).ty(jable.tv)");a=a+"+"+title+"="+id;}var a="分类+"+a;var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var b="翻页"+b;a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".get(div.video-img-box.mb-e-20)");var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".t()";var 图片底部规则=".get(span.label).t()";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=getVar("源码").match(/<video[\s\S]+?<\/h4>/g);var 简介=e2Rex(getVar("源码"),".get(div.info-header)");var 线路="";var 列表规则=".z(var hlsUrl.+?;)";var 标题规则=".get(h4).t()";var 选集规则="播放";var 选集地址规则=".ty(').tz(')";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(div.video-img-box.mb-e-20)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则=getVar("baseURL");var 图片规则=".get(img).a(data-original)";var 简介规则="长按网页打开，验证后返回刷新即可";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
JSON.stringify([{name:"地址",url:getVar("地址")}]);
####

####
###type
web
###分类
网页18站源
###标题
CableAV(VPN)
###图片
http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/cable.png
###BaseURL
"https://cableav.tv";
###首页地址
getVar("baseURL");
###分类地址
getVar("baseURL")+"/category/分类/翻页";
###搜索地址
getVar("baseURL")+"/page/翻页/?s=关键字";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".get(div.post-item-wrap)");var 标题规则=".get(h3).t()";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".get(div.categories-wrap).t().tx(&nbsp;).get(span.duration-text).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var a="分类+中國主播=chinese-live-porn+自拍流出=selfie-porn+韓國主播=korean-live-porn+主播福利=private-show-porn+网红福利=kol-selfie-porn+91大神=master-91porn+国产AV=chinese-av-porn";var b="第1页=";for(var i=2;i<999;i++){b=b+"+第"+i+"页=page/"+i+"/";}var b="翻页+"+b;a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".get(div.post-item-wrap)");var 标题规则=".get(h3).t()";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".get(div.categories-wrap).t().tx(&nbsp;).get(span.duration-text).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".z(\\[\\{\"source_label\".+?\\}\\])");;var 简介="";var 线路="";var 列表规则=".json()";var 标题规则=".var(标题)";var 选集规则=".json(source_label)";var 选集地址规则=".json(source_file)";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(div.post-item-wrap)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则=getVar("baseURL");var 图片规则=".get(img).a(data-original)";var 简介规则="长按网页打开，验证后返回刷新即可";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(h3).t()";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".get(div.categories-wrap).t().tx(&nbsp;).get(span.duration-text).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
JSON.stringify([{name:"地址",url:getVar("地址")}]);
####

####
###type
web
###分类
网页18站源
###标题
风月同天(VPN)
###图片
http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/fytt.png
###BaseURL
"https://www.fengyuetongtian.com";
###首页地址
getVar("baseURL")+"/";
###分类地址
getVar("baseURL")+"/分类/list翻页.html";
###搜索地址
getVar("baseURL")+"/vodsearch/关键字----------翻页---.html";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".get(div.stui-vodlist__box)");var 标题规则=".get(h4).t()";var 地址规则=".get(a).a(href)";var 图片规则=".get(a).a(data-original)";var 简介规则=".get(span.pic-text).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var a="分类+国产=ChinaPorn+日本=JapanPorn+欧美=WesternPorn+韩国=KoreaPorn+动漫=HentaiPorn+同性=HomosexualPorn";var b="第1页=";for(var i=2;i<999;i++){b=b+"+第"+i+"页="+"_"+i;}var b="翻页+"+b;a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".get(div.stui-vodlist__box)");var 标题规则=".get(h4).t()";var 地址规则=".get(a).a(href)";var 图片规则=".get(a).a(data-original)";var 简介规则=".get(span.pic-text).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".c()");var 线路="";var 简介="";var 列表规则=".ty(player_data=).json(url).dn64().dn(utf8)";var 标题规则=getVar("标题");var 选集规则=".var(标题)";var 选集地址规则=".t()";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(div.stui-vodlist__box)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则=getVar("baseURL");var 图片规则=".get(img).a(data-original)";var 简介规则="长按网页打开，验证后返回刷新即可";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(h4).t()";var 地址规则=".get(a).a(href)";var 图片规则=".get(a).a(data-original)";var 简介规则=".get(span.pic-text).t()";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
JSON.stringify([{name:"地址",url:getVar("地址")}]);
####

####
###type
web
###分类
网页18站源
###标题
CCAVB
###图片
http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/onebox/ccavb.png
###BaseURL
var resp=getHttp("https://ccavb.tv");
var id=resp.match(/"buildId":"(.+?)"/)[1];
"https://ccavb.tv/_next/data/"+id;
###首页地址
getVar("baseURL")+"/zh.json";
###分类地址
getVar("baseURL")+"/zh/category/分类/翻页.json";
###搜索地址
getVar("baseURL")+"/zh/search/关键字/翻页.json";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".z(\\{\"aneID\":.+?\\})");var 标题规则=".json(videoName)";var 地址规则=".c(/zh/video/).json(aneID).ct(.json)";var 图片规则="@js=var id=JSON.parse(CODE).aneID;var 前=id.split('-')[0];var 后=id.split('-')[1];if(id.indexOf('FC2-')==0){'https://ccavb.tv/static/img/'+前+'/'+后.substr(0,2)+'/'+后+'/'+id+'_1.jpg'}else{'https://ccavb.tv/static/img/'+前+'/'+后+'/'+id+'_1.jpg'}";var 简介规则=".json(videoType)";var 图片底部规则=".json(airDate)";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var a="分类+最新上傳=最新上傳+熱門影片=熱門影片";var b="";for(var i=1;i<999;i++){b=b+"+第"+i+"页="+i;}var b="翻页"+b;a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".z(\\{\"aneID\":.+?\\})");var 标题规则=".json(videoName)";var 地址规则=".c(/zh/video/).json(aneID).ct(.json)";var 图片规则="@js=var id=JSON.parse(CODE).aneID;var 前=id.split('-')[0];var 后=id.split('-')[1];if(id.indexOf('FC2-')==0){'https://ccavb.tv/static/img/'+前+'/'+后.substr(0,2)+'/'+后+'/'+id+'_1.jpg'}else{'https://ccavb.tv/static/img/'+前+'/'+后+'/'+id+'_1.jpg'}";var 简介规则=".json(videoType)";var 图片底部规则=".json(airDate)";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".json(pageProps)");var 线路="";var 简介="";var 列表规则=".json(data).i(1).z(http.+)";var 标题规则=getVar("标题");var 选集规则=".var(标题)";var 选集地址规则=".t()";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(getVar("源码"),".z(\\{\"aneID\":.+?\\})");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则=getVar("baseURL");var 图片规则=".get(img).a(data-original)";var 简介规则="长按网页打开，验证后返回刷新即可";var 图片底部规则="";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".json(videoName)";var 地址规则=".c(/zh/video/).json(aneID).ct(.json)";var 图片规则="@js=var id=JSON.parse(CODE).aneID;var 前=id.split('-')[0];var 后=id.split('-')[1];if(id.indexOf('FC2-')==0){'https://ccavb.tv/static/img/'+前+'/'+后.substr(0,2)+'/'+后+'/'+id+'_1.jpg'}else{'https://ccavb.tv/static/img/'+前+'/'+后+'/'+id+'_1.jpg'}";var 简介规则=".json(videoType)";var 图片底部规则=".json(airDate)";var 左上规则="";var 右上规则="";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
JSON.stringify([{name:"地址",url:getVar("地址")+"&_type=.m3u8",head:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.33","Referer":"http://ccavb.tv/"}}]);
####

#####