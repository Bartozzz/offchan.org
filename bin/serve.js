const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");

const app = express();
const dit = path.resolve(__dirname, "../dist");
const port = process.env.SERVER_PORT || 8443;

app.use(express.static(dit));

const server = https.createServer(
  {
    key: fs.readFileSync(path.resolve(__dirname, "../_localhost.key"), "utf8"),
    cert: fs.readFileSync(path.resolve(__dirname, "../_localhost.crt"), "utf8"),
    ca: fs.readFileSync(path.resolve(__dirname, "../_localCA.pem"), "utf8")
  },
  app
);

server.listen(port, () => {
  console.log(`Server listening on https://localhost:${port}, Ctrl+C to stop`);
});
