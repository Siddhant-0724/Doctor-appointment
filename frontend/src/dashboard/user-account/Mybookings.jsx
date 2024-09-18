import useFetchData from "../../hooks/useFetchData"
import { BASE_URL } from "../../config"
import DoctorCard from "./../../components/doctors/DoctorsCard"
import Loading from "../../components/loader/Loading"
import Error from "../../components/error/Error"

const Mybookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointnments`)

  return (
    <div>
      {loading && <Loading />}

      {error && <Error errormessage={error} />}

      {!loading && !error && <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {appointments.map(doctor=>(
          <DoctorCard doctor={doctor} key={doctor._id}/>
          ))}
          {
            !loading && !error && appointments.length===0 && <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">You Did not book any Doctor yet</h2>
          }
        </div>
        }
    </div>
  )
}

export default Mybookings