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

const logData = 
[
{
    title: "Test 1",
    entry: "Test 1",
    shipIsBroken: false,
},
{
    title: "Test 2",
    entry: "Test 2",
    shipIsBroken: true,
},

{
    title: "Test 3",
    entry: "Test 3",
    shipIsBroken: false
}
]


const logDB = async () => {
await Log.deleteMany({})
    await Log.insertMany(logData)

}

logDB().then(() => {
    mongoose.connection.close()
})