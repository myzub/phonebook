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
let contactArray = JSON.parse(localStorage.getItem("contacts-list")  || "[]");
// works that way correctly in case LS is empty
// let contactArray = JSON.parse(localStorage.getItem("contacts-list"))   || "[]"; doesn't work
let editModal = document.getElementById("editModal");
let closeModal = document.getElementsByClassName("closeModal")[0];

function refreshTable(array) {
    document.querySelector("#tableList tbody").innerHTML = "";
    ui.renderTable(table, array);
}

//add
add.addEventListener("click", function () {
    let add = document.getElementById("add");
    const newContact = new Contact(
        document.querySelector("#name1").value,
        document.querySelector("#phone").value,
        document.querySelector("#email").value
    );
        contactArray.push(newContact);  
        localStorage.setItem("contacts-list", JSON.stringify(contactArray));

        //no sense in it, webpage reloads after submit click, renderTable performs
        // table.appendChild(
        //     ui.elementBuilder("tr", {id: "hey", class: "you"}, [
        //         ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.id),
        //         ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.name1),
        //         ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.phone),
        //         ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.email),
        //         // ui.elementBuilder("td", {class: "table-cell", type: "text"}, penIcon),
        //         // ui.elementBuilder("td", {class: "table-cell", type: "text"}, deleteIcon)
        //     ]));
});

//delete all
document.querySelector("#delete").addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.clear();
    contactArray = [];
    refreshTable(contactArray);
})

function searchAny() {
    const searchQuery = document.getElementById("searchbox").value;
    const filteredArray = contactArray.filter(item => {
        return (item.name1.includes(searchQuery) || 
                item.phone.includes(searchQuery) || 
                item.email.includes(searchQuery)); // id comparison?
    });

    refreshTable(filteredArray);
}

function editContact(contactId) {
    let editSubmit = document.getElementById("edit-submit");
    let currentContact;
    let editedContact;
    let indexOfCurrentContact;

    contactArray.map(i => {
        if (i.id === contactId) {
            currentContact = i;
            indexOfCurrentContact = contactArray.indexOf(i);
        }
    });

    editModal.style.display = "block";

    document.getElementById("edit-header").innerText = `Edit  ${currentContact.name1} contact?`;
    
    let editName1 = document.getElementById("edit-name1");
    let editPhone = document.getElementById("edit-phone");
    let editEmail = document.getElementById("edit-email");

    editName1.value = currentContact.name1;
    editPhone.value = currentContact.phone;
    editEmail.value = currentContact.email;
    editedContact = currentContact;

    editSubmit.addEventListener("click", function () {
        editModal.style.display = "none";

        editedContact.name1 = editName1.value;
        editedContact.phone = editPhone.value;
        editedContact.email = editEmail.value;

        contactArray.splice(indexOfCurrentContact, 1, editedContact);

        localStorage.setItem("contacts-list", JSON.stringify(contactArray));
        refreshTable(contactArray);
    }); 
}

closeModal.onclick = function() {
    editModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
}

function deleteContact(contactId) {
    let currentContact;
    contactArray.map(i => {
        if (i.id === contactId) {
            currentContact = i;
        }
    });

    if(confirm(`Delete ${currentContact.name1}?`)) {
        const foundContactIndex = contactArray.findIndex(value => value.id === contactId);
        contactArray.splice(foundContactIndex, 1);
        
        localStorage.setItem("contacts-list", JSON.stringify(contactArray));
        refreshTable(contactArray);
    }
}

class UI {
    elementBuilder (tagName, attributes, child) {
        const element = document.createElement(tagName);

        ui.setCustomAttributes(element, attributes);
        
        switch (typeof child) {
            case 'string':
                element.appendChild(document.createTextNode(`${child}`));
                break;
            case 'number':
                element.appendChild(document.createTextNode(`${child}`));
                break;  
            case 'object':
                if (Array.isArray(child)) {
                    if (Array.isArray(child[0])) {
                        child.map(subChild => {
                            subChild.map(subChild => element.appendChild(subChild));
                        });
                    break;
                    } else {
                        child.map(subChild => element.appendChild(subChild));
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
        contacts.map(newContact => {
            let tdId = ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.id);
            let tdName = ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.name1);
            let tdPhone = ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.phone);
            let tdEmail = ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.email);

            let trContact = ui.elementBuilder("tr", {}, [tdId, tdName, tdPhone, tdEmail]);

            trContact.innerHTML +=
                `<a onclick="editContact(${newContact.id})" href="#" id="edit-btn_${newContact.id}">
                    <img src="img/edit.png" alt="" style="height: 20px;"></img>
                </a>`;
            trContact.innerHTML +=
                `<a onclick="deleteContact(${newContact.id})" href="#" id="delete-btn_${newContact.id}">
                    <img src="img/delete.png" alt="" style="height: 20px;"></img>
                </a>`;
            
            table.appendChild(trContact);
        });
    }

    // renderLink (btnType, contact) {
    //     let link = ui.elementBuilder(
    //         "a", {
    //         onclick: `${btnType}Contact()`,
    //         href: "#", 
    //         id: `${btnType}-link`},
    //     );
    //     return link;
    // }

    // renderIcon (iconType) {
    //     let icon = document.createElement("img");
    //     let iconAttributes = {
    //         class: "table-btn",
    //         src: `img/${iconType}.png`, 
    //         alt: "#", 
    //         style: "height: 20px;"};

    //     ui.setCustomAttributes(icon, iconAttributes);

    //     return icon;
    // }

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
