(this["webpackJsonpserum-nft-gui"]=this["webpackJsonpserum-nft-gui"]||[]).push([[6],{612:function(e,t,a){e.exports=a.p+"static/media/not-found.0e117165.gif"},617:function(e,t,a){"use strict";a.r(t);var n=a(12),r=a(0),l=a.n(r),u=a(597),o=a(107),c=a(65),i=a(74),d=a(269),s=a(125),f=a(203),m=a(612),E=a.n(m),h=u.a.Title,g=function(e){var t=e.start,a=e.end,n=e.NFT_ARRAY;return l.a.createElement(o.a,{align:"middle",justify:"center"},l.a.createElement(c.a,{flex:"auto"}),null===n||void 0===n?void 0:n.slice(t,a).map((function(e,t){return l.a.createElement(d.a,null,l.a.createElement(f.d,{key:t,nft:e}))})),l.a.createElement(c.a,{flex:"auto"}))},v=function(e){var t=e.divider,a=e.longueur,n=e.NFT_ARRAY,r=Math.floor(a/t),u=a%t,o=Array.from({length:r},(function(e,t){return t}));return 0===r?l.a.createElement(g,{start:0,end:u,NFT_ARRAY:n}):l.a.createElement(l.a.Fragment,null,o.map((function(e){return l.a.createElement(g,{start:t*e,end:t*e+t,NFT_ARRAY:n})})),l.a.createElement(g,{start:a-u,end:a,NFT_ARRAY:n}))};t.default=function(e){var t=e.match,a=Object(s.a)(),u=Object(r.useState)(null),m=Object(n.a)(u,2),g=m[0],p=m[1],A=Object(r.useState)(null),w=Object(n.a)(A,2),R=w[0],b=w[1],j=Object(r.useState)(!1),F=Object(n.a)(j,2),y=F[0],O=F[1];Object(r.useEffect)((function(){var e=[];null===R||void 0===R||R.forEach((function(t){i.a.forEach((function(a){(function(e,t){for(var a=0;a<e.keywords.length;a++)if(e.keywords[a].includes(t)||e.marketAddress.toBase58().toLowerCase().includes(t.toLowerCase())||e.mintAddress.toBase58().toLowerCase().includes(t.toLowerCase()))return!0;return!1})(a,t.toLowerCase())&&e.push(a)}))})),p(e)}),[R]),l.a.useEffect((function(){b(null===t||void 0===t?void 0:t.params.searchParameters.split("&").map((function(e){return e.toLowerCase()})))}),[t]);var T=[R,null===R||void 0===R?void 0:R.length,g,null===g||void 0===g?void 0:g.length];Object(r.useEffect)((function(){R&&g&&O(R.length>0&&0===g.length)}),[R,g,T]);var N=g?g.length:0;return l.a.createElement(l.a.Fragment,null,y&&l.a.createElement(o.a,{style:{paddingTop:"50px"}},l.a.createElement(c.a,{flex:"auto"}),l.a.createElement(c.a,null,l.a.createElement(h,{level:2,style:{color:"white"}},"Nothing found"),l.a.createElement("img",{src:E.a,width:"100%",alt:"not found"})),l.a.createElement(c.a,{flex:"auto"})),a.width>1600&&l.a.createElement(v,{divider:3,longueur:N,NFT_ARRAY:g}),1100<a.width&&a.width<1600&&l.a.createElement(v,{divider:2,longueur:N,NFT_ARRAY:g}),a.width<1100&&l.a.createElement(l.a.Fragment,null,null===g||void 0===g?void 0:g.map((function(e,t){return l.a.createElement(d.a,{style:{paddingRight:"10%",paddingLeft:"10%"}},l.a.createElement(f.d,{key:t,nft:e}))}))))}}}]);
//# sourceMappingURL=6.fd10b0dd.chunk.js.map