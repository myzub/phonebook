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

  fetchContacts() {
    this.api.getAllContacts({
      onSuccess: (response) => {
        this.contacts = response.data;
        document.querySelector("#tableList").innerHTML = "";
        this.windowUI.renderTable(this.table, app.contacts);
      },
      onError: (response) =>
        console.log(new Error(`Error fetching Contact List! \n ${response}`)),
    });
  }

  fetchOneContact(contactId) {
    this.api.getContactById(contactId, {
      onSuccess: (response) => {
        app.OneContact = response.data;
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
      },
      onError: (response) =>
        console.log(new Error(`Error fetching one Contact! \n ${response}`)),
    });
  }

  postContact(newContact) {
    this.api.postNewContact(newContact, {
      onSuccess: () => {
        console.log(`Contact ${newContact.name} is posted successfully!`);
        app.fetchContacts();
      },
      onError: (response) =>
        console.log(new Error(`"Error posting new Contact! \n ${response}`)),
    });
  }

  updateContactById(contactId) {
    this.api.updateContact(contactId, {
      onSuccess: () => {
        console.log(`Contact ${contactId} is updated successfully!`);
        document.querySelector("#tableList").innerHTML = "";
        app.fetchContacts();
      },
      onError: (response) =>
        console.log(new Error(`"Error deleting new Contact! \n ${response}`)),
    });
  }

  deleteContactById(contactId) {
    this.api.deleteContact(contactId, {
      onSuccess: () => {
        console.log(`Contact ${contactId} is deleted successfully!`);
        app.fetchContacts();
      },
      onError: (response) =>
        console.log(new Error(`"Error deleting new Contact! \n ${response}`)),
    });
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
