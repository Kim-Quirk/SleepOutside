import Alert from "./alerts.js";
import ProductData from "./productData.js";
import ProductList from "./productList.js";
import { loadHeaderFooter, getParam } from "./utils.js";

loadHeaderFooter();

function checkBackpack() {
  console.log("Am here");
  var list = getLocalStorage("so-cart");
  console.log(list);
  setTimeout(() => {
    document.querySelector(".count").innerText = Number(list.length);
  }, 300);
}

checkBackpack();

const freshAlert = new Alert("message", "background", "color");

const category = getParam("category");
console.log(category);
// first create an instance of our ProductData class.
const dataSource = new ProductData(category);
// then get the element we want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show our products
myList.init();

// // first create an instance of our ProductData class.
// const dataSource = new ProductData("tents");
// // then get the element we want the product list to render in
// const listElement = document.querySelector(".product-list");
// // then create an instance of our ProductList class and send it the correct information.
// const myList = new ProductList("tents", dataSource, listElement);
// // finally call the init method to show our products
// myList.init();

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
