import {
  getLocalStorage,
  setLocalStorage,
  checkBackpack,
  formDataToJSON,
} from "./utils.js";

import ExternalServices from "./externalServices.js";

const services = new ExternalServices();

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.numItems = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.calculateOrdertotal();
  }
  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    var list = getLocalStorage("so-cart");
    if (list === null) {
      setLocalStorage("so-cart", []);
      list = [];
      console.log("I see it null");
    }
    for (let i = 0; i < list.length; i++) {
      this.numItems += Number(list[i].Quantity);
      this.itemTotal += Number(list[i].FinalPrice);
    }
  }
  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06;
    for (let i = 0; i < this.numItems; i++) {
      if (i == 0) {
        this.shipping = 10;
      } else {
        this.shipping += 2;
      }
    }
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.orderTotal = this.orderTotal.toFixed(2);
    console.log(this.orderTotal, this.itemTotal, this.tax, this.shipping);
    // display the totals.
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.getElementById("subtotal").innerText = `$${this.itemTotal}`;
    document.getElementById("shipping").innerText = `$${this.shipping}`;
    document.getElementById("tax").innerText = `$${this.tax}`;
    document.getElementById("shipping").innerText = `$${this.shipping}`;
    document.getElementById("tax").innerText = `$${this.tax}`;
    document.getElementById("orderTotal").innerText = `$${this.orderTotal}`;
    document.getElementById("numItems").innerText = `(${this.numItems})`;
  }

  async checkout() {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    // call the checkout method in our ExternalServices module and send it our data object.
  }
}

checkBackpack();
