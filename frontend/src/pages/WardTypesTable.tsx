import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import styles from "../styles/App.module.css";

interface WardTypes {
    id: string;
    name: string;
    number_of_beds: number;
}

function WardsTypesTable() {
    const [data, setData] = useState<WardTypes[]>([]);
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api/wardtypes/")
            .then((response) => {
                console.log(response.data, "response");
                setData(response.data);
            })
            .catch((error) => {
                console.log("Error fetching wards:", error);
            });
    }, []);
    console.log(data, "data");

    const rows = data.map((ward) => (
        <Table.Tr key={ward.id}>
            <Table.Td>{ward.id}</Table.Td>
            <Table.Td>{ward.name}</Table.Td>
            <Table.Td>{ward.number_of_beds}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <h1>Wards</h1>
            <Table stickyHeader stickyHeaderOffset={0} className={styles.table}>
                <Table.Thead className={styles.tablehead}>
                    <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Number of beds</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}

export default WardsTypesTable;
