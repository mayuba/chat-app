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
  /**
   * get Members of forum
   * @param {*} forumID
   */
  getMembers(forumID) {
    let datas = [];
    this.activityCollection.find().filter(data => {
      if (data.forumID === forumID) {
        datas.push(data.userID);
      }
    });
    return datas;
  }
  /**
   * Check if users id member of forum
   * @param {*} UserID
   * @param {*} forumID
   */
  isMemberOfForum(UserID, forumID) {
    let datas = [];
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
    let datas = [];
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
  /**
   * Create new forum and join automatically
   * @param {*} param0
   */
  createForum({ name, userID }) {
    const id = uniqid.time();
    const duplicat = this.forumCollection
      .find()
      .filter(data => data.name === name);
    if (duplicat.length > 0) {
      throw new Error(
        `The forum name ${name} is exist. please create new forum name`
      );
    } else {
      const data = this.forumCollection.insert({
        id: id,
        name: name,
        createDate: new Date()
      });
      if (data) {
        this.joinForum({ forumID: id, userID });
        return data;
      }
    }
  }

  /**
   * Join this forum with id
   * @param {} param0
   */
  joinForum({ userID, forumID }) {
    return this.activityCollection.insert({
      id: uniqid.time(),
      userID: userID,
      forumID: forumID,
      createDate: new Date()
    });
  }
}
module.exports = ForumService;
