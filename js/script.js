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
// separate delete and edit
let closeModal = document.getElementsByClassName("close-modal")[0];

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
document.querySelector("#deleteAll").addEventListener("click", function (event) {
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

  editModal.style.display = "block";

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
// separate delete and edit
closeModal.addEventListener("click", function eventHandler() {});
// separate delete and edit
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
  const deleteSubmit = document.getElementById("deleteSubmit");
  let currentContact;

  console.log(app.selectedId, "selectedId");
  contactArray.map((i) => {
    if (i.id === app.selectedId) {
      currentContact = i;
    }
  });

  deleteModal.style.display = "block";

  document.getElementById(
    "deleteHeader"
  ).innerText = `Edit  ${currentContact.name1} contact?`;

  deleteSubmit.addEventListener("click", removeContact);
}

/*
rewrite edit,
get rid of innerHTML in renderTable  ??
delete html and render all up in js, in body has to be <div>root</div>
refactor mentions
NOT LET, CONST!!!
event listener vs onclick

!!! in new js file
renderHeader
renderForm
*/