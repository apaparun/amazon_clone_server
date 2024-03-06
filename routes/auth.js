const express = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs')
const authRouter = express.Router();


authRouter.post("/api/signup", async (req, res) => {
    try{
        //get data from client
        const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email })
    if(existingUser){
        return res.status(400).json({message:"User already exist"})
    }
  const hashedpassword =   await bcryptjs.hash(password,8);
    let user = new User({
        email,
        password:hashedpassword,
        name
    })
    //post data in db
    user =await user.save()
    //return data to client
    res.json(user)
    }catch(e){
        res.status(500).json({error:e.message})
    }


})

module.exports = authRouter;