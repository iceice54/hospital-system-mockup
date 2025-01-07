import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { createTheme, MantineProvider } from "@mantine/core";
// import "./styles/App.module.css";

const theme = createTheme({
    colors: {
        default: [
            "#293751",
            "#30405F",
            "#384C70",
            "#48608E",
            "#5976AB",
            "#778FBB",
            "#96A8CA",
            "#B4C1D9",
            "#D3DBE9",
            "#F1F4F8",
        ],
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MantineProvider>
    </StrictMode>
);
