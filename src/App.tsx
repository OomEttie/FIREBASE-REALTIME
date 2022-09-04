import React from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Handoff from "./handoff";
import { HandoffConnect } from "./handoff/handoffConnect";

const firebaseConfig = {
  apiKey: "AIzaSyD826c9-jvXTVTCfH9cYnnsGSOFMiVO4Ww",
  authDomain: "iidentifii.firebaseapp.com",
  databaseURL: "https://iidentifii-default-rtdb.firebaseio.com",
  projectId: "iidentifii",
  storageBucket: "iidentifii.appspot.com",
  messagingSenderId: "284230690614",
  appId: "1:284230690614:web:e43888e0b76363f64bb597",
  measurementId: "G-09HP4PF308",
};

function App() {
  initializeApp(firebaseConfig);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Handoff />} />
          <Route path="/handoff/:id" element={<HandoffConnect />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
