//const Database = require("./src/util/database");
const uniqid = require("uniqid");
class ForumService {
  constructor({ forumCollection, activityCollection }) {
    this.forumCollection = forumCollection;
    this.activityCollection = activityCollection;
  }
  /**
   * get list od all forums available
   */
  listOfForums() {
    return this.forumCollection.find();
  }

  MemberOfForum(UserID, forumID) {
    const datas = [];
    this.activityCollection.find().filter(data => {
      console.log(UserID, forumID, data);
      if (data.forumID === forumID && data.userID === UserID) {
        datas.push(data);
      }
    });
    return datas;
  }
  /**
   * giving list of client forum
   * @param {*} userID
   */
  ActivityOfForums(userID) {
    const datas = [];
    this.activityCollection
      .find()
      .filter(data => data.userID === userID)
      .map(activity => {
        this.listOfForums().filter(data => {
          if (data.id === activity.forumID) {
            datas.push(data);
          }
        });
      });
    return datas;
  }
  createForum({ input }) {
    return this.forumCollection.insert({
      id: uniqid.time(),
      message: input.message,
      date: new Date(),
      senderId: input.userID,
      forumId: input.forumID
    });
  }
  joinForum({ input }) {
    return this.forumCollection.insert({
      id: uniqid.time(),
      userID: input.userID,
      forumID: input.forumID,
      addedDate: new Date()
    });
  }
}
module.exports = ForumService;
