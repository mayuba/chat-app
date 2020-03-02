class Database {
  constructor() {
    this.data = {};
  }

  insert(data) {
    this.data.push(data);
  }
  find() {
    return this.data.find(data => data);
  }
}
module.exports = Database;
