import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

/*Configuring express middlewares */
app.use(cors({
    origin: process.env.CORS_ORIGIN, //allow only this origin/port
    credentials:true
}));

app.use(express.json({
    //limit property limits the size of response recieved on the server
    limit: "100kb",
    //reviver takes a function which modifies key,value while response is parsing
    reviver: (key,val) => key=="age" ? Number(value) : value, 
    //strict property only allows json type responses to be received
    strict:false
}));

//express.urlencoded() is a built-in Express middleware that parses URL-encoded request bodies, 
//usually coming from HTML forms.
app.use(express.urlencoded({
    extended:true,
    limit: "16kb"
}));

app.use(cookieParser());

export default app;