/* global NexT, CONFIG */
HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},NexT.utils={
/**
   * Wrap images with fancybox.
   */
wrapImageWithFancyBox:function(){document.querySelectorAll(".post-body :not(a) > img, .post-body > img").forEach(e=>{const t=$(e),o=t.attr("data-src")||t.attr("src"),n=t.wrap(`<a class="fancybox fancybox.image" href="${o}" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent("a");t.is(".post-gallery img")?n.attr("data-fancybox","gallery").attr("rel","gallery"):t.is(".group-picture img")?n.attr("data-fancybox","group").attr("rel","group"):n.attr("data-fancybox","default").attr("rel","default");const a=t.attr("title")||t.attr("alt");a&&(n.append(`<p class="image-caption">${a}</p>`),
// Make sure img title tag will show correctly in fancybox
n.attr("title",a).attr("data-caption",a))}),$.fancybox.defaults.hash=!1,$(".fancybox").fancybox({loop:!0,helpers:{overlay:{locked:!1}}})},registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{let t=document.createElement("a");
// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},
/**
   * One-click copy code support.
   */
registerCopyCode:function(){document.querySelectorAll("figure.highlight").forEach(e=>{if(e.querySelectorAll(".code .line span").forEach(e=>{e.classList.forEach(t=>{e.classList.remove(t),e.classList.add("hljs-"+t)})}),!CONFIG.copycode.enable)return;e.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-clipboard fa-fw"></i></div>');const t=e.querySelector(".copy-btn");t.addEventListener("click",e=>{const t=e.currentTarget,o=[...t.parentNode.querySelectorAll(".code .line")].map(e=>e.innerText).join("\n"),n=document.createElement("textarea");n.style.top=window.scrollY+"px",// Prevent page scrolling
n.style.position="absolute",n.style.opacity="0",n.readOnly=!0,n.value=o,document.body.append(n);const a=document.getSelection(),r=a.rangeCount>0&&a.getRangeAt(0);n.select(),n.setSelectionRange(0,o.length),n.readOnly=!1;const i=document.execCommand("copy");CONFIG.copycode.show_result&&(t.querySelector("i").className=i?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw"),n.blur(),// For iOS
t.blur(),r&&(a.removeAllRanges(),a.addRange(r)),document.body.removeChild(n)}),e.addEventListener("mouseleave",()=>{setTimeout(()=>{t.querySelector("i").className="fa fa-clipboard fa-fw"},300)})})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(e=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(t=>e.src.includes(t))&&!e.parentNode.matches(".video-container")){const t=document.createElement("div");t.className="video-container",e.wrap(t);let o=Number(e.width),n=Number(e.height);o&&n&&(t.style.paddingTop=n/o*100+"%")}})},registerScrollPercent:function(){const e=document.querySelector(".back-to-top"),t=document.querySelector(".reading-progress-bar");
// For init back to top in sidebar if page was scrolled after page refresh.
window.addEventListener("scroll",()=>{if(e||t){const o=document.querySelector(".container").offsetHeight,n=window.innerHeight,a=o>n?o-n:document.body.scrollHeight-n,r=Math.min(100*window.scrollY/a,100);e&&(e.classList.toggle("back-to-top-on",window.scrollY>50),e.querySelector("span").innerText=Math.round(r)+"%"),t&&(t.style.width=r.toFixed(2)+"%")}}),e&&e.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},
/**
   * Tabs tag listener (without twitter bootstrap).
   */
registerTabsTag:function(){
// Binding `nav-tabs` & `tab-content` by real time permalink changing.
document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault();const t=e.currentTarget;
// Prevent selected tab to select again.
if(!t.classList.contains("active")){
// Add & Remove active class on `nav-tabs` & `tab-content`.
[...t.parentNode.children].forEach(e=>{e.classList.toggle("active",e===t)});
// https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
const e=document.getElementById(t.querySelector("a").getAttribute("href").replace("#",""));[...e.parentNode.children].forEach(t=>{t.classList.toggle("active",t===e)}),
// Trigger event
e.dispatchEvent(new Event("tabs:click",{bubbles:!0}))}})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){
// Get responsive height passed from iframe.
window.addEventListener("message",({data:e})=>{if("string"==typeof e&&e.includes("ciu_embed")){const t=e.split(":")[1],o=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(o,10)+5+"px"}},!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach(e=>{const t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html",""),o=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||o))})},registerLangSelect:function(){let e=document.querySelector(".lang-select");e&&(e.value=CONFIG.page.lang,e.addEventListener("change",()=>{let t=e.options[e.selectedIndex];document.querySelector(".lang-select-label span").innerText=t.text;let o=t.dataset.href;window.pjax?window.pjax.loadUrl(o):window.location.href=o}))},registerSidebarTOC:function(){const e=document.querySelectorAll(".post-toc li"),t=[...e].map(e=>{const t=e.querySelector("a.nav-link"),o=document.getElementById(decodeURI(t.getAttribute("href")).replace("#",""));
// TOC item animation navigate.
return t.addEventListener("click",e=>{e.preventDefault();const t=o.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:t+10})}),o}),o=document.querySelector(".post-toc-wrap");!function n(a){a=Math.floor(a+1e4);let r=new IntersectionObserver((r,i)=>{let c=document.documentElement.scrollHeight+100;if(c>a)return i.disconnect(),void n(c);let l=function(e){let o=0,n=e[o];if(n.boundingClientRect.top>0)return o=t.indexOf(n.target),0===o?0:o-1;for(;o<e.length;o++){if(!(e[o].boundingClientRect.top<=0))return t.indexOf(n.target);n=e[o]}return t.indexOf(n.target)}(r);!function(e){if(e.classList.contains("active-current"))return;document.querySelectorAll(".post-toc .active").forEach(e=>{e.classList.remove("active","active-current")}),e.classList.add("active","active-current");let t=e.parentNode;for(;!t.matches(".post-toc");)t.matches("li")&&t.classList.add("active"),t=t.parentNode;
// Scrolling to center active TOC element if TOC content is taller then viewport.
window.anime({targets:o,duration:200,easing:"linear",scrollTop:o.scrollTop-o.offsetHeight/2+e.getBoundingClientRect().top-o.getBoundingClientRect().top})}(e[l])},{rootMargin:a+"px 0px -100% 0px",threshold:0});t.forEach(e=>{e&&r.observe(e)})}(document.documentElement.scrollHeight)},supportsPDFs:function(){let e=navigator.userAgent,t=e.includes("irefox")&&parseInt(e.split("rv:")[1].split(".")[0],10)>18,o=void 0!==navigator.mimeTypes["application/pdf"],n=/iphone|ipad|ipod/i.test(e.toLowerCase());return t||o&&!n},
/**
   * Init Sidebar & TOC inner dimensions on all pages and for all schemes.
   * Need for Sidebar/TOC inner scrolling if content taller then viewport.
   */
initSidebarDimension:function(){const e=document.querySelector(".sidebar-nav"),t="none"!==e.style.display?e.offsetHeight:0,o=CONFIG.sidebar.offset||12,n=CONFIG.back2top.enable&&CONFIG.back2top.sidebar?document.querySelector(".back-to-top").offsetHeight:0;let a=2*CONFIG.sidebar.padding+t+n;
// Margin of sidebar b2t: -4px -10px -18px, brings a different of 22px.
"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme||(a+=2*o-22);
// Initialize Sidebar & TOC Height.
const r=document.body.offsetHeight-a+"px";document.querySelector(".site-overview-wrap").style.maxHeight=r,document.querySelector(".post-toc-wrap").style.maxHeight=r},updateSidebarPosition:function(){const e=document.querySelector(".sidebar-nav"),t=document.querySelector(".post-toc");if(t?(e.style.display="",e.classList.add("motion-element"),document.querySelector(".sidebar-nav-toc").click()):(e.style.display="none",e.classList.remove("motion-element"),document.querySelector(".sidebar-nav-overview").click()),NexT.utils.initSidebarDimension(),window.screen.width<992||"Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)return;
// Expand sidebar on post detail page by default, when post has a toc.
let o=CONFIG.page.sidebar;"boolean"!=typeof o&&(
// There's no definition sidebar in the page front-matter.
o="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&t),o&&window.dispatchEvent(new Event("sidebar:show"))},setAffixParam:function(){const e=CONFIG.sidebar.offset||12,t=document.querySelector(".header-inner").offsetHeight;document.querySelector(".sidebar-inner").style.marginTop=t+e+"px"},getScript:function(e,t,o){if(o)t();else{let o=document.createElement("script");o.onload=o.onreadystatechange=function(e,n){(n||!o.readyState||/loaded|complete/.test(o.readyState))&&(o.onload=o.onreadystatechange=null,o=void 0,!n&&t&&setTimeout(t,0))},o.src=e,document.head.appendChild(o)}},loadComments:function(e,t){if(!CONFIG.comments.lazyload||!e)return void t();let o=new IntersectionObserver((e,o)=>{e[0].isIntersecting&&(t(),o.disconnect())});return o.observe(e),o}};