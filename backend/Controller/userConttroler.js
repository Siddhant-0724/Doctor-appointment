import User from "../models/UserSchema.js";
import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'
export const updateUser = async(req,res)=>{
    const id = req.params.id
    try{
        const updateUser = await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({sucess:true,message:"SucessFully updated",data:updateUser})
    }catch(err){
        res.status(500).json({sucess:false,message:"Fail to updated"})
    }
};

export const deleteUser = async(req,res)=>{
    const id = req.params.id
    try{
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json({sucess:true,message:"SucessFully Deleted"})
    }catch(err){
        res.status(500).json({sucess:false,message:"Fail to Fail to Delete"})

    }
};

export const getSingleUser = async(req,res)=>{
    const id = req.params.id
    try{
        const user = await User.findById(id).select('-password')
        res.status(200).json({sucess:true,message:"User Found",data:user})
    }catch(err){
        res.status(404).json({sucess:false,message:"User not found"})

    }
};

export const getAllUser = async(req,res)=>{
    const id = req.params.id
    try{
        const users = await User.find({}).select('-password')
        res.status(200).json({sucess:true,message:"Users Found",data:users})
    }catch(err){
        res.status(404).json({sucess:false,message:"Users not found"})

    }
};


export const getUserProfile = async(req,res)=>{
    const userId = req.userId;
    try{
        const user =await User.findById(userId)
        if(!user){
            return res.status(404).json({status:false,message:"user not found"})
        }

        const {password,...rest} =user._doc
        res.status(200).json({sucess:true,message:"Profile info is getting",data:{...rest}}) 
    }catch(err){
        res.status(500).json({sucess:false,message:"Error"})
    }
}

export const getMyAppointment= async(req,res)=>{
    try {
        //step1 Retrivr appointment for booking for spefic user
        const bookings = await Booking.find({user:req.userId})

        //step2 extract doctor id from appointments from booking
        const doctorIds = bookings.map(element=>element.doctor.id)

        //step3 retrive doctor using doctor id
        const doctors = await Doctor.find({_id:{$in:doctorIds}}).select('-password')
        res.status(200).json({sucess:true,message:"Appointents are getting", data:doctors})
    } catch (error) {
        res.status(500).json({sucess:false,message:"Error"})
    }
}