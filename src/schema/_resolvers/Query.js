class Query {
  constructor({ forumService, messageService, userService }) {
    this.forumService = forumService;
    this.messageService = messageService;
    this.userService = userService;
    this.forum();
  }
  /**
   * get all forums data
   */
  forum() {
    let datas = [];
    this.forumService.listOfForums().map(data => {
      const { id, name, createDate } = data;
      const members = this.forumService.getMembers(data.id).map(data => {
        return this.userService.UserInfo(data)[0];
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
   * check
   * @param {*} args
   */
  forumHasJoined(args) {
    const userID = args.userID;
    return this.forumService.ActivityOfForums(userID);
  }

  build() {
    const forums = () => this.forum();
    const getMyForumList = (parent, args) => this.forumHasJoined(args);
    return { forums, getMyForumList };
  }
}
module.exports = Query;
