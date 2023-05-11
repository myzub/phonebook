class App {
  windowUI;
  table;
  selectedId;
  contacts;
  OneContact;

  constructor(UI, api) {
    this.windowUI = UI;
    this.contacts = [];
    this.api = api;
  }

  setSelectedId(id) {
    this.selectedId = id;
  }

  async fetchContacts() {
    try {
      const response = await this.api.getAllContacts();
      const contacts = await response.json();
      this.contacts = contacts.data;
      document.querySelector("#tableList").innerHTML = "";
      this.windowUI.renderTable(this.table, app.contacts);
    } catch (e) {
      console.log(`Error fetching Contact List! \n exception: ${e}`);
    }
  }

  async fetchOneContact(contactId) {
    try {
      const response = await this.api.getContactById(contactId);
      const contacts = await response.json();

      app.OneContact = contacts.data;
      console.log(app.OneContact + " request");

      editModalDiv.style.display = "block";
      document.getElementById(
        "editHeader"
      ).innerText = `Edit  ${app.OneContact.name} contact?`;

      let editSubmit = document.getElementById("editSubmit");
      let editName = document.getElementById("editName");
      let editPhone = document.getElementById("editPhone");
      let editEmail = document.getElementById("editEmail");

      editName.value = app.OneContact.name;
      editPhone.value = app.OneContact.phone;
      editEmail.value = app.OneContact.email;

      let editedContact = app.OneContact;

      editSubmit.addEventListener("click", function eventHandler() {
        editModalDiv.style.display = "none";

        editedContact.name = editName.value;
        editedContact.phone = editPhone.value;
        editedContact.email = editEmail.value;

        app.updateContactById(editedContact);

        editSubmit.removeEventListener("click", eventHandler);
      });
    } catch (e) {
      console.log(new Error(`Error fetching one Contact! \n ${e}`));
    }
  }

  async postContact(newContact) {
    try {
      const response = await this.api.postNewContact(newContact);
      console.log(`Contact ${newContact.name} is posted successfully!`);
      await app.fetchContacts();
    } catch (e) {
      console.log(new Error(`"Error posting new Contact! \n ${e}`));
    }
  }

  async updateContactById(contactId) {
    try {
      const response = await zthis.api.updateContact(contactId);
      console.log(`Contact ${contactId} is updated successfully!`);
      document.querySelector("#tableList").innerHTML = "";
      await app.fetchContacts();
    } catch (e) {
      console.log(new Error(`"Error deleting new Contact! \n ${e}`));
    }
  }

  async deleteContactById(contactId) {
    try {
      const response = await this.api.deleteContact(contactId);
      console.log(`Contact ${contactId} is deleted successfully!`);
      await app.fetchContacts();
    } catch (e) {
      console.log(new Error(`"Error deleting new Contact! \n ${e}`));
    }
  }

  initialize() {
    this.fetchContacts();
    this.windowUI.renderForm();
    this.windowUI.renderTableHeader();
    this.windowUI.renderEditModal();
    this.windowUI.renderDeleteModal();
  }
}

const windowUI = window.UI;
const windowAPI = window.API;
const app = new App(windowUI, windowAPI);
app.initialize();

/* 
(function (windowUI) {
  //APP
  const app = new App(windowUI);
  app.initialize();

  console.log(windowUI, "windowUI");
})(window);
 */
