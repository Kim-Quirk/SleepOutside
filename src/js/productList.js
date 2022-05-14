import { renderListWithTemplate } from "./utils.js";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.listElement = listElement;
    this.dataSource = dataSource;
  }
  async init() {
    const list = await this.dataSource.getData();
    var filteredList = this.filterList(list);
    this.renderList(filteredList);
  }
  prepareTemplate(template, product) {
    template.querySelector("a").href += product.Id;
    template.querySelector("img").src = product.Image;
    template.querySelector("img").alt += product.Name;
    template.querySelector(".card__brand").textContent = product.Brand.Name;
    template.querySelector(".card__name").textContent =
      product.NameWithoutBrand;
    template.querySelector(".product-card__price").textContent +=
      product.FinalPrice;
    return template;
  }
  filterList(list) {
    var filteredList = list.filter(
      (product) => product.Id !== "989CG" && product.Id !== "880RT"
    );
    // 880RT
    return filteredList;
  }
  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = "";
    //get the template
    const template = document.getElementById("product-card-template");
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }
}
