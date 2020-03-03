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
  createForum(input) {
    return this.forumCollection.insert({
      id: uniqid.time(),
      name: input.userID,
      createDate: new Date()
    });
  }
  joinForum({ userID, forumID }) {
    return this.forumCollection.insert({
      id: uniqid.time(),
      userID: userID,
      forumID: forumID,
      createDate: new Date()
    });
  }
}
module.exports = ForumService;
