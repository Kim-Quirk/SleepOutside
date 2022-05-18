import {
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage
} from "./utils.js";

export default class CartList {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }
  async init() {
    const list = getLocalStorage(this.key);
    this.renderList(list);
  }
  removeFromCart() {
    var cartItems = getLocalStorage(this.key);
    var element = document.getElementById("removeFromCart");
    var prodId = element.getAttribute("data");
    // console.log(prodId);
    var newCart = cartItems;
    var removed = cartItems.find((item) => item.Id === prodId);
    newCart = cartItems.filter((item) => item !== removed);
    setLocalStorage("so-cart", newCart);
    location.reload();
  }
  prepareTemplate(template, product) {
    // template.querySelector("a").href += product.Id;
    template.querySelector("img").src = product.Image;
    template.querySelector("img").alt += product.Name;
    // template.querySelector(".card__brand").textContent = product.Brand.Name;
    template.querySelector(".card__name").textContent =
      product.Name;
    template.querySelector(".cart-card__color").textContent = product.Colors[0].ColorName;
    template.querySelector(".cart-card__price").textContent +=
      product.FinalPrice;
    template.querySelector("#removeFromCart").data = product.Id;
    template
      .querySelector(".cart-card__trash")
      .addEventListener("click", () => {
        //this.addToCart.bind(this);
        // console.log("clicked!");
        this.removeFromCart();
        // document.getElementById;

        // cartImg.classList.add("anim-out");
        // setTimeout(() => {
        //   cartImg.classList.remove("anim-out");
        // }, 300);
      });
    return template;
  }
  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = "";
    //get the template
    const template = document.getElementById("cart-card-template");
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }
  getTotal(cartItems) {
    var total = 0;
    //loop through all items in cart and add prices
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].FinalPrice;
    }
    //Show the footer (we have items in our cart)
    var footer = document.getElementById("cart-footer");
    footer.classList.toggle("hide");
    var cartTotal = document.querySelector(".cart-total");
    cartTotal.innerHTML = `Total: $${total}`; //Show the total price
    document.querySelector(".count").innerText = cartItems.length;
  }
}
