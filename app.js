'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080
const path = require('path')

const usersRouter = require('./server/server')

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'production') require('./secrets')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/users', usersRouter)


// static file-serving middleware
// app.use(express.static(path.join(__dirname, '..', 'public')))

// sends index.html
// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public/index.html'))
// })


if (!module.parent) app.listen(PORT, () => {
    console.log(`JSON Server is running in PORT ${PORT}`)
});

module.exports = app;
