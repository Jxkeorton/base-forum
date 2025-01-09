import React, { useEffect, useState } from 'react';
import { InputGroup, FormControl, Spinner } from 'react-bootstrap';

import LocationList from '../../components/locations/LocationList.jsx';
import { useLocationsContext } from '../../contexts/LocationsContext.jsx';
const Locations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { locations, loading, fetchAllLocations } = useLocationsContext();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAllLocations(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, fetchAllLocations]);

  return (
    <div>
      <h1 className="text-center">Locations</h1>
      <p className="text-center">Browse Base Jumping locations from all over the world</p>

      <InputGroup
        className="mb-3"
        style={{
          maxWidth: '500px',
          marginBottom: '20px',
          marginLeft: 'auto',
          marginRight: 'auto',
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

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {locations.length === 0 && !loading ? (
        <p>No locations found matching the search term.</p>
      ) : (
        <LocationList locations={locations} />
      )}
    </div>
  );
};

export default Locations;
