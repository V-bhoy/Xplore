const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const xploreRoute = require('./routes/xplore');
const profileRoute = require('./routes/profile');

const app=express();

app.use(morgan('dev'));
app.use(express.urlencoded({limit:'30mb', extended: true}));
app.use(express.json({limit:'30mb', extended:true}));
app.use(cors());
app.use("/user",userRouter);
app.use("/xplore",xploreRoute);
app.use("/profile",profileRoute);

const MongoDB_URL = "mongodb+srv://Rach_1303:Fl7xiKWrvxj9zf8V@cluster0.cvfdj3u.mongodb.net/xplore_db?retryWrites=true&w=majority"
const PORT = 5000;

mongoose.connect(MongoDB_URL)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`server started successfully on http://localhost:${PORT}/`);
        })
    })
    .catch((error)=>{
        console.log(`Unable to connect, ${error}`);
    })