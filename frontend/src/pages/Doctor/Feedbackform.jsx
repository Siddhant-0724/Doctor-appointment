import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { BASE_URL, token } from '../../config'
import HashLoader from 'react-spinners/HashLoader'
import {toast} from 'react-toastify'

const Feedbackform = () => {
    const[rating,setRating] = useState(0)
    const[hover,setHover] = useState(0)
    const[reviewText,setreviewText] = useState("")
    const[loading,setLoading] = useState(false)

    const {id} = useParams();

    const handelSubmitReview = async e =>{
        e.preventDefault();
        setLoading(true)
        try{
            if(!rating || !reviewText){
                setLoading(false)
               return toast.error('Rating and Review Field are required')
            }
            const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`,{
                method:'post',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({rating,reviewText})
            })
            const result = await res.json()
            if(!res.ok){
                throw new Error(result.message)
            }
            setLoading(false)
            toast.success(result.message)
        }catch(err){
            setLoading(false)
            toast.error(err.message)
        }
    }
    return (
        <form>
            <div >
                <h3 className='text-textColor text-[16px] leading-6 font-semibold mb-4 mt-0'>How would you rate the overall expericence?</h3>
                <div className="">
                    {[...Array(5).keys()].map((index) => {
                        index += 1
                        return <button key={index} type="button"
                        className={`${index <= ((rating && hover) || hover) ? "text-yellowColor" : "text-gray-400"} bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                        onClick={()=>setRating(index)}
                        onMouseEnter={()=>setHover(index)}
                        onMouseLeave={()=>(rating)}
                        onDoubleClick={()=>{setRating(0); setHover(0)}
                    }><span><AiFillStar /></span></button>
                    })}
                </div>
            </div>

            <div className='mt-[30px]'>
            <h3 className='text-textColor text-[16px] leading-6 font-semibold mb-4 mt-0'>Share your Feedback Suggestion</h3>
            <textarea className="border border-solid border-[#0006ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-sm" rows="5" placeholder='Write your message' onChange={e=>setreviewText(e.target.value)}></textarea>
            </div>
            <button className='btn' type='submit' onClick={handelSubmitReview}>
                {loading ? <HashLoader size={25} color='#ffff'/> : "Submit Feedback"}</button>
        </form>
    )
}

export default Feedbackform