class Mutation {
  constructor({ forumService, messageService }) {
    this.forumService = forumService;
    this.messageService = messageService;
    this.data = "q";
  }

  sendMessage({ input }) {
    const userIsMemberForum = this.forumService.MemberOfForum(
      input.userID,
      input.forumID
    );
    console.log(userIsMemberForum.length);
    if (userIsMemberForum.length === 1) {
      return this.messageService.createMessage(input);
    } else {
      throw new Error("you are not member for this forum please join before");
    }
  }

  joinForum({ input }) {
    this.forumService.joinForum(input);
  }
  build() {
    const sendMessage = (parent, args) => this.sendMessage(args);
    const joinForum = (parent, args) => this.joinForum(args);
    return { sendMessage };
  }
}
module.exports = Mutation;
