class Query {
  constructor({ forumService, messageService, userService }) {
    this.forumService = forumService;
    this.messageService = messageService;
    this.userService = userService;
  }
  /**
   * get all forums data
   */
  forum() {
    let datas = [];
    this.forumService.listOfForums().map(data => {
      const { id, name, createDate } = data;
      const members = this.forumService.getMembers(data.id).map(id => {
        return this.userService.UserInfo(id)[0];
      });
      datas.push({
        id,
        name,
        createDate,
        members
      });
    });
    return datas;
  }
  /**
   * get all forum the user has joined
   * @param {*} args
   */
  forumHasJoined(args) {
    let datas = [];
    const userID = args.userID;
    this.forumService.ActivityOfForums(userID).map(data => {
      const { id, name, createDate } = data;
      const members = this.forumService.getMembers(data.id).map(id => {
        return this.userService.UserInfo(id)[0];
      });
      datas.push({
        id,
        name,
        createDate,
        members
      });
    });
    return datas;
  }
  /**
   * Get message by forumID and check if user is member of forum
   * @param {*} args
   */
  getMessage(args) {
    const isMember = this.forumService.isMemberOfForum(
      args.userID,
      args.forumID
    );
    const userInfo = this.userService.UserInfo(args.userID)[0];
    if (isMember.length > 0 && userInfo.username) {
      return this.messageService
        .getMessagesByForum(args)
        .sort(function(a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) - new Date(a.date);
        })
        .map(data => {
          return {
            id: data.id,
            message: data.message,
            from: this.userService.UserInfo(data.senderID)[0],
            date: new Date(data.date).toUTCString()
          };
        });
    } else {
      throw new Error("The user or forum is not exist");
    }
  }
  /**
   * return a query
   */
  build() {
    const forums = () => this.forum();
    const getMyForumList = (parent, args) => this.forumHasJoined(args);
    const getMessages = (parent, args) => this.getMessage(args);
    return { forums, getMyForumList, getMessages };
  }
}
module.exports = Query;
