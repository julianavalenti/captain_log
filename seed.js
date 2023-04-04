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
      title: "First day trip",
      entry: "The radar crushed unexpectedly",
      shipIsBroken: false,
      
    },
    {
      title: "Failed connection with base",
      entry: "Unable to establish connection to the island",
      shipIsBroken: true,
    },
    {
      title: "Radar operating in single channel",
      entry: "Able to establish connection",
      shipIsBroken: false,
    },
    
  ];

const logDB = async () => {
await Log.deleteMany({})
    await Log.insertMany(logData)

}

logDB().then(() => {
    mongoose.connection.close()
})