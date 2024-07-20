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

const whitelist = ["http://localhost:4200", "http://127.0.0.1:4200", "http://127.0.0.1:8000", "http://localhost:8000"];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if(origin == undefined || whitelist.indexOf(origin) != -1 ){
            callback(null, true);
        }else{
            callback(new Error("Not allowed by CORS"));
        }
    }
}
app.use(cors(corsOptions));

app.listen(PORT, ()=>console.log(`Server is running at PORT: ${PORT}`));
