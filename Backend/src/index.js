import dotenv from "dotenv";
// ensure environment variables are loaded before importing other modules
dotenv.config({ path: './.env' });

import connectDB from "./db/db.js";
import app from "./app.js";

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