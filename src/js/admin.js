import ExternalServices from "./externalServices.js";
import {
  alertMessage,
} from "./utils.js";

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = document.querySelector(outputSelector);
    this.token = null;
    this.services = new ExternalServices();
  }
  async login(creds, next) {
    //http://157.201.228.93:2992/login
    try {
      this.token = await this.services.loginRequest(creds);
      // console.log("Logged in??", this.token)
      next()
    } catch (err) {
      // remember this from before?
      alertMessage(err.message.message);
    }
  }
  showLogin() {
    var loginForm = document.createElement("form");
    loginForm.setAttribute("name", "login")
    loginForm.innerHTML = `
    <fieldset>
        <legend>Login</legend>
        <label for="email"><b>Email</b></label>
        <input id="email" type="email" placeholder="Enter email address" name="email" required>
        <label for="password"><b>Password</b></label>
        <input id="password" type="password" placeholder="Enter Password" name="password" required>
        <button type="submit" id="login">Login</button>
    </fieldset>
        `;
    // console.log(loginForm);
    this.mainElement.innerHTML = " ";
    this.mainElement.appendChild(loginForm);

    document.forms["login"].addEventListener("submit", (e) => {
      e.preventDefault();
      // e.target would contain our form in this case
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      // console.log(email, password);
      this.login({
        email,
        password
      }, this.getOrders.bind(this));
    });
  }
  async getOrders() {
    try {
      var orders = await this.services.orderRequests(this.token);
      console.log(orders);
      this.showOrders(orders);
    } catch (err) {
      // remember this from before?
      alertMessage(err);
    }
  }
  showOrders(orders) {
    this.mainElement.innerHTML =
      `<h2 id="orders">Current Orders</h2>
    <table id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>Number of Items</th><th>Total</th>
    </thead>
    <tbody class="order-body"></tbody>
    </table>`;
    const parent = document.querySelector("#orders tbody");
    if (orders.length > 0) {
      for (var i = 0; i < orders.length; i++) {
        console.log(orders[i]);
        var id = orders[i].id;
        var date;
        if (orders[i].orderDate !== undefined) {
          date = new Date(orders[i].orderDate).toLocaleDateString("en-US")
        } else {
          date = "No date recorded.";
        }
        var numItems;
        if (orders[i].items !== undefined) {
          numItems = orders[i].items.length;
        } else {
          numItems = "No items recorded.";
        }
        var total;
        if (orders[i].orderTotal) {
          total = orders[i].orderTotal;
          total = "$" + Number(total).toFixed(2)
        } else {
          total = "No total recorded.";
        }
        
        var trow = document.createElement("tr");
        trow.innerHTML = `
        <tr>
        <td>${id}</td>
        <td>${date}</td>
        <td>${numItems}</td>
        <td>${total}</td>
        </tr>`;
        parent.appendChild(trow);
      }
    } else {
      var trow2 = document.createElement("tr");
      trow2.innerHTML = "There are currently no orders.";
      parent.appendChild(trow);
    }

  }
}
