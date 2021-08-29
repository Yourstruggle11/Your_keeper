import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        // index:true,
        // sparse:true
    },
    password: {
        type: String,
        required: true,
    },
});

// //lets encrypt the password and compare as well
// userSchema.methods.checkPassword =  async function (enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password);
// };
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

export default User;
