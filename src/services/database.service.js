class Database {
  constructor() {
    data = {};
  }

  insert(data) {
    this.data.push(data);
  }
  find() {
    return this.data.find(data => data);
  }
}
