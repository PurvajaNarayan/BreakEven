const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation,loginValidation } = require('./validation');

router.post('/register',async (req,res)=>{
    // Validate the data before making the user
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if the user already exist
    const emailAlreadyExist = await User.findOne({email:req.body.email});
    if(emailAlreadyExist){
        return res.status(400).send("email already exists");
    }

    //hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    //Create the new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try{
        const savedUser = await user.save();
        res.status(200).send({user:savedUser._id});
    }catch(err){
        res.status(400).send(err)
    }
});

router.post('/login',async (req,res)=>{
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if the user already exist 
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send("email does not exists");
    }
    
    //Password validation
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){return res.status(400).send("Invalid Credentials");}

    //Create and assign token
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SCRET , { expiresIn: '30m' });
    res.header('auth-token',token).status(200).send(token);

});


module.exports = router;