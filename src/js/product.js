import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParam, getLocalStorage, setLocalStorage, checkBackpack } from "./utils.js";

checkBackpack();
const productId = getParam("product");
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();
