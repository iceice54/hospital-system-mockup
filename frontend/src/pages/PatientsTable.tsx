import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import styles from "../styles/App.module.css";

interface Patient {
    id: string;
    name: string;
    age: number;
    nric: string;
    gender: string;
    date_of_birth: Date;
}

function PatientsTable() {
    const [data, setData] = useState<Patient[]>([]);
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api/patients/")
            .then((response) => {
                console.log(response.data, "response");
                setData(response.data);
            })
            .catch((error) => {
                console.log("Error fetching patients:", error);
            });
    }, []);
    console.log(data, "data");

    const rows = data.map((patient) => (
        <Table.Tr key={patient.id}>
            <Table.Td>{patient.id}</Table.Td>
            <Table.Td>{patient.name}</Table.Td>
            <Table.Td>{patient.nric}</Table.Td>
            <Table.Td>{patient.gender}</Table.Td>
            <Table.Td>{patient.date_of_birth.toString()}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <h1>Patients</h1>
            <Table stickyHeader stickyHeaderOffset={0} className={styles.table}>
                <Table.Thead className={styles.tablehead}>
                    <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Nric</Table.Th>
                        <Table.Th>Gender</Table.Th>
                        <Table.Th>Date of birth</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}

export default PatientsTable;
