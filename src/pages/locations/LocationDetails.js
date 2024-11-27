import React, {useState, useEffect } from "react";
import DetailsCard from "../../components/locations/DetailsCard";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefault";
import ReviewsList from "../../components/reviews/ReviewsList"

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: location }] = await Promise.all([
          axiosReq.get(`/locations/${id}/`),
        ]);
        setLocation(location);
        console.log(location);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  if (!location) {
    return <p>Location not found!</p>;
  }

  return (
    <div>
      <DetailsCard location={location} />
      <ReviewsList location={location} />
    </div>
  );
};

export default LocationDetails;