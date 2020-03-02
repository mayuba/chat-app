//const fs = require("fs");
var fs = require("file-system");
function typeDefs() {
  let schema = "";
  fs.recurseSync("src/schema/_graphql", (filepath, file, filename) => {
    schema += fs.readFileSync(filepath);
    schema += "\n";
  });
  return schema;
}

module.exports = typeDefs();
