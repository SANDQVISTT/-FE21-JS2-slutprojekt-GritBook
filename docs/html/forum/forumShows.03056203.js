var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},s={},n=e.parcelRequireaec7;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in s){var n=s[e];delete s[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){s[e]=t},e.parcelRequireaec7=n);var o=n("8tedJ"),r=n("7McF0"),i=n("9Mg9r");class a{constructor(e,t,s,n){this.id=e,this.userName=t,this.message=s,this.timeStamp=n,this.displayMsg()}displayMsg(){const e=document.getElementById("messagesShows"),t=document.createElement("div");e.append(t),t.classList.add(this.id,"chat-styling");const s=document.createElement("h4");s.innerText=this.timeStamp+`${this.userName} says ${this.message}`,t.append(s);const n=document.createElement("button");n.innerText="X",this.userName==sessionStorage.getItem("user")&&t.append(n),n.addEventListener("click",(()=>{if(sessionStorage.getItem("user")==sessionStorage.getItem("user")){const e=o.ref(r.db,"/Topics/Shows/"+this.id);o.remove(e)}}))}clearDOM(){document.querySelector(`.${this.id}`).remove()}}const c=o.ref(r.db,"/Topics/Shows/");let l=[];o.onValue(c,(e=>{const t=e.val();for(const e of l)e.clearDOM();l=[];for(const e in t)l.push(new a(e,t[e].name,t[e].message,t[e].timeStamp));!function(){const e=document.getElementById("messagesShows");e.scrollTop=e.scrollHeight}(),t&&function(){const e=Object.values(t),s=Object.keys(t)[0];for(let t=0;t<e.length;t++)if(e.length>25){const e=o.ref(r.db,"/Topics/Shows/"+s);o.remove(e)}}()})),document.getElementById("send").addEventListener("click",(e=>{e.preventDefault();document.getElementById("userName");const t=document.getElementById("userMessage"),s=new Date,n={timeStamp:s.getFullYear()+" "+(s.getMonth()+1)+"/"+s.getUTCDate()+" - "+s.getHours()+":"+s.getMinutes()+": ",name:sessionStorage.getItem("user"),message:t.value},r={};r[o.push(c).key]=n,o.update(c,r)})),i.logOut();
//# sourceMappingURL=forumShows.03056203.js.map