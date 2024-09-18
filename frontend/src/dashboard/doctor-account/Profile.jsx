/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import uploadImageToCloudinary from './../../utils/uploadCloudanary'
import { BASE_URL, token } from '../../config'
import { toast } from 'react-toastify'
const Profile = ({ doctorData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        gender: '',
        ticketPrice: '',
        specialization: '',
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: '',
        photo: null
    })
    useEffect(() => {
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            password: doctorData?.password,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            ticketPrice: doctorData?.ticketPrice,
            specialization: doctorData?.specialization,
            qualifications: doctorData?.qualifications,
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo
        })
    },[doctorData])
    const handelInputchange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleFileInput = async event => {
        const file = event.target.files[0]
        const data = await uploadImageToCloudinary(file)

        setFormData({ ...formData, photo: data?.url })
    }
    const updateProfileHandeler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }
            toast.success(result.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const deleteItem = (key, index) => {
        setFormData(preveFormData => ({ ...preveFormData, [key]: preveFormData[key].filter((_, i) => i !== index) }))
    }
    const addItem = (key, item) => {
        setFormData(preFormData => ({
            ...preFormData,
            [key]: [...preFormData[key], item]
        }))
    }
    const handelReusableInputchangeFunc = (key, index, event) => {
        const { name, value } = event.target
        setFormData(preFormData => {
            const updateItems = [...preFormData[key]]
            updateItems[index][name] = value

            return {
                ...preFormData,
                [key]: updateItems,
            }
        })
    }

    const addQualification = e => {
        e.preventDefault()
        addItem('qualifications', {
            startingDate: "",
            endingDate: "",
            degree: "PHD",
            university: "Goverment Collage of Medical"
        })
    }
    const handelQualififationChange = (event, index) => {
        handelReusableInputchangeFunc('qualifications', index, event)
    }
    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItem('qualifications', index)
    }

    const addExperience = e => {
        e.preventDefault()
        addItem('experiences', {
            startingDate: "",
            endingDate: "",
            position: "Senior Surgon",
            hospital: "Goverment Collage of Medical"
        })
    }
    const handelExperienceChange = (event, index) => {
        handelReusableInputchangeFunc('experiences', index, event)
    }
    const deleteExperiences = (e, index) => {
        e.preventDefault();
        deleteItem('experiences', index)
    }


    const addTimeSlot = e => {
        e.preventDefault()
        addItem('timeSlots', {
            day: "Sunday",
            startingTime: "12:00",
            endingTime: "03:30"
        })
    }
    const handelTimeSlotChange = (event, index) => {
        handelReusableInputchangeFunc('timeSlots', index, event)
    }
    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteItem('timeSlots', index)
    }


    return (
        <div>
            <h2 className='text-headingColor text-[24px] font-bold leading-9 mb-10'>
                Profile Information
            </h2>
            <form>
                {/* Name */}
                <div className="mb-5">
                    <p className="form_label">Name:</p>
                    <input type="text" name="name" value={formData.name} onChange={handelInputchange} placeholder='Full Name' className='form_input' />
                </div>
                {/* Email */}
                <div className="mb-5">
                    <p className="form_label">Email:</p>
                    <input type="text" name="email" value={formData.email} onChange={handelInputchange} placeholder='Email' className='form_input' readOnly disabled />
                </div>
                {/* Phone */}
                <div className="mb-5">
                    <p className="form_label">Phone:</p>
                    <input type="number" name="phone" value={formData.phone} onChange={handelInputchange} placeholder='Phone' className='form_input' />
                </div>
                {/* Bio */}
                <div className="mb-5">
                    <p className="form_label">Bio:</p>
                    <input type="text" name="bio" value={formData.bio} onChange={handelInputchange} placeholder='Bio' className='form_input' />

                </div>
                {/* Gender */}
                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-3 mb-[30px]">

                        <div>
                            <p className="form_label">Gender:</p>
                            <select name="gender" value={formData.gender} onChange={handelInputchange} className="form_input py-3.5">
                                <option value="">Select</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <p className="form_label">Specialization:</p>
                            <select name="specialization" value={formData.specialization} onChange={handelInputchange} className="form_input py-3.5">
                                <option value="">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neuorologist">Neurologist</option>
                                <option value="dermatologist">Dermatologist</option>
                            </select>
                        </div>

                        <div>
                            <p className="form_label">Ticket Price</p>
                            <input type="number" placeholder='100' name='ticketPrice' value={formData.ticketPrice} onChange={handelInputchange} className='form_input' />
                        </div>
                    </div>
                </div>

                {/* Qualiication */}
                <div className='mb-5'>
                    <p className='form_label'>Qualification</p>
                    {formData.qualifications?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form_label">Starting Date</p>
                                        <input type="date"
                                            name='startingDate'
                                            value={item.startingDate}
                                            className='form_input'
                                            onChange={e => handelQualififationChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Ending Date</p>
                                        <input type="date"
                                            name='endingDate'
                                            value={item.endingDate}
                                            className='form_input'
                                            onChange={e => handelQualififationChange(e, index)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-">
                                    <div>
                                        <p className="form_label">Degree</p>
                                        <input type="text"
                                            name='degree'
                                            value={item.degree}
                                            className='form_input'
                                            onChange={e => handelQualififationChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">University</p>
                                        <input type="text"
                                            name='university'
                                            value={item.university}
                                            className='form_input'
                                            onChange={e => handelQualififationChange(e, index)}
                                        />
                                    </div>
                                </div>
                                <button className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer' onClick={e => deleteQualification(e, index)}><AiOutlineDelete /></button>
                            </div>
                        </div>
                    ))}
                    <button onClick={addQualification} className='bg-[#000] py-2 px-5 rounded text text-white h-fit cursor-pointer'>Add Qualification</button>
                </div>
                {/* Expeience */}
                <div className='mb-5'>
                    <p className='form_label'>Experience</p>
                    {formData.experiences?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form_label">Starting Date</p>
                                        <input type="date"
                                            name='startingDate'
                                            value={item.startingDate}
                                            className='form_input'
                                            onChange={e => handelExperienceChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Ending Date</p>
                                        <input type="date"
                                            name='endingDate'
                                            value={item.endingDate}
                                            className='form_input'
                                            onChange={e => handelExperienceChange(e, index)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5 mt-">
                                    <div>
                                        <p className="form_label">Position</p>
                                        <input type="text"
                                            name='position'
                                            value={item.position}
                                            className='form_input'
                                            onChange={e => handelExperienceChange(e, index)} />
                                    </div>
                                    <div>
                                        <p className="form_label">Hospital</p>
                                        <input type="text"
                                            name='hospital'
                                            value={item.hospital}
                                            className='form_input'
                                            onChange={e => handelExperienceChange(e, index)} />
                                    </div>
                                </div>

                                <button onClick={e => deleteExperiences(e, index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete /></button>
                            </div>
                        </div>))}
                    <button onClick={addExperience} className='bg-[#000] py-2 px-5 rounded text text-white h-fit cursor-pointer'>Add Experience</button>
                </div>
                {/* Timeslot */}
                <div className='mb-5'>
                    <p className='form_label'>Time slots</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                                    <div>
                                        <p className="form_label">Day</p>
                                        <select name="day" className='form_input py-3.5' value={item.day} id="" onChange={e => handelTimeSlotChange(e, index)} >
                                            <option value="">Select</option>
                                            <option value="Saturday">Saturday</option>
                                            <option value="Sunday">Sunday</option>
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p className="form_label">Starting time</p>
                                        <input type="time"
                                            name='startingTime'
                                            value={item.startingTime}
                                            className='form_input'
                                            onChange={e => handelTimeSlotChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form_label">Ending time</p>
                                        <input type="time"
                                            name='endingTime'
                                            value={item.endingTime}
                                            className='form_input'
                                            onChange={e => handelTimeSlotChange(e, index)}
                                        />
                                    </div>
                                    <div onClick={e => deleteTimeSlot(e, index)} className='flex items-center'>
                                        <button className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-6  cursor-pointer'><AiOutlineDelete /></button>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                    <button onClick={addTimeSlot} className='bg-[#000] py-2 px-5 rounded text text-white h-fit cursor-pointer'>Add Timeslot</button>
                </div>
                {/* About  */}
                <div className="mb-5">
                    <p className='form_label'>About</p>
                    <textarea name="about" rows={5} value={formData.about} placeholder='Write about you' onChange={handelInputchange} className='form_input'></textarea>
                </div>
                {/* Img */}
                <div className="mb-5 flex items-center gap-3">
                    {formData.photo && (
                        <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                            <img src={formData.photo} alt="Preview" className="w-full rounded-full h-full" />
                        </figure>
                    )}
                    <div className='relative w-[130px] h-[50px]'>
                        <input
                            type="file"
                            name="photo"
                            id="customFile"
                            accept='.jpg,.png'
                            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                            onChange={handleFileInput}
                        />
                        <label
                            htmlFor="customFile"
                            className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'
                        >
                            Upload Photo
                        </label>
                    </div>
                </div>
                <div className="mt-7">
                    <button type='submit' onClick={updateProfileHandeler} className='bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'>Update Profile</button>
                </div>
            </form>
        </div>
    )
}

export default Profile