function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlItem = urlParams.get(param);
  return urlItem;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  callback
) {
  list.forEach((item) => {
    const clone = template.content.cloneNode(true);
    const templateWithData = callback(clone, item);
    parentElement.appendChild(templateWithData);
  });
}

export function renderWithTemplate(template, parent, data, callback) {
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }
  parent.appendChild(clone);
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

// load the header and footer
export async function loadHeaderFooter() {
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}

export function checkBackpack() {
  var list = getLocalStorage("so-cart");
  if (list === null) {
    setLocalStorage("so-cart", []);
    list = [];
    console.log("I see it null");
  }
  setTimeout(() => {
    var total = 0;
    for (let i = 0; i < list.length; i++) {
      total += Number(list[i].Quantity);
    }
    if(document.querySelector(".count") === null) {
      checkBackpack();
    } else {
      document.querySelector(".count").innerText = Number(total);
    }
  }, 200);
}

export function adjustQuantity(cart, product, operation) {
  //Search for duplicate items
  var duplicate = cart.find(item => product.Id == item.Id)
  if (duplicate) { //If we have a duplicate...
    //Start by getting the current number we have of the duplicate item
    var qty = Number(duplicate.Quantity);
   //adjust quantity
    qty += Number(operation);
    //Let's update the product we found in our search to the correct quantity now
    product.Quantity = qty.toString();

    //Now find the index of the duplicate item (Where is in our cart?)
    var index = cart.indexOf(duplicate);
    if (index !== -1) { //We found it!
      //Now replace the old item with the updated item
      cart[index] = product;
    }
    console.log(cart);
  } else { //We don't have a duplicate, we got an error
    console.log("Error!");
  }
  setLocalStorage("so-cart", cart);
  return cart;
}