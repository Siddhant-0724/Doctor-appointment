import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs' 

const genrateToken= user =>{
    return jwt.sign({id:user._id,role:user.role},
        process.env.JWT_SECRET_KEY,
        {
        expiresIn:'15d'
    }
);
}
export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;

    try {
        let user = null;

        if (!email || !password || !name || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (role === "patient") {
            user = await User.findOne({ email });
        } else if (role === "doctor") {
            user = await Doctor.findOne({ email });
        } else {
            return res.status(400).json({ success: false, message: "Invalid role specified" });
        }

        // Check if user already exists
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user
        if (role === "patient") {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
            });
        } else if (role === "doctor") {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
            });
        }

        // Save user to database
        await user.save();

        res.status(200).json({ success: true, message: "User successfully created" });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ success: false, message: "User failed to create: " + err.message });
    }
};
export const login = async(req,res)=>{
    const {email}  = req.body;
    try{
        let user = null;
        const patient = await User.findOne({email})
        const doctor = await Doctor.findOne({email})

        if(patient){
            user = patient;
        }if(doctor){
            user = doctor;
        }

        if(!user){
            return res.status(404).json({message:"user not found"});
        };

        //compare password
        const isPasswordmatch = await bcrypt.compare(req.body.password,user.password);
        
        if(!isPasswordmatch){
            return res.status(400).json({status:false,message:"Invalid Creditial"});
        };

        //get token 
        const token = genrateToken(user);

        const {password,role,appointment,...rest} = user._doc;

        res.status(200)
        .json({status:true,messaage:"Sucessfully Logined",token,data:{...rest},role});
    }catch(err){
        console.log(err)
        res.status(500).json({status:false,message:err});
    }
};