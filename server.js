
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL

const app = express()
const captain_log = require("./models/logs")

const db = mongoose.connection
db.on('error', (err) => console.log (err.message + ' is mongo not running?'));
db.on('connected', () => console.log ('mongo connected'));
db.on ('disconnected',() => console.log ('mongo disconnected'));

// app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:false}));


// N for New 

app.get("/new", (req,res) =>{
    res.render("new.ejs")
})



app.listen(PORT)
console.log ('listening')