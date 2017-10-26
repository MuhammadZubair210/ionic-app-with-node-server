const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const app = express();
// API file for interacting with MongoDB
const api = require('./server/routes/api');
const mongoose = require('mongoose');


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Angular DIST output folder
// app.use(express.static(path.join(__dirname, 'www')));
app.use(express.static('www'));


// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/index.html'));
});

//Set Port
const port = process.env.PORT || '4200';
app.set('port', port);

const server = http.createServer(app);


server.listen(port, () => console.log(`Running on localhost:${port}`));
