// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./routes/taskController");

const connectToMongo = require("./db");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
connectToMongo();

// Enable CORS only for development
app.use(cors({ origin: "http://localhost:3001" })); // only for dev

// avaibale routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
