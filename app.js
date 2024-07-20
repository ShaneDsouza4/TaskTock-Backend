require("dotenv").config();
const { connectToMongoDB } = require("./connection");

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

connectToMongoDB(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected."))
.catch((err)=> console.log("Couldn't connect to MongoDB"));


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;



app.listen(PORT, ()=>console.log(`Server is running at PORT: ${PORT}`));
