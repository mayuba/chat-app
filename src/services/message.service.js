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
      senderID: userID,
      forumID: forumID
    });
  }

  getMessagesByForum({ forumID }) {
    return this.messageCollection
      .find()
      .filter(data => data.forumID === forumID);
  }
}
module.exports = MessageService;
