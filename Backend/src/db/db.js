import mongoose, { connect } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try{
        const connectionInstance = await connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("connected to database",connectionInstance.connection.host);
    } catch(err){
        console.log("Database connection error! ",err);
        process.exit(1);
    }
}

export default connectDB;

/*
;(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("Error",(err)=>{
            console.log("Cannot connect to database ",err);
            throw err;
        });
        
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port: ${process.env.PORT}`);
        })
    }catch(err){
        console.log("Error: ",err);
        throw err;
    }
})();
*/
