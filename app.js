class App {
  appUi;
  table;
  selectedId;

  constructor(UI) {
    this.appUi = UI;
    this.getTable();
  }

  setSelectedId(id) {
    this.selectedId = id;
  }

  getTable() {
    this.table = table = document.querySelector("#tableList tbody");
  }

  initialize() {
    this.appUi.renderForm();
    this.appUi.renderTable(this.table, contactArray);
    this.appUi.renderDeleteModal();
  }
}

const appUi = window.UI;

(function (appUi) {
  //APP
  const app = new App(appUi);
  app.initialize();

  console.log(appUi, "appUi");
})(window);
