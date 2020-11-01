function GetQueryString(e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),t=window.location.search.substr(1).match(n);return null!=t?unescape(t[2]):null}
/*
 * 某一个操作时加载动画
 */function relaoding(){for(var e=$("<div></div>").attr({id:"reloading"}).addClass("main"),n=$("<div></div>").addClass("loadEffect"),t=0;t<8;t++)n.append($("<span></span>"));e.append(n),$("body").children(":first").before(e)}
/**
 * 移除加载动画
 * @returns
 */function removeReloading(){$("#reloading").remove()}function escapeBlogContent(e){return e.replace(/&nbsp;/g," ").replace(/%/g,"%25").replace(/&/g,"%26")}String.prototype.endWith=function(e){var n=this.length-e.length;return n>=0&&this.lastIndexOf(e)==n}
/**
 * 打乱数组
 */,Array.prototype.shuffle||(Array.prototype.shuffle=function(){for(var e,n,t=this.length;t;e=parseInt(Math.random()*t),n=this[--t],this[t]=this[e],this[e]=n);return this});