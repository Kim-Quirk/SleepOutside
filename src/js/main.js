import ExternalServices from "./externalServices.js";
import ProductList from "./productList.js";
import {
  loadHeaderFooter,
  getParam,
  checkBackpack,
  checkVisitor
} from "./utils.js";

loadHeaderFooter();

// if (window.location.pathname == "/index.html") {
//   const freshAlert = new Alert("message", "background", "color");
// }

const category = getParam("category");
if (category) {
  // first create an instance of our ProductData class.
  const dataSource = new ExternalServices(category);
  // then get the element we want the product list to render in
  const listElement = document.querySelector(".product-list");
  // then create an instance of our ProductList class and send it the correct information.
  const myList = new ProductList(category, dataSource, listElement);
  // finally call the init method to show our products
  myList.init();
}

checkBackpack();

if (document.title === "Sleep Outside | Home") {
  checkVisitor();
}



// window.onerror = function(message, url, line, col, error) {
//   alertMessage(`${message}\n At ${line}:${col} of ${url}`);
//   console.log("Test");
// };

// for (let message in err.message) {
//   alertMessage(err.message[message]);
// }
// console.log(err);
