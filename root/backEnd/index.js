const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const bodyParser = require('body-parser')
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')
require('dotenv/config')


//app middleware
app.use(express.json());
app.use('/api/user/', authRoute);
app.use('/api/post/', postRoute);
try{
    mongoose.connect(process.env.DB_CONNECTION);
    console.log('Db Connection successfull');
} catch(err){
    console.log(err);
}

// create port
app.listen(3000,()=>{
    console.log("server is up and running ")
});