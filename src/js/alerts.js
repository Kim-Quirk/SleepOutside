const baseUrl = "json/alerts.json";

export default class Alert {
  constructor(alert, background, color) {
    this.alert = alert;
    this.color = color;
    this.background = background;
    this.init();
  }

  async init() {
    this.alert = await this.getAlert(baseUrl);
    this.alert = this.alert.alerts;
    this.renderAlert(this.alert, this.alertTemplate);
  }

  async getAlert(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      console.log(err);
    }
  }
  alertTemplate(alerts) {
    return `<style> 
    .alert_${alerts.id}{
      color: ${alerts.color} !important; 
      background-color: ${alerts.background} ;
      text-align: center;
      padding: 1rem !important;
    }
      </style>

      <p class="alert_${alerts.id}">${alerts.message}</p>`;
  }
  renderAlert(alerts, template) {
    const newAlert = alerts.map((alerts) => template(alerts)).join("");
    const outputElement = document.createElement("div");
    outputElement.innerHTML = newAlert;
    document.querySelector(".hero").prepend(outputElement);
  }
}
