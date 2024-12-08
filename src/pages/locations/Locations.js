import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Spinner } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefault";
import LocationList from "../../components/locations/LocationList";
import { useLocationsContext } from "../contexts/LocationsContext";

const Locations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState([]);
  const { fetchAllLocations } = useLocationsContext();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAllLocations();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div>
      <h1 className="text-center">Locations</h1>

      <InputGroup
        className="mb-3"
        style={{
          maxWidth: "500px",
          marginBottom: "20px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <InputGroup.Text>
          <i className="fa fa-search"></i>
        </InputGroup.Text>
        <FormControl
          placeholder="Search locations by name or country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {locations.length === 0 && !isLoading ? (
        <p>No locations found matching the search term.</p>
      ) : (
        <LocationList locations={locations} />
      )}
    </div>
  );
};

export default Locations;
