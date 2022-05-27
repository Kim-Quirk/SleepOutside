import { setLocalStorage, getLocalStorage, loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

let cart = [];
let total = 0;

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.cart = cart;
    this.discount = 30;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log(this.product);
    this.product.FinalPrice *= 1 - this.discount / 100;
    this.product.FinalPrice = this.product.FinalPrice.toFixed(2);
    document.querySelector("main").innerHTML = this.renderProductDetails();
    // document
    //   .getElementById("addToCart")
    //   .addEventListener("click", this.addT    const cartImg =    const cartImg = document.querySelector(".cart")
    this.cart = getLocalStorage("so-cart");
    var cartImg;
    document.addEventListener("load", () => {
      cartImg = document.querySelector(".cart");
      cartImg.classList.add("test");
      document.querySelector(".count").innerText = 1;
    });
    document.getElementById("addToCart").addEventListener("click", () => {
      //this.addToCart.bind(this);
      this.addToCart();
      // cartImg.classList.add("anim-out");
      // setTimeout(() => {
      //   cartImg.classList.remove("anim-out");
      // }, 300);
    });
  }
  addToCart() {
    this.cart = getLocalStorage("so-cart");
    var cartImg = document.querySelector(".cart");
    cartImg.classList.add("anim-out");
    setTimeout(() => {
      cartImg.classList.remove("anim-out");
    }, 300);
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

    total = this.cart.length;
    document.querySelector(".count").innerText = total;

    setLocalStorage("so-cart", this.cart);
  }
  renderProductDetails() {
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
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
    </div></section>`;
  }
}
