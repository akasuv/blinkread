import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import style from "./index.css?inline";

const root = document.createElement("div");
root.id = "blinkread-root";
root.className =
  "bg-white fixed top-8 right-8 z-[999] rounded-xl drop-shadow-lg";

const styleEl = document.createElement("style");
styleEl.textContent = style;

document.body.append(styleEl);
document.body.append(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
