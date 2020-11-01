/* global CONFIG */
document.addEventListener("DOMContentLoaded",()=>{
// Popup Window
let e,t=!1,n=!0,r=CONFIG.path;0===r.length?r="search.xml":r.endsWith("json")&&(n=!1);const o=document.querySelector(".search-input"),l=document.getElementById("search-result"),s=(e,t,n)=>{if(CONFIG.localsearch.unescape){let t=document.createElement("div");t.innerText=e,e=t.innerHTML}let r=e.length;if(0===r)return[];let o=0,l=[],s=[];for(n||(t=t.toLowerCase(),e=e.toLowerCase());(l=t.indexOf(e,o))>-1;)s.push({position:l,word:e}),o=l+r;return s},c=(e,t,n,r)=>{let o=n[n.length-1],{position:l,word:s}=o,c=[],i=0;for(;l+s.length<=t&&0!==n.length;){s===r&&i++,c.push({position:l,length:s.length});let e=l+s.length;
// Move to next position of hit
for(n.pop();0!==n.length&&(o=n[n.length-1],l=o.position,s=o.word,e>l);)n.pop()}return{hits:c,start:e,end:t,searchTextCount:i}},i=(e,t)=>{let n="",r=t.start;return t.hits.forEach(t=>{n+=e.substring(r,t.position);let o=t.position+t.length;n+=`<b class="search-keyword">${e.substring(t.position,o)}</b>`,r=o}),n+=e.substring(r,t.end),n},a=()=>{if(!t)return;let n=o.value.trim().toLowerCase(),r=n.split(/[-\s]+/);r.length>1&&r.push(n);let a=[];n.length>0&&
// Perform local searching
e.forEach(({title:e,content:t,url:o})=>{let l=e.toLowerCase(),h=t.toLowerCase(),u=[],d=[],p=0;
// Show search results
if(r.forEach(e=>{u=u.concat(s(e,l,!1)),d=d.concat(s(e,h,!1))}),u.length>0||d.length>0){let r=u.length+d.length;
// Sort index by position of keyword
[u,d].forEach(e=>{e.sort((e,t)=>t.position!==e.position?t.position-e.position:e.word.length-t.word.length)});let l=[];if(0!==u.length){let t=c(0,e.length,u,n);p+=t.searchTextCountInSlice,l.push(t)}let s=[];for(;0!==d.length;){let e=d[d.length-1],{position:r,word:o}=e,l=r-20,i=r+80;l<0&&(l=0),i<r+o.length&&(i=r+o.length),i>t.length&&(i=t.length);let a=c(l,i,d,n);p+=a.searchTextCountInSlice,s.push(a)}
// Sort slices in content by search text's count and hits' count
s.sort((e,t)=>e.searchTextCount!==t.searchTextCount?t.searchTextCount-e.searchTextCount:e.hits.length!==t.hits.length?t.hits.length-e.hits.length:e.start-t.start);
// Select top N slices in content
let h=parseInt(CONFIG.localsearch.top_n_per_article,10);h>=0&&(s=s.slice(0,h));let g="";0!==l.length?g+=`<li><a href="${o}" class="search-result-title">${i(e,l[0])}</a>`:g+=`<li><a href="${o}" class="search-result-title">${e}</a>`,s.forEach(e=>{g+=`<a href="${o}"><p class="search-result">${i(t,e)}...</p></a>`}),g+="</li>",a.push({item:g,id:a.length,hitCount:r,searchTextCount:p})}}),1===r.length&&""===r[0]?l.innerHTML='<div id="no-result"><i class="fa fa-search fa-5x"></i></div>':0===a.length?l.innerHTML='<div id="no-result"><i class="far fa-frown fa-5x"></i></div>':(a.sort((e,t)=>e.searchTextCount!==t.searchTextCount?t.searchTextCount-e.searchTextCount:e.hitCount!==t.hitCount?t.hitCount-e.hitCount:t.id-e.id),l.innerHTML=`<ul class="search-result-list">${a.map(e=>e.item).join("")}</ul>`,window.pjax&&window.pjax.refresh(l))},h=()=>{fetch(CONFIG.root+r).then(e=>e.text()).then(r=>{
// Get the contents from search data
t=!0,e=n?[...(new DOMParser).parseFromString(r,"text/xml").querySelectorAll("entry")].map(e=>({title:e.querySelector("title").textContent,content:e.querySelector("content").textContent,url:e.querySelector("url").textContent})):JSON.parse(r),
// Only match articles with not empty titles
e=e.filter(e=>e.title).map(e=>(e.title=e.title.trim(),e.content=e.content?e.content.trim().replace(/<[^>]+>/g,""):"",e.url=decodeURIComponent(e.url).replace(/\/{2,}/g,"/"),e)),
// Remove loading animation
document.getElementById("no-result").innerHTML='<i class="fa fa-search fa-5x"></i>',a()})};CONFIG.localsearch.preload&&h(),"auto"===CONFIG.localsearch.trigger?o.addEventListener("input",a):(document.querySelector(".search-icon").addEventListener("click",a),o.addEventListener("keypress",e=>{"Enter"===e.key&&a()})),
// Handle and trigger popup window
document.querySelectorAll(".popup-trigger").forEach(e=>{e.addEventListener("click",()=>{document.body.style.overflow="hidden",document.querySelector(".search-pop-overlay").classList.add("search-active"),o.focus(),t||h()})});
// Monitor main search box
const u=()=>{document.body.style.overflow="",document.querySelector(".search-pop-overlay").classList.remove("search-active")};document.querySelector(".search-pop-overlay").addEventListener("click",e=>{e.target===document.querySelector(".search-pop-overlay")&&u()}),document.querySelector(".popup-btn-close").addEventListener("click",u),document.addEventListener("pjax:success",u),window.addEventListener("keyup",e=>{"Escape"===e.key&&u()})});