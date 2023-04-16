import axios from "axios";

export function checkPass(
    admissionNo,
    setstudentData,
    setvalidity,
    seterror
) {
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