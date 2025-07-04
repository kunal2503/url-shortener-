const User = require("../modules/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;
        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message: "User does not exist"});
        } 
        const isPasswordValid = await bcrypt.compare(password,userExist.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invaid Password"});
        }
        const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({token, user:{id:userExist._id,username:userExist.username,email:userExist.email}});

    } catch(error){
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }
    
}

exports.signup = async(req,res) => {
try{
    const {username, email ,password} = req.body;
    if(!username || !email || !password){
    return res.status(400).json({message : "Please fill all fields"});
    }
    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({message : "User already exists"});
    } 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({
        username:username,
        email:email,
        password:hashedPassword
    });
    await newUser.save();

    const token =jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.status(201).json({token, user:{id:newUser._id,username:newUser.username,email:newUser.email}});

} catch(error){
    console.log(error)
    res.status(500).json({message : "Internal server error"});
}


}
