import React from 'react'

const Contact = () => {
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text_para">
          Got tecnical issue? Want to send feedback about a beta feature? let us know.
        </p>
        <form action="#">
          <div>
            <label htmlFor="email" className='form_label'>Your Email</label>
            <input type="email" id='email' placeholder='example@gmail.com' className='form_input mt-1'/>
          </div>

          <div>
            <label htmlFor="subject" className='form_label'>Subject</label>
            <input type="text" id='subject' placeholder='Let us know how can we help you' className='form_input mt-1'/>
          </div>

          
          <div className='sm:col-span-2'>
            <label htmlFor="message" className='form_label'>Your Message</label>
            <textarea rows={6} type="text" id='subject' placeholder='Leave a comment...' className='form_input mt-1'/>
          </div>

          <button className="btn rounded sm:w-fit" type='submit'>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default Contact