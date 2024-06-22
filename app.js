// import dotenv from 'dotenv';
// dotenv.config({ silent: process.env.NODE_ENV === 'production' });
// await import('./server');

import express from "express";
import expresslayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import router from "./server/route/index.js";
import dashboard from "./server/route/dashboard.js";
import connDB from "./server/config/db.js";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import auth from "./server/route/auth.js";
import methodOveride from "method-override";

const app=express();
const port=3000;

app.use(session({
    secret:"blah blah",
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://vedavijayshankarxia6:jgkk5ZMPAunqB10Z@cluster0.2xyyxmq.mongodb.net/",
    })
}))

//Passport
app.use(methodOveride("_method"));
app.use(passport.initialize());
 app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));
//Connect to db
connDB();
app.use(express.static("public"));

//templating engine
app.use(expresslayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

// app.get('/',(req,res)=>{
//     const locals={title:"NodeJS notes",description:"Notes App made using Node.js"}; //cant specify any other variable other than locals
//   
//     res.render("index",locals);
// });

//Building up variables in locals can get messy so for another alternative refer notes
//Routes
app.use("/",auth);
app.use("/",router);
app.use("/",dashboard);

//Handle 404 page
app.get("*",(req,res)=>{
    res.status(404).render("404");
})

app.listen(port,()=>{
    console.log("Listening through port "+port);
})


