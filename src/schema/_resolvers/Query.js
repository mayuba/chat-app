class Query {
  constructor({ forumService, messageService, userService }) {
    this.forumService = forumService;
    this.messageService = messageService;
    this.userService = userService;
    this.forumHasJoined(2);
  }

  forum() {
    const forum = this.forumService.listOfForums();
    return {
      id: forum.id,
      name: forum.name
    };
  }

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
