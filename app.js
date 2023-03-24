class App {
    ui;
    table;
    selectedId;
  
    constructor(UI) {
      this.ui = UI;
      this.getTable();
    }
  
    setSelectedId(id) {
      this.selectedId = id;
    }
  
    getTable() {
      this.table = table = document.querySelector("#tableList tbody");
    }
  
    initialize() {
      this.ui.renderTable(this.table, contactArray);
      this.ui.renderDeleteModal();
    }
  }
  

const ui = window.UI;

(function(ui) {
    //APP
    const app = new App(ui);
    app.initialize();

    console.log(ui, 'ui')
})(window);