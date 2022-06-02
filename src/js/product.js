import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParam, getLocalStorage } from "./utils.js";

function checkBackpack() {
  var list = getLocalStorage("so-cart");
  setTimeout(() => {
    if (list.length != 0)
      document.querySelector(".count").innerText = Number(list.length);
  }, 200);
}
checkBackpack();
const productId = getParam("product");
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();
