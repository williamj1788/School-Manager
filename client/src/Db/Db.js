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
        const oldDatabase = event.currentTarget.result; // don't use this.db because it won't be set here
        if (event.oldVersion < 1) {
          oldDatabase.createObjectStore("classes", { keyPath: "_id" });
        }
      };
    });
  }

  createClass(form) {
    return new Promise((resolve, reject) => {
      const newClass = {
        _id: uuid(),
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
