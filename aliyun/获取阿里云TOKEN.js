// ==UserScript==
// @name 获取阿里云token
// @version 1
// @run-at end
// @match https://www.aliyundrive.com

// ==/UserScript==

var l=localStorage.getItem('token')
if (l!=null) {
  let t=JSON.parse(l)
  var access_token = t.access_token;
  var refresh_token = t.refresh_token;
  var default_drive_id=t.default_drive_id;
  setCookie('access_token', access_token, 30);
  setCookie('refresh_token', refresh_token, 30);
  setCookie('default_drive_id',default_drive_id,30);
  alert('COOKIE获取成功 注意:如果不包含access_token请刷新几次\r\n'+document.cookie);
}

function setCookie(name, value, day) {
  if (day) {
    //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var expires = day * 24 * 60 * 60 * 1000;
    var date = new Date(+ new Date() + expires);
    document.cookie =
      name + '=' + value + ';expires=' + date.toUTCString();
  } else {
    document.cookie = name + '=' + value;
  }
}
