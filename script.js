"use strict";
class Contact {
    constructor(name1, phone, email) {
        this.id = Date.now();
        this.name1 = name1;
        this.phone = phone;
        this.email = email;
      }
}

let contactArray = JSON.parse(localStorage.getItem("contacts-list"))  || "[]";
let table = document.querySelector("#tableList tbody"); // we initialize table in  render?

//add
document.querySelector("#input-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const newContact = new Contact(
        document.querySelector("#name1").value,
        document.querySelector("#phone").value,
        document.querySelector("#email").value
    );

    contactArray.push(newContact);  
    localStorage.setItem("contacts-list", JSON.stringify(contactArray));

    const row = document.createElement("tr"),
        cell1 = document.createElement("td"),
        cell2 = document.createElement("td"),
        cell3 = document.createElement("td"),
        cell4 = document.createElement("td");

    cell1.innerText = newContact.id;
    cell2.innerText = newContact.name1;
    cell3.innerText = newContact.phone;
    cell4.innerText = newContact.email;

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    table.appendChild(row);
});

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
    createElement (tagName, options, children) {
        const elemet = document.createElement(tagName);
        console.log(elemet);
        // Object.keys, Object.entries
        // use setAttribute in a cycle
        // add condtion to the cihldren type. String, HTMLElement, Array<HTMLElement>
        elemet.createAttribute(JSON.stringify(options));
        elemet.appendChild(children);

        return elemet;
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
