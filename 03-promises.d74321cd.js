const e=document.querySelector(".form"),t={};function n(e,t){return new Promise(((n,o)=>{const s=Math.random()>.3;setTimeout((()=>{s?n(`✅ Fulfilled promise ${e} in ${t}ms`):o(`❌ Rejected promise ${e} in ${t}ms`)}),t)}))}function o(e){console.log(e)}function s(e){console.log(e)}e.addEventListener("input",(e=>{const{name:n,value:o}=e.target;t[n]=o}));e.addEventListener("submit",(r=>{r.preventDefault();for(let e=0,r=+t.delay;e<t.amount;e+=1,r+=+t.step){n(e+1,r).then(o).catch(s)}e.reset()}));
//# sourceMappingURL=03-promises.d74321cd.js.map