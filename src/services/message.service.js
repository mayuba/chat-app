//const Database = require("./src/util/database");
class MessageService {
  constructor(messageCollection) {
    this.messageCollection = messageCollection;
  }
  SendMessage(user) {
    this.messageCollection.insert({ user: "a" });
  }
  createForum(user) {}
  joinForum(user) {}
}
module.exports = MessageService;
