function getLocalStorage(r){return JSON.parse(localStorage.getItem(r))}function getCartContents(){const r=getLocalStorage("so-cart"),a=r.map(t=>renderCartItem(t));document.querySelector(".product-list").innerHTML=a.join(""),document.querySelector(".product-list").innerHTML=renderCartItem(r)}function renderCartItem(r){const a=`<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${r.Image}'
      alt='${r.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${r.Name}</h2>
  </a>
  <p class='cart-card__color'>${r.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${r.FinalPrice}</p>
</li>`;return a}getCartContents();
