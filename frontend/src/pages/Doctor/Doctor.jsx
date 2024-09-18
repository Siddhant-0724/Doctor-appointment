import DoctorsCard from '../../components/doctors/DoctorsCard'
import { doctors } from '../../assets/data/doctors'
import Tesmonomial from '../../components/testmonial/Tesmonomial'
import { BASE_URL } from '../../config'
import useFetchData from '../../hooks/useFetchData'
import Loader from '../../components/loader/Loading'
import Error from '../../components/error/Error'
import Loading from '../../components/loader/Loading'
import { useEffect, useState } from 'react'
const Doctor = () => {
  const [query, setQuery] = useState('')
  const [debouncequery, setDebouncequery] = useState("")
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors?query=${query}`)
  const handelSreach = () => {
    setQuery(query.trim())
    console.log(handelSreach)
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncequery(query)
    }, 700)
    return () => clearTimeout(timeout)
  }, [query])
  return <>
    <section className="bg-[#fff9ea]">
      <div className="container text-center ">
        <h2 className="heading">Find a Doctors</h2>
        <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input type="search" className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor " placeholder="Sreach Doctor by name or specifiacation" value={query} onChange={e => setQuery(e.target.value)} />
          <button className='btn mt-0 rounded-[0px] rounded-r-md' onClick={handelSreach}>Sreach</button>
        </div>
      </div>
    </section>

    <section>
      <div className="container">

        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 '>
          {doctors.map(doctor => (
          <DoctorsCard key={doctor.id} doctor={doctor} />
            ))}
        </div>
        )}
      </div>
    </section>


    <section>
      <div className="container">
        <div className="xl:w-[470px] mx-auto">
          <h2 className='heading text-center'>What our Patients say</h2>
          <p className="text_para text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa nisi doloribus
            modi magni aut fugit asperiores, distinctio eum!
          </p>
        </div>
        <Tesmonomial />
      </div>
    </section>
  </>
}

export default Doctor