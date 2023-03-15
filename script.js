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
// works that way correctly in case LS is empty
let contactArray = JSON.parse(localStorage.getItem("contacts-list")  || "[]");
// let contactArray = JSON.parse(localStorage.getItem("contacts-list"))   || "[]"; doesn't work


//add
function addNewContact() {
    const newContact = new Contact(
        document.querySelector("#name1").value,
        document.querySelector("#phone").value,
        document.querySelector("#email").value
    );
        contactArray.push(newContact);  
        localStorage.setItem("contacts-list", JSON.stringify(contactArray));

        table.appendChild(
            ui.elementBuilder("tr", {id: "hey", class: "you"}, [
                ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.id),
                ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.name1),
                ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.phone),
                ui.elementBuilder("td", {class: "table-cell", type: "text"}, newContact.email),
            ]));
};

//delete all
document.querySelector("#delete").addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.clear();
    contactArray = [];
    document.querySelector("#tableList tbody").innerHTML = "";
})

function searchAny() {
    const searchQuery = document.getElementById("searchbox").value;
    const filteredArray = contactArray.filter(item => {
        return (item.name1.includes(searchQuery) || 
                item.phone.includes(searchQuery) || 
                item.email.includes(searchQuery)); // id comparison?
    });

    ui.renderTable(table, 
        (filteredArray.length === 0 && searchQuery === "" ? contactArray : filteredArray));

}

class UI {
    elementBuilder (tagName, attributes, child) {
        const element = document.createElement(tagName);
        
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        
        switch (typeof child) {
            case 'string':
                element.appendChild(document.createTextNode(`${child}`));
                break;
            case 'number':
                element.appendChild(document.createTextNode(`${child}`));
                break;
            case 'object':
                child.map(subChild => element.appendChild(subChild));
                break;
            default:
                break;
        }

        return element;
    }

    renderTable(table, contacts) {
            table.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.id}</td>
            <td>${contact.name1}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
        </tr>`)
        .join('');
        
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
