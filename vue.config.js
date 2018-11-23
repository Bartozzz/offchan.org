const fs = require("fs");

const config = {
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js"
    }
  }
};

if (process.env.NODE_ENV === "production") {
  config.devServer = {
    https: {
      key: fs.readFileSync("_localhost.key"),
      cert: fs.readFileSync("_localhost.crt"),
      ca: fs.readFileSync("_localCA.pem")
    }
  };
}

module.exports = config;
