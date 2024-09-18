import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Update Doctor
export const updateDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Successfully updated", data: updatedDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update doctor"+err, error: err.message });
    }
};

// Delete Doctor
export const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Successfully deleted doctor", data: deletedDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete doctor", error: err.message });
    }
};

// Get Single Doctor
export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id)
        .populate("reviews")
        .select('-password');
        res.status(200).json({ success: true, message: "Doctor found", data: doctor });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching doctor", error: err.message });
    }
};

// Get All Doctors
export const getAllDoctor = async (req, res) => {
    try {
        const { query } = req.query;
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } },
                ]
            }).select('-password');
        } else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select('-password');
        }

        res.status(200).json({ success: true, message: "Doctors found", data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching doctors", error: err.message });
    }
};

// Get Doctor Profile
export const getDoctorProfile = async (req, res) => {
    const doctorId = req.userId;

    try {
        const doctor = await Doctor.findById(doctorId).select('-password');
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        const appointments = await Booking.find({ doctor: doctorId });
        res.status(200).json({ success: true, message: "Profile retrieved successfully", data: { ...doctor._doc, appointments } });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error retrieving profile", error: err.message });
    }
};
