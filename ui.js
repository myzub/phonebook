class UI {
  constructor() {

  }


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

      const deleteImg = ui.elementBuilder("img", { src: "img/delete.png", style: "height: 20px;" });
      const editImg = ui.elementBuilder("img", { src: "img/edit.png", style: "height: 20px;" });

      const editLink = ui.elementBuilder("a", { href: "#" }, editImg);

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

      table.appendChild(trContact);
    });
  }

  root = document.getElementById("root");

  renderForm() { }

  renderTableHeader() { }

  renderEditModal() { }

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

window.UI = ui;