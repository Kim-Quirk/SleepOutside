function getLocalStorage(t){return JSON.parse(localStorage.getItem(t))}function getTotal(t){var a=0;for(let e=0;e<t.length;e++)a+=t[e].FinalPrice;var r=document.getElementById("cart-footer");r.classList.toggle("hide");var c=document.querySelector(".cart-total");c.innerHTML=`Total: $${a}`}function getCartContents(){const t=getLocalStorage("so-cart");if(t){getTotal(t);const a=t.map(r=>renderCartItem(r));document.querySelector(".product-list").innerHTML=a.join("")}}function renderCartItem(t){const a=`<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${t.Image}'
      alt='${t.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${t.Name}</h2>
  </a>
  <p class='cart-card__color'>${t.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${t.FinalPrice}</p>
</li>`;return a}getCartContents();
