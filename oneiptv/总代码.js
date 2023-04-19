######远程订阅写入本地1
if(getVar("QJS")&&getVar("QJS")!="null"){
    eval(getVar("QJS"));
}else{
    eval(e2Rex(getHttp('https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/aliyun/QJS.js'),'.dn64()'));
}
var filename='一个直播远程索引.txt';
if(getVar("rurl").indexOf(",http")>0){
var 记录=getVar("rurl").match(/.+?,http.+/g);
if(_.read(filename)){
    var 旧记录=_.read(filename).match(/.+?,http.+/g);
    for(var i in 记录){
    var 记录项=[];记录项.push(记录[i]);
    var 旧记录=记录项.concat(旧记录.filter(item=>item!=记录[i]));
    }
    var 新记录=旧记录;
}else{
var 新记录=记录;
}
_.write(新记录.join("\n"),filename);
_.read(filename);
}else{
"请输入正确格式(支持批量):名称,地址";
}
######源文本写入本地2
if(getVar("QJS")&&getVar("QJS")!="null"){
    eval(getVar("QJS"));
}else{
    eval(e2Rex(getHttp('https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/aliyun/QJS.js'),'.dn64()'));
}
var indexname='一个直播本地索引.txt';
if(getVar("text")!='null'&&getVar("text").indexOf(",")>1&&getVar("sort")!='null'&&getVar("sort").length>1){
var filename=getVar("sort")+'.txt';
var 记录=getVar("text").match(/.+?,.+/g);
if(_.read(filename)){
var 旧记录=_.read(filename).match(/.+?,.+/g);
var 新记录=记录.concat(旧记录);
}else{
var 新记录=记录;
}
var a=getVar("sort")+","+getVar("sort")+'.txt';
var item=[];item.push(a);
if(_.read(indexname)){
var 旧索引=_.read(indexname).match(/.+?,.+/g);
var 新索引=item.concat(旧索引.filter(u=>u!=a));
_.write(新索引.join("\n"),indexname);
}else{
_.write(item.join("\n"),indexname);
}
_.write(新记录.join("\n"),filename);
_.read(indexname)+_.read(filename);
}else{
"请输入正确格式(支持批量):名称,地址";
}
######读取远程订阅3
if(getVar("QJS")&&getVar("QJS")!="null"){
    eval(getVar("QJS"));
}else{
    eval(e2Rex(getHttp('https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/aliyun/QJS.js'),'.dn64()'));
}
var filename='一个直播远程索引.txt';
var code=_.read(filename).match(/.+?,.+/g);
var items=[];
for(var i in code){
var title=code[i].split(",")[0];
var url="q:自定义播放器?url=远程$$"+code[i].split(",")[1];
items.push({title:title,url:url});
}
JSON.stringify(items);
######读取本地文本4
if(getVar("QJS")&&getVar("QJS")!="null"){
    eval(getVar("QJS"));
}else{
    eval(e2Rex(getHttp('https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/aliyun/QJS.js'),'.dn64()'));
}
var filename='一个直播本地索引.txt';
var code=_.read(filename).match(/.+?,.+/g);
var items=[];
for(var i in code){
var title=code[i].split(",")[0];
var url="q:自定义播放器?url=本地$$"+code[i].split(",")[1];
items.push({title:title,url:url});
}
JSON.stringify(items);
######选集地址5
if(getVar("QJS")&&getVar("QJS")!="null"){
    eval(getVar("QJS"));
}else{
    eval(e2Rex(getHttp('https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/aliyun/QJS.js'),'.dn64()'));
}
var type=getVar("url").split("$$")[0];
var u=getVar("url").split("$$")[1];
if(type=="远程"){
    var code=getHttp(u);
}else if(type=="本地"){
    var code=_.read(u);
}
function 选集列表(){
    var res={};var items=[];
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
            var 选集=e2Rex(列表[j],选集规则);
            var 选集地址=e2Rex(列表[j],选集地址规则);
            LIST.push({title:选集,url:选集地址});
        }
    var play_={};
    play_.title=标题;
    play_.list=LIST;
    items.push(play_);
    }
    res.data=items;
    return JSON.stringify(res);
}
if(code.indexOf("#genre#")!=-1){
    var 分类=code.split(/.+?#genre#.*/).filter(item=>item.indexOf("://")!=-1);
    var 线路=code.match(/.+?#genre#.*/g);
    var 列表规则=".z(.+?,.+)";
    var 标题规则=".tz(#genre#)";
    var 选集地址规则=".c(http://ip111.cn/?wd=).ty(,)";
    var 选集规则=".tz(,)";选集列表();
}else if(code.indexOf("#EXTINF:")!=-1){
    var code=code.match(/#EXTINF:.+[\s]+.+/g);
    var res={};var items=[];
for(var i in code){
    var 选集=code[i].match(/,(.*)/)[1]||"无选集名称";var 选集地址=code[i].match(/,.*[\s]+(.+)/)[1]||"无播放地址";
    if(code[i].search(/group-title=".*?"/)!=-1){
        var type=code[i].match(/group-title="(.*?)"/)[1]||"不规范分类";
    }else{
        var type="未分类";
    }
var 当前条目=[];当前条目.push({title:选集,url:"http://ip111.cn/?wd="+选集地址});
if(items.length==0) {
    items.push({title:type,list:当前条目});
}else{
    let 寻找=items.some(item=>{
    //判断类型，有就添加到当前项
      if(item.title == type){
      item.list=item.list.concat(当前条目);
      return true
      }
    });
    if (!寻找) {
    //如果没找相同类型添加一个类型
      items.push({title:type,list:当前条目});
    }
}
}
res.data=items;
JSON.stringify(res);
}else if(code.search(/\$c_start.+?\$c_end/)!=-1){
    var 分类=code.split(/\$c_start.+?\$c_end/).filter(item=>item.indexOf("://")!=-1);
    var 线路=code.match(/\$c_start.+?\$c_end/g);
    var 列表规则=".z(.+?,.+)";
    var 标题规则=".ty(c_start).tz($c_end)";
    var 选集地址规则=".c(http://ip111.cn/?wd=).ty(,)";
    var 选集规则=".tz(,)";选集列表();
}else{
    var code=code.match(/.+?,.+/g);
    var res={};var items=[];
for(var i in code){
    var 选集=code[i].match(/(.+),/)[1];var 选集地址=code[i].match(/,[\s]*?(.+)/)[1];
    if(code[i].indexOf("|")!=-1){
        var type=选集.split("|")[0];
        var 选集标题=选集.split("|")[1];
    }else{
        var type=getVar("name")+"-无子分类";
        var 选集标题=选集;
    }
var 当前条目=[];当前条目.push({title:选集标题,url:"http://ip111.cn/?wd="+选集地址});
if(items.length==0) {
    items.push({title:type,list:当前条目});
}else{
    let 寻找=items.some(item=>{
    //判断类型，有就添加到当前项
      if(item.title == type){
      item.list=item.list.concat(当前条目);
      return true
      }
    });
    if (!寻找) {
    //如果没找相同类型添加一个类型
      items.push({title:type,list:当前条目});
    }
}
}
res.data=items;
JSON.stringify(res);
}
######免嗅探6
var uu=getVar("url").split("/?wd=")[1];
if(uu.indexOf("#")!=-1){
var urls=uu.split("#");
var items=[];
for(var i=0;i<urls.length;i++){
    if(urls[i].indexOf(".php")!=-1){
        var resp = JZ(JSON.stringify({ url: urls[i], redirect: false }));
        var u = resp.head.Location || resp.head.location;
        if(!u){
            u=uu+"&type=.m3u8";
        }
    }else if(urls[i].indexOf("mitv://")!=-1){
        var u=urls[i].replace("mitv://","P2p://");
    }else{
        var u=urls[i];
    }
    items.push({url:u}); 
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
    }else{
        var u=uu;
    }
JSON.stringify({url:u});
}
######管理订阅7
if(getVar("QJS")&&getVar("QJS")!="null"){
    eval(getVar("QJS"));
}else{
    eval(e2Rex(getHttp('https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/aliyun/QJS.js'),'.dn64()'));
}
var filename='一个直播远程索引.txt';
var code=_.read(filename).match(/.+?,.+/g);
var items=[];
for(var i in code){
var title=code[i].split(",")[0];
var url="q:管理订阅按钮?url="+code[i];
items.push({title:title,url:url});
}
JSON.stringify(items);
######管理本地8
if(getVar("QJS")&&getVar("QJS")!="null"){
    eval(getVar("QJS"));
}else{
    eval(e2Rex(getHttp('https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/aliyun/QJS.js'),'.dn64()'));
}
var filename='一个直播本地索引.txt';
var code=_.read(filename).match(/.+?,.+/g);
var items=[];
for(var i in code){
var title=code[i].split(",")[0];
var url="q:展示本地内容?url="+code[i];
items.push({title:title,url:url});
}
JSON.stringify(items);
######展示本地内容9
if(getVar("QJS")&&getVar("QJS")!="null"){
    eval(getVar("QJS"));
}else{
    eval(e2Rex(getHttp('https://egwang186.coding.net/p/egwang186/d/iptv/git/raw/master/aliyun/QJS.js'),'.dn64()'));
}
var filename=getVar("url").split(",")[1];
var code=_.read(filename).match(/.+?,.+/g);
var items=[];
for(var i in code){
var title=code[i].split(",")[0];
var url="q:管理本地按钮?url="+code[i];
items.push({title:title,url:url});
}
JSON.stringify(items);
######QJS10
ZXZhbChmdW5jdGlvbihlLGYsYSxkLGMsZyl7Yz1mdW5jdGlvbihiKXtyZXR1cm4oYjxmPyIiOmMocGFyc2VJbnQoYi9mKSkpKygzNTwoYiU9Zik/U3RyaW5nLmZyb21DaGFyQ29kZShiKzI5KTpiLnRvU3RyaW5nKDM2KSl9O2lmKCEiIi5yZXBsYWNlKC9eLyxTdHJpbmcpKXtmb3IoO2EtLTspZ1tjKGEpXT1kW2FdfHxjKGEpO2Q9W2Z1bmN0aW9uKGIpe3JldHVybiBnW2JdfV07Yz1mdW5jdGlvbigpe3JldHVybiJcXHcrIn07YT0xfWZvcig7YS0tOylkW2FdJiYoZT1lLnJlcGxhY2UobmV3IFJlZ0V4cCgiXFxiIitjKGEpKyJcXGIiLCJnIiksZFthXSkpO3JldHVybiBlfSgiKDUoKXszIDY9e307MyBtPTEuMDszIHE9Ui4xdi4xdy4xeC4xeTszIHI9Ui4xdi4xdy4xeC4xeSgpLmMuMjc7MyBzPTF6LjI4LjI5LjJhKCk7MyB0PVMuMmI7MyB1PVMuMUE7MyB2PXQuVC4yYzszIHc9MUIoKSt2KycyZCcrditFKCkuVS5WKDAsNCkrJyQkJCcrRSgpLjE4K3Y7SD0oMUMpPT4xRCAxQz09PScyZSc7NSAxOShhKXsyZiAxYT0xRCBhOzcgYSE9SSYmKDFhPT0nMmcnfHwxYT09JzUnKX0zIHk9Uy4yaC4yaTszIHo9OCB5LjJqLjJrKCk7NSBXKGEpezFFPXsxRjo1KCl7NyBhKCl9LH07MyBiPTggeS4ybCgxRSk7ei5YKGIpOzcgYn01IFkoYSxiKXtKIEs9MDtKIDFiPVtdO0woSzxhLkQpezFiLjFjKGEuMm0oSyxLK2IpKTtLKz1ifTcgMWIuMm4oKG8pPT5vLkQ+MCl9NSBYKGwsbil7Yz1bXTtaPVkobCxsLkQvbik7MyBuPTA7TChuPFouRCl7NSBsKHgpezcgNSBvKCl7MyBhPVtdOzFkKEogaT0wO2k8Wlt4XS5EO2krKyl7YS4xYyhaW3hdW2ldKCkpfTcgYX19Yy4xYyhXKGwobikpKTtuKyt9NyBjfTUgMTAoZil7MyBhPWYuMm8oKTs5KCFhLjFHKCkpYS4xMCgpfTUgRihhLGIpezMgYz04IHQuVCh3KydcdTY1NzBcdTYzNmUnK3YrYik7MTAoYyk7MyBkPTggdC4ycChjLDFlKTtkLkYoYSk7ZC5NKCl9NSBOKGEpezMgYj04IHQuVCh3KydcdTY1NzBcdTYzNmUnK3YrYSk7MyBjPTA7OSghYi4xRygpfHwoYz1iLkQoKSk9PTApNycnOzMgZD11LjFILjFJLjFKKHUuMUsuMUwsYyk7MyBlPTggdC4ycShiKTtlLk4oZCk7ZS5NKCk7NyA4IHUuMnIoZCl9MyBBPVIuMnMuMnQ7MyBCPUEuMnUuMnY7NSAxMShvKXtKezFmLEcsTywxZywxMiwxaH09bzszIGE9QS4ydy4yeCgxZik7YS4yeSgxMyk7YS4yeigyQSk7MWg9PT0xZT9hLjFNKDFoKTphLjFNKDEzKTs5KDE5KEcpKTFkKHggMU4gRylhLkcoeCxHW3hdKTs5KDE5KE8pKXs5KDFnPT09MTMpYS4yQihPKTsxTyAxZChwIDFOIE8pYS4yQyhwLE9bcF0pfTMgYjs5KDFnPT09MTN8fDEyPT0nMkQnKWI9YS4xMihCLjJFKS4xUCgpOzFPIGI9YS4xMihCLjJGKS4xUCgpOzcgYn01IDFRKGEsYil7YS4yRyhiKTs3IGEuMkgoKX01IDFSKGEsYil7NyBiKyc9JythLjJJKGIpfTUgMVMoYSl7MyBiPScnOzMgYz1hLjJKKCkuMVQoKS4xVSgpO0woYy4xVigpKXszIGQ9Yy4xVygpO2IrPWQuMVgoKSsnPScrZC4xWSgpKyc7J303IGJ9NSAxWihhLGIpezcgYS5HKGIpfTUgMjAoYSl7MyBiPScnOzMgYz1hLjJLKCkuMVQoKS4xVSgpO0woYy4xVigpKXszIGQ9Yy4xVygpO2IrPWQuMVgoKSsnPScrZC4xWSgpKyc7J303IGJ9NSAxaShhKXszIGI9YS4xaignLycpOzkoYS5EKCk9PWIrMSl7YT1hLlYoMCxiKTs3IDFpKGEpfTcgYS5WKDAsYS4xaignLicpKX01IDFrKG8pezJMe0p7MWwsMjF9PW87MyBhPTExKG8pOzMgYj0xaShhLjFmKCkuMjIoKSk7MyBjPXMuMk0oYS4yTigpLjJPKCc7JylbMF0pOzMgZD1iLlYoYi4xaignLycpKzEpKycuJytjO1A9SCgxbCk/MWwrditkOncrJ1x1NGUwYlx1OGY3ZCcrditkOzMgZj1hLjJQKCk7MyBnPTggdS4xSC4xSS4xSih1LjFLLjFMLDJRKTszIGg9MDszIGk9OCB0LjJSKCk7TCgoaD1mLk4oZykpIT0tMSl7aS5GKGcsMCxoKX0zIGo9OCB0LlQoUCk7MTAoaik7MyBrPTggdC4yUyhqKTtrLkYoaS4yVCgpKTs5KDIxPT09MWUpNyBQO1EoJ1x1NGUwYlx1OGY3ZFx1NjIxMFx1NTI5Zlx1ZmYwY1x1OGRlZlx1NWY4NDonK1ApOzcgUH0yVShlKXsxNChlKTtRKCdcdTRlMGJcdThmN2RcdTU5MzFcdThkMjUsXHU4YmY3XHU2MjUzXHU1ZjAwXHU4YzAzXHU4YmQ1XHU1M2YwXHU2N2U1XHU3NzBiXHU1MTc3XHU0ZjUzXHU1ZjAyXHU1ZTM4XHU0ZmUxXHU2MDZmJyl9MlZ7OShpIT1JKWkuTSgpOzkoayE9SSlrLk0oKTs5KGYhPUkpZi5NKCl9fTMgQz1yLjJXKEUoKS5VLHIuMlgpOzUgMW0oYSxiKXszIGM9Qy4xbigpO2MuMlkoYSxiKTtjLjFvKCl9NSAxcChhLGIpezcgQy4yWihhLGIpfTUgMXEoYSl7MyBjPUMuMW4oKTtjLjMwKGEpO2MuMW8oKX01IDIzKCl7MyBjPUMuMW4oKTtjLjMxKCk7Yy4xbygpfTUgJCgpezMgYT0xNS5EOzMyKGEpezI0IDE6NyAxNigxNVswXSk7MjQgMjo3IDMzKDE1WzBdLDE1WzFdKTszNDo3IDM1KCl9fTUgMTQoZSl7SChlKT9cdTYyYTVcdTk1MTkoZSk6XHU2MmE1XHU5NTE5KGUuMjIoKSl9NSBRKGEpe3EuaC5iKGEpfTUgMXIoKXs4IFIuMXouMzYuMzcoKS4zOCg0KX01IDFCKCl7NyByLjM5KEkpLjNhKCl9NSAxNyhhKXtTLjFBLjNiLjE3KGEpfTUgRSgpe289e307by5VPTFzKDE2KCcxdCcpLCcuMXUoVSkudCgpJyk7by4yNT0xcygxNignMXQnKSwnLjF1KDI1KS50KCknKTtvLjE4PTFzKDE2KCcxdCcpLCcuMXUoMTgpLnQoKScpOzcgb302LjNjPW07Ni5OPU47Ni5GPUY7Ni4xNz0xNzs2Llc9Vzs2Llg9WDs2Llk9WTs2LjFyPTFyOzYuSD1IOzYuMTE9MTE7Ni4zZD0xUTs2LjNlPTFSOzYuM2Y9MVM7Ni4zZz0xWjs2LjNoPTIwOzYuMWs9MWs7Ni5FPUU7Ni5RPVE7Ni4xND0xNDs2LjFtPTFtOzYuMXA9MXA7Ni4xcT0xcTs2LjNpPTIzOzYuJD0kOzI2LjY9Nn0uMUYoMjYpKTsiLAo2MiwyMDUsIiAgIHZhciAgZnVuY3Rpb24gXyByZXR1cm4gbmV3IGlmICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoIGluZm8gd3JpdGUgaGVhZGVyIGlzU3RyaW5nIG51bGwgbGV0IGluZGV4IHdoaWxlIGNsb3NlIHJlYWQgcGFyYW1zIHNhdmVwYXRoIHRvYXN0IFBhY2thZ2VzIGphdmEgRmlsZSBzaWduIHN1YnN0cmluZyB0aHJlYWQgc3VibWl0IGNodW5rIGxpc3QgbWtkaXJzIGh0dHAgbWV0aG9kIHRydWUgZXJyb3IgYXJndW1lbnRzIGdldFZhciBzbGVlcCBuYW1lIGlzT2JqZWN0IHR5cGUgcmVzIHB1c2ggZm9yIGZhbHNlIHVybCBqc29uIHJlIHRyaW1VIGxhc3RJbmRleE9mIGRvd25sb2FkIHNldHBhdGggcHV0U3AgZWRpdCBjb21taXQgZ2V0U3AgY2xlYXJTcCBiYWNrIGUyUmV4IFFNSU5GTyBnZXQgY24gbWJyb3dzZXIgY29uZmlnIEFwcCBhbmRyb2lkIGxhbmcgcGF0aCB2YWwgdHlwZW9mIG9iaiBjYWxsIGV4aXN0cyByZWZsZWN0IEFycmF5IG5ld0luc3RhbmNlIEJ5dGUgVFlQRSBmb2xsb3dSZWRpcmVjdHMgaW4gZWxzZSBleGVjdXRlIGh0dHBCb2R5IGh0dHBDb29raWUgaHR0cENvb2tpZXMgZW50cnlTZXQgaXRlcmF0b3IgaGFzTmV4dCBuZXh0IGdldEtleSBnZXRWYWx1ZSBodHRwSGVhZGVyIGh0dHBIZWFkZXJzIHRpcHMgdG9TdHJpbmcgcmVtb3ZlU3AgY2FzZSB2ZXJzaW9uIHRoaXMgYXBwbGljYXRpb25Db250ZXh0IHdlYmtpdCBNaW1lVHlwZU1hcCBnZXRTaW5nbGV0b24gaW8gc2VwYXJhdG9yIHFtIHN0cmluZyBjb25zdCBvYmplY3QgdXRpbCBjb25jdXJyZW50IEV4ZWN1dG9ycyBuZXdDYWNoZWRUaHJlYWRQb29sIEZ1dHVyZVRhc2sgc2xpY2UgZmlsdGVyIGdldFBhcmVudEZpbGUgRmlsZVdyaXRlciBGaWxlSW5wdXRTdHJlYW0gU3RyaW5nIG9yZyBqc291cCBDb25uZWN0aW9uIE1ldGhvZCBKc291cCBjb25uZWN0IGlnbm9yZUNvbnRlbnRUeXBlIG1heEJvZHlTaXplIDEwNDg1NzYwMDAgcmVxdWVzdEJvZHkgZGF0YSBwb3N0IFBPU1QgR0VUIGNoYXJzZXQgYm9keSBjb29raWUgY29va2llcyBoZWFkZXJzIHRyeSBnZXRFeHRlbnNpb25Gcm9tTWltZVR5cGUgY29udGVudFR5cGUgc3BsaXQgYm9keVN0cmVhbSA0MDk2IEJ5dGVBcnJheU91dHB1dFN0cmVhbSBGaWxlT3V0cHV0U3RyZWFtIHRvQnl0ZUFycmF5IGNhdGNoIGZpbmFsbHkgZ2V0U2hhcmVkUHJlZmVyZW5jZXMgTU9ERV9QUklWQVRFIHB1dFN0cmluZyBnZXRTdHJpbmcgcmVtb3ZlIGNsZWFyIHN3aXRjaCBwdXRWYXIgZGVmYXVsdCBnZXRDb2RlIGFwcCBJbnN0cnVtZW50YXRpb24gc2VuZEtleURvd25VcFN5bmMgZ2V0RXh0ZXJuYWxGaWxlc0RpciBnZXRQYXRoIFRocmVhZCBWRVJTSU9OIGJkIGNrIGNrcyBoZCBoZHMgZGVsU3AiLnNwbGl0KCIgIiksCjAse30pKTs=