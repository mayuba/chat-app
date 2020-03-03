const uniqid = require("uniqid");
class MessageService {
  constructor({ messageCollection }) {
    this.messageCollection = messageCollection;
  }
  createMessage({ message, userID, forumID }) {
    return this.messageCollection.insert({
      id: uniqid.time(),
      message: message,
      date: new Date(),
      senderId: userID,
      forumId: forumID
    });
  }

  getMessagesByForum(forumID) {
    return this.messageCollection.filter(data => data.forumId === forumID);
  }
}
module.exports = MessageService;
