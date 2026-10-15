import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "seaglass-ui/styles.css";
import "./playground.css";
import { ThemeProvider, Toaster, TooltipProvider } from "seaglass-ui";
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
