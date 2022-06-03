import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./checkoutProcess.js";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", "idk");
checkout.init();
