import Alert from "./alerts.js";
import ProductData from "./productData.js";
import ProductList from "./productList.js";

const freshAlert = new Alert("message", "background", "color");

// first create an instance of our ProductData class.
const dataSource = new ProductData("tents");
// then get the element we want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList("tents", dataSource, listElement);
// finally call the init method to show our products
myList.init();

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function getTotalCart() {
  const cartItems = getLocalStorage("so-cart");
  document.querySelector(".count").innerText = cartItems.length;
}
getTotalCart();
