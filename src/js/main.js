import { doc } from "prettier";
import Alert from "./alerts.js";
import ProductData from "./productData.js";
import ProductList from "./productList.js";
import { loadHeaderFooter, getParam, checkBackpack } from "./utils.js";

loadHeaderFooter();

if (window.location.pathname == "/index.html") {
  const freshAlert = new Alert("message", "background", "color");
}

const category = getParam("category");
if (category) {
  // first create an instance of our ProductData class.
  const dataSource = new ProductData(category);
  // then get the element we want the product list to render in
  const listElement = document.querySelector(".product-list");
  // then create an instance of our ProductList class and send it the correct information.
  const myList = new ProductList(category, dataSource, listElement);
  // finally call the init method to show our products
  myList.init();
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

checkBackpack();
