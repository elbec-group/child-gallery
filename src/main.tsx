import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBJ-72_KIIfFNuOmlKTTWnMdagNvQmWgDI",
  authDomain: "chatanal.firebaseapp.com",
  projectId: "chatanal",
  storageBucket: "chatanal.firebasestorage.app",
  messagingSenderId: "397532258161",
  appId: "1:397532258161:web:8f4b363ca8ebcf2645a0d0",
  measurementId: "G-L2MNEPK232",
};

// Initialize Firebase
window.app = initializeApp(firebaseConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
