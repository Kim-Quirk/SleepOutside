var c=(i,e,t)=>new Promise((o,r)=>{var u=s=>{try{l(t.next(s))}catch(a){r(a)}},m=s=>{try{l(t.throw(s))}catch(a){r(a)}},l=s=>s.done?o(s.value):Promise.resolve(s.value).then(u,m);l((t=t.apply(i,e)).next())});import{getLocalStorage as n,setLocalStorage as h,checkBackpack as p,formDataToJSON as d,removeAllAlerts as g,alertMessage as T}from"./utils.js";import S from"./externalServices.js";const x=new S;function y(i){const e=i.map(t=>(console.log(t),{id:t.Id,price:t.FinalPrice,name:t.Name,quantity:t.Quantity}));return e}export default class f{constructor(e,t){this.key=e,this.outputSelector=t,this.list=[],this.itemTotal=0,this.shipping=0,this.tax=0,this.orderTotal=0,this.numItems=0}init(){this.list=n(this.key),this.calculateItemSummary(),this.calculateOrdertotal()}calculateItemSummary(){var e=n("so-cart");e===null&&(h("so-cart",[]),e=[],console.log("I see it null"));for(let t=0;t<e.length;t++)this.numItems+=Number(e[t].Quantity),this.itemTotal+=Number(e[t].FinalPrice)}calculateOrdertotal(){this.tax=this.itemTotal*.06;for(let e=0;e<this.numItems;e++)e==0?this.shipping=10:this.shipping+=2;this.orderTotal=this.itemTotal+this.tax+this.shipping,this.orderTotal=this.orderTotal.toFixed(2),console.log(this.orderTotal,this.itemTotal,this.tax,this.shipping),this.displayOrderTotals()}displayOrderTotals(){document.querySelector(this.outputSelector+" #subtotal").innerText=`$${this.itemTotal}`,document.querySelector(this.outputSelector+" #shipping").innerText=`$${this.shipping}`,document.querySelector(this.outputSelector+" #tax").innerText=`$${this.tax}`,document.querySelector(this.outputSelector+" #shipping").innerText=`$${this.shipping}`,document.querySelector(this.outputSelector+" #tax").innerText=`$${this.tax}`,document.querySelector(this.outputSelector+" #orderTotal").innerText=`$${this.orderTotal}`,document.querySelector(this.outputSelector+" #numItems").innerText=`(${this.numItems})`}checkout(){return c(this,null,function*(){const e=document.forms.checkout;console.log("Checkout?");const t=d(e);t.orderDate=new Date,t.orderTotal=this.orderTotal,t.tax=this.tax,t.shipping=this.shipping,t.items=y(this.list),console.log(t);try{const o=yield x.checkout(t);console.log(o),h("so-cart",[]),location.assign("/checkout/checkedout.html")}catch(o){g();for(let r in o.message)T(o.message[r]);console.log(o)}})}}p();
