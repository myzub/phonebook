class App {
  windowUI;
  table;
  selectedId;
  contactArray;

  constructor(UI) {
    this.windowUI = UI;
    this.getTable();
    this.getContactArray();
  }

  setSelectedId(id) {
    this.selectedId = id;
  }

  getTable() {
    this.table = document.querySelector("#tableList tbody");
  }

  getContactArray() {
    this.contactArray = JSON.parse(localStorage.getItem("contacts-list")) || [];
  }

  initialize() {
    this.windowUI.renderForm();
    this.windowUI.renderTableHeader();
    this.windowUI.renderTable(this.table, this.contactArray);
    this.windowUI.renderEditModal();
    this.windowUI.renderDeleteModal();
  }
}

const windowUI = window.UI;

const app = new App(windowUI);
app.initialize();


/* 
(function (windowUI) {
  //APP
  const app = new App(windowUI);
  app.initialize();

  console.log(windowUI, "windowUI");
})(window);
 */