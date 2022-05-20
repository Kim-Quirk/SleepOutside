import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParam, getLocalStorage } from "./utils.js";

function checkBackpack() {
    console.log("Am here");
    var list = getLocalStorage("so-cart");
    console.log(list);
    setTimeout(() => {
      document.querySelector(".count").innerText = Number(list.length);
      }, 300);
  }
checkBackpack();
const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
