// const express = require('express');
// const { APP_PORT } = require('./config');

import express from 'express'
import { APP_PORT } from './config'
import routes from './routes'

import errorHandler from './middleware/errorHandler';

const app = express();

// setting default or available port
// const PORT = process.env.PORT || 5000

// express by default json data accept nai krta hai is lye hum usey phle data ko json se convert kr rhy hai
app.use(express.json())

//  import our routes here

app.use('/api', routes);


// always use middle at the last or end

app.use(errorHandler);
app.listen(APP_PORT, ()=>{
    console.log(`Listening on Port ${APP_PORT}`);
})





