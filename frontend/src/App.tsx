import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { AppShell } from "@mantine/core";
import NavBar from "./components/NavBar";
import RouterSwitcher from "./components/RouterSwitcher";
import styles from "./styles/App.module.css"

function App() {
    return (
        <AppShell
            navbar={{
                width: 250,
                breakpoint: "sm",
            }}
            padding="md"
            withBorder={false}
        >
            <AppShell.Navbar>
                <NavBar />
            </AppShell.Navbar>
            <AppShell.Main className={styles.main}>
                <RouterSwitcher />
            </AppShell.Main>
        </AppShell>
    );
}

export default App;
