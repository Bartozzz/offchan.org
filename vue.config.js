const fs = require("fs");

module.exports = {
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js"
    }
  },

  devServer: {
    https: {
      key: fs.readFileSync("_localhost.key"),
      cert: fs.readFileSync("_localhost.crt"),
      ca: fs.readFileSync("_localCA.pem")
    }
  }
};
