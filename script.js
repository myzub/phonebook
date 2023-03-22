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

    contactArray.splice(indexOfCurrentContact, 1, editedContact);

    localStorage.setItem("contacts-list", JSON.stringify(contactArray));
    refreshTable(contactArray);

    editSubmit.removeEventListener("click", eventHandler);
  });
}

closeModal.onclick = function () {
  editModal.style.display = "none";
  deleteModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  } else if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
};

function deleteContact(contactId) {
  const deleteSubmit = document.getElementById("delete-submit");
  let currentContact;

  contactArray.map((i) => {
    if (i.id === contactId) {
      currentContact = i;
    }
  });

  deleteModal.style.display = "block";

  document.getElementById(
    "delete-header"
  ).innerText = `Edit  ${currentContact.name1} contact?`;
  
  deleteSubmit.addEventListener("click", function eventHandler() {
    deleteModal.style.display = "none";

    const foundContactIndex = contactArray.findIndex(
      (value) => value.id === contactId
    );
    contactArray.splice(foundContactIndex, 1);

    localStorage.setItem("contacts-list", JSON.stringify(contactArray));
    refreshTable(contactArray);

    deleteSubmit.removeEventListener("click", eventHandler);
  });
}

class UI {
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
          if (Array.isArray(child[0])) {
            child.map((subChild) => {
              subChild.map((subChild) => element.appendChild(subChild));
            });
            break;
          } else {
            child.map((subChild) => {return element.appendChild(subChild)});
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
      const editLink = ui.elementBuilder(
        "a",
        { href: "#" },
        ui.elementBuilder("img", { src: "img/edit.png" })
      );
      editLink.addEventListener("click", () => {
        editContact(newContact.id);
      });
      const deleteLink = ui.elementBuilder(
        "a",
        { href: "#" },
        ui.elementBuilder("img", { src: "img/delete.png" })
      );
      deleteLink.addEventListener("click", () => {
        deleteContact(newContact.id);
      });

      const trContact = ui.elementBuilder("tr", {}, [
        tdId,
        tdName,
        tdPhone,
        tdEmail,
        editLink,
        deleteLink
      ]);

      trContact.innerHTML += `<a onclick="editContact(${newContact.id})" href="#" id="edit-btn_${newContact.id}">
                    <img src="img/edit.png" alt="" style="height: 20px;"></img>
                </a>`;
      trContact.innerHTML += `<a onclick="deleteContact(${newContact.id})" href="#" id="delete-btn_${newContact.id}">
                    <img src="img/delete.png" alt="" style="height: 20px;"></img>
                </a>`;

      table.appendChild(trContact);
    });
  }

  setCustomAttributes(element, attributes) {
    for (const [key, value] of Object.entries(element, attributes)) {
      element.setAttribute(key, value);
    }
  }
}

const ui = new UI();

class App {
  ui;
  table;

  constructor(UI) {
    this.ui = UI;
    this.getTable();
  }

  getTable() {
    this.table = table = document.querySelector("#tableList tbody");
  }

  initialize() {
    this.ui.renderTable(this.table, contactArray);
  }
}
const app = new App(ui);

app.initialize();


// rewrite edit,  
// get rid of innerHTML in renderTable
// delete html and render all up in js, in body has to be <div>root</div>  
// refactor mentions
// NOT LET, CONST!!!
//