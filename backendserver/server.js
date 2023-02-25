// const express = require('express');
// const { APP_PORT } = require('./config');

import express from 'express'
import { APP_PORT ,MONGO_CONNECT_URL } from './config'
import routes from './routes'

import mongoose from 'mongoose';

import errorHandler from './middleware/errorHandler';

const app = express();

// import database live
mongoose.set('strictQuery' ,false);
mongoose.connect(MONGO_CONNECT_URL)

const db = mongoose.connection;

db.once('open',  ()=> {
    console.log("Database connected");
})
.on('error',  (err) => {
    console.log(err);
    console.log("Connection Failed");
});


// setting default or available port
// const PORT = process.env.PORT || 5000

// express by default json data accept nai krta hai is lye hum usey phle data ko json se convert kr rhy hai
app.use(express.json())

//  import our routes here

app.use('/api', routes);


// always use middle at the last or end
//yeh next wale error ke lye hai ,matlb hum ne middleware banaya hai
app.use(errorHandler);

app.listen(APP_PORT, ()=>{
    console.log(`Listening on Port ${APP_PORT}`);
})





