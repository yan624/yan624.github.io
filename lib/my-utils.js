function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
/*
 * 某一个操作时加载动画
 */
function relaoding(){
	var main = $("<div></div>").attr({"id":"reloading"}).addClass("main");
	var loadEffect = $("<div></div>").addClass("loadEffect");
	for(var i = 0; i < 8; i++){
		loadEffect.append($("<span></span>"));
	}
	main.append(loadEffect);
	$("body").children(":first").before(main);
}
/**
 * 移除加载动画
 * @returns
 */
function removeReloading(){
	$("#reloading").remove();
}
function escapeBlogContent(content){
	var escape;
	escape = content.replace(/&nbsp;/g, " ")
		.replace(/%/g,'%25')
		.replace(/&/g, '%26')
	return escape;
}
String.prototype.endWith=function(endStr){
    var d=this.length-endStr.length;
    return (d>=0&&this.lastIndexOf(endStr)==d)
}
/**
 * 打乱数组
 */
if (!Array.prototype.shuffle) {
	Array.prototype.shuffle = function() {
			for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
			return this;
	};
}