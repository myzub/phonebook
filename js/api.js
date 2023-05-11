class Api {
  origin;

  constructor(origin) {
    this.origin = origin;
  }

  async _request(method, URL, body) {
    const requestBody = method === "GET" ? null : JSON.stringify(body);
    return fetch(URL, {
      method: method,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: requestBody,
    });
  }
  /*
  _requestXmlHttpReqestWithPromise(method, URL, body) {
    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.open(method, URL);
      xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

      const requestBody = method === "GET" ? null : JSON.stringify(body);
      xhr.send(requestBody);

      xhr.onload = () => {
        switch (true) {
          case xhr.readyState === 4 && xhr.status === 200:
            resolve(JSON.parse(xhr.response));

          case xhr.readyState === 4 && [404, 500, 400].includes(xhr.status):
            reject(JSON.parse(xhr.response));
          default:
            console.log(JSON.parse(xhr.responseText));
        }
      };
    });
  }
  _requestWithCallbacks(method, URL, body, { onSuccess, onError }) {
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
*/

  async getAllContacts() {
    return this._request("GET", `${this.origin}/phonebook`, undefined);
  }

  async getContactById(contactId) {
    return this._request(
      "GET",
      `${this.origin}/phonebook/${contactId}`,
      undefined
    );
  }

  async postNewContact(newContact) {
    return this._request("POST", `${this.origin}/phonebook/`, newContact);
  }

  async updateContact(contact) {
    return this._request(
      "PUT",
      `${this.origin}/phonebook/${contact.id}`,
      contact
    );
  }

  async deleteContact(contactId) {
    return this._request(
      "DELETE",
      `${this.origin}/phonebook/${contactId}`,
      undefined
    );
  }
}

const origin = "http://localhost:8080";
const api = new Api(origin);

window.API = api;
