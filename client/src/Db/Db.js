import uuid from "uuid/v4";

class Db {
  constructor() {
    this.isInit = false;
  }
  init() {
    if (this.isInit) {
      return Promise.resolve(); // must keep the function async
    }
    return new Promise((resolve, reject) => {
      const req = indexedDB.open("classesDB", 1);

      req.onsuccess = () => {
        this.db = req.result;
        this.isInit = true;
        resolve();
      };

      req.onerror = err => {
        reject(err);
      };

      req.onupgradeneeded = event => {
        if (event.oldVersion < 1) {
          this.db.createObjectStore("classes", { keyPath: "id" });
        }
      };
    });
  }

  createClass(form) {
    return new Promise((resolve, reject) => {
      const newClass = {
        id: uuid(),
        ...form
      };

      const transaction = this.db.transaction("classes", "readwrite");

      const classes = transaction.objectStore("classes");

      const req = classes.add(newClass);

      req.onsuccess = () => {
        resolve(newClass);
      };

      req.onerror = err => {
        reject(err);
      };
    });
  }
}

export default new Db();
