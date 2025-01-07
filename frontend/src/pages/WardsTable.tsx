import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import styles from "../styles/App.module.css";

interface Ward {
    id: string;
    name: string;
    type: string;
    available_beds: number;
}

function WardsTable() {
    const [data, setData] = useState<Ward[]>([]);
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api/wards/")
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
            <Table.Td>{ward.type}</Table.Td>
            <Table.Td>{ward.available_beds}</Table.Td>
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
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Available beds</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}

export default WardsTable;
