import { MdArrowBack, MdOutlineQrCode } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { MdArrowForward } from 'react-icons/md';
import { ImHappy2 } from 'react-icons/im';
import { ImSad2 } from 'react-icons/im';
import { AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai';
import Image from 'next/image';
import { useState } from 'react';
import axios from "axios";
import QrScanner from './Components/QrScanner';



  

  

{/* <Button onClick={() => qrButtonClick()}>Click Parent</Button> */}



export default function Home() {
  const [Data, setData] = useState('')
  const [qrSelected, setqrSelected] = useState('false')
  const [admissionNo, setadmissionNo] = useState('');
  const [studentData, setstudentData] = useState(null);
  const [validity, setvalidity] = useState('');
  const [error, seterror] = useState('');
  const [submitClicked, setsubmitClicked] = useState('false')
  const [showProfile, setshowProfile] = useState(false)
  const [showQR, setshowQR] = useState('false')

  
  const qrButtonClick = () => {
    setqrSelected('true');
    setsubmitClicked('false');
    setshowProfile(true);
    setqrSelected('true');
    
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    setsubmitClicked('true');
    setqrSelected('false');
    setshowProfile(true);
  {
      seterror({ type: false, message: null });
      axios
        .post(
          "https://app.conext.in/bus_pass/checker/",
          { pass_id: admissionNo },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          setstudentData(response?.data);
          if (response?.data?.Bus_Pass === "No Such Pass Alloted") {
            setvalidity("invalid");
          } else {
            setvalidity("profile");
          }
        })
        .catch(() => {
          seterror({ type: true, message: "Something went wrong" });
          setvalidity("verification");
        })
        
    }

  };


  return (
    <div className='h-screen bg-[#213458] relative text-black'>

      {(submitClicked === 'true') && (
        <div onClick={() => setsubmitClicked('false')} className='flex flex-row items-center text-white p-2 text-xl gap-2' >
          <MdArrowBack />
          <button>Back
          </button>
        </div>
      )}


      {/* Logo */}
      <div className='w-full h-3/4 flex items-center'>
        <Image src="/pass-validator-logo.png" alt="logo" width='250' height='250' className='mx-auto' />
      </div>


      <div className="bg-white absolute bottom-0 left-0 w-full py-8 rounded-t-2xl px-10 flex flex-col gap-10">

        {showProfile === false && (
        <form onSubmit={submitHandler}>
          <div>
            <div className="text-md">Admission No</div>
            <input type="text" className="bg-[#7E7A7A] p-2 rounded-md w-full" placeholder="Admission No" required={true} value={admissionNo} onChange={e => setadmissionNo(e.target.value)} />
          </div>
            


            <button type='submit' className='btn btn-secondary'>
              Submit
              <MdArrowForward />
            </button>
          
          {/* OR Bar */}
          <div className="flex flex-row justify-between items-center">
            <div className='w-1/2 h-[1px] bg-black'></div>
            <p className="mx-2">OR</p>
            <div className='w-1/2 h-[1px] bg-black'></div>
          </div>
          
        </form>
        )}

        {/* test qr code */}
        
      
        <div onClick={qrButtonClick}>
          <QrScanner value={showProfile} />
        </div>


        { (qrSelected ==='false') && ( 
          <div>
          {(validity==='profile') && (submitClicked==='true') && (
        <div className='text-xl'>
            <div className='w-full flex items-center justify-center gap-2'>
              <div className="text-2xl">{studentData.Bus_Pass}</div>
              {studentData.Bus_Pass ==='Valid Pass' ?
                  <AiFillCheckCircle className='text-green-500' />
                  : <AiFillCheckCircle className='text-red-500' />       
              } 
            </div>
          <div className='flex flex-row justify-between'>
            <p>Student name:</p>
              <p>{studentData.student.student_name}</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>year of join:</p>
              <p>{studentData.student.year_of_join}</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>valid till:</p>
              <p>{studentData.student.valid_till}</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>bus stop:</p>
              <p>{studentData.student.boarding_place}</p>
          </div>
          <div className='flex flex-row justify-between'>
              <p>bus stop:</p>
              <p>{studentData.student.pass_id}</p>
          </div>
            {studentData.Bus_Pass ==='Valid Pass' ?
              <div>
                <ImHappy2 className='text-8xl text-green-500 mx-auto' />
              </div>
              : <div>
                <ImSad2 className='text-8xl text-red-500 mx-auto' />
              </div>            
            }
          <div>
                  <button onClick={() => { location.reload(); setshowProfile(false) }} className="btn btn-secondary">Close
                <AiOutlineClose />
              </button>
          </div>

        </div>
        )}
        </div>
        )}

        {(qrSelected === 'false') && (
          <div>
        { (validity==='invalid') && (submitClicked==='true') && (
          <div className='w-full flex items-center justify-center gap-2'>
            <p className='text-2xl'>No such pass alloted</p>
            <AiFillExclamationCircle className='text-red-500' />       
          </div>
        )}
          </div>
        )}

          

      </div>

      </div>

  )
}
