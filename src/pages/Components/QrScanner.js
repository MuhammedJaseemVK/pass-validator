import React, { useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import axios from 'axios';
import { MdOutlineQrCode } from 'react-icons/md';

const QRScanner = () => {
    const [qrData, setQRData] = useState(null);
    const [validity, setValidity] = useState('verification');
    const [studentData, setStudentData] = useState({});
    const [error, setError] = useState({ type: false, message: null });
    const videoRef = useRef();

    const scanQRCode = async () => {
        try {
            const qrScanner = new QrScanner(videoRef.current, (result) => {
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
            {validity === 'verification' && (
                <button onClick={scanQRCode} className="btn btn-primary">
                    Scan
                    <MdOutlineQrCode />
                </button>
            )}
            {validity === 'invalid' && <p>Invalid QR code</p>}
            {validity === 'profile' && <p>{studentData.Bus_Pass}</p>}
            {error.type && <p>{error.message}</p>}
        </>
    );
};

export default QRScanner;
