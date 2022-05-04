let products = [];
let cart = [];
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get tents data
function getProductsData() {
  fetch("../json/tents.json")
    .then(convertToJson)
    .then((data) => {
      products = data;
    });
}
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// add to cart button event handler
function addToCart(e) {
  cart = getLocalStorage("so-cart");
  const product = products.find((item) => item.Id === e.target.dataset.id);
  if (cart != null) {
    cart.push(product);
  } else {
    cart = [product];
  }

  setLocalStorage("so-cart", cart);
}

getProductsData();
// getProductsDataAwait();
// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCart);
