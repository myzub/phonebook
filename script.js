"use strict";
class Contact {
  constructor(name1, phone, email) {
    this.id = Date.now();
    this.name1 = name1;
    this.phone = phone;
    this.email = email;
  }
}

let table;
let contactArray = JSON.parse(localStorage.getItem("contacts-list")) || [];
let editModal = document.getElementById("editModal");
let deleteModal = document.getElementById("deleteModal");
//find by id two crosses separetely
let closeModal = document.getElementsByClassName("closeModal")[0];

function refreshTable(array) {
  document.querySelector("#tableList tbody").innerHTML = "";
  ui.renderTable(table, array);
}

//add
add.addEventListener("click", function () {
  const newContact = new Contact(
    document.querySelector("#name1").value,
    document.querySelector("#phone").value,
    document.querySelector("#email").value
  );
  contactArray.push(newContact);
  localStorage.setItem("contacts-list", JSON.stringify(contactArray));
});

//delete all
document.querySelector("#delete").addEventListener("click", function (event) {
  event.preventDefault();

  localStorage.clear();
  contactArray = [];
  refreshTable(contactArray);
});

function searchAny() {
  const searchQuery = document.getElementById("searchbox").value;
  const filteredArray = contactArray.filter((item) => {
    return (
      item.name1.includes(searchQuery) ||
      item.phone.includes(searchQuery) ||
      item.email.includes(searchQuery)
    );
  });

  refreshTable(filteredArray);
}

function editContact(contactId) {
  let editSubmit = document.getElementById("edit-submit");
  let currentContact;
  let editedContact;
  let indexOfCurrentContact;

  //   refactor to Array.find
  contactArray.map((i) => {
    if (i.id === contactId) {
      currentContact = i;
      indexOfCurrentContact = contactArray.indexOf(i);
    }
  });

  editModal.style.display = "block";

  document.getElementById(
    "edit-header"
  ).innerText = `Edit  ${currentContact.name1} contact?`;

  let editName1 = document.getElementById("edit-name1");
  let editPhone = document.getElementById("edit-phone");
  let editEmail = document.getElementById("edit-email");

  editName1.value = currentContact.name1;
  editPhone.value = currentContact.phone;
  editEmail.value = currentContact.email;
  editedContact = currentContact;

  editSubmit.addEventListener("click", function eventHandler() {
    editModal.style.display = "none";

    editedContact.name1 = editName1.value;
    editedContact.phone = editPhone.value;
    editedContact.email = editEmail.value;

    // filter method
    contactArray.splice(indexOfCurrentContact, 1, editedContact);

    localStorage.setItem("contacts-list", JSON.stringify(contactArray));
    refreshTable(contactArray);

    editSubmit.removeEventListener("click", eventHandler);
  });
}

const getRemoveListenerFunction = ({ eventType, element, callback }) => {
  element.removeEventListener(eventType, callback);
};

closeModal.addEventListener("click", function eventHandler() {});

closeModal.onclick = function () {
  editModal.style.display = "none";
  deleteModal.style.display = "none";
  deleteSubmit.removeEventListener("click", removeContact);
};

window.onclick = function (event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  } else if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
};

function removeContact() {
  deleteModal.style.display = "none";
  // filter
  const foundContactIndex = contactArray.findIndex(
    (value) => value.id === app.selectedId
  );
  contactArray.splice(foundContactIndex, 1);

  localStorage.setItem("contacts-list", JSON.stringify(contactArray));
  refreshTable(contactArray);
}

function deleteContact() {
  const deleteSubmit = document.getElementById("delete-submit");
  let currentContact;

  console.log(app.selectedId, "selectedId");
  contactArray.map((i) => {
    if (i.id === app.selectedId) {
      currentContact = i;
    }
  });

  deleteModal.style.display = "block";

  document.getElementById(
    "delete-header"
  ).innerText = `Edit  ${currentContact.name1} contact?`;

  deleteSubmit.addEventListener("click", removeContact);
}

