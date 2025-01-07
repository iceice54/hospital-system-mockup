import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Patient {
    id: string;
    name: string;
    age: number;
    nric: string;
    gender: string;
    date_of_birth: Date;
}

function PatientDetail() {
    const [data, setData] = useState<Patient>({});
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api" + location.pathname + "/")
            .then((response) => {
                console.log(response.data, "response");
                setData(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log("Error fetching patient:", error);
                setLoading(false)
            });
    }, []);
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>Patient data</h1>
                    <div>
                        <h3>ID: {data.id}</h3>
                        <h3>Name: {data.name}</h3>
                        <h3>Age: {data.age}</h3>
                        <h3>Nric: {data.nric}</h3>
                        <h3>Gender: {data.gender}</h3>
                        <h3>Date of Birth: {data.date_of_birth.toString()}</h3>
                    </div>
                </>
            )}
        </>
    );
}

export default PatientDetail;
