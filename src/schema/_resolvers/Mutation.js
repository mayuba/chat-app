class Mutation {
  constructor({ forumService }) {
    this.forumService = forumService;
    this.data = "q";
  }

  sendMessage() {
    return this.forumService.listOfForums();
  }

  build() {
    const sendMessage = () => this.sendMessage();
    return { sendMessage };
  }
}
module.exports = Mutation;