class UI {
  setCustomAttributes(element, attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }
  }

  elementBuilder(tagName, attributes, child) {
    const element = document.createElement(tagName);

    ui.setCustomAttributes(element, attributes);

    switch (typeof child) {
      case "string":
        element.appendChild(document.createTextNode(`${child}`));
        break;
      case "number":
        element.appendChild(document.createTextNode(`${child}`));
        break;
      case "object":
        if (Array.isArray(child)) {
          // Recursion
          if (Array.isArray(child[0])) {
            child.map((subChild) => {
              subChild.map((subChild) => element.appendChild(subChild));
            });
            break;
          } else {
            child.map((subChild) => {
              return element.appendChild(subChild);
            });
            break;
          }
        } else {
          element.appendChild(child);
          break;
        }
      default:
        break;
    }

    return element;
  }

  renderTable(table, contacts) {
    contacts.map((newContact) => {
      const tdId = ui.elementBuilder(
        "td",
        { class: "table-cell", type: "text" },
        newContact.id
      );
      const tdName = ui.elementBuilder(
        "td",
        { class: "table-cell", type: "text" },
        newContact.name1
      );
      const tdPhone = ui.elementBuilder(
        "td",
        { class: "table-cell", type: "text" },
        newContact.phone
      );
      const tdEmail = ui.elementBuilder(
        "td",
        { class: "table-cell", type: "text" },
        newContact.email
      );

      const deleteImg = ui.elementBuilder("img", { src: "img/delete.png" });
      const editImage = ui.elementBuilder("img", { src: "img/edit.png" });


      const editLink = ui.elementBuilder("a", { href: "#" }, editImage);

      const tdEditLink = ui.elementBuilder(
        "td",
        { class: "table-cell", type: "text" },
        editLink
      );

      editLink.addEventListener("click", () => {
        editContact(newContact.id);
      });

      
      const deleteLink = ui.elementBuilder("a", { href: "#" }, deleteImg);

      const tdDeleteLink = ui.elementBuilder(
        "td",
        { class: "table-cell", type: "text" },
        deleteLink
      );

      deleteLink.addEventListener("click", () => {
        app.setSelectedId(newContact.id);
        console.log(app.selectedId, "selectedID");
        deleteContact();
      });

      const trContact = ui.elementBuilder("tr", {}, [
        tdId,
        tdName,
        tdPhone,
        tdEmail,
        tdEditLink,
        tdDeleteLink,
      ]);

      // trContact.innerHTML += `<a onclick="editContact(${newContact.id})" href="#" id="edit-btn_${newContact.id}">
      //               <img src="img/edit.png" alt="" style="height: 20px;"></img>
      //           </a>`;
      // trContact.innerHTML += `<a onclick="deleteContact(${newContact.id})" href="#" id="delete-btn_${newContact.id}">
      //               <img src="img/delete.png" alt="" style="height: 20px;"></img>
      //           </a>`;

      table.appendChild(trContact);
    });
  }

  root = document.getElementById("root");

  renderForm() {}

  renderTableHeader() {}

  renderEditModal() {}

  renderDeleteModal() {
    const deleteSubmit = ui.elementBuilder("input", {
      type: "submit",
      id: "delete-submit",
    });
    const modalFooter = ui.elementBuilder(
      "div",
      { class: "modal-footer" },
      deleteSubmit
    );
    const modalBody = ui.elementBuilder("div", { class: "modal-body" });
    const closeModal = ui.elementBuilder(
      "span",
      { class: "closeModal" },
      "&times;"
    );
    const deleteHeader = ui.elementBuilder("h2", { id: "delete-header" });

    const modalHeader = ui.elementBuilder("div", { class: "modal-header" }, [
      closeModal,
      deleteHeader,
    ]);

    const ModalContent = ui.elementBuilder("div", { class: "modal-content" }, [
      modalHeader,
      modalBody,
      modalFooter,
    ]);

    const deleteModalDiv = ui.elementBuilder(
      "div",
      {
        id: "deleteModal",
        class: "modal",
      },
      [ModalContent]
    );
    document.body.appendChild(deleteModalDiv);
  }
}

const ui = new UI();

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
const app = new App(ui);

app.initialize();

// rewrite edit,
// get rid of innerHTML in renderTable  ??
// delete html and render all up in js, in body has to be <div>root</div>
// refactor mentions
// NOT LET, CONST!!!
// event listener vs onclick

//!!! in new js file
//renderHeader
// renderForm

// script = UI
// (function(ui){



}(window.UI)