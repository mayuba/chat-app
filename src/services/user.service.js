//const Database = require("./src/util/database");
class UserService {
  constructor({ userCollection }) {
    this.userCollection = userCollection;
  }
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
