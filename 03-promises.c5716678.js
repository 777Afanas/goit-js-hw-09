!function(){var n=document.querySelector(".form"),e={};function t(n,e){return new Promise((function(t,o){var c=Math.random()>.3;setTimeout((function(){c?t("✅ Fulfilled promise ".concat(n," in ").concat(e,"ms")):o("❌ Rejected promise ".concat(n," in ").concat(e,"ms"))}),e)}))}function o(n){console.log(n)}function c(n){console.log(n)}n.addEventListener("input",(function(n){var t=n.target,o=t.name,c=t.value;e[o]=c}));n.addEventListener("submit",(function(a){a.preventDefault();for(var i=0,r=+e.delay;i<e.amount;i+=1,r+=+e.step){t(i+1,r).then(o).catch(c)}n.reset()}))}();
//# sourceMappingURL=03-promises.c5716678.js.map
