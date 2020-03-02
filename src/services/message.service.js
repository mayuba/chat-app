//const Database = require("./src/util/database");

class MessageService {
  constructor({ messageCollection }) {
    this.messageCollection = messageCollection;
  }
  createMessage({ input }) {
    return this.messageCollection.insert({
      message: input.message,
      date: new Date(),
      senderId: input.userID,
      forumId: input.forumID
    });
  }
  createForum(user) {}
  joinForum(user) {}
}
module.exports = MessageService;
