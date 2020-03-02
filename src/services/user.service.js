//const Database = require("./src/util/database");
class UserService {
  constructor({ userCollection }) {
    this.userCollection = userCollection;
  }
  UserInfo(userId) {
    console.log(userId);
    return this.userCollection.find().map(data => (data.id = userId));
  }
  SendMessage(user) {
    this.userCollection.insert({ user: "a" });
  }
  createForum(user) {}
  joinForum(user) {}
}
module.exports = UserService;
