######头部导航1
var URL=getVar("地址");
function 头部导航(){
var res={};var items=[];
for(var j=0;j<列表.length;j++){
     var 标题=e2Arr(列表[j],标题规则)||e2Arr(列表[j],标题规则1);
     var 地址=e2Arr(列表[j],地址规则);
     分类地址=URL+前+地址+后;
     items.push({title:标题,url:分类地址});
}
res.data=items;
return JSON.stringify(res);
}
var 源码=getCode();
if(URL.indexOf("/art/json")!=-1){
    if(e2Arr(源码.replace(/<.*?>/g,""),".json(data)")[0]){
        var 列表=e2Arr(源码,".json(list)");
        var 标题规则=".json(list_name).th( ##)";var 地址规则=".json(list_id)";var 前="?ac=list&pg=#PN#&t=";var 后="";头部导航();
    }else{
        var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(class)");
var 标题规则=".json(type_name)";var 标题规则1=".json(type_title)";var 地址规则=".json(type_id)";var 前="?ac=list&pg=#PN#&t=";var 后="";头部导航();
    }
}else{
var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(class)");
var 标题规则=".json(type_name)";var 标题规则1=".json(type_title)";var 地址规则=".json(type_id)";var 前="?ac=list&pg=#PN#&t=";var 后="";头部导航();
}
######通用列表2
var baseURL=getVar("地址").split("?")[0];
var NEXTPAGE=Number(getVar("PN"))+1;
function 通用列表(){
var res={};var items=[];var LIST=[];
var LIMIT=列表.length;
for(var j=0;j<LIMIT;j++){
    var CODE=列表[j];
   var 地址=e2Rex(CODE,地址规则).indexOf("http")!=-1?e2Rex(CODE,地址规则):baseURL+e2Rex(CODE,地址规则);
    var 标题=e2Rex(CODE,标题规则);
    var 预图片=e2Rex(CODE,图片规则);
    if(预图片.indexOf("/mac:")!=-1){
    var 图片="http:"+预图片.split("mac:")[1];
    }else if(预图片.indexOf("test.com")!=-1||预图片.indexOf("maccms.com")!=-1||预图片.indexOf("maccms.pro")!=-1){
    var 图片=getVar("地址").match(/https?:\/\/.+?\//)[0]+预图片.split(/\.[a-z]+?\.[a-z]+\/+/)[1];
    var 图片=图片.match(/.*(http.*)/)[1];
    }else if(预图片.indexOf("https://zy.itono.cn///")!=-1){
    var 图片="http:"+预图片.split("///")[1];
    }else if(预图片.indexOf("http://zy.itono.cn/")!=-1){
    var 图片="https:"+预图片.split("http:")[1];
    }else if(预图片.indexOf("http")!=-1){
    var 图片=预图片.match(/.*(http.*)/)[1];
    }else if(预图片==""){
    var 图片="http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/js2.0/xscover.png";
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
if(baseURL.indexOf("/art/json")!=-1){
    if(e2Arr(源码.replace(/<.*?>/g,""),".json(data)")[0]){
        var 列表=e2Arr(源码,".json(data)");
        var 标题规则=".json(news_name)";var 地址规则=".c(?ac=detail&ids=).json(news_id)";var 图片规则=".json(news_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(news_keywords).ct(</b></font><br>)";var 图片底部规则=".json(news_addtime)";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).json(news_type).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='#FFFFFF'>).json(news_remark).ct(</font></p>)";通用列表();
    }else{
        var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(art_name)";var 地址规则=".c(?ac=detail&ids=).json(art_id)";var 图片规则=".json(art_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(art_from).ct(</b></font><br>)";var 图片底部规则=".json(art_time)";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='#FFFFFF'>).json(art_remarks).ct(</font></p>)";通用列表();
    }
}else{
var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(art_name)";var 地址规则=".c(?ac=detail&ids=).json(art_id)";var 图片规则=".json(art_pic)";var 简介规则=".c(<font color='#0997F7'><b>).json(art_from).ct(</b></font><br>)";var 图片底部规则=".json(art_time)";var 左上规则=".tx(<p style='background-color:#7091fc'><font color='#FFFFFF' size='40px'>).json(type_name).ct(</font></p>)";var 右上规则=".tx(<p style='background-color:#CC00FF'><font color='#FFFFFF'>).json(art_remarks).ct(</font></p>)";通用列表();
}
######选集列表3
var URL=getVar("地址");
function 选集列表(){
var res={};
res.desc=简介;
return JSON.stringify(res);
}
if(URL.indexOf("/art/json")!=-1){
    if(e2Arr(源码,".json(data)")[0]){
        var 简介=e2Rex(getVar("源码"),".json(data).json(news_content)");选集列表();
    }else{
        var 简介=e2Rex(getVar("源码"),".json(list).json(art_content)");选集列表();
    }
}else{
var 简介=e2Rex(getVar("源码"),".json(list).json(art_content)");选集列表();
}
######搜索列表4
function 搜索列表(){
var res={};var items=[];var LIST=[];
var LIMIT=列表.length;
for(var j=0;j<LIMIT;j++){
    var CODE=列表[j];
   var 地址=e2Rex(CODE,地址规则).indexOf("http")!=-1?e2Rex(CODE,地址规则):getVar("Url")+e2Rex(CODE,地址规则);
    var 标题=e2Rex(CODE,标题规则);
    var 预图片=e2Rex(CODE,图片规则);
    if(预图片.indexOf("/mac:")!=-1){
    var 图片="http:"+预图片.split("mac:")[1];
    }else if(预图片.indexOf("=")!=-1){
    var 图片=预图片.match(/.*(http.*)/)[1];
    }else if(预图片.indexOf("http")!=-1){
    var 图片=预图片;
    }else if(预图片==""){
    var 图片="http://59.47.74.33:3000/apis/my-github/egwang186/iptv/main/js2.0/xscover.png";
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
var URL=getVar("Url")+"?ac=list&wd="+getVar("KEY");
var 源码=getCode();
if(URL.indexOf("/art/json")!=-1){
    if(e2Arr(源码.replace(/<.*?>/g,""),".json(data)")[0]){
        var 列表=e2Arr(源码,".json(data)");
        var 标题规则=".json(news_name)";var 地址规则=".c(?ac=detail&ids=).json(news_id)";var 图片规则=".json(news_pic)";var 简介规则=".json(news_addtime).c().json(news_type)";var 作者规则=".json(news_remark)";搜索列表();
    }else{
        var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(art_name)";var 地址规则=".c(?ac=detail&ids=).json(art_id)";var 图片规则=".json(art_pic)";var 简介规则=".json(type_name).c().json(art_time).c().json(art_remarks)";var 作者规则=".json(art_from)";搜索列表();
    }
}else{
var 列表=e2Arr(源码.replace(/<.*?>/g,""),".json(list)");
var 标题规则=".json(art_name)";var 地址规则=".c(?ac=detail&ids=).json(art_id)";var 图片规则=".json(art_pic)";var 简介规则=".json(type_name).c().json(art_time).c().json(art_remarks)";var 作者规则=".json(art_from)";搜索列表();
}