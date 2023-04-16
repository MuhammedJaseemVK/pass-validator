import React, { useState } from 'react';

function Sample() {
    const [passID, setPassID] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`https://app.conext.in/bus_pass/checker/?pass_id=${passID}`);

        if (!response.ok) {
            setErrorMessage('Pass not found');
        } else {
            const data = await response.json();
            setStudentData(data.student);
            console.log(studentData);
            setErrorMessage(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Pass ID:
                    <input type="text" value={passID} onChange={(event) => setPassID(event.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>

            {errorMessage && <p>{errorMessage}</p>}

            {studentData && (
                <div>
                    <h1>{studentData.student_name}</h1>
                    <p>Year of Joining: {studentData.year_of_join}</p>
                    <p>Valid Till: {studentData.valid_till}</p>
                    <p>Boarding Place: {studentData.boarding_place}</p>
                    <p>Pass ID: {studentData.pass_id}</p>
                </div>
            )}
        </div>
    );
}

export default Sample;
