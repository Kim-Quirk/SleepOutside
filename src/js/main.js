function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function getTotalCart() {
  const cartItems = getLocalStorage("so-cart");
  document.querySelector(".count").innerText = cartItems.length;
}
getTotalCart();
