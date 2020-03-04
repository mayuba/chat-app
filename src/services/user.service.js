class UserService {
  constructor({ userCollection }) {
    this.userCollection = userCollection;
  }
  /**
   * get all infos for a user
   * @param {*} userId
   */
  UserInfo(userId) {
    let datas = [];
    this.userCollection.find().map(data => {
      if (data.id === userId) {
        datas.push(data);
      }
    });
    return datas;
  }
}
module.exports = UserService;
