const express = require('express')
const mongoose = require ('mongoose')
const Log = require("./models/logs")
const app = express ()

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (err) => console.log (err.message + ' is mongo not running?'));
db.on('connected', () => console.log ('mongo connected'));
db.on ('disconnected',() => console.log ('mongo disconnected'));

app.use(express.urlencoded({extended:false}));

const logData = [
    {
      title: "System Error",
      entry: "The server crashed unexpectedly",
      shipIsBroken: false,
      
    },
    {
      title: "Database Connection Error",
      entry: "Unable to establish connection to the database server",
      shipIsBroken: false,
    },
    {
      title: "Login Attempt",
      entry: "User 'johndoe' attempted to login with an incorrect password",
      shipIsBroken: true,
    },
    
  ];

const logDB = async () => {
await Log.deleteMany({})
    await Log.insertMany(logData)

}

logDB().then(() => {
    mongoose.connection.close()
})