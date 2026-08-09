import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Resume from "../models/Resume.js";



const generateToken = (userId)=>{
    const token = jwt.sign({userId} ,process.env.JWT_SECRET , {expiresIn:'7d'} );
    return token;
}
//register user
export const registerUser = async(req ,res) =>{
    try {
        const {name , email ,password} = req.body;

        if(!name ||!email || !password){
            return res.status(400).json({message :"Missing required fields"});
    }

      const user = await User.findOne({email});
      if(user){
           return res.status(400).json({message :"User already exists , go to Login Page"});
      }

      const hashedPassword = await bcrypt.hash(password,10);
      const newUser = await User.create({
        name,email,password:hashedPassword
      })

      const token = generateToken(newUser._id);
      newUser.password = undefined;

      return res.status(201).json({message:"User Created successfully" , token , user:newUser})
        
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

//login
export const loginUser = async(req ,res) =>{
    try {
        const { email ,password} = req.body;

        

      const user = await User.findOne({email});
      if(!user){
           return res.status(400).json({message :"invalid email or password "});
      }

      // password is correct
      if(!(await user.comparePassword(password))){
        return res.status(400).json({message :"invalid email or password "});
      }

      
      const token = generateToken(user._id);
      user.password = undefined;

      return res.status(200).json({message:"Login successful" , token , user})
        
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

// getting user by id

// GET: /api/users/data

export const getUserById = async(req ,res) =>{
    try {
      
      const userId = req.userId;

      // check if user exits

      const user = await User.findById(userId);
      if(!user){
        return res.status(404).json({message:"User not found"});
      }

      user.password = undefined;
      return res.status(200).json({user});

      
        
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

// user resume
// GET: /api/user/resumes

export const getUserResumes = async(req,res) =>{
  try {
    const userId = req.userId;
    // return user resume
    const resumes = await Resume.find({userId});
    return res.status(200).json({resumes})
    
  } catch (error) {
    return res.status(400).json({message:error.message});
  }
}