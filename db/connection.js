const mongoose = require('mongoose');
const express = require('express');

mongoose.connect("mongodb+srv://Pratik:Pratik123@cluster0.kg70c.mongodb.net/UserData?retryWrites=true&w=majority").then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(`${err}`);
})

