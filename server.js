const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const ShortURL = require("./models/shortUrl")

mongoose.connect('mongodb://localhost/urlShort')

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')

app.get("/",async (req,res)=>{
    const shorts = await ShortURL.find();
    res.render('index',{shorts:shorts});
})

app.post("/short",async (req,res)=>{
    var a = req.body.full;
    console.log(a);
    await ShortURL.create({full:a});
    res.redirect('/');
})

app.get("/:a",async (req,res)=>{
    const x = await ShortURL.findOne({short: req.params.a});
    if(x==null)
        res.sendStatus(404);
    else{
        x.clicks++;
        x.save();
        res.redirect(x.full);
    }
})

app.listen(5000);