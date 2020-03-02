/*
this class use for assembly 
*/

//const appConfig = require("config");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const Database = require("./src/util/database");
const { resolvers, typeDefsControl } = require("./src/schema");
class Assembly {
  /**
   * init all app
   *
   * @memberof Assembly
   */
  async initApp() {
    console.log("init assembly");
    const { app, server } = await this._initService();
    this.userDatabase = new Database();
    this.forumDatabase = new Database();
    this.messageDatabase = new Database();
    this.app = app;
    this.server = server;
  }

  _initService() {
    const typeDefs = gql`
      ${typeDefsControl}
    `;

    // Provide resolver functions for your schema fields
    const resolvers = {
      Query: {
        // messages: () => null,
        // users: () => null,
        forums: () => "hello word"
      }
    };

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
