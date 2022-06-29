const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uId:{
        type:Number,
        require:true,
        unique:true
   },
    emailId:{
        type:String,
        require:true,
        // unique:true
   },
   password:{
    type:String,
    require:true
},
name:{
        type:String,
        require:true,
       trim:true
   }, 
role:{
    type:String,
    require:true,
    trim:true
}
});

const userInfo = mongoose.model("User",userSchema);

module.exports = userInfo;