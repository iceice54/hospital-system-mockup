import { Route, Routes } from "react-router-dom"
import PatientsTable from "../pages/PatientsTable";
import WardsTable from "../pages/WardsTable";
import WardsTypesTable from "../pages/WardTypesTable";
import CreatePatientForm from "../pages/CreatePatientForm";
import PatientDetail from "../pages/PatientDetail";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import styles from "../styles/App.module.css"
 
function RouterSwitcher() {
    return (
        <div className={styles.main}>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/patients">
                    <Route index element={<PatientsTable />} />
                    <Route path="create" element={<CreatePatientForm />} />
                    <Route path=":id" element={<PatientDetail />} />
                </Route>
                <Route path="/home" element={<Home />} />
                <Route path="/wards" element={<WardsTable />} />
                <Route path="/wardtypes" element={<WardsTypesTable />} />
            </Routes>
        </div>
    );
}

export default RouterSwitcher;
