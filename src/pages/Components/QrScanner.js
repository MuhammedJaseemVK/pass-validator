import React, { useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import axios from 'axios';
import { MdOutlineQrCode } from 'react-icons/md';

import { AiOutlineClose } from 'react-icons/ai';
import { MdArrowForward } from 'react-icons/md';
import { ImHappy2 } from 'react-icons/im';
import { ImSad2 } from 'react-icons/im';
import { AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai';

const QRScanner = (props) => {
    const [qrData, setQRData] = useState(null);
    const [scanClicked, setscanClicked] = useState('false')
    const [validity, setValidity] = useState('verification');
    const [studentData, setStudentData] = useState({});
    const [error, setError] = useState({ type: false, message: null });
    const videoRef = useRef();
    const [showProfile, setshowProfile] = useState('false');

    const scanQRCode = async () => {
        try {
            setshowProfile(true);
            const qrScanner = new QrScanner(videoRef.current, (result) => {
                setscanClicked('true');
                setQRData(result);
                qrScanner.stop();
                checkBusPass(result);
            });

            await qrScanner.start();
        } catch (error) {
            console.error(error);
        }
    };

    const checkBusPass = (admissionNo) => {
        setError({ type: false, message: null });
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
                setStudentData(response?.data);
                if (response?.data?.Bus_Pass === "No Such Pass Alloted") {
                    setValidity("invalid");
                } else {
                    setValidity("profile");
                }
            })
            .catch(() => {
                setError({ type: true, message: "Something went wrong" });
                setValidity("verification");
            })
    };

    return (
        <>
            <div>
                <video ref={videoRef} />
            </div>
            { (!props.value) && (
                <button onClick={scanQRCode} className="btn btn-primary">
                    Scan
                    <MdOutlineQrCode />
                </button>
            )}
            {(validity === 'profile') && (
                <div className='text-xl'>
                    <div className='w-full flex items-center justify-center gap-2'>
                        <div className="text-2xl">{studentData.Bus_Pass}</div>
                        {studentData.Bus_Pass === 'Valid Pass' ?
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
                    {studentData.Bus_Pass === 'Valid Pass' ?
                        <div>
                            <ImHappy2 className='text-8xl text-green-500 mx-auto' />
                        </div>
                        : <div>
                            <ImSad2 className='text-8xl text-red-500 mx-auto' />
                        </div>
                    }
                    
                    
                </div>
            )}
            {(validity === 'invalid') && (
                <div className='w-full flex items-center justify-center gap-2'>
                    <p className='text-2xl'>No such pass alloted</p>
                    <AiFillExclamationCircle className='text-red-500' />
                    
                </div>
            )}
            
            { (scanClicked==='true') && (
            <div>
                <button onClick={() => {location.reload();setshowProfile(false)} } className="btn btn-secondary">Close
                    <AiOutlineClose />
                </button>
            </div>
            )}
            {error.type && <p>{error.message}</p>}
        </>
    );
};

export default QRScanner;
