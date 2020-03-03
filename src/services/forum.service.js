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
    let ids = [];
    this.activityCollection.find().map(data => {
      if (data.forumID === forumID) {
        ids.push(data.userID);
      }
    });
    return ids;
  }
  /**
   * Check if users id member of forum
   * @param {*} UserID
   * @param {*} forumID
   */
  isMemberOfForum(UserID, forumID) {
    let datas = [];
    this.activityCollection.find().map(data => {
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
        this.listOfForums().map(data => {
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
  createForum({ name, userID, type }) {
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
        createDate: new Date(),
        type: type
      });
      if (data) {
        this.joinForum({ forumID: id, userID, role: "ADMIN" });
        return data;
      }
    }
  }

  /**
   * Join this forum with id
   * @param {} param0
   */
  joinForum({ userID, forumID, role }) {
    const duplicat = this.activityCollection
      .find()
      .filter(data => data.userID === userID && data.forumID === forumID);
    if (duplicat.length > 0) {
      throw new Error(`The user ${userID} has already joined ${forumID}`);
    } else {
      const data = this.activityCollection.insert({
        id: uniqid.time(),
        userID: userID,
        forumID: forumID,
        role: role ? role : "USER",
        addedDate: new Date()
      });
      if (data) {
        return "you are now join in the forum";
      }
    }
  }
}
module.exports = ForumService;
