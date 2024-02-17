require('./config/config');
const db = require('./db');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const {User} = require('./models/wallet');
const app = express();

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next(); 
});

app.use(bodyParser.json());
app.use(require('./routes'));


app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 500;
    next(error); 
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: error.message
    }) 
});

db.init();

const server = app.listen(process.env.PORT , ()=>{
    console.log('Started up HTTP at port ', process.env.PORT);
});

module.exports = server;