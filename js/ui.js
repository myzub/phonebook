class UI {
  constructor() {}

  root = document.getElementById("root");

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

  renderForm() {
    const inputSearch = ui.elementBuilder("input", {
      name: "search",
      id: "searchbox",
      placeholder: "search",
      onInput: "searchAny()", // TODO rewrite as eventListener
    });
    const br = ui.elementBuilder("br", {});
    const inputname = ui.elementBuilder("input", {
      type: "text",
      name: "name",
      id: "name",
      placeholder: "name",
      value: "",
    });
    const inputPhone = ui.elementBuilder("input", {
      type: "text",
      name: "phone",
      id: "phone",
      placeholder: "phone",
      value: "",
    });
    const inputEmail = ui.elementBuilder("input", {
      type: "text",
      name: "email",
      id: "email",
      placeholder: "email",
      value: "",
    });
    const addContactSubmit = ui.elementBuilder("input", {
      type: "submit",
      id: "add",
    });
    const deleteAllButton = ui.elementBuilder(
      "button",
      {
        type: "button",
        id: "deleteAll",
      },
      "Delete all"
    );
    const inputForm = ui.elementBuilder("form", { id: "inputForm" }, [
      inputSearch,
      br,
      inputname,
      inputPhone,
      inputEmail,
      addContactSubmit,
      deleteAllButton,
    ]);
    document.body.appendChild(inputForm);
    document.body.appendChild(br);
  }

  renderTableHeader() {
    const thName = ui.elementBuilder("th", {}, "name");
    const thPhone = ui.elementBuilder("th", {}, "phone");
    const thEmail = ui.elementBuilder("th", {}, "email");
    const tr = ui.elementBuilder("tr", {}, [thName, thPhone, thEmail]);
    const thead = ui.elementBuilder("thead", {}, [tr]);
    const tbody = ui.elementBuilder("tbody", { id: "tableList" });
    const tableList = ui.elementBuilder("table", {}, [thead, tbody]);
    document.body.appendChild(tableList);
  }

  renderTable(tableList, contacts) {
    tableList = document.getElementById("tableList");
    contacts.map((newContact) => {
      // const tdId = ui.elementBuilder(
      //   "td",
      //   { class: "table-cell", type: "text" },
      //   newContact.id
      // );
      const tdName = ui.elementBuilder(
        "td",
        { class: "table-cell", type: "text" },
        newContact.name
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
      const deleteImg = ui.elementBuilder("img", {
        src: "img/delete.png",
        style: "height: 20px;",
      });
      const editImg = ui.elementBuilder("img", {
        src: "img/edit.png",
        style: "height: 20px;",
      });
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
        deleteModal();
      });
      const trContact = ui.elementBuilder("tr", {}, [
        /*tdId,*/
        tdName,
        tdPhone,
        tdEmail,
        tdEditLink,
        tdDeleteLink,
      ]);
      tableList.appendChild(trContact);
    });
  }

  renderEditModal() {
    const closeEditModalButton = ui.elementBuilder(
      "span",
      { id: "closeEditModalButton", class: "close-modal" },
      "X"
    );
    const editHeader = ui.elementBuilder("h2", { id: "editHeader" });
    const modalHeader = ui.elementBuilder(
      "div",
      { id: "modalHeader", class: "modal-header" },
      [closeEditModalButton, editHeader]
    );
    const inputName = ui.elementBuilder("input", {
      type: "text",
      name: "name",
      id: "editName",
      placeholder: "name",
      value: "",
    });
    const inputPhone = ui.elementBuilder("input", {
      type: "text",
      name: "phone",
      id: "editPhone",
      placeholder: "phone",
      value: "",
    });
    const inputEmail = ui.elementBuilder("input", {
      type: "text",
      name: "email",
      id: "editEmail",
      placeholder: "email",
      value: "",
    });
    const modalBody = ui.elementBuilder("div", { class: "modal-body" }, [
      inputName,
      inputPhone,
      inputEmail,
    ]);
    const inputNewContactSubmit = ui.elementBuilder("input", {
      type: "submit",
      id: "editSubmit",
    });
    const modalFooter = ui.elementBuilder("div", { class: "modal-footer" }, [
      inputNewContactSubmit,
    ]);
    const modalContent = ui.elementBuilder("div", { class: "modal-content" }, [
      modalHeader,
      modalBody,
      modalFooter,
    ]);
    const editModalDiv = ui.elementBuilder(
      "div",
      { id: "editModalDiv", class: "modal" },
      [modalContent]
    );
    document.body.appendChild(editModalDiv);
  }

  renderDeleteModal() {
    const closeDeleteModalButton = ui.elementBuilder(
      "span",
      { id: "closeDeleteModalButton", class: "close-modal" },
      "X"
    );
    const deleteHeader = ui.elementBuilder("h2", { id: "deleteHeader" });
    const modalHeader = ui.elementBuilder("div", { class: "modal-header" }, [
      closeDeleteModalButton,
      deleteHeader,
    ]);
    const deleteSubmit = ui.elementBuilder("input", {
      type: "submit",
      id: "deleteSubmit",
    });
    const modalFooter = ui.elementBuilder("div", { class: "modal-footer" }, [
      deleteSubmit,
    ]);
    const modalBody = ui.elementBuilder("div", { class: "modal-body" });
    const modalContent = ui.elementBuilder("div", { class: "modal-content" }, [
      modalHeader,
      modalBody,
      modalFooter,
    ]);
    const deleteModalDiv = ui.elementBuilder(
      "div",
      {
        id: "deleteModalDiv",
        class: "modal",
      },
      [modalContent]
    );
    document.body.appendChild(deleteModalDiv);
  }
}

const ui = new UI();

window.UI = ui;
