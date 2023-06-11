const { join } = require("path");
require('dotenv').config({ path: join(__dirname, '../.env') });
const express = require("express");
const cors = require("cors");
const router = require('./router');
const db = require('../src/models')

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(express.json());
app.use("/", express.static(__dirname + "/public"));

//#region API ROUTES
app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

const
  authRouter
    = require("./router/authRouter");
app.use("/api/auth", authRouter);

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});
// ===========================
// NOTE : Add your routes here
for (routes of router.routes) {
  app.use('/api', routes)
}
// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  // db.sequelize.sync({ alter: true });
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    // db.sequelize.sync({ alter: true })
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
