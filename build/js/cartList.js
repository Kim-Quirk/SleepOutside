var d=(n,e,t)=>new Promise((i,r)=>{var a=c=>{try{o(t.next(c))}catch(s){r(s)}},l=c=>{try{o(t.throw(c))}catch(s){r(s)}},o=c=>c.done?i(c.value):Promise.resolve(c.value).then(a,l);o((t=t.apply(n,e)).next())});import{renderListWithTemplate as y,getLocalStorage as m,setLocalStorage as g,checkBackpack as h,animateBackpack as v,alertMessage as S}from"./utils.js";function q(n){S(`Removed ${n.Name}(s) from cart`),v();var e=m("so-cart"),t=document.getElementById("remove"),i=t.getAttribute("data-id"),r=e,a=e.find(o=>o.Id===i);r=e.filter(o=>o!==a),g("so-cart",r);const l=new u("so-cart",document.querySelector(".product-list"));l.init()}export default class u{constructor(e,t){this.key=e,this.listElement=t}init(){return d(this,null,function*(){const e=m(this.key);if(this.renderList(e),e.length===0){document.querySelector(".product-list").innerHTML="<li> Your cart is empty</li>";var t=document.getElementById("cart-footer");t.classList.add("hide")}else this.getTotal(e)})}prepareTemplate(e,t){return e.querySelector("img").src=t.Images.PrimaryMedium,e.querySelector("img").alt+=t.Name,e.querySelector(".cart-card__quantity").textContent+=t.Quantity,e.querySelector(".card__name").textContent=t.Name,e.querySelector(".cart-card__color").textContent=t.Colors[0].ColorName,e.querySelector(".cart-card__price").textContent+=t.FinalPrice,e.querySelector("#remove").setAttribute("data-id",t.Id),e.querySelector(".cart-card__trash").addEventListener("click",()=>{q(t)}),e}renderList(e){this.listElement.innerHTML="";const t=document.getElementById("cart-card-template");y(t,this.listElement,e,this.prepareTemplate)}getTotal(e){var t=0;for(let a=0;a<e.length;a++)t+=Number(e[a].FinalPrice);var i=document.getElementById("cart-footer");i.classList.toggle("hide");var r=document.querySelector(".cart-total");r.innerHTML=`Total: $${t}`}}h();