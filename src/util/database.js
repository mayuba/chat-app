const sample = require("../fixtures/sample.json");
class Database {
  constructor(collectionName) {
    this.data = sample[collectionName];
  }

  insert(data) {
    this.data.push(data);
  }
  find() {
    return this.data.map(data => data);
  }
}
module.exports = Database;
