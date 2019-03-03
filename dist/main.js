!function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";function n(e){let t=0;$("#wiki-data").empty(),$.each(e,(e,i)=>{const n=`https://ru.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&explaintext=&titles=${i}`;$.ajax({url:n,type:"GET",success:e=>{$.each(e.query.pages,(e,i)=>{let n=i.extract;t+=n.length})}})}),setTimeout(function(){const i=t/e.length;$("#wiki-data").append($(`<p>Среднее количество символов по выгруженным статьям - ${i}</p>`))},1e3)}function r(e){let t=[],i=[];$.each(e,(e,n)=>{const r=`https://ru.wikipedia.org/w/api.php?action=query&origin=*&prop=revisions&titles=${n}&format=json`;$.ajax({url:r,type:"GET",success:e=>{$.each(e.query.pages,(e,n)=>{let r=n.revisions[0].timestamp;t.push(r),i.push({title:n.title,date:r})})}})}),setTimeout(function(){const e=t.reduce((e,t)=>e>t?e:t);$.each(t,(t,n)=>{if(i[t].date==e){let e=i[t].date.replace("T"," ");e=e.replace("Z"," "),$("#wiki-data").append($(`<p>Самая свежая статья - "${i[t].title}" была обновлена ${e}</p>`))}});const n=t.reduce((e,t)=>e<t?e:t);$.each(t,(e,t)=>{if(i[e].date==n){let t=i[e].date.replace("T"," ");t=t.replace("Z"," "),$("#wiki-data").append($(`<p>Самая старая статья - "${i[e].title}" была обновлена ${t}</p>`))}})},500)}function s(){const e=Date.now();let t=0;const i=function(){const e=new Date;return`${("0"+e.getDate()).slice(-2)}.${("0"+(e.getMonth()+1)).slice(-2)}.${e.getFullYear()} ${("0"+e.getHours()).slice(-2)}.${("0"+e.getMinutes()).slice(-2)}`}(),s=document.getElementById("search-form__input"),l="http://ru.wikipedia.org/w/api.php?action=opensearch&origin=*&search="+encodeURI(s.value)+"&profile=strict&limit=5&format=json";$("#wiki-items").empty(),$.ajax({url:l,type:"GET",success:l=>{for(let e=0;e<l[1].length;e++)$("#wiki-items").append($('<h5><a href="'+l[3][e]+'">'+l[1][e]+"</a></h5>")),$("#wiki-items").append($("<p>"+l[2][e]+"</p>"));setTimeout(n,100,l[1]),setTimeout(r,100,l[1]),t=Date.now()-e,function(e,t,i){let n=[];if(null!==localStorage.getItem("queries")){const e=JSON.parse(localStorage.getItem("queries"));$.each(e,(e,t)=>{n.push(t)})}10==n.length&&n.shift(),n.push({query:e,queryTime:t,loadTime:i});const r=JSON.stringify(n);localStorage.setItem("queries",r)}(s.value,i,t)}})}function l(e){$("#wiki-queries tbody").empty(),$.each(e,(e,t)=>{const i='<tr><td class="query">'+t.query+'</td><td class="queryTime">'+t.queryTime+'</td><td class="queryLoadTime">'+t.loadTime+"</td></tr>";$("#wiki-queries tbody").append($(i))})}function o(e){let t="",i="";"byQuery"===e&&(t=document.getElementById("filterQuery"),i=document.getElementsByClassName("query")),"byQueryTime"===e&&(t=document.getElementById("filterQueryTime"),i=document.getElementsByClassName("queryTime")),"byQueryLoadTime"===e&&(t=document.getElementById("filterQueryLoadTime"),i=document.getElementsByClassName("queryLoadTime"));const n=t.value.toUpperCase(),r=document.getElementsByClassName("query"),s=document.getElementsByClassName("queryTime"),l=document.getElementsByClassName("queryLoadTime");$.each(i,(e,t)=>{t.textContent.toUpperCase().indexOf(n)>-1?(r[e].style.display="",s[e].style.display="",l[e].style.display=""):(r[e].style.display="none",s[e].style.display="none",l[e].style.display="none")})}i.r(t);let a=1,u=1,c=1;function y(e){let t=[];const i=document.getElementsByClassName("query"),n=document.getElementsByClassName("queryTime"),r=document.getElementsByClassName("queryLoadTime");$("#wiki-queries tbody tr").each((e,s)=>{t.push({query:i[e].textContent,queryTime:n[e].textContent,loadTime:r[e].textContent})}),"byQuery"==e&&(1!=a?t.reverse():t.sort((e,t)=>e.query.localeCompare(t.query)),a++,u=1,c=1),"byQueryTime"==e&&(1!=u?t.reverse():t.sort((e,t)=>e.queryTime.localeCompare(t.queryTime)),a=1,u++,c=1),"byQueryLoadTime"==e&&(1!=c?t.reverse():t.sort((e,t)=>e.loadTime-t.loadTime),a=1,u=1,c++),l(t);const s=document.getElementById("filterQuery"),y=document.getElementById("filterQueryTime"),m=document.getElementById("filterQueryLoadTime");""!==s.value&&o("byQuery"),""!==y.value&&o("byQueryTime"),""!==m.value&&o("byQueryLoadTime")}const m=document.getElementById("wiki-items"),d=document.getElementById("wiki-queries"),p=document.getElementById("wiki-data"),f=document.getElementById("wiki-statistics");$(document).ready(()=>{let e=document.head,t=document.createElement("link");t.rel="stylesheet","dark"===localStorage.getItem("themeStyle")?t.href="../css/dark.css":t.href="../css/light.css",e.appendChild(t),$("#search-form").submit(e=>{e.preventDefault(),s(),m.style.display="block",d.style.display="none",p.style.display="block",f.style.display="none"}),$("#getOldQueries").on("click",()=>{l(JSON.parse(localStorage.getItem("queries"))),m.style.display="none",d.style.display="block",p.style.display="none",f.style.display="none"}),$("#sortQueries").on("click",()=>{y("byQuery")}),$("#sortQueriesTime").on("click",()=>{y("byQueryTime")}),$("#sortQueriesLoadTime").on("click",()=>{y("byQueryLoadTime")}),$("#filterQuery").on("input",()=>{o("byQuery")}),$("#filterQueryTime").on("input",()=>{o("byQueryTime")}),$("#filterQueryLoadTime").on("input",()=>{o("byQueryLoadTime")}),$("#getStatistics").on("click",()=>{!function(){$("#wiki-statistics").empty();const e=JSON.parse(localStorage.getItem("queries"));$.each(e,(e,t)=>{var i=document.createElement("div");i.style.height=`${t.loadTime}px`,i.textContent=`${t.query} - ${t.loadTime}`,$("#wiki-statistics").append($(i))})}(),m.style.display="none",d.style.display="none",p.style.display="none",f.style.display="flex"}),$("#switchStyle").on("click",()=>{"light"==localStorage.getItem("themeStyle")?(t.href="../css/dark.css",localStorage.setItem("themeStyle","dark")):(t.href="../css/light.css",localStorage.setItem("themeStyle","light"))})})}]);