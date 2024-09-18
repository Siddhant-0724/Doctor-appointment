import React from 'react'
import aboutimg from '../../assets/images/about.png'
import aboutcard from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <section>
      <div className='container'>
        <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row '>
          {/* Abot img */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutimg} alt="" />
            <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]'>
              <img src={aboutcard} alt="" />
            </div>
          </div>

          {/* About Center */}
          <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
              <h2 className='heading'>Proub to be nation Best</h2>
              <p className='text_para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ipsam fugiat molestiae dolor veritatis ipsa quaerat eaque quidem blanditiis eligendi
                 nemo voluptatibus tempore doloribus corrupti, voluptatem, ex nihil reprehenderit. Nesciunt.</p>
              <p className='text_para mt-[30px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, fuga similique ullam atque dolorum deserunt mollitia error
                 unde hic! Suscipit porro nulla corrupti eius doloremque dolorum minus dolore perferendis maiores!</p>

                 <Link to='/'><button className="btn">Learn More</button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About