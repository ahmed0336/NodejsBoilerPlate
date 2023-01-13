// const express = require('express');
// const { APP_PORT } = require('./config');

import express from 'express'
import { APP_PORT } from './config'

const app = express();

// setting default or available port
// const PORT = process.env.PORT || 5000


app.listen(APP_PORT, ()=>{
    console.log(`Listening on Port ${APP_PORT}`);
})





