/*
this class use for assembly 
*/

//const appConfig = require("config");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const Database = require("./src/util/database");
const { Resolvers, typeDefsControl } = require("./src/schema");
const { ForumService, MessageService, UserService } = require("./src/services");
class Assembly {
  constructor() {
    //collection database
    this.forumCollection = new Database("forums");
    this.activityCollection = new Database("activityforum");
    this.messageCollection = new Database("messages");
    this.userCollection = new Database("users");
    // init service
    this.userService = new UserService(this);
    this.forumService = new ForumService(this);
    this.messageService = new MessageService(this);
  }
  /**
   * init all app
   *
   * @memberof Assembly
   */
  async initApp() {
    const { app, server } = await this._initService();
    this.app = app;
    this.server = server;
  }
  /**
   * initialize all controller
   */
  _initService() {
    const typeDefs = gql`
      ${typeDefsControl}
    `;
    // init controller
    const mutationController = new Resolvers.Mutation(this);
    const queryController = new Resolvers.Query(this);
    // build the
    const Query = queryController.build();
    const Mutation = mutationController.build();

    const resolvers = { Query, Mutation };
    // Provide resolver functions for your schema fields
    const server = new ApolloServer({ typeDefs, resolvers });
    const app = express();

    return {
      app,
      server
    };
  }
}

module.exports = {
  Assembly
};
