import {
  setLocalStorage,
  getLocalStorage,
  loadHeaderFooter,
  checkBackpack,
  adjustQuantity,
  animateBackpack,
  alertMessage,
  removeAllAlerts,
} from "./utils.js";

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
    // console.log(this.product);
    this.product.FinalPrice *= 1 - this.discount / 100;
    this.product.FinalPrice = this.product.FinalPrice.toFixed(2);
    document.querySelector("main").innerHTML = this.renderProductDetails();
    this.cart = getLocalStorage("so-cart");
    var cartImg;

    this.setupButtons(false);

    //Wait for page to load first (avoid errors)
    document.addEventListener("load", () => {
      cartImg = document.querySelector(".cart");
      cartImg.classList.add("test");
      document.querySelector(".count").innerText = 1;
    });

    document.getElementById("negative").addEventListener("click", () => {
      // console.log("-1");
      //Let's prevent negatives here!
      if (this.product.Quantity == 0) {
        removeAllAlerts();
        alertMessage(
          "You can not have negative products. Email us for return information."
        );
      }
      if (this.product.Quantity == 1) {
        this.setupButtons(false);
        this.cart = adjustQuantity(this.cart, this.product, "-1");
        checkBackpack();
        animateBackpack();
        removeAllAlerts();
        alertMessage("The last of this item has been removed from this cart.");
      } else {
        this.cart = adjustQuantity(this.cart, this.product, "-1");
        checkBackpack();
        animateBackpack();
        removeAllAlerts();
        alertMessage(
          "Adjusted quantity and removed one of this item from your cart."
        );
      }
    });
    document.getElementById("positive").addEventListener("click", () => {
      // console.log("+1");
      this.cart = adjustQuantity(this.cart, this.product, "1");
      checkBackpack();
      animateBackpack();
      removeAllAlerts();
      alertMessage(
        "Adjusted quantity and added one of this item from your cart."
      );
    });
    document.getElementById("addToCart").addEventListener("click", () => {
      this.addToCart();
    });

    //Captilize first letter
    var string =
      this.product.Category[0].toUpperCase() + this.product.Category.slice(1);
    //Make the breadcrumb!
    var breadcrumb = document.getElementById("location");
    breadcrumb.innerHTML = `${string}`;
  }
  setupButtons(bool) {
    var addButton = document.querySelector(".product-detail__add");
    var qtyButtons = document.querySelector("#adjustQty");

    // False means we just have the add to cart button. No qty buttons.
    if (bool === false) {
      qtyButtons.classList.add("hide");
      qtyButtons.classList.remove("display-adjust");
      addButton.classList.remove("hide");
    }

    // True means we hide the add to cart button. Show the qty buttons.
    if (bool === true) {
      qtyButtons.classList.remove("hide");
      qtyButtons.classList.add("display-adjust");
      addButton.classList.add("hide");
    }
  }
  addToCart() {
    removeAllAlerts();
    alertMessage("Item added to cart!");
    this.cart = getLocalStorage("so-cart");
    animateBackpack();

    //If the cart isn't empty, we can use .push to add the item
    if (this.cart != null) {
      //Search for duplicate items
      var duplicate = this.cart.find(
        (product) => this.product.Id == product.Id
      );
      if (duplicate) {
        //If we have a duplicate...
        //Start by getting the current number we have of the duplicate item
        var qty = Number(duplicate.Quantity);
        //Increase the number by one
        qty += 1;
        //Let's update the product we found in our search to the correct quantity now
        this.product.Quantity = qty.toString();

        //Now find the index of the duplicate item (Where is in our cart?)
        var index = this.cart.indexOf(duplicate);
        if (index !== -1) {
          //We found it!
          //Now replace the old item with the updated item
          this.cart[index] = this.product;
        }
      } else {
        //We don't have a duplicate, we can just add it!
        this.product["Quantity"] = "1"; //First we have to intialize the quantity
        this.cart.push(this.product);
      }
    } else {
      //If the cart is empty, we have to intialize our array to this product (.push won't work)
      // The product objects don't have a quantity key-value pair, so let's make one.
      this.product["Quantity"] = "1";
      this.cart = [this.product];
      // console.log(this.cart);
    }

    total = this.cart.length;
    document.querySelector(".count").innerText = total;

    setLocalStorage("so-cart", this.cart);
    checkBackpack();
    this.setupButtons(true);
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
    </div>
    <div class="product-detail__adjust_button" id="adjustQty">
    <button class="product-detail__adjust" id="negative">-1</button>
    <button class="product-detail__adjust" id="positive">+1</button>
    </div>
    </section>`;
  }
}

checkBackpack();
