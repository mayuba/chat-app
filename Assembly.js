/*
this class use for assembly 
*/

//const appConfig = require("config");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

class Assembly {
  /**
   * init all app
   *
   * @memberof Assembly
   */
  async initApp() {
    console.log("init assembly");
    const { app, server } = await this._initService();
    this.app = app;
    this.server = server;
  }

  _initService() {
    const typeDefs = gql`
      type Query {
        hello: String
      }
    `;

    // Provide resolver functions for your schema fields
    const resolvers = {
      Query: {
        hello: () => "Hello world!"
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
