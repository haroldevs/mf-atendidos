import React from "react";
import { createRoot } from "react-dom/client";
import Atendidos from "./components/Atendidos";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Atendidos />);
