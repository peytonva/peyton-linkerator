const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");


const { client } = require("../../db")

const apiRouter = require("../../routes/index");
const server = express();

server.use(express.json());
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(cors());

server.use("/api", apiRouter);

server.get("/", (req, res) => {
  res.json({ server: "up" });
});

const port = process.env.port || 5000;
server.listen(port, async () => {
  console.log(`Server running on port ${port}`);
try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
