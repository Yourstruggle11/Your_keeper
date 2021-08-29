import { generateToken } from "../utils/generateToken.js"
import User from "../model/userModel.js";
import  Mongoose  from "mongoose";
import bcrypt from "bcrypt";


//post request for register user
export const registerUser = async (req, res, next) =>{
    const {username, email, password} = req.body;
    const userExists = await User.findOne({email:email});
    if(userExists){
        res.status(400);
        const err = new Error("User already exists");
        next(err);
    }

    const user = await User.create({
        username,
        email,
        password,
    });
    if(user){
        res.json({
            _id: user._id,
            name: user.username,
            password: user.password,
        });
    }
    else{
        res.status(404);
        const err = new Error("Invalid User Data");
        next(err);
    }
}

//post request for login user

export const loginUser = async (req, res, next) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email: email});

        // console.log(comparePassword);
        console.log(user);
        if(user){
        const comparePassword = await bcrypt.compare(password, user.password);
            if(user && comparePassword){
                res.json({
                    _id: user._id,
                    name: user.username,
                    email: user.email,
                    token: generateToken(user._id),
                });
            }
            else{
                res.status(401);
                const err = new Error("Invalid email or password.");
                next(err);
            }
        }
        else{
            res.status(401);
            const err = new Error("Invalid email or password.");
            next(err);
        }



}

//get user for get users
export const getUser = async (req, res) =>{
    try {
        const fetchUser = await User.find();
        res.status(200).json(fetchUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//delete user for delete users
export const deleteUser = async (req, res) =>{
    const {id: id} =  req.params;
    console.log("this is id from database"+ req.params);
    if(!Mongoose.Types.ObjectId.isValid(id))
        res.status(404).send("No user found");

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}