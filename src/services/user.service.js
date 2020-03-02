//const Database = require("./src/util/database");
class UserService {
  constructor({ userCollection }) {
    this.userCollection = userCollection;
  }
  UserInfo(userId) {
    return this.userCollection.find().map(data => (data.id = userId));
  }
}
module.exports = UserService;
