class Api {
  origin;

  constructor(origin) {
    this.origin = origin;
  }

  _request(method, URL, body, { onSuccess, onError }) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, URL);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    const requestBody = method === "GET" ? null : JSON.stringify(body);
    xhr.send(requestBody);

    xhr.onload = () => {
      switch (true) {
        case xhr.readyState === 4 && xhr.status === 200:
          return onSuccess(JSON.parse(xhr.response));

        case xhr.readyState === 4 && [404, 500, 400].includes(xhr.status):
          return onError(JSON.parse(xhr.response));
        default:
          console.log(JSON.parse(xhr.responseText));
      }
    };
  }

  getAllContacts({ onSuccess, onError }) {
    this._request("GET", `${this.origin}/phonebook`, undefined, {
      onSuccess,
      onError,
    });
  }

  getContactById(contactId, { onSuccess, onError }) {
    this._request("GET", `${this.origin}/phonebook/${contactId}`, undefined, {
      onSuccess,
      onError,
    });
  }

  postNewContact(newContact, { onSuccess, onError }) {
    this._request("POST", `${this.origin}/phonebook/`, newContact, {
      onSuccess,
      onError,
    });
  }

  updateContact(contact, { onSuccess, onError }) {
    this._request("PUT", `${this.origin}/phonebook/${contact.id}`, contact, {
      onSuccess,
      onError,
    });
  }

  deleteContact(contactId, { onSuccess, onError }) {
    this._request("DELETE", `${this.origin}/phonebook/${contactId}`, undefined, {
      onSuccess,
      onError,
    });
  }
}

const origin = "http://localhost:8080";
const api = new Api(origin);

window.API = api;
