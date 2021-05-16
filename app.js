const express = require("express");
const db = require("./models/dbConnect");
const app = express();
const router = require("./routers/router")

const dbConnect = require("./models/dbConnect")

require("dotenv").config();
const port = process.env.port || 3000;

app.use(express.json());


dbConnect();

app.use("/api", router);

app.listen(port, ()=>{
    console.log("I m listening on port ", port)
})