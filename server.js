const express = require("express");
const http = require("http");
// const busboy = require("busboy");
const fileUpload = require("express-fileupload");

const app = express();
const server = http.createServer(app);

const path = require("path");

// body parser middleware
const bodyparser = require("body-parser");

const poll = require("./routes/poll");
// Initialize middleware
app.use(express.json({ extended: false }));
app.use(fileUpload());

// app.get("/", (req, res) => {
//   res.send("API Running");
// });

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/poll", poll);

app.use("/api/location", require("./routes/api/location"));


// server static assets in prodution
if (process.env.NODE_ENV === "production") {
  // set static assets
  app.use(express.static("client/build"));


  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
