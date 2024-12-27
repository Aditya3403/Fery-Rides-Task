import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RideDetails = () => {
  const { id } = useParams();
  const [ride, setRide] = useState(null);

  useEffect(() => {
    const fetchRideDetails = async () => {
      const response = await fetch(`http://localhost:3000/ride/${id}`);
      const data = await response.json();
      setRide(data);
    };

    fetchRideDetails();
  }, [id]);

  if (!ride) return <p>Loading ride details...</p>;

  return (
    <div>
      <h2>Ride Details</h2>
      <p><strong>ID:</strong> {ride.id}</p>
      <p><strong>Distance:</strong> {ride.distance}</p>
      <p><strong>Fare:</strong> {ride.fare}</p>
      <p><strong>Details:</strong> {ride.details}</p>
    </div>
  );
};

export default RideDetails;
