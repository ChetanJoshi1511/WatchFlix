import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import app from "./app.js";

//configure dotenv to extract proces.env
dotenv.config({
    path:'./.env'
})

//make connection to the database
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongo error", err);
});