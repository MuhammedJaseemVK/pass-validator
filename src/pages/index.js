import { MdOutlineQrCode } from 'react-icons/md';
import { MdArrowForward } from 'react-icons/md'
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [admissionNo, setadmissionNo] = useState('')

  async function submitHandler(e) {
    e.preventDefault();
    console.log(admissionNo)
  }

  async function scanMe () {
    console.log('hello')
  }

  return (
    <div className='h-screen bg-[#213458] relative text-black'>
      {/* Logo */}
      <div className='w-full h-3/4 flex items-center'>
        <Image src="/pass-validator-logo.png" alt="logo" width='250' height='250' className='mx-auto' />
      </div>


      {/* Bottom Area */}
      <form onSubmit={submitHandler} className="bg-white absolute bottom-0 left-0 w-full py-8 rounded-t-2xl px-10 flex flex-col gap-2">
            <div>
              <div className="text-md">Admission No</div>
              <input type="text" className="bg-[#7E7A7A] p-2 rounded-md w-full" placeholder="Admission No" required={true} value={admissionNo} onChange={e => setadmissionNo(e.target.value)} />
            </div>
            

            {/* OR Bar */}
            <div className="flex flex-row justify-between items-center">
              <div className='w-1/2 h-[1px] bg-black'></div>
              <p className="mx-2">OR</p>
              <div className='w-1/2 h-[1px] bg-black'></div>
            </div>

            {/* Buttons */}
            <div>
              <button type='button' onClick={scanMe} className="btn btn-primary">Scan
                <MdOutlineQrCode />
              </button>
              <button type='submit' className='btn btn-secondary'>
                Submit
                <MdArrowForward />
              </button>
            </div>
      </form>
    </div>

  )
}
