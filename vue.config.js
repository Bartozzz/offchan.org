const fs = require("fs");

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync("_localhost.key"),
      cert: fs.readFileSync("_localhost.crt"),
      ca: fs.readFileSync("_localCA.pem")
    }
  }
};
