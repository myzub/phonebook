"use strict";

class Contact {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}
// can I make them const?
let table;
let contacts;
let editModalDiv = window.editModalDiv;
let deleteModalDiv = window.deleteModalDiv;
let closeEditModalButton = window.closeEditModalButton;
let closeDeleteModalButton = window.closeDeleteModalButton;

function clearTable() {
  document.querySelector("#tableList").innerHTML = "";
}

function refreshTable(contacts) {
  clearTable();
  ui.renderTable(table, contacts);
}

add.addEventListener("click", function (event) {
  event.preventDefault();
  const newContact = new Contact(
    document.querySelector("#name").value,
    document.querySelector("#phone").value,
    document.querySelector("#email").value
  );


  app.postContact(newContact);
  clearTable();
});

//delete all
/*
document
  .querySelector("#deleteAll")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // delete request is missing
    // contacts = [];
    refreshTable(contacts);
  });
*/

// searchAny
/*
function searchAny() {
  const searchQuery = document.getElementById("searchbox").value;
  const filteredArray = contacts.filter((item) => {
    return (
      item.name.includes(searchQuery) ||
      item.phone.includes(searchQuery) ||
      item.email.includes(searchQuery)
    );
  });

  refreshTable(filteredArray);
}
*/

function editContact(contactId) {
  app.fetchOneContact(contactId);
}

function deleteModal() {
  const deleteSubmit = document.getElementById("deleteSubmit");
  let currentContact = app.contacts.find((item) => app.selectedId === item.id);

  deleteModalDiv.style.display = "block";

  document.getElementById(
    "deleteHeader"
  ).innerText = `Delete  ${currentContact.name} contact?`;

  deleteSubmit.addEventListener("click", () => {
    deleteModalDiv.style.display = "none";
    app.deleteContactById(currentContact.id);
  });
}

// click anywhere to close modal
// window.onclick = function (event) {
//   if (event.target === editModalDiv) {
//     editModalDiv.style.display = "none";
//   } else if (event.target === deleteModalDiv) {
//     deleteModalDiv.style.display = "none";
//   }
// };

// click on X edit modal window
closeEditModalButton.onclick = function () {
  editModalDiv.style.display = "none";
};
closeEditModalButton.addEventListener("click", function eventHandler() {});

// click on X delete
closeDeleteModalButton.onclick = function () {
  deleteModalDiv.style.display = "none";
};
closeDeleteModalButton.addEventListener("click", function eventHandler() {});

const getRemoveListenerFunction = ({ eventType, element, callback }) => {
  element.removeEventListener(eventType, callback);
};
