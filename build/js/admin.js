var l=(m,e,r)=>new Promise((t,a)=>{var o=n=>{try{s(r.next(n))}catch(d){a(d)}},i=n=>{try{s(r.throw(n))}catch(d){a(d)}},s=n=>n.done?t(n.value):Promise.resolve(n.value).then(o,i);s((r=r.apply(m,e)).next())});import h from"./externalServices.js";import{alertMessage as c}from"./utils.js";export default class u{constructor(e){this.mainElement=document.querySelector(e),this.token=null,this.services=new h}login(e,r){return l(this,null,function*(){try{this.token=yield this.services.loginRequest(e),r()}catch(t){c(t.message.message)}})}showLogin(){var e=document.createElement("form");e.setAttribute("name","login"),e.innerHTML=`
    <fieldset>
        <legend>Login</legend>
        <label for="email"><b>Email</b></label>
        <input id="email" type="email" placeholder="Enter email address" name="email" required>
        <label for="password"><b>Password</b></label>
        <input id="password" type="password" placeholder="Enter Password" name="password" required>
        <button type="submit" id="login">Login</button>
    </fieldset>
        `,this.mainElement.innerHTML=" ",this.mainElement.appendChild(e),document.forms.login.addEventListener("submit",r=>{r.preventDefault();const t=document.querySelector("#email").value,a=document.querySelector("#password").value;this.login({email:t,password:a},this.getOrders.bind(this))})}getOrders(){return l(this,null,function*(){try{var e=yield this.services.orderRequests(this.token);console.log(e),this.showOrders(e)}catch(r){c(r)}})}showOrders(e){this.mainElement.innerHTML=`<h2 id="orders">Current Orders</h2>
    <table id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>Number of Items</th><th>Total</th>
    </thead>
    <tbody class="order-body"></tbody>
    </table>`;const r=document.querySelector("#orders tbody");if(e.length>0)for(var t=0;t<e.length;t++){console.log(e[t]);var a=e[t].id,o;e[t].orderDate!==void 0?o=new Date(e[t].orderDate).toLocaleDateString("en-US"):o="No date recorded.";var i;e[t].items!==void 0?i=e[t].items.length:i="No items recorded.";var s;e[t].orderTotal?(s=e[t].orderTotal,s="$"+Number(s).toFixed(2)):s="No total recorded.";var n=document.createElement("tr");n.innerHTML=`
        <tr>
        <td>${a}</td>
        <td>${o}</td>
        <td>${i}</td>
        <td>${s}</td>
        </tr>`,r.appendChild(n)}else{var d=document.createElement("tr");d.innerHTML="There are currently no orders.",r.appendChild(n)}}}
