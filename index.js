import{a as d,S as f,i as a}from"./assets/vendor-CrlV4O_2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const p="50757897-a80a694250436cdde2013620b",m="https://pixabay.com/api/";async function y(s){const o={key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await d.get(m,{params:o})).data}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),g=new f(".gallery a");function h(s){const o=s.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" data-src="${e.largeImageURL}" alt="${e.tags}" />
      </a>
      <div class="info">
        <p><b>Likes</b>
        ${e.likes}</p>
        <p><b>Views</b>
        ${e.views}</p>
        <p><b>Comments</b>
        ${e.comments}</p>
        <p><b>Downloads</b>
        ${e.downloads}</p>
      </div>
    </li>
  `).join("");c.insertAdjacentHTML("beforeend",o),g.refresh()}function b(){c.innerHTML=""}function L(){l.classList.remove("hidden")}function w(){l.classList.add("hidden")}const u=document.querySelector(".form"),S=u.querySelector('input[name="search-text"]');u.addEventListener("submit",async s=>{s.preventDefault();const o=S.value.trim();if(!o){a.warning({message:"Please enter a search query.",position:"topRight"});return}L(),b();try{const{hits:e}=await y(o);e.length===0?a.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):h(e)}catch(e){a.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(e)}finally{w()}});
//# sourceMappingURL=index.js.map
