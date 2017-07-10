'use strict';
/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing Path
const path = require('path');

//Importing Express
const express = require('express');
const app = express();

//Importing Morgan for logging
const morgan = require('morgan');

//Importing CORS for cors
const cors = require('cors');

//Importing bodyParser for parsing the body
const bodyParser = require('body-parser');

//Importing mongoose for linking it to mongoDB
const mongoose = require('mongoose');

//Importing ticket router
const {ticketRouter} = require('./router/route_tickets.js');

//Importing user router
const {userRouter} = require('./router/route_users.js');

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Exports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Exporting app, runServer, closeServer
module.exports = {
  app, runServer, closeServer
};

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Middleware                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//logging everything
app.use(morgan('common'));

//cors stuff
app.use(cors());

//parsing the body into a json
app.use(bodyParser.json());

/////////////////////////////////////////////////////////////////////////////////////
///////////////             API Initial Root               /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Router                    /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Mounting /api/tickets to ticket router
app.use('/api/tickets',ticketRouter);

//Mounting /api/users to user router
app.use('/api/users',userRouter);

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Server                    /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Opening Server and Mongoose connection
let server;
function runServer(port=3001) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`App listening on port: ${port}`);
      resolve();
    }).on('error', reject);
  });
}

//Closing Server and Mongoose connection
function closeServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer();
}

