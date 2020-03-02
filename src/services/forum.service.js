//const Database = require("./src/util/database");
class ForumService {
  constructor({ forumCollection, activityCollection }) {
    this.forumCollection = forumCollection;
    this.activityCollection = activityCollection;
  }
  /**
   * get list od all forums available
   */
  listOfForums() {
    console.log("listOfForums", this.forumCollection.find());
    return this.forumCollection.find();
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
        console.log("activity", activity);
        this.listOfForums().filter(data => {
          console.log(datas);
          if (data.id === activity.forumID) {
            datas.push(data);
          }
        });
      });
    return datas;
  }
  createForum(user) {}
  joinForum(user) {}
}
module.exports = ForumService;
