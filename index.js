const express = require("express");
const userInfo = require("./models/user");
require('./db/connection');
require('./models/user');
// const userRoute = require('../REST API/router/routes');

const app = express();

app.use(express.json());
//routes url

app.use('/user', require('./router/routes'));

const port = process.env.PORT || 4000;

app.get("/",(req,res)=>{
    res.send("HOME PAGE");
});


app.listen(port,()=>{
    console.log(` Port run at localhost ${port}`);
});
