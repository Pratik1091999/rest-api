const jwt = require('jsonwebtoken');
const userInfo  = require("../models/user");
require('dotenv').config();


const checkAuth = async (req,res,next) =>{
   try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.Secret)
    req.user = user._id;
      
    next();
   } catch (error) {  
     res.status(401).json({"message":"UnAuthorized User"})
     throw error;
   }
  }

const adminAuth = async (req,res,next) =>{
  let token;
  let user_data;
  const { authorization } =req.headers;
  if(authorization && authorization.startsWith("Bearer")){
  try {
    token = authorization.split(" ")[1];
    const {userID} = jwt.verify(token, process.env.Secret)
    console.log(userID);
    user_data = await userInfo.findById(userID)
    console.log(user_data)
    if(user_data == 0){
      res.send("user Not found")
    }
     
   }
     catch (error) {  
     res.status(401).json({"message":"UnAuthorized User"})
     throw error;
   }
  }
  if(!token){
    res.send("UnAuthorized User insert token")
  }
  // Role= user_data.role;
  // console.log(Role);
  if(user_data.role == "admin" || "Admin"){
   next();
   }else{
    res.send("Not Acess For This Page")
   }
  }



//  userInfo.find().then((data)=>{
//    console.log("data",data[0])
//     userInfo.findOne({emailId:data[0].emailId}).then((data1)=>{
//       console.log("data1",data1)
//     })
//  })

  //  const user_data = await userInfo.findOne({emailId:req.body._email})
  //  console.log(user_data)
  //  if(user_data.role == "admin" || "Admin" ){
  //   next();
  //  }else{
  //   res.status(401).json({"message":"Not Access"})
  //  }
   
  // next();
  // } catch (error) {  
  //   res.status(401).json({"message":"UnAuthorized User"})
  //   throw error;
 //}
//}


// const userAuth = async (req,res,next) =>{
//   try {
//    const token = req.headers.authorization.split(" ")[1];
//    const user = jwt.verify(token, process.env.Secret)
//    req.user = user._id;

//    const user_data = await userInfo.findOne({emailId:req.body._email})
//    if(user_data.role == "user"){
//     next();
//    }else{
//     res.status(401).json({"message":"Not Access"})
//    }
   
//    next();
//   } catch (error) {  
//     res.status(401).json({"message":"UnAuthorized User"})
//     throw error;
//   }
// }

module.exports = {
    checkAuth,adminAuth
}

