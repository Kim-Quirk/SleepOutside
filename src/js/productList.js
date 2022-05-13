import { renderListWithTemplate } from "./utils.js";

export default class ProductList {
  constructor(category, listElement, dataSource) {
    this.category = category;
    this.listElement = listElement;
    this.dataSource = dataSource;
  }
  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }
  renderList(list) {
    const template = document.getElementById("product-card-template");
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate())
    // list.forEach(product => {
    //   const clone = template.content.cloneNode(true);
    //   const hydratedTemplate = this.prepareTemplate(clone, product);
    //   this.listElement.appendChild(hydratedTemplate);

    // })
  }
  prepareTemplate(template, product) {
    template.querySelector("a").href += product.Id;
    // fill in the rest of the data here... 
    const img = template.getElementsByName("img");
    const brand = template.querySelector(".card__brand");
    const name = template.querySelector(".card__name");
    const price = template.querySelector(".product-card__price");

    img.setAttribute("src", product.FinalPrice);
    img.setAttribute("src", product.Image);
    brand.innerHTML = product.Brand.Name;
    name.innerHTML = product.Name;
    price.innerHTML = product.FinalPrice;
    // insert the actual details of the current product into the template
    console.log("Hi");
    return template;
  }
}
