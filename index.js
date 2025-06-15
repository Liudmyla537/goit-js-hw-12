import{a as w,S,i}from"./assets/vendor-CrlV4O_2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const v="50757897-a80a694250436cdde2013620b",q="https://pixabay.com/api/",E=15;async function u(e,r){const o={key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:E,page:r};return(await w.get(q,{params:o})).data}const f=document.querySelector(".gallery"),p=document.querySelector(".loader");let R=new S(".gallery a");function m(e){const r=e.map(o=>`
    <li class="gallery-item">
      <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" />
      </a>
      <div class="info">
        <p><b>Likes</b>
        ${o.likes}</p>
        <p><b>Views</b>
        ${o.views}</p>
        <p><b>Comments</b>
        ${o.comments}</p>
        <p><b>Downloads</b>
        ${o.downloads}</p>
      </div>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",r),R.refresh()}function P(){f.innerHTML=""}function h(){p.classList.remove("hidden")}function y(){p.classList.add("hidden")}function g(){const e=document.querySelector(".load-more");e&&e.classList.remove("hidden")}function b(){const e=document.querySelector(".load-more");e&&e.classList.add("hidden")}const L=document.querySelector(".form"),B=L.querySelector('input[name="search-text"]'),M=document.querySelector(".load-more");let a="",s=1,d=0;L.addEventListener("submit",async e=>{if(e.preventDefault(),a=B.value.trim(),s=1,!a){i.warning({message:"Please enter a search query.",position:"topRight"});return}P(),b(),h();try{const{hits:r,totalHits:o}=await u(a,s);if(r.length===0){i.info({message:"Sorry, no images found. Try again!",position:"topRight"});return}m(r),d=Math.ceil(o/15),s<d&&g()}catch(r){i.error({message:"Something went wrong.",position:"topRight"}),console.error(r)}finally{y()}});M.addEventListener("click",async()=>{s++,h(),b();try{const{hits:e}=await u(a,s);m(e),$(),s>=d?i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}):g()}catch(e){i.error({message:"Failed to load more images.",position:"topRight"}),console.error(e)}finally{y()}});function $(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
