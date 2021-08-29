import express from 'express';
import dbcon from "./config/dbcon.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

//Router import
import homeRoute from "./routes/homeRoute.js";
import notesRoute from "./routes/notesRoute.js";
import usersRoute from "./routes/usersRoute.js";
// import ressetPasswordRoute from "./routes/ressetPasswordRoute.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();



//middleware
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(morgan("dev"));
app.use(cors())



dbcon();

//Routes
app.use('/', homeRoute);
app.use('/users/notes', notesRoute);
app.use('/users', usersRoute)
// app.use('/reset', ressetPasswordRoute)


//server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
    console.log(`server has started at port no ${PORT}`);
})