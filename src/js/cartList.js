import {
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage,
} from "./utils.js";

function removeFromCart(item) {
  var cartImg = document.querySelector(".cart");
    cartImg.classList.add("anim-out");
        setTimeout(() => {
          cartImg.classList.remove("anim-out");
        }, 300);
  var cartItems = getLocalStorage("so-cart");
  var element = document.getElementById("remove");
  var prodId = element.getAttribute("data-id");
  // console.log("Hello!");
  var newCart = cartItems;
  var removed = cartItems.find((item) => item.Id === prodId);
  newCart = cartItems.filter((item) => item !== removed);
  setLocalStorage("so-cart", newCart);
  location.reload();
}

export default class CartList {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }
  async init() {
    const list = getLocalStorage(this.key);
    this.renderList(list);
    if (list.length === 0) {
      document.querySelector(".product-list").innerHTML =
        "<li> Your cart is empty</li>";
    } else {
      this.getTotal(list);
    }
  }
  prepareTemplate(template, product) {
    // template.querySelector("a").href += product.Id;
    template.querySelector("img").src = product.Image;
    template.querySelector("img").alt += product.Name;
    // template.querySelector(".card__brand").textContent = product.Brand.Name;
    template.querySelector(".card__name").textContent = product.Name;
    template.querySelector(".cart-card__color").textContent =
      product.Colors[0].ColorName;
    template.querySelector(".cart-card__quantity").textContent = product.qty;
    template.querySelector(".cart-card__price").textContent +=
      product.FinalPrice;
    template.querySelector("#remove").setAttribute("data-id", product.Id);
    template
      .querySelector(".cart-card__trash")
      .addEventListener("click", () => {
        //this.addToCart.bind(this);
        // console.log("clicked!");
        removeFromCart(product);
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
      total += Number(cartItems[i].FinalPrice);
    }
    //Show the footer (we have items in our cart)
    var footer = document.getElementById("cart-footer");
    footer.classList.toggle("hide");
    var cartTotal = document.querySelector(".cart-total");
    cartTotal.innerHTML = `Total: $${total}`; //Show the total price
    setTimeout(() => {
      document.querySelector(".count").innerText = Number(cartItems.length);
    }, 300);
    // document.querySelector(".count").innerText = cartItems.length;
  }
}
