/**
 * Simulation database
 */
const sample = require("../fixtures/sample.json");
class Database {
  constructor(collectionName) {
    this.data = sample[collectionName];
  }
  /**
   * Insert data
   * @param {*} data
   */
  insert(data) {
    this.data.push(data);
    return data;
  }

  /**
   * Find data
   */
  find() {
    return this.data.map(data => data);
  }
}
module.exports = Database;
