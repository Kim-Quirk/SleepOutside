var p=(l,s,t)=>new Promise((i,c)=>{var y=e=>{try{u(t.next(e))}catch(n){c(n)}},f=e=>{try{u(t.throw(e))}catch(n){c(n)}},u=e=>e.done?i(e.value):Promise.resolve(e.value).then(y,f);u((t=t.apply(l,s)).next())});import{setLocalStorage as g,getLocalStorage as m,loadHeaderFooter as _,checkBackpack as r,adjustQuantity as h,animateBackpack as o,alertMessage as a,removeAllAlerts as d}from"./utils.js";_();let L=[],v=0;export default class B{constructor(s,t){this.productId=s,this.product={},this.dataSource=t,this.cart=L,this.discount=30}init(){return p(this,null,function*(){this.product=yield this.dataSource.findProductById(this.productId),this.product.FinalPrice*=1-this.discount/100,this.product.FinalPrice=this.product.FinalPrice.toFixed(2),document.querySelector("main").innerHTML=this.renderProductDetails(),this.cart=m("so-cart");var s;this.setupButtons(!1),document.addEventListener("load",()=>{s=document.querySelector(".cart"),s.classList.add("test"),document.querySelector(".count").innerText=1}),document.getElementById("negative").addEventListener("click",()=>{this.product.Quantity==0&&(d(),a("You can not have negative products. Email us for return information.")),this.product.Quantity==1?(this.setupButtons(!1),this.cart=h(this.cart,this.product,"-1"),r(),o(),d(),a("The last of this item has been removed from this cart.")):(this.cart=h(this.cart,this.product,"-1"),r(),o(),d(),a("Adjusted quantity and removed one of this item from your cart."))}),document.getElementById("positive").addEventListener("click",()=>{this.cart=h(this.cart,this.product,"1"),r(),o(),d(),a("Adjusted quantity and added one of this item from your cart.")}),document.getElementById("addToCart").addEventListener("click",()=>{this.addToCart()});var t=this.product.Category[0].toUpperCase()+this.product.Category.slice(1),i=document.getElementById("location");i.innerHTML=`${t}`})}setupButtons(s){var t=document.querySelector(".product-detail__add"),i=document.querySelector("#adjustQty");s===!1&&(i.classList.add("hide"),i.classList.remove("display-adjust"),t.classList.remove("hide")),s===!0&&(i.classList.remove("hide"),i.classList.add("display-adjust"),t.classList.add("hide"))}addToCart(){if(d(),a("Item added to cart!"),this.cart=m("so-cart"),o(),this.cart!=null){var s=this.cart.find(c=>this.product.Id==c.Id);if(s){var t=Number(s.Quantity);t+=1,this.product.Quantity=t.toString();var i=this.cart.indexOf(s);i!==-1&&(this.cart[i]=this.product)}else this.product.Quantity="1",this.cart.push(this.product)}else this.product.Quantity="1",this.cart=[this.product];v=this.cart.length,document.querySelector(".count").innerText=v,g("so-cart",this.cart),r(),this.setupButtons(!0)}renderProductDetails(){return`<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryExtraLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__discount"><span class="discount-highlight">$<span class="original-price">${this.product.ListPrice}</span> (${this.discount}% off)</span></p>
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div>
    <div class="product-detail__adjust_button" id="adjustQty">
    <button class="product-detail__adjust" id="negative">-1</button>
    <button class="product-detail__adjust" id="positive">+1</button>
    </div>
    </section>`}}r();
