function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getTotal(cartItems) {
  var total = 0;
  //loop through all items in cart and add prices
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].FinalPrice;
  }
  //Show the footer (we have items in our cart)
  var footer = document.getElementById("cart-footer");
  footer.classList.toggle("hide");
  var cartTotal = document.querySelector(".cart-total");
  cartTotal.innerHTML = `Total: $${total}`; //Show the total price
  document.querySelector(".count").innerText = cartItems.length;
}

function getCartContents() {
  // let markup = '';
  const cartItems = getLocalStorage("so-cart");
  //Continue if we have items in cart
  if (cartItems) {
    getTotal(cartItems); //Calculate the total price of cart
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.getElementById("removeFromCart").addEventListener("click", () => {
      //this.addToCart.bind(this);
      console.log("clicked!");
      removeFromCart(cartItems);
      document.getElementById
  
      // cartImg.classList.add("anim-out");
      // setTimeout(() => {
      //   cartImg.classList.remove("anim-out");
      // }, 300);
    });
  } else {
    document.querySelector(".product-list").innerHTML =
      "<li> Your cart is empty</li>";
  }
}

function removeFromCart(cartItems) {
  var element = document.getElementById('removeFromCart');
  var prodId = element.getAttribute('data-id');
  console.log(prodId);
  cartItems = cartItems.filter(item => item.Id !== prodId);
  setLocalStorage("so-cart", cartItems);
  getCartContents();
  location.reload();
}

function renderCartItem(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <div class='cart-card__trash'>
    <span id="removeFromCart" data-id="${item.Id}"> X </span>
  </div>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;
  // console.log(newItem);
  return newItem;
}

getCartContents();
