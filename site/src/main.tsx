import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "seaglass/styles.css";
import "./site.css";
import { ThemeProvider, Toaster, TooltipProvider } from "seaglass";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider delayDuration={300}>
        <App />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
