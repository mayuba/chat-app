class Mutation {
  constructor({ forumService, messageService }) {
    this.forumService = forumService;
    this.messageService = messageService;
    this.data = "q";
  }

  sendMessage({ input }) {
    const userIsMemberForum = this.forumService.isMemberOfForum(
      input.userID,
      input.forumID
    );
    if (userIsMemberForum.length === 1) {
      return this.messageService.createMessage(input);
    } else {
      throw new Error("you are not member for this forum please join before");
    }
  }

  joinForum(args) {
    return this.forumService.joinForum(args);
  }

  createForum({ input }) {
    return this.forumService.createForum(input);
  }
  build() {
    const sendMessage = (parent, args) => this.sendMessage(args);
    const joinForum = (parent, args) => this.joinForum(args);
    const createForum = (parent, args) => this.createForum(args);
    return { sendMessage, joinForum, createForum };
  }
}
module.exports = Mutation;
