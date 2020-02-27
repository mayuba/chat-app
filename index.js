/**
 * Application entry point
 */

const assert = require("assert");
const { Assembly } = require("./Assembly");
const cors = require("cors");
const pkg = require("./package.json");
class Main {
  constructor() {
    this.assembly = new Assembly();
  }

  /**
   * Initialize the assembly dependency
   *
   * @returns {Promise} - An empty promise but with the assembly filled
   *
   * @memberOf Main
   */
  async initDependencies() {
    await this.assembly.initApp();
  }

  /**
   * Starts the service
   *
   * @memberOf Main
   */
  async startService() {
    assert(pkg.port, "expected pkg.port");
    const { server, app } = this.assembly;
    this._initMiddleware({ server, app });
    app.listen({ port: pkg.port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${pkg.port}${server.graphqlPath}`
      )
    );
  }

  // Configure middleware.
  _initMiddleware({ server, app }) {
    app.use(cors());
    server.applyMiddleware({ app });
  }
}

async function run() {
  const main = new Main();

  try {
    await main.initDependencies();
    await main.startService();
  } catch (err) {
    console.error("Unexpected error during initialization", err);
  }

  return main;
}

module.exports = run();
