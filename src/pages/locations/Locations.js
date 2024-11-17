import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Spinner } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefault";
import LocationList from "../../components/locations/LocationList";

const Locations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosReq.get("/locations");
        setLocations(data.results);
        setFilteredLocations(data.results);
      } catch (err) {
        console.error("Error fetching locations:", err);
        setIsLoading(false);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const filtered = locations.filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchTerm, locations])

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
          placeholder="Search by location name..."
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

      {filteredLocations.length === 0 && !isLoading ? (
        <p>No locations found matching the search term.</p>
      ) : (
        <LocationList locations={filteredLocations} />
      )}
    </div>
  );
};

export default Locations;