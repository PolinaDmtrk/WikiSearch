!function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";function n(e){return`${("0"+e.getDate()).slice(-2)}.${("0"+(e.getMonth()+1)).slice(-2)}.${e.getFullYear()} ${("0"+e.getHours()).slice(-2)}:${("0"+e.getMinutes()).slice(-2)}`}function r(e,t){return Math.round(e/t)}function s(e){const t=[],i=[];!function n(r){const s=`https://ru.wikipedia.org/w/api.php?action=query&origin=*&prop=revisions&titles=${e[r]}&format=json`;$.ajax({url:s,type:"GET",success:e=>{if($.each(e.query.pages,(e,n)=>{const r=n.revisions[0].timestamp;t.push(r),i.push({title:n.title,date:r})}),0==r)return function(e,t){const i=e.reduce((e,t)=>e>t?e:t);$.each(e,(e,n)=>{if(t[e].date==i){let i=t[e].date.replace("T"," ");i=i.replace("Z"," "),$("#wiki-data").append($(`<p>Самая свежая статья - "${t[e].title}" была обновлена ${i}</p>`))}});const n=e.reduce((e,t)=>e<t?e:t);$.each(e,(e,i)=>{if(t[e].date==n){let i=t[e].date.replace("T"," ");i=i.replace("Z"," "),$("#wiki-data").append($(`<p>Самая старая статья - "${t[e].title}" была обновлена ${i}</p>`))}})}(t,i),0;n(--r)}})}(e.length-1)}function a(){const e=Date.now(),t=n(new Date),i=document.getElementById("search-form__input");if(""==i.value)return void alert("Необходимо ввести текст в поле поиска!");const a=c(i.value),o="http://ru.wikipedia.org/w/api.php?action=opensearch&origin=*&search="+encodeURI(a)+"&profile=strict&limit=5&format=json";$.ajax({url:o,type:"GET",success:i=>{if(0==i[1].length)return void alert("Не найдено ни одной статьи:(");$("#wiki-items").empty();for(let e=0;e<i[1].length;e++){const t='<h5 class="article-name"><a href="'+i[3][e]+'">'+i[1][e]+'</a></h5><p class="article-description">'+i[2][e]+"</p>";$("#wiki-items").append($(`<div class="article">${t}<div>`))}!function(e){let t=0;$("#wiki-data").empty(),function i(n){const s=`https://ru.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&explaintext=&titles=${e[n]}`;$.ajax({url:s,type:"GET",success:s=>{if($.each(s.query.pages,(e,i)=>{const n=i.extract;t+=n.length}),0==n){const i=r(t,e.length);return $("#wiki-data").append($(`<p>Среднее количество символов по выгруженным статьям - ${i}</p>`)),0}i(--n)}})}(e.length-1)}(i[1]),s(i[1]);const n=Date.now()-e;!function(e,t,i){const n=[];if(null!==localStorage.getItem("queries")){const e=JSON.parse(localStorage.getItem("queries"));$.each(e,(e,t)=>{n.push(t)})}10==n.length&&n.shift(),n.push({query:e,queryTime:t,queryLoadTime:i});const r=JSON.stringify(n);localStorage.setItem("queries",r)}(a,t,n)}})}function c(e){return e.replace(/[^\s-a-zA-ZА-Яа-яЁё]/gi,"")}function o(e){$("#wiki-queries input").each((e,t)=>{t.value=""}),$("#wiki-queries tbody").empty(),$.each(e,(e,t)=>{const i='<tr class="userQuery"><td class="query">'+t.query+'</td><td class="queryTime">'+t.queryTime+'</td><td class="queryLoadTime">'+t.queryLoadTime+"</td></tr>";$("#wiki-queries tbody").append($(i))})}function l(e){const t=e.find(".filter");e.find(".userQuery").each(function(){let e=!0;$(this).find("td").each(function(i){t.eq(i).val()&&-1==$(this).html().toLowerCase().indexOf(t.eq(i).val().toLowerCase())&&(e=e&&!1)}),!0===e?$(this).css("display",""):$(this).css("display","none")})}i.r(t);let u="";const p=$("#wiki");$(document).ready(()=>{const e=document.head,t=document.createElement("link");t.rel="stylesheet",t.href=function(e){return"dark"==localStorage.getItem("themeStyle")?e.href="../css/dark.css":e.href="../css/light.css",e.href}(t),e.appendChild(t),$(".search-form").submit(e=>{e.preventDefault(),a(),$(p[0].children).each((e,t)=>{$(t).css("display","none")}),$("#wiki-items").css("display","block"),$("#wiki-data").css("display","block")}),$("#getOldQueries").on("click",()=>{o(JSON.parse(localStorage.getItem("queries"))),$(p[0].children).each((e,t)=>{$(t).css("display","none")}),$("#wiki-queries").css("display","block")}),$(".sort").on("click",function(){!function(e){const t=[];$("#wiki-queries tbody tr").each((e,i)=>{t[e]={},$("td",i).each((i,n)=>{t[e][n.className]=n.textContent})}),e==u?t.reverse():isNaN(Number(t[0][e]))?t.sort((t,i)=>t[e].localeCompare(i[e])):t.sort((e,t)=>e.queryLoadTime-t.queryLoadTime),u=e,o(t),""!==$("#wiki-queries table").find(".filter").value&&l($("#wiki-queries table"))}($(this)[0].parentElement.className)}),$(".filter").on("input",function(){l($(this).parents("table"))}),$("#getStatistics").on("click",()=>{!function(){$("#wiki-statistics").empty();const e=JSON.parse(localStorage.getItem("queries"));$.each(e,(e,t)=>{const i=document.createElement("div");i.style.height=`${t.queryLoadTime}px`,i.textContent=`${t.query} - ${t.queryLoadTime}`,$("#wiki-statistics").append($(i))})}(),$(p[0].children).each((e,t)=>{$(t).css("display","none")}),$("#wiki-statistics").css("display","flex")}),$("#switchStyle").on("click",()=>{!function(e){"light"==localStorage.getItem("themeStyle")?(e.href="../css/dark.css",localStorage.setItem("themeStyle","dark")):(e.href="../css/light.css",localStorage.setItem("themeStyle","light"))}(t)}),QUnit.test("update string",function(e){e.equal(c("strin#g"),"string"),e.equal(c("!@s#$%tr^&*i&*(n#g)"),"string"),e.equal(c("str-in-g"),"str-in-g"),e.equal(c("str147`ing str-ng"),"string str-ng")}),QUnit.test("update date",function(e){const t=new Date(2011,0,1,12,34,0,0),i=new Date(2013,11,26),r=new Date(1356,0,1,0,7);e.equal(n(t),"01.01.2011 12:34"),e.equal(n(i),"26.12.2013 00:00"),e.equal(n(r),"01.01.1356 00:07")}),QUnit.test("calc average",function(e){e.equal(r(50,5),10),e.equal(r(3945,23),172)})})}]);