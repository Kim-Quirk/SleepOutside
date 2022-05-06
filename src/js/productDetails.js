import { setLocalStorage } from "./utils.js";

import { getLocalStorage } from "./utils.js";

let cart = [];

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.cart = cart;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector("main").innerHTML = this.renderProductDetails();
    // document
    //   .getElementById("addToCart")
    //   .addEventListener("click", this.addToCart.bind(this));
    const cartImg = document.querySelector(".cart")
    document
      .getElementById("addToCart")
      .addEventListener("click",  () => {
        //this.addToCart.bind(this);
        this.addToCart();
        cartImg.classList.add('anim-out');
        setTimeout(()=>{
          cartImg.classList.remove('anim-out');
        }, 300)
      });
  }
  addToCart() {
    this.cart = getLocalStorage("so-cart");
    //console.log("00", this.cart)
    if (this.cart != null) {
      this.cart.push(this.product);
      //console.log("0" , this.cart);
      
    } else {
      //this.cart.push(this.product);
      this.cart = [this.product];
      //this.cart = [];
      //console.log("1" , this.cart);
    }

    setLocalStorage("so-cart", this.cart);
  }
  renderProductDetails() {
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Image}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`;
  }
}
