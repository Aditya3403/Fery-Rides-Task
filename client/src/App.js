import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import RidesList from "./RidesList";
import RideDetails from "./RideDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/rides" element={<RidesList />} />
        <Route path="/ride/:id" element={<RideDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
