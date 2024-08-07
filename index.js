const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/Connection");
const { UserRouter } = require("./Routes/User.routes");
const { URLRouter } = require("./Routes/UrlShortener.routes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to URL Shortener");
});

app.use("/user", UserRouter);
app.use("/url", URLRouter);

app.listen(process.env.PORT || 8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
  console.log(`Running on PORT ${process.env.PORT}`);
});
