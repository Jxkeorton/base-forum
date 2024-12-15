import React from 'react';
import CountryGroup from './CountryGroup.jsx';

const LocationList = ({ locations }) => {
    
  const groupedByCountry = locations.reduce((acc, location) => {
    const { country } = location;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(location);
    return acc;
  }, {});

  return (
    <div className="location-list">
      {Object.keys(groupedByCountry).map((country) => (
        <CountryGroup
          key={country}
          country={country}
          locations={groupedByCountry[country]}
        />
      ))}
    </div>
  );
};

export default LocationList;