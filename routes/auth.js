const express = require('express');
const User = require('../models/user');


const authRouter = express.Router();


authRouter.post("/api/signup", async (req, res) => {
    //get data from client
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email })
    if(existingUser){
        return res.status(400).json({message:"User already exist"})
    }

    let user = new User({
        email,
        password,
        name
    })
    user =await user.save()
    res.json(user)
    //post data in db


    //return data to client
})

module.exports = authRouter;