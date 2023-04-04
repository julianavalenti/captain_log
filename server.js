
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL
const methodOverride = require("method-override")
const Log = require("./models/logs")

const app = express()
const captain_log = require("./models/logs")
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (err) => console.log (err.message + ' is mongo not running?'));
db.on('connected', () => console.log ('mongo connected'));
db.on ('disconnected',() => console.log ('mongo disconnected'));

app.use(methodOverride("_method"))
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

//D for Delete

app.delete('/logs/:id', async (req,res) => {
    await Log.findByIdAndDelete(req.params.id)
    res.redirect('/logs')
})

//U for update

app.put("logs/:id", async (req,res)=> {
await Log.findByIdAndUpdate(
    req.params.id,
    req.body,
{
    new:true
}
)
res.redirect('logs/${req.params.id}')
})

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

//S for show

app.get('/logs/:id', async (req, res) => {
	const foundLog = await Log.findById(req.params.id).exec()
    res.render('show.ejs', {
        log: foundLog,
    });
}); 
app.listen(PORT)
console.log ('listening')