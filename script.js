"use strict";

class Contact {
    constructor(name1, phone, email) {
        this.id = Date.now();
        this.name1 = name1;
        this.phone = phone;
        this.email = email;
      }
}

let table = document.querySelector("#tableList tbody");
let contactArray = JSON.parse(localStorage.getItem("contacts list"))  || "[]";

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
        return (item.name1 === searchQuery || 
                item.phone === searchQuery || 
                item.email === searchQuery); // id?
    });
    if (filteredArray.length === 0) {
        table.innerHTML = contactArray.map(contact => `
    <tr>
        <td>${contact.id}</td>
        <td>${contact.name1}</td>
        <td>${contact.phone}</td>
        <td>${contact.email}</td>
    </tr>`)
    .join('');
    } else {
        table.innerHTML = filteredArray.map(contact => `
    <tr>
        <td>${contact.id}</td>
        <td>${contact.name1}</td>
        <td>${contact.phone}</td>
        <td>${contact.email}</td>
    </tr>`)
    .join('');
    }
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














// adding without local storage ----------------
/*document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    let tr = document.createElement("tr");
    let row = ["name", "phone", "mail"];

    for(let i = 0; i < row.length; ++i) {
        let td = document.createElement("td");
        td.textContent = document.getElementById(row[i]).value;
        tr.appendChild(td);
    }
    
    document.querySelector("#tableList tbody").appendChild(tr);
    //TODO: clean input field after add click
});
*/


// приложение должно состоять из 3 уровней(классов)
// 1. уровень данных - тут есть класс Контакт
// (который описывает поля одного контакта) и 
// класс для управления контактами
// (класс который является надстройкой над массивом контактов) 
// класс управления внутри содержит массив контактов и 
// содержит методы для добавления и удаления контакта, 
// получить список контактов по фрагменту строки
// (и возвращает все если строка пустая)

// 2. уровень логики
// уровень бизнес логики это уровень общего взаимодействия. 
// тут используя класс данных и класс графики создается 
// взаимодействие между всеми компонентами. этот класс 
// является точкой входа в нем находятся 
// обработчики всех событий(из UI класса);

// 3. уровень графики(UI) - уровень графики содержит инструменты, 
// которые умеют строить html таблицу с контактами, получать данные с 
// текстовых полей и пробрасывает события от элемeтов выше 
