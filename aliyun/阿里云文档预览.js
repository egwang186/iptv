// ==UserScript==
// @name 阿里云文档预览
// @version 1
// @run-at 加载开始
// @match https://office-cn-beijing.imm.aliyuncs.com

// ==/UserScript==

var token =location.href.split('??')[1];
if(!document.cookie.includes(token)){
document.cookie = 'wwo_token=' + location.href.split('??')[1];location.reload();
}