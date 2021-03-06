class Mutation {
  constructor({ forumService, messageService }) {
    this.forumService = forumService;
    this.messageService = messageService;
  }
  /**
   * Send email if user is member for a forum
   * @param {*} param0
   */
  sendMessage({ input }) {
    const userIsMemberForum = this.forumService.isMemberOfForum(
      input.userID,
      input.forumID
    );
    if (
      userIsMemberForum.length === 1 &&
      (userIsMemberForum[0].role === "ADMIN" ||
        userIsMemberForum[0].status === "approved")
    ) {
      return this.messageService.createMessage(input);
    } else {
      throw new Error(
        "you are not member for this forum or your request is waiting to approved"
      );
    }
  }
  /**
   *  Join forum
   * @param {*} args
   */
  joinForum(args) {
    return this.forumService.joinForum(args);
  }
  /**
   * Create new forum
   * @param {*} param0
   */
  createForum({ input }) {
    return this.forumService.createForum(input);
  }
  /**
   * accepted or refused user in forum
   * @param {*} args
   */
  changeStatus(args) {
    return this.forumService.changeStatus(args);
  }
  /**
   * return a mutation
   */
  build() {
    const sendMessage = (parent, args) => this.sendMessage(args);
    const joinForum = (parent, args) => this.joinForum(args);
    const createForum = (parent, args) => this.createForum(args);
    const changeStatus = (parent, args) => this.changeStatus(args);
    return { sendMessage, joinForum, createForum, changeStatus };
  }
}
module.exports = Mutation;
