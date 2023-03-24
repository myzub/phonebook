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
let editModalDiv = window.editModalDiv;
let deleteModalDiv = window.deleteModalDiv;
let closeEditModalButton = window.closeEditModalButton;
let closeDeleteModalButton = window.closeDeleteModalButton;

function refreshTable(array) {
  document.querySelector("#tableList").innerHTML = "";
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
document
  .querySelector("#deleteAll")
  .addEventListener("click", function (event) {
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
  let editSubmit = document.getElementById("editSubmit");
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

  editModalDiv.style.display = "block";

  document.getElementById(
    "editHeader"
  ).innerText = `Edit  ${currentContact.name1} contact?`;

  let editName1 = document.getElementById("editName1");
  let editPhone = document.getElementById("editPhone");
  let editEmail = document.getElementById("editEmail");

  editName1.value = currentContact.name1;
  editPhone.value = currentContact.phone;
  editEmail.value = currentContact.email;
  editedContact = currentContact;

  editSubmit.addEventListener("click", function eventHandler() {
    editModalDiv.style.display = "none";

    editedContact.name1 = editName1.value;
    editedContact.phone = editPhone.value;
    editedContact.email = editEmail.value;

    // filter method, not splice
    contactArray.splice(indexOfCurrentContact, 1, editedContact);

    localStorage.setItem("contacts-list", JSON.stringify(contactArray));
    refreshTable(contactArray);

    editSubmit.removeEventListener("click", eventHandler);
  });
}

const getRemoveListenerFunction = ({ eventType, element, callback }) => {
  element.removeEventListener(eventType, callback);
  
};
//click on X edit
closeEditModalButton.onclick = function () {
  editModalDiv.style.display = "none";
};

closeEditModalButton.addEventListener("click", function eventHandler() {});

// click anywhere to close modal
window.onclick = function (event) {
  if (event.target == editModalDiv) {
    editModalDiv.style.display = "none";
  } else if (event.target == deleteModalDiv) {
    deleteModalDiv.style.display = "none";
  }
};

function removeContact() {
  // TODO make with filter
  const foundContactIndex = contactArray.findIndex(
    (value) => value.id === app.selectedId
  );
  contactArray.splice(foundContactIndex, 1);
  
  deleteModalDiv.style.display = "none";

  localStorage.setItem("contacts-list", JSON.stringify(contactArray));
  refreshTable(contactArray);
}

function deleteContact() {
  const deleteSubmit = document.getElementById("deleteSubmit");
  let currentContact;

  contactArray.map((i) => {
    if (i.id === app.selectedId) {
      currentContact = i;
    }
  });

  deleteModalDiv.style.display = "block";

  document.getElementById(
    "deleteHeader"
  ).innerText = `Edit  ${currentContact.name1} contact?`;

  deleteSubmit.addEventListener("click", removeContact);
}

//click on X delete
closeDeleteModalButton.onclick = function () {
  deleteModalDiv.style.display = "none";
};
closeDeleteModalButton.addEventListener("click", function eventHandler() {});

/*
rewrite edit,
refactor mentions
NOT LET, CONST!!!
event listener vs onclick
*/
