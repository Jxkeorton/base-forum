import React, { useEffect, useState } from 'react';
import { InputGroup, FormControl, Spinner, Form } from 'react-bootstrap';

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

      <Form>
        <Form.Group
          className="mb-3 mx-auto"
          style={{ maxWidth: '500px' }}
          controlId="locationSearch"
        >
          <Form.Label className="visually-hidden">
            Search locations by name or country
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="fa fa-search" aria-hidden="true"></i>
            </InputGroup.Text>
            <FormControl
              type="search"
              placeholder="Search locations by name or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search locations by name or country"
            />
          </InputGroup>
        </Form.Group>
      </Form>

      {loading && (
        <div className="text-center" aria-live="polite">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {locations.length === 0 && !loading ? (
        <p className="text-center" role="status">No locations found matching the search term.</p>
      ) : (
        <LocationList locations={locations} />
      )}
    </div>
  );
};

export default Locations;