const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");

const PORT = 3000;

const app = express();

app.use(helmet());


function checkLoggedIn(req, res, next) {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return res.status(401).json({
      error: "Please log in",
    });
  }

  next();
}

app.get('/auth/google', (req, res) => {})
app.get('/auth/google/callback', (req, res) => {})
app.get('/auth/logout', (req, res) => {})

app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Personal secret key is 42");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pm"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });
