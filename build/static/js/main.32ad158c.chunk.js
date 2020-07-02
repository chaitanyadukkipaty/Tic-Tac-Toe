(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{116:function(e,t){},140:function(e,t,a){},145:function(e,t,a){},146:function(e,t,a){},147:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(18),o=a.n(c),l=(a(82),a(28)),s=a(6),i=(a(83),a(5)),u=a.n(i),d=a(21),m=a(10),f=a(8),p=(a(85),{background:"lightblue",border:"2px solid darkblue",fontSize:"30px",fontWeight:"800",cursor:"pointer",outline:"none"}),b=function(e){var t=e.onClick,a=e.value;return r.a.createElement("button",{style:p,onClick:t},a)},y={border:"4px solid darkblue",borderRadius:"10px",width:"250px",height:"250px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gridTemplateRows:"repeat(3, 1fr)"},h=function(e){var t=e.squares,a=e.onClick;return r.a.createElement("div",{style:y},t.map((function(e,t){return r.a.createElement(b,{key:t,value:e,onClick:function(){return a(t)}})})))};var v=a(12),E=(a(86),a(150)),g=a(156),j=a(157),x=a(30),w=a.n(x),O=a(15),N=w()(O.a);var k=a(19),I=a.n(k);function B(e){return C.apply(this,arguments)}function C(){return(C=Object(m.a)(u.a.mark((function e(t){var a,n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,e.next=3,I.a.post("".concat(O.a,"/bid"),a);case 3:return n=e.sent,r=n.data,e.abrupt("return",{data:r});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(e){return P.apply(this,arguments)}function P(){return(P=Object(m.a)(u.a.mark((function e(t){var a,n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,e.next=3,I.a.post("".concat(O.a,"/symbolPlaced"),a);case 3:return n=e.sent,r=n.data,e.abrupt("return",{data:r});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(e){return S.apply(this,arguments)}function S(){return(S=Object(m.a)(u.a.mark((function e(t){var a,n,r,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,e.next=3,I.a.post("".concat(O.a,"/getPlayers"),a);case 3:return n=e.sent,r=n.data,c=r.players,e.abrupt("return",{players:c});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var R=function(e){var t=e.playerId,a=e.roomId,c=Object(n.useRef)(),o=Object(n.useState)(Array(9).fill(null)),l=Object(f.a)(o,2),s=l[0],i=l[1],p=Object(n.useState)(!1),b=Object(f.a)(p,2),y=b[0],x=b[1],w=Object(n.useState)(100),O=Object(f.a)(w,2),k=O[0],I=O[1],C=function(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],a=0;a<t.length;a++){var n=Object(f.a)(t[a],3),r=n[0],c=n[1],o=n[2];if(e[r]&&e[r]===e[c]&&e[r]===e[o])return e[r]}return null}(s),P=Object(n.useState)(""),S=Object(f.a)(P,2),R=S[0],W=S[1],D=Object(n.useState)(!1),A=Object(f.a)(D,2),J=A[0],Y=A[1],F=Object(n.useState)([]),L=Object(f.a)(F,2),q=L[0],U=L[1],$=function(){Y((function(e){return!e}))},z=function(){Y((function(e){return!0}))},G=function(){Y((function(e){return!1}))},H=function(){x((function(e){return!0}))},X=function(e){I(e)},K=function(e){i(e)},Q=function(){var e=Object(m.a)(u.a.mark((function e(n){var r,c,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Object(d.a)(s),!C&&!r[n]){e.next=3;break}return e.abrupt("return");case 3:if(!y){e.next=11;break}return r[n]=R,c={roomId:a,playerId:t,value:n,board:r},e.next=8,M({payload:c});case 8:o=e.sent,o.data.status&&x((function(e){return!1}));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=function(){var e=Object(m.a)(u.a.mark((function e(){var n,r,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=c.current.value,r={roomId:a,playerId:t,value:Number(n),board:s},!(k>=Number(n))){e.next=10;break}return e.next=5,B({payload:r});case 5:o=e.sent,o.data.status&&$(),e.next=11;break;case 10:v.c.error("You don't have enought Points");case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){c.current.addEventListener("keydown",(function(e){13===e.keyCode&&V()})),function(e){var t=e.roomId,a=e.playerId;N.emit("joinRoom",{roomId:t,playerId:a})}({roomId:a,playerId:t}),function(e){var t=e.textInput,a=e.playerId,n=e.disableBid,r=e.toggleBid,c=e.enableTurn,o=(e.enableBid,e.changePts);N.on("gameState",(function(e){var l=e.bid,s=e.bidWinner,i=e.move;console.log(e),"DRAW"===l.status?(n(),v.c.dark("It's a Draw")):"DONE"===l.status&&null===s&&null===i?v.c.dark("Bids are equal"):"DONE"===l.status&&s===a&&i===a?(t.current.value="",c(),v.c.dark("You won the bid, make your move")):"DONE"===l.status&&s!==a&&i!==a&&(t.current.value="",v.c.dark("You Lost the Bid")),0===l[a]&&"DONE"===l.status&&r(),o(e[a])}))}({textInput:c,playerId:t,disableBid:z,toggleBid:$,enableBid:G,enableTurn:H,changePts:X}),function(e){var t=e.myChar,a=e.setChar;N.on("Char",(function(e){""===t&&a(e)}))}({myChar:R,setChar:W}),function(e){var t=e.playerId,a=e.enableTurn,n=e.toggleBid,r=e.changeBoard,c=e.changePts,o=e.textInput;N.on("Reload",(function(e){var l=e.bid,s=e.bidWinner,i=e.move;"DONE"===l.status&&s===t&&i===t&&(a(),v.c.dark("You won the bid, make your move")),0!==l[t]&&(n(),o.current.value=l[t]),Array.isArray(e.board)&&e.board.length&&r(e.board),c(e[t])}))}({playerId:t,enableTurn:H,toggleBid:$,changeBoard:K,changePts:X,textInput:c}),N.on("disconnect",(function(){v.c.error("You have been disconnected, Reload the page")})),function(){var e=Object(m.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={roomId:a},e.next=3,T({payload:t});case 3:n=e.sent,U((function(e){return Object(d.a)(n.players)}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),Object(n.useEffect)((function(){!function(e){var t=e.winner,a=(e.playerId,e.board),n=(e.myChar,e.changeBoard);N.on("Move",(function(e){var r=Object(d.a)(a),c=e.game;e.bidWinner;t||r[c]||n(Object(d.a)(e.board))}))}({winner:C,playerId:t,board:s,myChar:R,changeBoard:K})}),[R,s]),r.a.createElement(r.a.Fragment,null,y&&r.a.createElement("div",{className:"font d-flex  justify-content-center p-4"},"Place your Move"),r.a.createElement(h,{squares:s,onClick:Q}),r.a.createElement("div",{className:"font d-flex  justify-content-center p-4"},"Points left: "+k),r.a.createElement("div",{className:"d-flex  justify-content-center p-4"},r.a.createElement(E.a,{className:"mb-3 input"},r.a.createElement(E.a.Prepend,null,r.a.createElement(E.a.Text,{id:"basic-addon1"},"$")),r.a.createElement(g.a,{ref:c,type:"number",placeholder:"Bid","aria-label":"Bid","aria-describedby":"basic-addon1"}))),r.a.createElement("div",{className:"d-flex  justify-content-center p-4"},r.a.createElement(j.a,{className:"button ",onClick:V,disabled:J||y},"Bid")),r.a.createElement("div",{className:"font"},J&&"Waiting for Other Player to Bid"),r.a.createElement("div",{className:"font"},C&&"Winner: "+(C===q[0].Character?q[0].playerId:q[1].playerId)))},W=(a(140),a(41));var D=function(e){var t=e.playerId,a=e.roomId,c=Object(n.useRef)(),o=Object(n.useState)([]),l=Object(f.a)(o,2),s=l[0],i=l[1],u=function(){var e=c.current.value;!function(e){var t=e.playerId,a=e.Msg,n=e.roomId;N.emit("sendMsg",{playerId:t,Msg:a,roomId:n})}({playerId:t,Msg:e,roomId:a}),c.current.value=""};return Object(n.useEffect)((function(){c.current.addEventListener("keydown",(function(e){13===e.keyCode&&u()})),function(e){var t=e.playerId,a=e.setMsgs,n=e.isMobile;N.on("recieveMsg",(function(e){var r=e.senderId,c=e.system,o=e.Msg,l=r===t?"Me: ".concat(o):"".concat(r,": ").concat(o);console.log(l),a((function(e){return[].concat(Object(d.a)(e),[{system:c,Msg:l}])})),n&&c&&r!==t&&v.c.dark(o)}))}({playerId:t,setMsgs:i,isMobile:W.isMobile})}),[]),r.a.createElement("div",{className:"chat-room"},r.a.createElement("ul",{className:"pages"},r.a.createElement("li",{className:"chat page"},r.a.createElement("div",{className:"chatArea"},r.a.createElement("ul",{className:"messages"},s.map((function(e,t){var a=e.system,n=e.Msg;return a?r.a.createElement("li",{className:"system-msg",key:t},n):r.a.createElement("li",{key:t},n)})))),r.a.createElement("input",{ref:c,className:"inputMessage",placeholder:"Type here..."}))))},A=a(151),J=a(152);var Y=function(){var e=Object(s.f)().pathname.split("/"),t=e.pop(),a=e.pop();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"root"},r.a.createElement(v.a,{autoClose:5e3,transition:v.b,limit:3,hideProgressBar:!0,newestOnTop:!0}),r.a.createElement(A.a,{style:{minHeight:"100vh"},className:"fill-width "},r.a.createElement(J.a,{className:"d-flex flex-column justify-content-center align-items-center "},r.a.createElement(R,{playerId:t,roomId:a})),r.a.createElement(J.a,{className:"fill-width chat-room chat-visible"},r.a.createElement(D,{playerId:t,roomId:a})))))},F=(a(144),a(145),a(153)),L=a(154),q=a(155);var U=function(){function e(){return(e=Object(m.a)(u.a.mark((function e(){var t,a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.a.post(O.a);case 2:t=e.sent,a=t.data,n="/waitingroom/".concat(a.room),console.log(n),window.location.href=n;case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"home-container"},r.a.createElement(F.a,{fluid:!0},r.a.createElement(L.a,{className:"nav-color",expand:"lg",variant:"dark"},r.a.createElement(L.a.Brand,null,"Big-Bad-Joe")),r.a.createElement(J.a,{md:{span:6,offset:3},className:"d-flex flex-column justify-content-around fill "},r.a.createElement("div",{className:"p-2"},r.a.createElement(q.a,{className:"card"},r.a.createElement(q.a.Title,{className:"card-title"},"Rules"),r.a.createElement(q.a.Body,{className:"text-justify"},r.a.createElement("ul",null,r.a.createElement("li",null,"Unlike Regular Tic Tac Toe 'X' doesnt always start first."),r.a.createElement("li",null,"Each player begins with 100 points. Players can use these points to place bids"),r.a.createElement("li",null,"Turns are decided by the bids placed by the players. The Player with bigger bid wins round and can freely place his/her move"),r.a.createElement("li",null,"If both players reach 0 points before winning then the game is considered a draw"),r.a.createElement("li",null,"If both players bid the same points then its considered draw and they have to bid again"))))),r.a.createElement("div",{className:" d-flex  justify-content-center p-2 "},r.a.createElement(j.a,{className:"button",onClick:function(){return function(){return e.apply(this,arguments)}()}},"Start"))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(146);var $=a(74),z=a.n($),G=w()(O.a);var H=function(){var e=Object(n.useRef)(),t=Object(n.useState)([]),a=Object(f.a)(t,2),c=a[0],o=a[1],l=Object(s.f)().pathname.split("/").pop(),i=Object(n.useState)(!1),d=Object(f.a)(i,2),p=d[0],b=d[1],y=Object(n.useState)(!0),h=Object(f.a)(y,2),v=h[0],x=h[1];function w(){return N.apply(this,arguments)}function N(){return(N=Object(m.a)(u.a.mark((function t(){var a,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=e.current.value,n={roomId:l,playerId:a},G.emit("joinRoom",n);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function k(){return(k=Object(m.a)(u.a.mark((function t(){var a,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=e.current.value,n="/room/".concat(l,"/").concat(a),console.log(n),window.location.href=n;case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}Object(n.useEffect)((function(){function t(){return(t=Object(m.a)(u.a.mark((function e(){var t,a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={roomId:l},e.next=3,I.a.post("".concat(O.a,"/getPlayers"),t);case 3:a=e.sent,n=a.data,o((function(e){return n.players})),2===n.length&&(x((function(e){return!e})),b((function(e){return!e})));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e.current.addEventListener("keydown",(function(e){13===e.keyCode&&w()})),G.on("joined",(function(e){o(e),2===e.length&&(x((function(e){return!e})),b((function(e){return!e})))})),function(){t.apply(this,arguments)}()}),[]);var B=function(e){var t=e.username;return r.a.createElement(q.a,{className:"player-card"},r.a.createElement(q.a.Img,{variant:"top",src:z.a}),r.a.createElement(q.a.Body,null,r.a.createElement(q.a.Title,null,t)))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"root"},r.a.createElement(A.a,{className:"fill-width"},r.a.createElement(J.a,{md:6,className:"d-flex flex-column justify-content-between fill-height"},0===c.length&&r.a.createElement("div",{className:"font text-center"},"Waiting for players to join:"," "),c.length>0&&r.a.createElement("div",{className:"font text-center"},"Players in the Game : "),r.a.createElement(A.a,{className:" d-flex  justify-content-center p-4 "},c.map((function(e,t){return r.a.createElement(J.a,{md:5,xs:6,className:"p-2"},r.a.createElement(B,{key:t,username:e.playerId}))})))),r.a.createElement(J.a,{className:"p-4 d-flex flex-column justify-content-center",md:6},r.a.createElement("div",{className:"d-flex  justify-content-center p-4"},r.a.createElement(E.a,{className:" input"},r.a.createElement(E.a.Prepend,null,r.a.createElement(E.a.Text,{id:"basic-addon1"},"@")),r.a.createElement(g.a,{ref:e,placeholder:"Username","aria-label":"Username","aria-describedby":"basic-addon1"}))),r.a.createElement(A.a,null,p?r.a.createElement(J.a,{className:" d-flex  justify-content-center p-4 "},r.a.createElement(j.a,{className:"button",onClick:function(){return function(){return k.apply(this,arguments)}()},disabled:v},"Start")):r.a.createElement(J.a,{className:" d-flex  justify-content-center p-4 "},r.a.createElement(j.a,{className:"button",onClick:function(){return w()},disabled:p},"Join")))))))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(l.a,null,r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/"},r.a.createElement(U,null)),r.a.createElement(s.a,{path:"/room"},r.a.createElement(Y,null)),r.a.createElement(s.a,{path:"/waitingroom"},r.a.createElement(H,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},15:function(e){e.exports=JSON.parse('{"a":"http://192.168.0.106:8000"}')},74:function(e,t,a){e.exports=a.p+"static/media/avatar.3f28b642.png"},77:function(e,t,a){e.exports=a(147)},82:function(e,t,a){},83:function(e,t,a){},85:function(e,t,a){}},[[77,1,2]]]);
//# sourceMappingURL=main.32ad158c.chunk.js.map