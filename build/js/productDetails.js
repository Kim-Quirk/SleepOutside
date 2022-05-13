var a = (c, d, r) =>
  new Promise((e, o) => {
    var u = (t) => {
        try {
          i(r.next(t));
        } catch (s) {
          o(s);
        }
      },
      p = (t) => {
        try {
          i(r.throw(t));
        } catch (s) {
          o(s);
        }
      },
      i = (t) => (t.done ? e(t.value) : Promise.resolve(t.value).then(u, p));
    i((r = r.apply(c, d)).next());
  });
import { setLocalStorage as h } from "./utils.js";
import { getLocalStorage as l } from "./utils.js";
let n = [];
export default class m {
  constructor(d, r) {
    (this.productId = d),
      (this.product = {}),
      (this.dataSource = r),
      (this.cart = n);
  }
  init() {
    return a(this, null, function* () {
      (this.product = yield this.dataSource.findProductById(this.productId)),
        (document.querySelector(
          "main"
        ).innerHTML = this.renderProductDetails()),
        document
          .getElementById("addToCart")
          .addEventListener("click", this.addToCart.bind(this));
    });
  }
  addToCart() {
    (this.cart = l("so-cart")),
      this.cart != null
        ? this.cart.push(this.product)
        : (this.cart = [this.product]),
      h("so-cart", this.cart);
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
