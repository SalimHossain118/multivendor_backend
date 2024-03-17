/** @format */

const express = require("express");
const { dbConnect } = require("./utiles/db.js");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", require("./routes/authRoutes.js"));
app.get("/", (req, res) => res.send("hello server!"));
const port = process.env.PORT;
dbConnect();

app.listen(port, () => console.log(`Port is running at ${port}`));
