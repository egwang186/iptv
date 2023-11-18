######首页1
{"data":[
{
    "title":"阿里小站",
    "rule":{
        "分类":'var a="影视$video$$软件$software$$游戏$games$$音乐$music$$动漫$comic$$书籍$books$$学习$learn$$互帮互助$help$$其他$other";var a=a.split("$$");var 前="https://pan666.net/api/discussions?include=user,lastPostedUser,tags,tags.parent,firstPost&filter[tag]=";var 后="&sort&page[offset]=#PN#";var items=[];for(var i in a){var title=a[i].split("$")[0];var url=前+a[i].split("$")[1]+后;items.push({title:title,url:url});}JSON.stringify(items);',
        "翻页数据":'"翻页+全部="',
        "列表规则":'var 列表=e2Arr(getCode(),".json(data)");var 地址规则=".c(https://pan666.net/api/discussions/).json(attributes).json(slug)";var 标题规则=".json(attributes).json(title)";var 图片规则=".json(tok)";var 简介规则=".c(发布时间：).json(attributes).json(createdAt).c(最近回复时间：).json(attributes).json(lastPostedAt)";var NEXTPAGE=e2Rex(getCode(),".c(https://pan666.net).json(links).json(next)");var PREPAGE=e2Rex(getCode(),".c(https://pan666.net).json(links).json(prev)");',
        "详情规则":'var 回复=e2Arr(getHttp(getVar("地址")),".json(included)").filter(item=>JSON.parse(item).type=="posts");var 正文=[];for(var i in 回复){正文.push(JSON.parse(回复[i]).attributes.contentHtml);}var 正文=正文.join("\\n");'
    }
},
/*{
    "title":"霸王龙字幕组",
    "rule":{
        "分类":'var a="最新资源$/$$电影$/movies$$电视剧$/tvshow$$国产剧$/guochantv$$美剧$/meiju$$韩剧$/hanju$$日剧$/riju$$泰剧$/taiju$$英剧$/yingju$$动画$/animation$$真人秀综艺$/show$$纪录片$/faction$$其他剧$/qitaju";var a=a.split("$$");var items=[];for(var i in a){var title=a[i].split("$")[0];var url="https://t-rex.tzfile.com"+a[i].split("$")[1]+"#PN#";items.push({title:title,url:url});}JSON.stringify(items);',
        "翻页数据":'var b="+第1页=";for(var i=2;i<1000;i=i+1){b=b+"+第"+i+"页=/page/"+i;}"翻页"+b;',
        "列表规则":'var 列表=e2Arr(getCode(),".get(ul li.post-list-item)");var 地址规则=".get(h2 a).a(href)";var 标题规则=".c([).get(a.post-list-cat-item).t().c(]).get(h2 a).t()";var 图片规则=".get(img).a(src)";var 简介规则=".t()";var NEXTPAGE="";var PREPAGE="";',
        "详情规则":'var cm=android.webkit.CookieManager.getInstance();var COOKIE=cm.getCookie(getVar("地址").match(/http.+?\\/\\/.+?\\//)[0]);var 源码=e3("读源码({模式:\\"OKHTTP\\",地址:\\""+getVar("地址")+"\\",COOKIE:\\""+COOKIE+"\\"})");var 正文=e2Rex(源码,".get(div.entry-content).t()");'
    }
},*/
{
    "title":"阿里小纸条",
    "rule":{
        "分类":'var a=getHttp(JSON.stringify({url:"http://a.gitcafe.net/",head:{"Referer":"http://a.gitcafe.net/","User-Agent":"okhttp/4.2.2"}})).match(/<a onclick="load_data.+?<\\/a>/g);var xindata=[];for(var i in a){xindata.push({title:e2Rex(a[i],".t()"),url:"https://gitcafe.net/tool/alipaper/$$action=viewcat&num=#PN#&cat="+e2Rex(a[i],".ty(\').tz(\')")})}JSON.stringify(xindata);',
        "翻页数据":'var b="";for(var i=1;i<1000;i=i+1){b=b+"+第"+i+"页="+i;}"翻页"+b;',
        "列表规则":'var 列表=e2Arr(getCode(),".json(data)");var 地址规则=".json(alikey)";var 标题规则=".json(title)";var 图片规则=".json(tok)";var 简介规则=".c(分享者:).json(aliuser).c(<br>分享时间:).json(creatime)";var NEXTPAGE="";var PREPAGE="";',
        "详情规则":'var 正文=e2Rex(getVar("源"),".json(title).c(链接:https://www.aliyundrive.com/s/).json(url).c(<br>).json(detail)");'
    }
},
{
    "title":"TG频道订阅(VPN)",
    "rule":{
        "分类":'var a="阿里云盘发布$https://tx.me/s/Aliyundrive_Share_Channel#PN#$$人人影视$https://tx.me/s/dianyingshare#PN#$$云盘资源发布$https://tx.me/s/sharealiyun#PN#$$阿里云资源$https://tx.me/s/al_cloud#PN#$$欧美日韩影视$https://tx.me/s/dianyingshare#PN#$$V云盘$https://tx.me/s/aliyun69#PN#$$WAYOU资源每日更新$https://tx.me/s/WaYouZiYuan#PN#$$影视必应阁$https://tx.me/s/moviebyg#PN#$$4K影视资源$https://tx.me/s/remux_2160p#PN#$$阿里云影视$https://tx.me/s/aliyunys#PN#";var a=a.split("$$");var items=[];for(var i in a){var title=a[i].split("$")[0];var url=a[i].split("$")[1];items.push({title:title,url:url});}JSON.stringify(items);',
        "翻页数据":'"翻页+全部="',
        "列表规则":'var 列表=e2Arr(getCode(),".get(div.tgme_widget_message_bubble)");var 地址规则=".get(a.tgme_widget_message_photo_wrap).a(href)";var 标题规则=".c(发表时间:).get(time).a(datetime).c( 标题:).get(div.tgme_widget_message_text).t().z([\\\\s\\\\S]{40})";var 图片规则=".get(a.tgme_widget_message_photo_wrap).a(style).ty(\').tz(\')";var 简介规则=".get(div.tgme_widget_message_text).t()";var NEXTPAGE="https://tx.me"+getCode().match(/rel="prev" href="(.+?)"/)[1];var PREPAGE="https://tx.me"+getCode().match(/rel="canonical" href="(.+?)"/)[1];',
        "详情规则":'var 正文=getVar("简介");'
    }
},
{
    "title":"星火资源[qq文档]",
    "rule":{
        "分类":'var a="影视音乐$tab=ppx5bp&subId=ppx5bp&startrow=33#PN#$$电视剧,纪录片$tab=qvnx1e&subId=qvnx1e&startrow=33#PN#$$动漫漫画$tab=kwi9g7&subId=kwi9g7&startrow=33#PN#$$小说.电子书.图片$tab=1nylx9&subId=1nylx9&startrow=33#PN#$$教程.课程.软件$tab=BB08J2&subId=BB08J2&startrow=33#PN#";var a=a.split("$$");var padId="300000000$TzIVdaOubWOP";var items=[];for(var i in a){var title=a[i].split("$")[0];var url="https://docs.qq.com/dop-api/get/sheet?"+a[i].split("$")[1]+"&padId="+padId+"&outformat=1";items.push({title:title,url:url});}JSON.stringify(items);',
        "翻页数据":'"翻页+全部="',
        "列表规则":'var 原始=JSON.parse(getCode().replace(/"(\\d+)"/g, \'"qq_$1"\')).data.initialAttributedText.text[0][0][0].c[1];var list=[];for(var key in 原始){if(原始[key].qq_2&&原始[key].qq_2[1].length>1){list.push(原始[key].qq_2);}};var 列表=[];for(var i=0;i+2<list.length;i=i+3){var title="["+list[i][1]+"]"+list[i+1][1];var url=list[i][1];var detail=title+" 链接:"+list[i+2][1];列表.push(JSON.stringify({title:title,url:url,detail:detail}));}var 地址规则=".json(url)";var 标题规则=".json(title)";var 图片规则=".json(url)";var 简介规则=".json(detail)";var NEXTPAGE="";var PREPAGE="";',
        "详情规则":'var 正文=getVar("简介");'
    }
}
]
}
######普通列表
function 通用列表(){
    var res={};var items=[];
    var LIMIT=列表.length;
    for(var j=0;j<LIMIT;j++){
        var CODE=列表[j];
        var 地址=e2Rex(CODE,地址规则);
        var 标题=e2Rex(CODE,标题规则);
        var 图片=e2Rex(CODE,图片规则);
        var 简介=e2Rex(CODE,简介规则);
       items.push({title:标题,url:地址,img:图片,detail:简介});
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
eval(getVar("列表规则"));通用列表();
######详情列表
function 正文处理(){
    var list=正文.match(/[\s\S]{2,30}?https:\/\/www\.ali.+?\.com\/s\/.+/g);
var items=[];
for(var i in list){
    var title=list[i].replace(/.+?阿里云盘.+/g,"").replace(/<.+?>/g,"").split("https://www.ali")[0]||"没获取到标题，去看原文吧";
    if(title.length>40){
        title=title.replace(/\s/g,"").substr(title.length-40);
    }
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
return JSON.stringify(items);
}
var 正文=readStr("正文");正文处理();
