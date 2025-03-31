//const tokengenerated = require('../jwtToken/jwt')
const userModel = require('../models/userModel.js')
const bcrypt = require('bcryptjs')
const { jwtSecret } = require('../config/jwtConfig');
const express = require('express');

//Create a user
const createUser = async (req, res) => {
    const { username, gmail, password } = req.body
    if (!username || !gmail || !password) {
        return res.json({ mmessage: 'Enter all input fields to continue!' }).status(404)
    }
    try {
        const user = await userModel.findOne({ gmail })
        //Check if user exist
        if (user) {
            return res.json({ message: 'User already exist'}).status(404)
        }
        //Hash the password
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashPassword(password, salt)
        //Create new User
        const newUser = new userModel({ ...req.body, password: hashPassword, profile:[] })

        const userSaved = await newUser.save()

        const{password:_, otheruserDetails} = userSaved.toObject()
        res.json(otheruserDetails).status(200)
 
    } catch (error) {
        console.log(error)
    }
}
const profileUpdate = async (req,res)=> {
    const tokenId = req.user.id
    const reqId = req.params.id
    const {country, phoneNumber, street, bio} = req.body
    if(tokenId === reqId){
        try {
            await userModel.findByIdAndUpdate(tokenId, {
                $set:{
                    "profile.country": country,
                    "profile.phoneNumber": phoneNumber,
                    "profile.street": street,
                    "profile.bio": bio,
                }
            }, {new: true})
            
        } catch (error) {
            console.log(error)
        }
        }
        else {
            console.log("access denied")
        }
    }

 const userLogin = async (req, res) => {
    const { gmail, password } = req.body
    if ( !gmail || !password) {
        return res.json({ mmessage: 'Enter all input fields to continue!' }).status(404)
    }
    try {
        const user = await userModel.findOne({ gmail })
        if (!user) {
            return res.json({ message: 'No existing user found!' })
        }
        const comparePass = await bcrypt.compare(password, user.password)
        if (!comparePass) {
            res.json({ message: 'Gmail or password Incorrect' }).status(404)
        }
        const token = tokengenerated(user._id)
        const { password: _, ...userData } = user.toObject()
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict' }).status(200).json(otheruserDetails)
    } catch (error) {
        console.log(error)
    }
}


//Update a User
/*    exports.updateUser = async (req, res) => {
    try {
        const paramId = req.user.id;
        const { username, gmail } = req.body;
        if(paramId !== userId.toString() && req.user.role !== 'admin'){
            return res.status(404).json({message: 'Unauthorized'})
        }

        const updatedUser = await userModel.findByIdAndUpdate(paramId, { $set: body }, { new: true }).select('-password')

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};  */
//Get a single user
const getUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userModel.findById(userId);
        //Authorization check
        if(paramId !== userId.toString() && req.user.role !== 'admin'){
            return res.status(404).json({message: 'Unauthorized'})
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
} 

const deleteUser = async (req, res) => {
    
        const {paramId} = req.params
       // const tokenId = req.user.id

      //  if(tokenId===paramId){
            try{
                if(paramId !== userId.toString() && req.user.role !== 'admin'){
                    return res.status(404).json({message: 'Unauthorized'})
                }
                await userModel.findByIdAndDelete(paramId)
                res.json({Message: 'User deleted succesfully!'}).status(200)

            }
            catch(error){
                console.log(error)
            
        return res.json({mess: 'Access denied'}).status(404)
    }
}
    const logoutUser = async (req, res) => {
        try {
            res.clearCookie('token')
            res.status(200).jsom({message: 'Logout succesful'})
        } catch (error) {
           console.error('Logout error', error)
           res.status(200).json({message: 'Server error during logout'}) 
        }
    }

module.exports = { profileUpdate, getUser, createUser, deleteUser,logoutUser, userLogin}