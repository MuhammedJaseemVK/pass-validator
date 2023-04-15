import { MdOutlineQrCode } from 'react-icons/md';
import { MdArrowForward } from 'react-icons/md'
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [admissionNo, setadmissionNo] = useState('');
  const [studentData, setstudentData] = useState(null);
  // const [student_name, setstudent_name] = useState('');
  

  const submitHandler = async (e) => {
    e.preventDefault();
 
    // try{
    //   const url ='https://app.conext.in/bus_pass/checker/&query=$(admissioNo)';
    //   const response = await fetch(url);
    //   const data = response.json();
    //   console.log(response.data);
    //   setadmissionNo(data.results);
    // }
    // catch (error) {
    //   console.log(error)
    // }
    
    fetch("https://app.conext.in/bus_pass/checker/",{
      method:"POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ pass_id: admissionNo }),
    })
    .then((response)=> response.json())
    .then((data) => setstudentData(data));
    console.log(studentData);
    // {
    //   items?.map(item => (
    //     <li key={item.id}>
    //       {item.name}
    //     </li>
    //   ))
    // }
  };


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
              {/* <button className="btn btn-primary">Scan
                <MdOutlineQrCode />
              </button> */}
              <button type='submit' className='btn btn-secondary'>
                Submit
                <MdArrowForward />
              </button>
            </div>

            {/* Testing data */}
          {studentData && (
        <div className='text-xl'>
            <p>PAss state: {studentData.Bus_Pass}</p>
          {/* <div className='flex flex-row justify-between'>
            <p>Student name:</p>
              <p>a{studentData.student.student_name}</p>
          </div> */}
          {/* <div className='flex flex-row justify-between'>
            <p>year of join:</p>
              <p>a{studentData.student.year_of_join}</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>valid till:</p>
              <p>a{studentData.student.valid_till}</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p>bus stop:</p>
              <p>a{studentData.student.boarding_place}</p>
          </div>
          <div className='flex flex-row justify-between'>
              <p>bus stop:</p>
              <p>a{studentData.student.pass_id}</p>
          </div>
           */}

        </div>
        )}
      </form>
    </div>

  )
}
