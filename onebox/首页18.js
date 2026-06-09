#####网页18站源
####
###type
iptv
###分类
iptv
###数据
直播
##
远程$https://api.egwang186.top/apis/my-github/egwang186/iptv/main/onebox/大侠直播.txt
####

####
###type
web
###分类
网页18站源
###标题
XChina(VPN)
###图片
https://api.egwang186.top/apis/my-github/egwang186/iptv/main/onebox/xchina.png
###BaseURL
"https://xchina.co";
###首页地址
getVar("baseURL")+"/videos.html";
###分类地址
getVar("baseURL")+"/分类/翻页.html";
###搜索地址
getVar("baseURL")+"/videos/keyword-关键字/翻页.html";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".get(div.item.video)");var 标题规则=".get(div.title a).t()";var 地址规则=".get(div.title a).a(href)";var 图片规则=".get(.img).a(style).z2('\\(.+?\\)')";var 简介规则=".get(div.tags).t()";var 图片底部规则=".get(div.duration)";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).get(div.series).t().ct(</font></p>)";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var 源码=getHttp(JSON.stringify({url:"https://xchina.co/videos.html",head:{"User-Agent":"Windows 10"}}));var Series=源码.match(/<a href="\/videos\/series-.+?<\/a>/g);var Model=源码.match(/<a href="\/videos\/model-.+?<\/a>/g);var a="";for(var i in Series){var title=e2Rex(Series[i],".t()");var id=e2Rex(Series[i],".ty(/).tz(.html)");a=a+"+"+title+"="+id;}for(var i in Model){var title=e2Rex(Model[i],".t()");var id=e2Rex(Model[i],".ty(/).tz(.html)");a=a+"+"+title+"="+id;}var a="分类"+a;var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var b="翻页+"+b;a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".get(div.item.video)");var 标题规则=".get(div.title a).t()";var 地址规则=".get(div.title a).a(href)";var 图片规则=".get(.img).a(style).z2('\\(.+?\\)')";var 简介规则=".get(div.tags).t()";var 图片底部规则=".get(div.duration)";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).get(div.series).t().ct(</font></p>)";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".ty(src:).ty(').tz(')");var 简介=".var(简介)";var 线路="";var 列表规则=".t()";var 标题规则=".var(标题)";var 选集规则=".t()";var 选集地址规则=".t()";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(div.videos div.item)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则="@js=getVar(\"baseURL\");";var 图片规则=".get(img).a(data-original)";var 简介规则="@js='长按网页打开，验证后返回重新搜索即可';";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(div.text a).t()";var 地址规则=".get(div.text a).a(href)";var 图片规则=".get(video).a(poster)";var 简介规则=".get(div.tag).t()";var 图片底部规则=".get(div.duration)";var 左上规则=".get(div.series)";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}
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
直播盒子
###图片
https://api.egwang186.top/apis/my-github/egwang186/iptv/main/onebox/zhibohezi.png
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
var 列表=e2Arr(getVar("源码"),".json(pingtai)");var 标题规则=".json(title)";var 地址规则=".c(http://api.hclyz.com:81/mf/).json(address)";var 图片规则=".json(xinimg)";var 简介规则=".json(Number).ct(位主播)";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var a="分类+xcdsw";var b="翻页+全部=";a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".json(pingtai)");var 标题规则=".json(title)";var 地址规则=".c(/xcdsw/).json(address)";var 图片规则=".json(xinimg)";var 简介规则=".json(Number).ct(位主播)";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".all()");var 简介=".var(标题)";var 线路="";var 列表规则=".json(zhubo)";var 标题规则=".var(标题)";var 选集规则=".json(title)";var 选集地址规则="@js=\"http://ip111.cn/?wd=\"+e2(列表[j],\".json(address)\").replace(/\\?/g,\"幻魔快修\");";
##搜索规则
var 源码=getHttp(JSON.stringify({url:"http://api.vipmisss.com:81/xcdsw/json.txt"}));var 列表=e2Arr(源码,".json(pingtai)").filter(item=>item.indexOf(getVar("关键字"))!=-1);if(!列表[0]){var 列表=["未匹配到任何平台"];var 标题规则=".t()";var 地址规则="@js=getVar(\"baseURL\");";var 图片规则=".get(img).a(data-original)";var 简介规则="@js='未匹配到任何平台';";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".json(title)";var 地址规则=".c(/xcdsw/).json(address)";var 图片规则=".json(xinimg)";var 简介规则=".json(Number).ct(位主播)";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="翻页+全部=";b;
##免嗅探规则
JSON.stringify([{name:"地址",url:getVar("地址").split("?wd=")[1].replace(/幻魔快修/g,"?")}]);
####

####
###type
web
###分类
网页18站源
###标题
JAVHD(VPN)
###图片
https://api.egwang186.top/apis/my-github/egwang186/iptv/main/onebox/javhd.png
###BaseURL
"https://javhd.name";
###首页地址
getVar("baseURL")+"/recent/";
###分类地址
getVar("baseURL")+"分类翻页";
###搜索地址
getVar("baseURL")+"/search/video/?s=关键字&page=翻页";
###rule
##首页规则
var 列表=e2Arr(getVar("源码"),".get(ul.videos li)");var 标题规则=".get(img).a(alt)";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(src)";var 简介规则=".get(span.video-overlay).t().c().get(span.left).t().c().get(span.right).t()";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var code=getHttp(getVar("baseURL")+"/categories/");var arr=e2Arr(code,".get(ul.categories li)");var sort=["分类"];for(let i=0;i<arr.length;i++){let a=e2Rex(arr[i],".get(div.category-title).t()");let b=e2Rex(arr[i],".get(a).href()");sort.push(a+"="+b);}var pn=["翻页+第1页="];for(let i=2;i<=99;i++){let a="第"+i+"页=";let b="recent/"+i+"/";pn.push(a+b);};sort.join("+")+"\n"+pn.join("+");
##分类规则
var 列表=e2Arr(getVar("源码"),".get(ul.videos li)");var 标题规则=".get(img).a(alt)";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(src)";var 简介规则=".get(span.video-overlay).t().c().get(span.left).t().c().get(span.right).t()";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".get(div.button_style)");var 线路=["多线路切换"];var 简介="";var 列表规则=".z(<button[\\s\\S]+?</button>)";var 标题规则=".t()";var 选集规则=".t()";var 选集地址规则=".c(http://ip111.cn/?wd=).ty(').tz(').dn64().z(http[^']+)";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(ul.videos li)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则="@js=getVar(\"baseURL\")";var 图片规则=".get(img).a(data-original)";var 简介规则="@js='长按网页打开，验证后返回重新搜索即可';";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(img).a(alt)";var 地址规则=".get(a).a(href)";var 图片规则=".get(img).a(src)";var 简介规则=".get(span.video-overlay).t().c().get(span.left).t().c().get(span.right).t()";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
var onedata=getHttp(getVar("地址").split("?wd=")[1]);var source=e2(onedata,".get(video source).a(src)");if(source.indexOf("http")!=-1){var du=source;}else if(source.indexOf("//")==0){var du="https:"+source;}else if(onedata.search(/sources:.+?file:.*?".+?"/)!=-1){var u=onedata.match(/sources:.+?file:.*?"(.+?)"/);}else if(onedata.search(/\ssrc:.*?'http.+?'/)!=-1){var u=onedata.match(/\ssrc:.*?'(http.+?)'/);}else if(onedata.search(/var urlPlay = 'http.+?'/)!=-1){var u=onedata.match(/var urlPlay.+?'(http.+?)'/);}else if(onedata.search(/<script.+?>eval[\s\S]+?<\/script>/)!=-1){var script=onedata.match(/[\S\s]+<script.+?>eval([\s\S]+?)<\/script>/)[1];var dedata=eval(script);var u=dedata.match(/sources:.+?file:"(.+?)"/);}else{var uu=onedata.match(/'(\/pass_md5.+?)'/);if(uu){var uu=getVar("地址").split("?wd=")[1].match(/(http.+?\/\/.+?)\//)[1]+uu[1];var du=getHttp(JSON.stringify({url:uu,head:{"User-Agent":"Mozilla/5.0 Android","Referer":getVar("地址").split("?wd=")[1]}})).match(/http.+/)[0];function makePlay(){for(var a="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t.length,o=0;10>o;o++)a+=t.charAt(Math.floor(Math.random()*n));return a+"?token=hkx7y4fo0zsggcbyvn7v0kn0&expiry="+Date.now();}du=du+makePlay();}else{var u="";}}if(u){var u=u[1];var 头=u.match(/http.+\//)[0];var code=getHttp(JSON.stringify({url:u,head:{"User-Agent":"Mozilla/5.0 Android","Referer":getVar("地址").split("?wd=")[1]}})).match(/#EXT-X-STREAM-INF[^#]+/g);var playlist=[];for(var i in code){var title=code[i].match(/RESOLUTION=([^,'"]+)/)[1];var url=code[i].replace(/\s+/g,'"').match(/.+"(.+?)"/)[1];if(url.indexOf("http")==-1){url=头+url;}playlist.push({name:title,url:url,head:{"Referer":getVar("地址").split("?wd=")[1]}});}JSON.stringify(playlist);}else{if(du){JSON.stringify([{name:"地址带Referer",url:du,head:{"User-Agent":"Mozilla/5.0 Android","Referer":getVar("地址").split("?wd=")[1]}}]);}else{JSON.stringify([{name:"地址获取错误",url:"",head:{"Referer":getVar("地址").split("?wd=")[1]}}]);}}
####

####
###type
web
###分类
网页18站源
###标题
黄色仓库(VPN)
###图片
https://api.egwang186.top/apis/my-github/egwang186/iptv/main/onebox/hsck.png
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
var 列表=e2Arr(getVar("源码"),".get(ul.stui-vodlist li).il([\\s\\S]+?\"/.*?/\\d+?-\\d-\\d.+[\\s\\S]+)");var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(a).a(data-original)";var 简介规则=".get(span).st().t().c().get(p).t()";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";
##筛选数据
var a="分类+日韩AV=1+国产系列=2+欧美=3+成人动漫=4+中字无码=8+中字有码=9+日本无码=10+日本有码=7+国产视频=15+欧美高清=21+动漫剧情=22";var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var b="翻页+"+b;a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".get(ul.stui-vodlist li).il([\\s\\S]+?\"/.*?/\\d+?-\\d-\\d.+[\\s\\S]+)");var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(a).a(data-original)";var 简介规则=".get(span).st().t().c().get(p).t()";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=e2Arr(getVar("源码"),".get(div.stui-warp-content)");var 线路="";var 简介=e2Rex(getVar("源码"),".get(div.stui-warp-content).t()");var 列表规则=".ty(player_aaaa=).json(url)";var 标题规则=".get(h3).t()";var 选集规则=".var(标题)";var 选集地址规则=".var(地址)";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(ul.stui-vodlist li).il([\\s\\S]+?\"/.*?/\\d+?-\\d-\\d.+[\\s\\S]+)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则="@js=getVar(\"baseURL\");";var 图片规则=".get(img).a(data-original)";var 简介规则="@js='长按网页打开，验证后返回重新搜索即可';";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(a).a(data-original)";var 简介规则=".get(span).st().t().c().get(p).t()";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
var id=getVar("地址").match(/\/(\d+?)-/)[1];var ad=getVar("地址").match(/(http.+?)\//)[1];var code=JZ(JSON.stringify({url:ad+"/api.php/provide/vod/?ac=videolist&ids="+id,head:{"Cookie":""}}));
var url=JSON.parse(code.code).list[0].vod_play_url;
JSON.stringify({name:"采集接口",url:url,head:{"Referer":getVar("地址")}})
####

####
###type
web
###分类
网页18站源
###标题
JableTV(VPN)
###图片
https://api.egwang186.top/apis/my-github/egwang186/iptv/main/onebox/jable.png
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
var 列表=e2Arr(getVar("源码"),".get(div.video-img-box.mb-e-20)");var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".t()";var 图片底部规则=".get(span.label).t()";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";
##筛选数据
try{var 源码=getHttp("https://jable.tv/categories/");}catch(err){alert("哦，报错了，错误描述："+err.message);}var 标签列表=e2Arr(源码,".get(a.tag)");var 主题列表=e2Arr(源码,".get(div.video-img-box.mb-e-20)");var a="";for(var i in 主题列表){var title=e2Rex(主题列表[i],".get(h4).t()");var id=e2Rex(主题列表[i],".get(a).a(href).ty(jable.tv)");a=a+"+"+title+"="+id;}for(var i in 标签列表){var title=e2Rex(标签列表[i],".get(a).t()");var id=e2Rex(标签列表[i],".get(a).a(href).ty(jable.tv)");a=a+"+"+title+"="+id;}var a="分类+"+a;var b="";for(var i=1;i<50;i++){b=b+"+第"+i+"页="+i;}var b="翻页"+b;a+"\n"+b;
##分类规则
var 列表=e2Arr(getVar("源码"),".get(div.video-img-box.mb-e-20)");var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".t()";var 图片底部规则=".get(span.label).t()";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";
##选集规则
var 分类=getVar("源码").match(/<video[\s\S]+?<\/h4>/g);var 简介=e2Rex(getVar("源码"),".get(div.info-header)");var 线路="";var 列表规则=".z(var hlsUrl.+?;)";var 标题规则=".get(h4).t()";var 选集规则=".var(标题)";var 选集地址规则=".ty(').tz(')";
##搜索规则
var 源码=getVar("源码");var 列表=e2Arr(源码,".get(div.video-img-box.mb-e-20)");if(!列表[0]){var 列表=["网页可能有搜索验证，去网页看看吧"];var 标题规则=".t()";var 地址规则="@js=getVar(\"baseURL\");";var 图片规则=".get(img).a(data-original)";var 简介规则="@js='长按网页打开，验证后返回刷新即可';";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}else{var 标题规则=".get(.title a).t()";var 地址规则=".get(.title a).a(href)";var 图片规则=".get(img).a(data-src)";var 简介规则=".t()";var 图片底部规则="@js='';";var 左上规则="@js='';";var 右上规则="@js='';";var NEXTPAGE="";var PREPAGE="";}
##搜索翻页
var b="";for(var i=1;i<50;i=i+1){b=b+"+第"+i+"页="+i;}
"翻页"+b;
##免嗅探规则
JSON.stringify([{name:"地址",url:getVar("地址")}]);
####

#####
