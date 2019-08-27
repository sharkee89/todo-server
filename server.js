const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const database = require('./config/database');

// Connect to database
mongoose.connect(database.url, {
    useNewUrlParser: true
});

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + database.url);
});

// On Connection Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const port = 3000;

// Routes
const todoRoute = require('./routes/todo-route');

app.use(cors());

app.use(bodyParser.json());

app.use('/todos', todoRoute);

// Return index page on default route for the application
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Starting server on decided port
app.listen(process.env.PORT || port);

console.log('Server started on port: ' + port);