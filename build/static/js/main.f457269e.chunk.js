(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{114:function(e,t){},142:function(e,t,a){},143:function(e,t,a){},144:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(18),l=a.n(c),o=(a(81),a(27)),s=a(5),i=(a(82),a(7)),u=a.n(i),m=a(31),d=a(15),f=a(8),p=(a(84),{background:"lightblue",border:"2px solid darkblue",fontSize:"30px",fontWeight:"800",cursor:"pointer",outline:"none"}),b=function(e){var t=e.onClick,a=e.value;return r.a.createElement("button",{style:p,onClick:t},a)},E={border:"4px solid darkblue",borderRadius:"10px",width:"250px",height:"250px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gridTemplateRows:"repeat(3, 1fr)"},h=function(e){var t=e.squares,a=e.onClick;return r.a.createElement("div",{style:E},t.map((function(e,t){return r.a.createElement(b,{key:t,value:e,onClick:function(){return a(t)}})})))};var v=a(29),y=a.n(v),g=a(20),j=a.n(g),N=a(14),O=(a(133),a(16)),x=a(147),w=a(148),k=a(149),T=a(153),S=a(154),I=y()(O.a);var C=function(){var e=Object(n.useRef)(),t=Object(n.useRef)(),a=Object(n.useState)([]),c=Object(f.a)(a,2),l=c[0],o=c[1],i=Object(n.useState)(""),p=Object(f.a)(i,2),b=(p[0],p[1],Object(s.f)().pathname.split("/")),E=b.pop(),v=b.pop(),y=Object(n.useState)(Array(9).fill(null)),g=Object(f.a)(y,2),C=g[0],B=g[1],R=Object(n.useState)(!1),P=Object(f.a)(R,2),W=P[0],M=P[1],D=Object(n.useState)(),A=Object(f.a)(D,2),F=(A[0],A[1],Object(n.useState)(100)),J=Object(f.a)(F,2),L=J[0],Y=J[1],q=function(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],a=0;a<t.length;a++){var n=Object(f.a)(t[a],3),r=n[0],c=n[1],l=n[2];if(e[r]&&e[r]===e[c]&&e[r]===e[l])return e[r]}return null}(C),U=Object(n.useState)(""),X=Object(f.a)(U,2),$=X[0],z=X[1],G=Object(n.useState)(!1),H=Object(f.a)(G,2),K=H[0],Q=H[1],V=function(){var e=Object(d.a)(u.a.mark((function e(t){var a,n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=Object(m.a)(C),!q&&!a[t]){e.next=3;break}return e.abrupt("return");case 3:if(!W){e.next=11;break}return a[t]=$,n={roomId:v,playerId:E,value:t,board:a},e.next=8,j.a.post("".concat(O.a,"/symbolPlaced"),n);case 8:r=e.sent,r.data.status&&M(!1);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=function(){var t=Object(d.a)(u.a.mark((function t(){var a,n,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.current.value,n={roomId:v,playerId:E,value:Number(a),board:C},!(L>=Number(a))){t.next=10;break}return t.next=5,j.a.post("".concat(O.a,"/bid"),n);case 5:r=t.sent,r.data.status&&Q((function(e){return!e})),t.next=11;break;case 10:N.c.error("You don't have enought Points");case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(n.useEffect)((function(){e.current.addEventListener("keydown",(function(e){13===e.keyCode&&Z()})),t.current.addEventListener("keydown",(function(e){13===e.keyCode&&function(){var e="".concat(E,": ").concat(t.current.value);I.emit("sendMsg",{Msg:e,roomId:v}),t.current.value=""}()})),I.emit("joinRoom",{roomId:v,playerId:E}),I.on("gameState",(function(t){var a=t.bid,n=t.bidWinner,r=t.move;"DRAW"===a.status?(Q((function(e){return!0})),N.c.dark("It's a Draw")):"DONE"===a.status&&null===n&&null===r?N.c.dark("Bids are equal"):"DONE"===a.status&&n===E&&r===E?(e.current.value="",M(!0),N.c.dark("Your Turn")):"DONE"===a.status&&n!==E&&r!==E&&(e.current.value="",N.c.dark("You Lost the Bid")),0===a[E]&&"DONE"===a.status&&Q((function(e){return!e})),Y(t[E])})),I.on("Char",(function(e){""===$&&z(e)})),I.on("Reload",(function(t){var a=t.bid,n=t.bidWinner,r=t.move;"DONE"===a.status&&n===E&&r===E&&(M(!0),N.c.dark("Your Turn")),0!==a[E]&&(Q((function(e){return!e})),e.current.value=a[E]),Array.isArray(t.board)&&t.board.length&&B(t.board),Y(t[E])})),I.on("recieveMsg",(function(e){var t=e.system,a=e.Msg;o((function(e){return[].concat(Object(m.a)(e),[{system:t,Msg:a}])}))}))}),[]),Object(n.useEffect)((function(){I.on("Move",(function(e){var t=Object(m.a)(C),a=e.game,n=e.bidWinner;if(!q&&!t[a]){var r="X"===$?"O":"X";t[a]=n===E?$:r,B(t)}}))}),[$,C]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"root"},r.a.createElement(x.a,{style:{minHeight:"100vh"},className:"fill-width "},r.a.createElement(w.a,{className:"d-flex flex-column justify-content-center align-items-center "},r.a.createElement(h,{squares:C,onClick:V}),r.a.createElement("div",{className:"font d-flex  justify-content-center p-4"},"Points left: "+L),r.a.createElement("div",{className:"d-flex  justify-content-center p-4"},r.a.createElement(k.a,{className:"mb-3 input"},r.a.createElement(k.a.Prepend,null,r.a.createElement(k.a.Text,{id:"basic-addon1"},"$")),r.a.createElement(T.a,{ref:e,placeholder:"Bid","aria-label":"Bid","aria-describedby":"basic-addon1"}))),r.a.createElement("div",{className:"d-flex  justify-content-center p-4"},r.a.createElement(S.a,{className:"button ",onClick:Z,disabled:K},"Bid")),r.a.createElement("div",{className:"font"},K&&"Waiting for Other Player to Bid"),r.a.createElement("div",{className:"font"},q&&"Winner: "+q)),r.a.createElement(w.a,{className:"fill-width chat-room chat-visible "},r.a.createElement("ul",{className:"pages"},r.a.createElement("li",{className:"chat page"},r.a.createElement("div",{className:"chatArea"},r.a.createElement("ul",{className:"messages"},l.map((function(e,t){var a=e.system,n=e.Msg;return a?r.a.createElement("li",{className:"system-msg",key:t},n):r.a.createElement("li",{key:t},n)})))),r.a.createElement("input",{ref:t,className:"inputMessage",placeholder:"Type here..."})))))))};var B=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,{autoClose:5e3,transition:N.b,limit:3,newestOnTop:!0}),r.a.createElement(C,null))},R=(a(141),a(142),a(150)),P=a(151),W=a(152);var M=function(){function e(){return(e=Object(d.a)(u.a.mark((function e(){var t,a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.post(O.a);case 2:t=e.sent,a=t.data,n="/waitingroom/".concat(a.room),console.log(n),window.location.href=n;case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"home-container"},r.a.createElement(R.a,{fluid:!0},r.a.createElement(P.a,{className:"nav-color",expand:"lg",variant:"dark"},r.a.createElement(P.a.Brand,null,"Tic-Tac-Toe")),r.a.createElement(w.a,{md:{span:6,offset:3},className:"d-flex flex-column justify-content-around fill "},r.a.createElement("div",{className:"p-2"},r.a.createElement(W.a,{className:"card"},r.a.createElement(W.a.Title,{className:"card-title"},"Rules"),r.a.createElement(W.a.Body,{className:"text-justify"},r.a.createElement("ul",null,r.a.createElement("li",null,"Unlike Regular Tic Tac Toe 'X' doesnt always start first."),r.a.createElement("li",null,"Each player begins with 100 points. Players can use these points to place bids"),r.a.createElement("li",null,"Turns are decided by the bids placed by the players. The Player with bigger bid wins round and can freely place his/her move"),r.a.createElement("li",null,"If both players reach 0 points before winning then the game is considered a draw"),r.a.createElement("li",null,"If both players bid the same points then its considered draw and they have to bid again"))))),r.a.createElement("div",{className:" d-flex  justify-content-center p-2 "},r.a.createElement(S.a,{className:"button",onClick:function(){return function(){return e.apply(this,arguments)}()}},"Start"))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(143);var D=a(73),A=a.n(D),F=y()(O.a);var J=function(){var e=Object(n.useRef)(),t=Object(n.useState)([]),a=Object(f.a)(t,2),c=a[0],l=a[1],o=Object(s.f)().pathname.split("/").pop(),i=Object(n.useState)(!1),m=Object(f.a)(i,2),p=m[0],b=m[1],E=Object(n.useState)(!0),h=Object(f.a)(E,2),v=h[0],y=h[1];function g(){return N.apply(this,arguments)}function N(){return(N=Object(d.a)(u.a.mark((function t(){var a,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=e.current.value,n={roomId:o,playerId:a},F.emit("joinRoom",n);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function I(){return(I=Object(d.a)(u.a.mark((function t(){var a,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=e.current.value,n="/room/".concat(o,"/").concat(a),console.log(n),window.location.href=n;case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}Object(n.useEffect)((function(){function t(){return(t=Object(d.a)(u.a.mark((function e(){var t,a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={roomId:o},e.next=3,j.a.post("".concat(O.a,"/getPlayers"),t);case 3:a=e.sent,n=a.data,l((function(e){return n})),2===n.length&&(y((function(e){return!e})),b((function(e){return!e})));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e.current.addEventListener("keydown",(function(e){13===e.keyCode&&g()})),F.on("joined",(function(e){l(e),2===e.length&&(y((function(e){return!e})),b((function(e){return!e})))})),function(){t.apply(this,arguments)}()}),[]);var C=function(e){var t=e.username;return r.a.createElement(W.a,{className:"player-card"},r.a.createElement(W.a.Img,{variant:"top",src:A.a}),r.a.createElement(W.a.Body,null,r.a.createElement(W.a.Title,null,t)))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"root"},r.a.createElement(x.a,{className:"fill-width"},r.a.createElement(w.a,{md:6,className:"d-flex flex-column justify-content-between fill-height"},0===c.length&&r.a.createElement("div",{className:"font text-center"},"Waiting for players to join:"," "),c.length>0&&r.a.createElement("div",{className:"font text-center"},"Players in the Game : "),r.a.createElement(x.a,{className:" d-flex  justify-content-center p-4 "},c.map((function(e,t){return r.a.createElement(w.a,{md:5,xs:6,className:"p-2"},r.a.createElement(C,{key:t,username:e.playerId}))})))),r.a.createElement(w.a,{className:"p-4 d-flex flex-column justify-content-center",md:6},r.a.createElement("div",{className:"d-flex  justify-content-center p-4"},r.a.createElement(k.a,{className:" input"},r.a.createElement(k.a.Prepend,null,r.a.createElement(k.a.Text,{id:"basic-addon1"},"@")),r.a.createElement(T.a,{ref:e,placeholder:"Username","aria-label":"Username","aria-describedby":"basic-addon1"}))),r.a.createElement(x.a,null,p?r.a.createElement(w.a,{className:" d-flex  justify-content-center p-4 "},r.a.createElement(S.a,{className:"button",onClick:function(){return function(){return I.apply(this,arguments)}()},disabled:v},"Start")):r.a.createElement(w.a,{className:" d-flex  justify-content-center p-4 "},r.a.createElement(S.a,{className:"button",onClick:function(){return g()},disabled:p},"Join")))))))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(o.a,null,r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/"},r.a.createElement(M,null)),r.a.createElement(s.a,{path:"/room"},r.a.createElement(B,null)),r.a.createElement(s.a,{path:"/waitingroom"},r.a.createElement(J,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},16:function(e){e.exports=JSON.parse('{"a":"http://159.65.145.166:8000"}')},73:function(e,t,a){e.exports=a.p+"static/media/avatar.3f28b642.png"},76:function(e,t,a){e.exports=a(144)},81:function(e,t,a){},82:function(e,t,a){},84:function(e,t,a){}},[[76,1,2]]]);
//# sourceMappingURL=main.f457269e.chunk.js.map