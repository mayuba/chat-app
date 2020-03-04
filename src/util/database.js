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
  /**
   * Update data
   * @param {*} key
   * @param {*} data
   */
  updateStatus(index, value) {
    this.data[index].status = value;
    return `status change for ${value}`;
  }
}
module.exports = Database;
