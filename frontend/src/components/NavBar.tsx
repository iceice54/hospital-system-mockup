import { NavLink, Group } from "@mantine/core";
import { CiHospital1 } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles/App.module.css";
const data = [
    {
        icon: CiHospital1,
        label: "Dashboard",
        navigate: "/home",
    },
    {
        icon: CiHospital1,
        label: "Patients",
        navigate: "/patients",
    },
    { icon: CiHospital1, label: "Add Patient", navigate: "/patients/create" },
    { icon: CiHospital1, label: "Wards", navigate: "/wards" },
    { icon: CiHospital1, label: "Ward Types", navigate: "/wardtypes" },
];

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeLink, setActiveLink] = useState<String>("Dashboard");

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = data.find((item) => item.navigate === currentPath);
        if (activeItem) {
            setActiveLink(activeItem.label);
        }
    }, [location]);

    const items = data.map((item) => (
        <NavLink
            className={styles.navlink}
            active={item.label === activeLink}
            key={item.label}
            label={item.label}
            leftSection={<item.icon />}
            onClick={() => {
                navigate(item.navigate);
            }}
            variant="filled"
        />
    ));

    return (
        <nav className={styles.navbar}>
            <Group>
                <CiHospital1 /> Hospital
            </Group>
            {items}
        </nav>
    );
}

export default NavBar;
