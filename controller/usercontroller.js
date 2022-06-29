const userInfo  = require("../models/user");
const jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require('bcrypt');
 
const signup = async (req,res) =>{
try {
            let salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(req.body._password, salt)

    const addingUsersRecord = new userInfo({
                uId:req.body._uId,
                emailId:req.body._emailId,
                password:hashPassword,
                name:req.body._name,
                role:req.body._role,
            })
            addingUsersRecord.save().then((data)=>{
                console.log("User add sucessfully" + data);
                res.send("User add sucessfully" + data);
            }).catch(e => console.log(e))
} catch (error) {
    console.log(error)
}
        
}


const login = async (req,res) =>{
     
        const { _password, _email} = req.body;      
        if(_email && _password){
        // console.log("Email - "+_email +"Password -"+_password)
         let user = await userInfo.findOne({emailId:_email});
        //  console.log(user)
         if(user){
             let check = await bcrypt.compare(_password, user.password);
             console.log(check)
             if(check){
                 let token = jwt.sign({userID:user._id},  process.env.Secret,  {expiresIn:'15m'});
                 res.json({"message":"Login Succesfully", "Token valid for 15 Min":token})
             }else{
                 res.send("Enter valid Email ID And Password")
             }
         }else{
             res.send("Please Enter Valid Email Or Sign Up First for login")
         }
     
        }else{
            res.send("Please Enter Email ID and Password!")
        }
     
    
      
}
// verfiy token 
const getverfiy = async (req,res) =>{
    let result = userInfo.find();
    res.send('verfiy Token ')
}

// Delete Record
const deleteUser = async(req,res) =>{

    userInfo.findOneAndDelete({emailId:req.body._email}).then((data)=>{
        res.json({"message":"User Delete Sucessfully", "Delete User": data})
        console.log(data)
    }).catch(e => console.log(e))
    // userInfo.remove({emailId:req.body._email})
    // .then(result=>{
    //     res.status(200).json({
    //         message:"User data Deleted",
    //         result:result
    //     }) 
    // })
    // .catch(error=>{
    //     res.status(500).json({
    //         error:error
    //     })
    // })
}

// Update Record
const updateUser = async(req,res) =>{
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(req.body._password, salt)
    userInfo.findOneAndUpdate({_id:req.params.id},{
        $set:{
            emailId:req.body._emailId,
            password:hashPassword,
            name:req.body._name,
            role:req.body._role
        }
    })
    .then(result=>{
        res.status(200).json({
            message:"User Update Sucessfully"
        }) 
    })
    .catch(error=>{
        res.status(500).json({
            error:error
        })
    })
}

module.exports = {signup,login,getverfiy,deleteUser,updateUser};