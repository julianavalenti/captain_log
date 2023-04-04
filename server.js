
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL
const Log = require("./models/logs")

const app = express()
const captain_log = require("./models/logs")
mongoose.connect(process.env.DATABASE_URL)
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

app.get('/logs', async (req, res) => {
	const allLogs = await Log.find({})
    res.render('index.ejs', {
        logs: allLogs
    }
    );
}); 


// C is for Create 

app.post ('/new',(req,res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true;
    }else {
        req.body.completed = false;
    }
    const createdLog = new Log (req.body)
    createdLog.save().then(res.redirect('/logs'))
})

app.listen(PORT)
console.log ('listening')