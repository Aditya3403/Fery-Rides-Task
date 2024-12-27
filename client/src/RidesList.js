import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RidesList.css";

const RidesList = () => {
    const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      const response = await fetch("http://localhost:3000/rides");
      const data = await response.json();

      // Ensure 'fare' is always a number
      const cleanedData = data.map((ride) => ({
        ...ride,
        fare: typeof ride.fare === "number" ? ride.fare : parseFloat(ride.fare) || 0,
      }));
      setRides(cleanedData);
    };

    fetchRides();
  }, []);

  const handleMoreDetails = (ride) => {
    setSelectedRide(ride); 
  };

  const closeOverlay = () => {
    setSelectedRide(null); 
  };
  const handleLogout = () => {

    navigate("/");
  };

  return (
    <div className="rides-list-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h2>Choose a ride</h2>
      {rides.length > 0 ? (
        <div className="ride-list">
          {rides.map((ride) => (
            <div key={ride.id} className="ride-item">
              <div className="ride-details">
                <h4>Ride ID: {ride.id}</h4>
                <p className="ride-info">Distance: {ride.distance}</p>
                <p className="ride-info">Fare: ₹ {ride.fare.toFixed(2)}</p>
              </div>
              <button
                className="more-details-button"
                onClick={() => handleMoreDetails(ride)}
              >
                More Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No rides available.</p>
      )}

      {/* Overlay for ride details */}
      {selectedRide && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Ride Details</h3>
            <p><strong>Ride ID:</strong> {selectedRide.id}</p>
            <p><strong>Distance:</strong> {selectedRide.distance}</p>
            <p><strong>Fare:</strong> ₹ {selectedRide.fare.toFixed(2)}</p>
            <button className="close-overlay-button" onClick={closeOverlay}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RidesList;
