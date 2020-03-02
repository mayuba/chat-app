class Mutation {
  constructor({ forumService, messageService }) {
    this.forumService = forumService;
    this.messageService = messageService;
    this.data = "q";
  }

  sendMessage(args) {
    this.messageService.createMessage(args);
  }

  build() {
    const sendMessage = (parent, args) => this.sendMessage(args);

    return { sendMessage };
  }
}
module.exports = Mutation;
