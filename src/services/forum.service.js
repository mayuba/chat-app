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
        this.joinForum({
          forumID: id,
          userID,
          role: "ADMIN",
          status: "approved"
        });
        return data;
      }
    }
  }

  /**
   * Join this forum with id
   * @param {} param0
   */
  joinForum({ userID, forumID, role, status }) {
    let myreturn = "";
    const duplicat = this.activityCollection
      .find()
      .filter(data => data.userID === userID && data.forumID === forumID);

    if (duplicat.length > 0) {
      throw new Error(
        `The user ${userID} has already joined ${forumID}, if forum is private please waiting approved`
      );
    } else {
      this.forumCollection.find().map(data => {
        if (data.id === forumID && data.type === "PRIVATE") {
          const data = this.activityCollection.insert({
            id: uniqid.time(),
            userID: userID,
            forumID: forumID,
            role: role ? role : "USER",
            status: status ? status : "waiting"
          });
          if (data) {
            myreturn =
              "your request was sent with status waiting, please wait to approved";
          }
        } else if (data.id === forumID && data.type === "PUBLIC") {
          const data = (myreturn = this.activityCollection.insert({
            id: uniqid.time(),
            userID: userID,
            forumID: forumID,
            role: role ? role : "USER",
            status: status ? status : "approved"
          }));
          if (data) {
            myreturn = "you are join now in forum";
          }
        }
      });
    }
    return myreturn;
  }
  /**
   * admin can change status of request to join forum
   * @param {*} param0
   */
  changeStatus({ adminID, userID, forumID, newStatus }) {
    const all = this.activityCollection.find();
    const admin = all.filter(
      data =>
        data.userID === adminID &&
        data.forumID === forumID &&
        data.role === "ADMIN"
    );
    for (var i in all) {
      if (admin[0]) {
        if (
          all[i].userID == userID &&
          all[i].forumID === forumID &&
          (all[i].status === "waiting" || all[i].status === "refused")
        ) {
          return this.activityCollection.updateStatus(i, newStatus);
        } else if (
          all[i].userID == userID &&
          all[i].forumID === forumID &&
          all[i].status === "approved"
        ) {
          throw new Error(`The user ${userID} has already joined ${forumID}`);
        }
      } else {
        throw new Error(`you are not admin`);
      }
    }
  }
}
module.exports = ForumService;
