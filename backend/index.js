import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./Routes/auth.js"
import userRoute from "./Routes/user.js";
import reviewRoute from "./Routes/review.js"
import doctorRoute from "./Routes/doctor.js"
import BookingRoute from './Routes/booking.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true,
};

// Test route
app.get("/", (req, res) => {
    res.send("API is working");
});
// Start the server only if the database connection is successful
app.listen(port,()=>{
    console.log("SERVER Is RUNNING"+port)
})

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/doctors', doctorRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/bookings', BookingRoute)


const URI = process.env.MONGO_URL;
//database connection
mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MONGO DB Connected")
}).catch(err=>{
    console.log(err)
})





