import React from 'react'
import Image from 'next/image'
import { AiFillCheckCircle } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import { ImHappy2 } from 'react-icons/im'
import Link from 'next/link'


export default function validpass() {


  return (
    <div className='h-screen bg-[#213458] relative text-black'>
      {/* Logo */}
      <div className='w-full h-1/2 flex items-center'>
        <Image src="/pass-validator-logo.png" alt="logo" width='250' height='250' className='mx-auto' />
      </div>


      {/* Bottom Area */}
      <div className="bg-white absolute bottom-0 left-0 w-full py-8 rounded-t-2xl px-10 flex flex-col gap-2">
        <div className='w-full flex items-center justify-center'>
          <div className="text-2xl">Valid bus pass</div>
          <AiFillCheckCircle className='text-green-500' />
        </div>



        <div className='text-xl'>
          <div className='flex flex-row justify-between'>
            <p>Student name:</p>
            <p>jaseem</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>year of join:</p>
            <p>jaseem</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>valid till:</p>
            <p>jaseem</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>bus stop:</p>
            <p>jaseem</p>
          </div>
          
          
        </div>

        <div>
          <ImHappy2 className='text-8xl text-green-500 mx-auto'/>
        </div>

        {/* Buttons */}
        <div>
          <Link href="/"> <button className="btn btn-secondary">Close
            <AiOutlineClose />
            </button>
          </Link>
          

        </div>
      </div>
    </div>
  )
}
