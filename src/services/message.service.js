const uniqid = require("uniqid");
class MessageService {
  constructor({ messageCollection }) {
    this.messageCollection = messageCollection;
  }
  /**
   * create new message
   * @param {*} param0
   */
  createMessage({ message, userID, forumID }) {
    return this.messageCollection.insert({
      id: uniqid.time(),
      message: message,
      date: new Date(),
      senderID: userID,
      forumID: forumID
    });
  }
  /**
   * get message by forum specific
   * @param {*} param0
   */

  getMessagesByForum({ forumID }) {
    return this.messageCollection
      .find()
      .filter(data => data.forumID === forumID);
  }
}
module.exports = MessageService;
