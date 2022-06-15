import ExternalServices from "./externalServices.js";
import {
  alertMessage,
  formDataToJSON,
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
      console.log("Logged in??", this.token)
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
        <input id="email" type="email" placeholder="Enter email address" name="email" value="user1@email.com" required>
        <label for="password"><b>Password</b></label>
        <input id="password" type="password" placeholder="Enter Password" name="password" value="user1" required>
        <button type="submit" id="login">Login</button>
    </fieldset>
        `;
    console.log(loginForm);
    this.mainElement.innerHTML = " ";
    this.mainElement.appendChild(loginForm);

    document.forms["login"].addEventListener("submit", (e) => {
      e.preventDefault();
      // e.target would contain our form in this case
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      this.login({
        email,
        password
      }, this.getOrders.bind(this));
    });
  }
  async getOrders() {
    try {
      var orders = await this.services.orderRequests(this.token);
      console.log("It worked??", orders);
    } catch (err) {
      // remember this from before?
      alertMessage(err.message.message);
    }
  }
}
